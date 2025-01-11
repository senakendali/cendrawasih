<?php

namespace Spatie\Permission\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public function groups()
    {
        return $this->belongsToMany(\App\Models\UserGroup::class, 'group_role');
    }
}
