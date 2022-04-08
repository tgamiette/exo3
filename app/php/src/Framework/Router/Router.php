<?php

namespace App\Framework\Router;

use App\Controller\ErrorController;

class Router {
  public function getController() {
    $xml = new \DOMDocument();
    $xml->load(__DIR__ . '/route.xml');

    $routes = $xml->getElementsByTagName('route');

    if (isset($_GET['p'])) {
      $path = htmlspecialchars($_GET['p']);
    }
    else {
      $path = "/";
    }

    foreach ($routes as $route) {
      if ($path === $route->getAttribute('p')) {
        $controllerClass = 'App\\Controller\\' . $route->getAttribute('controller');
        $action = $route->getAttribute('action');
        $params = [];

        if ($route->hasAttribute('params')) {
          $keys = explode(',', $route->getAttribute('params'));
          foreach ($keys as $key) {
            $params[$key] = $_GET[$key];
          }
        }

//var_dump($controllerClass,$action,$params,$_SERVER['REQUEST_METHOD']);
        return new $controllerClass($action, $params, $_SERVER['REQUEST_METHOD']);
      }
    }

    return new ErrorController('NoRoute');
  }
}