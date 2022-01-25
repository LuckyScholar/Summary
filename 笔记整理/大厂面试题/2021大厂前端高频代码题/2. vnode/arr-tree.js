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

// 递归
function transfromArr2Tree(arr, parentId = 0) {
    const res = [];

    for (let item of arr) {
        if (item.parentId === parentId) {
            const children = transfromArr2Tree(arr, item.id);
            if (children.length) {
                item.children = children;
            }
            res.push(item)
        }
    }

    return res;
}

// 迭代
function transfromArr2Tree(arr) {
    const map = {};

    for (let item of arr) {
        map[item.id] = item;
    }

    const res = [];

    for (let item of arr) {
        const parent = map[item.parentId];

        if (parent) {
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(item);
        } else {
            res.push(item);
        }
    }

    return res;
}


console.log(JSON.stringify(transfromArr2Tree(arr)))
