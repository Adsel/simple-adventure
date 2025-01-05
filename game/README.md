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
