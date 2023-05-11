import {GAME_CONFIG} from "@/config/game.config";

export const prepareAndGetContext = (gameBoardRef: HTMLCanvasElement | null) => {
    let gameContext: RenderingContext | null = null;

    if (gameBoardRef) {
        gameContext = gameBoardRef.getContext(GAME_CONFIG.contextType);
    }

    return gameContext;
};
