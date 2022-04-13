up:
		docker-compose up -d

ps:
		docker-compose ps

install:
		docker-compose up -d --build
		docker exec -i exo3_db_1 mysql -uroot -pazerty mysql < docker/bdd/dump/skeleton.sql
		cd react && npm install && npm start


bash:
		docker-compose exec apache bash

stop:
		docker-compose stop

deploy:
		sh bin/deploy.sh

restart: stop up
