<?php

namespace App\Manager;

use App\Entity\Author;
use App\Framework\Actions\Password;
use App\Framework\Session\Session;

class AuthorManager extends BaseManager
{
  public function findAll(): array
  {
    $query = $this->db->query("SELECT * FROM author");;
    $tab = $query->fetchAll(\PDO::FETCH_ASSOC);
    $result = [];
    foreach ($tab as $author) {
      $result[] = new Author($author);
    }

    return $result;
  }

  public function findById(int $id)
  {
    $query = $this->db->prepare('SELECT * FROM author WHERE id = :id');
    $query->bindValue(':id', $id, \PDO::PARAM_INT);
    $query->execute();
    $result = $query->fetch(\PDO::FETCH_ASSOC);
    if ($result != false) {
      return new Author($result);
    }
  }

  public function isAdmin($id): bool
  {
    $query = $this->db->prepare('SELECT admin FROM author WHERE id = :id');
    $query->bindValue(':id', $id, \PDO::PARAM_INT);
    $query->execute();
    $data = $query->fetch();

    return $data;
  }

  public function add(Author $author): bool
  {
    $sql = "INSERT INTO author (`firstName`, `lastName`, `password`, mail,admin) VALUES (:firstname, :lastname, :password, :mail, :admin);";
    $request = $this->db->prepare($sql);
    $request->bindValue(':firstname', $author->getFirstName(), \PDO::PARAM_STR);
    $request->bindValue(':lastname', $author->getLastName(), \PDO::PARAM_STR);
    $request->bindValue(':password', $author->getPassword(), \PDO::PARAM_STR);
    $request->bindValue(':mail', $author->getMail(), \PDO::PARAM_STR);
    $request->bindValue(':admin', $author->isAdmin(), \PDO::PARAM_INT);

    return $request->execute();
  }

  public function passwordCheck(string $password, string $mail)
  {
    if ( !$this->mailCheck($mail)) {
      return false;
    }
    $id = $this->mailCheck($mail);
    $query = $this->db->prepare("SELECT password FROM author WHERE mail = :mail");
    $query->bindValue(':mail', $mail, \PDO::PARAM_STR);
    $query->execute();
    $data = $query->fetch(\PDO::FETCH_ASSOC);
    $passwordcheck = new Password();
    if ($passwordcheck->isValidPassword($password, $data['password'])) {
      return $id;
    } else {
      return false;
    }
  }

  public function mailCheck(string $mail)
  {
    $query = $this->db->prepare("SELECT `id` FROM author WHERE `mail` = :mail;");
    $query->bindValue(":mail", $mail, \PDO::PARAM_STR);
    $query->execute();
    $data = $query->fetch(\PDO::FETCH_ASSOC);
    if ($data) {
      return $data['id'];
    }

    return false;
  }

  public function deleteById(int $id)
  {
    $query = $this->db->prepare("DELETE FROM author WHERE id = :id;
                                            DELETE FROM post WHERE author = :id;
                                            DELETE FROM comment WHERE author = :id"
    );
    $query->bindValue(':id', $id, \PDO::PARAM_INT);
    $result = $query->execute();
  }
}