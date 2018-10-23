class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            if (App.sound)
                App.sound.isCloseBgm = true;
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            if (App.sound)
                App.sound.isCloseBgm = false;
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            GameLog.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 创建场景界面
     */
    protected createGameScene(): void {
        App.init(this.stage);
        var menu: Menu = new Menu();
        App.menu = menu;
        App.layer.menuLayer.addChild(menu);
        menu.show();
        App.layer.mapLayer.initMap();
        // App.layer.initImage();
        var logURL: string = this.getURL("logURL");
        if (logURL) {
            Config.isShowInitInfo = true;
            // App.layer.startMove();
            RES.getResByUrl("resource/log/" + logURL + ".log", App.data.parseLogData, App.data, RES.ResourceItem.TYPE_TEXT);
        }
    }

    private getURL(key: string): string {
        if (window.location) {
            let search = location.search;
            if (search == "") {
                return null;
            }
            search = search.slice(1);
            let searchArr = search.split("&");
            let length = searchArr.length;
            for (let i: number = 0; i < length; i++) {
                let str = searchArr[i];
                let arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        // App.layer.startMove();
        RES.getResByUrl("resource/log/oplog_1535731215-3184c11c-d266-4f1d-8793-8861e980a308.log", App.data.parseLogData, App.data, RES.ResourceItem.TYPE_TEXT);
    }

}
