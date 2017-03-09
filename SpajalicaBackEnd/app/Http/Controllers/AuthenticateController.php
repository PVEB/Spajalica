<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use JWT;
use \Illuminate\Http\Response as IResponse;
use Response;

class AuthenticateController extends Controller
{
    private $header;
    private $payload;
    private $signature;

    public function __construct()
    {
        $signature = config('app.key');
        $payload = array(
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
        $credentials = Input::all('email', 'userName');
        $existingUser = UserLoginController::VerifyUser($credentials);

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

    public function authenticate()
    {
        $credentials = Input::all('email', 'userName');
        $result = UserLoginController::VerifyUser($credentials);

        if (count($result) == 1)
        {
            $this->payload['userName'] = $result[0]->userName;
            $this->payload['timeIssued'] = date('Y-m-d H:i:s');
            $token = JWT::encode($this->payload, $this->signature);
            return json_encode(JWT::decode($token, $this->signature, array('HS256')));
        }
        else
        {
            return Response::json(['error' => 'User not found.'], IResponse::HTTP_NOT_FOUND);
        }
    }
}
