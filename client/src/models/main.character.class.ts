import {Character} from "@/models/character.class";
import {EventTypeEnum} from "@/enums/event-type.enum";
import {Localization} from "@/models/localization.class";

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
}
