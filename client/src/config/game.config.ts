import {IGameConfig} from "@/interfaces/game.interface";
import {ICharacterConfig} from "@/interfaces/character/character.interface";

export const GAME_CONFIG: IGameConfig = {
    width: 320,
    height: 240,
    contextType: '2d',
    tileWidth: 16,
    tileHeight: 16,
    canvasWidth: 960,
    canvasHeight: 720,
    fogOfWar: {
        alpha: 0.4,
        radius: 120,
    }
};

export const CHARACTER_CONFIG: ICharacterConfig = {
    width: 16,
    height: 16,
    movementAnimationDelay: 10,
    movementSpeed: 1,
};
