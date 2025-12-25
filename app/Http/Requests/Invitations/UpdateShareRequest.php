<?php

namespace App\Http\Requests\Invitations;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShareRequest extends FormRequest
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
            'whatsapp_number' => ['required', 'string', 'regex:/^(\+?62|0)[0-9]{9,13}$/'],
            'whatsapp_message' => ['required', 'string', 'max:2000'],
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
            'whatsapp_number.required' => 'Nomor WhatsApp wajib diisi.',
            'whatsapp_number.string' => 'Nomor WhatsApp harus berupa teks.',
            'whatsapp_number.regex' => 'Format nomor WhatsApp tidak valid. Contoh: 08123456789 atau +628123456789',

            'whatsapp_message.required' => 'Pesan WhatsApp wajib diisi.',
            'whatsapp_message.string' => 'Pesan WhatsApp harus berupa teks.',
            'whatsapp_message.max' => 'Pesan WhatsApp maksimal :max karakter.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->whatsapp_number) {
            $cleaned = preg_replace('/[^0-9+]/', '', $this->whatsapp_number);
            $this->merge([
                'whatsapp_number' => $cleaned,
            ]);
        }
    }
}
