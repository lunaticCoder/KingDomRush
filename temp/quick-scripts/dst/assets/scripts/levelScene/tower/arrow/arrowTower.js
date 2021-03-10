
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvdG93ZXIvYXJyb3cvYXJyb3dUb3dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwRUFBcUY7QUFHL0UsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUFnTEM7UUExS1csYUFBTyxHQUFjLEVBQUUsQ0FBQztRQUt4QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixXQUFLLEdBQXFCLEVBQUUsQ0FBQztRQUVyQyxVQUFVO1FBQ1Y7O1dBRUc7UUFDSCxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFhYixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUNyQzs7V0FFRztRQUNLLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFDMUIscUJBQWUsR0FBcUIsRUFBRSxDQUFDO1FBRy9DLFFBQVE7UUFDUjs7V0FFRztRQUNLLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFJeEIsaUJBQVcsR0FBVSxJQUFJLENBQUM7UUFDMUIsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDOztJQTRINUMsQ0FBQztJQTFIRywyQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENB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RCxzQ0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUNBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLEVBQUU7SUFFVCxDQUFDO0lBektEO1FBSkMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLE9BQU8sRUFBRSxXQUFXO1NBQ3ZCLENBQUM7K0NBQzhCO0lBS2hDO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNO1NBQ2xCLENBQUM7bURBQ29DO0lBR3RDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZDQUNVO0lBZHBCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FnTDlCO0lBQUQsaUJBQUM7Q0FoTEQsQUFnTEMsQ0FoTHVDLEVBQUUsQ0FBQyxTQUFTLEdBZ0xuRDtrQkFoTG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRnJhbWVBbmltYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mcmFtZUFuaW1hdGlvblwiO1xuaW1wb3J0IEdhbWVEYXRhU3RvcmFnZSwgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tb2R1bGUvZ2FtZURhdGFNYW5hZ2VyXCI7XG5pbXBvcnQgQXJyb3dlciBmcm9tIFwiLi9hcnJvd2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycm93VG93ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogW2NjLlZlYzJdLFxuICAgICAgICB0b29sdGlwOiBcIuWQhOetiee6p+eahOS6uueahFnlnZDmoIdcIlxuICAgIH0pXG4gICAgcHJpdmF0ZSBvZmZzZXRZOiBjYy5WZWMyW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgIH0pXG4gICAgcHJpdmF0ZSBhcnJvd1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlQXRsYXNdKVxuICAgIHByaXZhdGUgYXRsYXM6IGNjLlNwcml0ZUF0bGFzW10gPSBbXTtcblxuICAgIC8qIOWhlOeahOWxnuaApyAqL1xuICAgIC8qKlxuICAgICAqIOWhlOeahOetiee6p1xuICAgICAqL1xuICAgIGxldmVsOiBudW1iZXIgPSAxO1xuICAgIG1heExldmVsOiBudW1iZXIgPSA0O1xuICAgIHByaXZhdGUgYXR0YWNrOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog566t55qE6YCf5bqmXG4gICAgICovXG4gICAgcHJpdmF0ZSBzcGVlZE9mQXJyb3c6IG51bWJlcjtcbiAgICBzaG9vdFJhbmdlOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICog5bCE5omL5bCE6YCfXG4gICAgICovXG4gICAgcHJpdmF0ZSBzcGVlZE9mU2hvb3Q6IG51bWJlcjtcbiAgICBwcmljZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBsZWZ0QXJyb3dlcjogQXJyb3dlciA9IG51bGw7XG4gICAgcHJpdmF0ZSByaWdodEFycm93ZXI6IEFycm93ZXIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIOW3puWPs+S4pOS4quWjq+WFteeahCDluKfliqjnlLvnu4Tku7ZcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvd2VyQkc6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBmcmFtZUFuaW1hdGlvbnM6IEZyYW1lQW5pbWF0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIGdhbWVDb25maWc6IEdhbWVDb25maWc7XG5cbiAgICAvKiDmjqfliLYgKi9cbiAgICAvKipcbiAgICAgKiBmYWxzZeS4uuWjq+WFteacneS4i1xuICAgICAqL1xuICAgIHByaXZhdGUgdG93YXJkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiDmlbDmja4gKi9cbiAgICBwcml2YXRlIHdQb3M6IGNjLlZlYzI7XG4gICAgcHJpdmF0ZSBkYXRhT2ZUb3dlcjogYW55W10gPSBudWxsO1xuICAgIHByaXZhdGUgcG9vbE9mQXJyb3c6IGNjLk5vZGVQb29sID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgbGV0IGw6IGNjLk5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsZWZ0UGVyc29uXCIpO1xuICAgICAgICBsZXQgcjogY2MuTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJpZ2h0UGVyc29uXCIpO1xuICAgICAgICB0aGlzLmZyYW1lQW5pbWF0aW9uc1swXSA9IGwuZ2V0Q29tcG9uZW50KFwiZnJhbWVBbmltYXRpb25cIik7XG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb25zWzFdID0gci5nZXRDb21wb25lbnQoXCJmcmFtZUFuaW1hdGlvblwiKTtcbiAgICAgICAgdGhpcy5sZWZ0QXJyb3dlciA9IGwuZ2V0Q29tcG9uZW50KFwiYXJyb3dlclwiKVxuICAgICAgICB0aGlzLnJpZ2h0QXJyb3dlciA9IHIuZ2V0Q29tcG9uZW50KFwiYXJyb3dlclwiKVxuICAgICAgICB0aGlzLnRvd2VyQkcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5nYW1lQ29uZmlnID0gR2FtZURhdGFTdG9yYWdlLmdldEdhbWVDb25maWcoKTtcbiAgICAgICAgdGhpcy5kYXRhT2ZUb3dlciA9IHRoaXMuZ2FtZUNvbmZpZy5nZXREYXRhT2ZBcnJvd1Rvd2VyKCk7XG5cblxuICAgICAgICB0aGlzLmNyZWF0ZVBvb2xPZkFycm93KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMud1BvcyA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0KCkge1xuICAgICAgICB0aGlzLmF0dGFjayA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLmF0dGFjaztcbiAgICAgICAgdGhpcy5zcGVlZE9mQXJyb3cgPSB0aGlzLmRhdGFPZlRvd2VyW3RoaXMubGV2ZWwgLSAxXS5zcGVlZE9mQXJyb3c7XG4gICAgICAgIHRoaXMuc2hvb3RSYW5nZSA9IHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbCAtIDFdLnNob290UmFuZ2U7XG4gICAgICAgIHRoaXMuc3BlZWRPZlNob290ID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0uc3BlZWRPZlNob290O1xuICAgICAgICB0aGlzLnByaWNlID0gdGhpcy5kYXRhT2ZUb3dlclt0aGlzLmxldmVsIC0gMV0ucHJpY2U7XG5cbiAgICAgICAgdGhpcy5pbml0QXJyb3dlcigpO1xuICAgIH1cblxuICAgIC8qIOeureWvueixoeaxoCAqL1xuICAgIHByaXZhdGUgY3JlYXRlUG9vbE9mQXJyb3coKSB7XG4gICAgICAgIGlmICh0aGlzLnBvb2xPZkFycm93ICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnBvb2xPZkFycm93ID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvb2xPZkFycm93LnB1dChjYy5pbnN0YW50aWF0ZSh0aGlzLmFycm93UHJlZmFiKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QXJyb3dCdWxsZXQoKTogY2MuTm9kZSB7XG4gICAgICAgIGxldCByOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucG9vbE9mQXJyb3cuc2l6ZSgpID4gMClcbiAgICAgICAgICAgIHIgPSB0aGlzLnBvb2xPZkFycm93LmdldCgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByID0gY2MuaW5zdGFudGlhdGUodGhpcy5hcnJvd1ByZWZhYik7XG4gICAgICAgIHIub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxuICAgIHJlbGVhc2VBcnJvd0J1bGx0KG46IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZBcnJvdy5wdXQobik7XG4gICAgfVxuICAgIHByaXZhdGUgY2xlYXJQb29sT2ZBcnJvdygpIHtcbiAgICAgICAgdGhpcy5wb29sT2ZBcnJvdy5jbGVhcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEFycm93ZXIoKSB7XG4gICAgICAgIC8v6K6+572u5L2N572u5ZKM5Zu+54mHXG4gICAgICAgIHRoaXMuZnJhbWVBbmltYXRpb25zWzBdLm5vZGUueSA9IHRoaXMub2Zmc2V0WVt0aGlzLmxldmVsIC0gMV0ueTtcbiAgICAgICAgdGhpcy5mcmFtZUFuaW1hdGlvbnNbMV0ubm9kZS55ID0gdGhpcy5vZmZzZXRZW3RoaXMubGV2ZWwgLSAxXS55O1xuICAgICAgICBsZXQgYXRsYXM6IGNjLlNwcml0ZUF0bGFzID0gdGhpcy5hdGxhc1t0aGlzLmxldmVsIC0gMV07XG4gICAgICAgIGxldCBzcHJpdGVBcnI6IGNjLlNwcml0ZUZyYW1lW10gPSBhdGxhcy5nZXRTcHJpdGVGcmFtZXMoKTtcblxuICAgICAgICAvL+iuvue9ruWhlOeahOearuiCpFxuICAgICAgICB0aGlzLnRvd2VyQkcuc3ByaXRlRnJhbWUgPSBzcHJpdGVBcnJbMF07XG4gICAgICAgIHRoaXMuc2V0U2tpbih0aGlzLmZyYW1lQW5pbWF0aW9uc1swXSwgc3ByaXRlQXJyKTtcbiAgICAgICAgdGhpcy5zZXRTa2luKHRoaXMuZnJhbWVBbmltYXRpb25zWzFdLCBzcHJpdGVBcnIpO1xuXG4gICAgICAgIC8v5Lyg5Y+CXG4gICAgICAgIHRoaXMubGVmdEFycm93ZXIuaW5pdCh0aGlzLndQb3MsIHRoaXMuc3BlZWRPZkFycm93LCB0aGlzLnNob290UmFuZ2UsIHRoaXMuc3BlZWRPZlNob290LCB0aGlzLmF0dGFjayk7XG4gICAgICAgIHRoaXMucmlnaHRBcnJvd2VyLmluaXQodGhpcy53UG9zLCB0aGlzLnNwZWVkT2ZBcnJvdywgdGhpcy5zaG9vdFJhbmdlLCB0aGlzLnNwZWVkT2ZTaG9vdCwgdGhpcy5hdHRhY2spO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6K6+572u5aOr5YW155qE55qu6IKk5ZKM5bin5Yqo55S7XG4gICAgICogQHBhcmFtIGZyYW1lQW5pbWF0aW9uIFxuICAgICAqIEBwYXJhbSByZXMg5Zu+54mH6LWE5rqQXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTa2luKGZyYW1lQW5pbWF0aW9uOiBGcmFtZUFuaW1hdGlvbiwgcmVzOiBjYy5TcHJpdGVGcmFtZVtdKSB7XG4gICAgICAgIC8v6K6+572u5aOr5YW1562J5b6F5pe255qE55qu6IKkXG4gICAgICAgIGxldCBpOiBudW1iZXIgPSA1OyAvL+acneS4i1xuICAgICAgICBpZiAodGhpcy50b3dhcmQpXG4gICAgICAgICAgICBpID0gNlxuICAgICAgICBmcmFtZUFuaW1hdGlvbi5zZXRTcHJpdGVGcmFtZShyZXNbaV0pO1xuICAgICAgICBmcmFtZUFuaW1hdGlvbi5zZXRJZGxlKHJlc1tpXSk7XG5cbiAgICAgICAgLy/orr7nva7luKfliqjnlLtcbiAgICAgICAgbGV0IGFycjogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuICAgICAgICBpID0gMTtcbiAgICAgICAgaWYgKHRoaXMudG93YXJkKSAvL+acneS4i1xuICAgICAgICAgICAgaSA9IDc7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxuICAgICAgICAgICAgYXJyLnB1c2gocmVzW2kgKyBqXSk7XG4gICAgICAgIGZyYW1lQW5pbWF0aW9uLnNldEZyYW1lQXJyYXkoYXJyKTtcbiAgICB9XG5cbiAgICBkZXN0cm95U2VsZigpIHtcbiAgICAgICAgdGhpcy5jbGVhclBvb2xPZkFycm93KCk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICovXG4gICAgdXBncmFkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IDQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgZ2V0UHJpY2VPZlVwZ3JhZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU9mVG93ZXJbdGhpcy5sZXZlbF0ucHJpY2U7XG4gICAgfVxuXG4gICAgZ2V0RGF0YU9mVG93ZXIoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhT2ZUb3dlcjtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgIH1cbn1cbiJdfQ==