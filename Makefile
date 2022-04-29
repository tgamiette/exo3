up:
		docker-compose up -d && npm start

ps:
		docker-compose ps

install:
		docker-compose up -d --build
		docker exec -i testaxios_db_1 mysql -u root -p azerty mysql < docker/dump/blog.sql
		cd app/react && npm install && npm run dev


bash:
		docker-compose exec exo3_apache_1 bash

stop:
		docker-compose stop
