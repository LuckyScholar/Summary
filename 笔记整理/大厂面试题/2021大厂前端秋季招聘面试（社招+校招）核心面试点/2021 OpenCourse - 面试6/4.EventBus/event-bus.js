class EventEmitter {
    constructor(maxListeners) {
        this.events = {}
        this.maxListeners = maxListeners || Infinity;
    }

    emit(event, ...args) {
        const cbs = this.events[event]

        if (!cbs) {
            console.warn(`${event} event is not registered.`);
            return this;
        }
        //遍历所有的事件回调并执行
        cbs.forEach(cb => cb.apply(this, args))
        //为了链式调用返回this
        return this
    }
    // 实现订阅
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = []
        }

        if (this.maxListeners !== Infinity && this.events[event].length >= this.maxListeners) {
            console.warn(`${event} has reached max listeners.`)
            return this;
        }
        this.events[event].push(cb)

        return this
    }
    // 只执行一次订阅事件
    once(event, cb) {
        //这里自定义的函数需传参
        const func = (...args) => {
            //在调用时删除订阅事件
            this.off(event, func)
            //执行真正的回调事件
            cb.apply(this, args)
        }
        //先订阅
        this.on(event, func)

        return this
    }
    // 删除订阅
    off(event, cb) {
        //没有传特定的回调，就删除所有的事件回调
        if (!cb) {
            this.events[event] = null
        } else {
            //只删除特定的事件回调，返回过滤后的事件回调
            this.events[event] = this.events[event].filter(item => item !== cb);
        }

        return this
    }

}


const add = (a, b) => console.log(a + b)
const log = (...args) => console.log(...args)
const myevent = new EventEmitter()

myevent.on('add', add)
myevent.on('log', log)
myevent.emit('add', 1, 2) // 3
myevent.emit('log', 'hi~') // 'hi~'
myevent.off('add')
myevent.emit('add', 1, 2) // Error: add event is not registered.
myevent.once('once', add)
myevent.emit('once', 1, 2) // 3
myevent.emit('once', 1, 2)
myevent.emit('once', 1, 2)