<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuestBookController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Invitation\EventController;
use App\Http\Controllers\Invitation\FamilyController;
use App\Http\Controllers\Invitation\GiftController;
use App\Http\Controllers\Invitation\MusicController;
use App\Http\Controllers\Invitation\ShareController;
use App\Http\Controllers\WishController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/wish', [WishController::class, 'store'])->name('wish.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('invitations')->group(function () {
            Route::get('/family', [FamilyController::class, 'edit'])->name('family.edit');
            Route::patch('/family', [FamilyController::class, 'update'])->name('family.update');

            Route::get('/event', [EventController::class, 'edit'])->name('event.edit');
            Route::patch('/event', [EventController::class, 'update'])->name('event.update');

            Route::get('/music', [MusicController::class, 'edit'])->name('music.edit');
            Route::patch('/music', [MusicController::class, 'update'])->name('music.update');
            Route::delete('/music', [MusicController::class, 'destroy'])->name('music.destroy');

            Route::get('/share', [ShareController::class, 'edit'])->name('share.edit');
            Route::patch('/share', [ShareController::class, 'update'])->name('share.update');

            Route::resource('gift', GiftController::class)->only([
                'index',
                'store',
                'edit',
                'update',
                'destroy',
            ]);
        });

        Route::resource('wish', WishController::class)->only([
            'index',
            'destroy',
        ]);

        Route::resource('guest-book', GuestBookController::class);
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
