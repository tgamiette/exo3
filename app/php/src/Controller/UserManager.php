<?php

namespace App\Controller;

use App\Entity\User;
use App\Manager\BaseManager;

class UserManager extends BaseManager {

  public function add(User $user) {
    $sql = "INSERT INTO `user` (`name`, `lastname`) VALUES (:name, :lastname);";
    $request = $this->db->prepare($sql);
    $request->bindValue(':lastname', $user->getLastname());
    $request->bindValue(':name', $user->getName());
    $request->execute();
  }

  public function deleteById($id) {
    $sql = "DELETE FROM `user` WHERE `id`=:id";
    $requete = $this->db->prepare($sql);
    $result = $requete->execute(array(":id" => $id));
    return $result;
  }

  public function set(User $user) {
    $sql = "UPDATE `user`
                        SET `name`=`:name`, `lastname`=`:lastname` 
                        WHERE `id`=:id";
    $request = $this->db->prepare($sql);

    $request->bindValue(':name', $user->getName(), PDO::PARAM_STR);
    $request->bindValue(':lastname', $user->getLastname(), PDO::PARAM_STR);

    $request->execute();
  }
}