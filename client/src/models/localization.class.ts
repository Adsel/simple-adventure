import {CHARACTER_CONFIG, GAME_CONFIG} from "@/config/game.config";
import {MovementFacingEnum} from "@/enums/character/movement-direction.enum";
import {drawBackgroundImage} from "@/pages/game/helpers/drawing.helper";

export class Localization {
    protected mainCharacterX = 0;
    protected mainCharacterY = 0;
    protected shiftX = 0;
    protected shiftY = 0;

    constructor(
        protected bgImage: HTMLImageElement,
        protected backgroundGameContext: CanvasRenderingContext2D,
        protected mapWidth: number,
        protected mapHeight: number,
    ) {
    }

    public getShiftX(): number {
        return this.shiftX;
    }

    public getShiftY(): number {
        return this.shiftY;
    }

    public getMainCharacterX(): number {
        return this.mainCharacterX;
    }

    public getMainCharacterY(): number {
        return this.mainCharacterY;
    }

    public setMainCharacterX(x: number): void {
        this.mainCharacterX = x;
    }

    public setMainCharacterY(y: number): void {
        this.mainCharacterY = y;
    }

    public calculateMapShift(direction: number, deltaX: number, deltaY: number, mainCharacterX: number, mainCharacterY: number): void {
        if (direction === MovementFacingEnum.Right || direction === MovementFacingEnum.Left) {
            const targetX = mainCharacterX + (0.5 * CHARACTER_CONFIG.width) + deltaX;
            if (
                targetX > GAME_CONFIG.width / 2 &&
                targetX <= this.mapWidth - (GAME_CONFIG.width / 2)
            ) {
                this.shiftX += deltaX;
            }
        }  else if (direction === MovementFacingEnum.Up || direction === MovementFacingEnum.Down) {
            const targetY = mainCharacterY + (0.5 * CHARACTER_CONFIG.height) + deltaY;
            if (
                targetY > GAME_CONFIG.height / 2 &&
                targetY <= this.mapHeight - (GAME_CONFIG.height / 2)
            ) {
                this.shiftY += deltaY;
            }
        }
    }

    public drawBackground = () => {
        drawBackgroundImage(this.backgroundGameContext, this.bgImage, {
            sourceX: this.shiftX,
            sourceY: this.shiftY,
            sourceWidth: GAME_CONFIG.width,
            sourceHeight: GAME_CONFIG.height,
            posX: 0,
            posY: 0,
            width: GAME_CONFIG.width,
            height: GAME_CONFIG.height
        });
    };
}
