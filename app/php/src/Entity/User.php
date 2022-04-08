<?php

namespace App\Entity;


class User extends BaseEntity {
  protected int $id;
  protected string $name;
  protected string $lastname;
  protected string $email;
  protected string $jwt;

  /**
   * @return string
   */
  public function getEmail(): string {
    return $this->email;
  }

  /**
   * @param string $email
   */
  public function setEmail(string $email): void {
    $this->email = $email;
  }

  /**
   * @return string
   */
  public function getJwt(): string {
    return $this->jwt;
  }

  /**
   * @param string $jwt
   */
  public function setJwt(string $jwt): void {
    $this->jwt = $jwt;
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
//  public function __construct(array $data = []) {
//    parent
//    $this->hydrate($data);
//  }



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

  public function getLastname(): string {
    return $this->lastname;
  }

  public function setLastname(string $val) {
    $this->lastname = $val;
  }


}
