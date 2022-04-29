<?php

namespace App\Controller;

use App\Entity\User;
use App\Manager\UserManager;
use App\Service\jwtHelper;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use HttpResponse;
use JetBrains\PhpStorm\NoReturn;

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
	
	public function checkAccess($token) {
		try {
			$payloads = (new jwtHelper())->decode($token);
			$result = (new UserManager())->findById($payloads->id);
			return new User($result);
			
		}
		catch (ExpiredException) {
			$this->renderJSON("token expirer", 401);
		}
	}
	
	public function renderJSON($content, $code = 200): void {
//    $header= new HTTPResponse();
//    $header->addHeader('Content-Type: application/json');
		http_response_code($code);
		echo json_encode($content);
//    echo json_encode($_COOKIE);
		exit();
	}
}
