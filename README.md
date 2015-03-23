# uwcua-vii

![Build Status](https://img.shields.io/travis/ghaiklor/uwcua-vii/master.svg) | ![Coverage Status](https://img.shields.io/coveralls/ghaiklor/uwcua-vii/master.svg) ![dependencies](https://img.shields.io/david/ghaiklor/uwcua-vii.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/uwcua-vii.svg) [![Join the chat at https://gitter.im/ghaiklor/uwcua-vii](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ghaiklor/uwcua-vii?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Solution for UA Web Challenge VIІ.

Gitter bot which listen messages in the room and execute them as JavaScript expression.

## Getting Started

You can quickly see the results just navigating to [Gitter chat room](https://gitter.im/ghaiklor/uwcua-vii).
Type `calc <expression>` and send this message.
You will get respond with result of this expression.

## CLI Usage

If you are installing this as global module:

```shell
npm install -g ghaiklor/uwcua-vii
gitter-bot --key <key> --room <room> --pattern <regex>
```

Or if you don't want to install it as global, you can install locally and run:

```shell
npm install ghaiklor/uwcua-vii
node ./node_modules/.bin/gitter-bot --key <key> --room <room> --pattern <pattern>
```

You can call `gitter-bot --help` for advanced info.

For example, you want to start bot with my room and custom pattern for respond.
Then you should execute:

```shell
gitter-bot --key <YOUR_API_KEY> --room ghaiklor/uwcua-vii --pattern "^my custom pattern"
```

## API

You can require this module and use it for your own gitter bot.

```javascript
var GitterBot = require('gitter-bot');

var myBot = new GitterBot({
  apiKey: 'YOUR_API_KEY',
  roomName: 'ghaiklor/uwcua-vii',
  execPattern: /^calc\s+/
});
```
