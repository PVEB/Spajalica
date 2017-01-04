<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;


class GlupOdgovor {
    public $prvi;
    public $drugi;
}

class ProfileController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function Show($id)
    {
        $odgovor = new GlupOdgovor();
        $odgovor->drugi = 2*$id;
        $odgovor->prvi = 1*$id;

        //pravi neki JSON od objekta
        return json_encode($odgovor);
    }

    public function Transform(Request $request)
    {
        //$zahtev = Request::json()->all();
        //$zahtev = $request->input('prvi', 40);
        //$post = Post::create($request->all());
        //$zahtev = $request->acceptsJson();
        $id = 25;
        //pravi neki JSON od objekta
        return $id;
    }
}

