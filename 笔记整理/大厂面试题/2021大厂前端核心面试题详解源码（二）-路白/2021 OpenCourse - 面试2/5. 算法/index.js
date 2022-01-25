/**
 * 0-1背包问题
 * @param {Number} W 背包容量
 * @param {Number} N 物品总数
 * @param {Array} wt 物品重量数组
 * @param {Array} val 物品价值数组
 * @returns Number 背包能装的最大价值
 */
function knapsack(W, N, wt = [], val = []) {
    // 初始化N+1行, M+1列的二维数组, base case 已初始化
    const dp = Array.from(new Array(N + 1), () => new Array(W + 1).fill(0));

    for (let i = 1; i <= N; i++) {
        for (let w = 1; w <= W; w++) {
            if (w - wt[i - 1] < 0) {
                // 当前背包容量装不下，只能选择不装入背包
                dp[i][w] = dp[i - 1][w];
            } else {
                // 装入或者不装入背包，择优
                dp[i][w] = Math.max(dp[i - 1][w - wt[i - 1]] + val[i - 1],
                    dp[i - 1][w]);
            }
        }
    }

    return dp[N][W];
}

const W = 4;
const N = 3;
const wt = [2, 1, 3];
const val = [4, 2, 3];

console.log(knapsack(W, N, wt, val))