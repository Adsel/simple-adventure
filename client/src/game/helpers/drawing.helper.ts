import {GAME_CONFIG} from "@/config/game.config";
import {IDrawingImage} from "@/interfaces/drawing.interface";
import {HtmlElementTypeEnum} from "@/enums/html-element-type.enum";

const getSourceImage = (imagePath: string): string => {
    return require(`@/assets/${imagePath}`);
};

const drawImage = (gameContext: CanvasRenderingContext2D, drawingImage: IDrawingImage) => {
    const image = document.createElement(HtmlElementTypeEnum.Image);

    image.onload = () => {
        gameContext.drawImage(image, drawingImage.posX, drawingImage.posY, drawingImage.width, drawingImage.height);
    };

    image.src = getSourceImage(drawingImage.imagePath);
}

export const loadBackgroundImage = (gameContext: CanvasRenderingContext2D, imagePath: string) => {
    const drawingImage: IDrawingImage = {
        width: GAME_CONFIG.width,
        height: GAME_CONFIG.height,
        imagePath,
        posX: 0,
        posY: 0
    };

    drawImage(gameContext, drawingImage);
};

export const loadCharacterImage = (gameContext: CanvasRenderingContext2D, imagePath: string, posX: number, posY: number) => {
    // TODO: split width and height into character config
    const drawingImage: IDrawingImage = {
        width: 16,
        height: 16,
        imagePath,
        posX,
        posY
    };

    drawImage(gameContext, drawingImage);
};


