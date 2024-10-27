// utils/create_rule.js
import Node from "../models/Node.js";

function create_rule(ruleString) {
  const tokens = ruleString.split(' ');
  const root = new Node('Operation', tokens[1]);
  root.left = new Node('Condition', tokens[0]);
  root.right = new Node('Condition', tokens[2]);
  return root;
}

export default create_rule;
