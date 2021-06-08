<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    //Relacion de uno a muchos inversa (MUCHOS A UNO) muchos post para un usuario
    public function user(){
        return $this->belongsTo('App\User','user_id');
    }
    //Relacion de uno a muchos inversa (MUCHOS A UNO) muchas categorias para un usuario
    public function category(){
        return $this->belongsTo('App\Category','category_id');
    }
}
