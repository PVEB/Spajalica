<?php

namespace App\Http\Middleware;

use Closure;
/**
 * Class Cors
 * @package App\Http\Middleware
 */
class Cors
{
    /**
     * Handle an incoming request.
     *
     * Please add header('Access-Control-Allow-Origin: http://example.com');
     * & header('Access-Control-Allow-Credentials: true');
     * at the top of your route file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->isMethod('options')) {
            return response('Ok', 200)
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, HEAD')
                ->header('Access-Control-Allow-Headers', 'accept, content-type, text/html');
                //->header('Access-Control-Allow-Origin', '*'); // Add any required headers here

        }
        return $next($request);
    }
}