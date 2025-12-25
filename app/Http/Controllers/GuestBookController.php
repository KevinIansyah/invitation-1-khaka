<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuestBook\StoreGuestBookRequest;
use App\Http\Requests\GuestBook\UpdateGuestBookRequest;
use App\Models\GuestBook;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestBookController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 20);
        $perPage = in_array($perPage, [20, 30, 40, 50]) ? $perPage : 20;

        $search = $request->get('search');

        $query = GuestBook::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('category', 'like', '%' . $search . '%');
            });
        }

        $guestBooks = $query->latest()->paginate($perPage);

        $guestBooks->appends($request->query());

        $invitation = Invitation::first();

        return Inertia::render('dashboard/guest-book', [
            'guestbooks' => $guestBooks,
            'invitation' => $invitation,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreGuestBookRequest $request)
    {
        try {
            $validated = $request->validated();

            GuestBook::create($validated);

            return back()->with('success', 'Data tamu berhasil disimpan');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data tamu.']);
        }
    }

    public function edit(GuestBook $guestBook)
    {
        return response()->json($guestBook);
    }

    public function update(UpdateGuestBookRequest $request, GuestBook $guestBook)
    {
        try {
            $validated = $request->validated();

            $guestBook->update($validated);

            return back()->with(['success' => 'Data tamu berhasil diperbarui.']);
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data tamu.']);
        }
    }

    public function destroy(GuestBook $guestBook)
    {
        try {
            $guestBook->delete();

            return back()->with('success', 'Data tamu berhasil dihapus');
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat menghapus data tamu.']);
        }
    }
}
