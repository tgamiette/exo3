<?php

namespace App\Entity;


class User {
  protected int $id;
  protected string $name;
  protected string $lastname;

  public function __construct(array $data = []) {
    $this->hydrate($data);
  }

  public function hydrate(array $data) {
    foreach ($data as $attribut => $value) {
      $method = 'set' . str_replace(' ', '', ucfirst(str_replace('_', ' ', $attribut)));
      if (is_callable(array($this, $method))) {
        $this->$method($value);
      }
    }
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

  public function getLastname(): string {
    return $this->lastname;
  }

  public function setLastname(string $val) {
    $this->lastname = $val;
  }

}
