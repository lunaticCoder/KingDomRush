
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