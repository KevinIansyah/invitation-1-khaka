<?php

namespace App\Http\Controllers;

use App\Http\Requests\Invitations\StoreWishRequest;
use App\Models\Wish;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 20);
        $perPage = in_array($perPage, [20, 30, 40, 50]) ? $perPage : 20;

        $search = $request->get('search');

        $query = Wish::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('message', 'like', '%' . $search . '%');
            });
        }

        $wish = $query->latest()->paginate($perPage);

        $wish->appends($request->query());

        return Inertia::render('dashboard/wish', [
            'wish' => $wish,
            'filters' => [
                'search' => $search
            ],
        ]);
    }

    public function store(StoreWishRequest $request): RedirectResponse
    {
        try {
            $validated = $request->validated();

            Wish::create([
                'name' => $validated['name'],
                'message' => $validated['message'],
            ]);

            return back()->with('success', 'Ucapan berhasil dikirim');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat mengirim ucapan.']);
        }
    }

    public function destroy(Wish $wish)
    {
        try {
            $wish->delete();

            return back()->with('success', 'Data ucapan berhasil dihapus');
        } catch (\Exception $e) {
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat menghapus data ucapan.']);
        }
    }
}
