"use strict";
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