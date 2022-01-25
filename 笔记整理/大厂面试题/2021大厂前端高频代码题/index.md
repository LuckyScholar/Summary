# 2021大厂前端高频代码题

面试中的代码题, 其实大概可以分为两类：

1. 和前端技术相关的代码题/一些数据格式的转换题
2. 纯算法题

相信大家也都碰到过不同的类型, 今天我们就不同的类型来分别讲解一些经典的Coding.

## 前端技术相关

### 1. 你了解Vue的双向绑定原理吗? 

首先所谓的双向绑定建立在一个MVVM的模型基础上：

* 数据层（Model）：应用的数据及业务逻辑
* 视图层（View）：应用的展示效果，各类UI组件
* 业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来

而双向绑定其实就是指：
1. 数据变化后更新视图
2. 视图变化后更新数据


当然，它还有两个主要部分组成
* 监听器（Observer）：对所有数据的属性进行监听
* 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

#### 具体实现原理

1. new Vue()首先执行初始化，对data通过Object.defineProperties进行响应化处理，这个过程发生Observer中。每一个key都会有一个dep实例来存储watcher实例。
2. 同时对模板执行编译，通过v-等关键词解析指令，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发生在Compiler中。如果遇到v-model, 就监听input事件，更新data中对应的数据
3. 在解析指令的同时，会定义⼀个更新函数和Watcher，之后对应的数据变化时Watcher会调用更新函数。new Watcher的过程中会去读取data里的当前key, 触发getter进行依赖收集，将当前watcher添加到dep中。
4. 将来data中数据⼀旦发生变化，会首先找到对应的Dep，通知所有Watcher执行更新函数

#### Coding

1. 来简单实现一个响应式函数? 能对一个对象内的所有key添加响应式特性? 要求最终的输出如下方代码所示

```js
const reactive = (obj) => {
    
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

data.a = 5 // SET key=a val=5
data.b = 7 // SET key=b val=7
data.c.c2 = 4 // 
data.c.c1.af = 121 // SET key=af val=121
```

2. 那Vue对于数组类型是怎么处理的? 你能简单模拟一下对于数组方法的监听吗? 要求最终的输出如下方代码所示

```js
const reactive = (obj) => {
    
}

const data = [1, 2, 3, 4]
reactive(data)

data.push(5) // Action = push, args=5
data.splice(0, 2) // Action = splice, args=0,2
```

3. 你能实现一下基于proxy的响应式吗? 能够监听属性的删除操作? 要求最终的输出如下方代码所示

```js
function makeObservable(target) {
    
}

let user = {};

user = makeObservable(user);

user.observe((action, key, value) => {
    console.log(`${action} key=${key} value=${value || ''}`);
});

user.name = "John"; // SET key=name value=John
console.log(user.name); // GET key=name value=John  // John
delete user.name; // DELETE key=name value=
```

### 2. 你了解虚拟Dom吗? 能说一下它的优缺点吗?

是一种对于真实DOM的抽象, 在js中用嵌套对象表示，用对象的属性来描述节点，最终可以通过一系列操作使这棵树映射到真实DOM上。

虚拟DOM对象的节点与真实DOM的属性一一对应，每个节点最少包含标签名 (tag)、属性 (attrs) 和子元素对象 (children) 三个属性，不同框架对这三个属性的命名可能会有差别。

当有dom操作的需求时，可以先针对这颗虚拟dom树做操作，无论是节点的增加/删除/修改都可以, 最终经过diff算法比较新旧两棵虚拟dom树，得到所需修改的最小单位，大幅减少了dom操作。

1. 优点

* 保证性能下限，在不进行手动优化的情况下，提供过得去的性能
Virtual DOM更新DOM的准备工作耗费更多的时间，也就是JS层面，但是相比于更多的DOM操作它的消费是终究是更少的。

* 无需手动操作dom

* 跨平台
Virtual DOM本质上是JavaScript的对象，它可以很方便的跨平台操作，比如服务端渲染、uniapp等。


2. 缺点

* 首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。

* 做一些针对性的优化时，真实dom的操作还是更快一些的。

#### Coding

1. 给出如下数据格式的虚拟dom, 将其转换为真实dom

```js
const vnode = {
    tag: 'DIV',
    attrs: {
        id: 'app'
    },
    children: [{
            tag: 'SPAN',
            children: [{
                tag: 'A',
                children: []
            }]
        },
        {
            tag: 'SPAN',
            children: [{
                    tag: 'A',
                    children: []
                },
                {
                    tag: 'A',
                    children: []
                }
            ]
        }
    ]
}

function render(vnode) {
    
}
```

2. 将如下格式数组, 转为树结构? 递归和迭代两种方法?

```js
const arr = [{
    id: 2,
    name: '部门B',
    parentId: 0
},
{
    id: 3,
    name: '部门C',
    parentId: 1
},
{
    id: 1,
    name: '部门A',
    parentId: 2
},
{
    id: 4,
    name: '部门D',
    parentId: 1
},
{
    id: 5,
    name: '部门E',
    parentId: 2
},
{
    id: 6,
    name: '部门F',
    parentId: 3
},
{
    id: 7,
    name: '部门G',
    parentId: 2
},
{
    id: 8,
    name: '部门H',
    parentId: 4
}
]
```

### 3. Symbol的特性都有哪些? 一般用来做什么?


1. 可以用来解决属性名冲突的问题, 构造唯一的属性名或者变量.

它可以作为对象属性名。只有字符串和 symbol 类型才能用作对象属性名。
没有两个symbol 的值是相等的。

```js
const symbol1 = Symbol();
const symbol2 = Symbol();

symbol1 === symbol2; // false
```

2. Symbol的参数用来辅助调试

Symbol()函数只有一个参数，字符串description。这个字符串参数的唯一作用是辅助调试，也就是它的toString()值。但是请注意，两个具有相同description的symbol也是不相等的。

```js
const symbol1 = Symbol('my symbol');
const symbol2 = Symbol('my symbol');

symbol1 === symbol2; // false
console.log(symbol1); // 'Symbol(my symbol)'
```

3. 可迭代对象

JavaScript 内置了一个 symbol ，那就是 ES6 中的Symbol.iterator 。
拥有Symbol.iterator函数的对象被称为可迭代对象，就是说你可以在对象上使用for/of 循环。

4. 私有属性

由于任何两个symbol都是不相等的，在 JavaScript 里可以很方便地用来模拟私有属性。
symbol不会出现在 Object.keys()的结果中，因此除非用 Object.getOwnPropertySymbols() 函数获取，否则其他代码无法访问这个属性。

而且symbol不会出现在JSON.stringify()的结果里，确切地说是JSON.stringify()会忽略symbol属性名和属性值

```js
function getObj() {
    const symbol = Symbol('test');
    const obj = {};
    obj[symbol] = 'test';
    return obj;
}

const obj = getObj();

console.log(Object.keys(obj)); // []




const symbol = Symbol('test');
const obj = { [symbol]: 'test', test: symbol };

JSON.stringify(obj); // "{}"
```

#### Coding

1. 具体如何让一个对象遍历呢, 比如下面的题干, 按照要求输出

```js
const obj = {
    count: 0
}

for (const item of obj) {
    console.log(item) // 1 2 3 4 5 6 7 8 9 10
}
```

2. 你刚才说JSON.stringify会忽略symbol? 那除了这个 还会忽略什么呢?

JSON.stringify 会忽略 symbol, undefined 和 function.

* 如果对象有循环引用呢?

JSON.stringify会报错

* 为什么JSON.stringify对循环引用的对象会报错? 确定是stringify报错而不是parse报错吗?

确定是stringify报错, 因为如果有循环引用, stringify会尝试把所有对象序列化, 对象之间相互引用，形成无限循环.

* 你平时如果有深拷贝的需求, 你会怎么做呢? 分别针对不同的情况实现一下?

```js
function deepClone() {}
```


### 4. 你平时都如何判断对象类型的? 他们分别适合哪些场景呢?

* typeof
* instanceof 
* Object.prototype.toString.call(obj)
* Array.isArray

#### Coding

1. 实现一下instanceOf?

```js
function instanceOf(left, right) {}
```


## 算法相关

今天先来看一下二叉树的层序遍历相关的各种题型.

1. 从上到下打印二叉树

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7

输出：

[3,9,20,15,7]

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    
};
```

2. 从上到下打印二叉树, 每一层打印到一行

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7

输出：

[
  [3],
  [9,20],
  [15,7]
]

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {

};
```

3. 从上打印二叉树, 之字形打印

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7

输出：
[
  [3],
  [20,9],
  [15,7]
]

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {

};
```

4. 二叉树光照节点

从右侧有一束光照过来, 请输出光能找到的所有节点.

例如:
给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
  /
 16

输出：
[
  3, 20, 7, 16
]

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function exposedElement(root) {
    
};

```