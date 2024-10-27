// models/Node.js
export default class Node {
    constructor(type, value, left = null, right = null) {
      this.type = type;
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
  
