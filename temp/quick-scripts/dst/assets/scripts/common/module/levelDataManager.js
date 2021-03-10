
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/module/levelDataManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb2R1bGUvbGV2ZWxEYXRhTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNIO0lBQUE7SUE4QkEsQ0FBQztJQTNCRzs7T0FFRztJQUNJLDhCQUFhLEdBQXBCLFVBQXFCLFFBQWE7UUFDOUIsSUFBSSxDQUFNLENBQUM7UUFDWCxLQUFVLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO1lBQWYsQ0FBQyxpQkFBQTtZQUNGLElBQUksQ0FBQyxHQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVjLDBCQUFTLEdBQXhCLFVBQXlCLE9BQVk7UUFDakMsSUFBSSxLQUFLLEdBQVUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMvQixLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDaEMsS0FBSyxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzVDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxLQUFLLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDeEMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUVsRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sNkJBQVksR0FBbkIsVUFBb0IsS0FBYTtRQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUE1QmMsMkJBQVUsR0FBWSxFQUFFLENBQUM7SUE2QjVDLHVCQUFDO0NBOUJELEFBOEJDLElBQUE7a0JBOUJvQixnQkFBZ0I7QUFnQ3JDO0lBQUE7SUFrQkEsQ0FBQztJQUFELFlBQUM7QUFBRCxDQWxCQSxBQWtCQyxJQUFBO0FBbEJZLHNCQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDkuIDkuKrlgqjlrZjlhbPljaHkv6Hmga/nmoTpnZnmgIHnsbss55So5a6D5p2l6I635Y+W5YWz5Y2h5L+h5oGvXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsRGF0YU1hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljIGxldmVsRGF0YXM6IExldmVsW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIOa4uOaIj+W8gOWni+aXtuW/hemhu+aJp+ihjFxuICAgICAqL1xuICAgIHN0YXRpYyBpbml0TGV2ZWxEYXRhKGpzb25PYmpzOiBhbnkpIHtcbiAgICAgICAgbGV0IG86IGFueTtcbiAgICAgICAgZm9yIChvIG9mIGpzb25PYmpzKSB7XG4gICAgICAgICAgICBsZXQgbDogTGV2ZWwgPSB0aGlzLmluaXRMZXZlbChvKTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxEYXRhcy5wdXNoKGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCLlhbPljaHkv6Hmga86XCIsIHRoaXMubGV2ZWxEYXRhcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5pdExldmVsKGpzb25PYmo6IGFueSk6IExldmVsIHtcbiAgICAgICAgbGV0IGxldmVsOiBMZXZlbCA9IG5ldyBMZXZlbCgpO1xuICAgICAgICBsZXZlbC5yb2FkTnVtID0ganNvbk9iai5yb2FkTnVtO1xuICAgICAgICBsZXZlbC5wb3NPZkJ1aWxkZXJzID0ganNvbk9iai5wb3NPZkJ1aWxkZXJzO1xuICAgICAgICBsZXZlbC5ub09mUm91bmQgPSBqc29uT2JqLm5vT2ZSb3VuZDtcbiAgICAgICAgbGV2ZWwudGltZU9mUm91bmQgPSBqc29uT2JqLnRpbWVPZlJvdW5kO1xuICAgICAgICBsZXZlbC5zdGF0aW9uT2ZTb2xkaWVyID0ganNvbk9iai5zdGF0aW9uT2ZTb2xkaWVyO1xuXG4gICAgICAgIHJldHVybiBsZXZlbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TGV2ZWxEYXRhKGxldmVsOiBudW1iZXIpOiBMZXZlbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmxldmVsRGF0YXNbbGV2ZWwgLSAxXTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMZXZlbCB7XG4gICAgcm9hZE51bTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIOW7uuetkeeCueeahOWdkOaghyBidWlsZE1hcOWdkOagh1xuICAgICAqL1xuICAgIHBvc09mQnVpbGRlcnM6IGNjLlZlYzJbXTtcbiAgICAvKipcbiAgICAgKiDmr4/ms6LmgKrniannmoTnvJblj7dcbiAgICAgKi9cbiAgICBub09mUm91bmQ6IG51bWJlcltdW107XG4gICAgLyoqXG4gICAgICog5q+P5rOi55qE5pe26Ze0XG4gICAgICovXG4gICAgdGltZU9mUm91bmQ6IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIOW7uuetkeeCueaXgeeahOmpu+eCuSDkuJbnlYzlnZDmoIcgW2J1aWxkZXLlj7ddWzPkuKrlo6vlhbXngrldXG4gICAgICovXG4gICAgc3RhdGlvbk9mU29sZGllcjogY2MuVmVjMltdW107XG59Il19