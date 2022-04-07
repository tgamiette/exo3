<?php

namespace App\Controller;


use App\Entity\User;
use App\Manager\UserManager;

class ApiController extends BaseController {

  public function getUser($params) {
    $userManager = new UserManager();
    $id = (int)$params['id'];
    var_dump($id);

    if ($id === 0) {
      $posts = $userManager->findAll();
    }
    else {
      $posts = $userManager->findById($id);
    }
    $this->renderJSON("test");
  }

  public function postUser($params) {
    if (isset($_POST['name']) && isset($_POST['lastname'])) {
      $user = new User($_POST);
      $userManager = new UserManager();
      $result = $userManager->add($user);
      if ($result) {
        $this->renderJSON(["message" => 'ajoute réussi','status'=>200]);
      }
      else {
        throw new \HttpException("Problème lors de l'ajout de la requête");
        $this->renderJSON(["message" => "Problème lors de l'ajout", "status" => 400]);
      }
    }
    else {
      $this->renderJSON(["message" => 'il manque des popriété', "status" => 400]);
    }
  }

//  public function deleteUser($params)
//  {
//    $id = (int)$params['id'];
//    $Usermanager = new UserManager();
//    $commentmanager = new CommentManager();
//    $result = $Usermanager->deleteById($id);
//    $commentmanager->deleteByUserId($id);
//    if ($result) {
//      $this->renderJSON("Mise a jour Ok");
//    } else {
//      $this->renderJSON("Mise a jour KOOOOOO");
//    }
//  }
//
//
//  public function putUser($params)
//  {
//    parse_str(file_get_contents("php://input"), $_PUT);
//    $id = (int)$params['id'];
//
//    if ($id == 0 || empty($_PUT['author']) || empty($_PUT['content']) || empty($_PUT['publishedAt']) || empty($_PUT['title'])) {
//      $this->renderJSON("il manque l'id ou des paramètres");
//    } else {
//      $userManager = new UserManager();
//      $user = $userManager->findById($id);
//
//      $result = $userManager->update($user);
//      if ($result) {
//        $this->renderJSON("Mise a jour Ok");
//      } else {
//        $this->renderJSON("Mise a jour KOOOOOO");
//      }
//    }
//  }
}