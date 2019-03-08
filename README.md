# y-state

[![Greenkeeper badge](https://badges.greenkeeper.io/liuyuchenzh/y-state.svg)](https://greenkeeper.io/)

## Intro

Simple implementation of state manager (data manager).

## Install

```bash
npm i y-state

# or

yarn add y-state
```

## Usage

```js
import State from 'y-state'
const option = {
  list: [
    {
      name: 'a',
      value: 1,
      watch(newValue, oldValue) {
        console.log('old', oldValue, 'new', newValue)
      }
    }
  ]
}
const state = new State(option)
// assign directly
state.a = 2 // old 1 new 2
// assign with setState method
state.setState('a', 3) // old 2 new 3
state.setState({ a: 4 }) // old 3 new 4
state.setState('a', oldValue => oldValue + 1) // old 4 new 5
```

## Support

IE >= 9, Node.js >= 4