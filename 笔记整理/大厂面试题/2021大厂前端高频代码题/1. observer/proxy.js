let handlers = Symbol('handlers');
let observeStore = new Map();;

function makeObservable(target) {
    // 1. 初始化 handler 存储数组
    let handlerName = Symbol('handler');
    observeStore.set(handlerName, []);

    // 存储 handler 函数到数组中以便于未来调用
    target.observe = function (handler) {
        observeStore.get(handlerName).push(handler)
    };

    const proxyHandler = {
        get(target, property, receiver) {
            if (typeof target[property] === 'object' && target[property] !== null) {
                return new Proxy(target[property], proxyHandler);
            }

            let success = Reflect.get(...arguments); // 转发读取操作到目标对象
            if (success) {
                // 调用所有 handler
                observeStore.get(handlerName).forEach(handler => handler('GET', property, target[property]));
            }
            return success;
        },
        set(target, property, value, receiver) {
            let success = Reflect.set(...arguments); // 转发写入操作到目标对象
            if (success) { // 如果设置属性的时候没有报错
                // 调用所有 handler
                observeStore.get(handlerName).forEach(handler => handler('SET', property, value));
            }
            return success;
        },
        deleteProperty(target, property) {
            let success = Reflect.deleteProperty(target, property);

            if (success) {
                observeStore.get(handlerName).forEach(handler => handler('DELETE', property));
            }

            return success;
        }
    }

    // 2. 创建代理以处理更改
    return new Proxy(target, proxyHandler);
}

let user = {};

user = makeObservable(user);

user.observe((action, key, value) => {
    console.log(`${action} key=${key} value=${value || ''}`);
});

user.name = "John"; // SET key=name value=John
console.log(user.name); // GET key=name value=John  // John
delete user.name; // DELETE key=name value=


// let user = { child: {} };

// user = makeObservable(user);

// user.observe((action, key, value) => {
//     console.log(`${action} key=${key} value=${value || ''}`);
// });

// user.child.name = "John";
// console.log(user.child.name);
// delete user.child.name;