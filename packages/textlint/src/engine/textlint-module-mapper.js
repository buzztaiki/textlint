// LICENSE : MIT
"use strict";
/**
 * This class is a helper to create mapping of rules and rulesConfig
 * Main purpose hide the RuleSeparator "/".
 */
// The separator of `<plugin>/<rule>`
const RuleSeparator = "/";
export default class TextLintModuleMapper {
    /**
     * create entities from rules/rulesConfig and prefix
     * entities is a array which contain [key, value]
     * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
     * @param {Object} pluginRules an object is like "rules" or "rulesConfig" of plugin
     * @param {string} prefixKey prefix key is plugin name or preset name
     * @returns {[string, string][]}
     */
    static createEntities(pluginRules, prefixKey) {
        const entities = [];
        Object.keys(pluginRules).forEach(ruleId => {
            const qualifiedRuleId = prefixKey + RuleSeparator + ruleId;
            const ruleCreator = pluginRules[ruleId];
            entities.push([qualifiedRuleId, ruleCreator]);
        });
        return entities;
    }

    /**
     * create an object from rules/rulesConfig and prefix
     * the object shape is { key: value, key2: value }
     * @param {Object} pluginRules an object is like "rules" or "rulesConfig" of plugin
     * @param {string} prefixKey prefix key is plugin name or preset name
     * @returns {Object}
     */
    static createMappedObject(pluginRules, prefixKey) {
        const mapped = {};
        Object.keys(pluginRules).forEach(key => {
            mapped[`${prefixKey}/${key}`] = pluginRules[key];
        });
        return mapped;
    }
}
