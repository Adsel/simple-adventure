-- Initial data
CREATE
DATABASE SimpleAdventure;

use
SimpleAdventure;

CREATE TABLE summoner
(
    summoner_id         INT AUTO_INCREMENT PRIMARY KEY,
    summoner_nick       VARCHAR(20) NOT NULL,
    summoner_experience INTEGER UNSIGNED NOT NULL DEFAULT 0,
    summoner_level      INTEGER UNSIGNED NOT NULL DEFAULT 1,
    created_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO summoner (summoner_nick) VALUES ('Dev');

CREATE TABLE map
(
    map_id     INT AUTO_INCREMENT PRIMARY KEY,
    map_name   VARCHAR(30) NOT NULL,
    map_width  INTEGER UNSIGNED NOT NULL,
    map_height INTEGER UNSIGNED NOT NULL,
    map_url    VARCHAR(50) NOT NULL,
    created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);
