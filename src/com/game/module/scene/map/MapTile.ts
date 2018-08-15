class MapTile extends eui.Image {

    public col: number;

    public row: number;

    public id: string;

    public constructor() {
        super()
    }

    public init(col: number, row: number): void {
        this.col = col;
        this.row = row;
        this.x = (col - 1) * EnumMap.MAP_TILE_WIDTH;
        this.y = (row - 1) * EnumMap.MAP_TILE_HEIGHT;
        this.id = "map_" + this.row + "_" + this.col + "_jpg";
        this.source = this.id;
    }
}