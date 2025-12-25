<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Dateng Aja 1',
                'email' => 'datengaja@example.com',
                'password' => Hash::make('datengaja123*'),
                'role' => 'user',
            ],
            [
                'name' => 'Kevin Iansyah',
                'email' => 'keviniansyah04@gmail.com',
                'password' => Hash::make('datengaja123*'),
                'role' => 'admin',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
