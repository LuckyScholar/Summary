function trap(height = []) {
    if (height.length === 0) return 0;
    const n = height.length;
    let res = 0;

    // 数组充当备忘录
    let l_max = new Array(n);
    let r_max = new Array(n);

    // 初始化 base case
    l_max[0] = height[0];
    r_max[n - 1] = height[n - 1];

    // 从左向右计算 l_max
    for (let i = 1; i < n; i++)
        l_max[i] = Math.max(height[i], l_max[i - 1]);

    // 从右向左计算 r_max
    for (let i = n - 2; i >= 0; i--)
        r_max[i] = Math.max(height[i], r_max[i + 1]);

    // 计算答案
    for (let i = 1; i < n - 1; i++)
        res += Math.min(l_max[i], r_max[i]) - height[i];

    return res;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))


// 这个优化其实和暴力解法思路差不多， 就是避免了重复计算， 把时间复杂度降低为 O(N)， 已经是最优了.

// 但是空间复杂度是 O(N)。 下面来看一个精妙一些的解法， 能够把空间复杂度降低到 O(1)。