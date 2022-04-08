<?php

namespace App\Controller;

use App\Manager\UserManager;

abstract class BaseController {
  private $templateFile = __DIR__ . "/../Views/template.php";
  private $viewDIR = __DIR__ . "/../Views/Frontend/";

  public function __construct(string $action, $params = [], $method = 'get') {

    $method = strtolower($method) . ucfirst($action);
    if (!is_callable([$this, $method])) {
      throw new \RuntimeException(" L'action " . $method . " n'est pas définie ");
    }

    $this->$method($params);

  }

  public function render(string $template, array $arguments = [], string $title = 'titre') {
    $view = $this->viewDIR . $template . '.php';
    var_dump($view);
    foreach ($arguments as $key => $value) {
      ${$key} = $value;
    }
    ob_start();
    require $view;
    $content = ob_get_clean();
    require $this->templateFile;
    exit;
  }

  public function checkAccess() {
    $userManager = new UserManager();
    $user = $userManager->checkToken(getallheaders()['authorization']);
    if ($user === false) {
      $this->renderJSON("jwt Erroné");
    }
    return $user;
  }

  public function renderJSON($content) {
//    $header= new HTTPResponse();
//    $header->addHeader('Content-Type: application/json');
    echo json_encode($content);
//    echo json_encode($_COOKIE);
    exit();
  }
}
