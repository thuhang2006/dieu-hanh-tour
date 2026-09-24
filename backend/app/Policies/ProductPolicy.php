<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    /**
     * Quản trị viên sửa được mọi tour; Nhà cung cấp chỉ sửa tour của chính mình
     */
    public function update(User $user, Product $product): bool
    {
        if ($user->role === 'quan_tri') {
            return true;
        }

        if ($user->role === 'nha_cung_cap') {
            return $product->supplier_id === $user->supplier_id;
        }

        return false;
    }

    /**
     * Chỉ có Quản trị viên mới có quyền xóa sản phẩm
     */
    public function delete(User $user, Product $product): bool
    {
        return $user->role === 'quan_tri';
    }
}