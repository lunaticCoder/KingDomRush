"use strict";
cc._RF.push(module, '048a38YZ0JHh7ULHzbwxqf+', 'levelDataManager');
// scripts/common/module/levelDataManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = void 0;
/**
 * 一个储存关卡信息的静态类,用它来获取关卡信息
 */
var LevelDataManager = /** @class */ (function () {
    function LevelDataManager() {
    }
    /**
     * 游戏开始时必须执行
     */
    LevelDataManager.initLevelData = function (jsonObjs) {
        var o;
        for (var _i = 0, jsonObjs_1 = jsonObjs; _i < jsonObjs_1.length; _i++) {
            o = jsonObjs_1[_i];
            var l = this.initLevel(o);
            this.levelDatas.push(l);
        }
        console.log("关卡信息:", this.levelDatas);
    };
    LevelDataManager.initLevel = function (jsonObj) {
        var level = new Level();
        level.roadNum = jsonObj.roadNum;
        level.posOfBuilders = jsonObj.posOfBuilders;
        level.noOfRound = jsonObj.noOfRound;
        level.timeOfRound = jsonObj.timeOfRound;
        level.stationOfSoldier = jsonObj.stationOfSoldier;
        return level;
    };
    LevelDataManager.getLevelData = function (level) {
        return this.levelDatas[level - 1];
    };
    LevelDataManager.levelDatas = [];
    return LevelDataManager;
}());
exports.default = LevelDataManager;
var Level = /** @class */ (function () {
    function Level() {
    }
    return Level;
}());
exports.Level = Level;

cc._RF.pop();