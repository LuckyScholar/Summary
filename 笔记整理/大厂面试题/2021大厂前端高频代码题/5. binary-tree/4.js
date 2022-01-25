/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function exposedElement(root) {
    const queue = [root];
    const res = [];

    while (queue.length) {
        // const temp = [];
        let lastVal = null;

        for (let i = queue.length - 1; i >= 0; i--) {
            const node = queue.shift();

            // temp.push(node.val);
            lastVal = node.val;

            if (node.left) {
                queue.unshift(node.left);
            }

            if (node.right) {
                queue.unshift(node.right);
            }
        }

        if (lastVal) {
            res.push(lastVal);
        }
    }

    return res;
};