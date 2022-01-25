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
var levelOrder = function (root) {
    if (!root) {
        return []
    }

    const queue = [root]
    const res = []
    while (queue.length) {
        const node = queue.shift()
        res.push(node.val)
        if (node.left) {
            queue.push(node.left)
        }

        if (node.right) {
            queue.push(node.right)
        }
    }

    return res
}
