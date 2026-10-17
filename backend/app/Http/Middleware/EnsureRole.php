<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    /**
     * Chặn truy cập trái phép và trả về mã lỗi 403 Forbidden
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        // Kiểm tra vai trò của người dùng có nằm trong danh sách cho phép không
        if (! $user || ! in_array($user->role, $roles, true)) {
            Log::warning('Truy cap trai phep bi chan boi EnsureRole', [
                'user_id' => $user?->id,
                'email'   => $user?->email,
                'role'    => $user?->role,
                'path'    => $request->path(),
                'ip'      => $request->ip(),
            ]);

            abort(403, 'Lỗi 403 Forbidden: Bạn không có quyền truy cập vào tài nguyên này.');
        }

        return $next($request);
    }
}