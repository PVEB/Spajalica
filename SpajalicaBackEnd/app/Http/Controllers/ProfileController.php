<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


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

    public function Transform()
    {
        $data = Input::all();
        $odgovor = json_decode(json_encode($data));
        $odgovor->prvi = 2*$odgovor->prvi;
        $odgovor->drugi = 2*$odgovor->drugi;

        //pravi neki JSON od niza
        return json_encode($odgovor); //json_encode($data);
    }

    public function Opt(){
        return response('hello from the other side!', 200)
            ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'accept, content-type,  text/html');

    }
}

