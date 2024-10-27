// utils/combine_rules.js
import Node from '../models/Node';
import create_rule from './create_rule';

function combine_rules(rules) {
  const astNodes = rules.map(ruleString => create_rule(ruleString));
  let root = null;

  for (const node of astNodes) {
    if (!root) {
      root = node;
    } else {
      root = new Node('Operation', 'AND', root, node);
    }
  }

  return root;
}

export default combine_rules;
