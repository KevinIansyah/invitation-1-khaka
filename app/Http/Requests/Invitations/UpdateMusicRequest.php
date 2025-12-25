<?php

namespace App\Http\Requests\Invitations;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMusicRequest extends FormRequest
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
            'music' => ['nullable', 'file', 'mimes:mp3,mpeg', 'max:5120'], // 5MB = 5120KB
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
            'music.file' => 'File musik tidak valid.',
            'music.mimes' => 'Format file harus MP3.',
            'music.max' => 'Ukuran file musik maksimal 5MB.',
        ];
    }
}
