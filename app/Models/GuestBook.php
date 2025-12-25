<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GuestBook extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'contact',
        'category',
        'is_attending',
        'total_guests',
        'opened_at',
        'answered_at',
        'message',
        'note',
    ];

    protected $casts = [
        'is_attending' => 'boolean',
        'total_guests' => 'integer',
        'opened_at' => 'datetime',
        'answered_at' => 'datetime',
    ];

    public static function generateSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        return $slug;
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($guestBook) {
            if (empty($guestBook->slug)) {
                $guestBook->slug = static::generateSlug($guestBook->name);
            }
        });
    }

    public function scopeAttending($query)
    {
        return $query->where('is_attending', true);
    }

    public function scopeNotAttending($query)
    {
        return $query->where('is_attending', false);
    }

    public function scopeUnanswered($query)
    {
        return $query->whereNull('answered_at');
    }

    public function scopeOpened($query)
    {
        return $query->whereNotNull('opened_at');
    }

    public function getHasRespondedAttribute()
    {
        return !is_null($this->answered_at);
    }

    public function getHasOpenedAttribute()
    {
        return !is_null($this->opened_at);
    }
}
