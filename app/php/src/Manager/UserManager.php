<?php

namespace App\Manager;

use App\Entity\User;

class UserManager extends BaseManager {

  public function add(User $user) {
    $sql = "INSERT INTO `user` (`name`,`password`, `jwt`) VALUES (:name,:password , :jwt);";
    $request = $this->db->prepare($sql);

    $request->bindValue(':jwt', $user->getJwt());
    $request->bindValue(':password', $user->getPassword());
    $request->bindValue(':name', $user->getName());
    return $request->execute();
  }

  public function deleteById($id) {
    $sql = "DELETE FROM `user` WHERE `id`=:id";
    $requete = $this->db->prepare($sql);
    return $requete->execute(array(":id" => $id));
  }

  public function set(User $user): bool {
    $sql = "UPDATE `user`   
                        SET `name`=`:name`, `lastname`=`:lastname` 
                        WHERE `id`=:id";
    $request = $this->db->prepare($sql);

    $request->bindValue(':name', $user->getName(), PDO::PARAM_STR);
    $request->bindValue(':lastname', $user->getLastname(), PDO::PARAM_STR);

    return $request->execute();
  }

  /**
   * @return User[]
   */
  public function findAll(): array {
    $collect = [];
    $sql = "SELECT * FROM `user`";
    $query = $this->db->query($sql);
    $result = $query->fetchAll(\PDO::FETCH_ASSOC);
    foreach ($result as $user) {
      $collect[] = new User($user);
    }
    return $collect;
  }

  public function checkConnexion(array $array) {
    $sql = "SELECT  `jwt` FROM user  WHERE `name`=:name AND `password` = :password";
    $request = $this->db->prepare($sql);

    $request->bindValue(':name', $array['name'], \PDO::PARAM_STR);
    $request->bindValue(':password', $array['password'], \PDO::PARAM_STR);

    $request->execute();
    return $request->fetch(\PDO::FETCH_ASSOC);
  }

  public function checkToken($jwt) {
    $sql = "SELECT  * FROM user  WHERE `jwt`=:jwt";
    $request = $this->db->prepare($sql);
    $request->bindValue(':jwt', $jwt);
    $request->execute();
    return $request->fetch(\PDO::FETCH_ASSOC);

  }

}