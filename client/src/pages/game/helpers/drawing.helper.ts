import {ProtocolTypeEnum} from "@/enums/network/protocol-type.enum";

export const getSourceImage = (imagePath: string): string => require(`@/assets/${imagePath}`);

export const drawImage = (gameContext: CanvasRenderingContext2D, drawingImage: HTMLImageElement, drawingImageOptions: any) => {
    gameContext.drawImage(
        drawingImage,
        drawingImageOptions.frameX ? drawingImageOptions.width * drawingImageOptions.frameX : drawingImageOptions.width,
        drawingImageOptions.frameY ? drawingImageOptions.width * drawingImageOptions.frameY : drawingImageOptions.width,
        drawingImageOptions.width,
        drawingImageOptions.height,
        drawingImageOptions.x,
        drawingImageOptions.y,
        drawingImageOptions.width,
        drawingImageOptions.height,
    );
}

export const drawBackgroundImage = (gameContext: CanvasRenderingContext2D, drawingImage: HTMLImageElement, drawingImageOptions: any): void => {
    gameContext.drawImage(
        drawingImage,
        drawingImageOptions.x,
        drawingImageOptions.y,
        drawingImageOptions.width,
        drawingImageOptions.height
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
