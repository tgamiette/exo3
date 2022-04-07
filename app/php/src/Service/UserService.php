<?php

namespace App\Service;

use App\Entity\User;

class UserService {

//TODO voir si on peut utilise ce helpers afin de verifier toute nos entité
  public static function checkParams(array $params, $entity) {
    foreach ((array)$params as $key => $value) {
      if (is_callable([$entity, 'get'])) {

      }
    }
    return true;
  }
}