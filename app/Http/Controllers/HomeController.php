<?php

namespace App\Http\Controllers;

use App\Models\Gift;
use App\Models\GuestBook;
use App\Models\Invitation;
use App\Models\Wish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $guestSlug = $request->query('to');

        if (!$guestSlug) {
            abort(404);
        }

        $guest = GuestBook::where('slug', $guestSlug)->firstOrFail();

        if (!$guest->opened_at) {
            $guest->update(['opened_at' => now()]);
        }

        $invitation = Invitation::first();
        $wishes = Wish::latest()->get();
        $gifts = Gift::all();

        return Inertia::render('home', [
            'guest' => $guest,
            'invitation' => $invitation,
            'wishes' => $wishes,
            'gifts' => $gifts,
        ]);
    }
}
