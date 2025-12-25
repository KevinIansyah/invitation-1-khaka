<?php

namespace App\Http\Controllers\Invitation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invitations\UpdateMusicRequest;
use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MusicController extends Controller
{
    public function edit(Request $request): Response
    {
        $invitation = Invitation::first();

        return Inertia::render('dashboard/invitations/music', [
            'invitation' => $invitation,
        ]);
    }

    public function update(UpdateMusicRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $invitation = Invitation::firstOrNew();

            if ($request->hasFile('music')) {
                if ($invitation->music && Storage::disk('public')->exists($invitation->music)) {
                    Storage::disk('public')->delete($invitation->music);
                }

                $path = $request->file('music')
                    ->store('invitations/music', 'public');

                $invitation->music = $path;
            }

            $invitation->save();

            return back()->with('success', 'Data musik berhasil disimpan');
        } catch (\Exception $e) {


            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan file musik.']);
        }
    }

    public function destroy(Request $request): RedirectResponse
    {
        try {
            $invitation = Invitation::first();

            if ($invitation && $invitation->music) {
                if (Storage::disk('public')->exists($invitation->music)) {
                    Storage::disk('public')->delete($invitation->music);
                }

                $invitation->music = null;
                $invitation->save();
            }

            return back();
        } catch (\Exception $e) {

            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat menghapus file musik.']);
        }
    }
}
