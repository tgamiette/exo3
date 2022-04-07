<?php

namespace App\Manager;

use App\Entity\Post;

class PostManager extends BaseManager
{
    /**
     * @return Post[]
     */
    public function getAllPost():array
    {
        return [];
    }

    /**
     * @return Post
     */
    public function getPostById(): Post{

        return new Post();
    }

    /**
     * @param Post $post
     * @return boolean|bool
     */
    public function createPost(Post $post){

    }

    /**
     * @return bool
     */
    public function deletePostById():bool{

        return true;
    }

    /**
     * @param Post $post
     * @return boolean|bool
     */
    public function updatePost(Post $post,){
        //TODO - getPostById($post->getId)
    }


}