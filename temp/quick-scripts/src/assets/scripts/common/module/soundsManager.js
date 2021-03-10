"use strict";
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