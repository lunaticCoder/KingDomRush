"use strict";
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