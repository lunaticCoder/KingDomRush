"use strict";
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