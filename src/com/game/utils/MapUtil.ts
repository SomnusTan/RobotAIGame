class MapUtil {

    public static getXByNodeX(col: number): number {
        return Math.floor((col - 0.5) * EnumMap.MAP_NODE_WIDTH);
    }

    public static getYByNodeY(row: number): number {
        return Math.floor((row - 0.5) * EnumMap.MAP_NODE_HEIGHT);
    }

    public static getNodeXByX(x: number): number {
        return Math.floor(x / EnumMap.MAP_NODE_WIDTH) + 1;
    }

    public static getNodeYByY(y: number): number {
        return Math.floor(y / EnumMap.MAP_NODE_HEIGHT) + 1;
    }
}