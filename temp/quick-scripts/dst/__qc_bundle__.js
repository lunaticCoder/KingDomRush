
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.1-2.2.1_cc.Toggle_event');
require('./assets/res/prefabs/loadingDoorAnim/loadingDoorAnim');
require('./assets/res/prefabs/switch/audioSwitch');
require('./assets/scripts/aboutScene/aboutScene');
require('./assets/scripts/common/animationPath');
require('./assets/scripts/common/frameAnimation');
require('./assets/scripts/common/module/gameDataManager');
require('./assets/scripts/common/module/levelDataManager');
require('./assets/scripts/common/module/soundsManager');
require('./assets/scripts/common/module/storageManager');
require('./assets/scripts/common/module/utils');
require('./assets/scripts/common/move');
require('./assets/scripts/common/nodeSort');
require('./assets/scripts/common/starReview');
require('./assets/scripts/homeScene/homeScene');
require('./assets/scripts/homeScene/startAnim');
require('./assets/scripts/homeScene/storeBoard');
require('./assets/scripts/levelScene/V_gameState');
require('./assets/scripts/levelScene/builder');
require('./assets/scripts/levelScene/combatLogic');
require('./assets/scripts/levelScene/creature');
require('./assets/scripts/levelScene/levelScene');
require('./assets/scripts/levelScene/monster/monster');
require('./assets/scripts/levelScene/monster/monsterFactory');
require('./assets/scripts/levelScene/settlementFace');
require('./assets/scripts/levelScene/tower/arrow/arrowBullet');
require('./assets/scripts/levelScene/tower/arrow/arrowTower');
require('./assets/scripts/levelScene/tower/arrow/arrower');
require('./assets/scripts/levelScene/tower/artillery/artilleryBullet');
require('./assets/scripts/levelScene/tower/artillery/artilleryTower');
require('./assets/scripts/levelScene/tower/barrack/barrack');
require('./assets/scripts/levelScene/tower/barrack/soldier');
require('./assets/scripts/levelScene/tower/magiclan/magiclanBullet');
require('./assets/scripts/levelScene/tower/magiclan/magiclanTower');
require('./assets/scripts/selecttLevelScene/aSeriesSkill');
require('./assets/scripts/selecttLevelScene/levelManager');
require('./assets/scripts/selecttLevelScene/selectLevelScene');
require('./assets/scripts/selecttLevelScene/skillsBoard');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/builder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a41detyOBVLHZsU59cvFaU2', 'builder');
// scripts/levelScene/builder.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Builder = /** @class */ (function (_super) {
    __extends(Builder, _super);
    function Builder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrowTower = null;
        _this.barrackTower = null;
        _this.magiclanTower = null;
        _this.artilleryTower = null;
        _this.graphics = null;
        /**
         * 建筑塔面板
         */
        _this.buildFace = null;
        /**
         * 建造的塔
         */
        _this.tower = null;
        /**
         * 没建塔时显示4种建筑的建造按钮界面
         */
        _this.g1 = null;
        /**
         * 建塔后显示的升级和卖出按钮界面
         */
        _this.g2 = null;
        _this.upgrade = null;
        /**
         * 空地（背景）节点
         */
        _this.land = null;
        _this.towerMap = null;
        _this.levelScene = null;
        _this.priceOfArrow = null;
        _this.priceOfBarrack = null;
        _this.priceOfMagiclan = null;
        _this.priceOfArtillery = null;
        _this.priceOfUpgrade = null;
        _this.priceOfSale = null;
        /* 数据 */
        /**
         * buildFace面板弹出和隐藏的时间
         */
        _this.timeOfFaceAction = 0.1;
        /**
         * 各种塔的数据
         * arrowTower,artillery,barrack,magiclan
         */
        _this.dataOfTower = [];
        /* 控制 */
        _this.playingOutBuildFace = false;
        _this.playingHiddenBuildFace = false;
        _this.g = null;
        return _this;
        // update (dt) {}
    }
    Builder.prototype.onLoad = function () {
        this.buildFace = this.node.getChildByName("buildFace");
        this.g1 = this.buildFace.getChildByName("g1");
        this.g2 = this.buildFace.getChildByName("g2");
        this.upgrade = this.g2.getChildByName("upgrade").getComponent(cc.Button);
        this.land = this.node.getChildByName("land");
        this.towerMap = cc.find("Canvas/towerMap");
        this.levelScene = cc.find("Canvas").getComponent("levelScene");
        this.stationOfSoldier = this.levelScene.levelData.stationOfSoldier;
        var gc = gameDataManager_1.default.getGameConfig();
        this.dataOfTower.push(gc.getDataOfArrowTower());
        this.dataOfTower.push(gc.getDataOfArtillery());
        this.dataOfTower.push(gc.getDataOfBarrack());
        this.dataOfTower.push(gc.getDataOfMagiclan());
        this.priceOfArrow = this.g1.getChildByName("arrow").getChildByName("price").getComponent(cc.Label);
        this.priceOfBarrack = this.g1.getChildByName("barrack").getChildByName("price").getComponent(cc.Label);
        this.priceOfMagiclan = this.g1.getChildByName("magiclan").getChildByName("price").getComponent(cc.Label);
        this.priceOfArtillery = this.g1.getChildByName("artillery").getChildByName("price").getComponent(cc.Label);
        this.priceOfUpgrade = this.g2.getChildByName("upgrade").getChildByName("price").getComponent(cc.Label);
        this.priceOfSale = this.g2.getChildByName("sale").getChildByName("price").getComponent(cc.Label);
        this.rateOfSale = gc.getRateOfSale();
    };
    Builder.prototype.start = function () {
    };
    /**
     * 实例化加入父节点后必须执行
     * @param num builder编号
     */
    Builder.prototype.init = function (num) {
        this.g = this.graphics.addComponent(cc.Graphics);
        this.g.strokeColor = this.g.fillColor = new cc.Color(0, 100, 0, 50);
        this.num = num;
    };
    /**
     * 弹出buildFace
     */
    Builder.prototype.outBuildFace = function () {
        if (this.playingOutBuildFace)
            return;
        this.playingOutBuildFace = true;
        this.node.zIndex = 10;
        this.buildFace.active = true;
        if (this.tower === null) {
            this.refreshPriceOfBuild();
            this.g1.active = true;
        }
        else { //有塔
            this.refreshPriceOfUpOrSele();
            if (this.tower.level === this.tower.maxLevel) //满级了
                this.upgrade.interactable = false;
            else
                this.upgrade.interactable = true;
            this.g2.active = true;
        }
        var a = cc.scaleTo(this.timeOfFaceAction, 1).easing(cc.easeBackOut());
        var func = cc.callFunc(function () { this.playingOutBuildFace = false; }, this);
        var seq = cc.sequence(a, func);
        this.buildFace.runAction(seq);
    };
    /**
     * 刷新各塔的建造价格
     */
    Builder.prototype.refreshPriceOfBuild = function () {
        this.setLabelInCase(this.priceOfArrow, this.dataOfTower[0][0].price);
        this.setLabelInCase(this.priceOfArtillery, this.dataOfTower[1][0].price);
        this.setLabelInCase(this.priceOfBarrack, this.dataOfTower[2][0].price);
        this.setLabelInCase(this.priceOfMagiclan, this.dataOfTower[3][0].price);
    };
    /**
     * 刷新升级塔和卖塔的价格
     */
    Builder.prototype.refreshPriceOfUpOrSele = function () {
        if (this.tower === null) {
            cc.error("[ERROR] 升级或卖塔时，发现塔为null。请处理！");
            return;
        }
        var d = this.tower.getDataOfTower();
        //升级按钮
        if (this.tower.level < d.length)
            this.setLabelInCase(this.priceOfUpgrade, d[this.tower.level].price);
        //出售按钮
        var p = d[this.tower.level - 1].price;
        this.priceOfSale.string = Math.floor(p * this.rateOfSale).toString();
    };
    /**
     * 根据操作价格与已有金币设置label
     * @param l Label
     * @param p 建筑价格
     */
    Builder.prototype.setLabelInCase = function (l, p) {
        var havedCash = this.levelScene.cash;
        l.string = p.toString();
        if (p > havedCash)
            l.node.color = cc.Color.RED;
        else
            l.node.color = cc.Color.WHITE;
    };
    /**
     * 隐藏buildFace
     */
    Builder.prototype.hiddenBuildFace = function () {
        if (this.playingHiddenBuildFace)
            return;
        this.playingHiddenBuildFace = true;
        this.node.zIndex = 0;
        var a = cc.scaleTo(this.timeOfFaceAction, 0);
        this.buildFace.runAction(a);
        this.scheduleOnce(function () {
            this.buildFace.active = false;
            this.g1.active = false;
            this.g2.active = false;
            this.playingHiddenBuildFace = false;
        }.bind(this), this.timeOfFaceAction);
    };
    Builder.prototype.buildArrowTower = function () {
        var cost = this.dataOfTower[0][0].price;
        this.buildTower(this.arrowTower, "arrowTower", cost);
    };
    Builder.prototype.buildArtilleryTower = function () {
        var cost = this.dataOfTower[1][0].price;
        this.buildTower(this.artilleryTower, "artilleryTower", cost);
    };
    Builder.prototype.buildMagiclanTower = function () {
        var cost = this.dataOfTower[3][0].price;
        this.buildTower(this.magiclanTower, "magiclanTower", cost);
    };
    Builder.prototype.buildBarrackTower = function () {
        var cost = this.dataOfTower[2][0].price;
        if (this.buildTower(this.barrackTower, "barrack", cost))
            this.tower.stationOfSoldier = this.stationOfSoldier[this.num];
    };
    /**
     * Builds tower
     * @param towerPrefab
     * @param component
     * @param cost 花费金币
     * @returns 金币不够，创建失败返回false
     */
    Builder.prototype.buildTower = function (towerPrefab, component, cost) {
        if (!this.levelScene.subCash(cost))
            return false;
        this.tower = cc.instantiate(towerPrefab).getComponent(component);
        this.towerMap.addChild(this.tower.node);
        this.tower.node.setPosition(this.node.getPosition());
        this.land.opacity = 0;
        this.hiddenBuildFaceImmediately();
        this.scheduleOnce(this.drawShootRange.bind(this), 0.5);
        return true;
    };
    Builder.prototype.saleTower = function () {
        this.levelScene.addCash(this.tower.price * this.rateOfSale);
        this.deleteTower();
        this.hiddenBuildFaceImmediately();
        this.g.clear();
    };
    Builder.prototype.upTower = function () {
        var havedCash = this.levelScene.cash;
        var cost = this.tower.getPriceOfUpgrade();
        if (havedCash < cost)
            return;
        this.levelScene.subCash(cost);
        this.tower.upgrade();
        this.drawShootRange();
        if (this.tower.level === this.tower.maxLevel) {
            this.upgrade.interactable = false;
            return;
        }
        this.refreshPriceOfUpOrSele();
    };
    /**
     * 立即隐藏BuildFace
     */
    Builder.prototype.hiddenBuildFaceImmediately = function () {
        this.buildFace.scale = 0;
        this.buildFace.active = false;
        this.g1.active = false;
        this.g2.active = false;
    };
    /**
     * 删除塔并将空地显示出来
     */
    Builder.prototype.deleteTower = function () {
        if (this.tower === null)
            return;
        this.tower.destroySelf();
        this.g.clear();
        this.tower = null;
        this.land.opacity = 255;
    };
    /**
    * 绘制射程范围
    */
    Builder.prototype.drawShootRange = function () {
        if (this.tower.shootRange === undefined)
            return;
        this.g.clear();
        this.g.circle(0, 0, this.tower.shootRange);
        this.g.stroke();
        this.g.fill();
    };
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "arrowTower", void 0);
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "barrackTower", void 0);
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "magiclanTower", void 0);
    __decorate([
        property({
            type: cc.Prefab,
        })
    ], Builder.prototype, "artilleryTower", void 0);
    __decorate([
        property({
            type: cc.Node,
        })
    ], Builder.prototype, "graphics", void 0);
    Builder = __decorate([
        ccclass
    ], Builder);
    return Builder;
}(cc.Component));
exports.default = Builder;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRUFBK0U7QUFFekUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUFpVUM7UUE1VFcsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFJN0Isa0JBQVksR0FBYyxJQUFJLENBQUM7UUFJL0IsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFJaEMsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFLakMsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQzs7V0FFRztRQUNLLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDbEM7O1dBRUc7UUFDSyxXQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3JCOztXQUVHO1FBQ0ssUUFBRSxHQUFZLElBQUksQ0FBQztRQUMzQjs7V0FFRztRQUNLLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFDbkIsYUFBTyxHQUFjLElBQUksQ0FBQztRQUNsQzs7V0FFRztRQUNLLFVBQUksR0FBWSxJQUFJLENBQUM7UUFDckIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixnQkFBVSxHQUFlLElBQUksQ0FBQztRQUU5QixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUM5QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxxQkFBZSxHQUFhLElBQUksQ0FBQztRQUNqQyxzQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFDbEMsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFHckMsUUFBUTtRQUNSOztXQUVHO1FBQ0ssc0JBQWdCLEdBQVcsR0FBRyxDQUFDO1FBTXZDOzs7V0FHRztRQUNLLGlCQUFXLEdBQVUsRUFBRSxDQUFDO1FBTWhDLFFBQVE7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LFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTTtTQUNsQixDQUFDO2tEQUNzQztJQUl4QztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTTtTQUNsQixDQUFDO21EQUN1QztJQUt6QztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtTQUNoQixDQUFDOzZDQUMrQjtJQXRCaEIsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWlVM0I7SUFBRCxjQUFDO0NBalVELEFBaVVDLENBalVvQyxFQUFFLENBQUMsU0FBUyxHQWlVaEQ7a0JBalVvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExldmVsU2NlbmUgZnJvbSBcIi4vbGV2ZWxTY2VuZVwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWlsZGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlByZWZhYixcbiAgICB9KVxuICAgIHByaXZhdGUgYXJyb3dUb3dlcjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXG4gICAgfSlcbiAgICBwcml2YXRlIGJhcnJhY2tUb3dlcjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXG4gICAgfSlcbiAgICBwcml2YXRlIG1hZ2ljbGFuVG93ZXI6IGNjLlByZWZhYiA9IG51bGw7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxuICAgIH0pXG4gICAgcHJpdmF0ZSBhcnRpbGxlcnlUb3dlcjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgfSlcbiAgICBwcml2YXRlIGdyYXBoaWNzOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOW7uuetkeWhlOmdouadv1xuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRGYWNlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDlu7rpgKDnmoTloZRcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvd2VyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDmsqHlu7rloZTml7bmmL7npLo056eN5bu6562R55qE5bu66YCg5oyJ6ZKu55WM6Z2iXG4gICAgICovXG4gICAgcHJpdmF0ZSBnMTogY2MuTm9kZSA9IG51bGw7XG4gICAgLyoqXG4gICAgICog5bu65aGU5ZCO5pi+56S655qE5Y2H57qn5ZKM5Y2W5Ye65oyJ6ZKu55WM6Z2iXG4gICAgICovXG4gICAgcHJpdmF0ZSBnMjogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSB1cGdyYWRlOiBjYy5CdXR0b24gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOepuuWcsO+8iOiDjOaZr++8ieiKgueCuVxuICAgICAqL1xuICAgIHByaXZhdGUgbGFuZDogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSB0b3dlck1hcDogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBsZXZlbFNjZW5lOiBMZXZlbFNjZW5lID0gbnVsbDtcblxuICAgIHByaXZhdGUgcHJpY2VPZkFycm93OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBwcmljZU9mQmFycmFjazogY2MuTGFiZWwgPSBudWxsO1xuICAgIHByaXZhdGUgcHJpY2VPZk1hZ2ljbGFuOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBwcmljZU9mQXJ0aWxsZXJ5OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBwcmljZU9mVXBncmFkZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIHByaXZhdGUgcHJpY2VPZlNhbGU6IGNjLkxhYmVsID0gbnVsbDtcblxuXG4gICAgLyog5pWw5o2uICovXG4gICAgLyoqXG4gICAgICogYnVpbGRGYWNl6Z2i5p2/5by55Ye65ZKM6ZqQ6JeP55qE5pe26Ze0XG4gICAgICovXG4gICAgcHJpdmF0ZSB0aW1lT2ZGYWNlQWN0aW9uOiBudW1iZXIgPSAwLjE7XG4gICAgLyoqXG4gICAgICogYnVpbGRlcue8luWPt1xuICAgICAqL1xuICAgIHByaXZhdGUgbnVtOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzdGF0aW9uT2ZTb2xkaWVyOiBjYy5WZWMyW11bXTtcbiAgICAvKipcbiAgICAgKiDlkITnp43loZTnmoTmlbDmja5cbiAgICAgKiBhcnJvd1Rvd2VyLGFydGlsbGVyeSxiYXJyYWNrLG1hZ2ljbGFuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkYXRhT2ZUb3dlcjogYW55W10gPSBbXTtcbiAgICAvKipcbiAgICAgKiDljZbloZTph5HluIHlm57mlLbnjodcbiAgICAgKi9cbiAgICBwcml2YXRlIHJhdGVPZlNhbGU6IG51bWJlcjtcblxuICAgIC8qIOaOp+WItiAqL1xuICAgIHByaXZhdGUgcGxheWluZ091dEJ1aWxkRmFjZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcGxheWluZ0hpZGRlbkJ1aWxkRmFjZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZzogY2MuR3JhcGhpY3MgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmJ1aWxkRmFjZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ1aWxkRmFjZVwiKTtcbiAgICAgICAgdGhpcy5nMSA9IHRoaXMuYnVpbGRGYWNlLmdldENoaWxkQnlOYW1lKFwiZzFcIik7XG4gICAgICAgIHRoaXMuZzIgPSB0aGlzLmJ1aWxkRmFjZS5nZXRDaGlsZEJ5TmFtZShcImcyXCIpO1xuICAgICAgICB0aGlzLnVwZ3JhZGUgPSB0aGlzLmcyLmdldENoaWxkQnlOYW1lKFwidXBncmFkZVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgdGhpcy5sYW5kID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFuZFwiKTtcbiAgICAgICAgdGhpcy50b3dlck1hcCA9IGNjLmZpbmQoXCJDYW52YXMvdG93ZXJNYXBcIik7XG4gICAgICAgIHRoaXMubGV2ZWxTY2VuZSA9IGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwibGV2ZWxTY2VuZVwiKTtcbiAgICAgICAgdGhpcy5zdGF0aW9uT2ZTb2xkaWVyID0gdGhpcy5sZXZlbFNjZW5lLmxldmVsRGF0YS5zdGF0aW9uT2ZTb2xkaWVyO1xuXG4gICAgICAgIGxldCBnYzogR2FtZUNvbmZpZyA9IEdhbWVEYXRhU3RvcmFnZS5nZXRHYW1lQ29uZmlnKCk7XG5cbiAgICAgICAgdGhpcy5kYXRhT2ZUb3dlci5wdXNoKGdjLmdldERhdGFPZkFycm93VG93ZXIoKSk7XG4gICAgICAgIHRoaXMuZGF0YU9mVG93ZXIucHVzaChnYy5nZXREYXRhT2ZBcnRpbGxlcnkoKSk7XG4gICAgICAgIHRoaXMuZGF0YU9mVG93ZXIucHVzaChnYy5nZXREYXRhT2ZCYXJyYWNrKCkpO1xuICAgICAgICB0aGlzLmRhdGFPZlRvd2VyLnB1c2goZ2MuZ2V0RGF0YU9mTWFnaWNsYW4oKSk7XG5cbiAgICAgICAgdGhpcy5wcmljZU9mQXJyb3cgPSB0aGlzLmcxLmdldENoaWxkQnlOYW1lKFwiYXJyb3dcIikuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aGlzLnByaWNlT2ZCYXJyYWNrID0gdGhpcy5nMS5nZXRDaGlsZEJ5TmFtZShcImJhcnJhY2tcIikuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aGlzLnByaWNlT2ZNYWdpY2xhbiA9IHRoaXMuZzEuZ2V0Q2hpbGRCeU5hbWUoXCJtYWdpY2xhblwiKS5nZXRDaGlsZEJ5TmFtZShcInByaWNlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIHRoaXMucHJpY2VPZkFydGlsbGVyeSA9IHRoaXMuZzEuZ2V0Q2hpbGRCeU5hbWUoXCJhcnRpbGxlcnlcIikuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aGlzLnByaWNlT2ZVcGdyYWRlID0gdGhpcy5nMi5nZXRDaGlsZEJ5TmFtZShcInVwZ3JhZGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB0aGlzLnByaWNlT2ZTYWxlID0gdGhpcy5nMi5nZXRDaGlsZEJ5TmFtZShcInNhbGVcIikuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuXG4gICAgICAgIHRoaXMucmF0ZU9mU2FsZSA9IGdjLmdldFJhdGVPZlNhbGUoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWunuS+i+WMluWKoOWFpeeItuiKgueCueWQjuW/hemhu+aJp+ihjFxuICAgICAqIEBwYXJhbSBudW0gYnVpbGRlcue8luWPt1xuICAgICAqL1xuICAgIGluaXQobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nID0gdGhpcy5ncmFwaGljcy5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuICAgICAgICB0aGlzLmcuc3Ryb2tlQ29sb3IgPSB0aGlzLmcuZmlsbENvbG9yID0gbmV3IGNjLkNvbG9yKDAsIDEwMCwgMCwgNTApO1xuXG4gICAgICAgIHRoaXMubnVtID0gbnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW8ueWHumJ1aWxkRmFjZVxuICAgICAqL1xuICAgIG91dEJ1aWxkRmFjZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWluZ091dEJ1aWxkRmFjZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5wbGF5aW5nT3V0QnVpbGRGYWNlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTA7XG5cbiAgICAgICAgdGhpcy5idWlsZEZhY2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMudG93ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFByaWNlT2ZCdWlsZCgpO1xuICAgICAgICAgICAgdGhpcy5nMS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvL+acieWhlFxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUHJpY2VPZlVwT3JTZWxlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy50b3dlci5sZXZlbCA9PT0gdGhpcy50b3dlci5tYXhMZXZlbCkgLy/mu6HnuqfkuoZcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGUuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmcyLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zY2FsZVRvKHRoaXMudGltZU9mRmFjZUFjdGlvbiwgMSkuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpO1xuICAgICAgICBsZXQgZnVuYzogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHsgdGhpcy5wbGF5aW5nT3V0QnVpbGRGYWNlID0gZmFsc2U7IH0sIHRoaXMpO1xuICAgICAgICBsZXQgc2VxOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLnNlcXVlbmNlKGEsIGZ1bmMpO1xuICAgICAgICB0aGlzLmJ1aWxkRmFjZS5ydW5BY3Rpb24oc2VxKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWQhOWhlOeahOW7uumAoOS7t+agvFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVmcmVzaFByaWNlT2ZCdWlsZCgpIHtcbiAgICAgICAgdGhpcy5zZXRMYWJlbEluQ2FzZSh0aGlzLnByaWNlT2ZBcnJvdywgdGhpcy5kYXRhT2ZUb3dlclswXVswXS5wcmljZSk7XG4gICAgICAgIHRoaXMuc2V0TGFiZWxJbkNhc2UodGhpcy5wcmljZU9mQXJ0aWxsZXJ5LCB0aGlzLmRhdGFPZlRvd2VyWzFdWzBdLnByaWNlKTtcbiAgICAgICAgdGhpcy5zZXRMYWJlbEluQ2FzZSh0aGlzLnByaWNlT2ZCYXJyYWNrLCB0aGlzLmRhdGFPZlRvd2VyWzJdWzBdLnByaWNlKTtcbiAgICAgICAgdGhpcy5zZXRMYWJlbEluQ2FzZSh0aGlzLnByaWNlT2ZNYWdpY2xhbiwgdGhpcy5kYXRhT2ZUb3dlclszXVswXS5wcmljZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWNh+e6p+WhlOWSjOWNluWhlOeahOS7t+agvFxuICAgICAqL1xuICAgIHByaXZhdGUgcmVmcmVzaFByaWNlT2ZVcE9yU2VsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudG93ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNjLmVycm9yKFwiW0VSUk9SXSDljYfnuqfmiJbljZbloZTml7bvvIzlj5HnjrDloZTkuLpudWxs44CC6K+35aSE55CG77yBXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGQ6IGFueSA9IHRoaXMudG93ZXIuZ2V0RGF0YU9mVG93ZXIoKTtcblxuICAgICAgICAvL+WNh+e6p+aMiemSrlxuICAgICAgICBpZiAodGhpcy50b3dlci5sZXZlbCA8IGQubGVuZ3RoKVxuICAgICAgICAgICAgdGhpcy5zZXRMYWJlbEluQ2FzZSh0aGlzLnByaWNlT2ZVcGdyYWRlLCBkW3RoaXMudG93ZXIubGV2ZWxdLnByaWNlKTtcblxuICAgICAgICAvL+WHuuWUruaMiemSrlxuICAgICAgICBsZXQgcDogbnVtYmVyID0gZFt0aGlzLnRvd2VyLmxldmVsIC0gMV0ucHJpY2U7XG4gICAgICAgIHRoaXMucHJpY2VPZlNhbGUuc3RyaW5nID0gTWF0aC5mbG9vcihwICogdGhpcy5yYXRlT2ZTYWxlKS50b1N0cmluZygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmoLnmja7mk43kvZzku7fmoLzkuI7lt7LmnInph5HluIHorr7nva5sYWJlbFxuICAgICAqIEBwYXJhbSBsIExhYmVsXG4gICAgICogQHBhcmFtIHAg5bu6562R5Lu35qC8XG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRMYWJlbEluQ2FzZShsOiBjYy5MYWJlbCwgcDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBoYXZlZENhc2g6IG51bWJlciA9IHRoaXMubGV2ZWxTY2VuZS5jYXNoO1xuICAgICAgICBsLnN0cmluZyA9IHAudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHAgPiBoYXZlZENhc2gpXG4gICAgICAgICAgICBsLm5vZGUuY29sb3IgPSBjYy5Db2xvci5SRUQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGwubm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmakOiXj2J1aWxkRmFjZVxuICAgICAqL1xuICAgIGhpZGRlbkJ1aWxkRmFjZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWluZ0hpZGRlbkJ1aWxkRmFjZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5wbGF5aW5nSGlkZGVuQnVpbGRGYWNlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMDtcblxuICAgICAgICBsZXQgYTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zY2FsZVRvKHRoaXMudGltZU9mRmFjZUFjdGlvbiwgMCk7XG4gICAgICAgIHRoaXMuYnVpbGRGYWNlLnJ1bkFjdGlvbihhKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRmFjZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZzEuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmcyLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLnBsYXlpbmdIaWRkZW5CdWlsZEZhY2UgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzLnRpbWVPZkZhY2VBY3Rpb24pO1xuICAgIH1cblxuICAgIGJ1aWxkQXJyb3dUb3dlcigpIHtcbiAgICAgICAgbGV0IGNvc3Q6IG51bWJlciA9IHRoaXMuZGF0YU9mVG93ZXJbMF1bMF0ucHJpY2U7XG4gICAgICAgIHRoaXMuYnVpbGRUb3dlcih0aGlzLmFycm93VG93ZXIsIFwiYXJyb3dUb3dlclwiLCBjb3N0KTtcbiAgICB9XG5cbiAgICBidWlsZEFydGlsbGVyeVRvd2VyKCkge1xuICAgICAgICBsZXQgY29zdDogbnVtYmVyID0gdGhpcy5kYXRhT2ZUb3dlclsxXVswXS5wcmljZTtcbiAgICAgICAgdGhpcy5idWlsZFRvd2VyKHRoaXMuYXJ0aWxsZXJ5VG93ZXIsIFwiYXJ0aWxsZXJ5VG93ZXJcIiwgY29zdCk7XG4gICAgfVxuXG4gICAgYnVpbGRNYWdpY2xhblRvd2VyKCkge1xuICAgICAgICBsZXQgY29zdDogbnVtYmVyID0gdGhpcy5kYXRhT2ZUb3dlclszXVswXS5wcmljZTtcbiAgICAgICAgdGhpcy5idWlsZFRvd2VyKHRoaXMubWFnaWNsYW5Ub3dlciwgXCJtYWdpY2xhblRvd2VyXCIsIGNvc3QpO1xuICAgIH1cblxuICAgIGJ1aWxkQmFycmFja1Rvd2VyKCkge1xuICAgICAgICBsZXQgY29zdDogbnVtYmVyID0gdGhpcy5kYXRhT2ZUb3dlclsyXVswXS5wcmljZTtcbiAgICAgICAgaWYgKHRoaXMuYnVpbGRUb3dlcih0aGlzLmJhcnJhY2tUb3dlciwgXCJiYXJyYWNrXCIsIGNvc3QpKVxuICAgICAgICAgICAgdGhpcy50b3dlci5zdGF0aW9uT2ZTb2xkaWVyID0gdGhpcy5zdGF0aW9uT2ZTb2xkaWVyW3RoaXMubnVtXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgdG93ZXJcbiAgICAgKiBAcGFyYW0gdG93ZXJQcmVmYWIgXG4gICAgICogQHBhcmFtIGNvbXBvbmVudCBcbiAgICAgKiBAcGFyYW0gY29zdCDoirHotLnph5HluIFcbiAgICAgKiBAcmV0dXJucyDph5HluIHkuI3lpJ/vvIzliJvlu7rlpLHotKXov5Tlm55mYWxzZVxuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRUb3dlcih0b3dlclByZWZhYjogY2MuUHJlZmFiLCBjb21wb25lbnQ6IHN0cmluZywgY29zdDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5sZXZlbFNjZW5lLnN1YkNhc2goY29zdCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy50b3dlciA9IGNjLmluc3RhbnRpYXRlKHRvd2VyUHJlZmFiKS5nZXRDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy50b3dlck1hcC5hZGRDaGlsZCh0aGlzLnRvd2VyLm5vZGUpO1xuICAgICAgICB0aGlzLnRvd2VyLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgIHRoaXMubGFuZC5vcGFjaXR5ID0gMDtcbiAgICAgICAgdGhpcy5oaWRkZW5CdWlsZEZhY2VJbW1lZGlhdGVseSgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmRyYXdTaG9vdFJhbmdlLmJpbmQodGhpcyksIDAuNSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHNhbGVUb3dlcigpIHtcbiAgICAgICAgdGhpcy5sZXZlbFNjZW5lLmFkZENhc2godGhpcy50b3dlci5wcmljZSAqIHRoaXMucmF0ZU9mU2FsZSk7XG5cbiAgICAgICAgdGhpcy5kZWxldGVUb3dlcigpO1xuICAgICAgICB0aGlzLmhpZGRlbkJ1aWxkRmFjZUltbWVkaWF0ZWx5KCk7XG4gICAgICAgIHRoaXMuZy5jbGVhcigpO1xuICAgIH1cblxuICAgIHVwVG93ZXIoKSB7XG4gICAgICAgIGxldCBoYXZlZENhc2g6IG51bWJlciA9IHRoaXMubGV2ZWxTY2VuZS5jYXNoO1xuICAgICAgICBsZXQgY29zdDogbnVtYmVyID0gdGhpcy50b3dlci5nZXRQcmljZU9mVXBncmFkZSgpO1xuICAgICAgICBpZiAoaGF2ZWRDYXNoIDwgY29zdClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLmxldmVsU2NlbmUuc3ViQ2FzaChjb3N0KTtcbiAgICAgICAgdGhpcy50b3dlci51cGdyYWRlKCk7XG4gICAgICAgIHRoaXMuZHJhd1Nob290UmFuZ2UoKTtcbiAgICAgICAgaWYgKHRoaXMudG93ZXIubGV2ZWwgPT09IHRoaXMudG93ZXIubWF4TGV2ZWwpIHtcbiAgICAgICAgICAgIHRoaXMudXBncmFkZS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFByaWNlT2ZVcE9yU2VsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeri+WNs+makOiXj0J1aWxkRmFjZVxuICAgICAqL1xuICAgIGhpZGRlbkJ1aWxkRmFjZUltbWVkaWF0ZWx5KCkge1xuICAgICAgICB0aGlzLmJ1aWxkRmFjZS5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuYnVpbGRGYWNlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmcxLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmcyLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIoOmZpOWhlOW5tuWwhuepuuWcsOaYvuekuuWHuuadpVxuICAgICAqL1xuICAgIGRlbGV0ZVRvd2VyKCkge1xuICAgICAgICBpZiAodGhpcy50b3dlciA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy50b3dlci5kZXN0cm95U2VsZigpO1xuICAgICAgICB0aGlzLmcuY2xlYXIoKTtcbiAgICAgICAgdGhpcy50b3dlciA9IG51bGw7XG4gICAgICAgIHRoaXMubGFuZC5vcGFjaXR5ID0gMjU1O1xuICAgIH1cblxuICAgIC8qKlxuICAgICog57uY5Yi25bCE56iL6IyD5Zu0XG4gICAgKi9cbiAgICBwcml2YXRlIGRyYXdTaG9vdFJhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy50b3dlci5zaG9vdFJhbmdlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5nLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZy5jaXJjbGUoMCwgMCwgdGhpcy50b3dlci5zaG9vdFJhbmdlKTtcbiAgICAgICAgdGhpcy5nLnN0cm9rZSgpO1xuICAgICAgICB0aGlzLmcuZmlsbCgpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/aSeriesSkill.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76113tXtdFKfauIznqEqSv3', 'aSeriesSkill');
// scripts/selecttLevelScene/aSeriesSkill.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillIcon = exports.SkillState = void 0;
var gameDataManager_1 = require("../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 技能图标有3个状态：可以升级并且星星够、可以升级但星星不够、不能升级的灰色、已升级
 */
var SkillState;
(function (SkillState) {
    SkillState[SkillState["Upgradable"] = 0] = "Upgradable";
    SkillState[SkillState["StarShort"] = 1] = "StarShort";
    SkillState[SkillState["Upgraded"] = 2] = "Upgraded";
    SkillState[SkillState["UnUpgrade"] = 3] = "UnUpgrade";
})(SkillState = exports.SkillState || (exports.SkillState = {}));
;
var SkillIcon = /** @class */ (function () {
    /**
     * Creates an instance of skill icon.
     * @param node 图标节点
     * @param state 该技能状态
     */
    function SkillIcon(node, state, upNeedStarNum) {
        this.node = node;
        this.button = node.getChildByName("bg").getComponent(cc.Button);
        this.starNum = node.getChildByName("starNum");
        this.labelNode = this.starNum.getChildByName("label");
        this.label = this.labelNode.getComponent(cc.Label);
        this.setState(state);
        this.setNeedStarNum(upNeedStarNum);
    }
    SkillIcon.prototype.setState = function (state) {
        this.state = state;
        switch (this.state) {
            case SkillState.Upgradable: { //可以升级
                this.button.interactable = true;
                this.starNum.active = true;
                this.labelNode.color = cc.Color.WHITE;
                break;
            }
            case SkillState.StarShort: {
                this.button.interactable = true;
                this.starNum.active = true;
                this.labelNode.color = cc.Color.RED;
                break;
            }
            case SkillState.UnUpgrade: { //不能升级
                this.button.interactable = false;
                this.starNum.active = true;
                this.labelNode.color = cc.Color.WHITE;
                break;
            }
            case SkillState.Upgraded: { //已升级
                this.button.interactable = true;
                this.starNum.active = false;
                this.labelNode.color = cc.Color.WHITE;
                break;
            }
        }
    };
    SkillIcon.prototype.getState = function () {
        return this.state;
    };
    SkillIcon.prototype.getButton = function () {
        return this.button;
    };
    SkillIcon.prototype.setNeedStarNum = function (n) {
        this.label.string = n.toString();
    };
    return SkillIcon;
}());
exports.SkillIcon = SkillIcon;
var AseriesSkill = /** @class */ (function (_super) {
    __extends(AseriesSkill, _super);
    function AseriesSkill() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skillNum = 1;
        /**
         * 每个技能有 5个 等级，即有5个Node
         */
        _this.skillNode = null;
        _this.skillIcons = [];
        _this.gameConfig = null;
        _this.user = null;
        /**
         * 当前玩家技能的等级
         */
        _this.skillLevel = null;
        _this.selectLevelScene = null;
        _this.skillsBoard = null;
        return _this;
    }
    AseriesSkill.prototype.onLoad = function () {
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.user = gameDataManager_1.default.getCurrentUser();
        this.skillLevel = this.user.getSkillsLevel();
        this.skillNode = this.node.children;
        this.selectLevelScene = cc.find("Canvas").getComponent("selectLevelScene");
        this.skillsUpNeedStar = this.gameConfig.getSkillsUpNeedStar();
        this.skillsBoard = cc.find("Canvas/centerAnchor/skillsBoard").getComponent("skillsBoard");
    };
    AseriesSkill.prototype.start = function () {
        this.initskillIcons();
    };
    AseriesSkill.prototype.initskillIcons = function () {
        for (var i = 0; i < 5; i++) { //技能等级
            var skillIcon = new SkillIcon(this.skillNode[i], this.judgeSkillState(i + 1), this.skillsUpNeedStar[this.skillNum - 1][i]);
            this.skillIcons.push(skillIcon);
            //绑定按钮事件
            var button = skillIcon.getButton();
            var click_event = new cc.Component.EventHandler();
            //添加响应事件的必要参数，即响应函数所在的节点、组件、函数
            click_event.target = this.node;
            click_event.component = "aSeriesSkill";
            click_event.handler = "upSkill";
            click_event.customEventData = i.toString();
            button.clickEvents.push(click_event);
        }
    };
    /**
     * 更新技能树显示
     */
    AseriesSkill.prototype.updateSkillIcons = function () {
        for (var i = 0; i < this.skillIcons.length; i++) {
            this.skillIcons[i].setState(this.judgeSkillState(i + 1));
        }
    };
    /**
     * 升级技能等级
     * @param levelNum 该技能升级到几级。1开始
     */
    AseriesSkill.prototype.upSkill = function (e, levelNum) {
        levelNum = Number(levelNum);
        if (levelNum <= this.skillLevel[this.skillNum - 1]) //该技能已升级
            return;
        var needStarN = this.skillsUpNeedStar[this.skillNum - 1][levelNum - 1];
        var haveStarN = this.user.getCurrentHaveStarNum();
        if (needStarN > haveStarN) //星星不够
            return;
        //更新内部数据
        this.user.subHavedStar(needStarN);
        this.skillLevel[this.skillNum - 1] = levelNum;
        //更新技能树显示
        this.skillIcons[levelNum - 1].setState(SkillState.Upgraded);
        this.skillIcons[levelNum].setState(this.judgeSkillState(levelNum + 1));
        //更新显示的星星数
        this.selectLevelScene.updateScoreLabel();
        //更新技能板上显示的星星数
        this.skillsBoard.updateStarNum();
    };
    /**
     * Judges skill state
     * @param iconNum 一个技能的第几个等级,1开始
     * @returns skill state
     */
    AseriesSkill.prototype.judgeSkillState = function (iconNum) {
        if (iconNum <= this.skillLevel[this.skillNum - 1]) //已升级
            return SkillState.Upgraded;
        if (iconNum === this.skillLevel[this.skillNum - 1] + 1) { //能升级
            var need = this.skillsUpNeedStar[this.skillNum - 1][iconNum - 1];
            var have = this.user.getCurrentHaveStarNum();
            if (have >= need) //星星够
                return SkillState.Upgradable;
            else //星星不够
                return SkillState.StarShort;
        }
        return SkillState.UnUpgrade; //不能升级
    };
    __decorate([
        property({ tooltip: "这个是第几个技能，从1开始" })
    ], AseriesSkill.prototype, "skillNum", void 0);
    AseriesSkill = __decorate([
        ccclass
    ], AseriesSkill);
    return AseriesSkill;
}(cc.Component));
exports.default = AseriesSkill;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL2FTZXJpZXNTa2lsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQXFGO0FBSS9FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDOztHQUVHO0FBQ0gsSUFBWSxVQUF5RDtBQUFyRSxXQUFZLFVBQVU7SUFBRyx1REFBVSxDQUFBO0lBQUUscURBQVMsQ0FBQTtJQUFFLG1EQUFRLENBQUE7SUFBRSxxREFBUyxDQUFBO0FBQUMsQ0FBQyxFQUF6RCxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUErQztBQUFBLENBQUM7QUFFdEU7SUFXSTs7OztPQUlHO0lBQ0gsbUJBQVksSUFBYSxFQUFFLEtBQWlCLEVBQUUsYUFBcUI7UUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0QkFBUSxHQUFSLFVBQVMs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Q2EsWUFBWSxDQTJHaEM7SUFBRCxtQkFBQztDQTNHRCxBQTJHQyxDQTNHeUMsRUFBRSxDQUFDLFNBQVMsR0EyR3JEO2tCQTNHb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lRGF0YVN0b3JhZ2UsIHsgR2FtZUNvbmZpZywgVXNlciB9IGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiO1xuaW1wb3J0IFNlbGVjdExldmVsU2NlbmUgZnJvbSBcIi4vc2VsZWN0TGV2ZWxTY2VuZVwiO1xuaW1wb3J0IFNraWxsc0JvYXJkIGZyb20gXCIuL3NraWxsc0JvYXJkXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8qKlxuICog5oqA6IO95Zu+5qCH5pyJM+S4queKtuaAge+8muWPr+S7peWNh+e6p+W5tuS4lOaYn+aYn+Wkn+OAgeWPr+S7peWNh+e6p+S9huaYn+aYn+S4jeWkn+OAgeS4jeiDveWNh+e6p+eahOeBsOiJsuOAgeW3suWNh+e6p1xuICovXG5leHBvcnQgZW51bSBTa2lsbFN0YXRlIHsgVXBncmFkYWJsZSwgU3RhclNob3J0LCBVcGdyYWRlZCwgVW5VcGdyYWRlIH07XG5cbmV4cG9ydCBjbGFzcyBTa2lsbEljb24ge1xuICAgIHByaXZhdGUgc3RhdGU6IFNraWxsU3RhdGU7XG4gICAgcHJpdmF0ZSBub2RlOiBjYy5Ob2RlO1xuICAgIC8qKlxuICAgICAqIGJn6IqC54K55LiL55qEY2MuQnV0dG9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBidXR0b246IGNjLkJ1dHRvbjtcbiAgICBwcml2YXRlIHN0YXJOdW06IGNjLk5vZGU7XG4gICAgcHJpdmF0ZSBsYWJlbDogY2MuTGFiZWw7XG4gICAgcHJpdmF0ZSBsYWJlbE5vZGU6IGNjLk5vZGU7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHNraWxsIGljb24uXG4gICAgICogQHBhcmFtIG5vZGUg5Zu+5qCH6IqC54K5XG4gICAgICogQHBhcmFtIHN0YXRlIOivpeaKgOiDveeKtuaAgVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHN0YXRlOiBTa2lsbFN0YXRlLCB1cE5lZWRTdGFyTnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIHRoaXMuc3Rhck51bSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyTnVtXCIpO1xuICAgICAgICB0aGlzLmxhYmVsTm9kZSA9IHRoaXMuc3Rhck51bS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpO1xuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5sYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgICAgdGhpcy5zZXROZWVkU3Rhck51bSh1cE5lZWRTdGFyTnVtKTtcbiAgICB9XG5cbiAgICBzZXRTdGF0ZShzdGF0ZTogU2tpbGxTdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBTa2lsbFN0YXRlLlVwZ3JhZGFibGU6IHsgLy/lj6/ku6XljYfnuqdcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3Rhck51bS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNraWxsU3RhdGUuU3RhclNob3J0OiB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJOdW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsTm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2tpbGxTdGF0ZS5VblVwZ3JhZGU6IHsgLy/kuI3og73ljYfnuqdcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbi5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJOdW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTa2lsbFN0YXRlLlVwZ3JhZGVkOiB7IC8v5bey5Y2H57qnXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b24uaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJOdW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbE5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFN0YXRlKCk6IFNraWxsU3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBnZXRCdXR0b24oKTogY2MuQnV0dG9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnV0dG9uO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBzZXROZWVkU3Rhck51bShuOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBuLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc2VyaWVzU2tpbGwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLov5nkuKrmmK/nrKzlh6DkuKrmioDog73vvIzku44x5byA5aeLXCIgfSlcbiAgICBwcml2YXRlIHNraWxsTnVtOiBudW1iZXIgPSAxO1xuICAgIC8qKlxuICAgICAqIOavj+S4quaKgOiDveaciSA15LiqIOetiee6p++8jOWNs+aciTXkuKpOb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBza2lsbE5vZGU6IGNjLk5vZGVbXSA9IG51bGw7XG4gICAgcHJpdmF0ZSBza2lsbEljb25zOiBTa2lsbEljb25bXSA9IFtdO1xuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IG51bGw7XG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDlvZPliY3njqnlrrbmioDog73nmoTnrYnnuqdcbiAgICAgKi9cbiAgICBwcml2YXRlIHNraWxsTGV2ZWw6IG51bWJlcltdID0gbnVsbDtcbiAgICBwcml2YXRlIHNlbGVjdExldmVsU2NlbmU6IFNlbGVjdExldmVsU2NlbmUgPSBudWxsO1xuICAgIHByaXZhdGUgc2tpbGxzVXBOZWVkU3RhcjogbnVtYmVyW11bXTtcbiAgICBwcml2YXRlIHNraWxsc0JvYXJkOiBTa2lsbHNCb2FyZCA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpO1xuICAgICAgICB0aGlzLnVzZXIgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0Q3VycmVudFVzZXIoKTtcbiAgICAgICAgdGhpcy5za2lsbExldmVsID0gdGhpcy51c2VyLmdldFNraWxsc0xldmVsKCk7XG4gICAgICAgIHRoaXMuc2tpbGxOb2RlID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIHRoaXMuc2tpbGxzVXBOZWVkU3RhciA9IHRoaXMuZ2FtZUNvbmZpZy5nZXRTa2lsbHNVcE5lZWRTdGFyKCk7XG4gICAgICAgIHRoaXMuc2tpbGxzQm9hcmQgPSBjYy5maW5kKFwiQ2FudmFzL2NlbnRlckFuY2hvci9za2lsbHNCb2FyZFwiKS5nZXRDb21wb25lbnQoXCJza2lsbHNCb2FyZFwiKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgICAgICB0aGlzLmluaXRza2lsbEljb25zKCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRza2lsbEljb25zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykgeyAvL+aKgOiDveetiee6p1xuICAgICAgICAgICAgbGV0IHNraWxsSWNvbjogU2tpbGxJY29uID0gbmV3IFNraWxsSWNvbih0aGlzLnNraWxsTm9kZVtpXSwgdGhpcy5qdWRnZVNraWxsU3RhdGUoaSArIDEpLCB0aGlzLnNraWxsc1VwTmVlZFN0YXJbdGhpcy5za2lsbE51bSAtIDFdW2ldKTtcbiAgICAgICAgICAgIHRoaXMuc2tpbGxJY29ucy5wdXNoKHNraWxsSWNvbik7XG5cbiAgICAgICAgICAgIC8v57uR5a6a5oyJ6ZKu5LqL5Lu2XG4gICAgICAgICAgICBsZXQgYnV0dG9uOiBjYy5CdXR0b24gPSBza2lsbEljb24uZ2V0QnV0dG9uKCk7XG4gICAgICAgICAgICBsZXQgY2xpY2tfZXZlbnQgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuXG4gICAgICAgICAgICAvL+a3u+WKoOWTjeW6lOS6i+S7tueahOW/heimgeWPguaVsO+8jOWNs+WTjeW6lOWHveaVsOaJgOWcqOeahOiKgueCueOAgee7hOS7tuOAgeWHveaVsFxuICAgICAgICAgICAgY2xpY2tfZXZlbnQudGFyZ2V0ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgY2xpY2tfZXZlbnQuY29tcG9uZW50ID0gXCJhU2VyaWVzU2tpbGxcIjtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmhhbmRsZXIgPSBcInVwU2tpbGxcIjtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmN1c3RvbUV2ZW50RGF0YSA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrX2V2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOaKgOiDveagkeaYvuekulxuICAgICAqL1xuICAgIHVwZGF0ZVNraWxsSWNvbnMoKSB7XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnNraWxsSWNvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2tpbGxJY29uc1tpXS5zZXRTdGF0ZSh0aGlzLmp1ZGdlU2tpbGxTdGF0ZShpICsgMSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qn5oqA6IO9562J57qnXG4gICAgICogQHBhcmFtIGxldmVsTnVtIOivpeaKgOiDveWNh+e6p+WIsOWHoOe6p+OAgjHlvIDlp4tcbiAgICAgKi9cbiAgICB1cFNraWxsKGUsIGxldmVsTnVtKSB7XG4gICAgICAgIGxldmVsTnVtID0gTnVtYmVyKGxldmVsTnVtKTtcbiAgICAgICAgaWYgKGxldmVsTnVtIDw9IHRoaXMuc2tpbGxMZXZlbFt0aGlzLnNraWxsTnVtIC0gMV0pIC8v6K+l5oqA6IO95bey5Y2H57qnXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBuZWVkU3Rhck46IG51bWJlciA9IHRoaXMuc2tpbGxzVXBOZWVkU3Rhclt0aGlzLnNraWxsTnVtIC0gMV1bbGV2ZWxOdW0gLSAxXTtcbiAgICAgICAgbGV0IGhhdmVTdGFyTjogbnVtYmVyID0gdGhpcy51c2VyLmdldEN1cnJlbnRIYXZlU3Rhck51bSgpO1xuICAgICAgICBpZiAobmVlZFN0YXJOID4gaGF2ZVN0YXJOKSAvL+aYn+aYn+S4jeWkn1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8v5pu05paw5YaF6YOo5pWw5o2uXG4gICAgICAgIHRoaXMudXNlci5zdWJIYXZlZFN0YXIobmVlZFN0YXJOKTtcbiAgICAgICAgdGhpcy5za2lsbExldmVsW3RoaXMuc2tpbGxOdW0gLSAxXSA9IGxldmVsTnVtO1xuICAgICAgICAvL+abtOaWsOaKgOiDveagkeaYvuekulxuICAgICAgICB0aGlzLnNraWxsSWNvbnNbbGV2ZWxOdW0gLSAxXS5zZXRTdGF0ZShTa2lsbFN0YXRlLlVwZ3JhZGVkKTtcbiAgICAgICAgdGhpcy5za2lsbEljb25zW2xldmVsTnVtXS5zZXRTdGF0ZSh0aGlzLmp1ZGdlU2tpbGxTdGF0ZShsZXZlbE51bSArIDEpKTtcbiAgICAgICAgLy/mm7TmlrDmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgICAgdGhpcy5zZWxlY3RMZXZlbFNjZW5lLnVwZGF0ZVNjb3JlTGFiZWwoKTtcbiAgICAgICAgLy/mm7TmlrDmioDog73mnb/kuIrmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgICAgdGhpcy5za2lsbHNCb2FyZC51cGRhdGVTdGFyTnVtKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSnVkZ2VzIHNraWxsIHN0YXRlXG4gICAgICogQHBhcmFtIGljb25OdW0g5LiA5Liq5oqA6IO955qE56ys5Yeg5Liq562J57qnLDHlvIDlp4tcbiAgICAgKiBAcmV0dXJucyBza2lsbCBzdGF0ZSBcbiAgICAgKi9cbiAgICBwcml2YXRlIGp1ZGdlU2tpbGxTdGF0ZShpY29uTnVtOiBudW1iZXIpOiBTa2lsbFN0YXRlIHtcbiAgICAgICAgaWYgKGljb25OdW0gPD0gdGhpcy5za2lsbExldmVsW3RoaXMuc2tpbGxOdW0gLSAxXSkgLy/lt7LljYfnuqdcbiAgICAgICAgICAgIHJldHVybiBTa2lsbFN0YXRlLlVwZ3JhZGVkO1xuICAgICAgICBpZiAoaWNvbk51bSA9PT0gdGhpcy5za2lsbExldmVsW3RoaXMuc2tpbGxOdW0gLSAxXSArIDEpIHsgLy/og73ljYfnuqdcbiAgICAgICAgICAgIGxldCBuZWVkOiBudW1iZXIgPSB0aGlzLnNraWxsc1VwTmVlZFN0YXJbdGhpcy5za2lsbE51bSAtIDFdW2ljb25OdW0gLSAxXTtcbiAgICAgICAgICAgIGxldCBoYXZlOiBudW1iZXIgPSB0aGlzLnVzZXIuZ2V0Q3VycmVudEhhdmVTdGFyTnVtKCk7XG4gICAgICAgICAgICBpZiAoaGF2ZSA+PSBuZWVkKS8v5pif5pif5aSfXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNraWxsU3RhdGUuVXBncmFkYWJsZTtcbiAgICAgICAgICAgIGVsc2UgLy/mmJ/mmJ/kuI3lpJ9cbiAgICAgICAgICAgICAgICByZXR1cm4gU2tpbGxTdGF0ZS5TdGFyU2hvcnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gU2tpbGxTdGF0ZS5VblVwZ3JhZGU7IC8v5LiN6IO95Y2H57qnXG4gICAgfVxuXG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/monster/monster.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88ea4NumMZGd5gFC7814wew', 'monster');
// scripts/levelScene/monster/monster.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var creature_1 = require("../creature");
var combatLogic_1 = require("../combatLogic");
var soldier_1 = require("../tower/barrack/soldier");
var gameDataManager_1 = require("../../common/module/gameDataManager");
var utils_1 = require("../../common/module/utils");
var move_1 = require("../../common/move");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WalkState;
(function (WalkState) {
    WalkState[WalkState["Down"] = 0] = "Down";
    WalkState[WalkState["left"] = 1] = "left";
    WalkState[WalkState["up"] = 2] = "up";
    WalkState[WalkState["right"] = 3] = "right";
})(WalkState || (WalkState = {}));
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attackFrame = [];
        _this.deadFrame = [];
        _this.downWalkFrames = [];
        _this.rightWalkFrames = [];
        _this.upWalkFrames = [];
        /* 引用对象 */
        _this.monsterFactory = null;
        _this.levelScene = null;
        /* 属性 */
        _this.monsterNo = null;
        /**
         * [怪物编号]{HP,speedOfMove,intervalOfAttack,aggressivity,rangeOfAttack,rangeOfInvestigate,price}
         */
        _this.monsterData = null;
        /**
         * 移动路径 世界
         */
        _this.path = null;
        /**
         * 每段路需要的时间，[0]:path[0]->path[1]
         */
        _this.pathTime = [];
        /* 控制 */
        /**
         * 要移动的目的地的path指针
         */
        _this.pathIndex = 0;
        /**
         * 路径移动的递归开关
         * 控制递归与对外说明
         */
        _this.swiOfRecursionInPW = false;
        /**
         * 是否在路径上移动
         * 控制 是否需要回归路径点上S
         */
        _this.moveInPath = true;
        _this.stateOfFA = null;
        return _this;
    }
    Monster_1 = Monster;
    Monster.prototype.onLoad = function () {
        //对象/组件的赋值
        this.combatLogic = new combatLogic_1.default(this, soldier_1.default.soldiersOfAlive);
        this.monsterFactory = cc.find("Canvas/personMap").getComponent("monsterFactory");
        this.levelScene = cc.find("Canvas").getComponent("levelScene");
        this._move = new move_1.default(this.node);
        //怪物数据
        var gameConfig = gameDataManager_1.default.getGameConfig();
        this.monsterData = gameConfig.getMonsterData();
    };
    Monster.prototype.init = function (monsterNo, path) {
        //初始化属性
        this.monsterNo = monsterNo;
        var md = this.monsterData[monsterNo];
        this.maxHp = this.cHP = md.HP;
        this.speedOfMove = md.speedOfMove;
        this.intervalOfAttack = md.intervalOfAttack;
        this.aggressivity = md.aggressivity;
        this.rangeOfAttack = md.rangeOfAttack;
        this.rangeOfInvestigate = md.rangeOfInvestigate;
        this.intervalOfThink = md.intervalOfThink;
        //初始化数据
        this.path = path;
        this.initPathTime();
        //初始化视图
        this.frameAnim.setSpriteFrame(this.downWalkFrames[0]);
        this.refreshBloodBar();
        this.node.setPosition(this.node.parent.convertToNodeSpaceAR(this.path[0]));
        //初始化控制参数
        this.pathIndex = 1;
        this.swiOfRecursionInPW = false;
        this.moveInPath = true;
        this.stateOfFA = null;
        this.initCreature();
    };
    /**
     * 从现在开始，经time后的坐标
     * @param t
     * @returns pos 世界
     */
    Monster.prototype.getPosInTime = function (t) {
        var cI = this.pathIndex; //当前目的点的path指针
        var cP = this.getWPos();
        var ct = this.path[cI].sub(cP).mag() / this.speedOfMove;
        t -= ct;
        while (true) {
            ct = this.pathTime[cI + 1];
            t -= ct;
            if (t < 0)
                break;
            cI++;
        }
        //多出的一点时间不足以抵达下一个点，就不要了
        return this.path[cI];
    };
    /**
     * 初始化pathTime
     */
    Monster.prototype.initPathTime = function () {
        for (var i = 0; i < this.path.length - 1; i++) {
            var l = this.path[i + 1].sub(this.path[i]).mag();
            this.pathTime[i] = l / this.speedOfMove;
        }
    };
    /**
     * 不会自动停止播放行走动画
     * @param des 世界
     */
    Monster.prototype.walk = function (des, func, t) {
        if (func === void 0) { func = null; }
        if (t === void 0) { t = null; }
        var dis = des.sub(this.getWPos());
        this.playWalk(dis);
        this.move(des, func, t);
    };
    Monster.prototype.stopWalk = function () {
        this.frameAnim.stop();
        this.stateOfFA = null;
        this._move.stopMove();
    };
    /**
     * 播放行走动画,自动判断是否需要重置动画
     * @param l 行走方向
     */
    Monster.prototype.playWalk = function (l) {
        var state = this.getWalkState(l);
        if (state === this.stateOfFA)
            return;
        this.stateOfFA = state;
        switch (state) {
            case WalkState.Down: {
                this.frameAnim.setFrameArray(this.downWalkFrames);
                break;
            }
            case WalkState.up: {
                this.frameAnim.setFrameArray(this.upWalkFrames);
                break;
            }
            case WalkState.left: {
                this.frameAnim.setFrameArray(this.rightWalkFrames);
                this.node.scaleX = -1;
                break;
            }
            case WalkState.right: {
                this.frameAnim.setFrameArray(this.rightWalkFrames);
                this.node.scaleX = 1;
            }
        }
        this.frameAnim.play(true);
    };
    /**
     * 得到 人物应该使用哪种行走
     * @param l 移动方向
     * @returns walk state
     */
    Monster.prototype.getWalkState = function (l) {
        var degree = this.getDegree(l);
        if (degree >= 30 && degree <= 150) {
            return WalkState.up;
        }
        else if (degree >= 210 && degree <= 330) {
            return WalkState.Down;
        }
        else if (l.x > 0)
            return WalkState.right;
        else
            return WalkState.left;
    };
    /**
     * Gets degree
     * @param dir 方向向量
     * @returns degree [0,360)
     */
    Monster.prototype.getDegree = function (dir) {
        var rot;
        if (dir.x === 0 && dir.y > 0) //y上半轴
            rot = 90;
        else if (dir.x === 0 && dir.y < 0) //y下半轴
            rot = 270;
        else {
            var r = Math.atan(dir.y / dir.x);
            var d = r * 180 / Math.PI;
            rot = d;
        }
        if (rot === 0) //在x轴上
            if (dir.x > 0)
                rot = 0;
            else
                rot = 180;
        else if (dir.x < 0 && dir.y > 0 || dir.x < 0 && dir.y < 0) //在第二三象限
            rot += 180;
        else if (dir.x > 0 && dir.y < 0) //在第四象限
            rot += 360;
        return rot;
    };
    Monster.prototype.refreshState = function () {
        this.refreshBloodBar();
        //死亡    
        if (this.cHP === 0) {
            this.die(Monster_1.monstersOfAlive, this);
            this.playDie(this.deadFrame, this.releaseSelf.bind(this));
            this.levelScene.addCash(this.monsterData[this.monsterNo].price);
        }
    };
    Monster.prototype.releaseSelf = function () {
        this.monsterFactory.destroyMonster(this);
    };
    /**
     * 使用前需 this.swiOfRecursionInPW = true
     * @returns
     */
    Monster.prototype.walkInPath = function () {
        if (!this.swiOfRecursionInPW)
            return;
        if (!this.moveInPath) { //回归路径点
            this.pathIndex = this.getPosOfMinDisWithPath();
            this.walk(this.path[this.pathIndex], this.walkCallBack.bind(this));
            this.moveInPath = true;
        }
        else //从路径点移动到路径点
            this.walk(this.path[this.pathIndex], this.walkCallBack.bind(this), this.pathTime[this.pathIndex - 1]);
    };
    Monster.prototype.walkCallBack = function () {
        if (this.pathIndex === this.path.length - 1) {
            console.log("怪物跳脱");
            this.levelScene.subHP();
            this.stopWalkInPath();
            this.die(Monster_1.monstersOfAlive, this);
            this.releaseSelf();
        }
        this.pathIndex++;
        this.walkInPath();
    };
    /**
     * 得到离路径上最近的路径点指针
     */
    Monster.prototype.getPosOfMinDisWithPath = function () {
        var cwp = this.getWPos();
        var l = utils_1.default.getDisOfTwoPos(cwp, this.path[this.pathIndex]);
        var j = this.pathIndex;
        for (var i = this.pathIndex + 1; i < this.path.length; i++) {
            var tl = utils_1.default.getDisOfTwoPos(cwp, this.path[i]);
            if (tl < l) {
                l = tl;
                j = i;
            }
            else
                break;
        }
        return j;
    };
    /**
     * 关闭walkInPath()的递归移动，停止行走
     */
    Monster.prototype.stopWalkInPath = function () {
        this.swiOfRecursionInPW = false;
        this.moveInPath = false;
        this.stopWalk();
    };
    Monster.prototype.track = function (pos) {
        this.isTracking = true;
        this.walk(pos, function () {
            this.isTracking = true;
            this.stopWalk();
        }.bind(this));
    };
    Monster.prototype.stopTrack = function () {
        this.isTracking = false;
        this.stopWalk();
    };
    Monster.prototype.refreshTrackTarget = function (pos) {
        this.walk(pos, function () {
            this.isTracking = true;
            this.stopWalk();
        }.bind(this));
    };
    Monster.prototype.attack = function (m) {
        this.isAttacking = true;
        this.frameAnim.setFrameArray(this.attackFrame);
        this.frameAnim.play(false, false, false, function () {
            m.injure(this.aggressivity);
            this.isAttacking = false;
        }.bind(this));
    };
    Monster.prototype.nonComLogic = function () {
        this.isNonComState = true;
        //已经在执行路径上行走了
        if (this.swiOfRecursionInPW)
            return;
        this.swiOfRecursionInPW = true;
        this.walkInPath();
    };
    Monster.prototype.stopNonComLogic = function () {
        this.stopWalkInPath();
        this.isNonComState = false;
    };
    var Monster_1;
    /* 数据 */
    Monster.monstersOfAlive = null;
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "怪物攻击帧动画图片"
        })
    ], Monster.prototype, "attackFrame", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "怪物死亡帧动画图片"
        })
    ], Monster.prototype, "deadFrame", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Monster.prototype, "downWalkFrames", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Monster.prototype, "rightWalkFrames", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Monster.prototype, "upWalkFrames", void 0);
    Monster = Monster_1 = __decorate([
        ccclass
    ], Monster);
    return Monster;
}(creature_1.default));
exports.default = Monster;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvbW9uc3Rlci9tb25zdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsb0RBQStDO0FBQy9DLHVFQUFrRjtBQUNsRixtREFBOEM7QUFHOUMsMENBQXFDO0FBQy9CLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssU0FBbUM7QUFBeEMsV0FBSyxTQUFTO0lBQUcseUNBQUksQ0FBQTtJQUFFLHlDQUFJLENBQUE7SUFBRSxxQ0FBRSxDQUFBO0lBQUUsMkNBQUssQ0FBQTtBQUFDLENBQUMsRUFBbkMsU0FBUyxLQUFULFNBQVMsUUFBMEI7QUFHeEM7SUFBcUMsMkJBQVE7SUFBN0M7UUFBQSxxRUErVkM7UUF6VlcsaUJBQVcsR0FBcUIsRUFBRSxDQUFDO1FBS25DLGVBQVMsR0FBcUIsRUFBRSxDQUFDO1FBS2pDLG9CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUt0QyxxQkFBZSxHQUFxQixFQUFFLENBQUM7UUFLdkMsa0JBQVksR0FBcUIsRUFBRSxDQUFDO1FBRzVDLFVBQVU7UUFDRixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFDdEMsZ0JBQVUsR0FBZSxJQUFJLENBQUM7UUFFdEMsUUFBUTtRQUNSLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFJekI7O1dBRUc7UUFDSyxpQkFBVyxHQUFVLElBQUksQ0FBQztRQUNsQzs7V0FFRztRQUNLLFVBQUksR0FBYyxJQUFJLENBQUM7UUFDL0I7O1dBRUc7UUFDSyxjQUFRLEdBQWEsRUFBRSxDQUFDO1FBRWhDLFFBQVE7UUFDUjs7V0FFRztRQUNLLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDOUI7OztXQUdHO1FBQ0gsd0JBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDOzs7V0FHRztR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LElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQztnREFDeUM7SUFLM0M7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxXQUFXO1NBQ3ZCLENBQUM7OENBQ3VDO0lBS3pDO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN6QixDQUFDO21EQUM0QztJQUs5QztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQztvREFDNkM7SUFLL0M7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3pCLENBQUM7aURBQzBDO0lBMUIzQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBK1YzQjtJQUFELGNBQUM7Q0EvVkQsQUErVkMsQ0EvVm9DLGtCQUFRLEdBK1Y1QztrQkEvVm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ3JlYXR1cmUgZnJvbSBcIi4uL2NyZWF0dXJlXCI7XG5pbXBvcnQgQ29tYmF0TG9naWMgZnJvbSBcIi4uL2NvbWJhdExvZ2ljXCI7XG5pbXBvcnQgU29sZGllciBmcm9tIFwiLi4vdG93ZXIvYmFycmFjay9zb2xkaWVyXCI7XG5pbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vY29tbW9uL21vZHVsZS91dGlsc1wiO1xuaW1wb3J0IE1vbnN0ZXJGYWN0b3J5IGZyb20gXCIuL21vbnN0ZXJGYWN0b3J5XCI7XG5pbXBvcnQgTGV2ZWxTY2VuZSBmcm9tIFwiLi4vbGV2ZWxTY2VuZVwiO1xuaW1wb3J0IE1vdmUgZnJvbSBcIi4uLy4uL2NvbW1vbi9tb3ZlXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5lbnVtIFdhbGtTdGF0ZSB7IERvd24sIGxlZnQsIHVwLCByaWdodCB9XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgQ3JlYXR1cmUge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLmgKrnianmlLvlh7vluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhdHRhY2tGcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi5oCq54mp5q275Lqh5bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgZGVhZEZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBwcml2YXRlIGRvd25XYWxrRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBwcml2YXRlIHJpZ2h0V2Fsa0ZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgIH0pXG4gICAgcHJpdmF0ZSB1cFdhbGtGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuXG4gICAgLyog5byV55So5a+56LGhICovXG4gICAgcHJpdmF0ZSBtb25zdGVyRmFjdG9yeTogTW9uc3RlckZhY3RvcnkgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZWxTY2VuZTogTGV2ZWxTY2VuZSA9IG51bGw7XG5cbiAgICAvKiDlsZ7mgKcgKi9cbiAgICBtb25zdGVyTm86IG51bWJlciA9IG51bGw7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICBwdWJsaWMgc3RhdGljIG1vbnN0ZXJzT2ZBbGl2ZTogTW9uc3RlcltdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBb5oCq54mp57yW5Y+3XXtIUCxzcGVlZE9mTW92ZSxpbnRlcnZhbE9mQXR0YWNrLGFnZ3Jlc3Npdml0eSxyYW5nZU9mQXR0YWNrLHJhbmdlT2ZJbnZlc3RpZ2F0ZSxwcmljZX1cbiAgICAgKi9cbiAgICBwcml2YXRlIG1vbnN0ZXJEYXRhOiBhbnlbXSA9IG51bGw7XG4gICAgLyoqXG4gICAgICog56e75Yqo6Lev5b6EIOS4lueVjFxuICAgICAqL1xuICAgIHByaXZhdGUgcGF0aDogY2MuVmVjMltdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDmr4/mrrXot6/pnIDopoHnmoTml7bpl7TvvIxbMF06cGF0aFswXS0+cGF0aFsxXVxuICAgICAqL1xuICAgIHByaXZhdGUgcGF0aFRpbWU6IG51bWJlcltdID0gW107XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICAvKipcbiAgICAgKiDopoHnp7vliqjnmoTnm67nmoTlnLDnmoRwYXRo5oyH6ZKIXG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXRoSW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICog6Lev5b6E56e75Yqo55qE6YCS5b2S5byA5YWzXG4gICAgICog5o6n5Yi26YCS5b2S5LiO5a+55aSW6K+05piOXG4gICAgICovXG4gICAgc3dpT2ZSZWN1cnNpb25JblBXOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5piv5ZCm5Zyo6Lev5b6E5LiK56e75YqoXG4gICAgICog5o6n5Yi2IOaYr+WQpumcgOimgeWbnuW9kui3r+W+hOeCueS4ilNcbiAgICAgKi9cbiAgICBwcml2YXRlIG1vdmVJblBhdGg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgc3RhdGVPZkZBOiBXYWxrU3RhdGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvL+WvueixoS/nu4Tku7bnmoTotYvlgLxcbiAgICAgICAgdGhpcy5jb21iYXRMb2dpYyA9IG5ldyBDb21iYXRMb2dpYyh0aGlzLCBTb2xkaWVyLnNvbGRpZXJzT2ZBbGl2ZSk7XG4gICAgICAgIHRoaXMubW9uc3RlckZhY3RvcnkgPSBjYy5maW5kKFwiQ2FudmFzL3BlcnNvbk1hcFwiKS5nZXRDb21wb25lbnQoXCJtb25zdGVyRmFjdG9yeVwiKTtcbiAgICAgICAgdGhpcy5sZXZlbFNjZW5lID0gY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJsZXZlbFNjZW5lXCIpO1xuICAgICAgICB0aGlzLl9tb3ZlID0gbmV3IE1vdmUodGhpcy5ub2RlKTtcblxuICAgICAgICAvL+aAqueJqeaVsOaNrlxuICAgICAgICBsZXQgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IEdhbWVEYXRhU3RvcmFnZS5nZXRHYW1lQ29uZmlnKCk7XG4gICAgICAgIHRoaXMubW9uc3RlckRhdGEgPSBnYW1lQ29uZmlnLmdldE1vbnN0ZXJEYXRhKCk7XG4gICAgfVxuXG4gICAgaW5pdChtb25zdGVyTm86IG51bWJlciwgcGF0aDogY2MuVmVjMltdKSB7XG4gICAgICAgIC8v5Yid5aeL5YyW5bGe5oCnXG4gICAgICAgIHRoaXMubW9uc3Rlck5vID0gbW9uc3Rlck5vO1xuICAgICAgICBsZXQgbWQ6IGFueSA9IHRoaXMubW9uc3RlckRhdGFbbW9uc3Rlck5vXTtcbiAgICAgICAgdGhpcy5tYXhIcCA9IHRoaXMuY0hQID0gbWQuSFA7XG4gICAgICAgIHRoaXMuc3BlZWRPZk1vdmUgPSBtZC5zcGVlZE9mTW92ZTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbE9mQXR0YWNrID0gbWQuaW50ZXJ2YWxPZkF0dGFjaztcbiAgICAgICAgdGhpcy5hZ2dyZXNzaXZpdHkgPSBtZC5hZ2dyZXNzaXZpdHk7XG4gICAgICAgIHRoaXMucmFuZ2VPZkF0dGFjayA9IG1kLnJhbmdlT2ZBdHRhY2s7XG4gICAgICAgIHRoaXMucmFuZ2VPZkludmVzdGlnYXRlID0gbWQucmFuZ2VPZkludmVzdGlnYXRlO1xuICAgICAgICB0aGlzLmludGVydmFsT2ZUaGluayA9IG1kLmludGVydmFsT2ZUaGluaztcblxuICAgICAgICAvL+WIneWni+WMluaVsOaNrlxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLmluaXRQYXRoVGltZSgpO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW6KeG5Zu+XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnNldFNwcml0ZUZyYW1lKHRoaXMuZG93bldhbGtGcmFtZXNbMF0pO1xuICAgICAgICB0aGlzLnJlZnJlc2hCbG9vZEJhcigpO1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLnBhdGhbMF0pKTtcblxuICAgICAgICAvL+WIneWni+WMluaOp+WItuWPguaVsFxuICAgICAgICB0aGlzLnBhdGhJbmRleCA9IDE7XG4gICAgICAgIHRoaXMuc3dpT2ZSZWN1cnNpb25JblBXID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92ZUluUGF0aCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhdGVPZkZBID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0Q3JlYXR1cmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDku47njrDlnKjlvIDlp4vvvIznu490aW1l5ZCO55qE5Z2Q5qCHXG4gICAgICogQHBhcmFtIHQgXG4gICAgICogQHJldHVybnMgcG9zIOS4lueVjFxuICAgICAqL1xuICAgIGdldFBvc0luVGltZSh0OiBudW1iZXIpOiBjYy5WZWMyIHtcbiAgICAgICAgbGV0IGNJOiBudW1iZXIgPSB0aGlzLnBhdGhJbmRleDsgLy/lvZPliY3nm67nmoTngrnnmoRwYXRo5oyH6ZKIXG4gICAgICAgIGxldCBjUDogY2MuVmVjMiA9IHRoaXMuZ2V0V1BvcygpO1xuICAgICAgICBsZXQgY3Q6IG51bWJlciA9IHRoaXMucGF0aFtjSV0uc3ViKGNQKS5tYWcoKSAvIHRoaXMuc3BlZWRPZk1vdmU7XG4gICAgICAgIHQgLT0gY3Q7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGN0ID0gdGhpcy5wYXRoVGltZVtjSSArIDFdO1xuICAgICAgICAgICAgdCAtPSBjdDtcbiAgICAgICAgICAgIGlmICh0IDwgMClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNJKys7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WkmuWHuueahOS4gOeCueaXtumXtOS4jei2s+S7peaKtei+vuS4i+S4gOS4queCue+8jOWwseS4jeimgeS6hlxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoW2NJXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyWcGF0aFRpbWVcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRQYXRoVGltZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbDogbnVtYmVyID0gdGhpcy5wYXRoW2kgKyAxXS5zdWIodGhpcy5wYXRoW2ldKS5tYWcoKTtcbiAgICAgICAgICAgIHRoaXMucGF0aFRpbWVbaV0gPSBsIC8gdGhpcy5zcGVlZE9mTW92ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4jeS8muiHquWKqOWBnOatouaSreaUvuihjOi1sOWKqOeUu1xuICAgICAqIEBwYXJhbSBkZXMg5LiW55WMXG4gICAgICovXG4gICAgd2FsayhkZXM6IGNjLlZlYzIsIGZ1bmM6IEZ1bmN0aW9uID0gbnVsbCwgdDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBsZXQgZGlzOiBjYy5WZWMyID0gZGVzLnN1Yih0aGlzLmdldFdQb3MoKSk7XG4gICAgICAgIHRoaXMucGxheVdhbGsoZGlzKTtcblxuICAgICAgICB0aGlzLm1vdmUoZGVzLCBmdW5jLCB0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RvcFdhbGsoKSB7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnN0b3AoKTtcbiAgICAgICAgdGhpcy5zdGF0ZU9mRkEgPSBudWxsO1xuICAgICAgICB0aGlzLl9tb3ZlLnN0b3BNb3ZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6KGM6LWw5Yqo55S7LOiHquWKqOWIpOaWreaYr+WQpumcgOimgemHjee9ruWKqOeUu1xuICAgICAqIEBwYXJhbSBsIOihjOi1sOaWueWQkVxuICAgICAqL1xuICAgIHByaXZhdGUgcGxheVdhbGsobDogY2MuVmVjMikge1xuICAgICAgICBsZXQgc3RhdGU6IFdhbGtTdGF0ZSA9IHRoaXMuZ2V0V2Fsa1N0YXRlKGwpO1xuICAgICAgICBpZiAoc3RhdGUgPT09IHRoaXMuc3RhdGVPZkZBKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuc3RhdGVPZkZBID0gc3RhdGU7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgV2Fsa1N0YXRlLkRvd246IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMuZG93bldhbGtGcmFtZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBXYWxrU3RhdGUudXA6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMudXBXYWxrRnJhbWVzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgV2Fsa1N0YXRlLmxlZnQ6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMucmlnaHRXYWxrRnJhbWVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFdhbGtTdGF0ZS5yaWdodDoge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVBbmltLnNldEZyYW1lQXJyYXkodGhpcy5yaWdodFdhbGtGcmFtZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnBsYXkodHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW+l+WIsCDkurrnianlupTor6Xkvb/nlKjlk6rnp43ooYzotbBcbiAgICAgKiBAcGFyYW0gbCDnp7vliqjmlrnlkJFcbiAgICAgKiBAcmV0dXJucyB3YWxrIHN0YXRlIFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0V2Fsa1N0YXRlKGw6IGNjLlZlYzIpOiBXYWxrU3RhdGUge1xuICAgICAgICBsZXQgZGVncmVlOiBudW1iZXIgPSB0aGlzLmdldERlZ3JlZShsKTtcbiAgICAgICAgaWYgKGRlZ3JlZSA+PSAzMCAmJiBkZWdyZWUgPD0gMTUwKSB7XG4gICAgICAgICAgICByZXR1cm4gV2Fsa1N0YXRlLnVwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlZ3JlZSA+PSAyMTAgJiYgZGVncmVlIDw9IDMzMCkge1xuICAgICAgICAgICAgcmV0dXJuIFdhbGtTdGF0ZS5Eb3duO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGwueCA+IDApXG4gICAgICAgICAgICByZXR1cm4gV2Fsa1N0YXRlLnJpZ2h0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gV2Fsa1N0YXRlLmxlZnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgZGVncmVlXG4gICAgICogQHBhcmFtIGRpciDmlrnlkJHlkJHph49cbiAgICAgKiBAcmV0dXJucyBkZWdyZWUgWzAsMzYwKVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGVncmVlKGRpcjogY2MuVmVjMik6IG51bWJlciB7XG4gICAgICAgIGxldCByb3Q6IG51bWJlcjtcbiAgICAgICAgaWYgKGRpci54ID09PSAwICYmIGRpci55ID4gMCkgLy955LiK5Y2K6L20XG4gICAgICAgICAgICByb3QgPSA5MDtcbiAgICAgICAgZWxzZSBpZiAoZGlyLnggPT09IDAgJiYgZGlyLnkgPCAwKSAvL3nkuIvljYrovbRcbiAgICAgICAgICAgIHJvdCA9IDI3MDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcjogbnVtYmVyID0gTWF0aC5hdGFuKGRpci55IC8gZGlyLngpO1xuICAgICAgICAgICAgbGV0IGQ6IG51bWJlciA9IHIgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAgICAgcm90ID0gZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3QgPT09IDApIC8v5ZyoeOi9tOS4ilxuICAgICAgICAgICAgaWYgKGRpci54ID4gMClcbiAgICAgICAgICAgICAgICByb3QgPSAwO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJvdCA9IDE4MDtcbiAgICAgICAgZWxzZSBpZiAoZGlyLnggPCAwICYmIGRpci55ID4gMCB8fCBkaXIueCA8IDAgJiYgZGlyLnkgPCAwKSAvL+WcqOesrOS6jOS4ieixoemZkFxuICAgICAgICAgICAgcm90ICs9IDE4MDtcbiAgICAgICAgZWxzZSBpZiAoZGlyLnggPiAwICYmIGRpci55IDwgMCkgLy/lnKjnrKzlm5vosaHpmZBcbiAgICAgICAgICAgIHJvdCArPSAzNjA7XG4gICAgICAgIHJldHVybiByb3Q7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmxvb2RCYXIoKTtcblxuICAgICAgICAvL+atu+S6oSAgICBcbiAgICAgICAgaWYgKHRoaXMuY0hQID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpZShNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBsYXlEaWUodGhpcy5kZWFkRnJhbWUsIHRoaXMucmVsZWFzZVNlbGYuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmxldmVsU2NlbmUuYWRkQ2FzaCh0aGlzLm1vbnN0ZXJEYXRhW3RoaXMubW9uc3Rlck5vXS5wcmljZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWxlYXNlU2VsZigpIHtcbiAgICAgICAgdGhpcy5tb25zdGVyRmFjdG9yeS5kZXN0cm95TW9uc3Rlcih0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkvb/nlKjliY3pnIAgdGhpcy5zd2lPZlJlY3Vyc2lvbkluUFcgPSB0cnVlXG4gICAgICogQHJldHVybnMgIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCB3YWxrSW5QYXRoKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3dpT2ZSZWN1cnNpb25JblBXKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmICghdGhpcy5tb3ZlSW5QYXRoKSB7IC8v5Zue5b2S6Lev5b6E54K5XG4gICAgICAgICAgICB0aGlzLnBhdGhJbmRleCA9IHRoaXMuZ2V0UG9zT2ZNaW5EaXNXaXRoUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy53YWxrKHRoaXMucGF0aFt0aGlzLnBhdGhJbmRleF0sIHRoaXMud2Fsa0NhbGxCYWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlSW5QYXRoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIC8v5LuO6Lev5b6E54K556e75Yqo5Yiw6Lev5b6E54K5XG4gICAgICAgICAgICB0aGlzLndhbGsodGhpcy5wYXRoW3RoaXMucGF0aEluZGV4XSwgdGhpcy53YWxrQ2FsbEJhY2suYmluZCh0aGlzKSwgdGhpcy5wYXRoVGltZVt0aGlzLnBhdGhJbmRleCAtIDFdKVxuXG4gICAgfVxuICAgIHByaXZhdGUgd2Fsa0NhbGxCYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5wYXRoSW5kZXggPT09IHRoaXMucGF0aC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaAqueJqei3s+iEsVwiKTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxTY2VuZS5zdWJIUCgpO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2Fsa0luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5kaWUoTW9uc3Rlci5tb25zdGVyc09mQWxpdmUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2VsZigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0aEluZGV4Kys7XG4gICAgICAgIHRoaXMud2Fsa0luUGF0aCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlvpfliLDnprvot6/lvoTkuIrmnIDov5HnmoTot6/lvoTngrnmjIfpkohcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFBvc09mTWluRGlzV2l0aFBhdGgoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGN3cDogY2MuVmVjMiA9IHRoaXMuZ2V0V1BvcygpO1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gVXRpbHMuZ2V0RGlzT2ZUd29Qb3MoY3dwLCB0aGlzLnBhdGhbdGhpcy5wYXRoSW5kZXhdKTtcbiAgICAgICAgbGV0IGo6IG51bWJlciA9IHRoaXMucGF0aEluZGV4O1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5wYXRoSW5kZXggKyAxOyBpIDwgdGhpcy5wYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGw6IG51bWJlciA9IFV0aWxzLmdldERpc09mVHdvUG9zKGN3cCwgdGhpcy5wYXRoW2ldKTtcbiAgICAgICAgICAgIGlmICh0bCA8IGwpIHtcbiAgICAgICAgICAgICAgICBsID0gdGw7XG4gICAgICAgICAgICAgICAgaiA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGo7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zetd2Fsa0luUGF0aCgp55qE6YCS5b2S56e75Yqo77yM5YGc5q2i6KGM6LWwXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wV2Fsa0luUGF0aCgpIHtcbiAgICAgICAgdGhpcy5zd2lPZlJlY3Vyc2lvbkluUFcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZlSW5QYXRoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RvcFdhbGsoKTtcbiAgICB9XG5cblxuICAgIHRyYWNrKHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLndhbGsocG9zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuICAgIHN0b3BUcmFjaygpIHtcbiAgICAgICAgdGhpcy5pc1RyYWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RvcFdhbGsoKTtcbiAgICB9XG4gICAgcmVmcmVzaFRyYWNrVGFyZ2V0KHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLndhbGsocG9zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgYXR0YWNrKG06IENyZWF0dXJlKSB7XG4gICAgICAgIHRoaXMuaXNBdHRhY2tpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnNldEZyYW1lQXJyYXkodGhpcy5hdHRhY2tGcmFtZSk7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnBsYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbS5pbmp1cmUodGhpcy5hZ2dyZXNzaXZpdHkpO1xuICAgICAgICAgICAgdGhpcy5pc0F0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgfVxuXG4gICAgbm9uQ29tTG9naWMoKSB7XG4gICAgICAgIHRoaXMuaXNOb25Db21TdGF0ZSA9IHRydWU7XG4gICAgICAgIC8v5bey57uP5Zyo5omn6KGM6Lev5b6E5LiK6KGM6LWw5LqGXG4gICAgICAgIGlmICh0aGlzLnN3aU9mUmVjdXJzaW9uSW5QVylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zd2lPZlJlY3Vyc2lvbkluUFcgPSB0cnVlO1xuICAgICAgICB0aGlzLndhbGtJblBhdGgoKTtcbiAgICB9XG4gICAgc3RvcE5vbkNvbUxvZ2ljKCkge1xuICAgICAgICB0aGlzLnN0b3BXYWxrSW5QYXRoKCk7XG4gICAgICAgIHRoaXMuaXNOb25Db21TdGF0ZSA9IGZhbHNlO1xuICAgIH1cblxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/artillery/artilleryTower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fc15buo1VJP94ELmP767FOP', 'artilleryTower');
// scripts/levelScene/tower/artillery/artilleryTower.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var monster_1 = require("../../monster/monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArtilleryFrames = /** @class */ (function () {
    function ArtilleryFrames() {
        this.frames = [];
        this.bullet = [];
    }
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], ArtilleryFrames.prototype, "frames", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "炮弹的图片"
        })
    ], ArtilleryFrames.prototype, "bullet", void 0);
    ArtilleryFrames = __decorate([
        ccclass("ArtilleryFrames")
    ], ArtilleryFrames);
    return ArtilleryFrames;
}());
var Artillery = /** @class */ (function (_super) {
    __extends(Artillery, _super);
    function Artillery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.towers = [];
        _this.addBulletNodes = [];
        _this.bulletPrefab = [];
        _this.frameAnimation = null;
        _this.bg = null;
        /* 数据 */
        _this.addBulletData = [
            {
                startPos: cc.v2(-20, 10),
                ctrlPos: cc.v2(-11, 55),
                endPos: cc.v2(3, 20),
                shootDelay: 0.9,
                addBulletDelay: 1.4
            },
            {
                startPos: cc.v2(-22, 16),
                ctrlPos: cc.v2(-12, 55),
                endPos: cc.v2(3, 25),
                shootDelay: 1.1,
                addBulletDelay: 1.8
            },
            {
                startPos: cc.v2(-22, 16),
                ctrlPos: cc.v2(-13, 55),
                endPos: cc.v2(4, 25),
                shootDelay: 0.9,
                addBulletDelay: 1.4
            },
        ];
        /**
         * 塔的世界坐标
         */
        _this.wPos = null;
        _this.poolsOfBullet = [];
        /* 塔的属性 */
        _this.level = 1;
        _this.maxLevel = 3;
        /* 控制 */
        _this.shootable = false;
        return _this;
    }
    Artillery.prototype.onLoad = function () {
        this.bg = this.node.getChildByName("bg");
        this.frameAnimation = this.bg.getComponent("frameAnimation");
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = this.gameConfig.getDataOfArtillery();
        this.monsterArray = monster_1.default.monstersOfAlive;
        this.createPoolsOfBullet();
    };
    Artillery.prototype.start = function () {
        this.init();
    };
    /**
     * 初始化攻击力、动画、
     * @returns
     */
    Artillery.prototype.init = function () {
        var _this = this;
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfBullet = this.dataOfTower[this.level - 1].speedOfBullet;
        this.bombRange = this.dataOfTower[this.level - 1].bombRange;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.intervalOfShoot = this.dataOfTower[this.level - 1].intervalOfShoot;
        this.price = this.dataOfTower[this.level - 1].price;
        this.frameAnimation.setFrameArray(this.towers[this.level - 1].frames);
        this.frameAnimation.setSpriteFrame(this.towers[this.level - 1].frames[0]);
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.addBulletNodes[0].getComponent(cc.Sprite).spriteFrame = this.towers[this.level - 1].bullet[0];
        this.addBulletAnim();
        this.scheduleOnce((function () { _this.shootable = true; }).bind(this), this.intervalOfShoot);
    };
    /* 炮弹对象池 */
    Artillery.prototype.createPoolsOfBullet = function () {
        for (var i = 0; i < this.bulletPrefab.length; i++) {
            this.poolsOfBullet.push(new cc.NodePool());
            var p = this.bulletPrefab[i];
            this.poolsOfBullet[i].put(cc.instantiate(p));
        }
    };
    Artillery.prototype.getBullet = function (level) {
        var r = null;
        if (this.poolsOfBullet[level - 1].size() > 0)
            r = this.poolsOfBullet[level].get();
        else
            r = cc.instantiate(this.bulletPrefab[level - 1]);
        r.opacity = 255;
        return r;
    };
    Artillery.prototype.releaseBullt = function (level, n) {
        this.poolsOfBullet[level - 1].put(n);
    };
    Artillery.prototype.clearPoolsOfBullet = function () {
        for (var i = 0; i < this.poolsOfBullet.length; i++)
            this.poolsOfBullet[i].clear();
    };
    /**
     * 射击
     * @param des 世界坐标
     * @param time 子弹到des的时间
     */
    Artillery.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (!this.shootable)
            return;
        this.shootable = false;
        if (time === null) {
            var l = this.wPos.sub(des).mag();
            var time_1 = l / this.speedOfBullet;
        }
        this.frameAnimation.play(false, false, false, function () {
            var _this = this;
            this.shootBullet(des, time);
            this.addBulletAnim();
            this.scheduleOnce((function () {
                _this.shootable = true;
            }).bind(this), this.intervalOfShoot);
        }.bind(this));
    };
    /**
     * 射出子弹
     */
    Artillery.prototype.shootBullet = function (des, time) {
        var a = this.createBullet();
        var wPos = this.bg.convertToWorldSpaceAR(this.addBulletData[this.level - 1].endPos);
        a.moveTo(wPos, des, time);
    };
    Artillery.prototype.createBullet = function () {
        var artillery = cc.instantiate(this.bulletPrefab[this.level - 1]).getComponent("artilleryBullet");
        this.node.addChild(artillery.node);
        artillery.init(this.level, this.attack, this.bombRange);
        var bg = this.node.getChildByName("bg");
        return artillery;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns 怪物预测位置,世界; 子弹达到预测位置的时间
     */
    Artillery.prototype.forecastMovePos = function (monster, cP) {
        //从填弹到子弹飞行到cP的时间
        var bulletStartPos = this.bg.convertToWorldSpaceAR(this.addBulletData[this.level - 1].endPos);
        var time = cP.sub(bulletStartPos).mag() / this.speedOfBullet + this.addBulletData[this.level - 1].shootDelay;
        var mWP = monster.getPosInTime(time);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time - this.addBulletData[this.level - 1].shootDelay];
    };
    /**
     * 播放填弹动画
     */
    Artillery.prototype.addBulletAnim = function () {
        this.addBulletNodes[0].scale = 1;
        this.addBulletNodes[0].setPosition(this.addBulletData[this.level - 1].startPos);
        var a = cc.bezierTo(0.5, [this.addBulletData[this.level - 1].startPos, this.addBulletData[this.level - 1].ctrlPos, this.addBulletData[this.level - 1].endPos]);
        var func = cc.callFunc(function () {
            this.addBulletNodes[0].scale = 0;
        }, this);
        var seq = cc.sequence(a, func);
        this.addBulletNodes[0].runAction(seq);
    };
    Artillery.prototype.destroySelf = function () {
        this.clearPoolsOfBullet();
        this.node.destroy();
    };
    /**
     * 升级
     */
    Artillery.prototype.upgrade = function () {
        if (this.level === this.maxLevel)
            return;
        this.level++;
        this.init();
    };
    Artillery.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    Artillery.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    /**
     * 判断该点是否在射程内
     * @param pos 世界坐标
     */
    Artillery.prototype.inShootRange = function (pos) {
        var l = this.wPos.sub(pos).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    Artillery.prototype.update = function (dt) {
        if (this.shootable) {
            for (var i = 0; i < this.monsterArray.length; i++) {
                var m = this.monsterArray[i];
                var mP = m.getWPos();
                if (this.inShootRange(mP)) {
                    if (m.swiOfRecursionInPW) {
                        var d = this.forecastMovePos(m, mP);
                        if (d !== null) {
                            this.shoot(cc.v2(d[0], d[1]), d[2]);
                            return;
                        }
                    }
                    else {
                        this.shoot(m.getWPos());
                        return;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            type: ArtilleryFrames,
            tooltip: "塔的图片资源"
        })
    ], Artillery.prototype, "towers", void 0);
    __decorate([
        property({
            type: [cc.Node],
            tooltip: "填弹动画的子弹的节点"
        })
    ], Artillery.prototype, "addBulletNodes", void 0);
    __decorate([
        property({
            type: [cc.Prefab],
        })
    ], Artillery.prototype, "bulletPrefab", void 0);
    Artillery = __decorate([
        ccclass
    ], Artillery);
    return Artillery;
}(cc.Component));
exports.default = Artillery;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJ0aWxsZXJ5L2FydGlsbGVyeVRvd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDBFQUFxRjtBQUNyRixpREFBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBQTtRQUlJLFdBQU0sR0FBcUIsRUFBRSxDQUFDO1FBTTlCLFdBQU0sR0FBcUIsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFQRztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQzttREFDNEI7SUFNOUI7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7bURBQzRCO0lBVjVCLGVBQWU7UUFEcEIsT0FBTyxDQUFDLGlCQUFpQixDQUFDO09BQ3JCLGVBQWUsQ0FXcEI7SUFBRCxzQkFBQztDQVhELEFBV0MsSUFBQTtBQUdEO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBeVFDO1FBblFXLFlBQU0sR0FBc0IsRUFBRSxDQUFDO1FBTS9CLG9CQUFjLEdBQWMsRUFBRSxDQUFDO1FBSy9CLGtCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUUvQixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsUUFBRSxHQUFZLElBQUksQ0FBQztRQUczQixRQUFRO1FBQ0EsbUJBQWEsR0FBRztZQUNwQjtnQkFDSSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FB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LElBQUksRUFBRTs0QkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNwQyxPQUFPO3lCQUNWO3FCQUNKO3lCQUNJO3dCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7d0JBQ3hCLE9BQU87cUJBQ1Y7aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQWxRRDtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxlQUFlO1lBQ3JCLE9BQU8sRUFBRSxRQUFRO1NBQ3BCLENBQUM7NkNBQ3FDO0lBTXZDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLE9BQU8sRUFBRSxZQUFZO1NBQ3hCLENBQUM7cURBQ3FDO0lBS3ZDO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNwQixDQUFDO21EQUNxQztJQWpCdEIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXlRN0I7SUFBRCxnQkFBQztDQXpRRCxBQXlRQyxDQXpRc0MsRUFBRSxDQUFDLFNBQVMsR0F5UWxEO2tCQXpRb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGcmFtZUFuaW1hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZyYW1lQW5pbWF0aW9uXCI7XG5pbXBvcnQgQXJ0aWxsZXJ5QnVsbGV0IGZyb20gXCIuL2FydGlsbGVyeUJ1bGxldFwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vbW9uc3Rlci9tb25zdGVyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKFwiQXJ0aWxsZXJ5RnJhbWVzXCIpXG5jbGFzcyBBcnRpbGxlcnlGcmFtZXMge1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICB9KVxuICAgIGZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLngq7lvLnnmoTlm77niYdcIlxuICAgIH0pXG4gICAgYnVsbGV0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnRpbGxlcnkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQXJ0aWxsZXJ5RnJhbWVzLFxuICAgICAgICB0b29sdGlwOiBcIuWhlOeahOWbvueJh+i1hOa6kFwiXG4gICAgfSlcbiAgICBwcml2YXRlIHRvd2VyczogQXJ0aWxsZXJ5RnJhbWVzW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5Ob2RlXSxcbiAgICAgICAgdG9vbHRpcDogXCLloavlvLnliqjnlLvnmoTlrZDlvLnnmoToioLngrlcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhZGRCdWxsZXROb2RlczogY2MuTm9kZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuUHJlZmFiXSxcbiAgICB9KVxuICAgIHByaXZhdGUgYnVsbGV0UHJlZmFiOiBjYy5QcmVmYWJbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBmcmFtZUFuaW1hdGlvbjogRnJhbWVBbmltYXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZztcbiAgICBwcml2YXRlIG1vbnN0ZXJBcnJheTogTW9uc3RlcltdO1xuICAgIHByaXZhdGUgYmc6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICBwcml2YXRlIGFkZEJ1bGxldERhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0UG9zOiBjYy52MigtMjAsIDEwKSwgLy9iZ+S4i+eahOiKgueCueWdkOagh1xuICAgICAgICAgICAgY3RybFBvczogY2MudjIoLTExLCA1NSksXG4gICAgICAgICAgICBlbmRQb3M6IGNjLnYyKDMsIDIwKSxcbiAgICAgICAgICAgIHNob290RGVsYXk6IDAuOSxcbiAgICAgICAgICAgIGFkZEJ1bGxldERlbGF5OiAxLjRcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgc3RhcnRQb3M6IGNjLnYyKC0yMiwgMTYpLFxuICAgICAgICAgICAgY3RybFBvczogY2MudjIoLTEyLCA1NSksXG4gICAgICAgICAgICBlbmRQb3M6IGNjLnYyKDMsIDI1KSxcbiAgICAgICAgICAgIHNob290RGVsYXk6IDEuMSxcbiAgICAgICAgICAgIGFkZEJ1bGxldERlbGF5OiAxLjhcblxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzdGFydFBvczogY2MudjIoLTIyLCAxNiksXG4gICAgICAgICAgICBjdHJsUG9zOiBjYy52MigtMTMsIDU1KSxcbiAgICAgICAgICAgIGVuZFBvczogY2MudjIoNCwgMjUpLFxuICAgICAgICAgICAgc2hvb3REZWxheTogMC45LFxuICAgICAgICAgICAgYWRkQnVsbGV0RGVsYXk6IDEuNFxuXG4gICAgICAgIH0sXG4gICAgXVxuICAgIC8qKlxuICAgICAqIOWhlOeahOS4lueVjOWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgd1BvczogY2MuVmVjMiA9IG51bGw7XG4gICAgcHJpdmF0ZSBwb29sc09mQnVsbGV0OiBjYy5Ob2RlUG9vbFtdID0gW107XG4gICAgcHJpdmF0ZSBkYXRhT2ZUb3dlcjogYW55W107XG5cbiAgICAvKiDloZTnmoTlsZ7mgKcgKi9cbiAgICBsZXZlbDogbnVtYmVyID0gMTtcbiAgICBtYXhMZXZlbDogbnVtYmVyID0gMztcbiAgICBwcml2YXRlIHNwZWVkT2ZCdWxsZXQ6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDngrjlvLnniIbngrjojIPlm7RcbiAgICAgKi9cbiAgICBwcml2YXRlIGJvbWJSYW5nZTogbnVtYmVyO1xuICAgIHNob290UmFuZ2U6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDmlLvlh7vliptcbiAgICAgKi9cbiAgICBhdHRhY2s6IG51bWJlcjtcbiAgICBwcml2YXRlIGludGVydmFsT2ZTaG9vdDogbnVtYmVyO1xuICAgIHByaWNlOiBudW1iZXI7XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICBwcml2YXRlIHNob290YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmJnID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIik7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb24gPSB0aGlzLmJnLmdldENvbXBvbmVudChcImZyYW1lQW5pbWF0aW9uXCIpO1xuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpO1xuICAgICAgICB0aGlzLmRhdGFPZlRvd2VyID0gdGhpcy5nYW1lQ29uZmlnLmdldERhdGFPZkFydGlsbGVyeSgpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJBcnJheSA9IE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlUG9vbHNPZkJ1bGxldCgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbmlLvlh7vlipvjgIHliqjnlLvjgIFcbiAgICAgKiBAcmV0dXJucyAgXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5hdHRhY2sgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS5hdHRhY2s7XG4gICAgICAgIHRoaXMuc3BlZWRPZkJ1bGxldCA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnNwZWVkT2ZCdWxsZXQ7XG4gICAgICAgIHRoaXMuYm9tYlJhbmdlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uYm9tYlJhbmdlO1xuICAgICAgICB0aGlzLnNob290UmFuZ2UgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS5zaG9vdFJhbmdlO1xuICAgICAgICB0aGlzLmludGVydmFsT2ZTaG9vdCA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLmludGVydmFsT2ZTaG9vdDtcbiAgICAgICAgdGhpcy5wcmljZSA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnByaWNlO1xuXG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb24uc2V0RnJhbWVBcnJheSh0aGlzLnRvd2Vyc1t0aGlzLmxldmVsIC0gMV0uZnJhbWVzKTtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW1hdGlvbi5zZXRTcHJpdGVGcmFtZSh0aGlzLnRvd2Vyc1t0aGlzLmxldmVsIC0gMV0uZnJhbWVzWzBdKTtcbiAgICAgICAgdGhpcy53UG9zID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgIHRoaXMuYWRkQnVsbGV0Tm9kZXNbMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRvd2Vyc1t0aGlzLmxldmVsIC0gMV0uYnVsbGV0WzBdO1xuXG4gICAgICAgIHRoaXMuYWRkQnVsbGV0QW5pbSgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKCkgPT4geyB0aGlzLnNob290YWJsZSA9IHRydWU7IH0pLmJpbmQodGhpcyksIHRoaXMuaW50ZXJ2YWxPZlNob290KTtcbiAgICB9XG5cbiAgICAvKiDngq7lvLnlr7nosaHmsaAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZVBvb2xzT2ZCdWxsZXQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWxsZXRQcmVmYWIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucG9vbHNPZkJ1bGxldC5wdXNoKG5ldyBjYy5Ob2RlUG9vbCgpKTtcbiAgICAgICAgICAgIGxldCBwOiBjYy5QcmVmYWIgPSB0aGlzLmJ1bGxldFByZWZhYltpXTtcbiAgICAgICAgICAgIHRoaXMucG9vbHNPZkJ1bGxldFtpXS5wdXQoY2MuaW5zdGFudGlhdGUocCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEJ1bGxldChsZXZlbDogbnVtYmVyKTogY2MuTm9kZSB7XG4gICAgICAgIGxldCByOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucG9vbHNPZkJ1bGxldFtsZXZlbCAtIDFdLnNpemUoKSA+IDApXG4gICAgICAgICAgICByID0gdGhpcy5wb29sc09mQnVsbGV0W2xldmVsXS5nZXQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiW2xldmVsIC0gMV0pO1xuICAgICAgICByLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cbiAgICByZWxlYXNlQnVsbHQobGV2ZWw6IG51bWJlciwgbjogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLnBvb2xzT2ZCdWxsZXRbbGV2ZWwgLSAxXS5wdXQobik7XG4gICAgfVxuICAgIHByaXZhdGUgY2xlYXJQb29sc09mQnVsbGV0KCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9vbHNPZkJ1bGxldC5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHRoaXMucG9vbHNPZkJ1bGxldFtpXS5jbGVhcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwhOWHu1xuICAgICAqIEBwYXJhbSBkZXMg5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHRpbWUg5a2Q5by55YiwZGVz55qE5pe26Ze0XG4gICAgICovXG4gICAgcHJpdmF0ZSBzaG9vdChkZXM6IGNjLlZlYzIsIHRpbWU6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob290YWJsZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zaG9vdGFibGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGltZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGw6IG51bWJlciA9IHRoaXMud1Bvcy5zdWIoZGVzKS5tYWcoKTtcbiAgICAgICAgICAgIGxldCB0aW1lID0gbCAvIHRoaXMuc3BlZWRPZkJ1bGxldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb24ucGxheShmYWxzZSwgZmFsc2UsIGZhbHNlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNob290QnVsbGV0KGRlcywgdGltZSk7XG4gICAgICAgICAgICB0aGlzLmFkZEJ1bGxldEFuaW0oKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSkuYmluZCh0aGlzKSwgdGhpcy5pbnRlcnZhbE9mU2hvb3QpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwhOWHuuWtkOW8uVxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvb3RCdWxsZXQoZGVzOiBjYy5WZWMyLCB0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGE6IEFydGlsbGVyeUJ1bGxldCA9IHRoaXMuY3JlYXRlQnVsbGV0KCk7XG4gICAgICAgIGxldCB3UG9zOiBjYy5WZWMyID0gdGhpcy5iZy5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5hZGRCdWxsZXREYXRhW3RoaXMubGV2ZWwgLSAxXS5lbmRQb3MpO1xuICAgICAgICBhLm1vdmVUbyh3UG9zLCBkZXMsIHRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnVsbGV0KCk6IEFydGlsbGVyeUJ1bGxldCB7XG4gICAgICAgIGxldCBhcnRpbGxlcnk6IEFydGlsbGVyeUJ1bGxldCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnVsbGV0UHJlZmFiW3RoaXMubGV2ZWwgLSAxXSkuZ2V0Q29tcG9uZW50KFwiYXJ0aWxsZXJ5QnVsbGV0XCIpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYXJ0aWxsZXJ5Lm5vZGUpO1xuICAgICAgICBhcnRpbGxlcnkuaW5pdCh0aGlzLmxldmVsLCB0aGlzLmF0dGFjaywgdGhpcy5ib21iUmFuZ2UpO1xuICAgICAgICBsZXQgYmc6IGNjLk5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKTtcbiAgICAgICAgcmV0dXJuIGFydGlsbGVyeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLnmja7mgKrnianmraTml7bnmoTkvY3nva7vvIzpooTliKTlrZDlvLnliLDovr7lkI7vvIzmgKrniannmoTmlrDkvY3nva5cbiAgICAgKiBAcGFyYW0gbW9uc3RlciBcbiAgICAgKiBAcGFyYW0gY1Ag5q2k5pe25oCq54mp55qE5Z2Q5qCHIOS4lueVjOWdkOagh1xuICAgICAqIEByZXR1cm5zIOaAqueJqemihOa1i+S9jee9rizkuJbnlYw7IOWtkOW8uei+vuWIsOmihOa1i+S9jee9rueahOaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgZm9yZWNhc3RNb3ZlUG9zKG1vbnN0ZXI6IE1vbnN0ZXIsIGNQOiBjYy5WZWMyKTogbnVtYmVyW10ge1xuICAgICAgICAvL+S7juWhq+W8ueWIsOWtkOW8uemjnuihjOWIsGNQ55qE5pe26Ze0XG4gICAgICAgIGxldCBidWxsZXRTdGFydFBvczogY2MuVmVjMiA9IHRoaXMuYmcuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuYWRkQnVsbGV0RGF0YVt0aGlzLmxldmVsIC0gMV0uZW5kUG9zKTtcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IGNQLnN1YihidWxsZXRTdGFydFBvcykubWFnKCkgLyB0aGlzLnNwZWVkT2ZCdWxsZXQgKyB0aGlzLmFkZEJ1bGxldERhdGFbdGhpcy5sZXZlbCAtIDFdLnNob290RGVsYXk7XG5cbiAgICAgICAgbGV0IG1XUDogY2MuVmVjMiA9IG1vbnN0ZXIuZ2V0UG9zSW5UaW1lKHRpbWUpO1xuICAgICAgICBpZiAoIXRoaXMuaW5TaG9vdFJhbmdlKG1XUCkpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIFttV1AueCwgbVdQLnksIHRpbWUgLSB0aGlzLmFkZEJ1bGxldERhdGFbdGhpcy5sZXZlbCAtIDFdLnNob290RGVsYXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvuWhq+W8ueWKqOeUu1xuICAgICAqL1xuICAgIHByaXZhdGUgYWRkQnVsbGV0QW5pbSgpIHtcbiAgICAgICAgdGhpcy5hZGRCdWxsZXROb2Rlc1swXS5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuYWRkQnVsbGV0Tm9kZXNbMF0uc2V0UG9zaXRpb24odGhpcy5hZGRCdWxsZXREYXRhW3RoaXMubGV2ZWwgLSAxXS5zdGFydFBvcyk7XG4gICAgICAgIGxldCBhOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmJlemllclRvKDAuNSwgW3RoaXMuYWRkQnVsbGV0RGF0YVt0aGlzLmxldmVsIC0gMV0uc3RhcnRQb3MsIHRoaXMuYWRkQnVsbGV0RGF0YVt0aGlzLmxldmVsIC0gMV0uY3RybFBvcywgdGhpcy5hZGRCdWxsZXREYXRhW3RoaXMubGV2ZWwgLSAxXS5lbmRQb3NdKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEJ1bGxldE5vZGVzWzBdLnNjYWxlID0gMDtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIGxldCBzZXE6IGNjLkFjdGlvbkludGVydmFsID0gY2Muc2VxdWVuY2UoYSwgZnVuYyk7XG4gICAgICAgIHRoaXMuYWRkQnVsbGV0Tm9kZXNbMF0ucnVuQWN0aW9uKHNlcSk7XG4gICAgfVxuXG4gICAgZGVzdHJveVNlbGYoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJQb29sc09mQnVsbGV0KCk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICovXG4gICAgdXBncmFkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IHRoaXMubWF4TGV2ZWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJpY2VPZlVwZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbF0ucHJpY2U7XG4gICAgfVxuXG4gICAgZ2V0RGF0YU9mVG93ZXIoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhT2ZUb3dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3or6XngrnmmK/lkKblnKjlsITnqIvlhoVcbiAgICAgKiBAcGFyYW0gcG9zIOS4lueVjOWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgaW5TaG9vdFJhbmdlKHBvczogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gdGhpcy53UG9zLnN1Yihwb3MpLm1hZygpO1xuICAgICAgICBpZiAobCA8PSB0aGlzLnNob290UmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5zaG9vdGFibGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tb25zdGVyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbTogTW9uc3RlciA9IHRoaXMubW9uc3RlckFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGxldCBtUDogY2MuVmVjMiA9IG0uZ2V0V1BvcygpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluU2hvb3RSYW5nZShtUCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG0uc3dpT2ZSZWN1cnNpb25JblBXKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZDogbnVtYmVyW10gPSB0aGlzLmZvcmVjYXN0TW92ZVBvcyhtLCBtUCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoY2MudjIoZFswXSwgZFsxXSksIGRbMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QobS5nZXRXUG9zKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/barrack/soldier.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '723bapX0cVMWLHqO6N7iHb6', 'soldier');
// scripts/levelScene/tower/barrack/soldier.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var creature_1 = require("../../creature");
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var combatLogic_1 = require("../../combatLogic");
var monster_1 = require("../../monster/monster");
var move_1 = require("../../../common/move");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Soldier = /** @class */ (function (_super) {
    __extends(Soldier, _super);
    function Soldier() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soldier1Attack = [];
        _this.soldier1Dead = [];
        _this.soldier1Walk = [];
        _this.soldier2Attack = [];
        _this.soldier2Dead = [];
        _this.soldier2Walk = [];
        _this.soldier3Attack = [];
        _this.soldier3Dead = [];
        _this.soldier3Walk = [];
        _this.soldier4Attack = [];
        _this.soldier4Dead = [];
        _this.soldier4Walk = [];
        /* 属性 */
        _this.level = null;
        /* 数据 */
        /**
         * 动画的帧集 [level][attck, die, walk] [cc.SpriteFrame]
         */
        _this.framesOfAnim = null;
        /**
         * 驻点坐标 世界
         */
        _this.station = null;
        _this.stationNo = null;
        /**
         * {HP,speedOfMove,intervalOfAttack,aggressivity,rangeOfAttack,rangeOfInvestigate}
         */
        _this.soldierData = null;
        /* 引用对象 */
        _this.barrack = null;
        /* 控制 */
        _this.isToStation = false;
        _this.isPlayingWalk = false;
        /**
         * 士兵攻击图片少，攻速太快，控制速度
         */
        _this.attackEnable = true;
        return _this;
    }
    Soldier_1 = Soldier;
    Soldier.prototype.onLoad = function () {
        //整理帧动画集
        this.framesOfAnim = [[this.soldier1Attack, this.soldier1Dead, this.soldier1Walk], [this.soldier2Attack, this.soldier2Dead, this.soldier2Walk], [this.soldier3Attack, this.soldier3Dead, this.soldier3Walk], [this.soldier4Attack, this.soldier4Dead, this.soldier4Walk]];
        //士兵数据
        var gameConfig = gameDataManager_1.default.getGameConfig();
        this.soldierData = gameConfig.getSoldierData();
        //节点/组件赋值
        this.combatLogic = new combatLogic_1.default(this, monster_1.default.monstersOfAlive);
        this._move = new move_1.default(this.node);
    };
    Soldier.prototype.init = function (stationNo, station, level, barrack) {
        //初始化属性
        this.level = level;
        var sd = this.soldierData[this.level];
        this.maxHp = this.cHP = sd.HP;
        this.speedOfMove = sd.speedOfMove;
        this.intervalOfAttack = sd.intervalOfAttack;
        this.aggressivity = sd.aggressivity;
        this.rangeOfAttack = sd.rangeOfAttack;
        this.rangeOfInvestigate = sd.rangeOfInvestigate;
        this.intervalOfThink = sd.intervalOfThink;
        //初始化数据
        this.stationNo = stationNo;
        this.station = station;
        //初始化视图
        this.frameAnim.setSpriteFrame(this.framesOfAnim[level][2][0]);
        this.refreshBloodBar();
        //初始化引用对象
        this.barrack = barrack;
        //初始化控制参数
        this.isPlayingWalk = false;
        this.isToStation = false;
        this.attackEnable = true;
        this.initCreature();
    };
    /**
     * @param des 世界
     */
    Soldier.prototype.walk = function (des, func) {
        if (func === void 0) { func = null; }
        this.updateDir(des);
        if (!this.isPlayingWalk) {
            this.frameAnim.setFrameArray(this.framesOfAnim[this.level][2]);
            this.frameAnim.play(true);
            this.isPlayingWalk = true;
        }
        this.move(des, function () {
            this.frameAnim.stop();
            this.isPlayingWalk = false;
            if (func !== null)
                func();
        }.bind(this));
    };
    Soldier.prototype.stopWalk = function () {
        this.frameAnim.stop();
        this.isPlayingWalk = false;
        this._move.stopMove();
    };
    Soldier.prototype.refreshState = function () {
        this.refreshBloodBar();
        //死亡    
        if (this.cHP === 0) {
            this.die(Soldier_1.soldiersOfAlive, this);
            this.playDie(this.framesOfAnim[this.level][1], this.releaseSelf.bind(this));
        }
    };
    /**
     * 释放自身资源
     */
    Soldier.prototype.releaseSelf = function () {
        this.barrack.releaseSoldier(this);
    };
    /**
     * 向驻点移动
     */
    Soldier.prototype.toStation = function () {
        this.isToStation = true;
        this.walk(this.station, function () {
            this.isToStation = false;
        }.bind(this));
    };
    Soldier.prototype.inStation = function () {
        var cwp = this.getWPos();
        var l = cwp.sub(this.station).mag();
        if (l < 2)
            return true;
        return false;
    };
    /**
     * Tracks soldier
     * @param pos 世界
     */
    Soldier.prototype.track = function (pos) {
        this.isTracking = true;
        this.walk(pos, function () {
            this.isTracking = false;
        }.bind(this));
    };
    Soldier.prototype.stopTrack = function () {
        this.stopWalk();
        this.isTracking = false;
    };
    Soldier.prototype.refreshTrackTarget = function (pos) {
        this.walk(pos, function () {
            this.isTracking = false;
        }.bind(this));
    };
    Soldier.prototype.attack = function (m) {
        if (this.isAttacking)
            return;
        if (!this.attackEnable)
            return;
        this.attackEnable = false;
        this.scheduleOnce(function () { this.attackEnable = true; }.bind(this), 1);
        this.isAttacking = true;
        this.frameAnim.setFrameArray(this.framesOfAnim[this.level][0]);
        this.frameAnim.play(false, false, false, function () {
            m.injure(this.aggressivity);
            this.isAttacking = false;
        }.bind(this));
    };
    Soldier.prototype.nonComLogic = function () {
        this.isNonComState = true;
        if (this.inStation())
            return;
        if (this.isToStation)
            return;
        this.toStation();
    };
    Soldier.prototype.stopNonComLogic = function () {
        this.isNonComState = false;
        if (this.isToStation) {
            this.stopWalk();
            this.isToStation = false;
        }
    };
    var Soldier_1;
    /* 记录 */
    /**
     * 用于给敌人遍历场上士兵用
     * 士兵加到节点上时push,士兵死亡时pop
     */
    Soldier.soldiersOfAlive = null;
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级1的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier1Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级1的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier1Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级1的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier1Walk", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级2的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier2Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级2的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier2Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级2的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier2Walk", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级3的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier3Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级3的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier3Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级3的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier3Walk", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级4的士兵攻击帧动画图片"
        })
    ], Soldier.prototype, "soldier4Attack", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级4的士兵死亡帧动画图片"
        })
    ], Soldier.prototype, "soldier4Dead", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "等级4的士兵行走帧动画图片"
        })
    ], Soldier.prototype, "soldier4Walk", void 0);
    Soldier = Soldier_1 = __decorate([
        ccclass
    ], Soldier);
    return Soldier;
}(creature_1.default));
exports.default = Soldier;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYmFycmFjay9zb2xkaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUN0QywwRUFBcUY7QUFDckYsaURBQTRDO0FBRTVDLGlEQUE0QztBQUM1Qyw2Q0FBd0M7QUFHbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBcUMsMkJBQVE7SUFBN0M7UUFBQSxxRUFrUUM7UUE1UFcsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFNcEMsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFNcEMsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFNcEMsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBS3RDLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQUtwQyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFFNUMsUUFBUTtRQUNBLFdBQUssR0FBVyxJQUFJLENBQUM7UUFFN0IsUUFBUTtRQUNSOztXQUVHO1FBQ0ssa0JBQVksR0FBeUIsSUFBSSxDQUFDO1FBQ2xEOztXQUVHO1FBQ0ssYUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCOztXQUVHO1FBQ0ssaUJBQVcsR0FBUSxJQUFJLENBQUM7UUFTaEMsVUFBVTtRQUNGLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFaEMsUUFBUTtRQUNBLGlCQUFXLEdBQVksS0FBSyxDQUFD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RSxlQUFlO1NBQzNCLENBQUM7aURBQzBDO0lBSzVDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO2lEQUMwQztJQU01QztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQzttREFDNEM7SUFLOUM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxlQUFlO1NBQzNCLENBQUM7aURBQzBDO0lBSzVDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO2lEQUMwQztJQWhFM0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWtRM0I7SUFBRCxjQUFDO0NBbFFELEFBa1FDLENBbFFvQyxrQkFBUSxHQWtRNUM7a0JBbFFvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENyZWF0dXJlIGZyb20gXCIuLi8uLi9jcmVhdHVyZVwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgQ29tYmF0TG9naWMgZnJvbSBcIi4uLy4uL2NvbWJhdExvZ2ljXCI7XG5pbXBvcnQgQmFycmFjayBmcm9tIFwiLi9iYXJyYWNrXCI7XG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vbW9uc3Rlci9tb25zdGVyXCI7XG5pbXBvcnQgTW92ZSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21vdmVcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21vZHVsZS91dGlsc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xkaWVyIGV4dGVuZHMgQ3JlYXR1cmUge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqcx55qE5aOr5YW15pS75Ye75bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjFBdHRhY2s6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzHnmoTlo6vlhbXmrbvkuqHluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyMURlYWQ6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzHnmoTlo6vlhbXooYzotbDluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyMVdhbGs6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi562J57qnMueahOWjq+WFteaUu+WHu+W4p+WKqOeUu+WbvueJh1wiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXIyQXR0YWNrOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqcy55qE5aOr5YW15q275Lqh5bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjJEZWFkOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqcy55qE5aOr5YW16KGM6LWw5bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjJXYWxrOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzPnmoTlo6vlhbXmlLvlh7vluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyM0F0dGFjazogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi562J57qnM+eahOWjq+WFteatu+S6oeW4p+WKqOeUu+WbvueJh1wiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXIzRGVhZDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi562J57qnM+eahOWjq+WFteihjOi1sOW4p+WKqOeUu+WbvueJh1wiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXIzV2FsazogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXSxcbiAgICAgICAgdG9vbHRpcDogXCLnrYnnuqc055qE5aOr5YW15pS75Ye75bin5Yqo55S75Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc29sZGllcjRBdHRhY2s6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzTnmoTlo6vlhbXmrbvkuqHluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyNERlYWQ6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLFxuICAgICAgICB0b29sdGlwOiBcIuetiee6pzTnmoTlo6vlhbXooYzotbDluKfliqjnlLvlm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzb2xkaWVyNFdhbGs6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIC8qIOWxnuaApyAqL1xuICAgIHByaXZhdGUgbGV2ZWw6IG51bWJlciA9IG51bGw7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICAvKipcbiAgICAgKiDliqjnlLvnmoTluKfpm4YgW2xldmVsXVthdHRjaywgZGllLCB3YWxrXSBbY2MuU3ByaXRlRnJhbWVdXG4gICAgICovXG4gICAgcHJpdmF0ZSBmcmFtZXNPZkFuaW06IGNjLlNwcml0ZUZyYW1lW11bXVtdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDpqbvngrnlnZDmoIcg5LiW55WMXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aW9uOiBjYy5WZWMyID0gbnVsbDtcbiAgICBzdGF0aW9uTm86IG51bWJlciA9IG51bGw7XG4gICAgLyoqXG4gICAgICoge0hQLHNwZWVkT2ZNb3ZlLGludGVydmFsT2ZBdHRhY2ssYWdncmVzc2l2aXR5LHJhbmdlT2ZBdHRhY2sscmFuZ2VPZkludmVzdGlnYXRlfVxuICAgICAqL1xuICAgIHByaXZhdGUgc29sZGllckRhdGE6IGFueSA9IG51bGw7XG5cbiAgICAvKiDorrDlvZUgKi9cbiAgICAvKipcbiAgICAgKiDnlKjkuo7nu5nmlYzkurrpgY3ljoblnLrkuIrlo6vlhbXnlKhcbiAgICAgKiDlo6vlhbXliqDliLDoioLngrnkuIrml7ZwdXNoLOWjq+WFteatu+S6oeaXtnBvcFxuICAgICAqL1xuICAgIHN0YXRpYyBzb2xkaWVyc09mQWxpdmU6IFNvbGRpZXJbXSA9IG51bGw7XG5cbiAgICAvKiDlvJXnlKjlr7nosaEgKi9cbiAgICBwcml2YXRlIGJhcnJhY2s6IEJhcnJhY2sgPSBudWxsO1xuXG4gICAgLyog5o6n5Yi2ICovXG4gICAgcHJpdmF0ZSBpc1RvU3RhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNQbGF5aW5nV2FsazogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOWjq+WFteaUu+WHu+WbvueJh+Wwke+8jOaUu+mAn+WkquW/q++8jOaOp+WItumAn+W6plxuICAgICAqL1xuICAgIHByaXZhdGUgYXR0YWNrRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy/mlbTnkIbluKfliqjnlLvpm4ZcbiAgICAgICAgdGhpcy5mcmFtZXNPZkFuaW0gPSBbW3RoaXMuc29sZGllcjFBdHRhY2ssIHRoaXMuc29sZGllcjFEZWFkLCB0aGlzLnNvbGRpZXIxV2Fsa10sIFt0aGlzLnNvbGRpZXIyQXR0YWNrLCB0aGlzLnNvbGRpZXIyRGVhZCwgdGhpcy5zb2xkaWVyMldhbGtdLCBbdGhpcy5zb2xkaWVyM0F0dGFjaywgdGhpcy5zb2xkaWVyM0RlYWQsIHRoaXMuc29sZGllcjNXYWxrXSwgW3RoaXMuc29sZGllcjRBdHRhY2ssIHRoaXMuc29sZGllcjREZWFkLCB0aGlzLnNvbGRpZXI0V2Fsa11dO1xuXG4gICAgICAgIC8v5aOr5YW15pWw5o2uXG4gICAgICAgIGxldCBnYW1lQ29uZmlnOiBHYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5zb2xkaWVyRGF0YSA9IGdhbWVDb25maWcuZ2V0U29sZGllckRhdGEoKTtcblxuICAgICAgICAvL+iKgueCuS/nu4Tku7botYvlgLxcbiAgICAgICAgdGhpcy5jb21iYXRMb2dpYyA9IG5ldyBDb21iYXRMb2dpYyh0aGlzLCBNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZSk7XG4gICAgICAgIHRoaXMuX21vdmUgPSBuZXcgTW92ZSh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGluaXQoc3RhdGlvbk5vOiBudW1iZXIsIHN0YXRpb246IGNjLlZlYzIsIGxldmVsOiBudW1iZXIsIGJhcnJhY2s6IEJhcnJhY2spIHtcbiAgICAgICAgLy/liJ3lp4vljJblsZ7mgKdcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICBsZXQgc2Q6IGFueSA9IHRoaXMuc29sZGllckRhdGFbdGhpcy5sZXZlbF07XG4gICAgICAgIHRoaXMubWF4SHAgPSB0aGlzLmNIUCA9IHNkLkhQO1xuICAgICAgICB0aGlzLnNwZWVkT2ZNb3ZlID0gc2Quc3BlZWRPZk1vdmU7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxPZkF0dGFjayA9IHNkLmludGVydmFsT2ZBdHRhY2s7XG4gICAgICAgIHRoaXMuYWdncmVzc2l2aXR5ID0gc2QuYWdncmVzc2l2aXR5O1xuICAgICAgICB0aGlzLnJhbmdlT2ZBdHRhY2sgPSBzZC5yYW5nZU9mQXR0YWNrO1xuICAgICAgICB0aGlzLnJhbmdlT2ZJbnZlc3RpZ2F0ZSA9IHNkLnJhbmdlT2ZJbnZlc3RpZ2F0ZTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbE9mVGhpbmsgPSBzZC5pbnRlcnZhbE9mVGhpbms7XG5cbiAgICAgICAgLy/liJ3lp4vljJbmlbDmja5cbiAgICAgICAgdGhpcy5zdGF0aW9uTm8gPSBzdGF0aW9uTm87XG4gICAgICAgIHRoaXMuc3RhdGlvbiA9IHN0YXRpb247XG5cbiAgICAgICAgLy/liJ3lp4vljJbop4blm75cbiAgICAgICAgdGhpcy5mcmFtZUFuaW0uc2V0U3ByaXRlRnJhbWUodGhpcy5mcmFtZXNPZkFuaW1bbGV2ZWxdWzJdWzBdKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmxvb2RCYXIoKTtcblxuICAgICAgICAvL+WIneWni+WMluW8leeUqOWvueixoVxuICAgICAgICB0aGlzLmJhcnJhY2sgPSBiYXJyYWNrO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW5o6n5Yi25Y+C5pWwXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nV2FsayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVG9TdGF0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXR0YWNrRW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0Q3JlYXR1cmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGVzIOS4lueVjFxuICAgICAqL1xuICAgIHByb3RlY3RlZCB3YWxrKGRlczogY2MuVmVjMiwgZnVuYzogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGlyKGRlcyk7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmdXYWxrKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zZXRGcmFtZUFycmF5KHRoaXMuZnJhbWVzT2ZBbmltW3RoaXMubGV2ZWxdWzJdKTtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVBbmltLnBsYXkodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZ1dhbGsgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW92ZShkZXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVBbmltLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nV2FsayA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZ1bmMgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHN0b3BXYWxrKCkge1xuICAgICAgICB0aGlzLmZyYW1lQW5pbS5zdG9wKCk7XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nV2FsayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tb3ZlLnN0b3BNb3ZlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQmxvb2RCYXIoKTtcblxuICAgICAgICAvL+atu+S6oSAgICBcbiAgICAgICAgaWYgKHRoaXMuY0hQID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpZShTb2xkaWVyLnNvbGRpZXJzT2ZBbGl2ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBsYXlEaWUodGhpcy5mcmFtZXNPZkFuaW1bdGhpcy5sZXZlbF1bMV0sIHRoaXMucmVsZWFzZVNlbGYuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph4rmlL7oh6rouqvotYTmupBcbiAgICAgKi9cbiAgICByZWxlYXNlU2VsZigpIHtcbiAgICAgICAgdGhpcy5iYXJyYWNrLnJlbGVhc2VTb2xkaWVyKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWQkempu+eCueenu+WKqFxuICAgICAqL1xuICAgIHByaXZhdGUgdG9TdGF0aW9uKCkge1xuICAgICAgICB0aGlzLmlzVG9TdGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53YWxrKHRoaXMuc3RhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1RvU3RhdGlvbiA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5TdGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgY3dwOiBjYy5WZWMyID0gdGhpcy5nZXRXUG9zKCk7XG4gICAgICAgIGxldCBsOiBudW1iZXIgPSBjd3Auc3ViKHRoaXMuc3RhdGlvbikubWFnKCk7XG4gICAgICAgIGlmIChsIDwgMilcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhY2tzIHNvbGRpZXJcbiAgICAgKiBAcGFyYW0gcG9zIOS4lueVjFxuICAgICAqL1xuICAgIHRyYWNrKHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLndhbGsocG9zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgc3RvcFRyYWNrKCkge1xuICAgICAgICB0aGlzLnN0b3BXYWxrKCk7XG4gICAgICAgIHRoaXMuaXNUcmFja2luZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZWZyZXNoVHJhY2tUYXJnZXQocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMud2Fsayhwb3MsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUcmFja2luZyA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGF0dGFjayhtOiBDcmVhdHVyZSkge1xuICAgICAgICBpZiAodGhpcy5pc0F0dGFja2luZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLmF0dGFja0VuYWJsZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5hdHRhY2tFbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkgeyB0aGlzLmF0dGFja0VuYWJsZSA9IHRydWU7IH0uYmluZCh0aGlzKSwgMSk7XG5cbiAgICAgICAgdGhpcy5pc0F0dGFja2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltLnNldEZyYW1lQXJyYXkodGhpcy5mcmFtZXNPZkFuaW1bdGhpcy5sZXZlbF1bMF0pO1xuICAgICAgICB0aGlzLmZyYW1lQW5pbS5wbGF5KGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG0uaW5qdXJlKHRoaXMuYWdncmVzc2l2aXR5KTtcbiAgICAgICAgICAgIHRoaXMuaXNBdHRhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBub25Db21Mb2dpYygpIHtcbiAgICAgICAgdGhpcy5pc05vbkNvbVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaW5TdGF0aW9uKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmlzVG9TdGF0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMudG9TdGF0aW9uKCk7XG4gICAgfVxuICAgIHN0b3BOb25Db21Mb2dpYygpIHtcbiAgICAgICAgdGhpcy5pc05vbkNvbVN0YXRlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzVG9TdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BXYWxrKCk7XG4gICAgICAgICAgICB0aGlzLmlzVG9TdGF0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/magiclan/magiclanTower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'faf39emRepGoLTsKitSfC/j', 'magiclanTower');
// scripts/levelScene/tower/magiclan/magiclanTower.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var monster_1 = require("../../monster/monster");
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MagiclanFrames = /** @class */ (function () {
    function MagiclanFrames() {
        this.frames = [];
    }
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], MagiclanFrames.prototype, "frames", void 0);
    MagiclanFrames = __decorate([
        ccclass("MagiclanFrames")
    ], MagiclanFrames);
    return MagiclanFrames;
}());
var MagiclanTower = /** @class */ (function (_super) {
    __extends(MagiclanTower, _super);
    function MagiclanTower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offsetY = [];
        _this.framesArray = [];
        _this.magiclanFrames = [];
        _this.bulletPrefab = null;
        _this.PosOfShoot = null;
        /**
         * 法师的 帧动画组件
         */
        _this.magiclanAF = null;
        /**
         * 塔的 帧动画
         */
        _this.towerAF = null;
        _this.bg = null;
        /* 塔的属性 */
        /**
         * 塔的等级
         */
        _this.level = 1;
        _this.maxLevel = 4;
        /* 控制 */
        /**
         * false为法师朝下
         */
        _this.toward = false;
        _this.isShoot = false;
        /**
         * 塔的坐标 世界
         */
        _this.wPos = null;
        _this.poolOfBullet = null;
        return _this;
    }
    MagiclanTower.prototype.onLoad = function () {
        this.magiclanAF = this.node.getChildByName("magiclan").getComponent("frameAnimation");
        this.towerAF = this.node.getChildByName("bg").getComponent("frameAnimation");
        this.bg = this.node.getChildByName("bg");
        this.monsterArray = monster_1.default.monstersOfAlive;
        var gc = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = gc.getDataOfMagiclan();
        this.createPoolOfBullet();
    };
    MagiclanTower.prototype.start = function () {
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.wPOfShoot = this.PosOfShoot.parent.convertToWorldSpaceAR(this.PosOfShoot.getPosition());
        this.init();
    };
    /**
     * 根据塔的等级 设置塔的图片和骨骼动画
     */
    MagiclanTower.prototype.init = function () {
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfShoot = this.dataOfTower[this.level - 1].speedOfShoot;
        this.speedOfBullet = this.dataOfTower[this.level - 1].speedOfBullet;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.price = this.dataOfTower[this.level - 1].price;
        this.initMagiclanAF();
        this.initTowerAF();
    };
    /* 对象池 */
    MagiclanTower.prototype.createPoolOfBullet = function () {
        if (this.poolOfBullet !== null)
            return;
        this.poolOfBullet = new cc.NodePool();
        for (var i = 0; i < 1; i++) {
            this.poolOfBullet.put(cc.instantiate(this.bulletPrefab));
        }
    };
    MagiclanTower.prototype.getBullet = function () {
        var r = null;
        if (this.poolOfBullet.size() > 0)
            r = this.poolOfBullet.get();
        else
            r = cc.instantiate(this.bulletPrefab);
        r.opacity = 255;
        return r;
    };
    MagiclanTower.prototype.releaseBullt = function (n) {
        this.poolOfBullet.put(n);
    };
    MagiclanTower.prototype.clearPoolOfBullet = function () {
        this.poolOfBullet.clear();
    };
    /**
     * 初始化法师，更新帧动画和位置，发射动画播放时间
     */
    MagiclanTower.prototype.initMagiclanAF = function () {
        var i;
        if (this.level === 4) {
            i = 2;
        }
        else {
            i = 0;
        }
        if (this.toward)
            i++;
        this.magiclanAF.setFrameArray(this.magiclanFrames[i].frames);
        this.magiclanAF.setSpriteFrame(this.magiclanFrames[i].frames[0]);
        this.playTOfShoot = this.magiclanAF.getDuration();
        this.magiclanAF.node.setPosition(this.offsetY[this.level - 1]);
    };
    /**
     * 改变法师的朝向
     * @param toward false为 朝下
     */
    MagiclanTower.prototype.changeToward = function (toward) {
        if (toward === this.toward)
            return;
        this.toward = toward;
        this.initMagiclanAF();
    };
    /**
     * 初始化塔，更新帧动画
     */
    MagiclanTower.prototype.initTowerAF = function () {
        this.towerAF.setFrameArray(this.framesArray[this.level - 1].frames);
        this.towerAF.setSpriteFrame(this.framesArray[this.level - 1].frames[0]);
    };
    /**
     * Shoots arrow tower
     * @param des 世界坐标
     * @param time 子弹到des的时间
     */
    MagiclanTower.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (this.isShoot)
            return;
        this.isShoot = true;
        if (time === null) {
            var l = this.wPos.sub(des).mag();
            var time_1 = l / this.speedOfBullet;
        }
        //更新法师方向
        var wPos = this.node.convertToWorldSpaceAR(this.magiclanAF.node.getPosition());
        if (wPos.y > des.y && this.toward === true)
            this.toward = false;
        else if (wPos.y < des.y && this.toward === false)
            this.toward = true;
        this.initMagiclanAF();
        this.towerAF.play(false);
        this.magiclanAF.play(false, true, false, function () {
            var bulletScr = this.createBullet();
            bulletScr.moveTo(this.wPOfShoot, des, time);
            this.coolingShoot();
        }.bind(this));
    };
    /**
     * 冷却 射击
     */
    MagiclanTower.prototype.coolingShoot = function () {
        this.scheduleOnce(function () {
            this.isShoot = false;
        }.bind(this), this.speedOfShoot);
    };
    MagiclanTower.prototype.createBullet = function () {
        var bullet = this.getBullet();
        var script = bullet.getComponent("magiclanBullet");
        this.node.addChild(bullet);
        script.init(this.attack);
        return script;
    };
    MagiclanTower.prototype.destroySelf = function () {
        this.clearPoolOfBullet();
        this.node.destroy();
    };
    /**
     * 升级
     */
    MagiclanTower.prototype.upgrade = function () {
        if (this.level === 4)
            return;
        this.level++;
        this.init();
    };
    MagiclanTower.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    MagiclanTower.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    /**
     * 判断该点是否在射程内
     * @param pos 世界坐标
     */
    MagiclanTower.prototype.inShootRange = function (pos) {
        var l = this.wPos.sub(pos).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns 怪物预测位置,世界; 子弹达到预测位置的时间
     */
    MagiclanTower.prototype.forecastMovePos = function (monster, cP) {
        //法球飞行到cP的时间
        var time = cP.sub(this.wPOfShoot).mag() / this.speedOfBullet;
        var mWP = monster.getPosInTime(time + this.playTOfShoot);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time];
    };
    MagiclanTower.prototype.update = function (dt) {
        if (!this.isShoot) {
            for (var i = 0; i < this.monsterArray.length; i++) {
                var m = this.monsterArray[i];
                var mP = m.node.parent.convertToWorldSpaceAR(m.node.getPosition());
                if (this.inShootRange(mP)) {
                    if (m.swiOfRecursionInPW) {
                        var d = this.forecastMovePos(m, mP);
                        if (d === null)
                            continue;
                        this.shoot(cc.v2(d[0], d[1]), d[2]);
                        break;
                    }
                    else {
                        this.shoot(m.getWPos());
                        break;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            type: [cc.Vec2],
            tooltip: "各等级的法师的Y坐标"
        })
    ], MagiclanTower.prototype, "offsetY", void 0);
    __decorate([
        property({
            type: [MagiclanFrames],
            tooltip: "它的帧图片"
        })
    ], MagiclanTower.prototype, "framesArray", void 0);
    __decorate([
        property({
            type: [MagiclanFrames],
            tooltip: "法师的帧图片"
        })
    ], MagiclanTower.prototype, "magiclanFrames", void 0);
    __decorate([
        property({
            type: cc.Prefab
        })
    ], MagiclanTower.prototype, "bulletPrefab", void 0);
    __decorate([
        property({
            type: cc.Node,
            displayName: "射击点"
        })
    ], MagiclanTower.prototype, "PosOfShoot", void 0);
    MagiclanTower = __decorate([
        ccclass
    ], MagiclanTower);
    return MagiclanTower;
}(cc.Component));
exports.default = MagiclanTower;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvbWFnaWNsYW4vbWFnaWNsYW5Ub3dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBNEM7QUFDNUMsMEVBQXFGO0FBRS9FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQUE7UUFJSSxXQUFNLEdBQXFCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBREc7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQ3pCLENBQUM7a0RBQzRCO0lBSjVCLGNBQWM7UUFEbkIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO09BQ3BCLGNBQWMsQ0FLbkI7SUFBRCxxQkFBQztDQUxELEFBS0MsSUFBQTtBQUdEO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBdVNDO1FBalNXLGFBQU8sR0FBYyxFQUFFLENBQUM7UUFNeEIsaUJBQVcsR0FBcUIsRUFBRSxDQUFDO1FBTW5DLG9CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUt0QyxrQkFBWSxHQUFjLElBQUksQ0FBQztRQU0vQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUVuQzs7V0FFRztRQUNLLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUMxQzs7V0FFRztRQUNLLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBQy9CLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFHM0IsVUFBVTtRQUNWOztXQUVHO1FBQ0gsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBUXJCLFFBQVE7UUFDUjs7V0FFRztRQUNLLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQU9qQzs7V0FFRztRQUNLLFVBQUksR0FBWSxJQUFJLENB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QUM7WUFDZixPQUFPLEVBQUUsWUFBWTtTQUN4QixDQUFDO2tEQUM4QjtJQU1oQztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN0QixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDO3NEQUN5QztJQU0zQztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN0QixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDO3lEQUM0QztJQUs5QztRQUhDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTTtTQUNsQixDQUFDO3VEQUNxQztJQU12QztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtZQUNiLFdBQVcsRUFBRSxLQUFLO1NBQ3JCLENBQUM7cURBQ2lDO0lBN0JsQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBdVNqQztJQUFELG9CQUFDO0NBdlNELEFBdVNDLENBdlMwQyxFQUFFLENBQUMsU0FBUyxHQXVTdEQ7a0JBdlNvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZyYW1lQW5pbWF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZnJhbWVBbmltYXRpb25cIjtcbmltcG9ydCBNYWdpY2xhbkJ1bGxldCBmcm9tIFwiLi9tYWdpY2xhbkJ1bGxldFwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKFwiTWFnaWNsYW5GcmFtZXNcIilcbmNsYXNzIE1hZ2ljbGFuRnJhbWVzIHtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBmcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbn1cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hZ2ljbGFuVG93ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlZlYzJdLFxuICAgICAgICB0b29sdGlwOiBcIuWQhOetiee6p+eahOazleW4iOeahFnlnZDmoIdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBvZmZzZXRZOiBjYy5WZWMyW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtNYWdpY2xhbkZyYW1lc10sXG4gICAgICAgIHRvb2x0aXA6IFwi5a6D55qE5bin5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgZnJhbWVzQXJyYXk6IE1hZ2ljbGFuRnJhbWVzW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7IC8vMCwx5Li6IOazleW4iDHnmoTmnJ3kuIvlkozmnJ3kuIrnmoTluKflm77niYdcbiAgICAgICAgdHlwZTogW01hZ2ljbGFuRnJhbWVzXSxcbiAgICAgICAgdG9vbHRpcDogXCLms5XluIjnmoTluKflm77niYdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBtYWdpY2xhbkZyYW1lczogTWFnaWNsYW5GcmFtZXNbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgfSlcbiAgICBwcml2YXRlIGJ1bGxldFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuWwhOWHu+eCuVwiXG4gICAgfSlcbiAgICBwcml2YXRlIFBvc09mU2hvb3Q6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog5rOV5biI55qEIOW4p+WKqOeUu+e7hOS7tlxuICAgICAqL1xuICAgIHByaXZhdGUgbWFnaWNsYW5BRjogRnJhbWVBbmltYXRpb24gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOWhlOeahCDluKfliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvd2VyQUY6IEZyYW1lQW5pbWF0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIGJnOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIG1vbnN0ZXJBcnJheTogTW9uc3RlcltdO1xuXG4gICAgLyog5aGU55qE5bGe5oCnICovXG4gICAgLyoqXG4gICAgICog5aGU55qE562J57qnXG4gICAgICovXG4gICAgbGV2ZWw6IG51bWJlciA9IDE7XG4gICAgbWF4TGV2ZWw6IG51bWJlciA9IDQ7XG4gICAgcHJpdmF0ZSBzcGVlZE9mU2hvb3Q6IG51bWJlcjtcbiAgICBwcml2YXRlIHNwZWVkT2ZCdWxsZXQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyO1xuICAgIHNob290UmFuZ2U6IG51bWJlcjtcbiAgICBwcmljZTogbnVtYmVyO1xuXG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICAvKipcbiAgICAgKiBmYWxzZeS4uuazleW4iOacneS4i1xuICAgICAqL1xuICAgIHByaXZhdGUgdG93YXJkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc1Nob290OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICAvKipcbiAgICAgKiDms5XnkIPlj5HlsITngrkg5LiW55WMXG4gICAgICovXG4gICAgcHJpdmF0ZSB3UE9mU2hvb3Q6IGNjLlZlYzI7XG4gICAgLyoqXG4gICAgICog5aGU55qE5Z2Q5qCHIOS4lueVjFxuICAgICAqL1xuICAgIHByaXZhdGUgd1BvczogY2MuVmVjMiA9IG51bGw7XG4gICAgLyoqXG4gICAgICog5Y+R5bCE5Yqo55S75pKt5pS+5pe26Ze0XG4gICAgICovXG4gICAgcHJpdmF0ZSBwbGF5VE9mU2hvb3Q6IG51bWJlcjtcbiAgICBwcml2YXRlIHBvb2xPZkJ1bGxldDogY2MuTm9kZVBvb2wgPSBudWxsO1xuICAgIHByaXZhdGUgZGF0YU9mVG93ZXI6IGFueVtdO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm1hZ2ljbGFuQUYgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYWdpY2xhblwiKS5nZXRDb21wb25lbnQoXCJmcmFtZUFuaW1hdGlvblwiKTtcbiAgICAgICAgdGhpcy50b3dlckFGID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q29tcG9uZW50KFwiZnJhbWVBbmltYXRpb25cIik7XG4gICAgICAgIHRoaXMuYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKTtcbiAgICAgICAgdGhpcy5tb25zdGVyQXJyYXkgPSBNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZTtcbiAgICAgICAgbGV0IGdjOiBHYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5kYXRhT2ZUb3dlciA9IGdjLmdldERhdGFPZk1hZ2ljbGFuKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUG9vbE9mQnVsbGV0KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMud1BvcyA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgdGhpcy53UE9mU2hvb3QgPSB0aGlzLlBvc09mU2hvb3QucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLlBvc09mU2hvb3QuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruWhlOeahOetiee6pyDorr7nva7loZTnmoTlm77niYflkozpqqjpqrzliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXQoKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uYXR0YWNrO1xuICAgICAgICB0aGlzLnNwZWVkT2ZTaG9vdCA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnNwZWVkT2ZTaG9vdDtcbiAgICAgICAgdGhpcy5zcGVlZE9mQnVsbGV0ID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uc3BlZWRPZkJ1bGxldDtcbiAgICAgICAgdGhpcy5zaG9vdFJhbmdlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uc2hvb3RSYW5nZTtcbiAgICAgICAgdGhpcy5wcmljZSA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnByaWNlO1xuXG4gICAgICAgIHRoaXMuaW5pdE1hZ2ljbGFuQUYoKTtcbiAgICAgICAgdGhpcy5pbml0VG93ZXJBRigpO1xuICAgIH1cblxuICAgIC8qIOWvueixoeaxoCAqL1xuICAgIHByaXZhdGUgY3JlYXRlUG9vbE9mQnVsbGV0KCkge1xuICAgICAgICBpZiAodGhpcy5wb29sT2ZCdWxsZXQgIT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucG9vbE9mQnVsbGV0ID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvb2xPZkJ1bGxldC5wdXQoY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRCdWxsZXQoKTogY2MuTm9kZSB7XG4gICAgICAgIGxldCByOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucG9vbE9mQnVsbGV0LnNpemUoKSA+IDApXG4gICAgICAgICAgICByID0gdGhpcy5wb29sT2ZCdWxsZXQuZ2V0KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1bGxldFByZWZhYik7XG4gICAgICAgIHIub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIHJlbGVhc2VCdWxsdChuOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMucG9vbE9mQnVsbGV0LnB1dChuKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjbGVhclBvb2xPZkJ1bGxldCgpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZCdWxsZXQuY2xlYXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbms5XluIjvvIzmm7TmlrDluKfliqjnlLvlkozkvY3nva7vvIzlj5HlsITliqjnlLvmkq3mlL7ml7bpl7RcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRNYWdpY2xhbkFGKCkge1xuICAgICAgICBsZXQgaTogbnVtYmVyO1xuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PT0gNCkge1xuICAgICAgICAgICAgaSA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50b3dhcmQpXG4gICAgICAgICAgICBpKys7XG4gICAgICAgIHRoaXMubWFnaWNsYW5BRi5zZXRGcmFtZUFycmF5KHRoaXMubWFnaWNsYW5GcmFtZXNbaV0uZnJhbWVzKTtcbiAgICAgICAgdGhpcy5tYWdpY2xhbkFGLnNldFNwcml0ZUZyYW1lKHRoaXMubWFnaWNsYW5GcmFtZXNbaV0uZnJhbWVzWzBdKTtcbiAgICAgICAgdGhpcy5wbGF5VE9mU2hvb3QgPSB0aGlzLm1hZ2ljbGFuQUYuZ2V0RHVyYXRpb24oKTtcblxuICAgICAgICB0aGlzLm1hZ2ljbGFuQUYubm9kZS5zZXRQb3NpdGlvbih0aGlzLm9mZnNldFlbdGhpcy5sZXZlbCAtIDFdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlLnlj5jms5XluIjnmoTmnJ3lkJFcbiAgICAgKiBAcGFyYW0gdG93YXJkIGZhbHNl5Li6IOacneS4i1xuICAgICAqL1xuICAgIHByaXZhdGUgY2hhbmdlVG93YXJkKHRvd2FyZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodG93YXJkID09PSB0aGlzLnRvd2FyZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy50b3dhcmQgPSB0b3dhcmQ7XG4gICAgICAgIHRoaXMuaW5pdE1hZ2ljbGFuQUYoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbloZTvvIzmm7TmlrDluKfliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRUb3dlckFGKCkge1xuICAgICAgICB0aGlzLnRvd2VyQUYuc2V0RnJhbWVBcnJheSh0aGlzLmZyYW1lc0FycmF5W3RoaXMubGV2ZWwgLSAxXS5mcmFtZXMpO1xuICAgICAgICB0aGlzLnRvd2VyQUYuc2V0U3ByaXRlRnJhbWUodGhpcy5mcmFtZXNBcnJheVt0aGlzLmxldmVsIC0gMV0uZnJhbWVzWzBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG9vdHMgYXJyb3cgdG93ZXJcbiAgICAgKiBAcGFyYW0gZGVzIOS4lueVjOWdkOagh1xuICAgICAqIEBwYXJhbSB0aW1lIOWtkOW8ueWIsGRlc+eahOaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgc2hvb3QoZGVzOiBjYy5WZWMyLCB0aW1lOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvb3QpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNTaG9vdCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsOiBudW1iZXIgPSB0aGlzLndQb3Muc3ViKGRlcykubWFnKCk7XG4gICAgICAgICAgICBsZXQgdGltZSA9IGwgLyB0aGlzLnNwZWVkT2ZCdWxsZXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL+abtOaWsOazleW4iOaWueWQkVxuICAgICAgICBsZXQgd1BvczogY2MuVmVjMiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5tYWdpY2xhbkFGLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIGlmICh3UG9zLnkgPiBkZXMueSAmJiB0aGlzLnRvd2FyZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHRoaXMudG93YXJkID0gZmFsc2U7XG4gICAgICAgIGVsc2UgaWYgKHdQb3MueSA8IGRlcy55ICYmIHRoaXMudG93YXJkID09PSBmYWxzZSlcbiAgICAgICAgICAgIHRoaXMudG93YXJkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0TWFnaWNsYW5BRigpO1xuXG4gICAgICAgIHRoaXMudG93ZXJBRi5wbGF5KGZhbHNlKTtcbiAgICAgICAgdGhpcy5tYWdpY2xhbkFGLnBsYXkoZmFsc2UsIHRydWUsIGZhbHNlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgYnVsbGV0U2NyOiBNYWdpY2xhbkJ1bGxldCA9IHRoaXMuY3JlYXRlQnVsbGV0KCk7XG4gICAgICAgICAgICBidWxsZXRTY3IubW92ZVRvKHRoaXMud1BPZlNob290LCBkZXMsIHRpbWUpO1xuICAgICAgICAgICAgdGhpcy5jb29saW5nU2hvb3QoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWGt+WNtCDlsITlh7tcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvb2xpbmdTaG9vdCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1Nob290ID0gZmFsc2U7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5zcGVlZE9mU2hvb3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnVsbGV0KCk6IE1hZ2ljbGFuQnVsbGV0IHtcbiAgICAgICAgbGV0IGJ1bGxldDogY2MuTm9kZSA9IHRoaXMuZ2V0QnVsbGV0KCk7XG4gICAgICAgIGxldCBzY3JpcHQ6IE1hZ2ljbGFuQnVsbGV0ID0gYnVsbGV0LmdldENvbXBvbmVudChcIm1hZ2ljbGFuQnVsbGV0XCIpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoYnVsbGV0KTtcbiAgICAgICAgc2NyaXB0LmluaXQodGhpcy5hdHRhY2spO1xuICAgICAgICByZXR1cm4gc2NyaXB0O1xuICAgIH1cblxuICAgIGRlc3Ryb3lTZWxmKCkge1xuICAgICAgICB0aGlzLmNsZWFyUG9vbE9mQnVsbGV0KCk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICovXG4gICAgdXBncmFkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IDQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJpY2VPZlVwZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbF0ucHJpY2U7XG4gICAgfVxuXG4gICAgZ2V0RGF0YU9mVG93ZXIoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhT2ZUb3dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3or6XngrnmmK/lkKblnKjlsITnqIvlhoVcbiAgICAgKiBAcGFyYW0gcG9zIOS4lueVjOWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgaW5TaG9vdFJhbmdlKHBvczogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gdGhpcy53UG9zLnN1Yihwb3MpLm1hZygpO1xuICAgICAgICBpZiAobCA8PSB0aGlzLnNob290UmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruaAqueJqeatpOaXtueahOS9jee9ru+8jOmihOWIpOWtkOW8ueWIsOi+vuWQju+8jOaAqueJqeeahOaWsOS9jee9rlxuICAgICAqIEBwYXJhbSBtb25zdGVyIFxuICAgICAqIEBwYXJhbSBjUCDmraTml7bmgKrniannmoTlnZDmoIcg5LiW55WM5Z2Q5qCHXG4gICAgICogQHJldHVybnMg5oCq54mp6aKE5rWL5L2N572uLOS4lueVjDsg5a2Q5by56L6+5Yiw6aKE5rWL5L2N572u55qE5pe26Ze0XG4gICAgICovXG4gICAgcHJpdmF0ZSBmb3JlY2FzdE1vdmVQb3MobW9uc3RlcjogTW9uc3RlciwgY1A6IGNjLlZlYzIpOiBudW1iZXJbXSB7XG4gICAgICAgIC8v5rOV55CD6aOe6KGM5YiwY1DnmoTml7bpl7RcbiAgICAgICAgbGV0IHRpbWU6IG51bWJlciA9IGNQLnN1Yih0aGlzLndQT2ZTaG9vdCkubWFnKCkgLyB0aGlzLnNwZWVkT2ZCdWxsZXQ7XG5cbiAgICAgICAgbGV0IG1XUDogY2MuVmVjMiA9IG1vbnN0ZXIuZ2V0UG9zSW5UaW1lKHRpbWUgKyB0aGlzLnBsYXlUT2ZTaG9vdCk7XG4gICAgICAgIGlmICghdGhpcy5pblNob290UmFuZ2UobVdQKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gW21XUC54LCBtV1AueSwgdGltZV07XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1Nob290KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW9uc3RlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG06IE1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJBcnJheVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgbVA6IGNjLlZlYzIgPSBtLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pblNob290UmFuZ2UobVApKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtLnN3aU9mUmVjdXJzaW9uSW5QVykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZDogbnVtYmVyW10gPSB0aGlzLmZvcmVjYXN0TW92ZVBvcyhtLCBtUCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoY2MudjIoZFswXSwgZFsxXSksIGRbMl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290KG0uZ2V0V1BvcygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/levelScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74c8cuMGjBCIZa2ZsXkSCsR', 'levelScene');
// scripts/levelScene/levelScene.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../common/module/gameDataManager");
var monsterFactory_1 = require("./monster/monsterFactory");
var V_gameState_1 = require("./V_gameState");
var utils_1 = require("../common/module/utils");
var monster_1 = require("./monster/monster");
var levelDataManager_1 = require("../common/module/levelDataManager");
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var soundsManager_1 = require("../common/module/soundsManager");
var soldier_1 = require("./tower/barrack/soldier");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelScene = /** @class */ (function (_super) {
    __extends(LevelScene, _super);
    function LevelScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingDoorAnim = null;
        _this.pauseFace = null;
        _this.setFace = null;
        _this.monsterFactory = null;
        _this.builderPrefab = null;
        _this.V_gameState = null;
        _this.isDebug = false;
        _this.spriteOfMap = null;
        _this.user = null;
        /* 控制 */
        _this.isBackButton = false;
        _this.isExitButton = false;
        _this.startGame = false;
        /**
         * 计时，用于控制游戏回合阶段
         */
        _this.cT = 0;
        /* 数据 */
        /**
         * 存在的怪物数组
         */
        _this.monsterArray = null;
        _this.gameConfig = null;
        _this.animOfVPMap = null;
        /**
         * 放置空地的根节点
         */
        _this.builderMap = null;
        _this.settlementFace = null;
        return _this;
    }
    LevelScene.prototype.onLoad = function () {
        this.settlementFace = cc.find("Canvas/centerUI/settlementFace").getComponent("settlementFace");
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.animOfVPMap = cc.find("Canvas/VPMap").getComponent(cc.Animation);
        this.builderMap = cc.find("Canvas/builderMap");
        this.monsterArray = monster_1.default.monstersOfAlive;
        this.user = gameDataManager_1.default.getCurrentUser();
        soldier_1.default.soldiersOfAlive = [];
        console.log("士兵数组", soldier_1.default.soldiersOfAlive);
    };
    LevelScene.prototype.start = function () {
        this.buildScene();
        console.log("#\u8FDB\u5165\u5173\u5361" + this.levelNum);
        soundsManager_1.default.ins.curBGM = "sounds/gameBGM/game_bg" + utils_1.default.getRandomInterger(1, 5);
        soundsManager_1.default.ins.playBGM(soundsManager_1.default.ins.curBGM);
        //打开碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        if (this.isDebug) {
            manager.enabledDebugDraw = true;
            manager.enabledDrawBoundingBox = true;
        }
    };
    LevelScene.prototype.buildScene = function () {
        cc.loader.loadRes("levelData/level" + this.levelNum + "/roadData", cc.AnimationClip, function (e, res) {
            //添加移动路径的动画
            this.animOfVPMap.addClip(res);
            this.levelData = levelDataManager_1.default.getLevelData(this.levelNum);
            //添加空地（用于建塔）
            var posArr = this.levelData.posOfBuilders;
            for (var i = 0; i < posArr.length; i++) {
                var n = cc.instantiate(this.builderPrefab);
                var b = n.getComponent("builder");
                this.builderMap.addChild(n);
                n.setPosition(posArr[i]);
                b.init(i);
            }
            cc.loader.loadRes("levelData/level" + this.levelNum + "/map" + this.levelNum, cc.SpriteFrame, function (e, res) {
                //设置地图
                this.spriteOfMap.spriteFrame = res;
                this.init();
                this.loadingDoorAnim.openDoor();
                this.startGame = true;
            }.bind(this));
        }.bind(this));
    };
    /**
     * 初始化玩家状态，回合数
     */
    LevelScene.prototype.init = function () {
        //设置玩家和回合信息
        this.HP = this.maxHP = this.gameConfig.getInitBlood();
        this.cash = this.gameConfig.getInitChip();
        this.maxRound = this.levelData.noOfRound.length;
        this.gameReview = 0;
        //更新界面显示
        this.V_gameState.setHP(this.HP);
        this.V_gameState.setGold(this.cash);
        this.V_gameState.setRound(1, this.maxRound);
        //初始化回合控制
        this.roundIndex = 1;
        this.cT = 0;
        //初始化monsterFactory
        this.monsterFactory.init(this.levelData.roadNum);
    };
    LevelScene.prototype.subHP = function () {
        this.HP--;
        this.V_gameState.setHP(this.HP);
        if (this.HP <= 0) {
            this.startGame = false;
            this.settlementFace.outFailFace();
        }
    };
    /**
     * Subs cash
     * @param n 减的数量
     * @returns 不够返回false
     */
    LevelScene.prototype.subCash = function (n) {
        if (this.cash < n)
            return false;
        this.cash -= n;
        this.V_gameState.setGold(this.cash);
        return true;
    };
    LevelScene.prototype.addCash = function (n) {
        this.cash += n;
        this.V_gameState.setGold(this.cash);
    };
    /* 按钮绑定 */
    LevelScene.prototype.backButton = function () {
        if (this.isBackButton) //保证播放开门动画期间，按按钮 不重复开门
            return;
        this.isBackButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("selectLevelScene", function () {
                var loadingDoorAnim = cc.find("Canvas/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                loadingDoorAnimScr.openDoor();
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    LevelScene.prototype.pauseButton = function () {
        this.pauseFace.active = true;
        this.pauseFace.runAction(cc.fadeIn(0.2));
        this.scheduleOnce(function () {
            cc.director.pause();
        }, 0.2);
    };
    /**
     * 游戏暂停后继续
     */
    LevelScene.prototype.resumeButton = function () {
        cc.director.resume();
        this.pauseFace.runAction(cc.fadeOut(0.2));
        this.scheduleOnce(function () {
            this.pauseFace.active = false;
        }.bind(this), 0.2);
    };
    LevelScene.prototype.setButton = function () {
        this.setFace.active = true;
        this.setFace.runAction(cc.fadeIn(0.2));
        this.scheduleOnce(function () {
            cc.director.pause();
        }, 0.2);
    };
    LevelScene.prototype.closeButton = function () {
        cc.director.resume();
        this.setFace.runAction(cc.fadeOut(0.2));
        this.scheduleOnce(function () {
            this.setFace.active = false;
        }.bind(this), 0.2);
    };
    LevelScene.prototype.resetButton = function () {
        cc.director.resume();
        //判断是在哪个面板点击的按钮，隐藏该面板
        if (this.setFace.active) {
            this.setFace.runAction(cc.fadeOut(0.2));
            this.scheduleOnce(function () {
                this.setFace.active = false;
            }, 0.2);
        }
        else
            this.settlementFace.hiddenSettleFace();
        //重置游戏
        this.monsterFactory.clearMonsters();
        this.monsterFactory.init(this.levelData.roadNum);
        this.resetLand();
        this.init();
        this.startGame = true;
    };
    /**
     * 离开游戏
     * @returns
     */
    LevelScene.prototype.exitButton = function () {
        cc.director.resume();
        this.settlementFace.hiddenSettleFace();
        if (this.isExitButton) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isExitButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("selectLevelScene");
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    /**
     * 重置空地,删除建在上面的塔
     */
    LevelScene.prototype.resetLand = function () {
        var childre = this.builderMap.children;
        childre.forEach(function (e) {
            var builder = e.getComponent("builder");
            builder.deleteTower();
            builder.hiddenBuildFaceImmediately();
        });
    };
    /**
     * 刷新回合，生成怪物
     */
    LevelScene.prototype.refreshRound = function (dt) {
        //回合计时控制
        if (this.roundIndex <= this.maxRound) {
            this.cT += dt;
            if (this.cT >= this.levelData.timeOfRound[this.roundIndex - 1]) { //开始进行这一波
                //更新显示的回合数
                this.V_gameState.setRound(this.roundIndex, this.maxRound);
                //生成这一波   
                var no = this.levelData.noOfRound;
                var mNums = no[this.roundIndex - 1];
                for (var i = 0; i < mNums.length; i++) {
                    this.monsterFactory.createMonster(no[this.roundIndex - 1][i]);
                }
                this.cT = 0;
                this.roundIndex++;
            }
        }
        else if (monster_1.default.monstersOfAlive.length === 0 && this.monsterFactory.creMonList.length === 0 && this.HP > 0) { //所有波怪物全部出发，怪物全部被消灭或离开，并且生命不为0。游戏胜利
            if (this.HP === this.maxHP)
                this.gameReview = 3;
            else if (this.HP >= this.maxHP / 2)
                this.gameReview = 2;
            else
                this.gameReview = 1;
            this.settlementFace.outPassFace(this.gameReview);
            this.startGame = false;
            this.user.setLevelReview(this.levelNum - 1, this.gameReview);
        }
    };
    LevelScene.prototype.update = function (dt) {
        if (!this.startGame)
            return;
        this.refreshRound(dt);
    };
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], LevelScene.prototype, "loadingDoorAnim", void 0);
    __decorate([
        property({ type: cc.Node })
    ], LevelScene.prototype, "pauseFace", void 0);
    __decorate([
        property({ type: cc.Node })
    ], LevelScene.prototype, "setFace", void 0);
    __decorate([
        property({ type: monsterFactory_1.default })
    ], LevelScene.prototype, "monsterFactory", void 0);
    __decorate([
        property({ type: cc.Prefab })
    ], LevelScene.prototype, "builderPrefab", void 0);
    __decorate([
        property({ type: V_gameState_1.default })
    ], LevelScene.prototype, "V_gameState", void 0);
    __decorate([
        property({})
    ], LevelScene.prototype, "isDebug", void 0);
    __decorate([
        property({
            type: cc.Sprite,
            displayName: "地图"
        })
    ], LevelScene.prototype, "spriteOfMap", void 0);
    LevelScene = __decorate([
        ccclass
    ], LevelScene);
    return LevelScene;
}(cc.Component));
exports.default = LevelScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvbGV2ZWxTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBcUY7QUFDckYsMkRBQXNEO0FBQ3RELDZDQUF3QztBQUV4QyxnREFBMkM7QUFDM0MsNkNBQXdDO0FBRXhDLHNFQUE0RTtBQUM1RSxxRkFBZ0Y7QUFDaEYsZ0VBQTJEO0FBQzNELG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQW9WQztRQWpWVyxxQkFBZSxHQUFvQixJQUFJLENBQUM7UUFHeEMsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUd0QyxtQkFBYSxHQUFjLElBQUksQ0FBQztRQUdoQyxpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFHaEMsYUFBTyxHQUFZLEtBQUssQ0FBQztRQU16QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQTRCOUIsVUFBSSxHQUFTLElBQUksQ0FBQztRQUUxQixRQUFRO1FBQ0Esa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUNuQzs7V0FFRztRQUNLLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFFdkIsUUFBUTtRQUNSOztXQUVHO1FBQ0ssa0JBQVksR0FBYyxJQUFJLENBQUM7UUFFL0IsZ0JBQVUsR0FBZSxJQUFJLENBQUM7UUFDOUIsaUJBQVcsR0FBaUIsSUFBSSxDQUFDO1FBQ3pDOztXQUVHO1FBQ0ssZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0Isb0JBQWMsR0FBbUIsSUFBSSxDQUFDOztJQXNRbEQsQ0FBQztJ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O1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQzsrQ0FDb0I7SUFNakM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU07WUFDZixXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDO21EQUNvQztJQTNCckIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW9WOUI7SUFBRCxpQkFBQztDQXBWRCxBQW9WQyxDQXBWdUMsRUFBRSxDQUFDLFNBQVMsR0FvVm5EO2tCQXBWb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lRGF0YVN0b3JhZ2UsIHsgR2FtZUNvbmZpZywgVXNlciB9IGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiO1xuaW1wb3J0IE1vbnN0ZXJGYWN0b3J5IGZyb20gXCIuL21vbnN0ZXIvbW9uc3RlckZhY3RvcnlcIjtcbmltcG9ydCBWX2dhbWVTdGF0ZSBmcm9tIFwiLi9WX2dhbWVTdGF0ZVwiO1xuaW1wb3J0IFNldHRsZW1lbnRGYWNlIGZyb20gXCIuL3NldHRsZW1lbnRGYWNlXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL2NvbW1vbi9tb2R1bGUvdXRpbHNcIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEJ1aWxkZXIgZnJvbSBcIi4vYnVpbGRlclwiO1xuaW1wb3J0IExldmVsRGF0YU1hbmFnZXIsIHsgTGV2ZWwgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9sZXZlbERhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgTG9hZGluZ0Rvb3JBbmltIGZyb20gXCIuLi8uLi9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltXCI7XG5pbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCI7XG5pbXBvcnQgU29sZGllciBmcm9tIFwiLi90b3dlci9iYXJyYWNrL3NvbGRpZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogTG9hZGluZ0Rvb3JBbmltIH0pXG4gICAgcHJpdmF0ZSBsb2FkaW5nRG9vckFuaW06IExvYWRpbmdEb29yQW5pbSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlIH0pXG4gICAgcHJpdmF0ZSBwYXVzZUZhY2U6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSB9KVxuICAgIHByaXZhdGUgc2V0RmFjZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBNb25zdGVyRmFjdG9yeSB9KVxuICAgIHByaXZhdGUgbW9uc3RlckZhY3Rvcnk6IE1vbnN0ZXJGYWN0b3J5ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlByZWZhYiB9KVxuICAgIHByaXZhdGUgYnVpbGRlclByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFZfZ2FtZVN0YXRlIH0pXG4gICAgcHJpdmF0ZSBWX2dhbWVTdGF0ZTogVl9nYW1lU3RhdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHt9KVxuICAgIHByaXZhdGUgaXNEZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlLFxuICAgICAgICBkaXNwbGF5TmFtZTogXCLlnLDlm75cIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBzcHJpdGVPZk1hcDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIC8qIOWFs+WNoeS/oeaBryAqL1xuICAgIGxldmVsTnVtOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog5Zyo6L+b6KGM56ys5Yeg5rOiXG4gICAgICovXG4gICAgcHJpdmF0ZSByb3VuZEluZGV4O1xuICAgIC8qKlxuICAgICAqIOacgOWkp+WbnuWQiOaVsFxuICAgICAqL1xuICAgIHByaXZhdGUgbWF4Um91bmQ6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDlhbPljaHkv6Hmga9cbiAgICAgKi9cbiAgICBsZXZlbERhdGE6IExldmVsO1xuXG4gICAgLyog546p5a625L+h5oGvICovXG4gICAgcHJpdmF0ZSBtYXhIUDogbnVtYmVyO1xuICAgIHByaXZhdGUgSFA6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDph5HluIHmlbBcbiAgICAgKi9cbiAgICBjYXNoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog5ri45oiP5b6X5YiGXG4gICAgICovXG4gICAgcHJpdmF0ZSBnYW1lUmV2aWV3OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyID0gbnVsbDtcblxuICAgIC8qIOaOp+WItiAqL1xuICAgIHByaXZhdGUgaXNCYWNrQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc0V4aXRCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHN0YXJ0R2FtZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOiuoeaXtu+8jOeUqOS6juaOp+WItua4uOaIj+WbnuWQiOmYtuautVxuICAgICAqL1xuICAgIHByaXZhdGUgY1Q6IG51bWJlciA9IDA7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICAvKipcbiAgICAgKiDlrZjlnKjnmoTmgKrnianmlbDnu4RcbiAgICAgKi9cbiAgICBwcml2YXRlIG1vbnN0ZXJBcnJheTogTW9uc3RlcltdID0gbnVsbDtcblxuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBhbmltT2ZWUE1hcDogY2MuQW5pbWF0aW9uID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDmlL7nva7nqbrlnLDnmoTmoLnoioLngrlcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1aWxkZXJNYXA6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgc2V0dGxlbWVudEZhY2U6IFNldHRsZW1lbnRGYWNlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXR0bGVtZW50RmFjZSA9IGNjLmZpbmQoXCJDYW52YXMvY2VudGVyVUkvc2V0dGxlbWVudEZhY2VcIikuZ2V0Q29tcG9uZW50KFwic2V0dGxlbWVudEZhY2VcIik7XG4gICAgICAgIHRoaXMuZ2FtZUNvbmZpZyA9IEdhbWVEYXRhU3RvcmFnZS5nZXRHYW1lQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuYW5pbU9mVlBNYXAgPSBjYy5maW5kKFwiQ2FudmFzL1ZQTWFwXCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLmJ1aWxkZXJNYXAgPSBjYy5maW5kKFwiQ2FudmFzL2J1aWxkZXJNYXBcIik7XG4gICAgICAgIHRoaXMubW9uc3RlckFycmF5ID0gTW9uc3Rlci5tb25zdGVyc09mQWxpdmU7XG4gICAgICAgIHRoaXMudXNlciA9IEdhbWVEYXRhU3RvcmFnZS5nZXRDdXJyZW50VXNlcigpO1xuXG4gICAgICAgIFNvbGRpZXIuc29sZGllcnNPZkFsaXZlID0gW107XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5aOr5YW15pWw57uEXCIsIFNvbGRpZXIuc29sZGllcnNPZkFsaXZlKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5idWlsZFNjZW5lKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coYCPov5vlhaXlhbPljaEke3RoaXMubGV2ZWxOdW19YCk7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLmN1ckJHTSA9IFwic291bmRzL2dhbWVCR00vZ2FtZV9iZ1wiICsgVXRpbHMuZ2V0UmFuZG9tSW50ZXJnZXIoMSwgNSk7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlCR00oU291bmRzTWFuYWdlci5pbnMuY3VyQkdNKTtcblxuICAgICAgICAvL+aJk+W8gOeisOaSnuajgOa1i+ezu+e7n1xuICAgICAgICBsZXQgbWFuYWdlcjogY2MuQ29sbGlzaW9uTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgbWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNEZWJ1Zykge1xuICAgICAgICAgICAgbWFuYWdlci5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbmFnZXIuZW5hYmxlZERyYXdCb3VuZGluZ0JveCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkU2NlbmUoKSB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwibGV2ZWxEYXRhL2xldmVsXCIgKyB0aGlzLmxldmVsTnVtICsgXCIvcm9hZERhdGFcIiwgY2MuQW5pbWF0aW9uQ2xpcCwgZnVuY3Rpb24gKGUsIHJlczogYW55KSB7XG4gICAgICAgICAgICAvL+a3u+WKoOenu+WKqOi3r+W+hOeahOWKqOeUu1xuICAgICAgICAgICAgdGhpcy5hbmltT2ZWUE1hcC5hZGRDbGlwKHJlcyk7XG4gICAgICAgICAgICB0aGlzLmxldmVsRGF0YSA9IExldmVsRGF0YU1hbmFnZXIuZ2V0TGV2ZWxEYXRhKHRoaXMubGV2ZWxOdW0pO1xuXG4gICAgICAgICAgICAvL+a3u+WKoOepuuWcsO+8iOeUqOS6juW7uuWhlO+8iVxuICAgICAgICAgICAgbGV0IHBvc0FycjogY2MuVmVjMltdID0gdGhpcy5sZXZlbERhdGEucG9zT2ZCdWlsZGVycztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG46IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJ1aWxkZXJQcmVmYWIpO1xuICAgICAgICAgICAgICAgIGxldCBiOiBCdWlsZGVyID0gbi5nZXRDb21wb25lbnQoXCJidWlsZGVyXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRlck1hcC5hZGRDaGlsZChuKTtcbiAgICAgICAgICAgICAgICBuLnNldFBvc2l0aW9uKHBvc0FycltpXSk7XG4gICAgICAgICAgICAgICAgYi5pbml0KGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImxldmVsRGF0YS9sZXZlbFwiICsgdGhpcy5sZXZlbE51bSArIFwiL21hcFwiICsgdGhpcy5sZXZlbE51bSwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlLCByZXM6IGFueSkge1xuICAgICAgICAgICAgICAgIC8v6K6+572u5Zyw5Zu+XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVPZk1hcC5zcHJpdGVGcmFtZSA9IHJlcztcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLm9wZW5Eb29yKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUgPSB0cnVlO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMlueOqeWutueKtuaAge+8jOWbnuWQiOaVsFxuICAgICAqL1xuICAgIHByaXZhdGUgaW5pdCgpIHtcbiAgICAgICAgLy/orr7nva7njqnlrrblkozlm57lkIjkv6Hmga9cbiAgICAgICAgdGhpcy5IUCA9IHRoaXMubWF4SFAgPSB0aGlzLmdhbWVDb25maWcuZ2V0SW5pdEJsb29kKCk7XG4gICAgICAgIHRoaXMuY2FzaCA9IHRoaXMuZ2FtZUNvbmZpZy5nZXRJbml0Q2hpcCgpO1xuICAgICAgICB0aGlzLm1heFJvdW5kID0gdGhpcy5sZXZlbERhdGEubm9PZlJvdW5kLmxlbmd0aDtcbiAgICAgICAgdGhpcy5nYW1lUmV2aWV3ID0gMDtcblxuICAgICAgICAvL+abtOaWsOeVjOmdouaYvuekulxuICAgICAgICB0aGlzLlZfZ2FtZVN0YXRlLnNldEhQKHRoaXMuSFApO1xuICAgICAgICB0aGlzLlZfZ2FtZVN0YXRlLnNldEdvbGQodGhpcy5jYXNoKTtcbiAgICAgICAgdGhpcy5WX2dhbWVTdGF0ZS5zZXRSb3VuZCgxLCB0aGlzLm1heFJvdW5kKTtcblxuICAgICAgICAvL+WIneWni+WMluWbnuWQiOaOp+WItlxuICAgICAgICB0aGlzLnJvdW5kSW5kZXggPSAxO1xuICAgICAgICB0aGlzLmNUID0gMDtcblxuICAgICAgICAvL+WIneWni+WMlm1vbnN0ZXJGYWN0b3J5XG4gICAgICAgIHRoaXMubW9uc3RlckZhY3RvcnkuaW5pdCh0aGlzLmxldmVsRGF0YS5yb2FkTnVtKTtcbiAgICB9XG5cblxuICAgIHN1YkhQKCkge1xuICAgICAgICB0aGlzLkhQLS07XG4gICAgICAgIHRoaXMuVl9nYW1lU3RhdGUuc2V0SFAodGhpcy5IUCk7XG4gICAgICAgIGlmICh0aGlzLkhQIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNldHRsZW1lbnRGYWNlLm91dEZhaWxGYWNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJzIGNhc2hcbiAgICAgKiBAcGFyYW0gbiDlh4/nmoTmlbDph49cbiAgICAgKiBAcmV0dXJucyDkuI3lpJ/ov5Tlm55mYWxzZSBcbiAgICAgKi9cbiAgICBzdWJDYXNoKG46IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5jYXNoIDwgbilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5jYXNoIC09IG47XG4gICAgICAgIHRoaXMuVl9nYW1lU3RhdGUuc2V0R29sZCh0aGlzLmNhc2gpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRDYXNoKG46IG51bWJlcikge1xuICAgICAgICB0aGlzLmNhc2ggKz0gbjtcbiAgICAgICAgdGhpcy5WX2dhbWVTdGF0ZS5zZXRHb2xkKHRoaXMuY2FzaCk7XG4gICAgfVxuXG5cbiAgICAvKiDmjInpkq7nu5HlrpogKi9cbiAgICBiYWNrQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0JhY2tCdXR0b24pIC8v5L+d6K+B5pKt5pS+5byA6Zeo5Yqo55S75pyf6Ze077yM5oyJ5oyJ6ZKuIOS4jemHjeWkjeW8gOmXqFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzQmFja0J1dHRvbiA9IHRydWU7XG5cbiAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbGlja1wiKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJzZWxlY3RMZXZlbFNjZW5lXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9hZGluZ0Rvb3JBbmltOiBjYy5Ob2RlID0gY2MuZmluZChcIkNhbnZhcy9sb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbVNjcjogTG9hZGluZ0Rvb3JBbmltID0gbG9hZGluZ0Rvb3JBbmltLmdldENvbXBvbmVudChcImxvYWRpbmdEb29yQW5pbVwiKTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iuc2V0U3RhdGUoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgbG9hZGluZ0Rvb3JBbmltU2NyLm9wZW5Eb29yKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLmNsb3NlRG9vcihmdW5jKTtcblxuICAgICAgICBHYW1lRGF0YVN0b3JhZ2UucHJlc2VydmVHYW1lRGF0YSgpO1xuICAgIH1cblxuICAgIHBhdXNlQnV0dG9uKCkge1xuICAgICAgICB0aGlzLnBhdXNlRmFjZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhdXNlRmFjZS5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMikpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5wYXVzZSgpO1xuICAgICAgICB9LCAwLjIpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ri45oiP5pqC5YGc5ZCO57un57utXG4gICAgICovXG4gICAgcmVzdW1lQnV0dG9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcbiAgICAgICAgdGhpcy5wYXVzZUZhY2UucnVuQWN0aW9uKGNjLmZhZGVPdXQoMC4yKSlcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZUZhY2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgMC4yKTtcbiAgICB9XG5cbiAgICBzZXRCdXR0b24oKSB7XG4gICAgICAgIHRoaXMuc2V0RmFjZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldEZhY2UucnVuQWN0aW9uKGNjLmZhZGVJbigwLjIpKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcbiAgICAgICAgfSwgMC4yKVxuICAgIH1cblxuICAgIGNsb3NlQnV0dG9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcbiAgICAgICAgdGhpcy5zZXRGYWNlLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDAuMikpXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmFjZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAwLjIpO1xuICAgIH1cblxuICAgIHJlc2V0QnV0dG9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcblxuICAgICAgICAvL+WIpOaWreaYr+WcqOWTquS4qumdouadv+eCueWHu+eahOaMiemSru+8jOmakOiXj+ivpemdouadv1xuICAgICAgICBpZiAodGhpcy5zZXRGYWNlLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRGYWNlLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDAuMikpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmFjZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDAuMilcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnNldHRsZW1lbnRGYWNlLmhpZGRlblNldHRsZUZhY2UoKTtcblxuICAgICAgICAvL+mHjee9rua4uOaIj1xuICAgICAgICB0aGlzLm1vbnN0ZXJGYWN0b3J5LmNsZWFyTW9uc3RlcnMoKTtcbiAgICAgICAgdGhpcy5tb25zdGVyRmFjdG9yeS5pbml0KHRoaXMubGV2ZWxEYXRhLnJvYWROdW0pO1xuXG4gICAgICAgIHRoaXMucmVzZXRMYW5kKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnprvlvIDmuLjmiI9cbiAgICAgKiBAcmV0dXJucyAgXG4gICAgICovXG4gICAgZXhpdEJ1dHRvbigpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XG4gICAgICAgIHRoaXMuc2V0dGxlbWVudEZhY2UuaGlkZGVuU2V0dGxlRmFjZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRXhpdEJ1dHRvbikgLy/kv53or4Hmkq3mlL7lvIDpl6jliqjnlLvmnJ/pl7TvvIzmjInlvIDlp4vmuLjmiI/mjInpkq4g5LiN6YeN5aSN5byA6ZeoXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNFeGl0QnV0dG9uID0gdHJ1ZTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuICAgICAgICBsZXQgZnVuYzogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5jbG9zZURvb3IoZnVuYyk7XG5cbiAgICAgICAgR2FtZURhdGFTdG9yYWdlLnByZXNlcnZlR2FtZURhdGEoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43nva7nqbrlnLAs5Yig6Zmk5bu65Zyo5LiK6Z2i55qE5aGUXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldExhbmQoKSB7XG4gICAgICAgIGxldCBjaGlsZHJlOiBjYy5Ob2RlW10gPSB0aGlzLmJ1aWxkZXJNYXAuY2hpbGRyZW47XG4gICAgICAgIGNoaWxkcmUuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBidWlsZGVyOiBCdWlsZGVyID0gZS5nZXRDb21wb25lbnQoXCJidWlsZGVyXCIpO1xuICAgICAgICAgICAgYnVpbGRlci5kZWxldGVUb3dlcigpO1xuICAgICAgICAgICAgYnVpbGRlci5oaWRkZW5CdWlsZEZhY2VJbW1lZGlhdGVseSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliLfmlrDlm57lkIjvvIznlJ/miJDmgKrnialcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZnJlc2hSb3VuZChkdDogbnVtYmVyKSB7XG4gICAgICAgIC8v5Zue5ZCI6K6h5pe25o6n5Yi2XG4gICAgICAgIGlmICh0aGlzLnJvdW5kSW5kZXggPD0gdGhpcy5tYXhSb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5jVCArPSBkdDtcbiAgICAgICAgICAgIGlmICh0aGlzLmNUID49IHRoaXMubGV2ZWxEYXRhLnRpbWVPZlJvdW5kW3RoaXMucm91bmRJbmRleCAtIDFdKSB7IC8v5byA5aeL6L+b6KGM6L+Z5LiA5rOiXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDmmL7npLrnmoTlm57lkIjmlbBcbiAgICAgICAgICAgICAgICB0aGlzLlZfZ2FtZVN0YXRlLnNldFJvdW5kKHRoaXMucm91bmRJbmRleCwgdGhpcy5tYXhSb3VuZCk7XG5cbiAgICAgICAgICAgICAgICAvL+eUn+aIkOi/meS4gOazoiAgIFxuICAgICAgICAgICAgICAgIGxldCBubzogbnVtYmVyW11bXSA9IHRoaXMubGV2ZWxEYXRhLm5vT2ZSb3VuZDtcbiAgICAgICAgICAgICAgICBsZXQgbU51bXM6IG51bWJlcltdID0gbm9bdGhpcy5yb3VuZEluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtTnVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJGYWN0b3J5LmNyZWF0ZU1vbnN0ZXIobm9bdGhpcy5yb3VuZEluZGV4IC0gMV1baV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY1QgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucm91bmRJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlLmxlbmd0aCA9PT0gMCAmJiB0aGlzLm1vbnN0ZXJGYWN0b3J5LmNyZU1vbkxpc3QubGVuZ3RoID09PSAwICYmIHRoaXMuSFAgPiAwKSB7IC8v5omA5pyJ5rOi5oCq54mp5YWo6YOo5Ye65Y+R77yM5oCq54mp5YWo6YOo6KKr5raI54Gt5oiW56a75byA77yM5bm25LiU55Sf5ZG95LiN5Li6MOOAgua4uOaIj+iDnOWIqVxuICAgICAgICAgICAgaWYgKHRoaXMuSFAgPT09IHRoaXMubWF4SFApXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lUmV2aWV3ID0gMztcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuSFAgPj0gdGhpcy5tYXhIUCAvIDIpXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lUmV2aWV3ID0gMjtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVSZXZpZXcgPSAxO1xuICAgICAgICAgICAgdGhpcy5zZXR0bGVtZW50RmFjZS5vdXRQYXNzRmFjZSh0aGlzLmdhbWVSZXZpZXcpO1xuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudXNlci5zZXRMZXZlbFJldmlldyh0aGlzLmxldmVsTnVtIC0gMSwgdGhpcy5nYW1lUmV2aWV3KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRHYW1lKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaFJvdW5kKGR0KTtcbiAgICB9XG59XG5cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ee37t93FBL/50e5njlHUzf', 'use_v2.1-2.2.1_cc.Toggle_event');
// migration/use_v2.1-2.2.1_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with the v2.1.0 ～ 2.2.1 version.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 ~ 2.2.1 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether to trigger 'toggle' and 'checkEvents' events when modifying 'toggle.isChecked' in the code
  // 在代码中修改 'toggle.isChecked' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_isChecked = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9taWdyYXRpb24vdXNlX3YyLjEtMi4yLjFfY2MuVG9nZ2xlX2V2ZW50LmpzIl0sIm5hbWVzIjpbImNjIiwiVG9nZ2xlIiwiX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUFZQSxJQUFJQSxFQUFFLENBQUNDLE1BQVAsRUFBZTtBQUNYO0FBQ0E7QUFDQUQsRUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVVDLCtCQUFWLEdBQTRDLElBQTVDO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBUaGlzIHNjcmlwdCBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBDb2NvcyBDcmVhdG9yIGFuZCBpcyBvbmx5IHVzZWQgZm9yIHByb2plY3RzIGNvbXBhdGlibGUgd2l0aCB0aGUgdjIuMS4wIO+9niAyLjIuMSB2ZXJzaW9uLlxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cbiAqIElmIHlvdSBkb24ndCB1c2UgY2MuVG9nZ2xlIGluIHlvdXIgcHJvamVjdCwgeW91IGNhbiBkZWxldGUgdGhpcyBzY3JpcHQgZGlyZWN0bHkuXG4gKiBJZiB5b3VyIHByb2plY3QgaXMgaG9zdGVkIGluIFZDUyBzdWNoIGFzIGdpdCwgc3VibWl0IHRoaXMgc2NyaXB0IHRvZ2V0aGVyLlxuICpcbiAqIOatpOiEmuacrOeUsSBDb2NvcyBDcmVhdG9yIOiHquWKqOeUn+aIkO+8jOS7heeUqOS6juWFvOWuuSB2Mi4xLjAgfiAyLjIuMSDniYjmnKznmoTlt6XnqIvvvIxcbiAqIOS9oOaXoOmcgOWcqOS7u+S9leWFtuWug+mhueebruS4reaJi+WKqOa3u+WKoOatpOiEmuacrOOAglxuICog5aaC5p6c5L2g55qE6aG555uu5Lit5rKh55So5YiwIFRvZ2dsZe+8jOWPr+ebtOaOpeWIoOmZpOivpeiEmuacrOOAglxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcbiAqL1xuXG5pZiAoY2MuVG9nZ2xlKSB7XG4gICAgLy8gV2hldGhlciB0byB0cmlnZ2VyICd0b2dnbGUnIGFuZCAnY2hlY2tFdmVudHMnIGV2ZW50cyB3aGVuIG1vZGlmeWluZyAndG9nZ2xlLmlzQ2hlY2tlZCcgaW4gdGhlIGNvZGVcbiAgICAvLyDlnKjku6PnoIHkuK3kv67mlLkgJ3RvZ2dsZS5pc0NoZWNrZWQnIOaXtuaYr+WQpuinpuWPkSAndG9nZ2xlJyDkuI4gJ2NoZWNrRXZlbnRzJyDkuovku7ZcbiAgICBjYy5Ub2dnbGUuX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZCA9IHRydWU7XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/arrow/arrowBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2e66asI3tZL6KhScP56kA4Y', 'arrowBullet');
// scripts/levelScene/tower/arrow/arrowBullet.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArrowBullet = /** @class */ (function (_super) {
    __extends(ArrowBullet, _super);
    function ArrowBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* 资源 */
        _this.decalArrow = null;
        _this.completedArrow = null;
        /* 组件 */
        _this.sprite = null;
        _this.arrowTower = null;
        /* 属性 */
        _this.attack = null;
        /* 记录 */
        _this.lastPos = null;
        _this.curPos = null;
        /**
         * 修正箭的初始方向为正右
         */
        _this.offsetDegree = 180;
        /* 控制 */
        _this.isUpdateDir = true;
        /**
         * 是否落地
         */
        _this.isFallFloor = false;
        return _this;
    }
    ArrowBullet.prototype.onLoad = function () {
        this.sprite = this.node.getComponent(cc.Sprite);
        this.arrowTower = this.node.parent.parent.getComponent("arrowTower");
    };
    ArrowBullet.prototype.start = function () {
    };
    /**
     * 初始化
     * @param attack
     * @param dir 箭的朝向，true为左
     */
    ArrowBullet.prototype.init = function (attack, speed, dir) {
        this.attack = attack;
        if (dir)
            this.node.rotation = 50;
        else
            this.node.rotation = -230;
        //显示
        this.sprite.spriteFrame = this.completedArrow;
        //记录
        this.lastPos = null;
        this.curPos = this.node.getPosition();
        //控制
        this.isUpdateDir = true;
        this.isFallFloor = false;
        this.scheduleOnce(this.updateDir, 0.07);
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 从起点到终点的时间
     */
    ArrowBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = nodeStart.add(cc.v2(sub.x / 2, sub.y / 2));
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func1 = cc.callFunc(function () {
            this.isUpdateDir = false;
            this.isFallFloor = true;
            this.sprite.spriteFrame = this.decalArrow;
        }, this);
        var fade = cc.fadeOut(2);
        var func2 = cc.callFunc(function () {
            this.destroySelf();
        }, this);
        var seq = cc.sequence(move, func1, fade, func2);
        this.node.runAction(seq);
    };
    ArrowBullet.prototype.onCollisionEnter = function (other, self) {
        if (this.isFallFloor)
            return;
        var node = other.node;
        var group = node.group;
        if (group === "Enemy") {
            this.node.stopAllActions();
            var m = node.getComponent("monster");
            m.injure(this.attack);
            this.destroySelf();
        }
    };
    /**
     * 更新方向
     */
    ArrowBullet.prototype.updateDir = function () {
        this.lastPos = this.curPos;
        this.curPos = this.node.getPosition();
        var dir = this.curPos.sub(this.lastPos);
        var degree = this.getDegree(dir);
        if (degree === null)
            return;
        this.node.rotation = -(this.offsetDegree + degree);
        if (this.isUpdateDir)
            this.scheduleOnce(this.updateDir.bind(this), 0.07);
    };
    /**
     * Gets degree
     * @param dir 方向向量
     * @returns degree [0,360),null为没有角度变化
     */
    ArrowBullet.prototype.getDegree = function (dir) {
        var rot;
        if (dir.x === 0 && dir.y === 0)
            return null;
        if (dir.x === 0 && dir.y > 0) //y上半轴
            return 90;
        else if (dir.x === 0 && dir.y < 0) //y下半轴
            return 270;
        else { //不在y轴上
            var r = Math.atan(dir.y / dir.x);
            var d = r * 180 / Math.PI;
            rot = d;
        }
        if (rot === 0) //在x轴上
            if (dir.x > 0)
                rot = 0;
            else
                rot = 180;
        else if (dir.x < 0 && dir.y > 0 || dir.x < 0 && dir.y < 0) //在第二三象限
            rot += 180;
        else if (dir.x > 0 && dir.y < 0) //在第四象限
            rot += 360;
        return rot;
    };
    ArrowBullet.prototype.destroySelf = function () {
        this.arrowTower.releaseArrowBullt(this.node);
    };
    __decorate([
        property({
            type: cc.SpriteFrame,
            tooltip: "半截箭图片"
        })
    ], ArrowBullet.prototype, "decalArrow", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            tooltip: "完整的箭图片"
        })
    ], ArrowBullet.prototype, "completedArrow", void 0);
    ArrowBullet = __decorate([
        ccclass
    ], ArrowBullet);
    return ArrowBullet;
}(cc.Component));
exports.default = ArrowBullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJyb3cvYXJyb3dCdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUE0S0M7UUExS0csUUFBUTtRQUtBLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQU1sQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFFOUMsUUFBUTtRQUNBLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBZSxJQUFJLENBQUM7UUFFdEMsUUFBUTtRQUNBLFlBQU0sR0FBVyxJQUFJLENBQUM7UUFFOUIsUUFBUTtRQUNBLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUMvQjs7V0FFRztRQUNjLGtCQUFZLEdBQVcsR0FBRyxDQUFDO1FBRTVDLFFBQVE7UUFDQSxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUNwQzs7V0FFRztRQUNLLGlCQUFXLEdBQVksS0FBSyxDQUFDOztJQXlJekMsQ0FBQztJQXZJRyw0QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCwyQkFBSyxHQUFMO0lBQ0EsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwwQkFBSSxHQUFKLFVBQUssTUFBYyxFQUFFLEtBQWEsRUFBRSxHQUFZO1FBQzVDLElBQUksQ0FBQyxNQUFN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SSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQW5LRDtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVztZQUNwQixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDO21EQUN3QztJQU0xQztRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVztZQUNwQixPQUFPLEVBQUUsUUFBUTtTQUNwQixDQUFDO3VEQUM0QztJQWI3QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNEsvQjtJQUFELGtCQUFDO0NBNUtELEFBNEtDLENBNUt3QyxFQUFFLENBQUMsU0FBUyxHQTRLcEQ7a0JBNUtvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEFycm93VG93ZXIgZnJvbSBcIi4vYXJyb3dUb3dlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyb3dCdWxsZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLyog6LWE5rqQICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIHRvb2x0aXA6IFwi5Y2K5oiq566t5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgZGVjYWxBcnJvdzogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIHRvb2x0aXA6IFwi5a6M5pW055qE566t5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgY29tcGxldGVkQXJyb3c6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIC8qIOe7hOS7tiAqL1xuICAgIHByaXZhdGUgc3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIHByaXZhdGUgYXJyb3dUb3dlcjogQXJyb3dUb3dlciA9IG51bGw7XG5cbiAgICAvKiDlsZ7mgKcgKi9cbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qIOiusOW9lSAqL1xuICAgIHByaXZhdGUgbGFzdFBvczogY2MuVmVjMiA9IG51bGw7XG4gICAgcHJpdmF0ZSBjdXJQb3M6IGNjLlZlYzIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOS/ruato+eureeahOWIneWni+aWueWQkeS4uuato+WPs1xuICAgICAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb2Zmc2V0RGVncmVlOiBudW1iZXIgPSAxODA7XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICBwcml2YXRlIGlzVXBkYXRlRGlyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiDmmK/lkKbokL3lnLBcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzRmFsbEZsb29yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB0aGlzLmFycm93VG93ZXIgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoXCJhcnJvd1Rvd2VyXCIpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIneWni+WMllxuICAgICAqIEBwYXJhbSBhdHRhY2sgXG4gICAgICogQHBhcmFtIGRpciDnrq3nmoTmnJ3lkJHvvIx0cnVl5Li65bemXG4gICAgICovXG4gICAgaW5pdChhdHRhY2s6IG51bWJlciwgc3BlZWQ6IG51bWJlciwgZGlyOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gYXR0YWNrO1xuICAgICAgICBpZiAoZGlyKVxuICAgICAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gNTA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubm9kZS5yb3RhdGlvbiA9IC0yMzA7XG5cbiAgICAgICAgLy/mmL7npLpcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmNvbXBsZXRlZEFycm93O1xuXG4gICAgICAgIC8v6K6w5b2VXG4gICAgICAgIHRoaXMubGFzdFBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VyUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy/mjqfliLZcbiAgICAgICAgdGhpcy5pc1VwZGF0ZURpciA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNGYWxsRmxvb3IgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnVwZGF0ZURpciwgMC4wNyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e75Yqo77yM5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHN0YXJ0IOi1t+eCuVxuICAgICAqIEBwYXJhbSBlbmQg57uI54K5XG4gICAgICogQHBhcmFtIHRpbWUg5LuO6LW354K55Yiw57uI54K555qE5pe26Ze0XG4gICAgICovXG4gICAgbW92ZVRvKHN0YXJ0OiBjYy5WZWMyLCBlbmQ6IGNjLlZlYzIsIHRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgbm9kZVN0YXJ0OiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydCk7XG4gICAgICAgIGxldCBub2RlRW5kOiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmQpO1xuICAgICAgICBsZXQgc3ViOiBjYy5WZWMyID0gbm9kZUVuZC5zdWIobm9kZVN0YXJ0KTtcbiAgICAgICAgbGV0IG1pZGRsZTogY2MuVmVjMiA9IG5vZGVTdGFydC5hZGQoY2MudjIoc3ViLnggLyAyLCBzdWIueSAvIDIpKTtcbiAgICAgICAgbGV0IGM6IGNjLlZlYzIgPSBjYy52MihtaWRkbGUueCwgbm9kZUVuZC55ICsgNjApO1xuICAgICAgICBpZiAoc3RhcnQueCA9PT0gZW5kLngpXG4gICAgICAgICAgICBjLnggKz0gMzA7XG5cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5vZGVTdGFydCk7XG4gICAgICAgIGxldCBtb3ZlOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmJlemllclRvKHRpbWUsIFtub2RlU3RhcnQsIGMsIG5vZGVFbmRdKTtcblxuICAgICAgICBsZXQgZnVuYzE6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVXBkYXRlRGlyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzRmFsbEZsb29yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5kZWNhbEFycm93O1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBsZXQgZmFkZTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5mYWRlT3V0KDIpO1xuXG4gICAgICAgIGxldCBmdW5jMjogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShtb3ZlLCBmdW5jMSwgZmFkZSwgZnVuYzIpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XG4gICAgfVxuXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRmFsbEZsb29yKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gb3RoZXIubm9kZTtcbiAgICAgICAgbGV0IGdyb3VwOiBzdHJpbmcgPSBub2RlLmdyb3VwO1xuXG4gICAgICAgIGlmIChncm91cCA9PT0gXCJFbmVteVwiKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIGxldCBtOiBNb25zdGVyID0gbm9kZS5nZXRDb21wb25lbnQoXCJtb25zdGVyXCIpO1xuICAgICAgICAgICAgbS5pbmp1cmUodGhpcy5hdHRhY2spO1xuXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmlrnlkJFcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZURpcigpIHtcbiAgICAgICAgdGhpcy5sYXN0UG9zID0gdGhpcy5jdXJQb3M7XG4gICAgICAgIHRoaXMuY3VyUG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBkaXI6IGNjLlZlYzIgPSB0aGlzLmN1clBvcy5zdWIodGhpcy5sYXN0UG9zKTtcbiAgICAgICAgbGV0IGRlZ3JlZTogbnVtYmVyID0gdGhpcy5nZXREZWdyZWUoZGlyKTtcbiAgICAgICAgaWYgKGRlZ3JlZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5ub2RlLnJvdGF0aW9uID0gLSh0aGlzLm9mZnNldERlZ3JlZSArIGRlZ3JlZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVcGRhdGVEaXIpXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnVwZGF0ZURpci5iaW5kKHRoaXMpLCAwLjA3KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGRlZ3JlZVxuICAgICAqIEBwYXJhbSBkaXIg5pa55ZCR5ZCR6YePXG4gICAgICogQHJldHVybnMgZGVncmVlIFswLDM2MCksbnVsbOS4uuayoeacieinkuW6puWPmOWMllxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RGVncmVlKGRpcjogY2MuVmVjMik6IG51bWJlciB7XG4gICAgICAgIGxldCByb3Q6IG51bWJlcjtcbiAgICAgICAgaWYgKGRpci54ID09PSAwICYmIGRpci55ID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA+IDApIC8veeS4iuWNiui9tFxuICAgICAgICAgICAgcmV0dXJuIDkwO1xuICAgICAgICBlbHNlIGlmIChkaXIueCA9PT0gMCAmJiBkaXIueSA8IDApIC8veeS4i+WNiui9tFxuICAgICAgICAgICAgcmV0dXJuIDI3MDtcbiAgICAgICAgZWxzZSB7IC8v5LiN5Zyoeei9tOS4ilxuICAgICAgICAgICAgbGV0IHI6IG51bWJlciA9IE1hdGguYXRhbihkaXIueSAvIGRpci54KTtcbiAgICAgICAgICAgIGxldCBkOiBudW1iZXIgPSByICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgICAgIHJvdCA9IGQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm90ID09PSAwKSAvL+WcqHjovbTkuIpcbiAgICAgICAgICAgIGlmIChkaXIueCA+IDApXG4gICAgICAgICAgICAgICAgcm90ID0gMDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByb3QgPSAxODA7XG4gICAgICAgIGVsc2UgaWYgKGRpci54IDwgMCAmJiBkaXIueSA+IDAgfHwgZGlyLnggPCAwICYmIGRpci55IDwgMCkgLy/lnKjnrKzkuozkuInosaHpmZBcbiAgICAgICAgICAgIHJvdCArPSAxODA7XG4gICAgICAgIGVsc2UgaWYgKGRpci54ID4gMCAmJiBkaXIueSA8IDApIC8v5Zyo56ys5Zub6LGh6ZmQXG4gICAgICAgICAgICByb3QgKz0gMzYwO1xuICAgICAgICByZXR1cm4gcm90O1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveVNlbGYoKSB7XG4gICAgICAgIHRoaXMuYXJyb3dUb3dlci5yZWxlYXNlQXJyb3dCdWxsdCh0aGlzLm5vZGUpO1xuICAgIH1cblxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/frameAnimation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd612rCcO5GqopQOUeviCbD', 'frameAnimation');
// scripts/common/frameAnimation.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FrameAnimation = /** @class */ (function (_super) {
    __extends(FrameAnimation, _super);
    function FrameAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playSpeed = 0.1;
        _this.spriteFrames = [];
        _this.idle = null;
        _this.playOnLoad = false;
        _this.sprite = null;
        _this.isPlay = false;
        /**
         * 帧动画接下来播放哪一帧
         */
        _this.nextIndex = 0;
        /**
         * 当前播放时间
         */
        _this.timeSum = 0;
        _this.backFunc = null;
        /**
         * 是否循环播放
         */
        _this.isLoop = false;
        /**
         * 是否倒序播放
         */
        _this.isInvertedPlay = false;
        /**
         * 动画播放结束后是否恢复为第一帧
         */
        _this.isFirstFrameInEnd = true;
        return _this;
    }
    FrameAnimation.prototype.onLoad = function () {
        this.sprite = this.node.getComponent(cc.Sprite);
    };
    FrameAnimation.prototype.start = function () {
        if (this.playOnLoad)
            this.play(true);
    };
    /**
     * 播放帧动画
     * @param isLoop 是否循环播放
     * @param isFirstFrameInEnd 动画播放结束后是否恢复为第一帧
     * @param isInvertedPlay 是否倒序播放一次
     * @param backFunc 动画播放完后将执行该函数
     */
    FrameAnimation.prototype.play = function (isLoop, isFirstFrameInEnd, isInvertedPlay, backFunc) {
        if (isFirstFrameInEnd === void 0) { isFirstFrameInEnd = true; }
        if (isInvertedPlay === void 0) { isInvertedPlay = false; }
        if (backFunc === void 0) { backFunc = null; }
        this.isLoop = isLoop;
        this.backFunc = backFunc;
        this.isFirstFrameInEnd = isFirstFrameInEnd;
        this.nextIndex = 0;
        this.timeSum = 0;
        this.isInvertedPlay = isInvertedPlay;
        if (this.isInvertedPlay) {
            this.spriteFrames.reverse();
        }
        this.setSpriteFrame(this.spriteFrames[this.nextIndex++]);
        this.isPlay = true;
    };
    /**
     * 停止播放,恢复成等待图片，没有就恢复成第一帧
     */
    FrameAnimation.prototype.stop = function () {
        this.isPlay = false;
        if (this.idle === null)
            this.sprite.spriteFrame = this.spriteFrames[0];
        else
            this.sprite.spriteFrame = this.idle;
    };
    FrameAnimation.prototype.pause = function () {
        this.isPlay = false;
    };
    FrameAnimation.prototype.continue = function () {
        this.isPlay = true;
    };
    /**
     * 设置 动画播完后 显示的图片
     * @param f
     */
    FrameAnimation.prototype.setIdle = function (f) {
        this.idle = f;
    };
    /**
     * Sets sprite frame
     * @param spriteFrame 图片
     */
    FrameAnimation.prototype.setSpriteFrame = function (spriteFrame) {
        this.sprite.spriteFrame = spriteFrame;
    };
    /**
     * 设置帧数组
     * @param frameArray 帧数组
     */
    FrameAnimation.prototype.setFrameArray = function (frameArray) {
        this.spriteFrames = [];
        for (var i = 0; i < frameArray.length; i++) {
            this.spriteFrames.push(frameArray[i]);
        }
    };
    /**
     * Gets sprite frame
     * @returns sprite frame 图片
     */
    FrameAnimation.prototype.getSpriteFrame = function () {
        return this.sprite.spriteFrame;
    };
    /**
     * 动画的播放时间
     * @returns duration
     */
    FrameAnimation.prototype.getDuration = function () {
        return this.playSpeed * this.spriteFrames.length;
    };
    FrameAnimation.prototype.update = function (dt) {
        if (this.isPlay) {
            this.timeSum += dt;
            if (this.timeSum >= this.playSpeed) {
                this.sprite.spriteFrame = this.spriteFrames[this.nextIndex++];
                this.timeSum = 0;
                if (this.nextIndex >= this.spriteFrames.length) { //一轮播放完毕
                    if (this.isLoop) //要循环播放
                        this.nextIndex = 0;
                    else {
                        this.isPlay = false;
                        //播放完后的处理
                        if (this.idle) //有不播放动画时的图片
                            this.sprite.spriteFrame = this.idle;
                        else if (this.isFirstFrameInEnd)
                            this.sprite.spriteFrame = this.spriteFrames[0]; //复原为第一帧
                        //重置
                        if (this.isInvertedPlay) {
                            this.spriteFrames.reverse();
                            this.isInvertedPlay = false;
                        }
                        if (this.backFunc !== null)
                            this.backFunc();
                        return;
                    }
                }
            }
        }
    };
    __decorate([
        property({
            displayName: "播放速度",
            tooltip: "多少秒播放一帧"
        })
    ], FrameAnimation.prototype, "playSpeed", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame],
            tooltip: "帧图片"
        })
    ], FrameAnimation.prototype, "spriteFrames", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame,
            tooltip: "动画播放完后的禁止状态的图片，如果没有就会显示第一帧"
        })
    ], FrameAnimation.prototype, "idle", void 0);
    __decorate([
        property({})
    ], FrameAnimation.prototype, "playOnLoad", void 0);
    FrameAnimation = __decorate([
        ccclass
    ], FrameAnimation);
    return FrameAnimation;
}(cc.Component));
exports.default = FrameAnimation;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9mcmFtZUFuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQStLQztRQXpLVyxlQUFTLEdBQVcsR0FBRyxDQUFDO1FBTXhCLGtCQUFZLEdBQXFCLEVBQUUsQ0FBQztRQU1wQyxVQUFJLEdBQW1CLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixZQUFNLEdBQWMsSUFBSSxDQUFDO1FBQ3pCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDaEM7O1dBRUc7UUFDSyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzlCOztXQUVHO1FBQ0ssYUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDbEM7O1dBRUc7UUFDSyxZQUFNLEdBQVksS0FBSyxDQUFDO1FBQ2hDOztXQUVHO1FBQ0ssb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFDeEM7O1dBRUc7UUFDSyx1QkFBaUIsR0FBWSxJQUFJLENBQUM7O0lBa0k5QyxDQUFDO0lBaElHLCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVU7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCw2QkFBSSxHQUFKLFVBQUssTUFBZSxFQUFFLGlCQUFpQyxFQUFFLGNBQStCLEVBQUUsUUFBeUI7UUFBN0Ysa0NB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QStLbEM7SUFBRCxxQkFBQztDQS9LRCxBQStLQyxDQS9LMkMsRUFBRSxDQUFDLFNBQVMsR0ErS3ZEO2tCQS9Lb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZUFuaW1hdGlvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLmkq3mlL7pgJ/luqZcIixcbiAgICAgICAgdG9vbHRpcDogXCLlpJrlsJHnp5Lmkq3mlL7kuIDluKdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBwbGF5U3BlZWQ6IG51bWJlciA9IDAuMTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV0sXG4gICAgICAgIHRvb2x0aXA6IFwi5bin5Zu+54mHXCJcbiAgICB9KVxuICAgIHByaXZhdGUgc3ByaXRlRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgdG9vbHRpcDogXCLliqjnlLvmkq3mlL7lrozlkI7nmoTnpoHmraLnirbmgIHnmoTlm77niYfvvIzlpoLmnpzmsqHmnInlsLHkvJrmmL7npLrnrKzkuIDluKdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBpZGxlOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe30pXG4gICAgcHJpdmF0ZSBwbGF5T25Mb2FkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBwcml2YXRlIGlzUGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOW4p+WKqOeUu+aOpeS4i+adpeaSreaUvuWTquS4gOW4p1xuICAgICAqL1xuICAgIHByaXZhdGUgbmV4dEluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIOW9k+WJjeaSreaUvuaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgdGltZVN1bSA9IDA7XG4gICAgcHJpdmF0ZSBiYWNrRnVuYzogRnVuY3Rpb24gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOaYr+WQpuW+queOr+aSreaUvlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNMb29wOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5piv5ZCm5YCS5bqP5pKt5pS+XG4gICAgICovXG4gICAgcHJpdmF0ZSBpc0ludmVydGVkUGxheTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIOWKqOeUu+aSreaUvue7k+adn+WQjuaYr+WQpuaBouWkjeS4uuesrOS4gOW4p1xuICAgICAqL1xuICAgIHByaXZhdGUgaXNGaXJzdEZyYW1lSW5FbmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheU9uTG9hZClcbiAgICAgICAgICAgIHRoaXMucGxheSh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7luKfliqjnlLtcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr+aSreaUvlxuICAgICAqIEBwYXJhbSBpc0ZpcnN0RnJhbWVJbkVuZCDliqjnlLvmkq3mlL7nu5PmnZ/lkI7mmK/lkKbmgaLlpI3kuLrnrKzkuIDluKdcbiAgICAgKiBAcGFyYW0gaXNJbnZlcnRlZFBsYXkg5piv5ZCm5YCS5bqP5pKt5pS+5LiA5qyhXG4gICAgICogQHBhcmFtIGJhY2tGdW5jIOWKqOeUu+aSreaUvuWujOWQjuWwhuaJp+ihjOivpeWHveaVsFxuICAgICAqL1xuICAgIHBsYXkoaXNMb29wOiBib29sZWFuLCBpc0ZpcnN0RnJhbWVJbkVuZDogYm9vbGVhbiA9IHRydWUsIGlzSW52ZXJ0ZWRQbGF5OiBib29sZWFuID0gZmFsc2UsIGJhY2tGdW5jOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5pc0xvb3AgPSBpc0xvb3A7XG4gICAgICAgIHRoaXMuYmFja0Z1bmMgPSBiYWNrRnVuYztcbiAgICAgICAgdGhpcy5pc0ZpcnN0RnJhbWVJbkVuZCA9IGlzRmlyc3RGcmFtZUluRW5kO1xuICAgICAgICB0aGlzLm5leHRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMudGltZVN1bSA9IDA7XG4gICAgICAgIHRoaXMuaXNJbnZlcnRlZFBsYXkgPSBpc0ludmVydGVkUGxheTtcblxuICAgICAgICBpZiAodGhpcy5pc0ludmVydGVkUGxheSkge1xuICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTcHJpdGVGcmFtZSh0aGlzLnNwcml0ZUZyYW1lc1t0aGlzLm5leHRJbmRleCsrXSk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLmkq3mlL4s5oGi5aSN5oiQ562J5b6F5Zu+54mH77yM5rKh5pyJ5bCx5oGi5aSN5oiQ56ys5LiA5binXG4gICAgICovXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pc1BsYXkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaWRsZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZXNbMF07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5pZGxlO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnRpbnVlKCkge1xuICAgICAgICB0aGlzLmlzUGxheSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572uIOWKqOeUu+aSreWujOWQjiDmmL7npLrnmoTlm77niYdcbiAgICAgKiBAcGFyYW0gZiBcbiAgICAgKi9cbiAgICBzZXRJZGxlKGY6IGNjLlNwcml0ZUZyYW1lKSB7XG4gICAgICAgIHRoaXMuaWRsZSA9IGY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBzcHJpdGUgZnJhbWVcbiAgICAgKiBAcGFyYW0gc3ByaXRlRnJhbWUg5Zu+54mHXG4gICAgICovXG4gICAgc2V0U3ByaXRlRnJhbWUoc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5bin5pWw57uEXG4gICAgICogQHBhcmFtIGZyYW1lQXJyYXkg5bin5pWw57uEXG4gICAgICovXG4gICAgc2V0RnJhbWVBcnJheShmcmFtZUFycmF5OiBjYy5TcHJpdGVGcmFtZVtdKSB7XG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZXMucHVzaChmcmFtZUFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgc3ByaXRlIGZyYW1lXG4gICAgICogQHJldHVybnMgc3ByaXRlIGZyYW1lIOWbvueJh1xuICAgICAqL1xuICAgIGdldFNwcml0ZUZyYW1lKCk6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKqOeUu+eahOaSreaUvuaXtumXtFxuICAgICAqIEByZXR1cm5zIGR1cmF0aW9uIFxuICAgICAqL1xuXG4gICAgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheVNwZWVkICogdGhpcy5zcHJpdGVGcmFtZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5pc1BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZVN1bSArPSBkdDtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVTdW0gPj0gdGhpcy5wbGF5U3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVzW3RoaXMubmV4dEluZGV4KytdO1xuICAgICAgICAgICAgICAgIHRoaXMudGltZVN1bSA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0SW5kZXggPj0gdGhpcy5zcHJpdGVGcmFtZXMubGVuZ3RoKSB7IC8v5LiA6L2u5pKt5pS+5a6M5q+VXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTG9vcCkgLy/opoHlvqrnjq/mkq3mlL5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aSreaUvuWujOWQjueahOWkhOeQhlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaWRsZSkgLy/mnInkuI3mkq3mlL7liqjnlLvml7bnmoTlm77niYdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuaWRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNGaXJzdEZyYW1lSW5FbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lc1swXTsgLy/lpI3ljp/kuLrnrKzkuIDluKdcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ph43nva5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW52ZXJ0ZWRQbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZXMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZlcnRlZFBsYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFja0Z1bmMgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrRnVuYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/homeScene/storeBoard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b4e39Usi6RNBY7exBtleB5L', 'storeBoard');
// scripts/homeScene/storeBoard.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //三个存档节点
        _this.storeNode = [];
        _this.inputBox = null;
        _this.inputLabel = null;
        _this.gameConfig = null;
        _this.users = null;
        _this.clickStoreButton = false;
        _this.homeScene = null;
        return _this;
    }
    Store.prototype.onLoad = function () {
        this.homeScene = cc.find("Canvas").getComponent("homeScene");
    };
    Store.prototype.start = function () {
        this.users = gameDataManager_1.default.getUsers();
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.updateStoreBoard();
    };
    /**
     * 更新存档面板
     */
    Store.prototype.updateStoreBoard = function () {
        for (var i = 0; i < 3; i++) {
            if (this.users[i] === undefined)
                this.updateStore(this.storeNode[i], null);
            else
                this.updateStore(this.storeNode[i], this.users[i]);
        }
    };
    /**
     * 更新存档节点
     * @param storeNode 存档节点
     * @param user 用户数据，为null表示此存档为空
     */
    Store.prototype.updateStore = function (storeNode, user) {
        var nameLabel = storeNode.getChildByName("nameLabel").getComponent(cc.Label);
        var startNum = storeNode.getChildByName("startNum").getComponent(cc.Label);
        if (user === null) {
            nameLabel.string = "无";
            startNum.string = "0/" + this.gameConfig.getStarSum();
            return;
        }
        nameLabel.string = user.getUsername();
        startNum.string = user.getStarSum() + "/" + this.gameConfig.getStarSum();
    };
    /**
     * 点击存档
     * @param storeNum 存档几,1开始
     */
    Store.prototype.storeButton = function (e, storeNum) {
        if (this.clickStoreButton)
            return;
        this.clickStoreButton = true;
        var i = parseInt(storeNum);
        if (this.users.length < i) { //没有存档，弹出输入框新建
            this.inputBox.active = true;
            this.clickStoreButton = false;
            return;
        }
        //有存档,跳转场景，将users下标传入
        this.homeScene.selectLevelScene(i - 1);
    };
    /**
     * 输入用户名确定
     */
    Store.prototype.inputDetermine = function () {
        this.inputBox.active = false;
        if (this.inputLabel.string === "")
            return;
        gameDataManager_1.default.createUser(this.inputLabel.string);
        this.updateStoreBoard();
    };
    /**
     * 输入用户名取消
     */
    Store.prototype.cancelButton = function () {
        this.inputBox.active = false;
    };
    /**
     * 删除存档
     * @param storeNum 存档几
     */
    Store.prototype.deleteStore = function (e, storeNum) {
        var i = parseInt(storeNum);
        if (this.users.length < i) //存档为空
            return;
        var name = this.users[i - 1].getUsername();
        gameDataManager_1.default.delUser(name);
        this.updateStoreBoard();
        console.log("删除存档", name);
    };
    __decorate([
        property({ type: cc.Node })
    ], Store.prototype, "storeNode", void 0);
    __decorate([
        property({ type: cc.Node })
    ], Store.prototype, "inputBox", void 0);
    __decorate([
        property({ type: cc.Label })
    ], Store.prototype, "inputLabel", void 0);
    Store = __decorate([
        ccclass
    ], Store);
    return Store;
}(cc.Component));
exports.default = Store;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2hvbWVTY2VuZS9zdG9yZUJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUFxRjtBQUcvRSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQWdIQztRQTlHRyxRQUFRO1FBRUEsZUFBUyxHQUFjLEVBQUUsQ0FBQztRQUcxQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRTVCLGdCQUFVLEdBQWUsSUFBSSxDQUFDO1FBQzlCLFdBQUssR0FBVyxJQUFJLENBQUM7UUFFckIsc0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGVBQVMsR0FBYyxJQUFJLENBQUM7O0lBZ0d4QyxDQUFDO0lBL0ZHLHNCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxxQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcseUJBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxnQ0FBZ0IsR0FBeEI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTO2dCQUMzQixJQUFJLENBQUMsV0FBVyxD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Q0FBQztJQUM5QixDQUFDO0lBeEdEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0Q0FDTTtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7MkNBQ0s7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDOzZDQUNPO0lBVm5CLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0FnSHpCO0lBQUQsWUFBQztDQWhIRCxBQWdIQyxDQWhIa0MsRUFBRSxDQUFDLFNBQVMsR0FnSDlDO2tCQWhIb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lRGF0YVN0b3JhZ2UsIHsgVXNlciwgR2FtZUNvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiO1xuaW1wb3J0IEhvbWVTY2VuZSBmcm9tIFwiLi9ob21lU2NlbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8v5LiJ5Liq5a2Y5qGj6IqC54K5XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSB9KVxuICAgIHByaXZhdGUgc3RvcmVOb2RlOiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIGlucHV0Qm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsIH0pXG4gICAgcHJpdmF0ZSBpbnB1dExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGdhbWVDb25maWc6IEdhbWVDb25maWcgPSBudWxsO1xuICAgIHByaXZhdGUgdXNlcnM6IFVzZXJbXSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGNsaWNrU3RvcmVCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGhvbWVTY2VuZTogSG9tZVNjZW5lID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuaG9tZVNjZW5lID0gY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJob21lU2NlbmVcIik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudXNlcnMgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0VXNlcnMoKTtcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdG9yZUJvYXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw5a2Y5qGj6Z2i5p2/XG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVTdG9yZUJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlcnNbaV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0b3JlKHRoaXMuc3RvcmVOb2RlW2ldLCBudWxsKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0b3JlKHRoaXMuc3RvcmVOb2RlW2ldLCB0aGlzLnVzZXJzW2ldKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw5a2Y5qGj6IqC54K5XG4gICAgICogQHBhcmFtIHN0b3JlTm9kZSDlrZjmoaPoioLngrkgXG4gICAgICogQHBhcmFtIHVzZXIg55So5oi35pWw5o2u77yM5Li6bnVsbOihqOekuuatpOWtmOaho+S4uuepulxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlU3RvcmUoc3RvcmVOb2RlOiBjYy5Ob2RlLCB1c2VyOiBVc2VyKSB7XG4gICAgICAgIGxldCBuYW1lTGFiZWw6IGNjLkxhYmVsID0gc3RvcmVOb2RlLmdldENoaWxkQnlOYW1lKFwibmFtZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxldCBzdGFydE51bTogY2MuTGFiZWwgPSBzdG9yZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFydE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuXG4gICAgICAgIGlmICh1c2VyID09PSBudWxsKSB7XG4gICAgICAgICAgICBuYW1lTGFiZWwuc3RyaW5nID0gXCLml6BcIjtcbiAgICAgICAgICAgIHN0YXJ0TnVtLnN0cmluZyA9IGAwLyR7dGhpcy5nYW1lQ29uZmlnLmdldFN0YXJTdW0oKX1gO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUxhYmVsLnN0cmluZyA9IHVzZXIuZ2V0VXNlcm5hbWUoKTtcbiAgICAgICAgc3RhcnROdW0uc3RyaW5nID0gYCR7dXNlci5nZXRTdGFyU3VtKCl9LyR7dGhpcy5nYW1lQ29uZmlnLmdldFN0YXJTdW0oKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHu+WtmOaho1xuICAgICAqIEBwYXJhbSBzdG9yZU51bSDlrZjmoaPlh6AsMeW8gOWni1xuICAgICAqL1xuICAgIHN0b3JlQnV0dG9uKGUsIHN0b3JlTnVtOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xpY2tTdG9yZUJ1dHRvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5jbGlja1N0b3JlQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IHBhcnNlSW50KHN0b3JlTnVtKTtcbiAgICAgICAgaWYgKHRoaXMudXNlcnMubGVuZ3RoIDwgaSkgeyAvL+ayoeacieWtmOaho++8jOW8ueWHuui+k+WFpeahhuaWsOW7ulxuICAgICAgICAgICAgdGhpcy5pbnB1dEJveC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jbGlja1N0b3JlQnV0dG9uID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy/mnInlrZjmoaMs6Lez6L2s5Zy65pmv77yM5bCGdXNlcnPkuIvmoIfkvKDlhaVcbiAgICAgICAgdGhpcy5ob21lU2NlbmUuc2VsZWN0TGV2ZWxTY2VuZShpIC0gMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6L6T5YWl55So5oi35ZCN56Gu5a6aXG4gICAgICovXG4gICAgaW5wdXREZXRlcm1pbmUoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRCb3guYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlucHV0TGFiZWwuc3RyaW5nID09PSBcIlwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBHYW1lRGF0YVN0b3JhZ2UuY3JlYXRlVXNlcih0aGlzLmlucHV0TGFiZWwuc3RyaW5nKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdG9yZUJvYXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6L6T5YWl55So5oi35ZCN5Y+W5raIXG4gICAgICovXG4gICAgY2FuY2VsQnV0dG9uKCkge1xuICAgICAgICB0aGlzLmlucHV0Qm94LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Yig6Zmk5a2Y5qGjXG4gICAgICogQHBhcmFtIHN0b3JlTnVtIOWtmOaho+WHoFxuICAgICAqL1xuICAgIGRlbGV0ZVN0b3JlKGUsIHN0b3JlTnVtOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IHBhcnNlSW50KHN0b3JlTnVtKTtcbiAgICAgICAgaWYgKHRoaXMudXNlcnMubGVuZ3RoIDwgaSkgIC8v5a2Y5qGj5Li656m6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSB0aGlzLnVzZXJzW2kgLSAxXS5nZXRVc2VybmFtZSgpO1xuICAgICAgICBHYW1lRGF0YVN0b3JhZ2UuZGVsVXNlcihuYW1lKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdG9yZUJvYXJkKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCLliKDpmaTlrZjmoaNcIiwgbmFtZSk7XG4gICAgfVxuXG5cblxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/aboutScene/aboutScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f79d4kxUTVLgpxuoorvd4d9', 'aboutScene');
// scripts/aboutScene/aboutScene.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../common/module/gameDataManager");
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var soundsManager_1 = require("../common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AboutScene = /** @class */ (function (_super) {
    __extends(AboutScene, _super);
    function AboutScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingDoorAnim = null;
        _this.isBackButton = false;
        return _this;
    }
    AboutScene.prototype.onLoad = function () {
    };
    AboutScene.prototype.start = function () {
        this.loadingDoorAnim.setState(false);
        this.loadingDoorAnim.openDoor();
    };
    AboutScene.prototype.backButton = function () {
        if (this.isBackButton) //保证播放开门动画期间，按按钮 不重复开门
            return;
        this.isBackButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("homeScene", function () {
                var loadingDoorAnim = cc.find("Canvas/centerAnchor/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                // let homeScene: HomeScene = cc.find("Canvas").getComponent("homeScene");
                // homeScene.fristEntry = false;
                loadingDoorAnimScr.openDoor();
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], AboutScene.prototype, "loadingDoorAnim", void 0);
    AboutScene = __decorate([
        ccclass
    ], AboutScene);
    return AboutScene;
}(cc.Component));
exports.default = AboutScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2Fib3V0U2NlbmUvYWJvdXRTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRUFBK0Q7QUFDL0QscUZBQWdGO0FBQ2hGLGdFQUEyRDtBQUVyRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQW9DQztRQWpDVyxxQkFBZSxHQUFvQixJQUFJLENBQUM7UUFFeEMsa0JBQVksR0FBWSxLQUFLLENBQUM7O0lBK0IxQyxDQUFDO0lBOUJHLDJCQUFNLEdBQU47SUFDQSxDQUFDO0lBRUQsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELCtCQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsc0JBQXNCO1lBQ3pDLE9BQU87UUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6Qix1QkFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDckMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO2dCQUMvQixJQUFJLGVBQWUsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7Z0JBQzlFLElBQUksa0JBQWtCLEdBQW9CLGVBQWUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDMUYsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVuQywwRUFBMEU7Z0JBQzFFLGdDQUFnQztnQkFDaEMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyx5QkFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQS9CRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBZSxFQUFFLENBQUM7dURBQ1k7SUFIL0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW9DOUI7SUFBRCxpQkFBQztDQXBDRCxBQW9DQyxDQXBDdUMsRUFBRSxDQUFDLFNBQVMsR0FvQ25EO2tCQXBDb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIb21lU2NlbmUgZnJvbSBcIi4uL2hvbWVTY2VuZS9ob21lU2NlbmVcIjtcbmltcG9ydCBHYW1lRGF0YVN0b3JhZ2UgZnJvbSBcIi4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgTG9hZGluZ0Rvb3JBbmltIGZyb20gXCIuLi8uLi9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltXCI7XG5pbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYm91dFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExvYWRpbmdEb29yQW5pbSB9KVxuICAgIHByaXZhdGUgbG9hZGluZ0Rvb3JBbmltOiBMb2FkaW5nRG9vckFuaW0gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBpc0JhY2tCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvbkxvYWQoKSB7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLnNldFN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0ub3BlbkRvb3IoKTtcbiAgICB9XG5cbiAgICBiYWNrQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0JhY2tCdXR0b24pIC8v5L+d6K+B5pKt5pS+5byA6Zeo5Yqo55S75pyf6Ze077yM5oyJ5oyJ6ZKuIOS4jemHjeWkjeW8gOmXqFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzQmFja0J1dHRvbiA9IHRydWU7XG5cbiAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbGlja1wiKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJob21lU2NlbmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nRG9vckFuaW06IGNjLk5vZGUgPSBjYy5maW5kKFwiQ2FudmFzL2NlbnRlckFuY2hvci9sb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbVNjcjogTG9hZGluZ0Rvb3JBbmltID0gbG9hZGluZ0Rvb3JBbmltLmdldENvbXBvbmVudChcImxvYWRpbmdEb29yQW5pbVwiKTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iuc2V0U3RhdGUoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgLy8gbGV0IGhvbWVTY2VuZTogSG9tZVNjZW5lID0gY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJob21lU2NlbmVcIik7XG4gICAgICAgICAgICAgICAgLy8gaG9tZVNjZW5lLmZyaXN0RW50cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iub3BlbkRvb3IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0uY2xvc2VEb29yKGZ1bmMpO1xuXG4gICAgICAgIEdhbWVEYXRhU3RvcmFnZS5wcmVzZXJ2ZUdhbWVEYXRhKCk7XG4gICAgfVxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/module/soundsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8469a2dt0JLx5rqIeUclwoq', 'soundsManager');
// scripts/common/module/soundsManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storageManager_1 = require("./storageManager");
var SoundsManager = /** @class */ (function () {
    function SoundsManager() {
        this.isBGMMute = false;
        this.isEffectMute = false;
        this.curBGM = null;
        this.isBGMMute = storageManager_1.default.ins.getData("isBGMMute");
        if (this.isBGMMute === null)
            this.isBGMMute = false;
        this.isEffectMute = storageManager_1.default.ins.getData("isEffectMute");
        if (this.isEffectMute === null)
            this.isEffectMute = false;
    }
    SoundsManager.init = function () {
        this.ins = new SoundsManager();
    };
    Object.defineProperty(SoundsManager.prototype, "IsBGMMute", {
        get: function () {
            return this.isBGMMute;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SoundsManager.prototype, "IsEffectMute", {
        get: function () {
            return this.isEffectMute;
        },
        enumerable: false,
        configurable: true
    });
    SoundsManager.prototype.openBGM = function () {
        if (this.isBGMMute) {
            this.isBGMMute = false;
            storageManager_1.default.ins.storageData("isBGMMute", false);
            if (this.curBGM)
                this.playBGM(this.curBGM);
        }
    };
    SoundsManager.prototype.closeBGM = function () {
        if (!this.isBGMMute) {
            this.isBGMMute = true;
            storageManager_1.default.ins.storageData("isBGMMute", true);
            cc.audioEngine.pauseMusic();
        }
    };
    SoundsManager.prototype.openEffect = function () {
        if (this.isEffectMute) {
            this.isEffectMute = false;
            storageManager_1.default.ins.storageData("isEffectMute", false);
        }
    };
    SoundsManager.prototype.closeEffect = function () {
        if (!this.isEffectMute) {
            this.isEffectMute = true;
            storageManager_1.default.ins.storageData("isEffectMute", true);
            cc.audioEngine.stopAllEffects();
        }
    };
    /**
     * 播放背景音乐
     * @param url 文件路径
     */
    SoundsManager.prototype.playBGM = function (url) {
        if (this.isBGMMute)
            return;
        cc.loader.loadRes(url, cc.AudioClip, function (e, clip) {
            cc.audioEngine.playMusic(clip, true);
        }.bind(this));
    };
    /**
     * 播放音效
     * @param url 文件路径
     */
    SoundsManager.prototype.playEffect = function (url) {
        if (this.isEffectMute)
            return;
        cc.loader.loadRes(url, cc.AudioClip, function (e, clip) {
            cc.audioEngine.playEffect(clip, false);
        });
    };
    SoundsManager.ins = null;
    return SoundsManager;
}());
exports.default = SoundsManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb2R1bGUvc291bmRzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUU5QztJQXFCSTtRQVpRLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFdEMsV0FBTSxHQUFXLElBQUksQ0FBQztRQVVsQixJQUFJLENBQUMsU0FBUyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN4RCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSTtZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUUzQixJQUFJLENBQUMsWUFBWSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM5RCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSTtZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBekJNLGtCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFFbkMsQ0FBQztJQU9ELHNCQUFJLG9DQUFTO2FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSx1Q0FBWTthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQVlELCtCQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVuRCxJQUFJLElBQUksQ0FBQyxNQUFNO2dCQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0Qix3QkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWxELEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQix3QkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pEO0lBQ0wsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6Qix3QkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JELEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsK0JBQU8sR0FBUCxVQUFRLEdBQVc7UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2QsT0FBTztRQUVYLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFLElBQUk7WUFDbEQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsa0NBQVUsR0FBVixVQUFXLEdBQVc7UUFDbEIsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUNqQixPQUFPO1FBRVgsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsSUFBSTtZQUNsRCxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBdkZNLGlCQUFHLEdBQWtCLElBQUksQ0FBQztJQXlGckMsb0JBQUM7Q0EzRkQsQUEyRkMsSUFBQTtrQkEzRm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmFnZU1hbmFnZXIgZnJvbSBcIi4vc3RvcmFnZU1hbmFnZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291bmRzTWFuYWdlciB7XG5cbiAgICBzdGF0aWMgaW5zOiBTb3VuZHNNYW5hZ2VyID0gbnVsbDtcblxuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICB0aGlzLmlucyA9IG5ldyBTb3VuZHNNYW5hZ2VyKCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQkdNTXV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNFZmZlY3RNdXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjdXJCR006IHN0cmluZyA9IG51bGw7XG5cbiAgICBnZXQgSXNCR01NdXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0JHTU11dGU7XG4gICAgfVxuICAgIGdldCBJc0VmZmVjdE11dGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRWZmZWN0TXV0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzQkdNTXV0ZSA9IFN0b3JhZ2VNYW5hZ2VyLmlucy5nZXREYXRhKFwiaXNCR01NdXRlXCIpXG4gICAgICAgIGlmICh0aGlzLmlzQkdNTXV0ZSA9PT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuaXNCR01NdXRlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5pc0VmZmVjdE11dGUgPSBTdG9yYWdlTWFuYWdlci5pbnMuZ2V0RGF0YShcImlzRWZmZWN0TXV0ZVwiKVxuICAgICAgICBpZiAodGhpcy5pc0VmZmVjdE11dGUgPT09IG51bGwpXG4gICAgICAgICAgICB0aGlzLmlzRWZmZWN0TXV0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9wZW5CR00oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQkdNTXV0ZSkge1xuICAgICAgICAgICAgdGhpcy5pc0JHTU11dGUgPSBmYWxzZTtcbiAgICAgICAgICAgIFN0b3JhZ2VNYW5hZ2VyLmlucy5zdG9yYWdlRGF0YShcImlzQkdNTXV0ZVwiLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmN1ckJHTSlcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCR00odGhpcy5jdXJCR00pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VCR00oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0JHTU11dGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCR01NdXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIFN0b3JhZ2VNYW5hZ2VyLmlucy5zdG9yYWdlRGF0YShcImlzQkdNTXV0ZVwiLCB0cnVlKTtcblxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlbkVmZmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFZmZlY3RNdXRlKSB7XG4gICAgICAgICAgICB0aGlzLmlzRWZmZWN0TXV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgU3RvcmFnZU1hbmFnZXIuaW5zLnN0b3JhZ2VEYXRhKFwiaXNFZmZlY3RNdXRlXCIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlRWZmZWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFZmZlY3RNdXRlKSB7XG4gICAgICAgICAgICB0aGlzLmlzRWZmZWN0TXV0ZSA9IHRydWU7XG4gICAgICAgICAgICBTdG9yYWdlTWFuYWdlci5pbnMuc3RvcmFnZURhdGEoXCJpc0VmZmVjdE11dGVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsRWZmZWN0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+6IOM5pmv6Z+z5LmQXG4gICAgICogQHBhcmFtIHVybCDmlofku7bot6/lvoRcbiAgICAgKi9cbiAgICBwbGF5QkdNKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQkdNTXV0ZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh1cmwsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24gKGUsIGNsaXApIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhjbGlwLCB0cnVlKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvumfs+aViFxuICAgICAqIEBwYXJhbSB1cmwg5paH5Lu26Lev5b6EXG4gICAgICovXG4gICAgcGxheUVmZmVjdCh1cmw6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5pc0VmZmVjdE11dGUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uIChlLCBjbGlwKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsIGZhbHNlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/module/storageManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b356Jms5BGTa+3XY/EELA9', 'storageManager');
// scripts/common/module/storageManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StorageManager = /** @class */ (function () {
    function StorageManager() {
        this.ls = cc.sys.localStorage;
    }
    StorageManager.init = function () {
        this.ins = new StorageManager();
    };
    StorageManager.prototype.storageData = function (key, data) {
        this.ls.setItem(key, data);
    };
    StorageManager.prototype.getData = function (key) {
        return this.ls.getItem(key);
    };
    StorageManager.prototype.removeData = function (key) {
        this.ls.removeItem(key);
    };
    StorageManager.ins = null;
    return StorageManager;
}());
exports.default = StorageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb2R1bGUvc3RvcmFnZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO1FBTVksT0FBRSxHQUFzQixFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztJQWF4RCxDQUFDO0lBakJVLG1CQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUlELG9DQUFXLEdBQVgsVUFBWSxHQUFXLEVBQUUsSUFBUztRQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxHQUFXO1FBQ2YsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLEdBQVc7UUFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQWpCTSxrQkFBRyxHQUFtQixJQUFJLENBQUM7SUFrQnRDLHFCQUFDO0NBbkJELEFBbUJDLElBQUE7a0JBbkJvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZU1hbmFnZXIge1xuICAgIHN0YXRpYyBpbnM6IFN0b3JhZ2VNYW5hZ2VyID0gbnVsbDtcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbnMgPSBuZXcgU3RvcmFnZU1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxzOiBDQ1N5c0xvY2FsU3RvcmFnZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2U7XG5cbiAgICBzdG9yYWdlRGF0YShrZXk6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMubHMuc2V0SXRlbShrZXksIGRhdGEpO1xuICAgIH1cblxuICAgIGdldERhdGEoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5scy5nZXRJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRGF0YShrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/nodeSort.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6138fxs+4VFYrG5yshoOB2G', 'nodeSort');
// scripts/common/nodeSort.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NodeSort = /** @class */ (function (_super) {
    __extends(NodeSort, _super);
    function NodeSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cT = 0;
        _this.cL = 1;
        return _this;
    }
    NodeSort.prototype.onLoad = function () {
        this.children = this.node.children;
    };
    NodeSort.prototype.start = function () {
    };
    NodeSort.prototype.update = function (dt) {
        if (this.children === undefined)
            return;
        this.cT += dt;
        if (this.cT >= this.cL) {
            this.cT = 0;
            this.children.sort(function (a, b) {
                if (a.y > b.y)
                    return -1;
                else
                    return 1;
            });
            for (var i = 0; i < this.children.length; i++)
                this.children[i].zIndex = 1000 + i;
        }
    };
    NodeSort = __decorate([
        ccclass
    ], NodeSort);
    return NodeSort;
}(cc.Component));
exports.default = NodeSort;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9ub2RlU29ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQThCQztRQTNCVyxRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ2YsUUFBRSxHQUFXLENBQUMsQ0FBQzs7SUEwQjNCLENBQUM7SUF6QkcseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkMsQ0FBQztJQUVELHdCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQseUJBQU0sR0FBTixVQUFPLEVBQUU7UUFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUztZQUMzQixPQUFPO1FBQ1gsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBVSxFQUFFLENBQVU7Z0JBQy9DLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDVCxPQUFPLENBQUMsQ0FBQyxDQUFDOztvQkFFVixPQUFPLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBN0JnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBOEI1QjtJQUFELGVBQUM7Q0E5QkQsQUE4QkMsQ0E5QnFDLEVBQUUsQ0FBQyxTQUFTLEdBOEJqRDtrQkE5Qm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZVNvcnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBjaGlsZHJlbjogY2MuTm9kZVtdO1xuICAgIHByaXZhdGUgY1Q6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBjTDogbnVtYmVyID0gMTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5jVCArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMuY1QgPj0gdGhpcy5jTCkge1xuICAgICAgICAgICAgdGhpcy5jVCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc29ydChmdW5jdGlvbiAoYTogY2MuTm9kZSwgYjogY2MuTm9kZSk6IG51bWJlciB7XG4gICAgICAgICAgICAgICAgaWYgKGEueSA+IGIueSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnpJbmRleCA9IDEwMDAgKyBpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/homeScene/homeScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '404edzKX+lMA7Ol3dvE0/bm', 'homeScene');
// scripts/homeScene/homeScene.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var soundsManager_1 = require("../common/module/soundsManager");
var startAnim_1 = require("./startAnim");
var gameDataManager_1 = require("../common/module/gameDataManager");
var levelDataManager_1 = require("../common/module/levelDataManager");
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var storageManager_1 = require("../common/module/storageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ConfigFiles = /** @class */ (function () {
    function ConfigFiles() {
        this.gameConfig = null;
        this.levelConfig = null;
    }
    __decorate([
        property({
            type: cc.JsonAsset,
            displayName: "游戏配置"
        })
    ], ConfigFiles.prototype, "gameConfig", void 0);
    __decorate([
        property({
            type: cc.JsonAsset,
            displayName: "关卡配置"
        })
    ], ConfigFiles.prototype, "levelConfig", void 0);
    ConfigFiles = __decorate([
        ccclass("ConfigFiles")
    ], ConfigFiles);
    return ConfigFiles;
}());
var HomeScene = /** @class */ (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.conFigFiles = new ConfigFiles();
        _this.loadingDoorAnim = null;
        _this.startAnim = null;
        _this.isStartGame = false;
        /**
         * 是否点击了这个按钮
         */
        _this.isAboutButton = false;
        /**
         * 第一次进入游戏
         */
        _this.fristEntry = true;
        _this.clips = null;
        return _this;
    }
    HomeScene.prototype.onLoad = function () {
        //初始化 模块
        if (gameDataManager_1.default.getGameConfig() === null) {
            // cc.sys.localStorage.clear();
            storageManager_1.default.init();
            soundsManager_1.default.init();
            gameDataManager_1.default.init(this.conFigFiles.gameConfig.json);
            levelDataManager_1.default.initLevelData(this.conFigFiles.levelConfig.json);
        }
        this.clips = this.startAnim.node.getComponent(cc.Animation).getClips();
    };
    HomeScene.prototype.start = function () {
        console.log("本地数据:", cc.sys.localStorage);
        soundsManager_1.default.ins.curBGM = "sounds/home_scene_bg";
        soundsManager_1.default.ins.playBGM("sounds/home_scene_bg");
        if (this.fristEntry) {
            this.startAnim.logoDown();
            // this.fristEntry = false;
        }
    };
    /**
     * 点击 开始游戏 按钮
     */
    HomeScene.prototype.startGame = function () {
        if (this.isStartGame) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isStartGame = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        this.startAnim.buttonUp();
        var d = cc.delayTime(this.clips[1].duration);
        var func = cc.callFunc(function () {
            this.isStartGame = false;
        }, this);
        var seq = cc.sequence(d, func);
        this.node.runAction(seq);
    };
    HomeScene.prototype.aboutButton = function () {
        if (this.isAboutButton) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isAboutButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("aboutScene");
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    /**
     * 跳转到 选关 场景
     */
    HomeScene.prototype.selectLevelScene = function (usersI) {
        var users = gameDataManager_1.default.getUsers();
        gameDataManager_1.default.setCurrentUser(users[usersI]);
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("selectLevelScene");
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    __decorate([
        property({
            type: ConfigFiles,
            displayName: "游戏配置文件"
        })
    ], HomeScene.prototype, "conFigFiles", void 0);
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], HomeScene.prototype, "loadingDoorAnim", void 0);
    __decorate([
        property({ type: startAnim_1.default })
    ], HomeScene.prototype, "startAnim", void 0);
    HomeScene = __decorate([
        ccclass
    ], HomeScene);
    return HomeScene;
}(cc.Component));
exports.default = HomeScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2hvbWVTY2VuZS9ob21lU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTBEO0FBQzFELHlDQUFvQztBQUNwQyxvRUFBK0Q7QUFFL0Qsc0VBQWdFO0FBQ2hFLHFGQUFnRjtBQUNoRixrRUFBNkQ7QUFFdkQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBQTtRQUtJLGVBQVUsR0FBaUIsSUFBSSxDQUFDO1FBTWhDLGdCQUFXLEdBQWlCLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBUEc7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVM7WUFDbEIsV0FBVyxFQUFFLE1BQU07U0FDdEIsQ0FBQzttREFDOEI7SUFNaEM7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVM7WUFDbEIsV0FBVyxFQUFFLE1BQU07U0FDdEIsQ0FBQztvREFDK0I7SUFYL0IsV0FBVztRQURoQixPQUFPLENBQUMsYUFBYSxDQUFDO09BQ2pCLFdBQVcsQ0FZaEI7SUFBRCxrQkFBQztDQVpELEFBWUMsSUFBQTtBQUdEO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBK0ZDO1FBekZXLGlCQUFXLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFHN0MscUJBQWUsR0FBb0IsSUFBSSxDQUFDO1FBR3hDLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFFNUIsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFDckM7O1dBRUc7UUFDSyxtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUN2Qzs7V0FFRztRQUNILGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBQ25CLFdBQUssR0FBdUIsSUFBSSxDQUFDOztJQXdFN0MsQ0FBQztJQXZFRywwQkFBTSxHQUFOO1FBQ0ksUUFB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QixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMseUJBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUF4RkQ7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsV0FBVztZQUNqQixXQUFXLEVBQUUsUUFBUTtTQUN4QixDQUFDO2tEQUNtRDtJQUdyRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBZSxFQUFFLENBQUM7c0RBQ1k7SUFHaEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQVMsRUFBRSxDQUFDO2dEQUNNO0lBWm5CLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0ErRjdCO0lBQUQsZ0JBQUM7Q0EvRkQsQUErRkMsQ0EvRnNDLEVBQUUsQ0FBQyxTQUFTLEdBK0ZsRDtrQkEvRm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCJcbmltcG9ydCBTdGFydEFuaW0gZnJvbSBcIi4vc3RhcnRBbmltXCI7XG5pbXBvcnQgR2FtZURhdGFTdG9yYWdlIGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9jb21tb24vbW9kdWxlL2dhbWVEYXRhTWFuYWdlclwiXG5pbXBvcnQgTGV2ZWxEYXRhTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9sZXZlbERhdGFNYW5hZ2VyXCJcbmltcG9ydCBMb2FkaW5nRG9vckFuaW0gZnJvbSBcIi4uLy4uL3Jlcy9wcmVmYWJzL2xvYWRpbmdEb29yQW5pbS9sb2FkaW5nRG9vckFuaW1cIjtcbmltcG9ydCBTdG9yYWdlTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zdG9yYWdlTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzcyhcIkNvbmZpZ0ZpbGVzXCIpXG5jbGFzcyBDb25maWdGaWxlcyB7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuSnNvbkFzc2V0LFxuICAgICAgICBkaXNwbGF5TmFtZTogXCLmuLjmiI/phY3nva5cIlxuICAgIH0pXG4gICAgZ2FtZUNvbmZpZzogY2MuSnNvbkFzc2V0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLkpzb25Bc3NldCxcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5YWz5Y2h6YWN572uXCJcbiAgICB9KVxuICAgIGxldmVsQ29uZmlnOiBjYy5Kc29uQXNzZXQgPSBudWxsO1xufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IENvbmZpZ0ZpbGVzLFxuICAgICAgICBkaXNwbGF5TmFtZTogXCLmuLjmiI/phY3nva7mlofku7ZcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBjb25GaWdGaWxlczogQ29uZmlnRmlsZXMgPSBuZXcgQ29uZmlnRmlsZXMoKTtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExvYWRpbmdEb29yQW5pbSB9KVxuICAgIHByaXZhdGUgbG9hZGluZ0Rvb3JBbmltOiBMb2FkaW5nRG9vckFuaW0gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogU3RhcnRBbmltIH0pXG4gICAgcHJpdmF0ZSBzdGFydEFuaW06IFN0YXJ0QW5pbSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzU3RhcnRHYW1lOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5piv5ZCm54K55Ye75LqG6L+Z5Liq5oyJ6ZKuXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc0Fib3V0QnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog56ys5LiA5qyh6L+b5YWl5ri45oiPXG4gICAgICovXG4gICAgZnJpc3RFbnRyeTogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBjbGlwczogY2MuQW5pbWF0aW9uQ2xpcFtdID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8v5Yid5aeL5YyWIOaooeWdl1xuICAgICAgICBpZiAoR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgU3RvcmFnZU1hbmFnZXIuaW5pdCgpO1xuICAgICAgICAgICAgU291bmRzTWFuYWdlci5pbml0KCk7XG4gICAgICAgICAgICBHYW1lRGF0YVN0b3JhZ2UuaW5pdCh0aGlzLmNvbkZpZ0ZpbGVzLmdhbWVDb25maWcuanNvbik7XG4gICAgICAgICAgICBMZXZlbERhdGFNYW5hZ2VyLmluaXRMZXZlbERhdGEodGhpcy5jb25GaWdGaWxlcy5sZXZlbENvbmZpZy5qc29uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xpcHMgPSB0aGlzLnN0YXJ0QW5pbS5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLmdldENsaXBzKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pys5Zyw5pWw5o2uOlwiLCBjYy5zeXMubG9jYWxTdG9yYWdlKTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5jdXJCR00gPSBcInNvdW5kcy9ob21lX3NjZW5lX2JnXCI7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlCR00oXCJzb3VuZHMvaG9tZV9zY2VuZV9iZ1wiKTtcbiAgICAgICAgaWYgKHRoaXMuZnJpc3RFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydEFuaW0ubG9nb0Rvd24oKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZnJpc3RFbnRyeSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7sg5byA5aeL5ri45oiPIOaMiemSrlxuICAgICAqL1xuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdGFydEdhbWUpIC8v5L+d6K+B5pKt5pS+5byA6Zeo5Yqo55S75pyf6Ze077yM5oyJ5byA5aeL5ri45oiP5oyJ6ZKuIOS4jemHjeWkjeW8gOmXqFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzU3RhcnRHYW1lID0gdHJ1ZTtcbiAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbGlja1wiKTtcbiAgICAgICAgdGhpcy5zdGFydEFuaW0uYnV0dG9uVXAoKTtcblxuICAgICAgICBsZXQgZDogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5kZWxheVRpbWUodGhpcy5jbGlwc1sxXS5kdXJhdGlvbik7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0YXJ0R2FtZSA9IGZhbHNlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShkLCBmdW5jKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH1cblxuICAgIGFib3V0QnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Fib3V0QnV0dG9uKSAvL+S/neivgeaSreaUvuW8gOmXqOWKqOeUu+acn+mXtO+8jOaMieW8gOWni+a4uOaIj+aMiemSriDkuI3ph43lpI3lvIDpl6hcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0Fib3V0QnV0dG9uID0gdHJ1ZTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuICAgICAgICBsZXQgZnVuYzogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImFib3V0U2NlbmVcIik7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5jbG9zZURvb3IoZnVuYyk7XG5cbiAgICAgICAgR2FtZURhdGFTdG9yYWdlLnByZXNlcnZlR2FtZURhdGEoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDot7PovazliLAg6YCJ5YWzIOWcuuaZr1xuICAgICAqL1xuICAgIHNlbGVjdExldmVsU2NlbmUodXNlcnNJOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHVzZXJzOiBVc2VyW10gPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0VXNlcnMoKTtcbiAgICAgICAgR2FtZURhdGFTdG9yYWdlLnNldEN1cnJlbnRVc2VyKHVzZXJzW3VzZXJzSV0pXG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlFZmZlY3QoXCJzb3VuZHMvY2xpY2tcIik7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwic2VsZWN0TGV2ZWxTY2VuZVwiKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubG9hZGluZ0Rvb3JBbmltLmNsb3NlRG9vcihmdW5jKTtcblxuICAgICAgICBHYW1lRGF0YVN0b3JhZ2UucHJlc2VydmVHYW1lRGF0YSgpO1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/module/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c81achqaJRGE79sgbdiAK1F', 'utils');
// scripts/common/module/utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Gets random number
     * @param min
     * @param max
     * @returns [min, max]: Interger
     */
    Utils.getRandomInterger = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    Utils.remvoeItemOfArray = function (array, item) {
        var i = array.indexOf(item);
        array.splice(i, 1);
    };
    /**
     * 2点间的距离，注意同一节点坐标
     */
    Utils.getDisOfTwoPos = function (p1, p2) {
        var l = p1.sub(p2).mag();
        return l;
    };
    return Utils;
}());
exports.default = Utils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb2R1bGUvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBMEJBLENBQUM7SUF2Qkc7Ozs7O09BS0c7SUFDSSx1QkFBaUIsR0FBeEIsVUFBeUIsR0FBVyxFQUFFLEdBQVc7UUFDN0MsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLHVCQUFpQixHQUF4QixVQUF5QixLQUFZLEVBQUUsSUFBUztRQUM1QyxJQUFJLENBQUMsR0FBVyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLG9CQUFjLEdBQXJCLFVBQXNCLEVBQVcsRUFBRSxFQUFXO1FBQzFDLElBQUksQ0FBQyxHQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakMsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUwsWUFBQztBQUFELENBMUJBLEFBMEJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgcmFuZG9tIG51bWJlclxuICAgICAqIEBwYXJhbSBtaW4gXG4gICAgICogQHBhcmFtIG1heCBcbiAgICAgKiBAcmV0dXJucyBbbWluLCBtYXhdOiBJbnRlcmdlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UmFuZG9tSW50ZXJnZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbXZvZUl0ZW1PZkFycmF5KGFycmF5OiBhbnlbXSwgaXRlbTogYW55KSB7XG4gICAgICAgIGxldCBpOiBudW1iZXIgPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogMueCuemXtOeahOi3neemu++8jOazqOaEj+WQjOS4gOiKgueCueWdkOagh1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXREaXNPZlR3b1BvcyhwMTogY2MuVmVjMiwgcDI6IGNjLlZlYzIpOiBudW1iZXIge1xuICAgICAgICBsZXQgbDogbnVtYmVyID0gcDEuc3ViKHAyKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIGw7XG4gICAgfVxuXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/creature.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eff2dfpDpVJZIVXft5Z35uY', 'creature');
// scripts/levelScene/creature.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var frameAnimation_1 = require("../common/frameAnimation");
var utils_1 = require("../common/module/utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Creature = /** @class */ (function (_super) {
    __extends(Creature, _super);
    function Creature() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* 属性 */
        _this.cHP = null;
        _this.maxHp = null;
        _this.speedOfMove = null;
        _this.intervalOfAttack = null;
        _this.aggressivity = null;
        _this.rangeOfAttack = null;
        _this.rangeOfInvestigate = null;
        _this.intervalOfThink = 1;
        /* 引用对象 */
        _this.bloodBar = null;
        _this.frameAnim = null;
        _this.combatLogic = null;
        _this._move = null;
        /* 控制 */
        _this.isAlive = false;
        _this.isTracking = false;
        _this.isAttacking = false;
        _this.isNonComState = false;
        return _this;
    }
    Creature.prototype.initCreature = function () {
        this.isTracking = false;
        this.isAttacking = false;
        //刚出生，还没执行非战斗行为
        this.isNonComState = null;
        this.isAlive = true;
    };
    /**
     * 只进行移动,移除其他Action
     * @param des 世界
     * @returns 方向
     */
    Creature.prototype.move = function (des, func, t) {
        if (func === void 0) { func = null; }
        if (t === void 0) { t = null; }
        var dnp = this.node.parent.convertToNodeSpaceAR(des);
        var cnp = this.node.getPosition();
        var dis = dnp.sub(cnp);
        if (t === null) {
            var l = dis.mag();
            t = l / this.speedOfMove;
        }
        this._move.moveTo(dis, t, func);
    };
    /**
     * 播放死亡动画,会移除当前的所有行为
     */
    Creature.prototype.playDie = function (frames, func) {
        if (func === void 0) { func = null; }
        if (this.isNonComState)
            this.stopNonComLogic();
        else if (this.isAttacking)
            this.frameAnim.stop();
        else if (this.isTracking)
            this.stopTrack();
        this.frameAnim.setFrameArray(frames);
        this.frameAnim.play(false, false, false, function () {
            var fOut = cc.fadeOut(1);
            var f = cc.callFunc(func);
            this.node.runAction(cc.sequence(fOut, f));
        }.bind(this));
    };
    /**
     * 设置该生物死亡并从存活记录集中移除
     * @param creatures 该生物存在的集
     */
    Creature.prototype.die = function (creatures, self) {
        this.isAlive = false;
        utils_1.default.remvoeItemOfArray(creatures, self);
    };
    /**
     * @param des 目的地 世界
     */
    Creature.prototype.updateDir = function (des) {
        var cwp = this.getWPos();
        if (des.x > cwp.x)
            this.node.scaleX = 1;
        else
            this.node.scaleX = -1;
    };
    /**
     * 得到其世界坐标
     */
    Creature.prototype.getWPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
    };
    /**
     * 受到伤害
     */
    Creature.prototype.injure = function (v) {
        if (this.cHP === 0)
            return;
        this.cHP -= v;
        if (this.cHP < 0)
            this.cHP = 0;
    };
    /**
     * 更新血条显示
     */
    Creature.prototype.refreshBloodBar = function () {
        var r = this.cHP / this.maxHp;
        this.bloodBar.progress = r;
    };
    Creature.prototype.update = function (dt) {
        if (!this.isAlive)
            return;
        this.combatLogic.think();
        this._move.refreshMove(dt);
        this.refreshState();
    };
    __decorate([
        property({ type: cc.ProgressBar })
    ], Creature.prototype, "bloodBar", void 0);
    __decorate([
        property({ type: frameAnimation_1.default })
    ], Creature.prototype, "frameAnim", void 0);
    Creature = __decorate([
        ccclass
    ], Creature);
    return Creature;
}(cc.Component));
exports.default = Creature;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvY3JlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBR3RELGdEQUEyQztBQUVyQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQyw0QkFBWTtJQUEzRDtRQUFBLHFFQW1KQztRQWpKRyxRQUFRO1FBQ0UsU0FBRyxHQUFXLElBQUksQ0FBQztRQUNuQixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLHNCQUFnQixHQUFXLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFXLElBQUksQ0FBQztRQUN0QyxtQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3Qix3QkFBa0IsR0FBVyxJQUFJLENBQUM7UUFDeEIscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFFdEMsVUFBVTtRQUVBLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBR2hDLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBRWpDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxXQUFLLEdBQVMsSUFBSSxDQUFDO1FBRzdCLFFBQVE7UUFDRSxhQUFPLEdBQVksS0FBSyxDQUFDO1FBQ25DLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLG1CQUFhLEdBQVksS0FBSyxDQUFDOztJQXdIbkMsQ0FBQztJQXRIYSwrQkFBWSxHQUF0QjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGVBQWU7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJ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QUFHLEdBQUcsQ0FBQztZQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNPLGtDQUFlLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBaUJELHlCQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ2IsT0FBTztRQUVYLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFwSUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOzhDQUNPO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLHdCQUFjLEVBQUUsQ0FBQzsrQ0FDUTtJQWpCakIsUUFBUTtRQURyQyxPQUFPO09BQ3NCLFFBQVEsQ0FtSnJDO0lBQUQsZUFBQztDQW5KRCxBQW1KQyxDQW5KOEMsRUFBRSxDQUFDLFNBQVMsR0FtSjFEO2tCQW5KNkIsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGcmFtZUFuaW1hdGlvbiBmcm9tIFwiLi4vY29tbW9uL2ZyYW1lQW5pbWF0aW9uXCI7XG5pbXBvcnQgQ29tYmF0TG9naWMgZnJvbSBcIi4vY29tYmF0TG9naWNcIjtcbmltcG9ydCBNb3ZlIGZyb20gXCIuLi9jb21tb24vbW92ZVwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9jb21tb24vbW9kdWxlL3V0aWxzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDcmVhdHVyZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvKiDlsZ7mgKcgKi9cbiAgICBwcm90ZWN0ZWQgY0hQOiBudW1iZXIgPSBudWxsO1xuICAgIHByb3RlY3RlZCBtYXhIcDogbnVtYmVyID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgc3BlZWRPZk1vdmU6IG51bWJlciA9IG51bGw7XG4gICAgcHJvdGVjdGVkIGludGVydmFsT2ZBdHRhY2s6IG51bWJlciA9IG51bGw7XG4gICAgcHJvdGVjdGVkIGFnZ3Jlc3Npdml0eTogbnVtYmVyID0gbnVsbDtcbiAgICByYW5nZU9mQXR0YWNrOiBudW1iZXIgPSBudWxsO1xuICAgIHJhbmdlT2ZJbnZlc3RpZ2F0ZTogbnVtYmVyID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgaW50ZXJ2YWxPZlRoaW5rOiBudW1iZXIgPSAxO1xuXG4gICAgLyog5byV55So5a+56LGhICovXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJvZ3Jlc3NCYXIgfSlcbiAgICBwcm90ZWN0ZWQgYmxvb2RCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IEZyYW1lQW5pbWF0aW9uIH0pXG4gICAgcHJvdGVjdGVkIGZyYW1lQW5pbTogRnJhbWVBbmltYXRpb24gPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIGNvbWJhdExvZ2ljOiBDb21iYXRMb2dpYyA9IG51bGw7XG4gICAgcHJvdGVjdGVkIF9tb3ZlOiBNb3ZlID0gbnVsbDtcblxuXG4gICAgLyog5o6n5Yi2ICovXG4gICAgcHJvdGVjdGVkIGlzQWxpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1RyYWNraW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNBdHRhY2tpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc05vbkNvbVN0YXRlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcm90ZWN0ZWQgaW5pdENyZWF0dXJlKCkge1xuICAgICAgICB0aGlzLmlzVHJhY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0F0dGFja2luZyA9IGZhbHNlO1xuICAgICAgICAvL+WImuWHuueUn++8jOi/mOayoeaJp+ihjOmdnuaImOaWl+ihjOS4ulxuICAgICAgICB0aGlzLmlzTm9uQ29tU3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLmlzQWxpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB3YWxrKGRlczogY2MuVmVjMiwgZnVuYzogRnVuY3Rpb24pO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBzdG9wV2FsaygpO1xuICAgIC8qKlxuICAgICAqIOWPqui/m+ihjOenu+WKqCznp7vpmaTlhbbku5ZBY3Rpb25cbiAgICAgKiBAcGFyYW0gZGVzIOS4lueVjFxuICAgICAqIEByZXR1cm5zIOaWueWQkVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBtb3ZlKGRlczogY2MuVmVjMiwgZnVuYzogRnVuY3Rpb24gPSBudWxsLCB0OiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGxldCBkbnA6IGNjLlZlYzIgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGRlcyk7XG4gICAgICAgIGxldCBjbnA6IGNjLlZlYzIgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IGRpczogY2MuVmVjMiA9IGRucC5zdWIoY25wKTtcbiAgICAgICAgaWYgKHQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsOiBudW1iZXIgPSBkaXMubWFnKCk7XG4gICAgICAgICAgICB0ID0gbCAvIHRoaXMuc3BlZWRPZk1vdmU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuX21vdmUubW92ZVRvKGRpcywgdCwgZnVuYyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7mrbvkuqHliqjnlLss5Lya56e76Zmk5b2T5YmN55qE5omA5pyJ6KGM5Li6XG4gICAgICovXG4gICAgcHJvdGVjdGVkIHBsYXlEaWUoZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdLCBmdW5jOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOb25Db21TdGF0ZSlcbiAgICAgICAgICAgIHRoaXMuc3RvcE5vbkNvbUxvZ2ljKCk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNBdHRhY2tpbmcpXG4gICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5zdG9wKCk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNUcmFja2luZylcbiAgICAgICAgICAgIHRoaXMuc3RvcFRyYWNrKCk7XG5cbiAgICAgICAgdGhpcy5mcmFtZUFuaW0uc2V0RnJhbWVBcnJheShmcmFtZXMpO1xuICAgICAgICB0aGlzLmZyYW1lQW5pbS5wbGF5KGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBmT3V0OiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmZhZGVPdXQoMSk7XG4gICAgICAgICAgICBsZXQgZjogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShmT3V0LCBmKSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u6K+l55Sf54mp5q275Lqh5bm25LuO5a2Y5rS76K6w5b2V6ZuG5Lit56e76ZmkXG4gICAgICogQHBhcmFtIGNyZWF0dXJlcyDor6XnlJ/nianlrZjlnKjnmoTpm4ZcbiAgICAgKi9cbiAgICBkaWUoY3JlYXR1cmVzOiBhbnlbXSwgc2VsZikge1xuICAgICAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgICAgICAgVXRpbHMucmVtdm9lSXRlbU9mQXJyYXkoY3JlYXR1cmVzLCBzZWxmKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGVzIOebrueahOWcsCDkuJbnlYwgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHVwZGF0ZURpcihkZXM6IGNjLlZlYzIpIHtcbiAgICAgICAgbGV0IGN3cDogY2MuVmVjMiA9IHRoaXMuZ2V0V1BvcygpO1xuICAgICAgICBpZiAoZGVzLnggPiBjd3AueClcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5b6X5Yiw5YW25LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHVibGljIGdldFdQb3MoKTogY2MuVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+X5Yiw5Lyk5a6zXG4gICAgICovXG4gICAgaW5qdXJlKHY6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5jSFAgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jSFAgLT0gdjtcbiAgICAgICAgaWYgKHRoaXMuY0hQIDwgMClcbiAgICAgICAgICAgIHRoaXMuY0hQID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDooYDmnaHmmL7npLpcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgcmVmcmVzaEJsb29kQmFyKCkge1xuICAgICAgICBsZXQgcjogbnVtYmVyID0gdGhpcy5jSFAgLyB0aGlzLm1heEhwO1xuICAgICAgICB0aGlzLmJsb29kQmFyLnByb2dyZXNzID0gcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVmcmVzaFN0YXRlKCk7XG5cbiAgICBhYnN0cmFjdCByZWxlYXNlU2VsZigpO1xuXG4gICAgLyoqXG4gICAgICogVHJhY2tzIGNyZWF0dXJlXG4gICAgICogQHBhcmFtIHBvcyAg5LiW55WMXG4gICAgICovXG4gICAgYWJzdHJhY3QgdHJhY2socG9zOiBjYy5WZWMyKTtcbiAgICBhYnN0cmFjdCBzdG9wVHJhY2soKTtcbiAgICBhYnN0cmFjdCByZWZyZXNoVHJhY2tUYXJnZXQocG9zOiBjYy5WZWMyKTtcbiAgICBhYnN0cmFjdCBhdHRhY2sobTogQ3JlYXR1cmUpO1xuICAgIGFic3RyYWN0IG5vbkNvbUxvZ2ljKCk7XG4gICAgYWJzdHJhY3Qgc3RvcE5vbkNvbUxvZ2ljKCk7XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWxpdmUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jb21iYXRMb2dpYy50aGluaygpO1xuICAgICAgICB0aGlzLl9tb3ZlLnJlZnJlc2hNb3ZlKGR0KTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3RhdGUoKTtcbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/homeScene/startAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd84c7vw3itCJZgQAZ79g8CH', 'startAnim');
// scripts/homeScene/startAnim.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var soundsManager_1 = require("../common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StartAnim = /** @class */ (function (_super) {
    __extends(StartAnim, _super);
    function StartAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.isButtonDown = false;
        _this.clips = null;
        return _this;
        // update (dt) {}
    }
    StartAnim.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
        this.clips = this.animation.getClips();
    };
    StartAnim.prototype.start = function () {
    };
    /**
     * startAnim下落的动画
     */
    StartAnim.prototype.logoDown = function () {
        this.animation.play("homeSceneStart");
    };
    /**
     * 播放按钮上收的动画
     */
    StartAnim.prototype.buttonUp = function () {
        this.animation.play("buttonUp");
    };
    StartAnim.prototype.buttonDown = function () {
        if (this.isButtonDown)
            return;
        this.isButtonDown = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        this.animation.play("buttonDown");
        var d = cc.delayTime(this.clips[2].duration);
        var func = cc.callFunc(function () {
            this.isButtonDown = false;
        }, this);
        var seq = cc.sequence(d, func);
        this.node.runAction(seq);
    };
    StartAnim = __decorate([
        ccclass
    ], StartAnim);
    return StartAnim;
}(cc.Component));
exports.default = StartAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2hvbWVTY2VuZS9zdGFydEFuaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBK0NDO1FBN0NXLGVBQVMsR0FBaUIsSUFBSSxDQUFDO1FBQy9CLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLFdBQUssR0FBdUIsSUFBSSxDQUFDOztRQTBDekMsaUJBQWlCO0lBQ3JCLENBQUM7SUExQ0csMEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQseUJBQUssR0FBTDtJQUNBLENBQUM7SUFFRDs7T0FFRztJQUNILDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxDQUFDLFlBQVk7WUFDakIsT0FBTztRQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLHVCQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsR0FBc0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxHQUFxQixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULElBQUksR0FBRyxHQUFzQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBekNnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBK0M3QjtJQUFELGdCQUFDO0NBL0NELEFBK0NDLENBL0NzQyxFQUFFLENBQUMsU0FBUyxHQStDbEQ7a0JBL0NvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNvdW5kc01hbmFnZXIgZnJvbSBcIi4uL2NvbW1vbi9tb2R1bGUvc291bmRzTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRBbmltIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIHByaXZhdGUgYW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgaXNCdXR0b25Eb3duOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBjbGlwczogY2MuQW5pbWF0aW9uQ2xpcFtdID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLmNsaXBzID0gdGhpcy5hbmltYXRpb24uZ2V0Q2xpcHMoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzdGFydEFuaW3kuIvokL3nmoTliqjnlLtcbiAgICAgKi9cbiAgICBsb2dvRG93bigpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShcImhvbWVTY2VuZVN0YXJ0XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvuaMiemSruS4iuaUtueahOWKqOeUuyBcbiAgICAgKi9cbiAgICBidXR0b25VcCgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShcImJ1dHRvblVwXCIpO1xuICAgIH1cblxuICAgIGJ1dHRvbkRvd24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQnV0dG9uRG93bilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0J1dHRvbkRvd24gPSB0cnVlO1xuXG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlFZmZlY3QoXCJzb3VuZHMvY2xpY2tcIik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJidXR0b25Eb3duXCIpO1xuXG4gICAgICAgIGxldCBkOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLmRlbGF5VGltZSh0aGlzLmNsaXBzWzJdLmR1cmF0aW9uKTtcbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnV0dG9uRG93biA9IGZhbHNlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShkLCBmdW5jKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH1cblxuXG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/combatLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e10f6wa86tCgJoy21R6dWZQ', 'combatLogic');
// scripts/levelScene/combatLogic.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CombatLogic = /** @class */ (function () {
    function CombatLogic(host, enemys) {
        this.host = null;
        this.enemys = null;
        this.host = host;
        this.enemys = enemys;
    }
    /**
     * Thinks combat logic
     */
    CombatLogic.prototype.think = function () {
        var eOfMinDis = this.getEnemyOfMinDis();
        if (eOfMinDis === null) {
            if (this.host.isTracking) {
                this.host.stopTrack();
                this.host.nonComLogic();
            }
            else if (!this.host.isNonComState)
                this.host.nonComLogic();
            return;
        }
        var e = eOfMinDis[0];
        var l = eOfMinDis[1];
        if (l <= this.host.rangeOfAttack) {
            if (this.host.isTracking) {
                this.host.stopTrack();
                this.host.attack(e);
            }
            else if (!this.host.isAttacking)
                this.host.attack(e);
        }
        else if (l <= this.host.rangeOfInvestigate) {
            if (this.host.isNonComState) {
                this.host.stopNonComLogic();
                this.host.track(e.getWPos());
            }
            else if (this.host.isNonComState === null) {
                this.host.isNonComState = false;
                this.host.track(e.getWPos());
            }
            else if (this.host.isTracking)
                this.host.refreshTrackTarget(e.getWPos());
            else if (this.host.isAttacking)
                return;
            else
                this.host.track(e.getWPos());
        }
        else if (!this.host.isNonComState)
            this.host.nonComLogic();
    };
    /**
     * 得到离宿主最近的敌人
     */
    CombatLogic.prototype.getEnemyOfMinDis = function () {
        if (this.enemys.length === 0)
            return null;
        var minE = this.enemys[0];
        var cp = this.host.node.getPosition();
        var ep = minE.node.getPosition();
        var minL = cp.sub(ep).mag();
        for (var i = 1; i < this.enemys.length; i++) {
            var e = this.enemys[i];
            ep = e.node.getPosition();
            var l = cp.sub(ep).mag();
            if (l < minL) {
                minL = l;
                minE = e;
            }
        }
        return [minE, minL];
    };
    return CombatLogic;
}());
exports.default = CombatLogic;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvY29tYmF0TG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUtJLHFCQUFZLElBQWMsRUFBRSxNQUFrQjtRQUh0QyxTQUFJLEdBQWEsSUFBSSxDQUFDO1FBQ3RCLFdBQU0sR0FBZSxJQUFJLENBQUM7UUFHOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMkJBQUssR0FBTDtRQUNJLElBQUksU0FBUyxHQUF1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1RCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMzQjtpQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTVCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxHQUFhLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBVyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkI7aUJBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7YUFDSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUN6QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDMUIsT0FBTzs7Z0JBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDcEM7YUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNEOztPQUVHO0lBQ0ssc0NBQWdCLEdBQXhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1FBRWhCLElBQUksSUFBSSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsSUFBSSxFQUFFLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsR0FBYSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO2dCQUNWLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUNaO1NBQ0o7UUFDRCxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBOUVBLEFBOEVDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ3JlYXR1cmUgZnJvbSBcIi4vY3JlYXR1cmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tYmF0TG9naWMge1xuXG4gICAgcHJpdmF0ZSBob3N0OiBDcmVhdHVyZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBlbmVteXM6IENyZWF0dXJlW10gPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoaG9zdDogQ3JlYXR1cmUsIGVuZW15czogQ3JlYXR1cmVbXSkge1xuICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICB0aGlzLmVuZW15cyA9IGVuZW15cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlua3MgY29tYmF0IGxvZ2ljXG4gICAgICovXG4gICAgdGhpbmsoKSB7XG4gICAgICAgIGxldCBlT2ZNaW5EaXM6IFtDcmVhdHVyZSwgbnVtYmVyXSA9IHRoaXMuZ2V0RW5lbXlPZk1pbkRpcygpO1xuICAgICAgICBpZiAoZU9mTWluRGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0LmlzVHJhY2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3Quc3RvcFRyYWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0Lm5vbkNvbUxvZ2ljKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5ob3N0LmlzTm9uQ29tU3RhdGUpXG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0Lm5vbkNvbUxvZ2ljKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlOiBDcmVhdHVyZSA9IGVPZk1pbkRpc1swXTtcbiAgICAgICAgbGV0IGw6IG51bWJlciA9IGVPZk1pbkRpc1sxXTtcblxuICAgICAgICBpZiAobCA8PSB0aGlzLmhvc3QucmFuZ2VPZkF0dGFjaykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9zdC5pc1RyYWNraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LnN0b3BUcmFjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9zdC5hdHRhY2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5ob3N0LmlzQXR0YWNraW5nKVxuICAgICAgICAgICAgICAgIHRoaXMuaG9zdC5hdHRhY2soZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobCA8PSB0aGlzLmhvc3QucmFuZ2VPZkludmVzdGlnYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0LmlzTm9uQ29tU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3Quc3RvcE5vbkNvbUxvZ2ljKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LnRyYWNrKGUuZ2V0V1BvcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaG9zdC5pc05vbkNvbVN0YXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LmlzTm9uQ29tU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3QudHJhY2soZS5nZXRXUG9zKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ob3N0LmlzVHJhY2tpbmcpXG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0LnJlZnJlc2hUcmFja1RhcmdldChlLmdldFdQb3MoKSk7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhvc3QuaXNBdHRhY2tpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuaG9zdC50cmFjayhlLmdldFdQb3MoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXRoaXMuaG9zdC5pc05vbkNvbVN0YXRlKVxuICAgICAgICAgICAgdGhpcy5ob3N0Lm5vbkNvbUxvZ2ljKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW+l+WIsOemu+Wuv+S4u+acgOi/keeahOaVjOS6ulxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0RW5lbXlPZk1pbkRpcygpOiBbQ3JlYXR1cmUsIG51bWJlcl0ge1xuICAgICAgICBpZiAodGhpcy5lbmVteXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IG1pbkU6IENyZWF0dXJlID0gdGhpcy5lbmVteXNbMF07XG4gICAgICAgIGxldCBjcDogY2MuVmVjMiA9IHRoaXMuaG9zdC5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBlcDogY2MuVmVjMiA9IG1pbkUubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgbWluTDogbnVtYmVyID0gY3Auc3ViKGVwKS5tYWcoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmVuZW15cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGU6IENyZWF0dXJlID0gdGhpcy5lbmVteXNbaV07XG4gICAgICAgICAgICBlcCA9IGUubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgbGV0IGw6IG51bWJlciA9IGNwLnN1YihlcCkubWFnKCk7XG4gICAgICAgICAgICBpZiAobCA8IG1pbkwpIHtcbiAgICAgICAgICAgICAgICBtaW5MID0gbDtcbiAgICAgICAgICAgICAgICBtaW5FID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW21pbkUsIG1pbkxdO1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/settlementFace.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '601cciYBP1PXJgBEnFR6ZHv', 'settlementFace');
// scripts/levelScene/settlementFace.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var starReview_1 = require("../common/starReview");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SettlementFace = /** @class */ (function (_super) {
    __extends(SettlementFace, _super);
    function SettlementFace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failFace = null;
        _this.passFace = null;
        _this.starReview = null;
        return _this;
    }
    SettlementFace.prototype.start = function () {
    };
    SettlementFace.prototype.outFailFace = function () {
        this.outFace(this.failFace);
    };
    SettlementFace.prototype.hiddenFailFace = function () {
        this.hiddenFace(this.failFace);
    };
    SettlementFace.prototype.outPassFace = function (g) {
        this.starReview.setReview(g);
        this.outFace(this.passFace);
    };
    SettlementFace.prototype.hiddenPassFace = function () {
        this.hiddenFace(this.passFace);
    };
    SettlementFace.prototype.hiddenSettleFace = function () {
        if (this.failFace.active)
            this.hiddenFailFace();
        if (this.passFace.active)
            this.hiddenPassFace();
    };
    SettlementFace.prototype.outFace = function (node) {
        node.active = true;
        node.runAction(cc.fadeIn(0.2));
        this.scheduleOnce(function () {
            cc.director.pause();
        }, 0.2);
    };
    SettlementFace.prototype.hiddenFace = function (node) {
        cc.director.resume();
        node.runAction(cc.fadeOut(0.2));
        this.scheduleOnce(function () {
            node.active = false;
        }.bind(this), 0.2);
    };
    __decorate([
        property({ type: cc.Node })
    ], SettlementFace.prototype, "failFace", void 0);
    __decorate([
        property({ type: cc.Node })
    ], SettlementFace.prototype, "passFace", void 0);
    __decorate([
        property({ type: starReview_1.default })
    ], SettlementFace.prototype, "starReview", void 0);
    SettlementFace = __decorate([
        ccclass
    ], SettlementFace);
    return SettlementFace;
}(cc.Component));
exports.default = SettlementFace;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvc2V0dGxlbWVudEZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBc0RDO1FBbkRXLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFlLElBQUksQ0FBQzs7SUE2QzFDLENBQUM7SUEzQ0csOEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNPLHVDQUFjLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxDQUFTO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTyx1Q0FBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFTyxnQ0FBTyxHQUFmLFVBQWdCLElBQWE7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsQ0FBQztJQUVPLG1DQUFVLEdBQWxCLFVBQW1CLElBQWE7UUFDNUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBakREO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvREFDSztJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7b0RBQ0s7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRSxDQUFDO3NEQUNPO0lBVHJCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FzRGxDO0lBQUQscUJBQUM7Q0F0REQsQUFzREMsQ0F0RDJDLEVBQUUsQ0FBQyxTQUFTLEdBc0R2RDtrQkF0RG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RhclJldmlldyBmcm9tIFwiLi4vY29tbW9uL3N0YXJSZXZpZXdcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRsZW1lbnRGYWNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIGZhaWxGYWNlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIHBhc3NGYWNlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFN0YXJSZXZpZXcgfSlcbiAgICBwcml2YXRlIHN0YXJSZXZpZXc6IFN0YXJSZXZpZXcgPSBudWxsO1xuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBvdXRGYWlsRmFjZSgpIHtcbiAgICAgICAgdGhpcy5vdXRGYWNlKHRoaXMuZmFpbEZhY2UpO1xuICAgIH1cbiAgICBwcml2YXRlIGhpZGRlbkZhaWxGYWNlKCkge1xuICAgICAgICB0aGlzLmhpZGRlbkZhY2UodGhpcy5mYWlsRmFjZSk7XG4gICAgfVxuXG4gICAgb3V0UGFzc0ZhY2UoZzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RhclJldmlldy5zZXRSZXZpZXcoZyk7XG4gICAgICAgIHRoaXMub3V0RmFjZSh0aGlzLnBhc3NGYWNlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBoaWRkZW5QYXNzRmFjZSgpIHtcbiAgICAgICAgdGhpcy5oaWRkZW5GYWNlKHRoaXMucGFzc0ZhY2UpO1xuICAgIH1cblxuICAgIGhpZGRlblNldHRsZUZhY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmZhaWxGYWNlLmFjdGl2ZSlcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuRmFpbEZhY2UoKTtcbiAgICAgICAgaWYgKHRoaXMucGFzc0ZhY2UuYWN0aXZlKVxuICAgICAgICAgICAgdGhpcy5oaWRkZW5QYXNzRmFjZSgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvdXRGYWNlKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4yKSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XG4gICAgICAgIH0sIDAuMilcbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGRlbkZhY2Uobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2MuZmFkZU91dCgwLjIpKVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcyksIDAuMik7XG4gICAgfVxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/V_gameState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2923afG7tNMVZBvUd6/RnLm', 'V_gameState');
// scripts/levelScene/V_gameState.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var V_gameState = /** @class */ (function (_super) {
    __extends(V_gameState, _super);
    function V_gameState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hp = null;
        _this.gold = null;
        _this.round = null;
        return _this;
    }
    V_gameState.prototype.setHP = function (hp) {
        this.hp.string = hp.toString();
    };
    V_gameState.prototype.setGold = function (g) {
        this.gold.string = g.toString();
    };
    V_gameState.prototype.setRound = function (curR, maxR) {
        this.round.string = curR + "/" + maxR;
    };
    __decorate([
        property({ type: cc.Label })
    ], V_gameState.prototype, "hp", void 0);
    __decorate([
        property({ type: cc.Label })
    ], V_gameState.prototype, "gold", void 0);
    __decorate([
        property({ type: cc.Label })
    ], V_gameState.prototype, "round", void 0);
    V_gameState = __decorate([
        ccclass
    ], V_gameState);
    return V_gameState;
}(cc.Component));
exports.default = V_gameState;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvVl9nYW1lU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFzQkM7UUFuQlcsUUFBRSxHQUFhLElBQUksQ0FBQztRQUdwQixVQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLFdBQUssR0FBYSxJQUFJLENBQUM7O0lBYW5DLENBQUM7SUFYRywyQkFBSyxHQUFMLFVBQU0sRUFBVTtRQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLENBQVM7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxJQUFZLEVBQUUsSUFBWTtRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBTSxJQUFJLFNBQUksSUFBTSxDQUFDO0lBQzFDLENBQUM7SUFsQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDOzJDQUNEO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs2Q0FDQztJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7OENBQ0U7SUFUZCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBc0IvQjtJQUFELGtCQUFDO0NBdEJELEFBc0JDLENBdEJ3QyxFQUFFLENBQUMsU0FBUyxHQXNCcEQ7a0JBdEJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZfZ2FtZVN0YXRlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsIH0pXG4gICAgcHJpdmF0ZSBocDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwgfSlcbiAgICBwcml2YXRlIGdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsIH0pXG4gICAgcHJpdmF0ZSByb3VuZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgc2V0SFAoaHA6IG51bWJlcikge1xuICAgICAgICB0aGlzLmhwLnN0cmluZyA9IGhwLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgc2V0R29sZChnOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5nb2xkLnN0cmluZyA9IGcudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBzZXRSb3VuZChjdXJSOiBudW1iZXIsIG1heFI6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJvdW5kLnN0cmluZyA9IGAke2N1clJ9LyR7bWF4Un1gO1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/levelManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef3f0LnHIFBe52D+Rwl4IqK', 'levelManager');
// scripts/selecttLevelScene/levelManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../common/module/gameDataManager");
var soundsManager_1 = require("../common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelManager = /** @class */ (function (_super) {
    __extends(LevelManager, _super);
    function LevelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levels = null;
        _this.isLevelButton = false;
        _this.selectLevelScene = null;
        _this.levelEntry = null;
        /**
         * 最大关数
         */
        _this.MaxLevelNum = null;
        return _this;
    }
    LevelManager.prototype.onLoad = function () {
        this.levels = this.node.children;
        this.selectLevelScene = cc.find("Canvas").getComponent("selectLevelScene");
        this.levelEntry = this.levels[this.levels.length - 1];
        this.MaxLevelNum = gameDataManager_1.default.getGameConfig().getLevelsSum();
    };
    LevelManager.prototype.start = function () {
        this.buttonEventBind();
    };
    /**
     * 按钮事件绑定
     */
    LevelManager.prototype.buttonEventBind = function () {
        var buttons = this.node.children;
        for (var i = 0; i < buttons.length; i++) {
            var node = buttons[i];
            var button = node.getComponent(cc.Button);
            var click_event = new cc.Component.EventHandler();
            //添加响应事件的必要参数，即响应函数所在的节点、组件、函数
            click_event.target = this.node;
            click_event.component = "levelManager";
            click_event.handler = "levelButtonFunc";
            click_event.customEventData = (i + 1).toString();
            button.clickEvents.push(click_event);
        }
    };
    LevelManager.prototype.levelButtonFunc = function (e, level) {
        if (this.isLevelButton)
            return;
        this.isLevelButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        if (level > this.MaxLevelNum) { //最新关
            this.selectLevelScene.toLevelScene(this.newLevel);
            return;
        }
        this.selectLevelScene.toLevelScene(level);
    };
    /**
     * 更新选关地图
     */
    LevelManager.prototype.updateLevelMap = function (user) {
        var visitedN = user.getRushLevelsSum();
        var levelsReview = user.getLevelsReview();
        //更新已闯过的关
        for (var i = 0; i < visitedN; i++) {
            var level = this.levels[i];
            var stars = level.children;
            var getStarNum = levelsReview[i];
            for (var j = 0; j < getStarNum; j++) {
                var emptyStar = stars[j + 1].getChildByName("emptyStar");
                emptyStar.active = false;
            }
            level.active = true;
        }
        if (visitedN + 1 > gameDataManager_1.default.getGameConfig().getLevelsSum())
            return;
        //更新没有闯的第一个新关
        var nextLevel = this.levels[visitedN];
        var pos = nextLevel.getPosition();
        this.levelEntry.setPosition(pos);
        this.levelEntry.active = true;
        //记录下最新关入口对应的关数
        this.newLevel = visitedN + 1;
        //添加响应事件的必要参数，即响应函数所在的节点、组件、函数
        var button = nextLevel.getComponent(cc.Button);
        var click_event = new cc.Component.EventHandler();
        click_event.target = this.node;
        click_event.component = "levelManager";
        click_event.handler = "levelButtonFunc";
        click_event.customEventData = (visitedN + 1).toString();
        button.clickEvents.push(click_event);
    };
    LevelManager = __decorate([
        ccclass
    ], LevelManager);
    return LevelManager;
}(cc.Component));
exports.default = LevelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL2xldmVsTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBeUU7QUFDekUsZ0VBQTJEO0FBR3JELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBb0dDO1FBbEdXLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFDekIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isc0JBQWdCLEdBQXFCLElBQUksQ0FBQztRQUMxQyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUNuQzs7V0FFRztRQUNLLGlCQUFXLEdBQVcsSUFBSSxDQUFDOztJQTJGdkMsQ0FBQztJQXJGRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNLLHNDQUFlLEdBQXZCO1FBQ0ksSUFBSSxPQUFPLEdBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUMsS0FB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QUM7UUFFN0IsOEJBQThCO1FBQzlCLElBQUksTUFBTSxHQUFjLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsRCxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDL0IsV0FBVyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDdkMsV0FBVyxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUN4QyxXQUFXLENBQUMsZUFBZSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFsR2dCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FvR2hDO0lBQUQsbUJBQUM7Q0FwR0QsQUFvR0MsQ0FwR3lDLEVBQUUsQ0FBQyxTQUFTLEdBb0dyRDtrQkFwR29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IFVzZXIgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBTb3VuZHNNYW5hZ2VyIGZyb20gXCIuLi9jb21tb24vbW9kdWxlL3NvdW5kc01hbmFnZXJcIjtcbmltcG9ydCBTZWxlY3RMZXZlbFNjZW5lIGZyb20gXCIuL3NlbGVjdExldmVsU2NlbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGxldmVsczogY2MuTm9kZVtdID0gbnVsbDtcbiAgICBwcml2YXRlIGlzTGV2ZWxCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHNlbGVjdExldmVsU2NlbmU6IFNlbGVjdExldmVsU2NlbmUgPSBudWxsO1xuICAgIHByaXZhdGUgbGV2ZWxFbnRyeTogY2MuTm9kZSA9IG51bGw7XG4gICAgLyoqXG4gICAgICog5pyA5aSn5YWz5pWwXG4gICAgICovXG4gICAgcHJpdmF0ZSBNYXhMZXZlbE51bTogbnVtYmVyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDmnIDmlrDop6PplIHnmoTlhbPljaFcbiAgICAgKi9cbiAgICBwcml2YXRlIG5ld0xldmVsOiBudW1iZXI7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubGV2ZWxzID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIHRoaXMubGV2ZWxFbnRyeSA9IHRoaXMubGV2ZWxzW3RoaXMubGV2ZWxzLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLk1heExldmVsTnVtID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKS5nZXRMZXZlbHNTdW0oKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5idXR0b25FdmVudEJpbmQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmjInpkq7kuovku7bnu5HlrppcbiAgICAgKi9cbiAgICBwcml2YXRlIGJ1dHRvbkV2ZW50QmluZCgpIHtcbiAgICAgICAgbGV0IGJ1dHRvbnM6IGNjLk5vZGVbXSA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGJ1dHRvbnNbaV07XG4gICAgICAgICAgICBsZXQgYnV0dG9uOiBjYy5CdXR0b24gPSBub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgbGV0IGNsaWNrX2V2ZW50ID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcblxuICAgICAgICAgICAgLy/mt7vliqDlk43lupTkuovku7bnmoTlv4XopoHlj4LmlbDvvIzljbPlk43lupTlh73mlbDmiYDlnKjnmoToioLngrnjgIHnu4Tku7bjgIHlh73mlbBcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LnRhcmdldCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmNvbXBvbmVudCA9IFwibGV2ZWxNYW5hZ2VyXCI7XG4gICAgICAgICAgICBjbGlja19ldmVudC5oYW5kbGVyID0gXCJsZXZlbEJ1dHRvbkZ1bmNcIjtcbiAgICAgICAgICAgIGNsaWNrX2V2ZW50LmN1c3RvbUV2ZW50RGF0YSA9IChpICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrX2V2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldmVsQnV0dG9uRnVuYyhlLCBsZXZlbCkge1xuICAgICAgICBpZiAodGhpcy5pc0xldmVsQnV0dG9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzTGV2ZWxCdXR0b24gPSB0cnVlO1xuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuXG4gICAgICAgIGlmIChsZXZlbCA+IHRoaXMuTWF4TGV2ZWxOdW0pIHsgLy/mnIDmlrDlhbNcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TGV2ZWxTY2VuZS50b0xldmVsU2NlbmUodGhpcy5uZXdMZXZlbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUudG9MZXZlbFNjZW5lKGxldmVsKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOmAieWFs+WcsOWbvlxuICAgICAqL1xuICAgIHVwZGF0ZUxldmVsTWFwKHVzZXI6IFVzZXIpIHtcbiAgICAgICAgbGV0IHZpc2l0ZWROOiBudW1iZXIgPSB1c2VyLmdldFJ1c2hMZXZlbHNTdW0oKTtcbiAgICAgICAgbGV0IGxldmVsc1JldmlldzogbnVtYmVyW10gPSB1c2VyLmdldExldmVsc1JldmlldygpO1xuICAgICAgICAvL+abtOaWsOW3sumXr+i/h+eahOWFs1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2l0ZWROOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsZXZlbDogY2MuTm9kZSA9IHRoaXMubGV2ZWxzW2ldO1xuICAgICAgICAgICAgbGV0IHN0YXJzOiBjYy5Ob2RlW10gPSBsZXZlbC5jaGlsZHJlbjtcbiAgICAgICAgICAgIGxldCBnZXRTdGFyTnVtOiBudW1iZXIgPSBsZXZlbHNSZXZpZXdbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdldFN0YXJOdW07IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBlbXB0eVN0YXI6IGNjLk5vZGUgPSBzdGFyc1tqICsgMV0uZ2V0Q2hpbGRCeU5hbWUoXCJlbXB0eVN0YXJcIik7XG4gICAgICAgICAgICAgICAgZW1wdHlTdGFyLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aXNpdGVkTiArIDEgPiBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpLmdldExldmVsc1N1bSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIC8v5pu05paw5rKh5pyJ6Zev55qE56ys5LiA5Liq5paw5YWzXG4gICAgICAgIGxldCBuZXh0TGV2ZWw6IGNjLk5vZGUgPSB0aGlzLmxldmVsc1t2aXNpdGVkTl07XG4gICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSBuZXh0TGV2ZWwuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5sZXZlbEVudHJ5LnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHRoaXMubGV2ZWxFbnRyeS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIC8v6K6w5b2V5LiL5pyA5paw5YWz5YWl5Y+j5a+55bqU55qE5YWz5pWwXG4gICAgICAgIHRoaXMubmV3TGV2ZWwgPSB2aXNpdGVkTiArIDE7XG5cbiAgICAgICAgLy/mt7vliqDlk43lupTkuovku7bnmoTlv4XopoHlj4LmlbDvvIzljbPlk43lupTlh73mlbDmiYDlnKjnmoToioLngrnjgIHnu4Tku7bjgIHlh73mlbBcbiAgICAgICAgbGV0IGJ1dHRvbjogY2MuQnV0dG9uID0gbmV4dExldmVsLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICBsZXQgY2xpY2tfZXZlbnQgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBjbGlja19ldmVudC50YXJnZXQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGNsaWNrX2V2ZW50LmNvbXBvbmVudCA9IFwibGV2ZWxNYW5hZ2VyXCI7XG4gICAgICAgIGNsaWNrX2V2ZW50LmhhbmRsZXIgPSBcImxldmVsQnV0dG9uRnVuY1wiO1xuICAgICAgICBjbGlja19ldmVudC5jdXN0b21FdmVudERhdGEgPSAodmlzaXRlZE4gKyAxKS50b1N0cmluZygpO1xuICAgICAgICBidXR0b24uY2xpY2tFdmVudHMucHVzaChjbGlja19ldmVudCk7XG4gICAgfVxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/monster/monsterFactory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe408t71SRIeYSayhsudyzg', 'monsterFactory');
// scripts/levelScene/monster/monsterFactory.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var monster_1 = require("./monster");
var animationPath_1 = require("../../common/animationPath");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonsterFactory = /** @class */ (function (_super) {
    __extends(MonsterFactory, _super);
    function MonsterFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monsterPrefab = [];
        _this.animationPath = null;
        /**
         * 待生成的怪物列表
         */
        _this.creMonList = [];
        _this.cT = 0;
        /**
         * [怪物编号][]
         * 每次删除monster是将其回收到对象池中
         */
        _this.poolOfMonster = null;
        /**
         * 路径条数
         */
        _this.roadNum = null;
        return _this;
    }
    MonsterFactory.prototype.onLoad = function () {
        //初始化怪物对象池
        this.poolOfMonster = [];
        for (var i = 0; i < this.monsterPrefab.length; i++) {
            this.poolOfMonster[i] = new cc.NodePool();
        }
        monster_1.default.monstersOfAlive = [];
    };
    /**
     * Inits monster factory
     * @param roadNum 路径条数
     */
    MonsterFactory.prototype.init = function (roadNum) {
        this.creMonList = [];
        this.cT = 0;
        this.roadNum = roadNum;
    };
    MonsterFactory.prototype.createMonster = function (num) {
        this.creMonList.push(num);
    };
    MonsterFactory.prototype.clearMonsters = function () {
        while (monster_1.default.monstersOfAlive.length > 0) {
            var m = monster_1.default.monstersOfAlive[0];
            m.die(monster_1.default.monstersOfAlive, m);
            m.releaseSelf();
        }
    };
    MonsterFactory.prototype.destroyMonster = function (m) {
        this.poolOfMonster[m.monsterNo].put(m.node);
    };
    MonsterFactory.prototype._createMonster = function (num) {
        var m;
        if (this.poolOfMonster[num].size() > 0) {
            m = this.poolOfMonster[num].get();
            m.opacity = 255;
        }
        else
            m = cc.instantiate(this.monsterPrefab[num]);
        var mScr = m.getComponent("monster");
        this.node.addChild(m);
        monster_1.default.monstersOfAlive.push(mScr);
        mScr.init(num, this.animationPath.getWorldPath("road" + this.getRandomNumber(1, this.roadNum).toString()));
    };
    MonsterFactory.prototype.getRandomNumber = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    MonsterFactory.prototype.update = function (dt) {
        if (this.creMonList.length > 0) {
            this.cT += dt;
            if (this.cT > 1) {
                this.cT = 0;
                this._createMonster(this.creMonList.shift());
            }
        }
    };
    __decorate([
        property({ type: [cc.Prefab] })
    ], MonsterFactory.prototype, "monsterPrefab", void 0);
    __decorate([
        property({ type: animationPath_1.default })
    ], MonsterFactory.prototype, "animationPath", void 0);
    MonsterFactory = __decorate([
        ccclass
    ], MonsterFactory);
    return MonsterFactory;
}(cc.Component));
exports.default = MonsterFactory;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvbW9uc3Rlci9tb25zdGVyRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBZ0M7QUFDaEMsNERBQXVEO0FBRWpELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBeUZDO1FBdEZXLG1CQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUdoQyxtQkFBYSxHQUFrQixJQUFJLENBQUM7UUFFNUM7O1dBRUc7UUFDSCxnQkFBVSxHQUFhLEVBQUUsQ0FBQztRQUNsQixRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCOzs7V0FHRztRQUNLLG1CQUFhLEdBQWtCLElBQUksQ0FBQztRQUM1Qzs7V0FFRztRQUNLLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBb0VuQyxDQUFDO0lBbEVHLCtCQUFNLEdBQU47UUFDSSxVQUFVO1FBQ1YsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDN0M7UUFFRCxpQkFBTyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILDZCQUFJLEdBQUosVUFBSyxPQUFlO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7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dCI6WyJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9tb25zdGVyXCI7XG5pbXBvcnQgQW5pbWF0aW9uUGF0aCBmcm9tIFwiLi4vLi4vY29tbW9uL2FuaW1hdGlvblBhdGhcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJGYWN0b3J5IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5QcmVmYWJdIH0pXG4gICAgcHJpdmF0ZSBtb25zdGVyUHJlZmFiOiBjYy5QcmVmYWJbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogQW5pbWF0aW9uUGF0aCB9KVxuICAgIHByaXZhdGUgYW5pbWF0aW9uUGF0aDogQW5pbWF0aW9uUGF0aCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDlvoXnlJ/miJDnmoTmgKrnianliJfooahcbiAgICAgKi9cbiAgICBjcmVNb25MaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgY1Q6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogW+aAqueJqee8luWPt11bXVxuICAgICAqIOavj+asoeWIoOmZpG1vbnN0ZXLmmK/lsIblhbblm57mlLbliLDlr7nosaHmsaDkuK1cbiAgICAgKi9cbiAgICBwcml2YXRlIHBvb2xPZk1vbnN0ZXI6IGNjLk5vZGVQb29sW10gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOi3r+W+hOadoeaVsFxuICAgICAqL1xuICAgIHByaXZhdGUgcm9hZE51bTogbnVtYmVyID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy/liJ3lp4vljJbmgKrnianlr7nosaHmsaBcbiAgICAgICAgdGhpcy5wb29sT2ZNb25zdGVyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tb25zdGVyUHJlZmFiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvb2xPZk1vbnN0ZXJbaV0gPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdHMgbW9uc3RlciBmYWN0b3J5XG4gICAgICogQHBhcmFtIHJvYWROdW0g6Lev5b6E5p2h5pWwXG4gICAgICovXG4gICAgaW5pdChyb2FkTnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jcmVNb25MaXN0ID0gW107XG4gICAgICAgIHRoaXMuY1QgPSAwO1xuICAgICAgICB0aGlzLnJvYWROdW0gPSByb2FkTnVtO1xuICAgIH1cblxuICAgIGNyZWF0ZU1vbnN0ZXIobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jcmVNb25MaXN0LnB1c2gobnVtKTtcbiAgICB9XG5cbiAgICBjbGVhck1vbnN0ZXJzKCkge1xuICAgICAgICB3aGlsZSAoTW9uc3Rlci5tb25zdGVyc09mQWxpdmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IG06IE1vbnN0ZXIgPSBNb25zdGVyLm1vbnN0ZXJzT2ZBbGl2ZVswXTtcbiAgICAgICAgICAgIG0uZGllKE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlLCBtKTtcbiAgICAgICAgICAgIG0ucmVsZWFzZVNlbGYoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lNb25zdGVyKG06IE1vbnN0ZXIpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZNb25zdGVyW20ubW9uc3Rlck5vXS5wdXQobS5ub2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVNb25zdGVyKG51bTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBtOiBjYy5Ob2RlO1xuICAgICAgICBpZiAodGhpcy5wb29sT2ZNb25zdGVyW251bV0uc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbSA9IHRoaXMucG9vbE9mTW9uc3RlcltudW1dLmdldCgpO1xuICAgICAgICAgICAgbS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vbnN0ZXJQcmVmYWJbbnVtXSk7XG5cbiAgICAgICAgbGV0IG1TY3I6IE1vbnN0ZXIgPSBtLmdldENvbXBvbmVudChcIm1vbnN0ZXJcIik7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChtKTtcbiAgICAgICAgTW9uc3Rlci5tb25zdGVyc09mQWxpdmUucHVzaChtU2NyKTtcblxuICAgICAgICBtU2NyLmluaXQobnVtLCB0aGlzLmFuaW1hdGlvblBhdGguZ2V0V29ybGRQYXRoKFwicm9hZFwiICsgdGhpcy5nZXRSYW5kb21OdW1iZXIoMSwgdGhpcy5yb2FkTnVtKS50b1N0cmluZygpKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmRvbU51bWJlcihtaW4sIG1heCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy5jcmVNb25MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY1QgKz0gZHQ7XG4gICAgICAgICAgICBpZiAodGhpcy5jVCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNUID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVNb25zdGVyKHRoaXMuY3JlTW9uTGlzdC5zaGlmdCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/arrow/arrower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85d98f92bBLz5Y1cmMhd2lH', 'arrower');
// scripts/levelScene/tower/arrow/arrower.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var monster_1 = require("../../monster/monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Arrower = /** @class */ (function (_super) {
    __extends(Arrower, _super);
    function Arrower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frameAnimation = null;
        /**
         * 是否正在射击
         */
        _this.shooting = false;
        _this.arrowTower = null;
        return _this;
    }
    Arrower.prototype.onLoad = function () {
        this.frameAnimation = this.node.getComponent("frameAnimation");
        this.arrowTower = this.node.parent.getComponent("arrowTower");
        this.monsterArray = monster_1.default.monstersOfAlive;
    };
    Arrower.prototype.start = function () {
        //初始化数据
        this.wPosOfArrower = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.playTimeOfshootArrow = this.frameAnimation.getDuration();
    };
    /**
     * Inits arrower
     * @param wPosOfTower 塔的世界坐标
     * @param speedOfArrow 箭的移动速度
     * @param shootRange 射程
     * @param speedOfShoot 射速
     */
    Arrower.prototype.init = function (wPosOfTower, speedOfArrow, shootRange, speedOfShoot, attack) {
        this.wPosOfTower = wPosOfTower;
        this.speedOfArrow = speedOfArrow;
        this.shootRange = shootRange;
        this.speedOfShoot = speedOfShoot;
        this.attack = attack;
    };
    /**
     * Shoots arrower
     * @param des 射击目标，世界坐标
     * @param time 射到目的地的时间
     */
    Arrower.prototype.shoot = function (des, time) {
        if (time === void 0) { time = null; }
        if (this.shooting)
            return;
        this.shooting = true;
        if (time === null) {
            var l = this.wPosOfTower.sub(des).mag();
            var time_1 = l / this.speedOfArrow;
        }
        //播放动作后射箭
        this.frameAnimation.play(false, false, false, function () {
            var arrowBullet = this.createArrow();
            var dir;
            if (this.wPosOfTower.x > des.x)
                dir = true;
            else
                dir = false;
            arrowBullet.init(this.attack, this.speedOfArrow, dir);
            arrowBullet.moveTo(this.wPosOfArrower, des, time);
            this.coolingShoot();
        }.bind(this));
    };
    /**
     * 冷却 射击
     */
    Arrower.prototype.coolingShoot = function () {
        this.scheduleOnce(function () {
            this.shooting = false;
        }.bind(this), this.speedOfShoot);
    };
    /**
     * Creates arrow
     * @returns arrow ArrowBullet
     */
    Arrower.prototype.createArrow = function () {
        var arrow = this.arrowTower.getArrowBullet();
        this.node.addChild(arrow);
        var script = arrow.getComponent("arrowBullet");
        return script;
    };
    /**
     * 根据怪物此时的位置，预判子弹到达后，怪物的新位置
     * @param monster
     * @param cP 此时怪物的坐标 世界坐标
     * @returns null表示超出射程;[怪物预测位置,世界; 子弹达到预测位置的时间]
     */
    Arrower.prototype.forecastMovePos = function (monster, cP) {
        //箭飞行到cP的时间
        var time = cP.sub(this.wPosOfArrower).mag() / this.speedOfArrow;
        var mWP = monster.getPosInTime(time + this.playTimeOfshootArrow);
        if (!this.inShootRange(mWP))
            return null;
        return [mWP.x, mWP.y, time];
    };
    Arrower.prototype.inShootRange = function (wP) {
        var l = this.wPosOfTower.sub(wP).mag();
        if (l <= this.shootRange)
            return true;
        return false;
    };
    Arrower.prototype.update = function (dt) {
        if (!this.shooting) {
            for (var i = 0; i < this.monsterArray.length; i++) {
                var m = this.monsterArray[i];
                var mP = m.node.parent.convertToWorldSpaceAR(m.node.getPosition());
                if (this.inShootRange(mP)) {
                    if (m.swiOfRecursionInPW) {
                        var d = this.forecastMovePos(m, mP);
                        if (d === null)
                            continue;
                        this.shoot(cc.v2(d[0], d[1]), d[2]);
                        break;
                    }
                    else {
                        this.shoot(m.getWPos());
                        return;
                    }
                }
            }
        }
    };
    Arrower = __decorate([
        ccclass
    ], Arrower);
    return Arrower;
}(cc.Component));
exports.default = Arrower;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJyb3cvYXJyb3dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxpREFBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUF3SkM7UUF0Slcsb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBRTlDOztXQUVHO1FBQ0ssY0FBUSxHQUFZLEtBQUssQ0FBQztRQWExQixnQkFBVSxHQUFlLElBQUksQ0FBQzs7SUFvSTFDLENBQUM7SUE1SEcsd0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDO0lBQ2hELENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBQ0ksT0FBTztRQUNQLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRWxFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxzQkFBSSxHQUFKLFVBQUssV0FBb0IsRUFBRSxZQUFvQixFQUFFLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxNQUFjO1FBQ3JHLElBQUksQ0FBQyxXQUFXLEdB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Q0FBQztJQXRKZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQXdKM0I7SUFBRCxjQUFDO0NBeEpELEFBd0pDLENBeEpvQyxFQUFFLENBQUMsU0FBUyxHQXdKaEQ7a0JBeEpvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFycm93QnVsbGV0IGZyb20gXCIuL2Fycm93QnVsbGV0XCI7XG5pbXBvcnQgRnJhbWVBbmltYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mcmFtZUFuaW1hdGlvblwiO1xuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL21vbnN0ZXIvbW9uc3RlclwiO1xuaW1wb3J0IEFycm93VG93ZXIgZnJvbSBcIi4vYXJyb3dUb3dlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyb3dlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGZyYW1lQW5pbWF0aW9uOiBGcmFtZUFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKbmraPlnKjlsITlh7tcbiAgICAgKi9cbiAgICBwcml2YXRlIHNob290aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICog5aGU55qE5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSB3UG9zT2ZUb3dlcjogY2MuVmVjMjtcbiAgICAvKipcbiAgICAgKiDnrq3nmoTlsITlh7rngrkg5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSB3UG9zT2ZBcnJvd2VyOiBjYy5WZWMyO1xuICAgIC8qKlxuICAgICAqIOWwhOeureWKqOeUu+aSreaUvuaXtumXtFxuICAgICAqL1xuICAgIHByaXZhdGUgcGxheVRpbWVPZnNob290QXJyb3c6IG51bWJlcjtcbiAgICBwcml2YXRlIGFycm93VG93ZXI6IEFycm93VG93ZXIgPSBudWxsO1xuICAgIHByaXZhdGUgbW9uc3RlckFycmF5OiBNb25zdGVyW107XG5cbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyO1xuICAgIHByaXZhdGUgc3BlZWRPZkFycm93OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzaG9vdFJhbmdlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzcGVlZE9mU2hvb3Q6IG51bWJlcjtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW1hdGlvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJmcmFtZUFuaW1hdGlvblwiKTtcbiAgICAgICAgdGhpcy5hcnJvd1Rvd2VyID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoXCJhcnJvd1Rvd2VyXCIpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJBcnJheSA9IE1vbnN0ZXIubW9uc3RlcnNPZkFsaXZlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvL+WIneWni+WMluaVsOaNrlxuICAgICAgICB0aGlzLndQb3NPZkFycm93ZXIgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHRoaXMucGxheVRpbWVPZnNob290QXJyb3cgPSB0aGlzLmZyYW1lQW5pbWF0aW9uLmdldER1cmF0aW9uKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0cyBhcnJvd2VyXG4gICAgICogQHBhcmFtIHdQb3NPZlRvd2VyIOWhlOeahOS4lueVjOWdkOagh1xuICAgICAqIEBwYXJhbSBzcGVlZE9mQXJyb3cg566t55qE56e75Yqo6YCf5bqmXG4gICAgICogQHBhcmFtIHNob290UmFuZ2Ug5bCE56iLXG4gICAgICogQHBhcmFtIHNwZWVkT2ZTaG9vdCDlsITpgJ9cbiAgICAgKi9cbiAgICBpbml0KHdQb3NPZlRvd2VyOiBjYy5WZWMyLCBzcGVlZE9mQXJyb3c6IG51bWJlciwgc2hvb3RSYW5nZTogbnVtYmVyLCBzcGVlZE9mU2hvb3Q6IG51bWJlciwgYXR0YWNrOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy53UG9zT2ZUb3dlciA9IHdQb3NPZlRvd2VyO1xuICAgICAgICB0aGlzLnNwZWVkT2ZBcnJvdyA9IHNwZWVkT2ZBcnJvdztcbiAgICAgICAgdGhpcy5zaG9vdFJhbmdlID0gc2hvb3RSYW5nZTtcbiAgICAgICAgdGhpcy5zcGVlZE9mU2hvb3QgPSBzcGVlZE9mU2hvb3Q7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gYXR0YWNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob290cyBhcnJvd2VyXG4gICAgICogQHBhcmFtIGRlcyDlsITlh7vnm67moIfvvIzkuJbnlYzlnZDmoIdcbiAgICAgKiBAcGFyYW0gdGltZSDlsITliLDnm67nmoTlnLDnmoTml7bpl7RcbiAgICAgKi9cbiAgICBwcml2YXRlIHNob290KGRlczogY2MuVmVjMiwgdGltZTogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5zaG9vdGluZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5zaG9vdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsOiBudW1iZXIgPSB0aGlzLndQb3NPZlRvd2VyLnN1YihkZXMpLm1hZygpO1xuICAgICAgICAgICAgbGV0IHRpbWUgPSBsIC8gdGhpcy5zcGVlZE9mQXJyb3c7XG4gICAgICAgIH1cblxuICAgICAgICAvL+aSreaUvuWKqOS9nOWQjuWwhOeurVxuICAgICAgICB0aGlzLmZyYW1lQW5pbWF0aW9uLnBsYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGFycm93QnVsbGV0OiBBcnJvd0J1bGxldCA9IHRoaXMuY3JlYXRlQXJyb3coKTtcbiAgICAgICAgICAgIGxldCBkaXI6IGJvb2xlYW47XG4gICAgICAgICAgICBpZiAodGhpcy53UG9zT2ZUb3dlci54ID4gZGVzLngpXG4gICAgICAgICAgICAgICAgZGlyID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkaXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGFycm93QnVsbGV0LmluaXQodGhpcy5hdHRhY2ssIHRoaXMuc3BlZWRPZkFycm93LCBkaXIpO1xuICAgICAgICAgICAgYXJyb3dCdWxsZXQubW92ZVRvKHRoaXMud1Bvc09mQXJyb3dlciwgZGVzLCB0aW1lKTtcbiAgICAgICAgICAgIHRoaXMuY29vbGluZ1Nob290KCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Ya35Y20IOWwhOWHu1xuICAgICAqL1xuICAgIHByaXZhdGUgY29vbGluZ1Nob290KCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNob290aW5nID0gZmFsc2U7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5zcGVlZE9mU2hvb3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYXJyb3dcbiAgICAgKiBAcmV0dXJucyBhcnJvdyBBcnJvd0J1bGxldFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlQXJyb3coKTogQXJyb3dCdWxsZXQge1xuICAgICAgICBsZXQgYXJyb3c6IGNjLk5vZGUgPSB0aGlzLmFycm93VG93ZXIuZ2V0QXJyb3dCdWxsZXQoKTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGFycm93KTtcbiAgICAgICAgbGV0IHNjcmlwdDogQXJyb3dCdWxsZXQgPSBhcnJvdy5nZXRDb21wb25lbnQoXCJhcnJvd0J1bGxldFwiKTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLnmja7mgKrnianmraTml7bnmoTkvY3nva7vvIzpooTliKTlrZDlvLnliLDovr7lkI7vvIzmgKrniannmoTmlrDkvY3nva5cbiAgICAgKiBAcGFyYW0gbW9uc3RlciBcbiAgICAgKiBAcGFyYW0gY1Ag5q2k5pe25oCq54mp55qE5Z2Q5qCHIOS4lueVjOWdkOagh1xuICAgICAqIEByZXR1cm5zIG51bGzooajnpLrotoXlh7rlsITnqIs7W+aAqueJqemihOa1i+S9jee9rizkuJbnlYw7IOWtkOW8uei+vuWIsOmihOa1i+S9jee9rueahOaXtumXtF1cbiAgICAgKi9cbiAgICBwcml2YXRlIGZvcmVjYXN0TW92ZVBvcyhtb25zdGVyOiBNb25zdGVyLCBjUDogY2MuVmVjMik6IG51bWJlcltdIHtcblxuICAgICAgICAvL+euremjnuihjOWIsGNQ55qE5pe26Ze0XG4gICAgICAgIGxldCB0aW1lOiBudW1iZXIgPSBjUC5zdWIodGhpcy53UG9zT2ZBcnJvd2VyKS5tYWcoKSAvIHRoaXMuc3BlZWRPZkFycm93O1xuXG4gICAgICAgIGxldCBtV1A6IGNjLlZlYzIgPSBtb25zdGVyLmdldFBvc0luVGltZSh0aW1lICsgdGhpcy5wbGF5VGltZU9mc2hvb3RBcnJvdyk7XG4gICAgICAgIGlmICghdGhpcy5pblNob290UmFuZ2UobVdQKSlcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gW21XUC54LCBtV1AueSwgdGltZV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpblNob290UmFuZ2Uod1A6IGNjLlZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGw6IG51bWJlciA9IHRoaXMud1Bvc09mVG93ZXIuc3ViKHdQKS5tYWcoKTtcbiAgICAgICAgaWYgKGwgPD0gdGhpcy5zaG9vdFJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob290aW5nKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW9uc3RlckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG06IE1vbnN0ZXIgPSB0aGlzLm1vbnN0ZXJBcnJheVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgbVA6IGNjLlZlYzIgPSBtLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pblNob290UmFuZ2UobVApKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtLnN3aU9mUmVjdXJzaW9uSW5QVykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGQ6IG51bWJlcltdID0gdGhpcy5mb3JlY2FzdE1vdmVQb3MobSwgbVApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob290KGNjLnYyKGRbMF0sIGRbMV0pLCBkWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9vdChtLmdldFdQb3MoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/skillsBoard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a93fPowX9BkZmjApAudjYI', 'skillsBoard');
// scripts/selecttLevelScene/skillsBoard.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../common/module/gameDataManager");
var aSeriesSkill_1 = require("./aSeriesSkill");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillsBoard = /** @class */ (function (_super) {
    __extends(SkillsBoard, _super);
    function SkillsBoard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starNum = null;
        _this.aSeriesSkillArray = [];
        _this.user = null;
        _this.selectLevelScene = null;
        _this.animation = null;
        return _this;
        // update (dt) {}
    }
    SkillsBoard.prototype.onLoad = function () {
        this.user = gameDataManager_1.default.getCurrentUser();
        this.selectLevelScene = cc.find("Canvas").getComponent("selectLevelScene");
        this.animation = this.node.getComponent(cc.Animation);
    };
    SkillsBoard.prototype.start = function () {
        this.updateStarNum();
        this.updateAllSkills();
    };
    /**
     * 更新技能板上显示的星星数
     */
    SkillsBoard.prototype.updateStarNum = function () {
        this.starNum.string = this.user.getCurrentHaveStarNum().toString();
    };
    SkillsBoard.prototype.skillBoardBack = function () {
        this.animation.play("skillsBoardUp");
    };
    /**
     * 更新所有技能树的显示
     */
    SkillsBoard.prototype.updateAllSkills = function () {
        var i;
        for (var _i = 0, _a = this.aSeriesSkillArray; _i < _a.length; _i++) {
            i = _a[_i];
            i.updateSkillIcons();
        }
    };
    /**
     * 重置技能
     */
    SkillsBoard.prototype.resetSkills = function () {
        //更新数据
        this.user.resetSkill();
        //更新显示的星星数
        this.updateStarNum();
        this.selectLevelScene.updateScoreLabel();
        //更新技能树
        this.updateAllSkills();
    };
    __decorate([
        property({ type: cc.Label })
    ], SkillsBoard.prototype, "starNum", void 0);
    __decorate([
        property({
            type: aSeriesSkill_1.default,
            tooltip: "5个技能"
        })
    ], SkillsBoard.prototype, "aSeriesSkillArray", void 0);
    SkillsBoard = __decorate([
        ccclass
    ], SkillsBoard);
    return SkillsBoard;
}(cc.Component));
exports.default = SkillsBoard;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL3NraWxsc0JvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUF5RTtBQUV6RSwrQ0FBMEM7QUFFcEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUEwREM7UUF2RFcsYUFBTyxHQUFhLElBQUksQ0FBQztRQU16Qix1QkFBaUIsR0FBbUIsRUFBRSxDQUFDO1FBRXZDLFVBQUksR0FBUyxJQUFJLENBQUM7UUFDbEIsc0JBQWdCLEdBQXFCLElBQUksQ0FBQztRQUMxQyxlQUFTLEdBQWlCLElBQUksQ0FBQzs7UUE0Q3ZDLGlCQUFpQjtJQUNyQixDQUFDO0lBNUNHLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLHlCQUFlLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILG1DQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkUsQ0FBQztJQUVELG9DQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFlLENBQUM7UUFDcEIsS0FBVSxVQUFzQixFQUF0QixLQUFBLElBQUksQ0FBQyxpQkFBaUIsRUFBdEIsY0FBc0IsRUFBdEIsSUFBc0I7WUFBM0IsQ0FBQyxTQUFBO1lBQ0YsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FBQTtJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBVyxHQUFYO1FBQ0ksTUFBTTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkIsVUFBVTtRQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxPQUFPO1FBQ1AsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFyREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dEQUNJO0lBTWpDO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLHNCQUFZO1lBQ2xCLE9BQU8sRUFBRSxNQUFNO1NBQ2xCLENBQUM7MERBQzZDO0lBVDlCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EwRC9CO0lBQUQsa0JBQUM7Q0ExREQsQUEwREMsQ0ExRHdDLEVBQUUsQ0FBQyxTQUFTLEdBMERwRDtrQkExRG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IFVzZXIgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBTZWxlY3RMZXZlbFNjZW5lIGZyb20gXCIuL3NlbGVjdExldmVsU2NlbmVcIjtcbmltcG9ydCBBc2VyaWVzU2tpbGwgZnJvbSBcIi4vYVNlcmllc1NraWxsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2lsbHNCb2FyZCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5MYWJlbCB9KVxuICAgIHByaXZhdGUgc3Rhck51bTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQXNlcmllc1NraWxsLFxuICAgICAgICB0b29sdGlwOiBcIjXkuKrmioDog71cIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhU2VyaWVzU2tpbGxBcnJheTogQXNlcmllc1NraWxsW10gPSBbXTtcblxuICAgIHByaXZhdGUgdXNlcjogVXNlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBzZWxlY3RMZXZlbFNjZW5lOiBTZWxlY3RMZXZlbFNjZW5lID0gbnVsbDtcbiAgICBwcml2YXRlIGFuaW1hdGlvbjogY2MuQW5pbWF0aW9uID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMudXNlciA9IEdhbWVEYXRhU3RvcmFnZS5nZXRDdXJyZW50VXNlcigpO1xuICAgICAgICB0aGlzLnNlbGVjdExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcInNlbGVjdExldmVsU2NlbmVcIik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXJOdW0oKTtcbiAgICAgICAgdGhpcy51cGRhdGVBbGxTa2lsbHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmioDog73mnb/kuIrmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgKi9cbiAgICB1cGRhdGVTdGFyTnVtKCkge1xuICAgICAgICB0aGlzLnN0YXJOdW0uc3RyaW5nID0gdGhpcy51c2VyLmdldEN1cnJlbnRIYXZlU3Rhck51bSgpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgc2tpbGxCb2FyZEJhY2soKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoXCJza2lsbHNCb2FyZFVwXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOaJgOacieaKgOiDveagkeeahOaYvuekulxuICAgICAqL1xuICAgIHVwZGF0ZUFsbFNraWxscygpIHtcbiAgICAgICAgbGV0IGk6IEFzZXJpZXNTa2lsbDtcbiAgICAgICAgZm9yIChpIG9mIHRoaXMuYVNlcmllc1NraWxsQXJyYXkpXG4gICAgICAgICAgICBpLnVwZGF0ZVNraWxsSWNvbnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43nva7mioDog71cbiAgICAgKi9cbiAgICByZXNldFNraWxscygpIHtcbiAgICAgICAgLy/mm7TmlrDmlbDmja5cbiAgICAgICAgdGhpcy51c2VyLnJlc2V0U2tpbGwoKTtcbiAgICAgICAgLy/mm7TmlrDmmL7npLrnmoTmmJ/mmJ/mlbBcbiAgICAgICAgdGhpcy51cGRhdGVTdGFyTnVtKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0TGV2ZWxTY2VuZS51cGRhdGVTY29yZUxhYmVsKCk7XG4gICAgICAgIC8v5pu05paw5oqA6IO95qCRXG4gICAgICAgIHRoaXMudXBkYXRlQWxsU2tpbGxzKCk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/selecttLevelScene/selectLevelScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd0b4IXk5lL3ZIxqlT2W5kU', 'selectLevelScene');
// scripts/selecttLevelScene/selectLevelScene.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../common/module/gameDataManager");
var levelManager_1 = require("./levelManager");
var loadingDoorAnim_1 = require("../../res/prefabs/loadingDoorAnim/loadingDoorAnim");
var soundsManager_1 = require("../common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectLevelScene = /** @class */ (function (_super) {
    __extends(SelectLevelScene, _super);
    function SelectLevelScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingDoorAnim = null;
        _this.scoreLabel = null;
        _this.levelManager = null;
        _this.skillsBoardAnimation = null;
        _this.user = null;
        _this.isBackButton = false;
        _this.gameConfig = null;
        return _this;
        // update (dt) {}
    }
    SelectLevelScene.prototype.onLoad = function () {
        this.gameConfig = gameDataManager_1.default.getGameConfig();
    };
    SelectLevelScene.prototype.start = function () {
        this.user = gameDataManager_1.default.getCurrentUser();
        this.loadingDoorAnim.setState(false);
        this.loadingDoorAnim.openDoor();
        soundsManager_1.default.ins.curBGM = "sounds/selectLevelsceneBGM";
        soundsManager_1.default.ins.playBGM(soundsManager_1.default.ins.curBGM);
        this.updateScoreLabel();
        this.levelManager.updateLevelMap(this.user);
    };
    /**
     * 更新成绩板
     */
    SelectLevelScene.prototype.updateScoreLabel = function () {
        var max = this.gameConfig.getStarSum();
        var num = this.user.getCurrentHaveStarNum();
        this.scoreLabel.string = num.toString() + "/" + max.toString();
    };
    SelectLevelScene.prototype.backButton = function () {
        if (this.isBackButton) //保证播放开门动画期间，按开始游戏按钮 不重复开门
            return;
        this.isBackButton = true;
        soundsManager_1.default.ins.playEffect("sounds/click");
        var func = cc.callFunc(function () {
            cc.director.loadScene("homeScene", function () {
                // let homeScene: HomeScene = cc.find("Canvas").getComponent("homeScene");
                // homeScene.fristEntry = false;
                var loadingDoorAnim = cc.find("Canvas/centerAnchor/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                loadingDoorAnimScr.openDoor();
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    SelectLevelScene.prototype.toLevelScene = function (level) {
        var func = cc.callFunc(function () {
            cc.director.loadScene("levelScene", function () {
                var loadingDoorAnim = cc.find("Canvas/loadingDoorAnim");
                var loadingDoorAnimScr = loadingDoorAnim.getComponent("loadingDoorAnim");
                loadingDoorAnimScr.setState(false);
                //传入关卡数
                var levelScene = cc.find("Canvas").getComponent("levelScene");
                levelScene.levelNum = Number(level);
            });
        }, this);
        this.loadingDoorAnim.closeDoor(func);
        gameDataManager_1.default.preserveGameData();
    };
    SelectLevelScene.prototype.upgradeButton = function () {
        this.skillsBoardAnimation.play("skillsBoardDown");
    };
    __decorate([
        property({ type: loadingDoorAnim_1.default })
    ], SelectLevelScene.prototype, "loadingDoorAnim", void 0);
    __decorate([
        property({ type: cc.Label })
    ], SelectLevelScene.prototype, "scoreLabel", void 0);
    __decorate([
        property({ type: levelManager_1.default })
    ], SelectLevelScene.prototype, "levelManager", void 0);
    __decorate([
        property({ type: cc.Animation })
    ], SelectLevelScene.prototype, "skillsBoardAnimation", void 0);
    SelectLevelScene = __decorate([
        ccclass
    ], SelectLevelScene);
    return SelectLevelScene;
}(cc.Component));
exports.default = SelectLevelScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL3NlbGVjdHRMZXZlbFNjZW5lL3NlbGVjdExldmVsU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQXFGO0FBRXJGLCtDQUEwQztBQUUxQyxxRkFBZ0Y7QUFDaEYsZ0VBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBc0ZDO1FBbkZXLHFCQUFlLEdBQW9CLElBQUksQ0FBQztRQUd4QyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFpQixJQUFJLENBQUM7UUFHbEMsMEJBQW9CLEdBQWlCLElBQUksQ0FBQztRQUcxQyxVQUFJLEdBQVMsSUFBSSxDQUFDO1FBQ2xCLGtCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGdCQUFVLEdBQWUsSUFBSSxDQUFDOztRQW9FdEMsaUJBQWlCO0lBQ3JCLENBQUM7SUFwRUcsaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcseUJBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsZ0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLHVCQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyw0QkFBNEIsQ0FBQztRQUN4RCx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLGdCQUFnQixFQUFF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QUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7a0VBQ2lCO0lBWmpDLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBc0ZwQztJQUFELHVCQUFDO0NBdEZELEFBc0ZDLENBdEY2QyxFQUFFLENBQUMsU0FBUyxHQXNGekQ7a0JBdEZvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IFVzZXIsIEdhbWVDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcbmltcG9ydCBIb21lU2NlbmUgZnJvbSBcIi4uL2hvbWVTY2VuZS9ob21lU2NlbmVcIjtcbmltcG9ydCBMZXZlbE1hbmFnZXIgZnJvbSBcIi4vbGV2ZWxNYW5hZ2VyXCI7XG5pbXBvcnQgTGV2ZWxTY2VuZSBmcm9tIFwiLi4vbGV2ZWxTY2VuZS9sZXZlbFNjZW5lXCI7XG5pbXBvcnQgTG9hZGluZ0Rvb3JBbmltIGZyb20gXCIuLi8uLi9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltXCI7XG5pbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vY29tbW9uL21vZHVsZS9zb3VuZHNNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMZXZlbFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExvYWRpbmdEb29yQW5pbSB9KVxuICAgIHByaXZhdGUgbG9hZGluZ0Rvb3JBbmltOiBMb2FkaW5nRG9vckFuaW0gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwgfSlcbiAgICBwcml2YXRlIHNjb3JlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IExldmVsTWFuYWdlciB9KVxuICAgIHByaXZhdGUgbGV2ZWxNYW5hZ2VyOiBMZXZlbE1hbmFnZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQW5pbWF0aW9uIH0pXG4gICAgcHJpdmF0ZSBza2lsbHNCb2FyZEFuaW1hdGlvbjogY2MuQW5pbWF0aW9uID0gbnVsbDtcblxuXG4gICAgcHJpdmF0ZSB1c2VyOiBVc2VyID0gbnVsbDtcbiAgICBwcml2YXRlIGlzQmFja0J1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZ2FtZUNvbmZpZzogR2FtZUNvbmZpZyA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmdhbWVDb25maWcgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0R2FtZUNvbmZpZygpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVzZXIgPSBHYW1lRGF0YVN0b3JhZ2UuZ2V0Q3VycmVudFVzZXIoKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0uc2V0U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5vcGVuRG9vcigpO1xuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5jdXJCR00gPSBcInNvdW5kcy9zZWxlY3RMZXZlbHNjZW5lQkdNXCI7XG4gICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLnBsYXlCR00oU291bmRzTWFuYWdlci5pbnMuY3VyQkdNKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlTGFiZWwoKTtcbiAgICAgICAgdGhpcy5sZXZlbE1hbmFnZXIudXBkYXRlTGV2ZWxNYXAodGhpcy51c2VyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDmiJDnu6nmnb8gXG4gICAgICovXG4gICAgdXBkYXRlU2NvcmVMYWJlbCgpIHtcbiAgICAgICAgbGV0IG1heDogbnVtYmVyID0gdGhpcy5nYW1lQ29uZmlnLmdldFN0YXJTdW0oKTtcbiAgICAgICAgbGV0IG51bTogbnVtYmVyID0gdGhpcy51c2VyLmdldEN1cnJlbnRIYXZlU3Rhck51bSgpO1xuICAgICAgICB0aGlzLnNjb3JlTGFiZWwuc3RyaW5nID0gbnVtLnRvU3RyaW5nKCkgKyBcIi9cIiArIG1heC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGJhY2tCdXR0b24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQmFja0J1dHRvbikgLy/kv53or4Hmkq3mlL7lvIDpl6jliqjnlLvmnJ/pl7TvvIzmjInlvIDlp4vmuLjmiI/mjInpkq4g5LiN6YeN5aSN5byA6ZeoXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNCYWNrQnV0dG9uID0gdHJ1ZTtcblxuICAgICAgICBTb3VuZHNNYW5hZ2VyLmlucy5wbGF5RWZmZWN0KFwic291bmRzL2NsaWNrXCIpO1xuICAgICAgICBsZXQgZnVuYzogY2MuQWN0aW9uSW5zdGFudCA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImhvbWVTY2VuZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGhvbWVTY2VuZTogSG9tZVNjZW5lID0gY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJob21lU2NlbmVcIik7XG4gICAgICAgICAgICAgICAgLy8gaG9tZVNjZW5lLmZyaXN0RW50cnkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nRG9vckFuaW06IGNjLk5vZGUgPSBjYy5maW5kKFwiQ2FudmFzL2NlbnRlckFuY2hvci9sb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbVNjcjogTG9hZGluZ0Rvb3JBbmltID0gbG9hZGluZ0Rvb3JBbmltLmdldENvbXBvbmVudChcImxvYWRpbmdEb29yQW5pbVwiKTtcbiAgICAgICAgICAgICAgICBsb2FkaW5nRG9vckFuaW1TY3Iuc2V0U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGxvYWRpbmdEb29yQW5pbVNjci5vcGVuRG9vcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLmxvYWRpbmdEb29yQW5pbS5jbG9zZURvb3IoZnVuYyk7XG4gICAgICAgIEdhbWVEYXRhU3RvcmFnZS5wcmVzZXJ2ZUdhbWVEYXRhKCk7XG4gICAgfVxuXG4gICAgdG9MZXZlbFNjZW5lKGxldmVsKSB7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibGV2ZWxTY2VuZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxvYWRpbmdEb29yQW5pbTogY2MuTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvbG9hZGluZ0Rvb3JBbmltXCIpO1xuICAgICAgICAgICAgICAgIGxldCBsb2FkaW5nRG9vckFuaW1TY3I6IExvYWRpbmdEb29yQW5pbSA9IGxvYWRpbmdEb29yQW5pbS5nZXRDb21wb25lbnQoXCJsb2FkaW5nRG9vckFuaW1cIik7XG4gICAgICAgICAgICAgICAgbG9hZGluZ0Rvb3JBbmltU2NyLnNldFN0YXRlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIC8v5Lyg5YWl5YWz5Y2h5pWwXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsU2NlbmU6IExldmVsU2NlbmUgPSBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcImxldmVsU2NlbmVcIik7XG4gICAgICAgICAgICAgICAgbGV2ZWxTY2VuZS5sZXZlbE51bSA9IE51bWJlcihsZXZlbCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nRG9vckFuaW0uY2xvc2VEb29yKGZ1bmMpO1xuXG4gICAgICAgIEdhbWVEYXRhU3RvcmFnZS5wcmVzZXJ2ZUdhbWVEYXRhKCk7XG4gICAgfVxuXG4gICAgdXBncmFkZUJ1dHRvbigpIHtcbiAgICAgICAgdGhpcy5za2lsbHNCb2FyZEFuaW1hdGlvbi5wbGF5KFwic2tpbGxzQm9hcmREb3duXCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/artillery/artilleryBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4643fd5zIZPX7fZ/abAT8Qr', 'artilleryBullet');
// scripts/levelScene/tower/artillery/artilleryBullet.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var monster_1 = require("../../monster/monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArtilleryBullet = /** @class */ (function (_super) {
    __extends(ArtilleryBullet, _super);
    function ArtilleryBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level = null;
        _this.attack = 0;
        _this.frameAnim = null;
        _this.artilleryTower = null;
        return _this;
        // update (dt) {}
    }
    ArtilleryBullet.prototype.onLoad = function () {
        this.frameAnim = this.node.getComponent("frameAnimation");
        this.artilleryTower = this.node.parent.getComponent("artilleryTower");
    };
    ArtilleryBullet.prototype.start = function () {
    };
    /**
     * 设置炮的攻击力和速度
     * @param attack
     * @param bombRange 炸弹爆炸范围
     */
    ArtilleryBullet.prototype.init = function (l, attack, bombRange) {
        this.level = l;
        this.attack = attack;
        this.harmRadian = bombRange;
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 移动时间
     *
     */
    ArtilleryBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = cc.v2(nodeStart.x + sub.x / 2, nodeStart.y + sub.y / 2);
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func = cc.callFunc(function () {
            this.frameAnim.play(false, true, false, function () {
                this.causeHarm(end);
                this.destroySelf();
            }.bind(this));
        }, this);
        var seq = cc.sequence(move, func);
        this.node.runAction(seq);
    };
    /**
     * Causes harm
     * @param pos 爆炸点 世界坐标
     */
    ArtilleryBullet.prototype.causeHarm = function (pos) {
        for (var i = 0; i < monster_1.default.monstersOfAlive.length; i++) {
            var mScr = monster_1.default.monstersOfAlive[i];
            if (this.isInjuredInScope(pos, mScr.getWPos()))
                mScr.injure(this.attack);
        }
    };
    /**
     * @param pos 爆炸点 世界
     */
    ArtilleryBullet.prototype.isInjuredInScope = function (pos, mwp) {
        var l = mwp.sub(pos).mag();
        if (l <= this.harmRadian)
            return true;
        return false;
    };
    ArtilleryBullet.prototype.destroySelf = function () {
        this.artilleryTower.releaseBullt(this.level, this.node);
    };
    ArtilleryBullet = __decorate([
        ccclass
    ], ArtilleryBullet);
    return ArtilleryBullet;
}(cc.Component));
exports.default = ArtilleryBullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJ0aWxsZXJ5L2FydGlsbGVyeUJ1bGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFvRkM7UUFsRlcsV0FBSyxHQUFXLElBQUksQ0FBQztRQUNyQixZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRW5CLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBQ2pDLG9CQUFjLEdBQWMsSUFBSSxDQUFDOztRQTZFekMsaUJBQWlCO0lBQ3JCLENBQUM7SUE1RUcsZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCwrQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4QkFBSSxHQUFKLFVBQUssQ0FBUyxFQUFFLE1BQWMsRUFBRSxTQUFpQjtRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxnQ0FBTSxHQUFOLFVBQU8sS0FBYyxFQUFFLEdBQVksRUFBRSxJQUFZO1FBQzdDLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFv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bnRlbnQiOlsiaW1wb3J0IEZyYW1lQW5pbWF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZnJhbWVBbmltYXRpb25cIjtcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9tb25zdGVyL21vbnN0ZXJcIjtcbmltcG9ydCBBcnRpbGxlcnkgZnJvbSBcIi4vYXJ0aWxsZXJ5VG93ZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFydGlsbGVyeUJ1bGxldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGxldmVsOiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgYXR0YWNrOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgaGFybVJhZGlhbjogbnVtYmVyO1xuICAgIHByaXZhdGUgZnJhbWVBbmltOiBGcmFtZUFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBhcnRpbGxlcnlUb3dlcjogQXJ0aWxsZXJ5ID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiZnJhbWVBbmltYXRpb25cIik7XG4gICAgICAgIHRoaXMuYXJ0aWxsZXJ5VG93ZXIgPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcImFydGlsbGVyeVRvd2VyXCIpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u54Ku55qE5pS75Ye75Yqb5ZKM6YCf5bqmXG4gICAgICogQHBhcmFtIGF0dGFjayBcbiAgICAgKiBAcGFyYW0gYm9tYlJhbmdlIOeCuOW8ueeIhueCuOiMg+WbtFxuICAgICAqL1xuICAgIGluaXQobDogbnVtYmVyLCBhdHRhY2s6IG51bWJlciwgYm9tYlJhbmdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGw7XG4gICAgICAgIHRoaXMuYXR0YWNrID0gYXR0YWNrO1xuICAgICAgICB0aGlzLmhhcm1SYWRpYW4gPSBib21iUmFuZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e75Yqo77yM5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHN0YXJ0IOi1t+eCuVxuICAgICAqIEBwYXJhbSBlbmQg57uI54K5XG4gICAgICogQHBhcmFtIHRpbWUg56e75Yqo5pe26Ze0XG4gICAgICogXG4gICAgICovXG4gICAgbW92ZVRvKHN0YXJ0OiBjYy5WZWMyLCBlbmQ6IGNjLlZlYzIsIHRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgbm9kZVN0YXJ0OiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydCk7XG4gICAgICAgIGxldCBub2RlRW5kOiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmQpO1xuICAgICAgICBsZXQgc3ViOiBjYy5WZWMyID0gbm9kZUVuZC5zdWIobm9kZVN0YXJ0KTtcbiAgICAgICAgbGV0IG1pZGRsZTogY2MuVmVjMiA9IGNjLnYyKG5vZGVTdGFydC54ICsgc3ViLnggLyAyLCBub2RlU3RhcnQueSArIHN1Yi55IC8gMik7XG4gICAgICAgIGxldCBjOiBjYy5WZWMyID0gY2MudjIobWlkZGxlLngsIG5vZGVFbmQueSArIDYwKTtcbiAgICAgICAgaWYgKHN0YXJ0LnggPT09IGVuZC54KVxuICAgICAgICAgICAgYy54ICs9IDMwO1xuXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihub2RlU3RhcnQpO1xuICAgICAgICBsZXQgbW92ZTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5iZXppZXJUbyh0aW1lLCBbbm9kZVN0YXJ0LCBjLCBub2RlRW5kXSk7XG5cbiAgICAgICAgbGV0IGZ1bmM6IGNjLkFjdGlvbkluc3RhbnQgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQW5pbS5wbGF5KGZhbHNlLCB0cnVlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2F1c2VIYXJtKGVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShtb3ZlLCBmdW5jKTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhdXNlcyBoYXJtXG4gICAgICogQHBhcmFtIHBvcyDniIbngrjngrkg5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYXVzZUhhcm0ocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTW9uc3Rlci5tb25zdGVyc09mQWxpdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtU2NyOiBNb25zdGVyID0gTW9uc3Rlci5tb25zdGVyc09mQWxpdmVbaV07XG4gICAgICAgICAgICBpZiAodGhpcy5pc0luanVyZWRJblNjb3BlKHBvcywgbVNjci5nZXRXUG9zKCkpKVxuICAgICAgICAgICAgICAgIG1TY3IuaW5qdXJlKHRoaXMuYXR0YWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcG9zIOeIhueCuOeCuSDkuJbnlYwgXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc0luanVyZWRJblNjb3BlKHBvczogY2MuVmVjMiwgbXdwOiBjYy5WZWMyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBsOiBudW1iZXIgPSBtd3Auc3ViKHBvcykubWFnKCk7XG4gICAgICAgIGlmIChsIDw9IHRoaXMuaGFybVJhZGlhbilcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95U2VsZigpIHtcbiAgICAgICAgdGhpcy5hcnRpbGxlcnlUb3dlci5yZWxlYXNlQnVsbHQodGhpcy5sZXZlbCwgdGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/magiclan/magiclanBullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b9a4I8TTtBsL72juFLMOm2', 'magiclanBullet');
// scripts/levelScene/tower/magiclan/magiclanBullet.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MagiclanBullet = /** @class */ (function (_super) {
    __extends(MagiclanBullet, _super);
    function MagiclanBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFallFloor = false;
        _this.tower = null;
        return _this;
        // update (dt) {}
    }
    MagiclanBullet.prototype.onLoad = function () {
        this.tower = this.node.parent.getComponent("magiclanTower");
    };
    MagiclanBullet.prototype.start = function () {
    };
    MagiclanBullet.prototype.init = function (attack) {
        this.attack = attack;
    };
    /**
     * 移动，世界坐标
     * @param start 起点
     * @param end 终点
     * @param time 移动时间
     */
    MagiclanBullet.prototype.moveTo = function (start, end, time) {
        var nodeStart = this.node.parent.convertToNodeSpaceAR(start);
        var nodeEnd = this.node.parent.convertToNodeSpaceAR(end);
        var sub = nodeEnd.sub(nodeStart);
        var middle = cc.v2(nodeStart.x + sub.x / 2, nodeStart.y + sub.y / 2);
        var c = cc.v2(middle.x, nodeEnd.y + 60);
        if (start.x === end.x)
            c.x += 30;
        this.node.setPosition(nodeStart);
        var move = cc.bezierTo(time, [nodeStart, c, nodeEnd]);
        var func1 = cc.callFunc(function () {
            this.destroySelf();
        }.bind(this));
        var seq = cc.sequence(move, func1);
        this.node.runAction(seq);
    };
    MagiclanBullet.prototype.destroySelf = function () {
        this.tower.releaseBullt(this.node);
    };
    MagiclanBullet.prototype.onCollisionEnter = function (other, self) {
        if (this.isFallFloor)
            return;
        var node = other.node;
        var group = node.group;
        if (group === "Enemy") {
            this.node.stopAllActions();
            var m = node.getComponent("monster");
            m.injure(this.attack);
            this.destroySelf();
        }
    };
    MagiclanBullet = __decorate([
        ccclass
    ], MagiclanBullet);
    return MagiclanBullet;
}(cc.Component));
exports.default = MagiclanBullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvbWFnaWNsYW4vbWFnaWNsYW5CdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFpRUM7UUE5RFcsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsV0FBSyxHQUFrQixJQUFJLENBQUM7O1FBNERwQyxpQkFBaUI7SUFDckIsQ0FBQztJQTNERywrQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELDhCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLE1BQWM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCwrQkFBTSxHQUFOLFVBQU8sS0FBYyxFQUFFLEdBQVksRUFBRSxJQUFZO1FBQzdDLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksR0FBRyxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksR0FBc0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFekUsSUFBSSxLQUFLLEdBQXFCLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUViLElBQUksR0FBRyxHQUFzQixFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sb0NBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELHlDQUFnQixHQUFoQixVQUFpQixLQUFrQixFQUFFLElBQWlCO1FBQ2xELElBQUksSUFBSSxDQUFDLFdBQVc7WUFDaEIsT0FBTztRQUVYLElBQUksSUFBSSxHQUFZLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUvQixJQUFJLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBWSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXRCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUE5RGdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FpRWxDO0lBQUQscUJBQUM7Q0FqRUQsQUFpRUMsQ0FqRTJDLEVBQUUsQ0FBQyxTQUFTLEdBaUV2RDtrQkFqRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vbW9uc3Rlci9tb25zdGVyXCI7XG5pbXBvcnQgTWFnaWNsYW5Ub3dlciBmcm9tIFwiLi9tYWdpY2xhblRvd2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWdpY2xhbkJ1bGxldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIGF0dGFjazogbnVtYmVyO1xuICAgIHByaXZhdGUgaXNGYWxsRmxvb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRvd2VyOiBNYWdpY2xhblRvd2VyID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy50b3dlciA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwibWFnaWNsYW5Ub3dlclwiKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIGluaXQoYXR0YWNrOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hdHRhY2sgPSBhdHRhY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56e75Yqo77yM5LiW55WM5Z2Q5qCHXG4gICAgICogQHBhcmFtIHN0YXJ0IOi1t+eCuVxuICAgICAqIEBwYXJhbSBlbmQg57uI54K5XG4gICAgICogQHBhcmFtIHRpbWUg56e75Yqo5pe26Ze0XG4gICAgICovXG4gICAgbW92ZVRvKHN0YXJ0OiBjYy5WZWMyLCBlbmQ6IGNjLlZlYzIsIHRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgbm9kZVN0YXJ0OiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydCk7XG4gICAgICAgIGxldCBub2RlRW5kOiBjYy5WZWMyID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlbmQpO1xuICAgICAgICBsZXQgc3ViOiBjYy5WZWMyID0gbm9kZUVuZC5zdWIobm9kZVN0YXJ0KTtcbiAgICAgICAgbGV0IG1pZGRsZTogY2MuVmVjMiA9IGNjLnYyKG5vZGVTdGFydC54ICsgc3ViLnggLyAyLCBub2RlU3RhcnQueSArIHN1Yi55IC8gMik7XG4gICAgICAgIGxldCBjOiBjYy5WZWMyID0gY2MudjIobWlkZGxlLngsIG5vZGVFbmQueSArIDYwKTtcbiAgICAgICAgaWYgKHN0YXJ0LnggPT09IGVuZC54KVxuICAgICAgICAgICAgYy54ICs9IDMwO1xuXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihub2RlU3RhcnQpO1xuICAgICAgICBsZXQgbW92ZTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5iZXppZXJUbyh0aW1lLCBbbm9kZVN0YXJ0LCBjLCBub2RlRW5kXSk7XG5cbiAgICAgICAgbGV0IGZ1bmMxOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xuICAgICAgICB9LmJpbmQodGhpcykpXG5cbiAgICAgICAgbGV0IHNlcTogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5zZXF1ZW5jZShtb3ZlLCBmdW5jMSk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlc3Ryb3lTZWxmKCkge1xuICAgICAgICB0aGlzLnRvd2VyLnJlbGVhc2VCdWxsdCh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xuICAgICAgICBpZiAodGhpcy5pc0ZhbGxGbG9vcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG90aGVyLm5vZGU7XG4gICAgICAgIGxldCBncm91cDogc3RyaW5nID0gbm9kZS5ncm91cDtcblxuICAgICAgICBpZiAoZ3JvdXAgPT09IFwiRW5lbXlcIikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBsZXQgbTogTW9uc3RlciA9IG5vZGUuZ2V0Q29tcG9uZW50KFwibW9uc3RlclwiKTtcbiAgICAgICAgICAgIG0uaW5qdXJlKHRoaXMuYXR0YWNrKTtcblxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/arrow/arrowTower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '403e3F1r7dJD4/WJwLaVuIm', 'arrowTower');
// scripts/levelScene/tower/arrow/arrowTower.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ArrowTower = /** @class */ (function (_super) {
    __extends(ArrowTower, _super);
    function ArrowTower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offsetY = [];
        _this.arrowPrefab = null;
        _this.atlas = [];
        /* 塔的属性 */
        /**
         * 塔的等级
         */
        _this.level = 1;
        _this.maxLevel = 4;
        _this.leftArrower = null;
        _this.rightArrower = null;
        /**
         * 左右两个士兵的 帧动画组件
         */
        _this.towerBG = null;
        _this.frameAnimations = [];
        /* 控制 */
        /**
         * false为士兵朝下
         */
        _this.toward = false;
        _this.dataOfTower = null;
        _this.poolOfArrow = null;
        return _this;
    }
    ArrowTower.prototype.onLoad = function () {
        var l = this.node.getChildByName("leftPerson");
        var r = this.node.getChildByName("rightPerson");
        this.frameAnimations[0] = l.getComponent("frameAnimation");
        this.frameAnimations[1] = r.getComponent("frameAnimation");
        this.leftArrower = l.getComponent("arrower");
        this.rightArrower = r.getComponent("arrower");
        this.towerBG = this.node.getChildByName("bg").getComponent(cc.Sprite);
        this.gameConfig = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = this.gameConfig.getDataOfArrowTower();
        this.createPoolOfArrow();
    };
    ArrowTower.prototype.start = function () {
        this.wPos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        this.init();
    };
    ArrowTower.prototype.init = function () {
        this.attack = this.dataOfTower[this.level - 1].attack;
        this.speedOfArrow = this.dataOfTower[this.level - 1].speedOfArrow;
        this.shootRange = this.dataOfTower[this.level - 1].shootRange;
        this.speedOfShoot = this.dataOfTower[this.level - 1].speedOfShoot;
        this.price = this.dataOfTower[this.level - 1].price;
        this.initArrower();
    };
    /* 箭对象池 */
    ArrowTower.prototype.createPoolOfArrow = function () {
        if (this.poolOfArrow !== null)
            return;
        this.poolOfArrow = new cc.NodePool();
        for (var i = 0; i < 2; i++) {
            this.poolOfArrow.put(cc.instantiate(this.arrowPrefab));
        }
    };
    ArrowTower.prototype.getArrowBullet = function () {
        var r = null;
        if (this.poolOfArrow.size() > 0)
            r = this.poolOfArrow.get();
        else
            r = cc.instantiate(this.arrowPrefab);
        r.opacity = 255;
        return r;
    };
    ArrowTower.prototype.releaseArrowBullt = function (n) {
        this.poolOfArrow.put(n);
    };
    ArrowTower.prototype.clearPoolOfArrow = function () {
        this.poolOfArrow.clear();
    };
    ArrowTower.prototype.initArrower = function () {
        //设置位置和图片
        this.frameAnimations[0].node.y = this.offsetY[this.level - 1].y;
        this.frameAnimations[1].node.y = this.offsetY[this.level - 1].y;
        var atlas = this.atlas[this.level - 1];
        var spriteArr = atlas.getSpriteFrames();
        //设置塔的皮肤
        this.towerBG.spriteFrame = spriteArr[0];
        this.setSkin(this.frameAnimations[0], spriteArr);
        this.setSkin(this.frameAnimations[1], spriteArr);
        //传参
        this.leftArrower.init(this.wPos, this.speedOfArrow, this.shootRange, this.speedOfShoot, this.attack);
        this.rightArrower.init(this.wPos, this.speedOfArrow, this.shootRange, this.speedOfShoot, this.attack);
    };
    /**
     * 设置士兵的皮肤和帧动画
     * @param frameAnimation
     * @param res 图片资源
     */
    ArrowTower.prototype.setSkin = function (frameAnimation, res) {
        //设置士兵等待时的皮肤
        var i = 5; //朝下
        if (this.toward)
            i = 6;
        frameAnimation.setSpriteFrame(res[i]);
        frameAnimation.setIdle(res[i]);
        //设置帧动画
        var arr = [];
        i = 1;
        if (this.toward) //朝下
            i = 7;
        for (var j = 0; j < 4; j++)
            arr.push(res[i + j]);
        frameAnimation.setFrameArray(arr);
    };
    ArrowTower.prototype.destroySelf = function () {
        this.clearPoolOfArrow();
        this.node.destroy();
    };
    /**
     * 升级
     */
    ArrowTower.prototype.upgrade = function () {
        if (this.level === 4)
            return;
        this.level++;
        this.init();
    };
    ArrowTower.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    ArrowTower.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    ArrowTower.prototype.update = function (dt) {
    };
    __decorate([
        property({
            type: [cc.Vec2],
            tooltip: "各等级的人的Y坐标"
        })
    ], ArrowTower.prototype, "offsetY", void 0);
    __decorate([
        property({
            type: cc.Prefab
        })
    ], ArrowTower.prototype, "arrowPrefab", void 0);
    __decorate([
        property([cc.SpriteAtlas])
    ], ArrowTower.prototype, "atlas", void 0);
    ArrowTower = __decorate([
        ccclass
    ], ArrowTower);
    return ArrowTower;
}(cc.Component));
exports.default = ArrowTower;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJyb3cvYXJyb3dUb3dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwRUFBcUY7QUFHL0UsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUFnTEM7UUExS1csYUFBTyxHQUFjLEVBQUUsQ0FBQztRQUt4QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixXQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUVyQyxVQUFVO1FBQ1Y7O1dBRUc7UUFDSCxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFhYixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUNyQzs7V0FFRztRQUNLLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFDMUIscUJBQWUsR0FBcUIsRUFBRSxDQUFDO1FBRy9DLFFBQVE7UUFDUjs7V0FFRztRQUNLLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFJeEIsaUJBQVcsR0FBVSxJQUFJLENBQUM7UUFDMUIsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDOztJQTRINUMsQ0FBQztJQTFIRywyQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBR3pELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwwQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFTyx5QkFBSSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUNsRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVwRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFVBQVU7SUFDRixzQ0FBaUIsR0FBekI7UUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSTtZQUN6QixPQUFPO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBQ0QsbUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxHQUFZLElBQUksQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztZQUMzQixDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7WUFFM0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELHNDQUFpQixHQUFqQixVQUFrQixDQUFVO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDTyxxQ0FBZ0IsR0FBeEI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyxnQ0FBVyxHQUFuQjtRQUNJLFNBQVM7UUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLEtBQUssR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksU0FBUyxHQUFxQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFMUQsUUFBUTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWpELElBQUk7UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBR0Q7Ozs7T0FJRztJQUNLLDRCQUFPLEdBQWYsVUFBZ0IsY0FBOEIsRUFBRSxHQUFxQjtRQUNqRSxZQUFZO1FBQ1osSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNO1lBQ1gsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULGNBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQixPQUFPO1FBQ1AsSUFBSSxHQUFHLEdBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUk7WUFDakIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNILDRCQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQztZQUNoQixPQUFPO1FBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxzQ0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUNBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLEVBQUU7SUFFVCxDQUFDO0lBektEO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLE9BQU8sRUFBRSxXQUFXO1NBQ3ZCLENBQUM7K0NBQzhCO0lBS2hDO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNO1NBQ2xCLENBQUM7bURBQ29DO0lBR3RDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZDQUNVO0lBZHBCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FnTDlCO0lBQUQsaUJBQUM7Q0FoTEQsQUFnTEMsQ0FoTHVDLEVBQUUsQ0FBQyxTQUFTLEdBZ0xuRDtrQkFoTG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRnJhbWVBbmltYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mcmFtZUFuaW1hdGlvblwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgQXJyb3dlciBmcm9tIFwiLi9hcnJvd2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycm93VG93ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlZlYzJdLFxuICAgICAgICB0b29sdGlwOiBcIuWQhOetiee6p+eahOS6uueahFnlnZDmoIdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBvZmZzZXRZOiBjYy5WZWMyW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhcnJvd1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlQXRsYXNdKVxuICAgIHByaXZhdGUgYXRsYXM6IGNjLlNwcml0ZUF0bGFzW10gPSBbXTtcblxuICAgIC8qIOWhlOeahOWxnuaApyAqL1xuICAgIC8qKlxuICAgICAqIOWhlOeahOetiee6p1xuICAgICAqL1xuICAgIGxldmVsOiBudW1iZXIgPSAxO1xuICAgIG1heExldmVsOiBudW1iZXIgPSA0O1xuICAgIHByaXZhdGUgYXR0YWNrOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog566t55qE6YCf5bqmXG4gICAgICovXG4gICAgcHJpdmF0ZSBzcGVlZE9mQXJyb3c6IG51bWJlcjtcbiAgICBzaG9vdFJhbmdlOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog5bCE5omL5bCE6YCfXG4gICAgICovXG4gICAgcHJpdmF0ZSBzcGVlZE9mU2hvb3Q6IG51bWJlcjtcbiAgICBwcmljZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBsZWZ0QXJyb3dlcjogQXJyb3dlciA9IG51bGw7XG4gICAgcHJpdmF0ZSByaWdodEFycm93ZXI6IEFycm93ZXIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOW3puWPs+S4pOS4quWjq+WFteeahCDluKfliqjnlLvnu4Tku7ZcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvd2VyQkc6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBmcmFtZUFuaW1hdGlvbnM6IEZyYW1lQW5pbWF0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIGdhbWVDb25maWc6IEdhbWVDb25maWc7XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICAvKipcbiAgICAgKiBmYWxzZeS4uuWjq+WFteacneS4i1xuICAgICAqL1xuICAgIHByaXZhdGUgdG93YXJkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICBwcml2YXRlIHdQb3M6IGNjLlZlYzI7XG4gICAgcHJpdmF0ZSBkYXRhT2ZUb3dlcjogYW55W10gPSBudWxsO1xuICAgIHByaXZhdGUgcG9vbE9mQXJyb3c6IGNjLk5vZGVQb29sID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgbGV0IGw6IGNjLk5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsZWZ0UGVyc29uXCIpO1xuICAgICAgICBsZXQgcjogY2MuTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJpZ2h0UGVyc29uXCIpO1xuICAgICAgICB0aGlzLmZyYW1lQW5pbWF0aW9uc1swXSA9IGwuZ2V0Q29tcG9uZW50KFwiZnJhbWVBbmltYXRpb25cIik7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb25zWzFdID0gci5nZXRDb21wb25lbnQoXCJmcmFtZUFuaW1hdGlvblwiKTtcbiAgICAgICAgdGhpcy5sZWZ0QXJyb3dlciA9IGwuZ2V0Q29tcG9uZW50KFwiYXJyb3dlclwiKVxuICAgICAgICB0aGlzLnJpZ2h0QXJyb3dlciA9IHIuZ2V0Q29tcG9uZW50KFwiYXJyb3dlclwiKVxuICAgICAgICB0aGlzLnRvd2VyQkcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5kYXRhT2ZUb3dlciA9IHRoaXMuZ2FtZUNvbmZpZy5nZXREYXRhT2ZBcnJvd1Rvd2VyKCk7XG5cblxuICAgICAgICB0aGlzLmNyZWF0ZVBvb2xPZkFycm93KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMud1BvcyA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0KCkge1xuICAgICAgICB0aGlzLmF0dGFjayA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLmF0dGFjaztcbiAgICAgICAgdGhpcy5zcGVlZE9mQXJyb3cgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS5zcGVlZE9mQXJyb3c7XG4gICAgICAgIHRoaXMuc2hvb3RSYW5nZSA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnNob290UmFuZ2U7XG4gICAgICAgIHRoaXMuc3BlZWRPZlNob290ID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uc3BlZWRPZlNob290O1xuICAgICAgICB0aGlzLnByaWNlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0ucHJpY2U7XG5cbiAgICAgICAgdGhpcy5pbml0QXJyb3dlcigpO1xuICAgIH1cblxuICAgIC8qIOeureWvueixoeaxoCAqL1xuICAgIHByaXZhdGUgY3JlYXRlUG9vbE9mQXJyb3coKSB7XG4gICAgICAgIGlmICh0aGlzLnBvb2xPZkFycm93ICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnBvb2xPZkFycm93ID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvb2xPZkFycm93LnB1dChjYy5pbnN0YW50aWF0ZSh0aGlzLmFycm93UHJlZmFiKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QXJyb3dCdWxsZXQoKTogY2MuTm9kZSB7XG4gICAgICAgIGxldCByOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucG9vbE9mQXJyb3cuc2l6ZSgpID4gMClcbiAgICAgICAgICAgIHIgPSB0aGlzLnBvb2xPZkFycm93LmdldCgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByID0gY2MuaW5zdGFudGlhdGUodGhpcy5hcnJvd1ByZWZhYik7XG4gICAgICAgIHIub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIHJlbGVhc2VBcnJvd0J1bGx0KG46IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZBcnJvdy5wdXQobik7XG4gICAgfVxuICAgIHByaXZhdGUgY2xlYXJQb29sT2ZBcnJvdygpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZBcnJvdy5jbGVhcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEFycm93ZXIoKSB7XG4gICAgICAgIC8v6K6+572u5L2N572u5ZKM5Zu+54mHXG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb25zWzBdLm5vZGUueSA9IHRoaXMub2Zmc2V0WVt0aGlzLmxldmVsIC0gMV0ueTtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW1hdGlvbnNbMV0ubm9kZS55ID0gdGhpcy5vZmZzZXRZW3RoaXMubGV2ZWwgLSAxXS55O1xuICAgICAgICBsZXQgYXRsYXM6IGNjLlNwcml0ZUF0bGFzID0gdGhpcy5hdGxhc1t0aGlzLmxldmVsIC0gMV07XG4gICAgICAgIGxldCBzcHJpdGVBcnI6IGNjLlNwcml0ZUZyYW1lW10gPSBhdGxhcy5nZXRTcHJpdGVGcmFtZXMoKTtcblxuICAgICAgICAvL+iuvue9ruWhlOeahOearuiCpFxuICAgICAgICB0aGlzLnRvd2VyQkcuc3ByaXRlRnJhbWUgPSBzcHJpdGVBcnJbMF07XG4gICAgICAgIHRoaXMuc2V0U2tpbih0aGlzLmZyYW1lQW5pbWF0aW9uc1swXSwgc3ByaXRlQXJyKTtcbiAgICAgICAgdGhpcy5zZXRTa2luKHRoaXMuZnJhbWVBbmltYXRpb25zWzFdLCBzcHJpdGVBcnIpO1xuXG4gICAgICAgIC8v5Lyg5Y+CXG4gICAgICAgIHRoaXMubGVmdEFycm93ZXIuaW5pdCh0aGlzLndQb3MsIHRoaXMuc3BlZWRPZkFycm93LCB0aGlzLnNob290UmFuZ2UsIHRoaXMuc3BlZWRPZlNob290LCB0aGlzLmF0dGFjayk7XG4gICAgICAgIHRoaXMucmlnaHRBcnJvd2VyLmluaXQodGhpcy53UG9zLCB0aGlzLnNwZWVkT2ZBcnJvdywgdGhpcy5zaG9vdFJhbmdlLCB0aGlzLnNwZWVkT2ZTaG9vdCwgdGhpcy5hdHRhY2spO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6K6+572u5aOr5YW155qE55qu6IKk5ZKM5bin5Yqo55S7XG4gICAgICogQHBhcmFtIGZyYW1lQW5pbWF0aW9uIFxuICAgICAqIEBwYXJhbSByZXMg5Zu+54mH6LWE5rqQXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTa2luKGZyYW1lQW5pbWF0aW9uOiBGcmFtZUFuaW1hdGlvbiwgcmVzOiBjYy5TcHJpdGVGcmFtZVtdKSB7XG4gICAgICAgIC8v6K6+572u5aOr5YW1562J5b6F5pe255qE55qu6IKkXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSA1OyAvL+acneS4i1xuICAgICAgICBpZiAodGhpcy50b3dhcmQpXG4gICAgICAgICAgICBpID0gNlxuICAgICAgICBmcmFtZUFuaW1hdGlvbi5zZXRTcHJpdGVGcmFtZShyZXNbaV0pO1xuICAgICAgICBmcmFtZUFuaW1hdGlvbi5zZXRJZGxlKHJlc1tpXSk7XG5cbiAgICAgICAgLy/orr7nva7luKfliqjnlLtcbiAgICAgICAgbGV0IGFycjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgICAgICBpID0gMTtcbiAgICAgICAgaWYgKHRoaXMudG93YXJkKSAvL+acneS4i1xuICAgICAgICAgICAgaSA9IDc7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxuICAgICAgICAgICAgYXJyLnB1c2gocmVzW2kgKyBqXSk7XG4gICAgICAgIGZyYW1lQW5pbWF0aW9uLnNldEZyYW1lQXJyYXkoYXJyKTtcbiAgICB9XG5cbiAgICBkZXN0cm95U2VsZigpIHtcbiAgICAgICAgdGhpcy5jbGVhclBvb2xPZkFycm93KCk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICovXG4gICAgdXBncmFkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IDQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJpY2VPZlVwZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbF0ucHJpY2U7XG4gICAgfVxuXG4gICAgZ2V0RGF0YU9mVG93ZXIoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhT2ZUb3dlcjtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/tower/barrack/barrack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9089VY9YNLELObh8F5yn0M', 'barrack');
// scripts/levelScene/tower/barrack/barrack.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var soldier_1 = require("./soldier");
var utils_1 = require("../../../common/module/utils");
var gameDataManager_1 = require("../../../common/module/gameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Barrack = /** @class */ (function (_super) {
    __extends(Barrack, _super);
    function Barrack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soldierPrefab = null;
        _this.outSoldierPos = cc.v2(0, 0);
        _this.tower1 = [];
        _this.tower2 = [];
        _this.tower3 = [];
        _this.tower4 = [];
        _this.BGFrameAnim = null;
        _this.personMap = null;
        /* 塔的属性 */
        _this.level = 1;
        _this.maxLevel = 4;
        _this.maxNumOfSoldier = 3;
        /* 数据 */
        /**
         * 可用的驻点编号
         */
        _this.availableStationNo = null;
        /**
         * 塔的帧动画图片
         */
        _this.towerFrames = [];
        _this.createdSoldiers = [];
        /* 控制 */
        /**
         * 是否在造兵
         */
        _this.creSoldEnable = true;
        return _this;
    }
    Barrack.prototype.onLoad = function () {
        this.towerFrames.push(this.tower1);
        this.towerFrames.push(this.tower2);
        this.towerFrames.push(this.tower3);
        this.towerFrames.push(this.tower4);
        this.BGFrameAnim = this.node.getChildByName("bg").getComponent("frameAnimation");
        this.personMap = cc.find("Canvas/personMap");
        this.createSoldierPool();
        var gc = gameDataManager_1.default.getGameConfig();
        this.dataOfTower = gc.getDataOfBarrack();
    };
    Barrack.prototype.start = function () {
        this.init();
    };
    /**
     * 根据等级设置 动画。
     */
    Barrack.prototype.init = function () {
        this.tOfCreateSoldier = this.dataOfTower[this.level - 1].tOfCreateSoldier;
        this.price = this.dataOfTower[this.level - 1].price;
        this.availableStationNo = [0, 1, 2];
        this.refreshFrameAnim();
    };
    /**
     * 更新帧动画
     */
    Barrack.prototype.refreshFrameAnim = function () {
        this.BGFrameAnim.setFrameArray(this.towerFrames[this.level - 1]);
        this.BGFrameAnim.setSpriteFrame(this.towerFrames[this.level - 1][0]);
    };
    Barrack.prototype.createSoldierPool = function () {
        this.soldierPool = new cc.NodePool();
        for (var i = 0; i < this.maxNumOfSoldier; i++) {
            var n = cc.instantiate(this.soldierPrefab);
            this.soldierPool.put(n);
        }
    };
    /**
     * 释放士兵资源
     * @param soldier
     */
    Barrack.prototype.releaseSoldier = function (soldier) {
        this.availableStationNo.push(soldier.stationNo);
        utils_1.default.remvoeItemOfArray(this.createdSoldiers, soldier);
        this.soldierPool.put(soldier.node);
    };
    Barrack.prototype.destroySelf = function () {
        //删除塔生成的所有士兵
        while (this.createdSoldiers.length > 0) {
            var s = this.createdSoldiers[0];
            s.die(soldier_1.default.soldiersOfAlive, s);
            s.releaseSelf();
        }
        //清空对象池
        this.soldierPool.clear();
        this.node.destroy();
    };
    /**
     * 升级
     */
    Barrack.prototype.upgrade = function () {
        if (this.level === 4)
            return;
        this.level++;
        this.tOfCreateSoldier = this.dataOfTower[this.level - 1].tOfCreateSoldier;
        this.price = this.dataOfTower[this.level - 1].price;
        this.refreshFrameAnim();
    };
    Barrack.prototype.getPriceOfUpgrade = function () {
        return this.dataOfTower[this.level].price;
    };
    Barrack.prototype.getDataOfTower = function () {
        return this.dataOfTower;
    };
    Barrack.prototype.autoOutSoldier = function () {
        if (this.creSoldEnable && this.createdSoldiers.length < this.maxNumOfSoldier) {
            this.creSoldEnable = false;
            this.scheduleOnce(this.outSoldier.bind(this), this.tOfCreateSoldier);
        }
    };
    /**
     * 出兵
     * @param station 兵的驻点 世界坐标
     */
    Barrack.prototype.outSoldier = function () {
        this.BGFrameAnim.play(false, false, false, function () {
            var s = this.createSoldier();
            this.BGFrameAnim.play(false, false, true, function () {
                this.creSoldEnable = true;
            }.bind(this));
        }.bind(this));
    };
    Barrack.prototype.createSoldier = function () {
        var node = this.getSoldierInPool();
        var s = node.getComponent("soldier");
        this.createdSoldiers.push(s);
        soldier_1.default.soldiersOfAlive.push(s);
        this.personMap.addChild(node);
        var outPos = this.node.convertToWorldSpaceAR(this.outSoldierPos);
        outPos = this.personMap.convertToNodeSpaceAR(outPos);
        node.setPosition(outPos);
        var i = this.availableStationNo.pop();
        s.init(i, this.stationOfSoldier[i], this.level, this);
        return s;
    };
    Barrack.prototype.getSoldierInPool = function () {
        var n;
        if (this.soldierPool.size() > 0) {
            n = this.soldierPool.get();
            n.opacity = 255;
        }
        else
            n = cc.instantiate(this.soldierPrefab);
        return n;
    };
    Barrack.prototype.update = function (dt) {
        this.autoOutSoldier();
    };
    __decorate([
        property({
            type: cc.Prefab
        })
    ], Barrack.prototype, "soldierPrefab", void 0);
    __decorate([
        property({ tooltip: "出兵点, 节点坐标" })
    ], Barrack.prototype, "outSoldierPos", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower1", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower2", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower3", void 0);
    __decorate([
        property({
            type: [cc.SpriteFrame]
        })
    ], Barrack.prototype, "tower4", void 0);
    Barrack = __decorate([
        ccclass
    ], Barrack);
    return Barrack;
}(cc.Component));
exports.default = Barrack;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYmFycmFjay9iYXJyYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFDQUFnQztBQUNoQyxzREFBaUQ7QUFDakQsMEVBQXFGO0FBRS9FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBdU1DO1FBbE1XLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFLckMsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFJOUIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFJOUIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFJOUIsWUFBTSxHQUFxQixFQUFFLENBQUM7UUFFOUIsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHbEMsVUFBVTtRQUNWLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNiLHFCQUFlLEdBQVcsQ0FBQyxDQUFDO1FBT3BDLFFBQVE7UUFDUjs7V0FFRztRQUNLLHdCQUFrQixHQUFhLElBQUksQ0FBQztRQUM1Qzs7V0FFRztRQUNLLGlCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLHFCQUFlLEdBQWMsRUFBRSxDQUFDO1FBR3hDLFFBQVE7UUFDUjs7V0FFRztRQUNLLG1CQUFhLEdBQVksSUFBSSxDQUFDOztJQTRJMUMsQ0FBQztJQTFJRyx3QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFB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QUFELGNBQUM7Q0F2TUQsQUF1TUMsQ0F2TW9DLEVBQUUsQ0FBQyxTQUFTLEdBdU1oRDtrQkF2TW9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRnJhbWVBbmltYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mcmFtZUFuaW1hdGlvblwiO1xuaW1wb3J0IFNvbGRpZXIgZnJvbSBcIi4vc29sZGllclwiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi8uLi9jb21tb24vbW9kdWxlL3V0aWxzXCI7XG5pbXBvcnQgR2FtZURhdGFTdG9yYWdlLCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL21vZHVsZS9nYW1lRGF0YU1hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhcnJhY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgfSlcbiAgICBwcml2YXRlIHNvbGRpZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuWHuuWFteeCuSwg6IqC54K55Z2Q5qCHXCIgfSlcbiAgICBwcml2YXRlIG91dFNvbGRpZXJQb3M6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICB9KVxuICAgIHByaXZhdGUgdG93ZXIxOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgIH0pXG4gICAgcHJpdmF0ZSB0b3dlcjI6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgfSlcbiAgICBwcml2YXRlIHRvd2VyMzogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICB9KVxuICAgIHByaXZhdGUgdG93ZXI0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIEJHRnJhbWVBbmltOiBGcmFtZUFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBwZXJzb25NYXA6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICAvKiDloZTnmoTlsZ7mgKcgKi9cbiAgICBsZXZlbDogbnVtYmVyID0gMTtcbiAgICBtYXhMZXZlbDogbnVtYmVyID0gNDtcbiAgICBwcml2YXRlIG1heE51bU9mU29sZGllcjogbnVtYmVyID0gMztcbiAgICAvKipcbiAgICAgKiDlh7rlhbXml7bpl7RcbiAgICAgKi9cbiAgICBwcml2YXRlIHRPZkNyZWF0ZVNvbGRpZXI6IG51bWJlcjtcbiAgICBwcmljZTogbnVtYmVyO1xuXG4gICAgLyog5pWw5o2uICovXG4gICAgLyoqXG4gICAgICog5Y+v55So55qE6am754K557yW5Y+3XG4gICAgICovXG4gICAgcHJpdmF0ZSBhdmFpbGFibGVTdGF0aW9uTm86IG51bWJlcltdID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiDloZTnmoTluKfliqjnlLvlm77niYdcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvd2VyRnJhbWVzID0gW107XG4gICAgc3RhdGlvbk9mU29sZGllcjogY2MuVmVjMltdO1xuICAgIHByaXZhdGUgc29sZGllclBvb2w6IGNjLk5vZGVQb29sO1xuICAgIHByaXZhdGUgY3JlYXRlZFNvbGRpZXJzOiBTb2xkaWVyW10gPSBbXTtcbiAgICBwcml2YXRlIGRhdGFPZlRvd2VyOiBhbnlbXTtcblxuICAgIC8qIOaOp+WItiAqL1xuICAgIC8qKlxuICAgICAqIOaYr+WQpuWcqOmAoOWFtVxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlU29sZEVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyMSk7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyMik7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyMyk7XG4gICAgICAgIHRoaXMudG93ZXJGcmFtZXMucHVzaCh0aGlzLnRvd2VyNCk7XG5cbiAgICAgICAgdGhpcy5CR0ZyYW1lQW5pbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENvbXBvbmVudChcImZyYW1lQW5pbWF0aW9uXCIpO1xuICAgICAgICB0aGlzLnBlcnNvbk1hcCA9IGNjLmZpbmQoXCJDYW52YXMvcGVyc29uTWFwXCIpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNvbGRpZXJQb29sKCk7XG5cbiAgICAgICAgbGV0IGdjOiBHYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5kYXRhT2ZUb3dlciA9IGdjLmdldERhdGFPZkJhcnJhY2soKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruetiee6p+iuvue9riDliqjnlLvjgIJcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRPZkNyZWF0ZVNvbGRpZXIgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS50T2ZDcmVhdGVTb2xkaWVyO1xuICAgICAgICB0aGlzLnByaWNlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0ucHJpY2U7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlU3RhdGlvbk5vID0gWzAsIDEsIDJdO1xuICAgICAgICB0aGlzLnJlZnJlc2hGcmFtZUFuaW0oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmm7TmlrDluKfliqjnlLtcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlZnJlc2hGcmFtZUFuaW0oKSB7XG4gICAgICAgIHRoaXMuQkdGcmFtZUFuaW0uc2V0RnJhbWVBcnJheSh0aGlzLnRvd2VyRnJhbWVzW3RoaXMubGV2ZWwgLSAxXSk7XG4gICAgICAgIHRoaXMuQkdGcmFtZUFuaW0uc2V0U3ByaXRlRnJhbWUodGhpcy50b3dlckZyYW1lc1t0aGlzLmxldmVsIC0gMV1bMF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU29sZGllclBvb2woKSB7XG4gICAgICAgIHRoaXMuc29sZGllclBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1heE51bU9mU29sZGllcjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbjogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc29sZGllclByZWZhYik7XG4gICAgICAgICAgICB0aGlzLnNvbGRpZXJQb29sLnB1dChuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHiuaUvuWjq+WFtei1hOa6kFxuICAgICAqIEBwYXJhbSBzb2xkaWVyIFxuICAgICAqL1xuICAgIHJlbGVhc2VTb2xkaWVyKHNvbGRpZXI6IFNvbGRpZXIpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVTdGF0aW9uTm8ucHVzaChzb2xkaWVyLnN0YXRpb25Obyk7XG4gICAgICAgIFV0aWxzLnJlbXZvZUl0ZW1PZkFycmF5KHRoaXMuY3JlYXRlZFNvbGRpZXJzLCBzb2xkaWVyKTtcbiAgICAgICAgdGhpcy5zb2xkaWVyUG9vbC5wdXQoc29sZGllci5ub2RlKTtcbiAgICB9XG5cbiAgICBkZXN0cm95U2VsZigpIHtcbiAgICAgICAgLy/liKDpmaTloZTnlJ/miJDnmoTmiYDmnInlo6vlhbVcbiAgICAgICAgd2hpbGUgKHRoaXMuY3JlYXRlZFNvbGRpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBzOiBTb2xkaWVyID0gdGhpcy5jcmVhdGVkU29sZGllcnNbMF07XG4gICAgICAgICAgICBzLmRpZShTb2xkaWVyLnNvbGRpZXJzT2ZBbGl2ZSwgcyk7XG4gICAgICAgICAgICBzLnJlbGVhc2VTZWxmKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL+a4heepuuWvueixoeaxoFxuICAgICAgICB0aGlzLnNvbGRpZXJQb29sLmNsZWFyKCk7XG5cbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDljYfnuqdcbiAgICAgKi9cbiAgICB1cGdyYWRlKCkge1xuICAgICAgICBpZiAodGhpcy5sZXZlbCA9PT0gNClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5sZXZlbCsrO1xuICAgICAgICB0aGlzLnRPZkNyZWF0ZVNvbGRpZXIgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS50T2ZDcmVhdGVTb2xkaWVyO1xuICAgICAgICB0aGlzLnByaWNlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0ucHJpY2U7XG4gICAgICAgIHRoaXMucmVmcmVzaEZyYW1lQW5pbSgpO1xuICAgIH1cblxuICAgIGdldFByaWNlT2ZVcGdyYWRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWxdLnByaWNlO1xuICAgIH1cblxuICAgIGdldERhdGFPZlRvd2VyKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdXRvT3V0U29sZGllcigpIHtcbiAgICAgICAgaWYgKHRoaXMuY3JlU29sZEVuYWJsZSAmJiB0aGlzLmNyZWF0ZWRTb2xkaWVycy5sZW5ndGggPCB0aGlzLm1heE51bU9mU29sZGllcikge1xuICAgICAgICAgICAgdGhpcy5jcmVTb2xkRW5hYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLm91dFNvbGRpZXIuYmluZCh0aGlzKSwgdGhpcy50T2ZDcmVhdGVTb2xkaWVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlh7rlhbVcbiAgICAgKiBAcGFyYW0gc3RhdGlvbiDlhbXnmoTpqbvngrkg5LiW55WM5Z2Q5qCHXG4gICAgICovXG4gICAgcHJpdmF0ZSBvdXRTb2xkaWVyKCkge1xuICAgICAgICB0aGlzLkJHRnJhbWVBbmltLnBsYXkoZmFsc2UsIGZhbHNlLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHM6IFNvbGRpZXIgPSB0aGlzLmNyZWF0ZVNvbGRpZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5CR0ZyYW1lQW5pbS5wbGF5KGZhbHNlLCBmYWxzZSwgdHJ1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlU29sZEVuYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlU29sZGllcigpOiBTb2xkaWVyIHtcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSB0aGlzLmdldFNvbGRpZXJJblBvb2woKTtcbiAgICAgICAgbGV0IHM6IFNvbGRpZXIgPSBub2RlLmdldENvbXBvbmVudChcInNvbGRpZXJcIik7XG4gICAgICAgIHRoaXMuY3JlYXRlZFNvbGRpZXJzLnB1c2gocyk7XG4gICAgICAgIFNvbGRpZXIuc29sZGllcnNPZkFsaXZlLnB1c2gocyk7XG4gICAgICAgIHRoaXMucGVyc29uTWFwLmFkZENoaWxkKG5vZGUpO1xuXG4gICAgICAgIGxldCBvdXRQb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMub3V0U29sZGllclBvcyk7XG4gICAgICAgIG91dFBvcyA9IHRoaXMucGVyc29uTWFwLmNvbnZlcnRUb05vZGVTcGFjZUFSKG91dFBvcyk7XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ob3V0UG9zKTtcblxuICAgICAgICBsZXQgaTogbnVtYmVyID0gdGhpcy5hdmFpbGFibGVTdGF0aW9uTm8ucG9wKCk7XG4gICAgICAgIHMuaW5pdChpLCB0aGlzLnN0YXRpb25PZlNvbGRpZXJbaV0sIHRoaXMubGV2ZWwsIHRoaXMpO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRTb2xkaWVySW5Qb29sKCk6IGNjLk5vZGUge1xuICAgICAgICBsZXQgbjogY2MuTm9kZTtcbiAgICAgICAgaWYgKHRoaXMuc29sZGllclBvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbiA9IHRoaXMuc29sZGllclBvb2wuZ2V0KCk7XG4gICAgICAgICAgICBuLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc29sZGllclByZWZhYik7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLmF1dG9PdXRTb2xkaWVyKCk7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/animationPath.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '06f6d0vxPFBFYgusIPYpJNx', 'animationPath');
// scripts/common/animationPath.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BezierPart = void 0;
//animationPath.ts
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 贝塞尔曲线段类
var BezierPart = /** @class */ (function () {
    /**
     * 贝塞尔曲线段类
     * @param startP 开始点坐标
     * @param cP1 控制点1
     * @param cP2 控制点2
     * @param endP 结束点
     */
    function BezierPart(startP, cP1, cP2, endP) {
        /**
         * 将贝塞尔曲线分成多个点，不包含开始端点
         */
        this.posArray = [];
        this.lenght = null;
        this.startPos = startP;
        this.cPos1 = cP1;
        this.cPos2 = cP2;
        this.endPos = endP;
        this.lenght = this.getBezierLen();
    }
    /**
     * 每隔len个像素生成一个点,曲线开始的端点不生成点
     * @param len
     */
    BezierPart.prototype.createPosArray = function (len) {
        var fn = Math.floor(this.lenght / len);
        var i = 1 / fn;
        for (var t = i; t <= 1; t += i) {
            var x = this.bezier(this.startPos.x, this.cPos1.x, this.cPos2.x, this.endPos.x, t);
            var y = this.bezier(this.startPos.y, this.cPos1.y, this.cPos2.y, this.endPos.y, t);
            this.posArray.push(cc.v2(x, y));
        }
        if (this.posArray.length < fn) { //补上结束端点
            this.posArray.push(this.endPos);
        }
    };
    /**
     * 获得曲线长度
     * @param f 将一段曲线分为多少份来求长度,默认20
     */
    BezierPart.prototype.getBezierLen = function (f) {
        if (f === void 0) { f = 20; }
        var t = 1 / 20;
        var l = 0;
        var i;
        var cP;
        var lastP = cc.v2(0, 0);
        for (i = 0; i <= 1; i += t) {
            var x = this.bezier(this.startPos.x, this.cPos1.x, this.cPos2.x, this.endPos.x, i);
            var y = this.bezier(this.startPos.y, this.cPos1.y, this.cPos2.y, this.endPos.y, i);
            cP = cc.v2(x, y);
            l += (cP.sub(lastP)).mag();
            lastP = cP;
        }
        return l;
    };
    BezierPart.prototype.bezier = function (v1, v2, v3, v4, t) {
        return v1 * Math.pow(1 - t, 3) + 3 * v2 * t * Math.pow(1 - t, 2) + 3 * v3 * t * t * (1 - t) + v4 * Math.pow(t, 3);
    };
    return BezierPart;
}());
exports.BezierPart = BezierPart;
var AnimationPath = /** @class */ (function (_super) {
    __extends(AnimationPath, _super);
    function AnimationPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.griphics = null;
        return _this;
    }
    AnimationPath.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    AnimationPath.prototype.start = function () {
        // this.drawPath(this.getNodePath("road1"));
        // this.drawPath(this.getNodePath("road2"));
        // this.drawPath(this.getNodePath("road3"));
    };
    /**
     * Gets world path
     * @param pathName
     * @returns world path
     */
    AnimationPath.prototype.getWorldPath = function (pathName) {
        var path = this.getNodePath(pathName);
        for (var i = 0; i < path.length; i++)
            path[i] = this.node.convertToWorldSpaceAR(path[i]);
        return path;
    };
    /**
     * @param pathName
     * @returns 节点坐标
     */
    AnimationPath.prototype.getNodePath = function (pathName) {
        var clips = this.animation.getClips();
        var clip = clips[0];
        var paths = clip.curveData.paths; //动画路径数组
        var frameArray = paths[pathName].props.position; //关键帧数组即为一条路径            
        var bezierPartArray = this.getBezierPartArray(frameArray);
        var path = this._getPath(bezierPartArray);
        return path;
    };
    /**
     * 得到点路径
     * @param bezierPartArray 曲线数组
     * @returns path 不含路径起点坐标
     */
    AnimationPath.prototype._getPath = function (bezierPartArray) {
        var pArray = [];
        var bezier;
        for (var i = 0; i < bezierPartArray.length; i++) {
            bezier = bezierPartArray[i];
            bezier.createPosArray(16);
            pArray = pArray.concat(bezier.posArray);
        }
        return pArray;
    };
    /**
     * 由关键帧数组 得到 曲线段数组
     * @param frameArray 关键帧数组
     */
    AnimationPath.prototype.getBezierPartArray = function (frameArray) {
        var bezierPartArray = [];
        //两个关键帧组成一条路径
        for (var j = 0; j < frameArray.length - 1; j++) {
            var arr = this.createBezierPartArray(frameArray[j], frameArray[j + 1]);
            bezierPartArray = bezierPartArray.concat(arr);
        }
        return bezierPartArray;
    };
    /**
     * 由两个关键帧 生成 它们构成的贝塞尔曲线段数组
     * @param startKeyFrame 开始关键帧
     * @param endKeyFrame 结束关键帧
     */
    AnimationPath.prototype.createBezierPartArray = function (startKeyFrame, endKeyFrame) {
        var bezierPartArray = [];
        var startP, cP1, cP2, endP;
        var motionPath = startKeyFrame.motionPath; //移动路径数组即主控制点数组
        var moPathSP, moPathEP; //一段曲线上的首尾端主控制点
        //第一段
        startP = cc.v2(startKeyFrame.value[0], startKeyFrame.value[1]);
        moPathEP = motionPath[0];
        cP1 = cP2 = cc.v2(moPathEP[2], moPathEP[3]);
        endP = cc.v2(moPathEP[0], moPathEP[1]);
        bezierPartArray.push(new BezierPart(startP, cP1, cP2, endP));
        for (var i = 0; i < motionPath.length - 1; i++) { //0 - len - 1, len - 3 len - 2 len -1
            moPathSP = motionPath[i];
            moPathEP = motionPath[i + 1];
            startP = cc.v2(moPathSP[0], moPathSP[1]);
            cP1 = cc.v2(moPathSP[4], moPathSP[5]);
            cP2 = cc.v2(moPathEP[2], moPathEP[3]);
            endP = cc.v2(moPathEP[0], moPathEP[1]);
            bezierPartArray.push(new BezierPart(startP, cP1, cP2, endP));
        }
        //最后一段
        moPathSP = motionPath[motionPath.length - 1];
        startP = cc.v2(moPathSP[0], moPathSP[1]);
        cP1 = cP2 = cc.v2(moPathSP[4], moPathSP[5]);
        endP = cc.v2(endKeyFrame.value[0], endKeyFrame.value[1]);
        bezierPartArray.push(new BezierPart(startP, cP1, cP2, endP));
        return bezierPartArray;
    };
    AnimationPath.prototype.drawPath = function (pointArray) {
        this.griphics.moveTo(pointArray[0].x, pointArray[0].y);
        for (var i = 1; i < pointArray.length; i++)
            this.griphics.lineTo(pointArray[i].x, pointArray[i].y);
        this.griphics.stroke();
    };
    /**
     * 画出曲线的控制点
     * @param bezierPartArray 曲线数组
     */
    AnimationPath.prototype.drawContrlPoint = function (bezierPartArray) {
        for (var i = 0; i < bezierPartArray.length; i++) {
            this.drawPoint(bezierPartArray[i].startPos);
            this.drawPoint(bezierPartArray[i].cPos1, cc.Color.BLUE);
            this.drawPoint(bezierPartArray[i].cPos2, cc.Color.BLUE);
            this.drawPoint(bezierPartArray[i].endPos);
        }
    };
    /**
     * Draws point
     * @param point 点坐标
     * @param color 默认颜色为红色
     */
    AnimationPath.prototype.drawPoint = function (point, color) {
        if (color === void 0) { color = null; }
        if (color === null)
            this.griphics.strokeColor = cc.Color.RED;
        else
            this.griphics.strokeColor = color;
        if (point.length) {
            for (var i = 0; i < point.length; i++) {
                this.griphics.circle(point[i].x, point[i].y, 2);
                this.griphics.stroke();
            }
        }
        else {
            this.griphics.circle(point.x, point.y, 2);
            this.griphics.stroke();
        }
    };
    AnimationPath = __decorate([
        ccclass
    ], AnimationPath);
    return AnimationPath;
}(cc.Component));
exports.default = AnimationPath;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9hbmltYXRpb25QYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQkFBa0I7QUFDWixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxVQUFVO0FBQ1Y7SUFXSTs7Ozs7O09BTUc7SUFDSCxvQkFBWSxNQUFlLEVBQUUsR0FBWSxFQUFFLEdBQVksRUFBRSxJQUFhO1FBYnRFOztXQUVHO1FBQ0gsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUN6QixXQUFNLEdBQVcsSUFBSSxDQUFDO1FBVWxCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxtQ0FBYyxHQUFkLFVBQWUsR0FBVztRQUN0QixJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxD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RXpDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUV0QyxJQUFnQixLQUFNLENBQUMsTUFBTSxFQUFFO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBZSxLQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDMUI7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQVcsS0FBTSxDQUFDLENBQUMsRUFBWSxLQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDMUI7SUFFTCxDQUFDO0lBNUpnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNkpqQztJQUFELG9CQUFDO0NBN0pELEFBNkpDLENBN0owQyxFQUFFLENBQUMsU0FBUyxHQTZKdEQ7a0JBN0pvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9hbmltYXRpb25QYXRoLnRzXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vLyDotJ3loZ7lsJTmm7Lnur/mrrXnsbtcbmV4cG9ydCBjbGFzcyBCZXppZXJQYXJ0IHtcbiAgICBzdGFydFBvczogY2MuVmVjMjtcbiAgICBjUG9zMTogY2MuVmVjMjtcbiAgICBjUG9zMjogY2MuVmVjMjtcbiAgICBlbmRQb3M6IGNjLlZlYzI7XG4gICAgLyoqXG4gICAgICog5bCG6LSd5aGe5bCU5puy57q/5YiG5oiQ5aSa5Liq54K577yM5LiN5YyF5ZCr5byA5aeL56uv54K5XG4gICAgICovXG4gICAgcG9zQXJyYXk6IGNjLlZlYzJbXSA9IFtdO1xuICAgIGxlbmdodDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOi0neWhnuWwlOabsue6v+auteexu1xuICAgICAqIEBwYXJhbSBzdGFydFAg5byA5aeL54K55Z2Q5qCHIFxuICAgICAqIEBwYXJhbSBjUDEg5o6n5Yi254K5MVxuICAgICAqIEBwYXJhbSBjUDIg5o6n5Yi254K5MlxuICAgICAqIEBwYXJhbSBlbmRQIOe7k+adn+eCuVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0UDogY2MuVmVjMiwgY1AxOiBjYy5WZWMyLCBjUDI6IGNjLlZlYzIsIGVuZFA6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IHN0YXJ0UDtcbiAgICAgICAgdGhpcy5jUG9zMSA9IGNQMTtcbiAgICAgICAgdGhpcy5jUG9zMiA9IGNQMjtcbiAgICAgICAgdGhpcy5lbmRQb3MgPSBlbmRQO1xuXG4gICAgICAgIHRoaXMubGVuZ2h0ID0gdGhpcy5nZXRCZXppZXJMZW4oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmr4/pmpRsZW7kuKrlg4/ntKDnlJ/miJDkuIDkuKrngrks5puy57q/5byA5aeL55qE56uv54K55LiN55Sf5oiQ54K5XG4gICAgICogQHBhcmFtIGxlbiBcbiAgICAgKi9cbiAgICBjcmVhdGVQb3NBcnJheShsZW46IG51bWJlcikge1xuICAgICAgICBsZXQgZm46IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5sZW5naHQgLyBsZW4pO1xuICAgICAgICBsZXQgaTogbnVtYmVyID0gMSAvIGZuO1xuICAgICAgICBmb3IgKGxldCB0ID0gaTsgdCA8PSAxOyB0ICs9IGkpIHtcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSB0aGlzLmJlemllcih0aGlzLnN0YXJ0UG9zLngsIHRoaXMuY1BvczEueCwgdGhpcy5jUG9zMi54LCB0aGlzLmVuZFBvcy54LCB0KTtcbiAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSB0aGlzLmJlemllcih0aGlzLnN0YXJ0UG9zLnksIHRoaXMuY1BvczEueSwgdGhpcy5jUG9zMi55LCB0aGlzLmVuZFBvcy55LCB0KTtcbiAgICAgICAgICAgIHRoaXMucG9zQXJyYXkucHVzaChjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zQXJyYXkubGVuZ3RoIDwgZm4pIHsgLy/ooaXkuIrnu5PmnZ/nq6/ngrlcbiAgICAgICAgICAgIHRoaXMucG9zQXJyYXkucHVzaCh0aGlzLmVuZFBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflvpfmm7Lnur/plb/luqZcbiAgICAgKiBAcGFyYW0gZiDlsIbkuIDmrrXmm7Lnur/liIbkuLrlpJrlsJHku73mnaXmsYLplb/luqYs6buY6K6kMjBcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEJlemllckxlbihmOiBudW1iZXIgPSAyMCk6IG51bWJlciB7XG4gICAgICAgIGxldCB0OiBudW1iZXIgPSAxIC8gMjA7XG4gICAgICAgIGxldCBsOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgaTogbnVtYmVyO1xuICAgICAgICBsZXQgY1A6IGNjLlZlYzI7XG4gICAgICAgIGxldCBsYXN0UDogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IDE7IGkgKz0gdCkge1xuICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IHRoaXMuYmV6aWVyKHRoaXMuc3RhcnRQb3MueCwgdGhpcy5jUG9zMS54LCB0aGlzLmNQb3MyLngsIHRoaXMuZW5kUG9zLngsIGkpO1xuICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMuYmV6aWVyKHRoaXMuc3RhcnRQb3MueSwgdGhpcy5jUG9zMS55LCB0aGlzLmNQb3MyLnksIHRoaXMuZW5kUG9zLnksIGkpO1xuICAgICAgICAgICAgY1AgPSBjYy52Mih4LCB5KTtcbiAgICAgICAgICAgIGwgKz0gKGNQLnN1YihsYXN0UCkpLm1hZygpO1xuICAgICAgICAgICAgbGFzdFAgPSBjUDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJlemllcih2MTogbnVtYmVyLCB2MjogbnVtYmVyLCB2MzogbnVtYmVyLCB2NDogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdjEgKiBNYXRoLnBvdygxIC0gdCwgMykgKyAzICogdjIgKiB0ICogTWF0aC5wb3coMSAtIHQsIDIpICsgMyAqIHYzICogdCAqIHQgKiAoMSAtIHQpICsgdjQgKiBNYXRoLnBvdyh0LCAzKTtcbiAgICB9XG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb25QYXRoIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG4gICAgcHJpdmF0ZSBhbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBncmlwaGljczogY2MuR3JhcGhpY3MgPSBudWxsO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIHRoaXMuZHJhd1BhdGgodGhpcy5nZXROb2RlUGF0aChcInJvYWQxXCIpKTtcbiAgICAgICAgLy8gdGhpcy5kcmF3UGF0aCh0aGlzLmdldE5vZGVQYXRoKFwicm9hZDJcIikpO1xuICAgICAgICAvLyB0aGlzLmRyYXdQYXRoKHRoaXMuZ2V0Tm9kZVBhdGgoXCJyb2FkM1wiKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3b3JsZCBwYXRoXG4gICAgICogQHBhcmFtIHBhdGhOYW1lIFxuICAgICAqIEByZXR1cm5zIHdvcmxkIHBhdGggXG4gICAgICovXG4gICAgZ2V0V29ybGRQYXRoKHBhdGhOYW1lOiBzdHJpbmcpOiBjYy5WZWMyW10ge1xuICAgICAgICBsZXQgcGF0aCA9IHRoaXMuZ2V0Tm9kZVBhdGgocGF0aE5hbWUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBwYXRoW2ldID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwYXRoW2ldKTtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhdGhOYW1lIFxuICAgICAqIEByZXR1cm5zIOiKgueCueWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0Tm9kZVBhdGgocGF0aE5hbWU6IHN0cmluZyk6IGNjLlZlYzJbXSB7XG4gICAgICAgIGxldCBjbGlwczogY2MuQW5pbWF0aW9uQ2xpcFtdID0gdGhpcy5hbmltYXRpb24uZ2V0Q2xpcHMoKTtcbiAgICAgICAgbGV0IGNsaXA6IGNjLkFuaW1hdGlvbkNsaXAgPSBjbGlwc1swXTtcbiAgICAgICAgbGV0IHBhdGhzID0gY2xpcC5jdXJ2ZURhdGEucGF0aHM7IC8v5Yqo55S76Lev5b6E5pWw57uEXG4gICAgICAgIGxldCBmcmFtZUFycmF5ID0gcGF0aHNbcGF0aE5hbWVdLnByb3BzLnBvc2l0aW9uOyAvL+WFs+mUruW4p+aVsOe7hOWNs+S4uuS4gOadoei3r+W+hCAgICAgICAgICAgIFxuICAgICAgICBsZXQgYmV6aWVyUGFydEFycmF5OiBCZXppZXJQYXJ0W10gPSB0aGlzLmdldEJlemllclBhcnRBcnJheShmcmFtZUFycmF5KTtcbiAgICAgICAgbGV0IHBhdGg6IGNjLlZlYzJbXSA9IHRoaXMuX2dldFBhdGgoYmV6aWVyUGFydEFycmF5KTtcblxuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvpfliLDngrnot6/lvoRcbiAgICAgKiBAcGFyYW0gYmV6aWVyUGFydEFycmF5IOabsue6v+aVsOe7hCBcbiAgICAgKiBAcmV0dXJucyBwYXRoIOS4jeWQq+i3r+W+hOi1t+eCueWdkOagh1xuICAgICAqL1xuICAgIHByaXZhdGUgX2dldFBhdGgoYmV6aWVyUGFydEFycmF5OiBCZXppZXJQYXJ0W10pOiBjYy5WZWMyW10ge1xuICAgICAgICBsZXQgcEFycmF5OiBjYy5WZWMyW10gPSBbXTtcbiAgICAgICAgbGV0IGJlemllcjogQmV6aWVyUGFydDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZXppZXJQYXJ0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJlemllciA9IGJlemllclBhcnRBcnJheVtpXTtcbiAgICAgICAgICAgIGJlemllci5jcmVhdGVQb3NBcnJheSgxNik7XG4gICAgICAgICAgICBwQXJyYXkgPSBwQXJyYXkuY29uY2F0KGJlemllci5wb3NBcnJheSk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcEFycmF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeUseWFs+mUruW4p+aVsOe7hCDlvpfliLAg5puy57q/5q615pWw57uEXG4gICAgICogQHBhcmFtIGZyYW1lQXJyYXkg5YWz6ZSu5bin5pWw57uEXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRCZXppZXJQYXJ0QXJyYXkoZnJhbWVBcnJheSk6IEJlemllclBhcnRbXSB7XG4gICAgICAgIGxldCBiZXppZXJQYXJ0QXJyYXk6IEJlemllclBhcnRbXSA9IFtdO1xuXG4gICAgICAgIC8v5Lik5Liq5YWz6ZSu5bin57uE5oiQ5LiA5p2h6Lev5b6EXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZnJhbWVBcnJheS5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBhcnI6IEJlemllclBhcnRbXSA9IHRoaXMuY3JlYXRlQmV6aWVyUGFydEFycmF5KGZyYW1lQXJyYXlbal0sIGZyYW1lQXJyYXlbaiArIDFdKTtcbiAgICAgICAgICAgIGJlemllclBhcnRBcnJheSA9IGJlemllclBhcnRBcnJheS5jb25jYXQoYXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXppZXJQYXJ0QXJyYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55Sx5Lik5Liq5YWz6ZSu5binIOeUn+aIkCDlroPku6zmnoTmiJDnmoTotJ3loZ7lsJTmm7Lnur/mrrXmlbDnu4RcbiAgICAgKiBAcGFyYW0gc3RhcnRLZXlGcmFtZSDlvIDlp4vlhbPplK7luKdcbiAgICAgKiBAcGFyYW0gZW5kS2V5RnJhbWUg57uT5p2f5YWz6ZSu5binXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVCZXppZXJQYXJ0QXJyYXkoc3RhcnRLZXlGcmFtZSwgZW5kS2V5RnJhbWUpOiBCZXppZXJQYXJ0W10ge1xuICAgICAgICBsZXQgYmV6aWVyUGFydEFycmF5OiBCZXppZXJQYXJ0W10gPSBbXTtcbiAgICAgICAgbGV0IHN0YXJ0UDogY2MuVmVjMiwgY1AxOiBjYy5WZWMyLCBjUDI6IGNjLlZlYzIsIGVuZFA6IGNjLlZlYzI7XG4gICAgICAgIGxldCBtb3Rpb25QYXRoID0gc3RhcnRLZXlGcmFtZS5tb3Rpb25QYXRoOyAvL+enu+WKqOi3r+W+hOaVsOe7hOWNs+S4u+aOp+WItueCueaVsOe7hFxuICAgICAgICBsZXQgbW9QYXRoU1AsIG1vUGF0aEVQOyAvL+S4gOauteabsue6v+S4iueahOmmluWwvuerr+S4u+aOp+WItueCuVxuXG4gICAgICAgIC8v56ys5LiA5q61XG4gICAgICAgIHN0YXJ0UCA9IGNjLnYyKHN0YXJ0S2V5RnJhbWUudmFsdWVbMF0sIHN0YXJ0S2V5RnJhbWUudmFsdWVbMV0pO1xuICAgICAgICBtb1BhdGhFUCA9IG1vdGlvblBhdGhbMF07XG4gICAgICAgIGNQMSA9IGNQMiA9IGNjLnYyKG1vUGF0aEVQWzJdLCBtb1BhdGhFUFszXSk7XG4gICAgICAgIGVuZFAgPSBjYy52Mihtb1BhdGhFUFswXSwgbW9QYXRoRVBbMV0pO1xuICAgICAgICBiZXppZXJQYXJ0QXJyYXkucHVzaChuZXcgQmV6aWVyUGFydChzdGFydFAsIGNQMSwgY1AyLCBlbmRQKSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Rpb25QYXRoLmxlbmd0aCAtIDE7IGkrKykgeyAvLzAgLSBsZW4gLSAxLCBsZW4gLSAzIGxlbiAtIDIgbGVuIC0xXG4gICAgICAgICAgICBtb1BhdGhTUCA9IG1vdGlvblBhdGhbaV07XG4gICAgICAgICAgICBtb1BhdGhFUCA9IG1vdGlvblBhdGhbaSArIDFdXG4gICAgICAgICAgICBzdGFydFAgPSBjYy52Mihtb1BhdGhTUFswXSwgbW9QYXRoU1BbMV0pO1xuICAgICAgICAgICAgY1AxID0gY2MudjIobW9QYXRoU1BbNF0sIG1vUGF0aFNQWzVdKTtcbiAgICAgICAgICAgIGNQMiA9IGNjLnYyKG1vUGF0aEVQWzJdLCBtb1BhdGhFUFszXSk7XG4gICAgICAgICAgICBlbmRQID0gY2MudjIobW9QYXRoRVBbMF0sIG1vUGF0aEVQWzFdKTtcbiAgICAgICAgICAgIGJlemllclBhcnRBcnJheS5wdXNoKG5ldyBCZXppZXJQYXJ0KHN0YXJ0UCwgY1AxLCBjUDIsIGVuZFApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5pyA5ZCO5LiA5q61XG4gICAgICAgIG1vUGF0aFNQID0gbW90aW9uUGF0aFttb3Rpb25QYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgICBzdGFydFAgPSBjYy52Mihtb1BhdGhTUFswXSwgbW9QYXRoU1BbMV0pO1xuICAgICAgICBjUDEgPSBjUDIgPSBjYy52Mihtb1BhdGhTUFs0XSwgbW9QYXRoU1BbNV0pO1xuICAgICAgICBlbmRQID0gY2MudjIoZW5kS2V5RnJhbWUudmFsdWVbMF0sIGVuZEtleUZyYW1lLnZhbHVlWzFdKTtcbiAgICAgICAgYmV6aWVyUGFydEFycmF5LnB1c2gobmV3IEJlemllclBhcnQoc3RhcnRQLCBjUDEsIGNQMiwgZW5kUCkpO1xuXG4gICAgICAgIHJldHVybiBiZXppZXJQYXJ0QXJyYXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UGF0aChwb2ludEFycmF5OiBjYy5WZWMyW10pIHtcbiAgICAgICAgdGhpcy5ncmlwaGljcy5tb3ZlVG8ocG9pbnRBcnJheVswXS54LCBwb2ludEFycmF5WzBdLnkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50QXJyYXkubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLmdyaXBoaWNzLmxpbmVUbyhwb2ludEFycmF5W2ldLngsIHBvaW50QXJyYXlbaV0ueSk7XG5cbiAgICAgICAgdGhpcy5ncmlwaGljcy5zdHJva2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnlLvlh7rmm7Lnur/nmoTmjqfliLbngrlcbiAgICAgKiBAcGFyYW0gYmV6aWVyUGFydEFycmF5IOabsue6v+aVsOe7hFxuICAgICAqL1xuICAgIHByaXZhdGUgZHJhd0NvbnRybFBvaW50KGJlemllclBhcnRBcnJheTogQmV6aWVyUGFydFtdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmV6aWVyUGFydEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdQb2ludChiZXppZXJQYXJ0QXJyYXlbaV0uc3RhcnRQb3MpO1xuICAgICAgICAgICAgdGhpcy5kcmF3UG9pbnQoYmV6aWVyUGFydEFycmF5W2ldLmNQb3MxLCBjYy5Db2xvci5CTFVFKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1BvaW50KGJlemllclBhcnRBcnJheVtpXS5jUG9zMiwgY2MuQ29sb3IuQkxVRSk7XG4gICAgICAgICAgICB0aGlzLmRyYXdQb2ludChiZXppZXJQYXJ0QXJyYXlbaV0uZW5kUG9zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIHBvaW50XG4gICAgICogQHBhcmFtIHBvaW50IOeCueWdkOaghyBcbiAgICAgKiBAcGFyYW0gY29sb3Ig6buY6K6k6aKc6Imy5Li657qi6ImyXG4gICAgICovXG4gICAgcHJpdmF0ZSBkcmF3UG9pbnQocG9pbnQ6IGNjLlZlYzIgfCBjYy5WZWMyW10sIGNvbG9yOiBjYy5Db2xvciA9IG51bGwpIHtcbiAgICAgICAgaWYgKGNvbG9yID09PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5ncmlwaGljcy5zdHJva2VDb2xvciA9IGNjLkNvbG9yLlJFRDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5ncmlwaGljcy5zdHJva2VDb2xvciA9IGNvbG9yO1xuXG4gICAgICAgIGlmICgoPGNjLlZlYzJbXT5wb2ludCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICg8Y2MuVmVjMltdPnBvaW50KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpcGhpY3MuY2lyY2xlKHBvaW50W2ldLngsIHBvaW50W2ldLnksIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JpcGhpY3Muc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyaXBoaWNzLmNpcmNsZSgoPGNjLlZlYzI+cG9pbnQpLngsICg8Y2MuVmVjMj5wb2ludCkueSwgMik7XG4gICAgICAgICAgICB0aGlzLmdyaXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/res/prefabs/loadingDoorAnim/loadingDoorAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb3cfoKNhhKUYqSuYQiQcM8', 'loadingDoorAnim');
// res/prefabs/loadingDoorAnim/loadingDoorAnim.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var soundsManager_1 = require("../../../scripts/common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingDoorAnim = /** @class */ (function (_super) {
    __extends(LoadingDoorAnim, _super);
    function LoadingDoorAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 1;
        _this.lDoor = null;
        _this.rDoor = null;
        /**
         * 门是开的吗
         */
        _this.isDoorOpen = true;
        _this.viewSize = null;
        return _this;
    }
    LoadingDoorAnim.prototype.onLoad = function () {
        this.lDoor = this.node.getChildByName("lDoor");
        this.rDoor = this.node.getChildByName("rDoor");
        this.viewSize = cc.view.getVisibleSize();
        this.setState(true);
    };
    LoadingDoorAnim.prototype.start = function () {
    };
    /**
     * 设置门的状态
     * @param state true为开
     */
    LoadingDoorAnim.prototype.setState = function (state) {
        if (state) {
            this.lDoor.setPosition(cc.v2(-this.viewSize.width, 0));
            this.rDoor.setPosition(cc.v2(this.viewSize.width, 0));
            this.isDoorOpen = true;
        }
        else {
            this.lDoor.setPosition(cc.v2(2, 0));
            this.rDoor.setPosition(cc.v2(-2, 0));
            this.isDoorOpen = false;
        }
    };
    /**
     * 开门动画
     */
    LoadingDoorAnim.prototype.openDoor = function () {
        if (this.isDoorOpen)
            return;
        var d = cc.delayTime(1);
        var func = cc.callFunc(function () {
            var la = cc.moveTo(this.time, cc.v2(-this.viewSize.width, 0)).easing(cc.easeIn(2));
            var ra = cc.moveTo(this.time, cc.v2(this.viewSize.width, 0)).easing(cc.easeIn(2));
            this.lDoor.runAction(la);
            this.rDoor.runAction(ra);
        }.bind(this));
        var seq = cc.sequence(d, func);
        this.node.runAction(seq);
        this.isDoorOpen = true;
    };
    /**
     * 关门动画
     * @param func 回调函数
     */
    LoadingDoorAnim.prototype.closeDoor = function (func) {
        if (!this.isDoorOpen)
            return;
        var la = cc.moveTo(this.time, cc.v2(2, 0)).easing(cc.easeIn(2));
        var ra = cc.moveTo(this.time, cc.v2(-2, 0)).easing(cc.easeIn(2));
        var f1 = cc.callFunc(function () {
            soundsManager_1.default.ins.playEffect("sounds/close_door");
        }, this);
        var seq = cc.sequence(ra, f1, func);
        this.lDoor.runAction(la);
        this.rDoor.runAction(seq);
        this.isDoorOpen = false;
    };
    __decorate([
        property({
            displayName: "开关门时间"
        })
    ], LoadingDoorAnim.prototype, "time", void 0);
    LoadingDoorAnim = __decorate([
        ccclass
    ], LoadingDoorAnim);
    return LoadingDoorAnim;
}(cc.Component));
exports.default = LoadingDoorAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9yZXMvcHJlZmFicy9sb2FkaW5nRG9vckFuaW0vbG9hZGluZ0Rvb3JBbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhFQUF5RTtBQUVuRSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQW1GQztRQTlFRyxVQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRVQsV0FBSyxHQUFZLElBQUksQ0FBQztRQUN0QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBQzlCOztXQUVHO1FBQ0gsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDbkIsY0FBUSxHQUFZLElBQUksQ0FBQzs7SUFzRXJDLENBQUM7SUFyRUcsZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBRUQsK0JBQUssR0FBTDtJQUNBLENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQ0FBUSxHQUFSLFVBQVMsS0FBYztRQUNuQixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLENB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LENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBNUVEO1FBSEMsUUFBUSxDQUFDO1lBQ04sV0FBVyxFQUFFLE9BQU87U0FDdkIsQ0FBQztpREFDZTtJQUxBLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FtRm5DO0lBQUQsc0JBQUM7Q0FuRkQsQUFtRkMsQ0FuRjRDLEVBQUUsQ0FBQyxTQUFTLEdBbUZ4RDtrQkFuRm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vc2NyaXB0cy9jb21tb24vbW9kdWxlL3NvdW5kc01hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdEb29yQW5pbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLlvIDlhbPpl6jml7bpl7RcIlxuICAgIH0pXG4gICAgdGltZTogbnVtYmVyID0gMTtcblxuICAgIHByaXZhdGUgbERvb3I6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgckRvb3I6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOmXqOaYr+W8gOeahOWQl1xuICAgICAqL1xuICAgIGlzRG9vck9wZW46IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgdmlld1NpemU6IGNjLlNpemUgPSBudWxsO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5sRG9vciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxEb29yXCIpO1xuICAgICAgICB0aGlzLnJEb29yID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwickRvb3JcIik7XG4gICAgICAgIHRoaXMudmlld1NpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0cnVlKVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuvue9rumXqOeahOeKtuaAgVxuICAgICAqIEBwYXJhbSBzdGF0ZSB0cnVl5Li65byAIFxuICAgICAqL1xuICAgIHNldFN0YXRlKHN0YXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5sRG9vci5zZXRQb3NpdGlvbihjYy52MigtdGhpcy52aWV3U2l6ZS53aWR0aCwgMCkpO1xuICAgICAgICAgICAgdGhpcy5yRG9vci5zZXRQb3NpdGlvbihjYy52Mih0aGlzLnZpZXdTaXplLndpZHRoLCAwKSk7XG4gICAgICAgICAgICB0aGlzLmlzRG9vck9wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sRG9vci5zZXRQb3NpdGlvbihjYy52MigyLCAwKSlcbiAgICAgICAgICAgIHRoaXMuckRvb3Iuc2V0UG9zaXRpb24oY2MudjIoLTIsIDApKVxuICAgICAgICAgICAgdGhpcy5pc0Rvb3JPcGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvIDpl6jliqjnlLtcbiAgICAgKi9cbiAgICBvcGVuRG9vcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEb29yT3BlbilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgZDogY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5kZWxheVRpbWUoMSk7XG4gICAgICAgIGxldCBmdW5jOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGxhOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLm1vdmVUbyh0aGlzLnRpbWUsIGNjLnYyKC10aGlzLnZpZXdTaXplLndpZHRoLCAwKSkuZWFzaW5nKGNjLmVhc2VJbigyKSk7XG4gICAgICAgICAgICBsZXQgcmE6IGNjLkFjdGlvbkludGVydmFsID0gY2MubW92ZVRvKHRoaXMudGltZSwgY2MudjIodGhpcy52aWV3U2l6ZS53aWR0aCwgMCkpLmVhc2luZyhjYy5lYXNlSW4oMikpO1xuICAgICAgICAgICAgdGhpcy5sRG9vci5ydW5BY3Rpb24obGEpO1xuICAgICAgICAgICAgdGhpcy5yRG9vci5ydW5BY3Rpb24ocmEpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBsZXQgc2VxOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLnNlcXVlbmNlKGQsIGZ1bmMpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XG5cbiAgICAgICAgdGhpcy5pc0Rvb3JPcGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl6jliqjnlLtcbiAgICAgKiBAcGFyYW0gZnVuYyDlm57osIPlh73mlbBcbiAgICAgKi9cbiAgICBjbG9zZURvb3IoZnVuYzogY2MuQWN0aW9uSW5zdGFudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEb29yT3BlbilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbGE6IGNjLkFjdGlvbkludGVydmFsID0gY2MubW92ZVRvKHRoaXMudGltZSwgY2MudjIoMiwgMCkpLmVhc2luZyhjYy5lYXNlSW4oMikpO1xuICAgICAgICBsZXQgcmE6IGNjLkFjdGlvbkludGVydmFsID0gY2MubW92ZVRvKHRoaXMudGltZSwgY2MudjIoLTIsIDApKS5lYXNpbmcoY2MuZWFzZUluKDIpKTtcbiAgICAgICAgbGV0IGYxOiBjYy5BY3Rpb25JbnN0YW50ID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgU291bmRzTWFuYWdlci5pbnMucGxheUVmZmVjdChcInNvdW5kcy9jbG9zZV9kb29yXCIpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBsZXQgc2VxOiBjYy5BY3Rpb25JbnRlcnZhbCA9IGNjLnNlcXVlbmNlKHJhLCBmMSwgZnVuYyk7XG4gICAgICAgIHRoaXMubERvb3IucnVuQWN0aW9uKGxhKTtcbiAgICAgICAgdGhpcy5yRG9vci5ydW5BY3Rpb24oc2VxKTtcblxuICAgICAgICB0aGlzLmlzRG9vck9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/move.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf0d9uX6CRLtInmWoub+LXl', 'move');
// scripts/common/move.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Move = /** @class */ (function () {
    /**
     * 移动组件。必须将refrshMove()在update()中调用
     */
    function Move(host) {
        this.host = null;
        /* 数据 */
        this.distance = null;
        this.duration = null;
        this.callBack = null;
        /**
         * 计时
         */
        this.ct = 0;
        /* 控制 */
        this.startMove = false;
        this.host = host;
    }
    /**
     * @param distance 移动相对距离
     * @param t 时间
     * @param callBack 回调函数
     */
    Move.prototype.moveTo = function (distance, t, callBack) {
        if (callBack === void 0) { callBack = null; }
        this.distance = distance;
        this.duration = t;
        this.callBack = callBack;
        this.ct = 0;
        this.startMove = true;
    };
    Move.prototype.stopMove = function () {
        this.startMove = false;
    };
    /**
     * 需在update()里调用
     */
    Move.prototype.refreshMove = function (dt) {
        if (!this.startMove)
            return;
        //到达目的地
        if (this.ct >= this.duration) {
            this.stopMove();
            if (this.callBack !== null)
                this.callBack();
            return;
        }
        var rate = dt / this.duration;
        var l = cc.v2(this.distance.x * rate, this.distance.y * rate);
        var newP = this.host.getPosition().add(l);
        this.host.setPosition(newP);
        this.ct += dt;
    };
    return Move;
}());
exports.default = Move;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9tb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFpQkk7O09BRUc7SUFDSCxjQUFZLElBQWE7UUFsQmpCLFNBQUksR0FBWSxJQUFJLENBQUM7UUFFN0IsUUFBUTtRQUNBLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFXLElBQUksQ0FBQztRQUN4QixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRWxDOztXQUVHO1FBQ0ssT0FBRSxHQUFXLENBQUMsQ0FBQztRQUV2QixRQUFRO1FBQ0EsY0FBUyxHQUFZLEtBQUssQ0FBQztRQU0vQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHFCQUFNLEdBQU4sVUFBTyxRQUFpQixFQUFFLENBQVMsRUFBRSxRQUF5QjtRQUF6Qix5QkFBQSxFQUFBLGVBQXlCO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELHVCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBVyxHQUFYLFVBQVksRUFBVTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDZixPQUFPO1FBQ1gsT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxHQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxHQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVCLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0E5REEsQUE4REMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmUge1xuXG4gICAgcHJpdmF0ZSBob3N0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8qIOaVsOaNriAqL1xuICAgIHByaXZhdGUgZGlzdGFuY2U6IGNjLlZlYzIgPSBudWxsO1xuICAgIHByaXZhdGUgZHVyYXRpb246IG51bWJlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBjYWxsQmFjazogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog6K6h5pe2XG4gICAgICovXG4gICAgcHJpdmF0ZSBjdDogbnVtYmVyID0gMDtcblxuICAgIC8qIOaOp+WItiAqL1xuICAgIHByaXZhdGUgc3RhcnRNb3ZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiDnp7vliqjnu4Tku7bjgILlv4XpobvlsIZyZWZyc2hNb3ZlKCnlnKh1cGRhdGUoKeS4reiwg+eUqFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGhvc3Q6IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGlzdGFuY2Ug56e75Yqo55u45a+56Led56a7XG4gICAgICogQHBhcmFtIHQg5pe26Ze0XG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOWbnuiwg+WHveaVsFxuICAgICAqL1xuICAgIG1vdmVUbyhkaXN0YW5jZTogY2MuVmVjMiwgdDogbnVtYmVyLCBjYWxsQmFjazogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZVxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gdDtcbiAgICAgICAgdGhpcy5jYWxsQmFjayA9IGNhbGxCYWNrO1xuICAgICAgICB0aGlzLmN0ID0gMDtcbiAgICAgICAgdGhpcy5zdGFydE1vdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0b3BNb3ZlKCkge1xuICAgICAgICB0aGlzLnN0YXJ0TW92ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmcgOWcqHVwZGF0ZSgp6YeM6LCD55SoXG4gICAgICovXG4gICAgcmVmcmVzaE1vdmUoZHQ6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnRNb3ZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvL+WIsOi+vuebrueahOWcsFxuICAgICAgICBpZiAodGhpcy5jdCA+PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsQmFjayAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmF0ZTogbnVtYmVyID0gZHQgLyB0aGlzLmR1cmF0aW9uO1xuICAgICAgICBsZXQgbDogY2MuVmVjMiA9IGNjLnYyKHRoaXMuZGlzdGFuY2UueCAqIHJhdGUsIHRoaXMuZGlzdGFuY2UueSAqIHJhdGUpO1xuICAgICAgICBsZXQgbmV3UDogY2MuVmVjMiA9IHRoaXMuaG9zdC5nZXRQb3NpdGlvbigpLmFkZChsKTtcbiAgICAgICAgdGhpcy5ob3N0LnNldFBvc2l0aW9uKG5ld1ApO1xuXG4gICAgICAgIHRoaXMuY3QgKz0gZHQ7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/starReview.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '17a5bpiCUROtoTufMZ9GBwd', 'starReview');
// scripts/common/starReview.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StarReview = /** @class */ (function (_super) {
    __extends(StarReview, _super);
    function StarReview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stars = [];
        return _this;
    }
    StarReview.prototype.setReview = function (g) {
        for (var i = 0; i < g; i++)
            this.stars[i].active = true;
    };
    __decorate([
        property({
            type: [cc.Node]
        })
    ], StarReview.prototype, "stars", void 0);
    StarReview = __decorate([
        ccclass
    ], StarReview);
    return StarReview;
}(cc.Component));
exports.default = StarReview;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9zdGFyUmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBV0M7UUFOVyxXQUFLLEdBQWMsRUFBRSxDQUFDOztJQU1sQyxDQUFDO0lBSkcsOEJBQVMsR0FBVCxVQUFVLENBQVM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUxEO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNsQixDQUFDOzZDQUM0QjtJQUxiLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FXOUI7SUFBRCxpQkFBQztDQVhELEFBV0MsQ0FYdUMsRUFBRSxDQUFDLFNBQVMsR0FXbkQ7a0JBWG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhclJldmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuTm9kZV1cbiAgICB9KVxuICAgIHByaXZhdGUgc3RhcnM6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgc2V0UmV2aWV3KGc6IG51bWJlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGc7IGkrKylcbiAgICAgICAgICAgIHRoaXMuc3RhcnNbaV0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/res/prefabs/switch/audioSwitch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3da8chXsqBLt5E5IHlqLyJp', 'audioSwitch');
// res/prefabs/switch/audioSwitch.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var soundsManager_1 = require("../../../scripts/common/module/soundsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AudioSwitch = /** @class */ (function (_super) {
    __extends(AudioSwitch, _super);
    function AudioSwitch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.musicOff = null;
        _this.musicOn = null;
        _this.effectOff = null;
        _this.effectOn = null;
        _this.musicSwitch = null;
        _this.effectSwitch = null;
        return _this;
        // update (dt) {}
    }
    AudioSwitch.prototype.onLoad = function () {
    };
    AudioSwitch.prototype.start = function () {
        this.initSwitch();
    };
    AudioSwitch.prototype.initSwitch = function () {
        var isMusicMute = soundsManager_1.default.ins.IsBGMMute;
        var isEffectMute = soundsManager_1.default.ins.IsEffectMute;
        if (isMusicMute)
            this.musicSwitch.spriteFrame = this.musicOff;
        else
            this.musicSwitch.spriteFrame = this.musicOn;
        if (isEffectMute)
            this.effectSwitch.spriteFrame = this.effectOff;
        else
            this.effectSwitch.spriteFrame = this.effectOn;
    };
    AudioSwitch.prototype.musicSwitchButton = function () {
        var state = soundsManager_1.default.ins.IsBGMMute;
        if (state) {
            soundsManager_1.default.ins.openBGM();
            this.musicSwitch.spriteFrame = this.musicOn;
        }
        else { //有声
            soundsManager_1.default.ins.closeBGM();
            this.musicSwitch.spriteFrame = this.musicOff;
        }
    };
    AudioSwitch.prototype.effecttSwitchButton = function () {
        var state = soundsManager_1.default.ins.IsEffectMute;
        if (state) { //无音效
            soundsManager_1.default.ins.openEffect();
            this.effectSwitch.spriteFrame = this.effectOn;
        }
        else {
            soundsManager_1.default.ins.closeEffect();
            this.effectSwitch.spriteFrame = this.effectOff;
        }
    };
    __decorate([
        property({
            type: cc.SpriteFrame
        })
    ], AudioSwitch.prototype, "musicOff", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame
        })
    ], AudioSwitch.prototype, "musicOn", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame
        })
    ], AudioSwitch.prototype, "effectOff", void 0);
    __decorate([
        property({
            type: cc.SpriteFrame
        })
    ], AudioSwitch.prototype, "effectOn", void 0);
    __decorate([
        property({
            type: cc.Sprite
        })
    ], AudioSwitch.prototype, "musicSwitch", void 0);
    __decorate([
        property({
            type: cc.Sprite
        })
    ], AudioSwitch.prototype, "effectSwitch", void 0);
    AudioSwitch = __decorate([
        ccclass
    ], AudioSwitch);
    return AudioSwitch;
}(cc.Component));
exports.default = AudioSwitch;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9yZXMvcHJlZmFicy9zd2l0Y2gvYXVkaW9Td2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEVBQXlFO0FBRW5FLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBK0VDO1FBMUVXLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBSWhDLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBSS9CLGVBQVMsR0FBbUIsSUFBSSxDQUFDO1FBSWpDLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBS2hDLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBSzlCLGtCQUFZLEdBQWMsSUFBSSxDQUFDOztRQW1EdkMsaUJBQWlCO0lBQ3JCLENBQUM7SUFsREcsNEJBQU0sR0FBTjtJQUNBLENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxnQ0FBVSxHQUFsQjtRQUNJLElBQUksV0FBVyxHQUFZLHVCQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN2RCxJQUFJLFlBQVksR0FBWSx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDM0QsSUFBSSxXQUFXO1lBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7WUFFN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVoRCxJQUFJLFlBQVk7WUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDOztZQUUvQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RELENBQUM7SUFFRCx1Q0FBaUIsR0FBakI7UUFDSSxJQUFJLEtBQUssR0FBWSx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDakQsSUFBSSxLQUFLLEVBQUU7WUFDUCx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBRS9DO2FBQ0ksRUFBRSxJQUFJO1lBQ1AsdUJBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUVoRDtJQUNMLENBQUM7SUFFRCx5Q0FBbUIsR0FBbkI7UUFDSSxJQUFJLEtBQUssR0FBWSx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDcEQsSUFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLO1lBQ2QsdUJBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUVqRDthQUNJO1lBQ0QsdUJBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUVsRDtJQUNMLENBQUM7SUF2RUQ7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVc7U0FDdkIsQ0FBQztpREFDc0M7SUFJeEM7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVc7U0FDdkIsQ0FBQztnREFDcUM7SUFJdkM7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVc7U0FDdkIsQ0FBQztrREFDdUM7SUFJekM7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVc7U0FDdkIsQ0FBQztpREFDc0M7SUFLeEM7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU07U0FDbEIsQ0FBQztvREFDb0M7SUFLdEM7UUFIQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU07U0FDbEIsQ0FBQztxREFDcUM7SUEzQnRCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0ErRS9CO0lBQUQsa0JBQUM7Q0EvRUQsQUErRUMsQ0EvRXdDLEVBQUUsQ0FBQyxTQUFTLEdBK0VwRDtrQkEvRW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU291bmRzTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vc2NyaXB0cy9jb21tb24vbW9kdWxlL3NvdW5kc01hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvU3dpdGNoIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgfSlcbiAgICBwcml2YXRlIG11c2ljT2ZmOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICB9KVxuICAgIHByaXZhdGUgbXVzaWNPbjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgfSlcbiAgICBwcml2YXRlIGVmZmVjdE9mZjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgfSlcbiAgICBwcml2YXRlIGVmZmVjdE9uOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICB9KVxuICAgIHByaXZhdGUgbXVzaWNTd2l0Y2g6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICB9KVxuICAgIHByaXZhdGUgZWZmZWN0U3dpdGNoOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXRTd2l0Y2goKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTd2l0Y2goKSB7XG4gICAgICAgIGxldCBpc011c2ljTXV0ZTogYm9vbGVhbiA9IFNvdW5kc01hbmFnZXIuaW5zLklzQkdNTXV0ZTtcbiAgICAgICAgbGV0IGlzRWZmZWN0TXV0ZTogYm9vbGVhbiA9IFNvdW5kc01hbmFnZXIuaW5zLklzRWZmZWN0TXV0ZTtcbiAgICAgICAgaWYgKGlzTXVzaWNNdXRlKVxuICAgICAgICAgICAgdGhpcy5tdXNpY1N3aXRjaC5zcHJpdGVGcmFtZSA9IHRoaXMubXVzaWNPZmY7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubXVzaWNTd2l0Y2guc3ByaXRlRnJhbWUgPSB0aGlzLm11c2ljT247XG5cbiAgICAgICAgaWYgKGlzRWZmZWN0TXV0ZSlcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0U3dpdGNoLnNwcml0ZUZyYW1lID0gdGhpcy5lZmZlY3RPZmY7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0U3dpdGNoLnNwcml0ZUZyYW1lID0gdGhpcy5lZmZlY3RPbjtcbiAgICB9XG5cbiAgICBtdXNpY1N3aXRjaEJ1dHRvbigpIHtcbiAgICAgICAgbGV0IHN0YXRlOiBib29sZWFuID0gU291bmRzTWFuYWdlci5pbnMuSXNCR01NdXRlO1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLm9wZW5CR00oKTtcbiAgICAgICAgICAgIHRoaXMubXVzaWNTd2l0Y2guc3ByaXRlRnJhbWUgPSB0aGlzLm11c2ljT247XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy/mnInlo7BcbiAgICAgICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLmNsb3NlQkdNKCk7XG4gICAgICAgICAgICB0aGlzLm11c2ljU3dpdGNoLnNwcml0ZUZyYW1lID0gdGhpcy5tdXNpY09mZjtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWZmZWN0dFN3aXRjaEJ1dHRvbigpIHtcbiAgICAgICAgbGV0IHN0YXRlOiBib29sZWFuID0gU291bmRzTWFuYWdlci5pbnMuSXNFZmZlY3RNdXRlO1xuICAgICAgICBpZiAoc3RhdGUpIHsgLy/ml6Dpn7PmlYhcbiAgICAgICAgICAgIFNvdW5kc01hbmFnZXIuaW5zLm9wZW5FZmZlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0U3dpdGNoLnNwcml0ZUZyYW1lID0gdGhpcy5lZmZlY3RPbjtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgU291bmRzTWFuYWdlci5pbnMuY2xvc2VFZmZlY3QoKVxuICAgICAgICAgICAgdGhpcy5lZmZlY3RTd2l0Y2guc3ByaXRlRnJhbWUgPSB0aGlzLmVmZmVjdE9mZjtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------
