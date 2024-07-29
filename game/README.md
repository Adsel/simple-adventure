# Simple Adventure
Simple MMO RPG pixel game based on websocket.


## 1. Docker backend instance

### Prerequisites 
- `Ubuntu OS 22.04`
- `docker 20.10.21`
- `docker-compose 1.29.2`
- `node 14.17`

### Build docker infrastructure

1. Create require directory structure
    ```bash
    mkdir ~/docker/simple-adventure-db -p
    mkdir ~/docker/simple-adventure-db2 -p
    sudo chmod -R 777 ~/docker
    ```
2.  Build docker infrastructure for both servers
   ```bash
   docker-compose -f server/docker-compose-sock-js.yml build --build-arg serverMode=sock-js --no-cache
   af
   ```
### Load database structure from migration

Load migration file
   ```bash
   cd migrations
   sudo docker exec -i simple-adventure-db mysql -uroot -p123456 < 15-04-2023-initial-data.sql
   sudo docker exec -i simple-adventure-db2 mysql -uroot -p123456 < 15-04-2023-initial-data.sql
   ```

### Running 

Select backend instance to run:
- `socket-io`
    ```bash
    docker-compose -f server/docker-compose-socket-io.yml up 
    ```
- `sock-js`
    ```bash
    docker-compose -f server/docker-compose-sock-js.yml up 
    ```

## 2. Frontend app
1. Install npm packages 
    ```bash
    cd client
    npm install 
    ```
2. Run frontend instance
- `socket-io`
    ```bash
    npm run client:socket-io:serve 
    ```
- `sock-js`
    ```bash
    npm run client:sock-js:serve 
    ```
