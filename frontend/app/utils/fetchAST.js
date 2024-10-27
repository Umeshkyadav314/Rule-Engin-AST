// utils/fetchAST.js
export async function fetchAST(rule) {
    const response = await fetch(`/create-rule?rule=${encodeURIComponent(rule)}`);
    const ast = await response.json();
    return ast;
  }
  