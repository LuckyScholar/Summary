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
    if (!root) {
        return [];
    }
    
    const queue = [root];
    const res = [];

    while(queue.length) {
        let temp = [];
        const useUnShift = res.length % 2 !== 0;
        for (let i = queue.length; i > 0; i--) {
            const node = queue.shift();

            if (useUnShift) {
                temp.unshift(node.val);
            } else {
                temp.push(node.val);
            }

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
        res.push(temp);
    }

    return res;
};