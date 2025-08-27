<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        
        // If user is a student, redirect to student dashboard
        if ($user->role_id === 4) { // 4 is the ID for Student role
            return redirect()->route('student.dashboard');
        }

        // Check if user is admin
        if (!$user->isAdmin()) {
            abort(403, 'Unauthorized action. Admin access required.');
        }

        return $next($request);
    }
}
