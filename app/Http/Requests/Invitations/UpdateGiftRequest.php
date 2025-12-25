<?php

namespace App\Http\Requests\Invitations;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGiftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'bank_name' => ['required', 'string', 'max:255'],
            'account_number' => ['required', 'string', 'max:255'],
            'account_name' => ['required', 'string', 'max:255'],
            // 'bank_logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'bank_name.required' => 'Nama bank wajib diisi.',
            'bank_name.string' => 'Nama bank harus berupa teks.',
            'bank_name.max' => 'Nama bank maksimal :max karakter.',

            'account_number.required' => 'Nomor rekening wajib diisi.',
            'account_number.string' => 'Nomor rekening harus berupa teks.',
            'account_number.max' => 'Nomor rekening maksimal :max karakter.',

            'account_name.required' => 'Nama pemilik rekening wajib diisi.',
            'account_name.string' => 'Nama pemilik rekening harus berupa teks.',
            'account_name.max' => 'Nama pemilik rekening maksimal :max karakter.',
        ];
    }
}
