# TODO
    setup env with Makefile
***


# Simple Adventure
Simple MMO RPG pixel game based on websocket.


## 1. Docker backend instance

### Prerequisites 
- `Ubuntu OS 22.04`
- `docker 20.10.21`
- `docker-compose 1.29.2`
- `node 14.17`

### Running 

## 0. Shared database:

1. Run database instance
   ```bash
   cd ../database
   docker-compose up -d
   cd ../game
   ```
2. PHPMyAdmin
- URL: http://localhost:3333/
- Server: SERVER_DB_HOST
- User: SERVER_DB_USER
- Password: SERVER_DB_PASSWORD

## 1. Run backend instance:
```bash
docker-compose -f server/docker-compose.yml up
```

## 2. Frontend app
1. Set target node version
   ```bash
   nvm use 14.17.6 
   ```
2. Install npm packages 
    ```bash
    cd client
    npm install 
    ```
3. Run frontend instance
    ```bash
    npm run client:serve
    ```
