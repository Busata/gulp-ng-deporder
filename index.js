var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var File = gutil.File;

const PLUGIN_NAME = 'gulp-ng-deporder';
const reDEPENDENCIES = /angular.module\(['"]([a-zA-Z-.]+)["'],?\s*(\[(.*)\]\))?/


function getModuleInfo(file) {
    if (file.contents) {
        var contents = file.contents.toString('utf8', 0, 1024);
        var match = reDEPENDENCIES.exec(contents);

        if (match) {
            var name = match[1];
            var isRetrieval = false;
            var dependencies = match[3];
            if (typeof(dependencies) == "undefined") {
                isRetrieval = true;
            }

            return {
                name: name,
                isRetrieval: isRetrieval
            }
        }
    }
}

function gulpNGDeporder() {
    var declared_modules = []
    var undeclared_modules = {}

    var stream = through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        if (file.isBuffer()) {
            var module_info = getModuleInfo(file);
            if (typeof(module_info) == "undefined") {
                this.push(file); // No angular module found, let it pass
                return callback();
            }

            if (!module_info.isRetrieval) {
                declared_modules.push(module_info.name);
                this.push(file); //Found a module declaration, push

                if (module_info.name in undeclared_modules) {
                    for (var i = 0; i < undeclared_modules[module_info.name].length; i++) {
                        this.push(undeclared_modules[module_info.name][i]); // Push any modules that were found earlier
                    }
                }

            }

            var hasEncountered = (declared_modules.indexOf(module_info.name) != -1);

            if (module_info.isRetrieval && !hasEncountered) {
                undeclared_modules[module_info.name] = [file]; // Do not push modules that had no declaration yet
            }

        }

        callback();

    })

    //TODO Check if any undeclared modules are still not pushed, should probably result in an error?
    return stream;
}

module.exports = gulpNGDeporder;
