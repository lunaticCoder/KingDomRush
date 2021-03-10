
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