<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Route Filtering
    |--------------------------------------------------------------------------
    |
    | Routes can be filtered by the route name, the route domain, and the URI.
    | You can add your own custom filter function to be able to have full
    | control over which routes are included in the generated JavaScript.
    |
    */

    'only' => [
        'home',
        'login',
        'register',
        'register.student',
        'password.request',
        'password.reset',
        'verification.notice',
        'verification.verify',
        'verification.send',
        'password.email',
        'password.update',
        'password.confirm',
        'student.profile',
        'admin.dashboard',
    ],

    /*
    |--------------------------------------------------------------------------
    | Route Groups
    |--------------------------------------------------------------------------
    |
    | Sometimes you may want to group routes by some arbitrary key. You can
    | use the 'groups' key to define your groups. The key is the group
    | name and the value is an array of routes that should be included
    | in this group.
    |
    */

    'groups' => [
        'admin' => ['admin.*'],
        'auth' => ['login', 'register', 'password.*', 'verification.*'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Route Model Binding
    |--------------------------------------------------------------------------
    |
    | If you would like model binding to automatically fetch the model
    | from the database when using route model binding, set this to true.
    |
    */

    'bindings' => true,

    /*
    |--------------------------------------------------------------------------
    | Absolute URLs
    |--------------------------------------------------------------------------
    |
    | If you would like to generate absolute URLs, set this to true.
    |
    */

    'absolute' => false,

    /*
    |--------------------------------------------------------------------------
    | URL Generation
    |--------------------------------------------------------------------------
    |
    | This option determines how the package should handle URL generation.
    |
    | 'default' - Use the default Laravel URL generator
    | 'tinkerwell' - Use the Tinkerwell URL generator (for Tinkerwell)
    |
    */

    'url_generator' => 'default',

    /*
    |--------------------------------------------------------------------------
    | Default Route Parameters
    |--------------------------------------------------------------------------
    |
    | Here you may define the default values for route parameters.
    |
    */

    'default_parameters' => [],
];
