<?php

namespace App\Http\Requests\Invitations;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
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
            'event_date' => ['required', 'date', 'after_or_equal:today'],
            'event_time' => ['required', 'date_format:H:i'],
            'event_location' => ['required', 'string', 'max:500'],
            'event_location_url' => ['required', 'url', 'max:500'],
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
            'event_date.required' => 'Tanggal acara wajib diisi.',
            'event_date.date' => 'Format tanggal tidak valid.',
            'event_date.after_or_equal' => 'Tanggal acara tidak boleh di masa lalu.',

            'event_time.required' => 'Waktu acara wajib diisi.',
            'event_time.date_format' => 'Format waktu tidak valid.',

            'event_location.required' => 'Lokasi acara wajib diisi.',
            'event_location.string' => 'Lokasi acara harus berupa teks.',
            'event_location.max' => 'Lokasi acara maksimal :max karakter.',

            'event_location_url.required' => 'URL lokasi wajib diisi.',
            'event_location_url.url' => 'URL lokasi tidak valid.',
            'event_location_url.max' => 'URL lokasi maksimal :max karakter.',
        ];
    }
}
