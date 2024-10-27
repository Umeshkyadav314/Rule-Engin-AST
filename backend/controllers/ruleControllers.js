// controllers/ruleControllers.js

// Function to create an Abstract Syntax Tree (AST) from a rule string
export const create_rule = (ruleString) => {
  if (!ruleString) {
    throw new Error("Rule string is empty");
  }
  
  // A simple tokenizer and parser for the rules
  const tokens = tokenize(ruleString);
  const ast = parse(tokens);
  return ast;
};

// Tokenize the rule string into meaningful components (tokens)
const tokenize = (ruleString) => {
  // For simplicity, we'll split by spaces and parentheses
  const regex = /\s+|\(|\)/;
  return ruleString.split(regex).filter(token => token.length > 0);
};

// Parse tokens into a basic AST
const parse = (tokens) => {
  let index = 0;

  const parseExpression = () => {
    if (index >= tokens.length) {
      return null;
    }

    const token = tokens[index++];
    
    if (token === "(") {
      const node = { type: "group", children: [] };
      while (tokens[index] !== ")") {
        const child = parseExpression();
        if (child) node.children.push(child);
      }
      index++; // Skip the closing parenthesis
      return node;
    } else {
      return { type: "literal", value: token }; // Create a leaf node
    }
  };

  const ast = { type: "expression", body: [] };
  while (index < tokens.length) {
    const expr = parseExpression();
    if (expr) ast.body.push(expr);
  }
  
  return ast;
};

// Function to combine multiple ASTs
export const combine_rules = (asts) => {
  if (!Array.isArray(asts) || asts.length === 0) {
    throw new Error("No ASTs provided for combination");
  }
  
  // Combine ASTs into a single AST
  const combinedAST = {
    type: "combined",
    children: asts,
  };
  
  return combinedAST;
};
