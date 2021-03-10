
(function () {
var scripts = [{"deps":{"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":9,"./assets/scripts/levelScene/tower/arrow/arrowBullet":10,"./assets/scripts/common/frameAnimation":11,"./assets/scripts/common/module/levelDataManager":12,"./assets/scripts/common/module/storageManager":16,"./assets/scripts/common/nodeSort":17,"./assets/scripts/common/module/utils":19,"./assets/scripts/levelScene/combatLogic":22,"./assets/scripts/levelScene/V_gameState":24,"./assets/scripts/levelScene/tower/magiclan/magiclanBullet":31,"./assets/scripts/common/animationPath":34,"./assets/scripts/common/move":36,"./assets/scripts/common/starReview":37,"./assets/scripts/levelScene/builder":1,"./assets/scripts/selecttLevelScene/aSeriesSkill":3,"./assets/scripts/levelScene/levelScene":8,"./assets/scripts/common/module/gameDataManager":2,"./assets/scripts/levelScene/monster/monster":4,"./assets/scripts/homeScene/storeBoard":13,"./assets/scripts/aboutScene/aboutScene":14,"./assets/scripts/levelScene/tower/artillery/artilleryTower":5,"./assets/scripts/levelScene/tower/barrack/soldier":6,"./assets/scripts/levelScene/tower/magiclan/magiclanTower":7,"./assets/scripts/homeScene/homeScene":18,"./assets/scripts/levelScene/creature":20,"./assets/scripts/homeScene/startAnim":21,"./assets/scripts/levelScene/settlementFace":23,"./assets/scripts/selecttLevelScene/levelManager":25,"./assets/scripts/selecttLevelScene/skillsBoard":28,"./assets/scripts/selecttLevelScene/selectLevelScene":29,"./assets/scripts/common/module/soundsManager":15,"./assets/scripts/levelScene/monster/monsterFactory":26,"./assets/res/prefabs/loadingDoorAnim/loadingDoorAnim":35,"./assets/scripts/levelScene/tower/arrow/arrower":27,"./assets/scripts/levelScene/tower/artillery/artilleryBullet":30,"./assets/scripts/levelScene/tower/arrow/arrowTower":32,"./assets/scripts/levelScene/tower/barrack/barrack":33,"./assets/res/prefabs/switch/audioSwitch":38},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../common/module/gameDataManager":2},"path":"preview-scripts/assets/scripts/levelScene/builder.js"},{"deps":{"./utils":19,"./storageManager":16},"path":"preview-scripts/assets/scripts/common/module/gameDataManager.js"},{"deps":{"../common/module/gameDataManager":2},"path":"preview-scripts/assets/scripts/selecttLevelScene/aSeriesSkill.js"},{"deps":{"../creature":20,"../tower/barrack/soldier":6,"../combatLogic":22,"../../common/module/utils":19,"../../common/module/gameDataManager":2,"../../common/move":36},"path":"preview-scripts/assets/scripts/levelScene/monster/monster.js"},{"deps":{"../../../common/module/gameDataManager":2,"../../monster/monster":4},"path":"preview-scripts/assets/scripts/levelScene/tower/artillery/artilleryTower.js"},{"deps":{"../../../common/module/gameDataManager":2,"../../creature":20,"../../combatLogic":22,"../../monster/monster":4,"../../../common/move":36},"path":"preview-scripts/assets/scripts/levelScene/tower/barrack/soldier.js"},{"deps":{"../../../common/module/gameDataManager":2,"../../monster/monster":4},"path":"preview-scripts/assets/scripts/levelScene/tower/magiclan/magiclanTower.js"},{"deps":{"../common/module/gameDataManager":2,"./monster/monsterFactory":26,"./V_gameState":24,"../common/module/utils":19,"./monster/monster":4,"../common/module/levelDataManager":12,"../../res/prefabs/loadingDoorAnim/loadingDoorAnim":35,"./tower/barrack/soldier":6,"../common/module/soundsManager":15},"path":"preview-scripts/assets/scripts/levelScene/levelScene.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/scripts/levelScene/tower/arrow/arrowBullet.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/frameAnimation.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/module/levelDataManager.js"},{"deps":{"../common/module/gameDataManager":2},"path":"preview-scripts/assets/scripts/homeScene/storeBoard.js"},{"deps":{"../../res/prefabs/loadingDoorAnim/loadingDoorAnim":35,"../common/module/gameDataManager":2,"../common/module/soundsManager":15},"path":"preview-scripts/assets/scripts/aboutScene/aboutScene.js"},{"deps":{"./storageManager":16},"path":"preview-scripts/assets/scripts/common/module/soundsManager.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/module/storageManager.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/nodeSort.js"},{"deps":{"../common/module/soundsManager":15,"./startAnim":21,"../common/module/levelDataManager":12,"../common/module/gameDataManager":2,"../../res/prefabs/loadingDoorAnim/loadingDoorAnim":35,"../common/module/storageManager":16},"path":"preview-scripts/assets/scripts/homeScene/homeScene.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/module/utils.js"},{"deps":{"../common/frameAnimation":11,"../common/module/utils":19},"path":"preview-scripts/assets/scripts/levelScene/creature.js"},{"deps":{"../common/module/soundsManager":15},"path":"preview-scripts/assets/scripts/homeScene/startAnim.js"},{"deps":{},"path":"preview-scripts/assets/scripts/levelScene/combatLogic.js"},{"deps":{"../common/starReview":37},"path":"preview-scripts/assets/scripts/levelScene/settlementFace.js"},{"deps":{},"path":"preview-scripts/assets/scripts/levelScene/V_gameState.js"},{"deps":{"../common/module/gameDataManager":2,"../common/module/soundsManager":15},"path":"preview-scripts/assets/scripts/selecttLevelScene/levelManager.js"},{"deps":{"./monster":4,"../../common/animationPath":34},"path":"preview-scripts/assets/scripts/levelScene/monster/monsterFactory.js"},{"deps":{"../../monster/monster":4},"path":"preview-scripts/assets/scripts/levelScene/tower/arrow/arrower.js"},{"deps":{"../common/module/gameDataManager":2,"./aSeriesSkill":3},"path":"preview-scripts/assets/scripts/selecttLevelScene/skillsBoard.js"},{"deps":{"../common/module/gameDataManager":2,"./levelManager":25,"../../res/prefabs/loadingDoorAnim/loadingDoorAnim":35,"../common/module/soundsManager":15},"path":"preview-scripts/assets/scripts/selecttLevelScene/selectLevelScene.js"},{"deps":{"../../monster/monster":4},"path":"preview-scripts/assets/scripts/levelScene/tower/artillery/artilleryBullet.js"},{"deps":{},"path":"preview-scripts/assets/scripts/levelScene/tower/magiclan/magiclanBullet.js"},{"deps":{"../../../common/module/gameDataManager":2},"path":"preview-scripts/assets/scripts/levelScene/tower/arrow/arrowTower.js"},{"deps":{"./soldier":6,"../../../common/module/utils":19,"../../../common/module/gameDataManager":2},"path":"preview-scripts/assets/scripts/levelScene/tower/barrack/barrack.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/animationPath.js"},{"deps":{"../../../scripts/common/module/soundsManager":15},"path":"preview-scripts/assets/res/prefabs/loadingDoorAnim/loadingDoorAnim.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/move.js"},{"deps":{},"path":"preview-scripts/assets/scripts/common/starReview.js"},{"deps":{"../../../scripts/common/module/soundsManager":15},"path":"preview-scripts/assets/res/prefabs/switch/audioSwitch.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    