<?php

namespace App\Controller;

class ErrorController extends BaseController
{

  public function getNoRoute()
  {
    $this->render('404', ['msg' => "Cette URL n'existe pas essaye autre chose"], "URL non trouvé");
  }
}