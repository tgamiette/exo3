<?php

namespace App\Manager;


use App\Entity\Comment;

class  CommentManager extends BaseManager
{
  public function findAll(): array
  {
    $query = $this->db->query("SELECT * FROM comment");;
    $comments = $query->fetchAll(\PDO::FETCH_ASSOC);
    $result = [];
    foreach ($comments as $comment) {
      $result[] = new Comment($comment);
    }

    return $result;
  }

  public function findById(int $id): Comment
  {
    $query = $this->db->prepare('SELECT * FROM comment WHERE id = :id');
    $query->bindValue(':id', $id, \PDO::PARAM_INT);
    $query->execute();
    $query->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Entity\Comment.php');

    return new Comment($query->fetch());
  }

  public function deleteById(int $id): bool
  {
    $query = $this->db->prepare('DELETE FROM comment WHERE id = :id');
    $query->bindValue(':id', $id, \PDO::PARAM_INT);

    return $query->execute();
  }

  public function add(Comment $comment): bool
  {
    $sql = "INSERT INTO comment (author, `content`, publishedAt, post) VALUES (:author_id, :content, :date_published, :post_id);";
    $request = $this->db->prepare($sql);
    $request->bindValue(':author_id', $comment->getAuthor()->getId(), \PDO::PARAM_INT);
    $request->bindValue(':content', $comment->getContent(), \PDO::PARAM_STR);
    $request->bindValue(':date_published', $comment->getPublishedAt(), \PDO::PARAM_STR);
    $request->bindValue(':post_id', $comment->getPost()->getId(), \PDO::PARAM_INT);

    return $request->execute();
  }

  public function update(Comment $comment): bool
  {
    $sql = "INSERT INTO comment (author, `content`, publishedAt, post) VALUES (:author_id, :content, :date_published, :post_id);";
    $request = $this->db->prepare($sql);
    $request->bindValue(':author_id', $comment->getAuthor()->getId(), \PDO::PARAM_INT);
    $request->bindValue(':content', $comment->getContent(), \PDO::PARAM_STR);
    $request->bindValue(':date_published', $comment->getPublishedAt(), \PDO::PARAM_STR);
    $request->bindValue(':post_id', $comment->getPost()->getId(), \PDO::PARAM_INT);

    return $request->execute();
  }

  public function deleteByPostId(int $id): bool
  {
    $query = $this->db->prepare('DELETE FROM comment WHERE post = :id');
    $query->bindValue(':id', $id, \PDO::PARAM_INT);

    return $query->execute();
  }

  public function updatebyId(int $id, comment $comment)
  {
    $sql = "UPDATE `comment` SET `author` = ':author_id',
                                    `content` = ':content',
                                    `publishedAt`= ':date_published',
                                     `post` = ':post_id'
                        WHERE `comment`.`id` = ':id';";

    $request = $this->db->prepare($sql);
    $request->bindValue(':author_id', $comment->getAuthor()->getId(), \PDO::PARAM_INT);
    $request->bindValue(':content', $comment->getContent(), \PDO::PARAM_STR);
    $request->bindValue(':date_published', $comment->getPublishedAt(), \PDO::PARAM_STR);
    $request->bindValue(':post_id', $comment->getPost()->getId(), \PDO::PARAM_INT);
    $request->bindValue(':id', $id, \PDO::PARAM_INT);

    return $request->execute();
  }

  public function hasAccess(int $idComment, $idUser): bool
  {
    $query = $this->db->prepare('select author FROM comment WHERE comment.id = :id');
    $query->bindValue(':id', $idComment, \PDO::PARAM_INT);
    $result = $query->fetch(\PDO::FETCH_ASSOC);

    return ($idUser == $result['author']);
  }

  public function getAuthorComment(int $idcomment)
  {
    $query = $this->db->prepare('SELECT author FROM comment WHERE id = :id');
    $query->bindValue(':id', $idcomment, \PDO::PARAM_INT);
    $query->execute();
    var_dump($query->fetch()); die;
//        return new Comment($query->fetch(\PDO::FETCH_ASSOC));
  }


}