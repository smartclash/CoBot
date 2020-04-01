# CoBot

A chatbot response handler made for https://covid19live.today/. Built using Typescript, Axios and [Socket.io](https://socket.io/)

## Installation

- Clone this repo and install the dependencies using Yarn or NPM.

```bash
yarn install
```

- And then build the project to compile down from Typescript to Javascript. _Ignore error messages that are shown_

```bash
yarn run build
```

You'll now have the compiled code inside `dist/` directory.

## Getting Started

- Make sure you set an environmental variable. The port number can be random but make sure the client can acces the port.

```bash
PORT=3892
```

- Now all you got to do is fireup node.

```
node .
```
