const render = (key, val) => {
    console.log(`SET key=${key} val=${val}`)
}

const defineReactive = (obj, key, val) => {

    reactive(val) // 我们在这里进行递归

    Object.defineProperty(obj, key, {
        get() {
            return val;
        },
        set(newVal) {
            if (val === newVal) { // 模仿diff
                return
            }
            //把新值赋值给旧值
            val = newVal;
            //执行 渲染函数
            render(key, val)
        }
    })
}

const reactive = (obj) => {
    if (typeof obj === 'object') { // 这里需要添加一个递归结束的条件
        for (const key in obj) {
            defineReactive(obj, key, obj[key]);
        }
    }
}

const data = {
    a: 1,
    b: 2,
    c: {
        c1: {
            af: 999
        },
        c2: 4
    }
}

reactive(data)

data.a = 5
data.b = 7
data.c.c2 = 4 
data.c.c1.af = 121