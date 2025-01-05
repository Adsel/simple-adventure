# TODO
    setup env with Makefile
***

## Standalone mode

1. Create require directory structure
    ```bash
    mkdir ~/docker/simple-adventure-database -p
    sudo chmod -R 777 ~/docker
    ```
2. Create specific docker Network
   ```bash
   docker network create simple-adventure-network
   ```
3. Build docker infrastructure
   ```bash
   docker-compose -f docker-compose.yml build --no-cache
   ```

### Load database structure from migration

Load migration file
```bash
   cd migrations
   docker exec -i simple-adventure-database mysql -uroot -p123456 < migrations/15-04-2023-initial-data.sql
   docker exec -i simple-adventure-database mysql -uroot -p123456 < migrations/19-10-2023-player-table.sql
   docker exec -i simple-adventure-database mysql -uroot -p123456 < migrations/22-10-2023-player-token.sql
```

### Phpmyadmin
http://localhost:3333
