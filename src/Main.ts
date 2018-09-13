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
            console.log(e);
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
        App.layer.initImage();
        // let button = new eui.Button();
        // button.label = "Click!";
        // button.x = Config.STAGE_WIDTH - button.width >> 1;
        // button.y = Config.STAGE_HEIGHT - button.height >> 1;
        // App.layer.menuLayer.addChild(button);
        // App.layer.mapLayer.once(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        // DeadEffect.getEffect().show(App.layer.alertLayer, e.stageX, e.stageY);
        // return;
        App.layer.startMove();
        RES.getResByUrl("resource/log/oplog_1535731215-3184c11c-d266-4f1d-8793-8861e980a308.log", App.data.parseLogData, App.data, RES.ResourceItem.TYPE_TEXT);
    }

}
