
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