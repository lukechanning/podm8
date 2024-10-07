podm8
=================

A podcast analytics and show reporting tool for the command line


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/podm8.svg)](https://npmjs.org/package/podm8)
[![Downloads/week](https://img.shields.io/npm/dw/podm8.svg)](https://npmjs.org/package/podm8)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g podm8
$ podm8 COMMAND
running command...
$ podm8 (--version)
podm8/0.0.0 darwin-arm64 node-v20.11.0
$ podm8 --help [COMMAND]
USAGE
  $ podm8 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`podm8 hello PERSON`](#podm8-hello-person)
* [`podm8 hello world`](#podm8-hello-world)
* [`podm8 help [COMMAND]`](#podm8-help-command)
* [`podm8 plugins`](#podm8-plugins)
* [`podm8 plugins add PLUGIN`](#podm8-plugins-add-plugin)
* [`podm8 plugins:inspect PLUGIN...`](#podm8-pluginsinspect-plugin)
* [`podm8 plugins install PLUGIN`](#podm8-plugins-install-plugin)
* [`podm8 plugins link PATH`](#podm8-plugins-link-path)
* [`podm8 plugins remove [PLUGIN]`](#podm8-plugins-remove-plugin)
* [`podm8 plugins reset`](#podm8-plugins-reset)
* [`podm8 plugins uninstall [PLUGIN]`](#podm8-plugins-uninstall-plugin)
* [`podm8 plugins unlink [PLUGIN]`](#podm8-plugins-unlink-plugin)
* [`podm8 plugins update`](#podm8-plugins-update)

## `podm8 hello PERSON`

Say hello

```
USAGE
  $ podm8 hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ podm8 hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/lukechanning/podm8/podm8/blob/v0.0.0/src/commands/hello/index.ts)_

## `podm8 hello world`

Say hello world

```
USAGE
  $ podm8 hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ podm8 hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/lukechanning/podm8/podm8/blob/v0.0.0/src/commands/hello/world.ts)_

## `podm8 help [COMMAND]`

Display help for podm8.

```
USAGE
  $ podm8 help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for podm8.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.14/src/commands/help.ts)_

## `podm8 plugins`

List installed plugins.

```
USAGE
  $ podm8 plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ podm8 plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.14/src/commands/plugins/index.ts)_

## `podm8 plugins add PLUGIN`

Installs a plugin into podm8.

```
USAGE
  $ podm8 plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into podm8.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PODM8_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PODM8_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ podm8 plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ podm8 plugins add myplugin

  Install a plugin from a github url.

    $ podm8 plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ podm8 plugins add someuser/someplugin
```

## `podm8 plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ podm8 plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ podm8 plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.14/src/commands/plugins/inspect.ts)_

## `podm8 plugins install PLUGIN`

Installs a plugin into podm8.

```
USAGE
  $ podm8 plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into podm8.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PODM8_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PODM8_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ podm8 plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ podm8 plugins install myplugin

  Install a plugin from a github url.

    $ podm8 plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ podm8 plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.14/src/commands/plugins/install.ts)_

## `podm8 plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ podm8 plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ podm8 plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.14/src/commands/plugins/link.ts)_

## `podm8 plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ podm8 plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ podm8 plugins unlink
  $ podm8 plugins remove

EXAMPLES
  $ podm8 plugins remove myplugin
```

## `podm8 plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ podm8 plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.14/src/commands/plugins/reset.ts)_

## `podm8 plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ podm8 plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ podm8 plugins unlink
  $ podm8 plugins remove

EXAMPLES
  $ podm8 plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.14/src/commands/plugins/uninstall.ts)_

## `podm8 plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ podm8 plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ podm8 plugins unlink
  $ podm8 plugins remove

EXAMPLES
  $ podm8 plugins unlink myplugin
```

## `podm8 plugins update`

Update installed plugins.

```
USAGE
  $ podm8 plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.14/src/commands/plugins/update.ts)_
<!-- commandsstop -->
