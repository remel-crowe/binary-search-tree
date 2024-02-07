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

  function iBalanced() {}

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
    return "Node Not Found";
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
  };
}

// Simple callback to test levelorder functionality
function print(msg) {
  console.log(msg);
}

let bst = Tree();
let numArray = bst.sortAndRemove([4, 4, 5, 12, 64, 76, 29, 81, 32, 28, 19]);
let tree = bst.buildTree(numArray, 0, numArray.length - 1);
bst.prettyPrint(tree);
