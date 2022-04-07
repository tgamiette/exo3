<?php
namespace  App\Entity;

class Post
{
    private int $id;
    private \DateTime $date;
    private string $title;
    private string $content;
    private int $authorId;
}