<?php

namespace App\Manager;
use App\Framework\Database\PDOFactory;

class BaseManager
{
  protected \PDO $db;

  public function __construct()
  {
    $this->db = PDOFactory::getMysqlConnection();
  }
}