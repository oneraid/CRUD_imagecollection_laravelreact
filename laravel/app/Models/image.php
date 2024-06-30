<?php

namespace App\Models;

use App\Models\Comments;
use App\Models\Favorites;
use App\Models\Likeimage;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'image',
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
        return $this->hasMany(Likeimage::class, 'image_id', 'id');
    }

    public function favorites()
    {
        return $this->hasMany(Favorites::class, 'image_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comments::class, 'image_id', 'id');
    }
}
