# Docker database instance

## Installation

1. Create require directory structure
    ```bash
    mkdir ~/docker/simple-adventure-db -p
    sudo chmod -R 777 ~/docker
    ```
2. Pull default mysql image
    ```bash
    cd ~/docker
    sudo docker pull mysql:5.7
    ```
3. Create docker db instance
    ```bash
    sudo docker run -p 3307:3306 --name simple-adventure-db -v /home/${USER}/docker/simple-adventure-db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7 --sql-mode="NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
    ```

## Load database structure from migration

1. Create directory for import migrations
    ```bash
    mkdir ~/docker/simple-adventure-db/import
    sudo chmod 777 -R ~/docker/simple-adventure-db/import
    ```
2. Load migration file
    ```bash
   sudo docker exec -i simple-adventure-db mysql -uroot -p123456 < 15-04-2023-initial-data.sql
   ```

## PHPMyAdmin

1. Pull default phpmyadmin image
    ```bash
    cd ~/docker
    sudo docker pull phpmyadmin/phpmyadmin
    ```
2. Make connection between mysql and phpmyadmin containers
   ```bash
   sudo docker run --name simple-adventure-phpmyadmin -d --link simple-adventure-db:db -p 8181:80 phpmyadmin/phpmyadmin
   ```
## Running

1. Start database docker instance

   ```bash
   sudo docker start simple-adventure-db
   ```

2. (optional) Start phpmyadmin docker instance on `http://localhost:8181/`

   ```bash
   sudo docker start simple-adventure-phpmyadmin
   ```


