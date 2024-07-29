export interface IGameConfig {
    width: number;
    height: number;
    contextType: string;
    tileHeight: number;
    tileWidth: number;
    canvasWidth: number;
    canvasHeight: number;
    fogOfWar: IGameConfigFogOfWar;
}

export interface IGameConfigFogOfWar {
    alpha: number;
    radius: number;
}
