export interface StateOption<T> {
  list: Item<T>[]
}

export interface Item<T> {
  name: string
  value: T
  watch(newVal: T, oldVal: T): any
}

export type setState = {[key: string]: any} | string

export default class State {
  // signature
  [key: string]: any

  constructor(option: StateOption<any>) {
    option.list.forEach(item => this.proxy(item))
  }

  proxy<T>(item: Item<T>) {
    const { name, value, watch } = item
    this['$' + name] = value
    Object.defineProperty(this, name, {
      set: value => {
        typeof watch === 'function' && watch(value, this['$' + value])
        this['$' + name] = value
      },
      get: () => {
        return this['$' + name]
      }
    })
  }

  setState(data: setState, value?: any) {
    if (typeof data === 'string') {
      // if value is function, then pass in the old data
      if (typeof value === 'function') {
        this[data] = value(this[data])
      } else {
        // value is not function but pure value, then assign
        this[data] = value
      }
      return
    }
    // react like
    Object.entries(data).map(([key, val]) => {
      this[key] = val
    })
  }

  getItem(key: string): any {
    return this[key]
  }
}
