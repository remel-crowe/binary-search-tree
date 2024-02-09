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
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const rootNode = Node(array[mid]);
    rootNode.left = buildTree(array, start, mid - 1);
    rootNode.right = buildTree(array, mid + 1, end);
    return (root = rootNode);
  }

  function insert(value) {
    const newNode = Node(value);
    if (!root) {
      root = newNode;
      return;
    }
    let currentNode = root;
    while (currentNode) {
      if (value > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      } else {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      }
    }
  }

  function deleteNode(root, value) {
    if (!root) return root;

    // Step 1: Find the node with the given value
    if (value < root.data) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = deleteNode(root.right, value);
    } else {
      // Case 1: Node is a leaf node or has only one child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      // Case 2: Node has two children
      root.data = minValue(root.right);
      root.right = deleteNode(root.right, root.data);
    }

    return root;
  }

  function minValue(node) {
    let minValue = node.data;
    while (node.left) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  }

  function isBalanced(node) {
    if (!node) return true;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      isBalanced(node.left) &&
      isBalanced(node.right)
    );
  }

  function rebalance(root, visited = []) {
    if (!root) return root;
    root.left = rebalance(root.left, visited);
    visited.push(root.data);
    root.right = rebalance(root.right, visited);

    if (root === root) {
      // Check if the root node has changed
      return buildTree(sortAndRemove(visited), 0, visited.length - 1);
    } else {
      return root;
    }
  }

  function find(value) {
    let currentNode = root;
    while (currentNode) {
      if (value === currentNode.data) {
        return currentNode;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null; // Value not found
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

  function height(node) {
    if (!node) return 0; // Base case: height of null node is 0
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    return Math.max(leftHeight, rightHeight) + 1; // Height of the node is the maximum height of its subtrees + 1
  }

  function depth(value) {
    let targetNode = find(value);
    if (!targetNode) {
      return `${value} is not a node in this tree`;
    }

    let currentNode = root;
    let count = 0;
    while (currentNode.data !== targetNode.data) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      count++;
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
    deleteNode,
    find,
    levelOrder,
    inOrder,
    postOrder,
    preOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

// Simple callback to test levelorder functionality
function print(msg) {
  console.log(msg);
}

let tree = Tree();
let numArray = tree.sortAndRemove([4, 4, 5, 12, 64, 76, 29, 81, 32, 28, 19]);
let root = tree.buildTree(numArray, 0, numArray.length - 1);
tree.prettyPrint(root);
