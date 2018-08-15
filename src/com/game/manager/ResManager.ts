class ResManager {
    private _hash: HashMap;

    public constructor() {
        this._hash = new HashMap();
    }

    /**
     * 获取影片资源
     */
    public getMcFactory(name: string): egret.MovieClipDataFactory {
        if (this._hash.has(name)) {
            return this._hash.get(name);
        }
        else {
            var data = RES.getRes(name + "_json");
            var txtr = RES.getRes(name + "_png");
            var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            this._hash.put(name, mcFactory);
            return mcFactory;
        }
    }
}