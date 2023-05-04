import {IGameConfig} from "@/interfaces/game.interface";
import {ICharacterConfig} from "@/interfaces/character/character.interface";

export const GAME_CONFIG: IGameConfig = {
    width: 320,
    height: 320,
    contextType: '2d',
    tileWidth: 16,
    tileHeight: 16,
    canvasWidth: 960,
    canvasHeight: 960,
};

export const CHARACTER_CONFIG: ICharacterConfig = {
    width: 16,
    height: 16,
    movementAnimationLoop: [0, 1, 0, 2],
    movementAnimationDelay: 10,
    movementSpeed: 1,
};
