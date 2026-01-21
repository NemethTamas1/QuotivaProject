<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // $middleware->validateCsrfTokens(except: [
        //     'api/offers',
        //     'login',
        //     'logout',
        //     'dashboard',
        //     'api/user-profiles',
        //     'api/register',
        //     'api/login',
        //     'api/logout',
        //     'api/me',
        //     'sanctum/csrf-cookie'
        // ]);

        $middleware->validateCsrfTokens(except:[
            '/logout'
        ]);

        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
