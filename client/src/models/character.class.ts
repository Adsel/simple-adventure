import {CHARACTER_CONFIG, GAME_CONFIG} from "@/config/game.config";
import {drawImage, getSourceImage} from "@/pages/game/helpers/drawing.helper";
import {MovementDirectionEnum, MovementFacingEnum} from "@/enums/character/movement-direction.enum";
import {Localization} from "@/models/localization.class";

export class Character {
    protected movementQueue: any[] = [];
    protected currentDirection: number = MovementFacingEnum.Right;
    protected currentLoopIndex: number = 0;
    protected frameCount: number = 0;
    protected imageSource: HTMLImageElement;
    protected imagePlaceholder: HTMLImageElement;
    protected ctx: CanvasRenderingContext2D;
    protected loadedImage = false;
    protected isMainCharacter = false;

    constructor(
        ctx: CanvasRenderingContext2D,
        characterImage: string,
        characterPlaceholder: HTMLImageElement,
        protected socketInstance: any,
        protected positionX: number,
        protected positionY: number,
        protected localizationInstance: Localization,
    ) {
        this.ctx = ctx;
        this.imagePlaceholder = characterPlaceholder;
        this.imageSource = new Image();

        this.loadCharacterImage(characterImage);
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

    protected drawFrame(frameX: number, frameY: number, x: number, y: number): void {
        if (!this.isMainCharacter && this.isOffTheViewport()) {
            return;
        }
        const image: HTMLImageElement = this.loadedImage ? this.imageSource : this.imagePlaceholder;
        drawImage(this.ctx, image, {
            x,
            y,
            frameX,
            frameY,
            width: CHARACTER_CONFIG.width,
            height: CHARACTER_CONFIG.height,
        });
    }

    protected getDrawX(): number {
        return this.positionX - this.localizationInstance.getShiftX();
    }

    protected getDrawY(): number {
        return this.positionY - this.localizationInstance.getShiftY();
    }

    protected isOffTheViewport(): boolean {
        const drawX = this.getDrawX();
        const drawY = this.getDrawY();

        return drawX < -CHARACTER_CONFIG.width ||
            drawX > GAME_CONFIG.canvasWidth ||
            drawY < -CHARACTER_CONFIG.height ||
            drawY > GAME_CONFIG.canvasHeight;
    }

    public animationFrame() {
        let hasMoved: boolean = false;
        let currentDirection: string = '';
        if (this.movementQueue.length !== 0) {
            const movementSpeed: number = CHARACTER_CONFIG.movementSpeed;
            currentDirection = this.movementQueue[this.movementQueue.length - 1];
            let deltaX = 0;
            let deltaY = 0;
            let facingDirection = 0;

            if (currentDirection === MovementDirectionEnum.Up) {
                deltaY = -movementSpeed;
                facingDirection = MovementFacingEnum.Up;
                hasMoved = this.moveCharacter(deltaX, deltaY, facingDirection);
            } else if (currentDirection === MovementDirectionEnum.Down) {
                deltaY = movementSpeed;
                facingDirection = MovementFacingEnum.Down;
                hasMoved = this.moveCharacter(deltaX, deltaY, facingDirection);
            } else if (currentDirection === MovementDirectionEnum.Left) {
                deltaX = -movementSpeed;
                facingDirection = MovementFacingEnum.Left;
                hasMoved = this.moveCharacter(deltaX, deltaY, facingDirection);
            } else if (currentDirection === MovementDirectionEnum.Right) {
                deltaX = movementSpeed;
                facingDirection = MovementFacingEnum.Right;
                hasMoved = this.moveCharacter(deltaX, deltaY, facingDirection);
            }

            if (hasMoved && this.isMainCharacter) {
                this.localizationInstance.calculateMapShift(facingDirection, deltaX, deltaY, this.positionX, this.positionY);
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

        this.drawFrame(CHARACTER_CONFIG.movementAnimationLoop[this.currentLoopIndex], this.currentDirection, this.getDrawX(), this.getDrawY());
    }

    protected moveCharacter(deltaX: number, deltaY: number, direction: number): boolean {
        let moved: boolean = false;
        if (
            direction === MovementFacingEnum.Left &&
            this.positionX + deltaX - this.localizationInstance.getShiftX() >= 0
        ) {
            this.positionX += deltaX;
            moved = true;
        } else if (
            direction === MovementFacingEnum.Right &&
            this.positionX + CHARACTER_CONFIG.width + deltaX - this.localizationInstance.getShiftX() < GAME_CONFIG.width
        ) {
            this.positionX += deltaX;
            moved = true;
        } else if (direction === MovementFacingEnum.Up &&
            this.positionY + deltaY - this.localizationInstance.getShiftY() >= 0) {
            this.positionY += deltaY;
            moved = true;
        } else if (direction === MovementFacingEnum.Down &&
            this.positionY + CHARACTER_CONFIG.height + deltaY - this.localizationInstance.getShiftY() < GAME_CONFIG.height
        ) {
            this.positionY += deltaY;
            moved = true;
        }

        if (!moved) {
            return moved;
        }

        this.socketInstance.moveCharacter(this.positionX, this.positionY);
        this.currentDirection = direction;

        return moved;
    }

    protected loadCharacterImage(characterImage: string): void {
        this.imageSource.src = getSourceImage(characterImage);
        this.imageSource.onload = () => this.loadedImage = true;
    }

    public setPositionX(x: number): void {
        this.positionX = x;
    }

    public setPositionY(y: number): void {
        this.positionY = y;
    }
}
