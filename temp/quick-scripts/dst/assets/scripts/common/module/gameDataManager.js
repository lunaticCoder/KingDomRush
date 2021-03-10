
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/module/gameDataManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ae87mdjG1K8KqpOrD6pjkT', 'gameDataManager');
// scripts/common/module/gameDataManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameConfig = exports.User = void 0;
var utils_1 = require("./utils");
var storageManager_1 = require("./storageManager");
var User = /** @class */ (function () {
    /**
     * 没有该用户会 初始化该用户出来
     * @param username
     */
    function User(username) {
        /**
         * 初始用户数据
         */
        this.initUserData = {
            username: "无",
            levelsReview: [],
            currentHaveStarNum: 0,
            skillsLevel: [0, 0, 0, 0, 0, 0]
            // { //当前等级
            //     arrow: 0,
            //     barrack: 0, 兵营
            //     magiclan: 0,
            //     artillery: 0,
            //     bomb: 0, //炸弹技能
            //     dispatchTroops: 0,//出兵技能
            // },
        };
        /**
         * 用户数据
         */
        this.userData = null;
        this.ls = cc.sys.localStorage;
        this.userData = storageManager_1.default.ins.getData("userData:" + username);
        if (this.userData === null) {
            this.userData = this.initUserData;
            this.userData.username = username;
        }
        else
            this.userData = JSON.parse(this.userData);
    }
    User.prototype.getUsername = function () {
        return this.userData.username;
    };
    /**
     * 重置技能，归回星星
     */
    User.prototype.resetSkill = function () {
        this.userData.skillsLevel.fill(0);
        this.userData.currentHaveStarNum = this.getStarSum();
    };
    /**
     * 拥有的星星数
     */
    User.prototype.getCurrentHaveStarNum = function () {
        return this.userData.currentHaveStarNum;
    };
    /**
     * 减去拥有的星星
     * @param n 星星数
     */
    User.prototype.subHavedStar = function (n) {
        this.userData.currentHaveStarNum -= n;
    };
    User.prototype.addHavedStar = function (n) {
        this.userData.currentHaveStarNum += n;
    };
    /**
     * 当前玩家一共得到多少个星星
     * @returns start sum
     */
    User.prototype.getStarSum = function () {
        if (this.userData === null)
            return;
        var s = 0;
        for (var i = 0; i < this.userData.levelsReview.length; i++)
            s += this.userData.levelsReview[i];
        return s;
    };
    /**
     * 玩家闯过了多少关
     * @returns rush levels sum
     */
    User.prototype.getRushLevelsSum = function () {
        if (this.userData === null)
            return;
        return this.userData.levelsReview.length;
    };
    /**
     * 每关得到的分数
     * @returns rush levels sum
     */
    User.prototype.getLevelsReview = function () {
        if (this.userData === null)
            return;
        return this.userData.levelsReview;
    };
    /**
     * Sets level review
     * @param levelN 第几关，0开始
     * @param review 得到的星星数
     */
    User.prototype.setLevelReview = function (levelN, review) {
        if (levelN > this.userData.rushLevelsSum)
            this.userData.rushLevelsSum = levelN;
        else {
            if (this.userData.levelsReview[levelN] === undefined) {
                this.userData.levelsReview[levelN] = review;
                this.addHavedStar(review);
            }
            else if (this.userData.levelsReview[levelN] < review) {
                var add = review - this.userData.levelsReview[levelN];
                this.userData.levelsReview[levelN] = review;
                this.addHavedStar(add);
            }
            this.preseverData();
        }
    };
    /**
     * 当前技能的等级,0开始
     * @returns rush levels sum
     */
    User.prototype.getSkillsLevel = function () {
        if (this.userData === null)
            return;
        return this.userData.skillsLevel;
    };
    User.prototype.preseverData = function () {
        storageManager_1.default.ins.storageData("userData:" + this.userData.username, JSON.stringify(this.userData));
        console.log("保存用户数据:", this.userData);
    };
    return User;
}());
exports.User = User;
var GameConfig = /** @class */ (function () {
    function GameConfig(gameConfig) {
        this.gameConfig = null;
        this.gameConfig = gameConfig;
        console.log("新建一个GameConfig对象，显示json对象:\n", this.gameConfig);
    }
    GameConfig.prototype.getRateOfSale = function () {
        return this.gameConfig.rateOfSale;
    };
    GameConfig.prototype.getInitChip = function () {
        return this.gameConfig.initChip;
    };
    GameConfig.prototype.getInitBlood = function () {
        return this.gameConfig.initBlood;
    };
    GameConfig.prototype.getTowerUpNeedStar = function () {
        return this.gameConfig.towerUpNeedStar;
    };
    GameConfig.prototype.getSkillsUpNeedStar = function () {
        return this.gameConfig.skillsUpNeedStar;
    };
    /**
     * 得到 一共有多少关
     * @returns levels sum
     */
    GameConfig.prototype.getLevelsSum = function () {
        return this.gameConfig.levelsSum;
    };
    /**
     * 得到 最多可得到多少星星
     * @returns start sum
     */
    GameConfig.prototype.getStarSum = function () {
        return this.gameConfig.levelsSum * 3;
    };
    /**
     * 得到士兵数据
     * @returns
     */
    GameConfig.prototype.getSoldierData = function () {
        return this.gameConfig.soldierData;
    };
    GameConfig.prototype.getMonsterData = function () {
        return this.gameConfig.mosterData;
    };
    GameConfig.prototype.getDataOfArrowTower = function () {
        return this.gameConfig.dataOfTower.arrowTower;
    };
    GameConfig.prototype.getDataOfArtillery = function () {
        return this.gameConfig.dataOfTower.artillery;
    };
    GameConfig.prototype.getDataOfBarrack = function () {
        return this.gameConfig.dataOfTower.barrack;
    };
    GameConfig.prototype.getDataOfMagiclan = function () {
        return this.gameConfig.dataOfTower.magiclan;
    };
    return GameConfig;
}());
exports.GameConfig = GameConfig;
var GameDataStorage = /** @class */ (function () {
    function GameDataStorage() {
    }
    /**
     * 游戏打开时必须执行一次
     * @param gameConfig json对象
     */
    GameDataStorage.init = function (gameConfig) {
        this.gameConfig = new GameConfig(gameConfig);
        this.usernames = this.getNamesOfAllUser();
        for (var i = 0; i < this.usernames.length; i++)
            this.users.push(new User(this.usernames[i]));
    };
    GameDataStorage.getNamesOfAllUser = function () {
        var r = storageManager_1.default.ins.getData("namesOfAllUser");
        if (r === null)
            return [];
        else
            return JSON.parse(r);
    };
    /**
     * 保存所有用户的名字
     */
    GameDataStorage.preserveNamesOfAllUser = function () {
        if (this.usernames.length > 0) {
            var json = JSON.stringify(this.usernames);
            storageManager_1.default.ins.storageData("namesOfAllUser", json);
            console.log("所有用户名保存成功!");
        }
    };
    GameDataStorage.getGameConfig = function () {
        return this.gameConfig;
    };
    /**
     * 获得当前使用的用户
     * @returns current user
     */
    GameDataStorage.getCurrentUser = function () {
        return this.currentUser;
    };
    GameDataStorage.setCurrentUser = function (user) {
        this.currentUser = user;
    };
    /**
     * 得到所有用户的信息
     * @returns users
     */
    GameDataStorage.getUsers = function () {
        return this.users;
    };
    /**
     * 新建一个用户
     * @param username
     */
    GameDataStorage.createUser = function (username) {
        var newUser = new User(username);
        this.users.push(newUser);
        this.usernames.push(username);
        this.preserveNamesOfAllUser();
        newUser.preseverData();
    };
    GameDataStorage.delUser = function (username) {
        //从所有用户名中移除
        utils_1.default.remvoeItemOfArray(this.usernames, username);
        //从用户数组中移除
        for (var i = 0; i < this.users.length; i++)
            if (this.users[i].getUsername() === username) {
                this.users.splice(i, 1);
                break;
            }
        //从本地存储数据中删除
        storageManager_1.default.ins.removeData("userData:" + username);
        this.preserveNamesOfAllUser();
    };
    /**
     * 保存游戏数据,游戏退出时必须执行
     */
    GameDataStorage.preserveGameData = function () {
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var v = _a[_i];
            v.preseverData();
        }
        this.preserveNamesOfAllUser();
    };
    GameDataStorage.gameConfig = null;
    GameDataStorage.users = [];
    GameDataStorage.usernames = null;
    GameDataStorage.currentUser = null;
    GameDataStorage.ls = cc.sys.localStorage;
    return GameDataStorage;
}());
exports.default = GameDataStorage;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUE0QjtBQUM1QixtREFBOEM7QUFFOUM7SUF3Qkk7OztPQUdHO0lBQ0gsY0FBWSxRQUFnQjtRQTNCNUI7O1dBRUc7UUFDSyxpQkFBWSxHQUFHO1lBQ25CLFFBQVEsRUFBRSxHQUFHO1lBQ2IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsa0JBQWtCLEVBQUUsQ0FBQztZQUNyQixXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixXQUFXO1lBQ1gsZ0JBQWdCO1lBQ2hCLHFCQUFxQjtZQUNyQixtQkFBbUI7WUFDbkIsb0JBQW9CO1lBQ3BCLHNCQUFzQjtZQUN0QiwrQkFBK0I7WUFDL0IsS0FBSztTQUNSLENBQUE7UUFDRDs7V0FFRztRQUNLLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsT0FBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1FBTzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNuRSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDckM7O1lBRUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsMEJBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7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dCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBTdG9yYWdlTWFuYWdlciBmcm9tIFwiLi9zdG9yYWdlTWFuYWdlclwiO1xuXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gICAgLyoqXG4gICAgICog5Yid5aeL55So5oi35pWw5o2uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0VXNlckRhdGEgPSB7XG4gICAgICAgIHVzZXJuYW1lOiBcIuaXoFwiLFxuICAgICAgICBsZXZlbHNSZXZpZXc6IFtdLCAvL+avj+WFs+W+l+eahOaYn+aYn1xuICAgICAgICBjdXJyZW50SGF2ZVN0YXJOdW06IDAsIC8v5b2T5YmN6IO955So55qE5pif5pif5pWwXG4gICAgICAgIHNraWxsc0xldmVsOiBbMCwgMCwgMCwgMCwgMCwgMF1cbiAgICAgICAgLy8geyAvL+W9k+WJjeetiee6p1xuICAgICAgICAvLyAgICAgYXJyb3c6IDAsXG4gICAgICAgIC8vICAgICBiYXJyYWNrOiAwLCDlhbXokKVcbiAgICAgICAgLy8gICAgIG1hZ2ljbGFuOiAwLFxuICAgICAgICAvLyAgICAgYXJ0aWxsZXJ5OiAwLFxuICAgICAgICAvLyAgICAgYm9tYjogMCwgLy/ngrjlvLnmioDog71cbiAgICAgICAgLy8gICAgIGRpc3BhdGNoVHJvb3BzOiAwLC8v5Ye65YW15oqA6IO9XG4gICAgICAgIC8vIH0sXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeUqOaIt+aVsOaNrlxuICAgICAqL1xuICAgIHByaXZhdGUgdXNlckRhdGEgPSBudWxsO1xuICAgIHByaXZhdGUgbHMgPSBjYy5zeXMubG9jYWxTdG9yYWdlO1xuXG4gICAgLyoqXG4gICAgICog5rKh5pyJ6K+l55So5oi35LyaIOWIneWni+WMluivpeeUqOaIt+WHuuadpVxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudXNlckRhdGEgPSBTdG9yYWdlTWFuYWdlci5pbnMuZ2V0RGF0YShcInVzZXJEYXRhOlwiICsgdXNlcm5hbWUpO1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YSA9IHRoaXMuaW5pdFVzZXJEYXRhO1xuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMudXNlckRhdGEgPSBKU09OLnBhcnNlKHRoaXMudXNlckRhdGEpO1xuICAgIH1cblxuICAgIGdldFVzZXJuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJEYXRhLnVzZXJuYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHjee9ruaKgOiDve+8jOW9kuWbnuaYn+aYn1xuICAgICAqL1xuICAgIHJlc2V0U2tpbGwoKSB7XG4gICAgICAgIHRoaXMudXNlckRhdGEuc2tpbGxzTGV2ZWwuZmlsbCgwKTtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5jdXJyZW50SGF2ZVN0YXJOdW0gPSB0aGlzLmdldFN0YXJTdW0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmi6XmnInnmoTmmJ/mmJ/mlbBcbiAgICAgKi9cbiAgICBnZXRDdXJyZW50SGF2ZVN0YXJOdW0oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckRhdGEuY3VycmVudEhhdmVTdGFyTnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWHj+WOu+aLpeacieeahOaYn+aYn1xuICAgICAqIEBwYXJhbSBuIOaYn+aYn+aVsFxuICAgICAqL1xuICAgIHN1YkhhdmVkU3RhcihuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5jdXJyZW50SGF2ZVN0YXJOdW0gLT0gbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEhhdmVkU3RhcihuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy51c2VyRGF0YS5jdXJyZW50SGF2ZVN0YXJOdW0gKz0gbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvZPliY3njqnlrrbkuIDlhbHlvpfliLDlpJrlsJHkuKrmmJ/mmJ9cbiAgICAgKiBAcmV0dXJucyBzdGFydCBzdW0gXG4gICAgICovXG4gICAgZ2V0U3RhclN1bSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IHM6IG51bWJlciA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51c2VyRGF0YS5sZXZlbHNSZXZpZXcubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBzICs9IHRoaXMudXNlckRhdGEubGV2ZWxzUmV2aWV3W2ldO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnjqnlrrbpl6/ov4fkuoblpJrlsJHlhbNcbiAgICAgKiBAcmV0dXJucyBydXNoIGxldmVscyBzdW0gXG4gICAgICovXG4gICAgZ2V0UnVzaExldmVsc1N1bSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YS5sZXZlbHNSZXZpZXcubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOavj+WFs+W+l+WIsOeahOWIhuaVsFxuICAgICAqIEByZXR1cm5zIHJ1c2ggbGV2ZWxzIHN1bSBcbiAgICAgKi9cbiAgICBnZXRMZXZlbHNSZXZpZXcoKTogbnVtYmVyW10ge1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YS5sZXZlbHNSZXZpZXc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBsZXZlbCByZXZpZXdcbiAgICAgKiBAcGFyYW0gbGV2ZWxOIOesrOWHoOWFs++8jDDlvIDlp4tcbiAgICAgKiBAcGFyYW0gcmV2aWV3IOW+l+WIsOeahOaYn+aYn+aVsFxuICAgICAqL1xuICAgIHNldExldmVsUmV2aWV3KGxldmVsTjogbnVtYmVyLCByZXZpZXc6IG51bWJlcikge1xuICAgICAgICBpZiAobGV2ZWxOID4gdGhpcy51c2VyRGF0YS5ydXNoTGV2ZWxzU3VtKVxuICAgICAgICAgICAgdGhpcy51c2VyRGF0YS5ydXNoTGV2ZWxzU3VtID0gbGV2ZWxOO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJEYXRhLmxldmVsc1Jldmlld1tsZXZlbE5dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmxldmVsc1Jldmlld1tsZXZlbE5dID0gcmV2aWV3O1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkSGF2ZWRTdGFyKHJldmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVzZXJEYXRhLmxldmVsc1Jldmlld1tsZXZlbE5dIDwgcmV2aWV3KSB7XG4gICAgICAgICAgICAgICAgbGV0IGFkZDogbnVtYmVyID0gcmV2aWV3IC0gdGhpcy51c2VyRGF0YS5sZXZlbHNSZXZpZXdbbGV2ZWxOXTtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmxldmVsc1Jldmlld1tsZXZlbE5dID0gcmV2aWV3O1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkSGF2ZWRTdGFyKGFkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByZXNldmVyRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5b2T5YmN5oqA6IO955qE562J57qnLDDlvIDlp4tcbiAgICAgKiBAcmV0dXJucyBydXNoIGxldmVscyBzdW0gXG4gICAgICovXG4gICAgZ2V0U2tpbGxzTGV2ZWwoKTogbnVtYmVyW10ge1xuICAgICAgICBpZiAodGhpcy51c2VyRGF0YSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YS5za2lsbHNMZXZlbDtcbiAgICB9XG5cbiAgICBwcmVzZXZlckRhdGEoKSB7XG4gICAgICAgIFN0b3JhZ2VNYW5hZ2VyLmlucy5zdG9yYWdlRGF0YShcInVzZXJEYXRhOlwiICsgdGhpcy51c2VyRGF0YS51c2VybmFtZSwgSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyRGF0YSkpXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5L+d5a2Y55So5oi35pWw5o2uOlwiLCB0aGlzLnVzZXJEYXRhKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHYW1lQ29uZmlnIHtcbiAgICBwcml2YXRlIGdhbWVDb25maWcgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoZ2FtZUNvbmZpZzogYW55KSB7XG4gICAgICAgIHRoaXMuZ2FtZUNvbmZpZyA9IGdhbWVDb25maWc7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5paw5bu65LiA5LiqR2FtZUNvbmZpZ+Wvueixoe+8jOaYvuekumpzb27lr7nosaE6XFxuXCIsIHRoaXMuZ2FtZUNvbmZpZyk7XG5cbiAgICB9XG5cbiAgICBnZXRSYXRlT2ZTYWxlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVDb25maWcucmF0ZU9mU2FsZTtcbiAgICB9XG5cbiAgICBnZXRJbml0Q2hpcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ29uZmlnLmluaXRDaGlwO1xuICAgIH1cblxuICAgIGdldEluaXRCbG9vZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ29uZmlnLmluaXRCbG9vZDtcbiAgICB9XG5cbiAgICBnZXRUb3dlclVwTmVlZFN0YXIoKTogb2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNvbmZpZy50b3dlclVwTmVlZFN0YXI7XG4gICAgfVxuXG4gICAgZ2V0U2tpbGxzVXBOZWVkU3RhcigpOiBudW1iZXJbXVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNvbmZpZy5za2lsbHNVcE5lZWRTdGFyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW+l+WIsCDkuIDlhbHmnInlpJrlsJHlhbNcbiAgICAgKiBAcmV0dXJucyBsZXZlbHMgc3VtIFxuICAgICAqL1xuICAgIGdldExldmVsc1N1bSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ29uZmlnLmxldmVsc1N1bTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvpfliLAg5pyA5aSa5Y+v5b6X5Yiw5aSa5bCR5pif5pifXG4gICAgICogQHJldHVybnMgc3RhcnQgc3VtIFxuICAgICAqL1xuICAgIGdldFN0YXJTdW0oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNvbmZpZy5sZXZlbHNTdW0gKiAzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW+l+WIsOWjq+WFteaVsOaNrlxuICAgICAqIEByZXR1cm5zICBcbiAgICAgKi9cbiAgICBnZXRTb2xkaWVyRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNvbmZpZy5zb2xkaWVyRGF0YTtcbiAgICB9XG5cbiAgICBnZXRNb25zdGVyRGF0YSgpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVDb25maWcubW9zdGVyRGF0YTtcbiAgICB9XG5cbiAgICBnZXREYXRhT2ZBcnJvd1Rvd2VyKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNvbmZpZy5kYXRhT2ZUb3dlci5hcnJvd1Rvd2VyO1xuICAgIH1cbiAgICBnZXREYXRhT2ZBcnRpbGxlcnkoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ29uZmlnLmRhdGFPZlRvd2VyLmFydGlsbGVyeTtcbiAgICB9XG4gICAgZ2V0RGF0YU9mQmFycmFjaygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVDb25maWcuZGF0YU9mVG93ZXIuYmFycmFjaztcbiAgICB9XG4gICAgZ2V0RGF0YU9mTWFnaWNsYW4oKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ29uZmlnLmRhdGFPZlRvd2VyLm1hZ2ljbGFuO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGF0YVN0b3JhZ2Uge1xuICAgIHByaXZhdGUgc3RhdGljIGdhbWVDb25maWc6IEdhbWVDb25maWcgPSBudWxsO1xuICAgIHByaXZhdGUgc3RhdGljIHVzZXJzOiBVc2VyW10gPSBbXTtcbiAgICBwcml2YXRlIHN0YXRpYyB1c2VybmFtZXM6IHN0cmluZ1tdID0gbnVsbDtcbiAgICBwcml2YXRlIHN0YXRpYyBjdXJyZW50VXNlcjogVXNlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBzdGF0aWMgbHMgPSBjYy5zeXMubG9jYWxTdG9yYWdlO1xuXG4gICAgLyoqXG4gICAgICog5ri45oiP5omT5byA5pe25b+F6aG75omn6KGM5LiA5qyhXG4gICAgICogQHBhcmFtIGdhbWVDb25maWcganNvbuWvueixoVxuICAgICAqL1xuICAgIHN0YXRpYyBpbml0KGdhbWVDb25maWc6IGFueSkge1xuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBuZXcgR2FtZUNvbmZpZyhnYW1lQ29uZmlnKTtcbiAgICAgICAgdGhpcy51c2VybmFtZXMgPSB0aGlzLmdldE5hbWVzT2ZBbGxVc2VyKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51c2VybmFtZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLnVzZXJzLnB1c2gobmV3IFVzZXIodGhpcy51c2VybmFtZXNbaV0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXROYW1lc09mQWxsVXNlcigpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCByID0gU3RvcmFnZU1hbmFnZXIuaW5zLmdldERhdGEoXCJuYW1lc09mQWxsVXNlclwiKTtcbiAgICAgICAgaWYgKHIgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHIpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y5omA5pyJ55So5oi355qE5ZCN5a2XXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJlc2VydmVOYW1lc09mQWxsVXNlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlcm5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBqc29uOiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJuYW1lcyk7XG4gICAgICAgICAgICBTdG9yYWdlTWFuYWdlci5pbnMuc3RvcmFnZURhdGEoXCJuYW1lc09mQWxsVXNlclwiLCBqc29uKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omA5pyJ55So5oi35ZCN5L+d5a2Y5oiQ5YqfIVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRHYW1lQ29uZmlnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+W+l+W9k+WJjeS9v+eUqOeahOeUqOaIt1xuICAgICAqIEByZXR1cm5zIGN1cnJlbnQgdXNlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q3VycmVudFVzZXIoKTogVXNlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRDdXJyZW50VXNlcih1c2VyOiBVc2VyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB1c2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW+l+WIsOaJgOacieeUqOaIt+eahOS/oeaBr1xuICAgICAqIEByZXR1cm5zIHVzZXJzIFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRVc2VycygpOiBVc2VyW10ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlrDlu7rkuIDkuKrnlKjmiLdcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVVzZXIodXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgbmV3VXNlcjogVXNlciA9IG5ldyBVc2VyKHVzZXJuYW1lKTtcbiAgICAgICAgdGhpcy51c2Vycy5wdXNoKG5ld1VzZXIpO1xuICAgICAgICB0aGlzLnVzZXJuYW1lcy5wdXNoKHVzZXJuYW1lKTtcbiAgICAgICAgdGhpcy5wcmVzZXJ2ZU5hbWVzT2ZBbGxVc2VyKCk7XG4gICAgICAgIG5ld1VzZXIucHJlc2V2ZXJEYXRhKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlbFVzZXIodXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICAvL+S7juaJgOacieeUqOaIt+WQjeS4reenu+mZpFxuICAgICAgICBVdGlscy5yZW12b2VJdGVtT2ZBcnJheSh0aGlzLnVzZXJuYW1lcywgdXNlcm5hbWUpO1xuICAgICAgICAvL+S7jueUqOaIt+aVsOe7hOS4reenu+mZpFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudXNlcnMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBpZiAodGhpcy51c2Vyc1tpXS5nZXRVc2VybmFtZSgpID09PSB1c2VybmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAvL+S7juacrOWcsOWtmOWCqOaVsOaNruS4reWIoOmZpFxuICAgICAgICBTdG9yYWdlTWFuYWdlci5pbnMucmVtb3ZlRGF0YShcInVzZXJEYXRhOlwiICsgdXNlcm5hbWUpO1xuICAgICAgICB0aGlzLnByZXNlcnZlTmFtZXNPZkFsbFVzZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkv53lrZjmuLjmiI/mlbDmja4s5ri45oiP6YCA5Ye65pe25b+F6aG75omn6KGMXG4gICAgICovXG4gICAgc3RhdGljIHByZXNlcnZlR2FtZURhdGEoKSB7XG4gICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy51c2VycylcbiAgICAgICAgICAgIHYucHJlc2V2ZXJEYXRhKCk7XG4gICAgICAgIHRoaXMucHJlc2VydmVOYW1lc09mQWxsVXNlcigpO1xuICAgIH1cbn1cblxuIl19