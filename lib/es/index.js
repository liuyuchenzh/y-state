export default class State {
    constructor(option) {
        option.list.forEach(item => this.proxy(item));
    }
    proxy(item) {
        const { name, value, watch } = item;
        this['$' + name] = value;
        Object.defineProperty(this, name, {
            set: value => {
                typeof watch === 'function' && watch(value, this['$' + value]);
                this['$' + name] = value;
            },
            get: () => {
                return this['$' + name];
            }
        });
    }
    setState(data, value) {
        if (typeof data === 'string') {
            // if value is function, then pass in the old data
            if (typeof value === 'function') {
                this[data] = value(this[data]);
            }
            else {
                // value is not function but pure value, then assign
                this[data] = value;
            }
            return;
        }
        // react like
        Object.entries(data).map(([key, val]) => {
            this[key] = val;
        });
    }
    getItem(key) {
        return this[key];
    }
}
