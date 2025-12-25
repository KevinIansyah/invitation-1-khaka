<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invitation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'child_name',
        'child_photo',
        'father_name',
        'mother_name',
        'event_date',
        'event_time',
        'event_location',
        'event_location_url',
        'music',
        'whatsapp_number',
        'whatsapp_message',
    ];

    protected $casts = [
        'event_date' => 'date',
        'event_time' => 'datetime:H:i',
    ];

    protected function eventDate(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value
                ? \Carbon\Carbon::parse($value)->format('Y-m-d')
                : null,
            set: fn($value) => $value
                ? \Carbon\Carbon::parse($value)
                : null
        );
    }
}
