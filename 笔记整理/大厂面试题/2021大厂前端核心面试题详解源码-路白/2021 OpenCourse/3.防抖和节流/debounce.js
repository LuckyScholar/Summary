// 有参数

// function debounce(fn, wait) {
//     var timeout = null;
//     return function () {
//         if (timeout !== null)
//             clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             fn.apply(this, arguments);
//         }, wait);
//     }
// }
// // 处理函数
// function handle(value) {
//     console.log(value);
// }

// const debounceHandler = debounce(() => handle(Math.random()), 1000);


// debounceHandler();
// debounceHandler();
// debounceHandler();
// debounceHandler();
// debounceHandler();
// debounceHandler();
// debounceHandler();


// 无参数

function debounce(fn, wait) {
    var timeout = null;
    return function () {
        if (timeout !== null)
            clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
    console.log(Math.random());
}

const debounceHandler = debounce(handle, 1000);


debounceHandler();
debounceHandler();
debounceHandler();
debounceHandler();
debounceHandler();
debounceHandler();
debounceHandler();