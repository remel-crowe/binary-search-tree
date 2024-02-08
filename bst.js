function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree() {
  let root;

  function sortAndRemove(array) {
    const uniqueArray = Array.from(new Set(array));

    if (uniqueArray.length <= 1) {
      return uniqueArray;
    } else {
      let pivot = uniqueArray[0];
      let left = [];
      let right = [];

      for (let i = 1; i < uniqueArray.length; i++) {
        if (uniqueArray[i] < pivot) {
          left.push(uniqueArray[i]);
        } else {
          right.push(uniqueArray[i]);
        }
      }

      return [...sortAndRemove(left), pivot, ...sortAndRemove(right)];
    }
  }

  function buildTree(array, start, end) {
    let mid = Math.floor((start + end) / 2);
    let rootNode = Node(array[mid]);
    if (start > end) return null;
    else {
      rootNode.left = buildTree(array, start, mid - 1);
      rootNode.right = buildTree(array, mid + 1, end);
      return (root = rootNode);
    }
  }

  function insert(value) {
    let currentNode = root;
    while (currentNode.left && currentNode.right) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    if (value > currentNode.data) {
      currentNode.right = Node(value);
    } else {
      currentNode.left = Node(value);
    }
  }

  function del(value) {}

  function isBalanced() {
    let leftHeight = height(root.left);
    let rightHeight = height(root.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      isBalanced(root.left) &&
      isBalanced(root.right)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function find(value) {
    let currentNode = root;
    while (currentNode) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        return currentNode;
      }
    }
    return null;
  }

  function levelOrder(callback = null) {
    if (!root) return;
    let queue = [];
    queue.push(root);

    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      if (callback) {
        callback(currentNode);
      }
    }
  }

  function inOrder(root, callback = null) {
    if (!root) return;
    inOrder(root.left);
    if (callback) {
      callback(root);
    } else {
      console.log(root.data);
    }
    inOrder(root.right);
  }

  function postOrder(root, callback = null) {
    if (!root) return;
    postOrder(root.left);
    postOrder(root.right);
    if (callback) {
      callback(root);
    } else {
      console.log(root.data);
    }
  }

  function preOrder(root, callback = null) {
    if (!root) return;
    if (callback) {
      callback(root);
    } else {
      console.log(root.data);
    }
    postOrder(root.left);
    postOrder(root.right);
  }

  function height(value, count = 0) {
    let node = find(value);
    if (!node) {
      return `${value} is not a node in this tree.`;
    }
    let leftHeight = node.left ? height(node.left.data, count + 1) : 0;
    let rightHeight = node.right ? height(node.right.data, count + 1) : 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(value) {
    let currentNode = root;
    let count = 0;
    let target = find(value);
    if (!target) return `${value} is not a node in this tree`;

    while (currentNode.data !== target.data) {
      if (target.data > currentNode.data) {
        currentNode = currentNode.right;
        count += 1;
      } else if (target.data < currentNode.data) {
        currentNode = currentNode.left;
        count += 1;
      }
    }
    return count;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    buildTree,
    sortAndRemove,
    prettyPrint,
    insert,
    find,
    levelOrder,
    inOrder,
    postOrder,
    preOrder,
    height,
    depth,
    isBalanced,
  };
}

// Simple callback to test levelorder functionality
function print(msg) {
  console.log(msg);
}

let tree = Tree();
let numArray = tree.sortAndRemove([4, 4, 5, 12, 64, 76, 29, 81, 32, 28, 19]);
let bTree = tree.buildTree(numArray, 0, numArray.length - 1);
tree.prettyPrint(bTree);

console.log(tree.height(4));
