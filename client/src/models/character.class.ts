import {EventTypeEnum} from "@/enums/event-type.enum";
import {CHARACTER_CONFIG, GAME_CONFIG} from "@/config/game.config";
import {drawImage} from "@/pages/game/helpers/drawing.helper";
import {MovementDirectionEnum, MovementFacingEnum} from "@/enums/character/movement-direction.enum";

export class Character {
    protected movementQueue: any[] = [];
    protected currentDirection: number = MovementFacingEnum.Right;
    protected currentLoopIndex: number = 0;
    protected frameCount: number = 0;
    protected positionX: number = 0;
    protected positionY: number = 0;
    protected imageSource: HTMLImageElement;
    protected ctx: any;

    constructor(ctx: any, characterImage: HTMLImageElement) {
        this.ctx = ctx;
        this.imageSource = characterImage;
        window.addEventListener(EventTypeEnum.KeyDown, (event: KeyboardEvent) => this.keyDownListener(event));
        window.addEventListener(EventTypeEnum.KeyUp, (event: KeyboardEvent) => this.keyUpListener(event));
    }

    protected keyDownListener(event: KeyboardEvent) {
        const key: string = event.key;
        if (!this.movementQueue.includes(key)) {
            this.movementQueue.push(key);
        }
    }

    protected keyUpListener(event: KeyboardEvent) {
        const key: string = event.key;
        if (this.movementQueue.includes(key)) {
            this.movementQueue = this.movementQueue.filter((keyName: string) => keyName !== key);
        }
    }

    protected drawFrame(frameX: number, frameY: number, posX: number, posY: number): void {
        drawImage(this.ctx, this.imageSource, {
            posX,
            posY,
            frameX,
            frameY,
            width: CHARACTER_CONFIG.width,
            height: CHARACTER_CONFIG.height,
        });
    }

    public animationFrame() {
        let hasMoved: boolean = false;
        if (this.movementQueue.length !== 0) {
            const movementSpeed: number = CHARACTER_CONFIG.movementSpeed;
            const currentDirection = this.movementQueue[this.movementQueue.length - 1];

            if (currentDirection === MovementDirectionEnum.Up) {
                this.moveCharacter(0, -movementSpeed, MovementFacingEnum.Up);
                hasMoved = true;
            } else if (currentDirection === MovementDirectionEnum.Down) {
                this.moveCharacter(0, movementSpeed, MovementFacingEnum.Down);
                hasMoved = true;
            } else if (currentDirection === MovementDirectionEnum.Left) {
                this.moveCharacter(-movementSpeed, 0, MovementFacingEnum.Left);
                hasMoved = true;
            } else if (currentDirection === MovementDirectionEnum.Right) {
                this.moveCharacter(movementSpeed, 0, MovementFacingEnum.Right);
                hasMoved = true;
            }
        }


        if (hasMoved) {
            this.frameCount++;
            if (this.frameCount >= CHARACTER_CONFIG.movementAnimationDelay) {
                this.frameCount = 0;
                this.currentLoopIndex++;

                if (this.currentLoopIndex >= CHARACTER_CONFIG.movementAnimationLoop.length) {
                    this.currentLoopIndex = 0;
                }
            }
        } else {
            this.currentLoopIndex = 0;
        }

        this.drawFrame(CHARACTER_CONFIG.movementAnimationLoop[this.currentLoopIndex], this.currentDirection, this.positionX, this.positionY);
    }

    protected moveCharacter(deltaX: number, deltaY: number, direction: number): void {
        if (this.positionX + deltaX > 0 && this.positionX + CHARACTER_CONFIG.width + deltaX < GAME_CONFIG.width) {
            this.positionX += deltaX;
        }
        if (this.positionY + deltaY > 0 && this.positionY + CHARACTER_CONFIG.height + deltaY < GAME_CONFIG.height) {
            this.positionY += deltaY;
        }

        this.currentDirection = direction;
    }
}
