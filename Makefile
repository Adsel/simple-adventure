.PHONY: help game list tool_collisions stop

# ANSI Colors and transforms
COLOR_BLUE=\033[34m
COLOR_RESET=\033[0m
COLOR_YELLOW=\033[33m
FONT_BOLD=\033[1m

help:
	@echo ""
	@echo "$(FONT_BOLD)$(COLOR_BLUE)[USAGE]$(COLOR_RESET)"
	@echo ""
	@echo "  $(COLOR_YELLOW)make help$(COLOR_RESET)        			- Show this help message."
	@echo "  $(COLOR_YELLOW)make game$(COLOR_RESET)        			- Run the development environment for game (FE/BE)."
	@echo "  $(COLOR_YELLOW)make list$(COLOR_RESET)        			- Show already working dockers."
	@echo "  $(COLOR_YELLOW)make tool_collisions$(COLOR_RESET)       		- Run the development environment for tool: collision setter (FE/BE)."
	@echo "  $(COLOR_YELLOW)make stop$(COLOR_RESET)       	 		- Stop all environments."
	@echo ""

game:
	docker compose -f database/docker-compose.yml up -d
	docker compose -f game/server/docker-compose-socket-io.yml up -d
	docker compose -f game/client/docker-compose.yml up -d

list:
	docker ps

tool_collisions:
	docker compose -f database/docker-compose.yml up -d
	docker compose -f tools/map-collision-setter/backend/docker-compose.yml up -d
	docker compose -f tools/map-collision-setter/frontend/docker-compose.yml up -d

stop:
	docker compose -f database/docker-compose.yml down
	docker compose -f tools/map-collision-setter/backend/docker-compose.yml down
	docker compose -f tools/map-collision-setter/frontend/docker-compose.yml down
	docker compose -f game/server/docker-compose-socket-io.yml down
	docker compose -f game/client/docker-compose.yml down
