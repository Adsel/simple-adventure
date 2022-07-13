import {GAME_CONFIG} from "@/config/game.config";

export const loadBackgroundImage = (gameContext: CanvasRenderingContext2D, imageUrlFromAssets: string) => {
    const image = document.createElement('img');

    const width = GAME_CONFIG.width / GAME_CONFIG.scaleX;
    const height = GAME_CONFIG.height / GAME_CONFIG.scaleY;

    image.onload = () => {
        gameContext.drawImage(image, 0, 0, width, height);
    };
    image.src = imageUrlFromAssets;
};
