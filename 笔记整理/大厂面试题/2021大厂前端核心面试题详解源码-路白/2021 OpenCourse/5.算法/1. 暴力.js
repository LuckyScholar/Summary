function trap(height = []) {
    if (height.length === 0) return 0;

    const n = height.length;
    let res = 0;
    for (let i = 1; i < n - 1; i++) {
        let l_max = 0;
        let r_max = 0;
        // 找右边最高的柱子
        for (let j = i; j < n; j++)
            r_max = Math.max(r_max, height[j]);
        // 找左边最高的柱子
        for (let j = i; j >= 0; j--)
            l_max = Math.max(l_max, height[j]);
        // 如果自己就是最高的话，
        // l_max == r_max == height[i]
        res += Math.min(l_max, r_max) - height[i];
    }
    return res;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))