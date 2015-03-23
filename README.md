# uwcua-vii

![Build Status](https://img.shields.io/travis/ghaiklor/uwcua-vii/master.svg) ![Coverage Status](https://img.shields.io/coveralls/ghaiklor/uwcua-vii/master.svg) ![dependencies](https://img.shields.io/david/ghaiklor/uwcua-vii.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/uwcua-vii.svg) [![Join the chat at https://gitter.im/ghaiklor/uwcua-vii](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ghaiklor/uwcua-vii?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Solution for UA Web Challenge VIІ.

Gitter bot which listen messages in the room and execute them as JavaScript expression.

Also available as CommonJS module, so you can quickly write your own :smiley:

## Demo

You can quickly see the results just navigating to [Gitter chat room](https://gitter.im/ghaiklor/uwcua-vii).

I have deployed server to DigitalOcean, so it should be work.

Type `calc <expression>` and send this message.
You will get respond with result of this expression.

## Installation

You can install this package from my GitHub.

```shell
$ sudo npm install -g ghaiklor/uwcua-vii # Global module
$ npm install ghaiklor/uwcua-vii # Local module
```

I don't publish this to npm because... anyway, I hope you understand why :smiley:

## CLI Usage

If you have installed as global module:

```shell
gitter-bot --key <YOUR_API_KEY> --room <ROOM_NAME> --pattern <REGEXP>
```

Or if don't:

```shell
node ./node_modules/.bin/gitter-bot --key <YOUR_API_KEY> --room <ROOM_NAME> --pattern <REGEXP>
```

You can call `gitter-bot --help` for advanced info.

For example, you want to start bot with my room and custom pattern for respond.
Then you should execute:

```shell
gitter-bot --key <YOUR_API_KEY> --room ghaiklor/uwcua-vii --pattern "^my custom pattern"
```

By the way, `--room` and `--pattern` is custom fields.
You can also provide only your API key at all.

```shell
gitter-bot --key <YOUR_API_KEY>
```

## API

You can require this module and use it for your own gitter bot.

```javascript
var GitterBot = require('gitter-bot');

var myBot = new GitterBot({
  apiKey: 'YOUR_API_KEY', // Your API key
  roomName: 'ghaiklor/uwcua-vii', // Which room I should connect
  execPattern: /^calc\s+/ // Which messages I need to execute
});
```

## Configuration

I have implemented few ways to configure your gitter-bot.

### Direct configuration

Configuration options which you send directly to `new GitterBot()` have highest priority.

```javascript
var myBot = new GitterBot({
  apiKey: 'YOUR_API_KEY', // Your API key
  roomName: 'ghaiklor/uwcua-vii', // Which room I should connect
  execPattern: /^calc\s+/ // Which messages I need to execute
});
```

### Environment variables

You can set environment variables.
If you didn't override those with Direct Configuration - it will works.

```shell
$ export GITTER_API_KEY=<YOUR_API_KEY>
$ export GITTER_ROOM_NAME=<ROOM_NAME>
$ export GITTER_BOT_EXEC_PATTERN=<REGEXP>
$ gitter-bot
```

Or just prepend your command.

```shell
GITTER_API_KEY=<YOUR_API_KEY> GITTER_ROOM_NAME=<ROOM_NAME> GITTER_BOT_EXEC_PATTERN=<REGEXP> gitter-bot
```

### Local configuration

And the last one way - it's using `config/local.js` file.
Create `config/local.js` file and exports configuration.

```javascript
module.exports = {
  apiKey: 'YOUR_API_KEY', // Your API key
  roomName: 'ghaiklor/uwcua-vii', // Which room I should connect
  execPattern: /^calc\s+/ // Which messages I need to execute
};
```
