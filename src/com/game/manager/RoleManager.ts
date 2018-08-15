/**
 * 角色管理器
 */
class RoleManager {
    /**角色列表 */
    private _allRoleList: HashMap;


    public constructor() {
        this._allRoleList = new HashMap();
    }

    public reset(): void {
        var values: any[] = this._allRoleList.values;
        for (var i: number = 0, len: number = values.length; i < len; i++) {
            (values[i] as HashMap).foEach((key, value: BaseAvatar) => {
                value.dispose();
            }, this);
            (values[i] as HashMap).clear();
        }
        this._allRoleList.clear();
    }

    /**
     * 创建角色
     * @param teamId 阵营方
     * @param uid ID
     * @param type 角色类型
     * @param hp 血量
     * @param maxHp 最大血量
     * @param col 列位置
     * @param row 行位置
     */
    public createRole(teamId: number, roleid: number, type: string, hp: number, maxHp: number, col: number, row: number): void {
        var avatar: BaseAvatar = new BaseAvatar();
        var vo: BaseAvatarVo = new BaseAvatarVo();
        vo.teamId = teamId;
        vo.roleId = roleid;
        vo.type = type;
        vo.hp = hp;
        vo.maxHp = maxHp;
        avatar.initInfo(vo);
        avatar.setGrid(col, row);
        avatar.show();
        if (this._allRoleList.has(teamId) == false)
            this._allRoleList.put(teamId, new HashMap());
        var hashMap: HashMap = this._allRoleList.get(teamId);
        console.log("创建：" + EnumAvatarType.getNameByType(type), avatar.x, avatar.y);
        hashMap.put(roleid, avatar);
    }

    public getRole(teamId: number, roleId: number): BaseAvatar {
        var avatar: BaseAvatar = (this._allRoleList.get(teamId) as HashMap).get(roleId);
        return avatar;
    }

    public removeRole(avatar: BaseAvatar): void {
        if (avatar) {
            (this._allRoleList.get(avatar.vo.teamId) as HashMap).remove(avatar.vo.roleId);
            avatar.dispose();
        }
    }

}