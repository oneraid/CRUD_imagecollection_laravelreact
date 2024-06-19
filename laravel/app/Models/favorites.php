<?php

namespace App\Models;

use App\Models\image;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class favorites extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'image_id',
    ];

    //relasi
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function image()
    {
        return $this->belongsTo(image::class, 'image_id', 'id');
    }
}
