<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = [
        'title',
        'content',
        'category_id',
        'image'
    ];

    //Relacion de uno a muchos inversa (MUCHOS A UNO) muchos post para un usuario
    public function user(){
        return $this->belongsTo('App\Models\User','user_id');
    }
    //Relacion de uno a muchos inversa (MUCHOS A UNO) muchas categorias para un usuario
    public function category(){
        return $this->belongsTo('App\Models\Category','category_id');
    }
}
