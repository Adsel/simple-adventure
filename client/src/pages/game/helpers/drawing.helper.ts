import {ProtocolTypeEnum} from "@/enums/network/protocol-type.enum";
import {IDrawingBackground} from "@/interfaces/drawing.interface";

export const getSourceImage = (imagePath: string): string => require(`@/assets/${imagePath}`);

export const drawImage = (gameContext: CanvasRenderingContext2D, drawingImage: HTMLImageElement, drawingImageOptions: any) => {
    gameContext.drawImage(
        drawingImage,
        drawingImageOptions.frameX !== undefined ? drawingImageOptions.width * drawingImageOptions.frameX : drawingImageOptions.width,
        drawingImageOptions.frameY !== undefined ? drawingImageOptions.height * drawingImageOptions.frameY : drawingImageOptions.height,
        drawingImageOptions.width,
        drawingImageOptions.height,
        drawingImageOptions.x,
        drawingImageOptions.y,
        drawingImageOptions.width,
        drawingImageOptions.height,
    );
}

export const drawBackgroundImage = (gameContext: CanvasRenderingContext2D, drawingImage: HTMLImageElement, bgOptions: IDrawingBackground): void => {
    gameContext.drawImage(
        drawingImage,
        bgOptions.sourceX,
        bgOptions.sourceY,
        bgOptions.sourceWidth,
        bgOptions.sourceHeight,
        bgOptions.posX,
        bgOptions.posY,
        bgOptions.width,
        bgOptions.height
    );
};

export const loadImage = async (imageSource: string): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve: any, reject: any): void => {
        const img: HTMLImageElement = new Image();
        img.src = imageSource.includes(ProtocolTypeEnum.Http) ? imageSource : getSourceImage(imageSource);
        img.onload = () => resolve(img);
        img.onerror = (error: any) => reject(error);
    });
};
