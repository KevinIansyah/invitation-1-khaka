<?php

namespace App\Http\Controllers\Invitation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invitations\UpdateEventRequest;
use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function edit(Request $request): Response
    {
        $invitation = Invitation::first();

        return Inertia::render('dashboard/invitations/event', [
            'invitation' => $invitation,
        ]);
    }

    public function update(UpdateEventRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $invitation = Invitation::firstOrNew();

            $invitation->event_date = $validated['event_date'];
            $invitation->event_time = $validated['event_time'];
            $invitation->event_location = $validated['event_location'];
            $invitation->event_location_url = $validated['event_location_url'] ?? null;

            $invitation->save();

            return back()->with('success', 'Data acara berhasil disimpan');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data acara.']);
        }
    }
}
