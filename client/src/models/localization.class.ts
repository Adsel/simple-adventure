import {CHARACTER_CONFIG, GAME_CONFIG} from "@/config/game.config";
import {MovementFacingEnum} from "@/enums/character/movement-direction.enum";
import {drawBackgroundImage} from "@/pages/game/helpers/drawing.helper";

export class Localization {
    protected shiftX = 0;
    protected shiftY = 0;

    constructor(
        protected bgImage: HTMLImageElement,
        protected gameContext: CanvasRenderingContext2D,
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
        drawBackgroundImage(this.gameContext, this.bgImage, {
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
