git pull
docker-compose -f docker-compose.prod.yml build --force && docker-compose -f docker-compose.prod.yml up -d
