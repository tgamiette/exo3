<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use http\Exception\UnexpectedValueException;

class jwtHelper {
//	1000 sec
	public const CONTS_TIME_REFRESH = 1000;
	private const PATH_PRIVATE_KEY = './privateKey';
	private string|false $key;
	
	
	public function __construct() {
		$this->key = file_get_contents(self::PATH_PRIVATE_KEY);
	}
	
	
	public function generate(User $user): string {
		
		
		$payload = [
			'iss' => 'http://localhots:1234',
			'name' => $user->getName(),
			'id' => $user->getId(),
			'password' => $user->getPassword(),
			'exp' => time() + 100,
			'iat' => time(),
		];
		
		$_COOKIE['token'] = JWT::encode($payload, $this->key, 'RS256');
		return $_COOKIE['token'];
	}
	
	public function encode(array $payload): string {
		$key = file_get_contents('./privateKey');
		
		$_SESSION['jwt'] = JWT::encode($payload, $key, 'RS256');
		return $_SESSION['jwt'];
	}
	
	
	public function payloads($token): \stdClass {
		$key = file_get_contents('./privateKey');
		$res = openssl_pkey_get_private($key);
		$publicKey = openssl_pkey_get_details($res)['key'];
		
		try {
			return JWT::decode($token, new Key($publicKey, 'RS256'));
		}catch (ExpiredException $e) {
			 return json_decode(explode('.',$token)[1]);
		}
		catch (\Exception $e) {
			throw new \Exception($e);
		}

	}
	
	public function decode($token) {
		
		$jwt = $token;
		$key = file_get_contents('./privateKey');
		$res = openssl_pkey_get_private($key);
		$publicKey = openssl_pkey_get_details($res)['key'];
		
		
		try {
			return JWT::decode($jwt, new Key($publicKey, 'RS256'));
		}
		catch (ExpiredException $e) {
			throw new ExpiredException("expirer", 666);
		}
		
		
	}
}