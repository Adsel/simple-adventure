# Simple Adventure

Prosta gra MMO RPG w pikselach z komunikacją w czasie rzeczywistym (WebSocket przez socket.io).

> **TODO:** uprościć konfigurację środowiska przez Makefile (wspólne komendy / env).

---

## Wymagania wstępne

| Narzędzie | Wersja / uwagi |
|-----------|----------------|
| **Node.js** | **22.x LTS** — w katalogu `game/` jest plik [`.nvmrc`](./.nvmrc) z linią `22`. |
| **npm** | **10.x** (dostarczany z Node 22). |
| **nvm** (opcjonalnie) | Do przełączania wersji Node: w katalogu `game/` uruchom `nvm install` (wczyta `.nvmrc`), potem `nvm use`. |
| **Docker Engine** | Aktualna stabilna wersja z **Compose V2** (`docker compose`, nie osobny binarny `docker-compose` 1.x). |
| **Git** | Do klonowania repozytorium. |

**System operacyjny:** Linux (np. Ubuntu 22.04+) lub macOS z powyższymi narzędziami; na Windowsie zalecany WSL2 z Docker Desktop.

---

## Układ repozytorium (skrót)

- `database/` — MySQL i phpMyAdmin (Docker).
- `game/server/` — backend (Express + socket.io).
- `game/client/` — frontend (Vue 3).
- `game/shared/` — kod współdzielony workspace npm.

---

## 1. Baza danych (Docker)

Z katalogu **`game/`**:

```bash
cd ../database
docker compose up -d
cd ../game
```

### phpMyAdmin

- **URL:** http://localhost:3333/
- **Serwer:** wartość `SERVER_DB_HOST` z env backendu (np. host kontenera bazy).
- **Użytkownik / hasło:** jak w `SERVER_DB_USER` i `SERVER_DB_PASSWORD` (np. w `game/server/.env`).

---

## 2. Backend (Docker)

Z katalogu **`game/`**:

```bash
docker compose -f server/docker-compose.yml up
```

Backend nasłuchuje zgodnie z `SERVER_PORT` w `game/server/.env` (domyślnie mapowanie portów jest w pliku compose).

---

## 3. Backend (lokalnie, bez Dockera)

Wymaga uruchomionej bazy (krok 1) i poprawnego `game/server/.env`.

```bash
nvm use   # z katalogu game/ (wczytuje ./.nvmrc)
cd server
npm install
npm run dev
```

---

## 4. Frontend (Vue)

Z katalogu **`game/`** (zalecane — workspace npm):

```bash
nvm use
npm install
npm run client:serve
```

Alternatywnie tylko klient:

```bash
cd client
npm install
npm run serve
```

### Zmienne środowiskowe klienta

W `game/client/.env` ustaw m.in.:

- `VUE_APP_WS_URL` — adres WebSocket socket.io (np. `ws://localhost:3002`).
- `VUE_APP_API_URL` — bazowy URL API HTTP (np. `http://localhost:3002`).

Dostosuj porty do swojego `docker-compose` / lokalnego backendu.

---

## 5. Szybki start z Makefile (repo root)

Z katalogu głównego repozytorium (tam gdzie jest `Makefile`):

- `make game` — baza + backend + frontend w Dockerze (szczegóły w `Makefile`).
- `make stop` — zatrzymanie środowisk zdefiniowanych w Makefile.
