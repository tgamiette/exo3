<?php

namespace App\Service;

class CookieHelper {
	
	public static function setCookie($token, $username) {
		
		setcookie('hetic-token', $token, time() + 200,);
		setcookie('hetic-name', $token, time() + 200);
	}
}