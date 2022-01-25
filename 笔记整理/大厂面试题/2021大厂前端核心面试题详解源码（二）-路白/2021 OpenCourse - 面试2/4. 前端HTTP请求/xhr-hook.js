class XhrHook {
    /**
     * 构造函数
     * @param {*} beforeHooks 
     * @param {*} afterHooks 
     */
    constructor(beforeHooks = {}, afterHooks = {}) {
        // 单例
        if (XhrHook.instance) {
            return XhrHook.instance;
        }

        this.XHR = window.XMLHttpRequest;

        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.init();

        XhrHook.instance = this;
    }

    /**
     * 初始化 重写xhr对象
     */
    init() {
        let _this = this;

        window.XMLHttpRequest = function () {
            this._xhr = new _this.XHR();

            _this.overwrite(this);
        }

    }

    /**
     * 处理重写
     * @param {*} xhr 
     */
    overwrite(proxyXHR) {
        for (let key in proxyXHR._xhr) {

            if (typeof proxyXHR._xhr[key] === 'function') {
                this.overwriteMethod(key, proxyXHR);
                continue;
            }

            this.overwriteAttributes(key, proxyXHR);
        }
    }

    /**
     * 重写方法
     * @param {*} key 
     */
    overwriteMethod(key, proxyXHR) {
        let beforeHooks = this.beforeHooks;
        let afterHooks = this.afterHooks;

        proxyXHR[key] = (...args) => {
            // 拦截
            if (beforeHooks[key] && (beforeHooks[key].call(proxyXHR, args) === false)) {
                return;
            }

            // 执行方法本体
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);

            // 方法本体执行后的钩子
            afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res);

            return res;
        };
    }

    /**
     * 重写属性
     * @param {*} key 
     */
    overwriteAttributes(key, proxyXHR) {
        Object.defineProperty(proxyXHR, key, this.setProperyDescriptor(key, proxyXHR));
    }

    /**
     * 设置属性的属性描述
     * @param {*} key 
     */
    setProperyDescriptor(key, proxyXHR) {
        let obj = Object.create(null);
        let _this = this;

        obj.set = function (val) {

            // 如果不是on打头的属性
            if (!key.startsWith('on')) {
                proxyXHR['__' + key] = val;
                return;
            }

            if (_this.beforeHooks[key]) {

                this._xhr[key] = function (...args) {
                    _this.beforeHooks[key].call(proxyXHR);
                    val.apply(proxyXHR, args);
                }

                return;
            }

            this._xhr[key] = val;
        }

        obj.get = function () {
            return proxyXHR['__' + key] || this._xhr[key];
        }

        return obj;
    }

    /**
     * 获取实例
     */
    getInstance() {
        return XhrHook.instance;
    }

    /**
     * 添加钩子
     * @param {*} key 
     * @param {*} value 
     */
    add(key, value, execed = false) {
        if (execed) {
            this.afterHooks[key] = value;
        } else {
            this.beforeHooks[key] = value;
        }
        return this;
    }

    /**
     * 删除钩子
     * @param {*} name 
     */
    rmHook(name, isExeced = false) {
        let target = (isExeced ? this.afterHooks : this.beforeHooks);
        delete target[name];
    }

    /**
     * 清空钩子
     */
    clearHook() {
        this.beforeHooks = {};
        this.afterHooks = {};
    }

    /**
     * 取消监听
     */
    unset() {
        window.XMLHttpRequest = this.XHR;
    }

    /**
     * 重新监听
     */
    reset() {
        XhrHook.instance = null;
        XhrHook.instance = new XhrHook(this.beforeHooks, this.afterHooks);
    }
}

new XhrHook({
    open: function () {
        console.log('open');
        // return false;
    },
    onload: function () {
        console.log('onload');
    },
    onreadystatechange: function () {
        console.log('onreadystatechange');
    },
    onerror: function () {
        console.log('hook error')
    }
});



var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.baidu.com', true);

xhr.send();

xhr.onreadystatechange = function (res) {
    console.log('statechange');
}

xhr.onerror = function () {
    console.log('error');
}