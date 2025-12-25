<?php

namespace App\Http\Requests\GuestBook;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGuestBookRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'contact' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'in:keluarga,teman,rekan-kerja,tetangga,lainnya'],
            'is_attending' => ['nullable', 'boolean'],
            'total_guests' => ['nullable', 'integer', 'min:1', 'max:100'],
            'message' => ['nullable', 'string', 'max:1000'],
            'note' => ['nullable', 'string', 'max:500'],
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
            'name.required' => 'Nama wajib diisi.',
            'name.string' => 'Nama harus berupa teks.',
            'name.max' => 'Nama maksimal :max karakter.',

            'contact.string' => 'Kontak harus berupa teks.',
            'contact.max' => 'Kontak maksimal :max karakter.',

            'category.required' => 'Kategori wajib dipilih.',
            'category.in' => 'Kategori yang dipilih tidak valid.',

            'is_attending.boolean' => 'Status kehadiran harus berupa ya atau tidak.',

            'total_guests.integer' => 'Jumlah tamu harus berupa angka.',
            'total_guests.min' => 'Jumlah tamu minimal :min orang.',
            'total_guests.max' => 'Jumlah tamu maksimal :max orang.',

            'message.string' => 'Pesan harus berupa teks.',
            'message.max' => 'Pesan maksimal :max karakter.',

            'note.string' => 'Catatan harus berupa teks.',
            'note.max' => 'Catatan maksimal :max karakter.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'nama',
            'contact' => 'kontak',
            'category' => 'kategori',
            'is_attending' => 'status kehadiran',
            'total_guests' => 'jumlah tamu',
            'message' => 'pesan',
            'note' => 'catatan',
        ];
    }
}
