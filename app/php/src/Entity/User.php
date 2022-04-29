<?php

namespace App\Entity;


class User extends BaseEntity {
  protected int $id;
  protected string $name;
  protected string $lastname;



  /**
   * @return string
   */
  public function getJwt(): string {
    return $this->jwt;
  }



  /**
   * @return string
   */
  public function getPassword(): string {
    return $this->password;
  }

  /**
   * @param string $password
   */
  public function setPassword(string $password): void {
    $this->password = $password;
  }
  protected string $password;

  public function __construct($arr) {
    parent::__construct($arr);
  }

  public function getId(): int {
    return $this->id;
  }

  public function setId($id): void {
    $this->id = $id;
  }

  public function getName() {
    return $this->name;
  }

  public function setName(string $val) {
    $this->name = $val;
  }

}
