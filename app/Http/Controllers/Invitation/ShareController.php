<?php

namespace App\Http\Controllers\Invitation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invitations\UpdateShareRequest;
use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShareController extends Controller
{
    public function edit(Request $request): Response
    {
        $invitation = Invitation::first();

        $defaultMessage = "Kepada Yth.\nBapak/Ibu/Saudara/i\n*[recipient_name]*\ndi tempat\n\nDengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Khitanan putra kami tercinta.\n\nUntuk informasi lebih lengkap, silakan klik link berikut:\n[website_link]\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nDengan penuh suka cita,\n*Keluarga Besar*";

        return Inertia::render('dashboard/invitations/share', [
            'invitation' => $invitation,
            'defaultMessage' => $defaultMessage,
        ]);
    }

    public function update(UpdateShareRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $invitation = Invitation::firstOrNew();

            $invitation->whatsapp_number = $validated['whatsapp_number'];
            $invitation->whatsapp_message = $validated['whatsapp_message'];

            $invitation->save();

            return back()->with('success', 'Data berbagi berhasil disimpan');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan pengaturan share.']);
        }
    }
}
