import {Character} from "@/models/character.class";
import {EventTypeEnum} from "@/enums/event-type.enum";
import {Localization} from "@/models/localization.class";
import {CHARACTER_CONFIG, GAME_CONFIG} from "@/config/game.config";
import {GlobalCompositeOperationEnum} from "@/enums/canvas/global-composite-operation.enum";

export class MainCharacter extends Character {
    protected isMainCharacter = true;

    constructor(
        ctx: CanvasRenderingContext2D,
        characterImage: string,
        characterPlaceholder: HTMLImageElement,
        socketInstance: any,
        positionX: number,
        positionY: number,
        protected localizationInstance: Localization,
    ) {
        super(ctx, characterImage, characterPlaceholder, socketInstance, positionX, positionY, localizationInstance);
        this.loadEventListeners();
    }

    protected loadEventListeners(): void {
        window.addEventListener(EventTypeEnum.KeyDown, (event: KeyboardEvent) => this.keyDownListener(event));
        window.addEventListener(EventTypeEnum.KeyUp, (event: KeyboardEvent) => this.keyUpListener(event));
    }

    public drawFogOfWar(): void {
        this.ctx.fillStyle = `rgba(0, 0, 0, ${GAME_CONFIG.fogOfWar.alpha})`;
        this.ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.globalCompositeOperation = GlobalCompositeOperationEnum.DestinationOut;

        this.ctx.beginPath();
        this.ctx.arc(
            this.positionX + (0.5 * CHARACTER_CONFIG.width) - this.localizationInstance.getShiftX(),
            this.positionY + (0.5 * CHARACTER_CONFIG.height) - this.localizationInstance.getShiftY(),
            GAME_CONFIG.fogOfWar.radius,
            0,
            2 * Math.PI,
            false
        );
        this.ctx.fill();

        this.ctx.globalCompositeOperation = GlobalCompositeOperationEnum.SourceOver;
    }
}
