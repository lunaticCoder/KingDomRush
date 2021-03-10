
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