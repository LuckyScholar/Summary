function trap(height = []) {
    if (height.lenght === 0) return 0;
    const n = height.length;
    let left = 0;
    let right = n - 1;
    let res = 0;

    let l_max = height[0];
    let r_max = height[n - 1];

    while (left <= right) {
        l_max = Math.max(l_max, height[left]);
        r_max = Math.max(r_max, height[right]);

        if (l_max < r_max) {
            res += l_max - height[left];
            left++;
        } else {
            res += r_max - height[right];
            right--;
        }
    }
    return res;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))