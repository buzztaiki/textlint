// LICENSE : MIT
"use strict";
const rcConfigLoader = require("rc-config-loader");
const interopRequire = require("interop-require");
/**
 * @param configFilePath
 * @param configFileName
 * @param moduleResolver
 * @returns {{ config: Object, filePath:string}}
 */
export default function load(configFilePath, { configFileName, moduleResolver }) {
    // if specify Config module, use it
    if (configFilePath) {
        try {
            const modulePath = moduleResolver.resolveConfigPackageName(configFilePath);
            return {
                config: interopRequire(modulePath),
                filePath: modulePath
            };
        } catch (error) {
            // not found config module
        }
    }
    // auto or specify path to config file
    const result = rcConfigLoader(configFileName, {
        configFileName: configFilePath,
        defaultExtension: [".json", ".js", ".yml"]
    });
    if (result === undefined) {
        return {
            config: {},
            filePath: undefined
        };
    }
    return {
        config: result.config,
        filePath: result.filePath
    };
}
