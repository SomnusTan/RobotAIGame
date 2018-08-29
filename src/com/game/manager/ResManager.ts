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

    public getDragonFactory(name: string): dragonBones.EgretFactory {
        if (this._hash.has(name)) {
            return this._hash.get(name);
        }
        else {
            var skeletonData = RES.getRes(name + "_ske_json")
            var data = RES.getRes(name + "_tex_json");
            var txtr = RES.getRes(name + "_tex_png");
            var factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            factory.parseDragonBonesData(skeletonData);
            factory.parseTextureAtlasData(data, txtr);
            this._hash.put(name, factory);
            return factory;
        }
    }
}