<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class follows extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'follow_id',
    ];

    //relasi
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}
