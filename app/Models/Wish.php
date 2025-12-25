<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wish extends Model
{
    protected $fillable = [
        'name',
        'message',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
