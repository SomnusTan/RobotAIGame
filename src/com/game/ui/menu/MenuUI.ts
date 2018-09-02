class MenuUI extends BaseUI {
	public imgBlood1: eui.Image;
	public imgBlood2: eui.Image;
	public txtTeamName1: eui.Label;
	public txtTeamLeft1: eui.Label;
	public txtTeamLeft2: eui.Label;
	public txtRound: eui.Label;
	public txtTeamName2: eui.Label;
	public rectTeamMask1: eui.Rect;
	public rectTeamMask2: eui.Rect;

	public constructor() {
		super("MenuSkin");
	}

	public get width(): number {
		return 1032;
	}
}