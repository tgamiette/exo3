<?php
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
use App\Framework\Router\Router;

session_start();
require 'vendor/autoload.php';


$router = new Router();
$router->getController();