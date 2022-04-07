<?php

namespace App\Entity;

abstract class BaseEntity {

  public function __construct(array $array) {
    $this->hydrate($array);
  }

  public function hydrate(array $data) {
    foreach ($data as $attribut => $value) {
      $method = 'set' . str_replace(' ', '', ucfirst(str_replace('_', ' ', $attribut)));
      if (is_callable(array($this, $method))) {
        $this->$method($value);
      }
    }
  }
}