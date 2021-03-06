// LICENSE : MIT
"use strict";
import { isPluginRuleKey, isPresetRuleKey } from "../util/config-util";
/**
 * Get rule keys from `.textlintrc` config object.
 * @param {Object} [rulesConfig]
 * @returns {{available: string[], disable: string[]}}
 */
export default function separateAvailableOrDisable(rulesConfig) {
    const ruleOf = {
        presets: [],
        available: [],
        disable: []
    };
    if (!rulesConfig) {
        return ruleOf;
    }
    Object.keys(rulesConfig).forEach(key => {
        // `textlint-rule-preset-XXX`
        if (isPresetRuleKey(key)) {
            if (typeof rulesConfig[key] === "object" || rulesConfig[key] === true) {
                ruleOf.presets.push(key);
            }
            return;
        }
        // `<plugin>/<rule-key>` should ignored
        if (isPluginRuleKey(key)) {
            return;
        }
        // ignore `false` value
        if (typeof rulesConfig[key] === "object" || rulesConfig[key] === true) {
            ruleOf.available.push(key);
        } else {
            ruleOf.disable.push(key);
        }
    });
    return ruleOf;
}
