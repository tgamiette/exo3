<?php

namespace App\Manager;


use App\Entity\User;

class UserManager {
  protected PDO $dbo;


  public function add($user) {
    $sql = "INSERT INTO `user` (`name`, `lastname`) VALUES (:name, :lastname);";
    $request = $this->dbo->prepare($sql);
    $request->bindValue(':lastname', $user->getLastname(), PDO::PARAM_STR);
    $request->bindValue(':name', $user->getName(), PDO::PARAM_STR);
    $request->execute();
  }

  public function deleteById($id) {
    $sql = "DELETE FROM `user` WHERE `id`=:id";
    $requete = $this->dbo->prepare($sql);
    $result = $requete->execute(array(":id" => $id));
    return $result;
  }

  public function set(User $user) {
    $sql = "UPDATE `user`
                        SET `name`=`:name`, `lastname`=`:lastname` 
                        WHERE `id`=:id";
    $request = $this->dbo->prepare($sql);

    $request->bindValue(':name', $user->getName(), PDO::PARAM_STR);
    $request->bindValue(':lastname', $user->getLastname(), PDO::PARAM_STR);

    $request->execute();
  }
}