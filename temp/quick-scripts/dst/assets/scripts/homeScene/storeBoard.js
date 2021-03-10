
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