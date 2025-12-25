<?php

namespace App\Http\Controllers\Invitation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invitations\UpdateFamilyRequest;
use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FamilyController extends Controller
{
    public function edit(Request $request): Response
    {
        $invitation = Invitation::first();

        return Inertia::render('dashboard/invitations/family', [
            'invitation' => $invitation,
        ]);
    }

    public function update(UpdateFamilyRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $invitation = Invitation::firstOrNew();

            $invitation->child_name = $validated['child_name'];
            $invitation->father_name = $validated['father_name'];
            $invitation->mother_name = $validated['mother_name'];

            if ($request->hasFile('child_photo')) {
                if ($invitation->child_photo && Storage::disk('public')->exists($invitation->child_photo)) {
                    Storage::disk('public')->delete($invitation->child_photo);
                }

                $path = $request->file('child_photo')
                    ->store('invitations/photos', 'public');

                $invitation->child_photo = $path;
            }

            $invitation->save();

            return back()->with('success', 'Data keluarga berhasil disimpan');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat mengupdate data keluarga.']);
        }
    }
}
