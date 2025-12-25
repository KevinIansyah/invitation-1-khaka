<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gift extends Model
{
    protected $fillable = [
        'bank_name',
        'account_number',
        'account_name',
        'bank_logo',
    ];
}
