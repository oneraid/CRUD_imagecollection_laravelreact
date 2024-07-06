<?php

namespace App\Models;

use App\Models\image;
use App\Models\likeimage;
use App\Models\follows;
use App\Models\comments;
use App\Models\favorites;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'bio',
        'pictures',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }






    //Relasi
    public function images()
    {
        return $this->hasMany(image::class, 'user_id', 'id');
    }

    public function likeimage()
    {
        return $this->hasMany(likeimage::class, 'user_id', 'id');
    }

    public function follows()
    {
        return $this->hasMany(follows::class, 'user_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(comments::class, 'user_id', 'id');
    }

    public function favorites()
    {
        return $this->hasMany(favorites::class, 'user_id', 'id');
    }

}
