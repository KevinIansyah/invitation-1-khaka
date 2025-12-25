<?php

namespace App\Http\Controllers\Invitation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invitations\StoreGiftRequest;
use App\Http\Requests\Invitations\UpdateGiftRequest;
use App\Models\Gift;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GiftController extends Controller
{
    public function index(Request $request): Response
    {
        $gifts = Gift::orderBy('created_at', 'desc')->get();

        return Inertia::render('dashboard/invitations/gift', [
            'gifts' => $gifts,
        ]);
    }

    public function store(StoreGiftRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            Gift::create($validated);

            return back()->with('success', 'Data hadiah berhasil disimpan');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data hadiah.']);
        }
    }

    public function edit(Gift $gift): JsonResponse
    {
        return response()->json($gift);
    }

    public function update(UpdateGiftRequest $request, Gift $gift): RedirectResponse
    {
        try {
            $validated = $request->validated();

            $gift->update($validated);

            return back()->with('success', 'Data hadiah berhasil diperbarui');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data hadiah.']);
        }
    }

    public function destroy(Gift $gift): RedirectResponse
    {
        try {
            $gift->delete();

            return back()->with('success', 'Data hadiah berhasil dihapus');
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat menghapus data.']);
        }
    }
}
