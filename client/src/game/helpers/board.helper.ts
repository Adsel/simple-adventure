import {GAME_CONFIG} from "@/config/game.config";

export const prepareAndGetContext = (gameBoardRef: HTMLCanvasElement | null) => {
    let gameContext: any = null;

    if (gameBoardRef) {
        gameContext = gameBoardRef.getContext(GAME_CONFIG.contextType);
        gameContext.scale(GAME_CONFIG.scaleX, GAME_CONFIG.scaleY);
    }

    return gameContext;
};
