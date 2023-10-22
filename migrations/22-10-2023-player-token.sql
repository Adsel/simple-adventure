ALTER TABLE `player` ADD COLUMN player_token VARCHAR(60);
ALTER TABLE `player`  ADD UNIQUE (player_login);
