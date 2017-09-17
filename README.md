# textlint

[![textlint logo](http://textlint.github.io/media/logo/spaced/textlint-logo.png)](http://textlint.github.io/)

> The pluggable linting tool for text and markdown.  
> It is similar to [ESLint](http://eslint.org/ "ESLint"), but textlint for natural language.

<!-- textlint-disable -->

[![Travis CI Build Status](https://travis-ci.org/textlint/textlint.svg)](https://travis-ci.org/textlint/textlint)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/4kwh41gxpc4h0obt/branch/master?svg=true)](https://ci.appveyor.com/project/azu/textlint/branch/master)

<!-- textlint-enable -->

## Online Demo

Visit [https://textlint.github.io/](https://textlint.github.io/) and type text!

## Features

- No bundled rules.
- To use a rule, install a textlint rule via npm.
    - `npm install textlint-rule-xxx`.
    - See [collection of textlint rules](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki")
- [Markdown](https://github.com/textlint/textlint-plugin-markdown) and [plain text](https://github.com/textlint/textlint-plugin-text ) are supported by default. [HTML](https://github.com/textlint/textlint-plugin-html) and [other formats](https://github.com/textlint/textlint#supported-file-formats) are supported by plugins.
- Allow to use bundled [formatter(reporter)](https://github.com/textlint/textlint-formatter) and custom formatters

## Quick Tour

Quick tour of textlint!

Read [Getting Started](./docs/getting-started.md) :squirrel:

## Installation

You can install `textlint` command using npm:

```
$ npm install textlint -g
```

**Requirements**: 

- Node.js 4.0.0+
- npm 2.0.0+

Test: Run `node -v` in your console. The version should be higher than v4.0.0.

:warning: Caution: Mixed location of installation.

- If you have installed `textlint` as `--global`(`-g`), must install each rule as `--global`.
- If you have installed `textlint` as `--save-dev`(`-D`), must install each rule as `--save-dev`.

Recommended way: Install `textlint` and rules as `--save-dev` per project.

### For Node.js beginner

If you never use Node.js and npm (package manager for Node.js), please see following:

- [Installing Node.js and updating npm | npm Documentation](https://docs.npmjs.com/getting-started/installing-node "02 - Installing Node.js and updating npm | npm Documentation")

## Usage

![screenshot lint pretty-error](docs/resources/screenshot-lint-pretty-error.png)

textlint has no default rules!!

Use textlint with `--rule` or `--rulesdir`, `.textlintrc` config file.

```sh
# Install textlint's rule
npm install --global textlint-rule-no-todo
```

Use with `textlint-rule-no-todo` rule.
(Allow to short `textlint-rule-no-todo` to `no-todo`)

```sh
textlint --rule no-todo README.md
```

:memo: We recommended to use `.textlintrc` instead of `--rule` or `--rulesdir`.
`.textlintrc` is suitable format to maintain rules.

## CLI

See command help

```
$ textlint -h
textlint [options] file.md [file|dir|glob*]

Options:
  -h, --help                 Show help.
  -c, --config path::String  Use configuration from this file or sharable config.
  --init                     Create the config file if not existed. - default: false
  --fix                      Automatically fix problems
  --dry-run                  Enable dry-run mode for --fix. Only show result, don't change the file.
  --debug                    Outputs debugging information
  -v, --version              Outputs the version number.

Using stdin:
  --stdin                    Lint text provided on <STDIN>. - default: false
  --stdin-filename String    Specify filename to process STDIN as

Output:
  -o, --output-file path::String  Enable report to be written to a file.
  -f, --format String        Use a specific output format.
  --no-color                 Disable color in piped output.
  --quiet                    Report errors only. - default: false

Specifying rules and plugins:
  --plugin [String]          Set plugin package name
  --rule [path::String]      Set rule package name
  --preset [path::String]    Set preset package name and load rules from preset package.
  --rulesdir [path::String]  Set rules from this directory and set all default rules to off.

Caching:
  --cache                    Only check changed files - default: false
  --cache-location path::String  Path to the cache file or directory

Experimental:
  --experimental             Enable experimental flag.Some feature use on experimental.
```

Allow to use glob as a target.

Please note that you have to quote your parameter as follows:

```sh
$ textlint "docs/**"
```

Example:

- :information_source: See [examples/cli](examples/cli)


## .textlintrc

`.textlintrc` is config file that is loaded as JSON, YAML or JS via [MoOx/rc-loader](https://github.com/MoOx/rc-loader "MoOx/rc-loader").

```
$ textlint --rule no-todo --rule very-nice-rule README.md
```

is equal to create `.textlintrc` file

```json
{
  "rules": {
    "no-todo": true,
    "very-nice-rule": true
  }
}
```

and run `textlint` command

```sh
$ textlint README.md
# Automatically load `.textlintrc` in current directory
```

`.textlintrc` can define rule's option.

```json
{
  "rules": {
    "no-todo": false, // disable
    "very-nice-rule": {
        "key": "value"
    }
  }
}
```

Pass rule's options ("key": "value") to `very-nice-rule`.

It mean that use the following format:

<!-- textlint-disable -->

```js
{
  // Allow to comment in JSON
  "rules": {
    "<rule-name>": true | false | object
  }
}
```

<!-- textlint-enable -->

:information_source: for more details

- [docs/configuring](docs/configuring.md)
- [examples/config-file](examples/config-file)

### Plugin

textlint plugin is a set of rules and rulesConfig or customize parser.

To enable plugin, put the "plugin-name" into `.textlinrc`.

<!-- textlint-disable -->

```js
// `.textlinrc`
{
    "plugins": [
        "plugin-name"
    ],
    // overwrite-plugins rules config
    // <plugin>/<rule>
    "rules": {
        "plugin-name/rule-name" : false
    }
}
```

<!-- textlint-enable -->

:information_source: See [docs/plugin.md](docs/plugin.md)

### Supported file formats

textlint supports Markdown and plain text by default.

Install **Processor Plugin** and add new file format support.

For example, if you want to lint HTML, use [textlint-plugin-html](https://github.com/textlint/textlint-plugin-html "textlint-plugin-html") as a plugin.

    npm install textlint-plugin-html
    
Add `"html"` to `.textlintrc`

```
{
    "plugins": [
        "html"
    ]
}
```

Run textlint on `.html` files:

  textlint index.html

- Example: [examples/html-plugin](examples/html-plugin)
- Documentation: [docs/plugin.md](docs/plugin.md)

Optional supported file types:

- HTML: [textlint-plugin-html](https://github.com/textlint/textlint-plugin-html "textlint-plugin-html")
- reStructuredText: [textlint-plugin-rst](https://github.com/jimo1001/textlint-plugin-rst "textlint-plugin-rst")
- AsciiDoc/Asciidoctor: [textlint-plugin-asciidoc-loose](https://github.com/azu/textlint-plugin-asciidoc-loose "textlint-plugin-asciidoc-loose")
- Re:VIEW: [textlint-plugin-review](https://github.com/orangain/textlint-plugin-review "textlint-plugin-review")

See [Processor Plugin List](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule#processor-plugin-list "Processor Plugin List") for details.


### Rules list :green_heart:

textlint has not built-in rules, but there are 100+ pluggable rules:

- [textlint-rule-no-todo](https://github.com/azu/textlint-rule-no-todo)
- [textlint-rule-max-number-of-lines](https://github.com/azu/textlint-rule-max-number-of-lines)
- [textlint-rule-common-misspellings](https://github.com/io-monad/textlint-rule-common-misspellings)
- [etc...](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule)

See [A Collection of textlint rule · textlint/textlint Wiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule "Collection of textlint rule · textlint/textlint Wiki") for more details.


If you create a new rule, and add it to the wiki :)

### Fixable

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) 

Some rules are fixable using the `--fix` command line flag.

``` sh
$ textlint --fix README.md
# As a possible, textlint fix the content.
```

![fixable-error](./docs/resources/fixable-error.png)

Also, support [dry run](https://en.wikipedia.org/wiki/Dry_run_(testing) "dry run") mode.

```
$ textlint --fix --dry-run --format diff README.md
# show the difference between fixed content and original content.
```

You can copy and paste to your README.

```markdown
[![textlint fixable rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) 
```

### Built-in formatters

Use the following formatters:

- stylish (defaults)
- compact
- checkstyle
- jslint-xml
- junit
- tap
- table
- pretty-error
- json
- unix

e.g. use `pretty-error` formatter:

```
$ textlint -f pretty-error file.md
```

More details in [textlint/textlint-formatter](https://github.com/textlint/textlint-formatter "textlint/textlint-formatter").

## Use as node module

You can use textlint as node module.

```
$ npm install textlint --save-dev
```

Minimal usage:

```js
import { TextLintEngine } from "textlint";
const engine = new TextLintEngine({
    rulePaths: ["path/to/rule-dir"]
});
engine.executeOnFiles(["README.md"]).then(results => {
    console.log(results[0].filePath); // => "README.md"
    // messages are `TextLintMessage` array.
    console.log(results[0].messages);
    /* 
    [
        {
            id: "rule-name",
            message:"lint message",
            line: 1, // 1-based columns(TextLintMessage)
            column:1 // 1-based columns(TextLintMessage)
        }
    ]
     */
    if (engine.isErrorResults(results)) {
        const output = engine.formatResults(results);
        console.log(output);
    }
});

```

Low level usage:

```js
import { textlint } from "textlint";
textlint.setupRules({
    // rule-key : rule function(see docs/rule.md)
    "rule-key"(context){
        const exports = {};
        exports[context.Syntax.Str] = function (node) {
            context.report(node, new context.RuleError("error message"));
        };
        return exports;
    }
});
textlint.lintMarkdown("# title").then(results => {
    console.log(results[0].filePath); // => "README.md"
    console.log(results[0].messages); // => [{message:"lint message"}]
});

```

More details on:

- See [docs/use-as-modules.md](docs/use-as-modules.md)


## Conclusion

textlint has four extensible points:

- [rule](docs/rule.md)
    - rule is a rule for linting.
- [filter rule](docs/filter-rule.md)
    - filter rule is a rule for filtering result of errors.
- [rule-preset](docs/rule-preset.md)
    - rule-preset contains rules.
- [plugin](docs/plugin.md)
    - plugin contains rules and a processor.

![rule-preset-plugin](docs/resources/rule-preset-plugin.png)

## FAQ: How to create rules?

Please see docs/

- [docs/txtnode.md](docs/txtnode.md)
    - What is TxtNode?
- [docs/rule.md](docs/rule.md)
    - How to create rules?
    - Tutorial: creating `no-todo` rule.
- [docs/rule-advanced.md](docs/rule-advanced.md)
    - Advanced tutorial for creating rule.
    
## FAQ: How to suppress error by comments like `<!-- textlint-disable -->`?

You can use filter rule like [textlint-filter-rule-comments](https://github.com/textlint/textlint-filter-rule-comments "textlint-filter-rule-comments").

Please see [docs/configuring.md](docs/configuring.md) for more details.

## Integrations

### Build Systems

- gulp plugin
  - [gulp-textlint](https://github.com/textlint/gulp-textlint "gulp-textlint")
- Grunt plugin
  - [grunt-textlint](https://github.com/textlint/grunt-textlint "grunt-textlint")

### Editors

- Atom Editor
  - [1000ch/linter-textlint](https://github.com/1000ch/linter-textlint "1000ch/linter-textlint")
- SublimeText
  - [joeybaker/sublimelinter-textlint](https://github.com/joeybaker/sublimelinter-textlint)
- Vim
  - [vim-textlint](https://github.com/heavenshell/vim-textlint "vim-textlint")
  - [scrooloose/syntastic](https://github.com/scrooloose/syntastic "scrooloose/syntastic")
    - See [Markdown](https://github.com/scrooloose/syntastic/wiki/Markdown "Markdown"), [Text](https://github.com/scrooloose/syntastic/wiki/Text "Text") and [HTML](https://github.com/scrooloose/syntastic/wiki/HTML "HTML") of [scrooloose/syntastic Wiki](https://github.com/scrooloose/syntastic/wiki/Syntax-Checkers "Syntax Checkers · scrooloose/syntastic Wiki") 
- VS Code
  - [taichi/vscode-textlint](https://github.com/taichi/vscode-textlint)
- [micro](https://github.com/zyedidia/micro "micro")
  - [hidaruma/micro-textlint-plugin](https://github.com/hidaruma/micro-textlint-plugin "hidaruma/micro-textlint-plugin: textlint plugin for micro-editor")

### Browser

- Chrome Extension
  - [Chrome: textlint-proofreader](https://chrome.google.com/webstore/detail/textlint-proofreader/hdongmdneapmhfblomidbafplpanpdmm)
  - [io-monad/textlint-chrome-extension: textlint Chrome Extension](https://github.com/io-monad/textlint-chrome-extension "io-monad/textlint-chrome-extension: textlint Chrome Extension")

### Other

- [Pronto](https://github.com/mmozuras/pronto "Pronto"): [pronto-textlint](https://github.com/seikichi/pronto-textlint "pronto-textlint")
- [reviewdog](https://github.com/haya14busa/reviewdog "reviewdog"): [azu/textlint-reviewdog-example](https://github.com/azu/textlint-reviewdog-example "azu/textlint-reviewdog-example: textlint + reviewdog example project")

## Packages

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish [several packages](/packages) to npm from the same codebase, including:

### Core

These modules are parts of textlint.

| Package | Version | Description |
|---------|---------|-------------|
| [`textlint`](/packages/textlint) | [![npm](https://img.shields.io/npm/v/textlint.svg?style=flat-square)](https://www.npmjs.com/package/textlint) | textlint command line tool itself |
| [`textlint-kernel`](/packages/textlint-kernel) | [![npm](https://img.shields.io/npm/v/@textlint/kernel.svg?style=flat-square)](https://www.npmjs.com/package/@textlint/kernel) | textlint main logic module. It is universal JavaScript.  |
| [`textlint-plugin-markdown`](/packages/textlint-plugin-markdown) | [![npm](https://img.shields.io/npm/v/textlint-plugin-markdown.svg?style=flat-square)](https://www.npmjs.com/package/textlint-plugin-markdown) | markdown support for textlint |
| [`textlint-plugin-text`](/packages/textlint-plugin-text) | [![npm](https://img.shields.io/npm/v/textlint-plugin-text.svg?style=flat-square)](https://www.npmjs.com/package/textlint-plugin-text) | plain text support for textlint |
| [`markdown-to-ast`](/packages/markdown-to-ast) | [![npm](https://img.shields.io/npm/v/markdown-to-ast.svg?style=flat-square)](https://www.npmjs.com/package/markdown-to-ast) | markdown parser |
| [`txt-to-ast`](/packages/txt-to-ast) | [![npm](https://img.shields.io/npm/v/txt-to-ast.svg?style=flat-square)](https://www.npmjs.com/package/txt-to-ast) | plain text parser |

### Rule/Plugin helper

These modules are useful for textlint rule/plugin author.

| Package | Version | Description |
|---------|---------|-------------|
| [`@textlint/ast-node-types`](/packages/ast-node-types) | [![npm](https://img.shields.io/npm/v/@textlint/ast-node-types.svg?style=flat-square)](https://www.npmjs.com/package/@textlint/ast-node-types) | [textlint AST(Abstract Syntax Tree)](./docs/txtnode.md) type definition |
| [`textlint-tester`](/packages/textlint-tester) | [![npm](https://img.shields.io/npm/v/textlint-tester.svg?style=flat-square)](https://www.npmjs.com/package/textlint-tester) | textlint rule testing tools |
| [`textlint-scripts`](https://github.com/textlint/textlint-scripts) | [![npm](https://img.shields.io/npm/v/textlint-scripts.svg?style=flat-square)](https://www.npmjs.com/package/textlint-scripts) | textlint rule npm run-scripts |
| [`create-textlint-rule`](https://github.com/textlint/create-textlint-rule) | [![npm](https://img.shields.io/npm/v/create-textlint-rule.svg?style=flat-square)](https://www.npmjs.com/package/create-textlint-rule) | create textlint rule with no build configuration |

### Internal

These modules are internal usage in the monorepo.

| Package | Version | Description |
|---------|---------|-------------|
| [`@textlint/monorepo-scripts`](/packages/textlint-monorepo-scripts) | [![npm](https://img.shields.io/npm/v/@textlint/monorepo-scripts.svg?style=flat-square)](https://www.npmjs.com/package/@textlint/monorepo-scripts) | textlint monorepo build scripts |
| [`@textlint/feature-flag`](/packages/textlint-feature-flag) | [![npm](https://img.shields.io/npm/v/@textlint/feature-flag.svg?style=flat-square)](https://www.npmjs.com/package/@textlint/feature-flag) | feature flag manager |

## Who's using textlint?

- [vuejs-jp/vuejs.org](https://github.com/vuejs-jp/jp.vuejs.org "vuejs-jp/vuejs.org")
- [survivejs/webpack-book](https://github.com/survivejs/webpack-book "survivejs/webpack-book: From apprentice to master (CC BY-NC-ND)")
- [asciidwango/js-primer](https://github.com/asciidwango/js-primer "asciidwango/js-primer: JavaScriptの入門書")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT © azu

Copy some code from ESLint.

    ESLint
    Copyright (c) 2013 Nicholas C. Zakas. All rights reserved.
    https://github.com/eslint/eslint/blob/master/LICENSE

## Logos & Icons

Download from [textlint/media](https://github.com/textlint/media "textlint/media: Official logo and icon.").

## Related Work

<!-- textlint-disable -->

[SCG: TextLint](http://scg.unibe.ch/research/textlint "SCG: TextLint") is similar project.

[SCG: TextLint](http://scg.unibe.ch/research/textlint "SCG: TextLint")'s place is equal to my `textlint`(Fortuitously, project's name is the same too!).

![concept](http://monosnap.com/image/Gr9CGbkSjl1FXEL0LIWzNDAj3c24JT.png)

via [Natural Language Checking with Program Checking Tools](http://www.slideshare.net/renggli/text-lint "Natural Language Checking with Program Checking Tools")

## Acknowledgements

Thanks to [ESLint](http://eslint.org/ "ESLint").

<!-- textlint-enable -->
