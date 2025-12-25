<?php

namespace App\Http\Controllers;

use App\Models\GuestBook;
use App\Models\Wish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/index', [
            'totalguests' => GuestBook::count(),
            'totalwishes' => Wish::count(),
        ]);
    }
}
