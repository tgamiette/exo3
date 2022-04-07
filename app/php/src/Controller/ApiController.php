<?php

namespace App\Controller;


use App\Controller\UserManager;
use App\Entity\User;

class ApiController extends BaseController {

  public function getUser($params) {
    die();
//    $id = (int)$params['id'];
    $params['id'] = (int)$params['id'];
//    $user = new User($params);
    $postmanager = new UserManager();

    if ($_GET['name'] && $_GET['lastname']) {
      $postmanager->add($user);
    }

    if ($id === 0) {
//      $posts = $postmanager->findAll();
    }
    else {
//      $posts = $postmanager->findById($id);
    }
    $this->renderJSON("test");
  }

  public function postUser($params) {

    if (isset($_GET['name']) && isset($_GET['lastname'])) {
      unset($_GET['id']);
      $user = new User($_GET);
      $userManager = new UserManager();

      $userManager->add($user);
      $this->renderJSON(["message" => 'ajoute réussi']);

    }


    $post = new User($_POST);
    $id = (int)$params['id'];
    $Postmanager = new PostManager();
    $result = $Postmanager->add($post);
    if ($result) {
      $this->renderJSON("Mise a jour Ok");
    }
    else {
      $this->renderJSON("Mise a jour KOOOOOO");
    }
  }
//
//
//  public function deletePost($params)
//  {
//    $id = (int)$params['id'];
//    $Postmanager = new PostManager();
//    $commentmanager = new CommentManager();
//    $result = $Postmanager->deleteById($id);
//    $commentmanager->deleteByPostId($id);
//    if ($result) {
//      $this->renderJSON("Mise a jour Ok");
//    } else {
//      $this->renderJSON("Mise a jour KOOOOOO");
//    }
//  }
//
//
//  public function putPost($params)
//  {
//    parse_str(file_get_contents("php://input"), $_PUT);
//    $id = (int)$params['id'];
//
//    if ($id == 0 || empty($_PUT['author']) || empty($_PUT['content']) || empty($_PUT['publishedAt']) || empty($_PUT['title'])) {
//      $this->renderJSON("il manque l'id ou des paramètres");
//    } else {
//      $postmanager = new PostManager();
//      $post = $postmanager->findById($id);
//
//      $result = $postmanager->update($post);
//      if ($result) {
//        $this->renderJSON("Mise a jour Ok");
//      } else {
//        $this->renderJSON("Mise a jour KOOOOOO");
//      }
//    }
//  }
}