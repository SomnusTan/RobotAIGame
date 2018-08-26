class MapTile extends eui.Image {

    public col: number;

    public row: number;

    public id: string;

    public constructor() {
        super()
    }

    public init(id: number, col: number, row: number): void {
        this.col = col;
        this.row = row;
        this.x = col * EnumMap.MAP_TILE_WIDTH;
        this.y = row * EnumMap.MAP_TILE_HEIGHT;
        this.id = "map_" + id + "_png";
        this.source = this.id;
    }
}