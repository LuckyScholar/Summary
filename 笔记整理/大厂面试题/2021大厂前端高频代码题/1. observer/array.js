const render = (action, ...args) => {
    console.log(`Action = ${action}, args=${args.join(',')}`)
}

const arrPrototype = Array.prototype; // 保存数组的原型
const newArrProtoType = Object.create(arrPrototype); // 创建一个新的数组原型 空对象 原型对象指向数组的原型

['push', 'prop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(methodName => {
    newArrProtoType[methodName] = function () { 
        // 重新修改原型中指定的这几个修改数组的方法，功能不变，只是在其修改后执行render函数
        arrPrototype[methodName].call(this, ...arguments);
        //注入渲染
        render(methodName, ...arguments);
    }
})

const reactive = (obj) => {
    if (Array.isArray(obj)) {
        // 则把新定义的原型对象赋值给 这个数组的 proto， 这样数组在执行那些方法时候就会处理渲染 
        obj.__proto__ = newArrProtoType 
    }
}


const data = [1, 2, 3, 4]
reactive(data)

data.push(5) // Action = push, args=5
data.splice(0, 2) // Action = splice, args=0,2


