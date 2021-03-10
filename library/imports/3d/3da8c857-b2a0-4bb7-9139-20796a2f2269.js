"use strict";
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