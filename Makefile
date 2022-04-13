install:
		sh bin/install.sh

ps:
		docker-compose ps

up:
		docker-compose up -d
		docker exec -i exo3_db_1 mysql -uroot -pazerty mysql < docker/bdd/dump/skeleton.sql

bash:
		docker-compose exec apache bash

stop:
		docker-compose stop

deploy:
		sh bin/deploy.sh

restart: stop up
