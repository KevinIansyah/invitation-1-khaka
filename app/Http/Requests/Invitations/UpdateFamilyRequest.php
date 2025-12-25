<?php

namespace App\Http\Requests\Invitations;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFamilyRequest extends FormRequest
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
            'child_name' => ['required', 'string', 'max:255'],
            'child_photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'father_name' => ['required', 'string', 'max:255'],
            'mother_name' => ['required', 'string', 'max:255'],
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
            'child_name.required' => 'Nama anak wajib diisi.',
            'child_name.string' => 'Nama anak harus berupa teks.',
            'child_name.max' => 'Nama anak maksimal :max karakter.',

            'child_photo.image' => 'Foto anak harus berupa gambar.',
            'child_photo.mimes' => 'Format foto harus jpg, jpeg, png, atau webp.',
            'child_photo.max' => 'Ukuran foto maksimal 2MB.',

            'father_name.required' => 'Nama ayah wajib diisi.',
            'father_name.string' => 'Nama ayah harus berupa teks.',
            'father_name.max' => 'Nama ayah maksimal :max karakter.',

            'mother_name.required' => 'Nama ibu wajib diisi.',
            'mother_name.string' => 'Nama ibu harus berupa teks.',
            'mother_name.max' => 'Nama ibu maksimal :max karakter.',
        ];
    }
}
