<?php

namespace App\Models;

use App\Models\comments;
use App\Models\favorites;
use App\Models\likeimage;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class image extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'url',
        'user_id',
    ];

    protected $table = 'image';

    //relasi
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function likeimage()
    {
        return $this->hasMany(likeimage::class, 'image_id', 'id');
    }

    public function favorites()
    {
        return $this->hasMany(favorites::class, 'image_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(comments::class, 'image_id', 'id');
    }
}
