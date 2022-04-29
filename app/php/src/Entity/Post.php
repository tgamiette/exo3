<?php

namespace App\Entity;

class Post extends BaseEntity {
  private int $id;
//    private \DateTime $date;
  private string $title;
  private string $content;
  private int $authorId;

  public function __construct($arr) {
    parent::__construct($arr);
  }

  /**
   * @return \DateTime
   */
  public function getDate(): \DateTime {
    return $this->date;
  }

  /**
   * @param \DateTime $date
   */
  public function setDate(\DateTime $date): void {
    $this->date = $date;
  }

  /**
   * @return string
   */
  public function getTitle(): string {
    return $this->title;
  }

  /**
   * @param string $title
   */
  public function setTitle(string $title): void {
    $this->title = $title;
  }

  /**
   * @return string
   */
  public function getContent(): string {
    return $this->description;
  }

  /**
   * @param string $description
   */
  public function setContent (string $description): void {
    $this->description = $description;
  }

  /**
   * @return int
   */
  public function getAuthorId(): int {
    return $this->authorId;
  }

  /**
   * @param int $authorId
   */
  public function setAuthorId(int $authorId): void {
    $this->authorId = $authorId;
  }

}