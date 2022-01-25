const sizeof = require('object-sizeof')

const seen = new WeakSet();

function sizeOfObject(object) {
    if (object == null) {
        return 0
    }

    let bytes = 0
    const properties = Object.keys(object);
    for (let i = 0; i < properties.length; i++) {
        const key = properties[i]
        // 不重新计算循环引用,对应的key要算上，值可能是同一个引用
        bytes += calculator(key)
        if (typeof object[key] === 'object' && object[key] !== null) {
            if (seen.has(object[key])) {
                continue
            }
            seen.add(object[key])
        }
        // bytes += calculator(key)
        bytes += calculator(object[key])
    }

    return bytes
}

function calculator(object) {
    const objectType = typeof object;
    switch (objectType) {
        case 'string':
            return object.length * 2;
        case 'boolean':
            return 4;
        case 'number':
            return 8;
        case 'object':
            if (Array.isArray(object)) {
                return object.map(calculator).reduce(function (acc, curr) {
                    return acc + curr
                }, 0);
            } else {
                return sizeOfObject(object);
            }
            default:
                return 0;
    }
}


const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
}


console.log(sizeof(testData))
console.log(calculator(testData))