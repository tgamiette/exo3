<?php

namespace App\Manager;

use App\Entity\Post;

class PostManager extends BaseManager {
  /**
   * @return Post[]
   */
  public function getAllPost(): array {
    return [];
  }

  /**
   * @return Post
   */
  public function getPostById(): Post {

    return new Post();
  }

  /**
   * @param Post $post
   * @return boolean|bool
   */
  public function createPost(Post $post) {

  }

  /**
   * @return bool
   */
  public function deletePostById(): bool {

    return true;
  }

  /**
   * @param Post $post
   * @return boolean|bool
   */
  public function updatePost(Post $post,) {
    //TODO - getPostById($post->getId)
  }

  public function addPost(Post $post) {
    $sql = "INSERT INTO `comment` (`title`, `description`,`author_id`) VALUES (:title, :description, :author);";
    $request = $this->db->prepare($sql);

    $request->bindValue(':title', $post->getTitle());

    $request->bindValue(':description', $post->getDescription());

    $request->bindValue(':author', $post->getAuthorId(), \PDO::PARAM_INT);

    return $request->execute();
  }

  public function findAll(): array {
    $query = $this->db->query("SELECT * FROM comment");;
    $comments = $query->fetchAll(\PDO::FETCH_ASSOC);
    return $comments;
  }

}