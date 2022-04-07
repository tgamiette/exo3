<?php

namespace App\Controller;

use App\Framework\Database\PDOFactory;
use App\Manager\PostManager;

class PostController extends BaseController
{
    /**
     * Show all post
     */
    public function getIndex()
    {
        $postManager=new PostManager();
        $posts=$postManager->getAllPost();
        $this->render('Home'
    );
    }

}