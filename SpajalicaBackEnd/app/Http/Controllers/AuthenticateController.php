<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use JWT;
use \Illuminate\Http\Response as IResponse;
use Response;
use DB;

class AuthenticateController extends Controller
{
    private $payload;
    private $signature;

    public function __construct()
    {
        $this->signature = config('app.key');
        $this->payload = array(
            "iss" => "SpajalicaBackEnd",
            "aud" => "http://example.com",
        );
    }

    public function register()
    {
        $credentials = Input::all('email', 'userName', 'password');
        $newUser = RegisterController::AddUser($credentials);

        if (count($newUser) == 1)
        {
            $this->payload['userName'] = $newUser[0]->userName;
            $this->payload['timeIssued'] = date('Y-m-d H:i:s');
            return JWT::encode($this->payload, $this->signature);
        }
        else
        {
            return Response::json(['error' => 'User already exists.'], IResponse::HTTP_CONFLICT);
        }
    }

    public function login()
    {
        $credentials = Input::all('userName', 'password');
        $existingUser = LoginController::VerifyUser($credentials);

        if (count($existingUser) == 1)
        {
            $this->payload['userName'] = $existingUser[0]->userName;
            $this->payload['timeIssued'] = date('Y-m-d H:i:s');
            return JWT::encode($this->payload, $this->signature);
        }
        else
        {
            return Response::json(['error' => 'User does not exists.'], IResponse::HTTP_NOT_FOUND);
        }
    }

    public function validateToken()
    {
        $credentials = Input::all('token');
        $res = json_decode(json_encode($credentials));

        $users = DB::select('select idloginInfo from loginInfo where userName = ?',
            [JWT::decode($res->token, config('app.key'), array('HS256'))->userName]);

        if(count($users) == 1)
        {
            return Response::json(['response' => 'Token validated.'], IResponse::HTTP_OK);
        }
        else
        {
            return Response::json(['response' => 'User does not exists.'], IResponse::HTTP_CONFLICT);
        }
    }
}
