// src/utils/fetchCombinedAST.js
export async function fetchCombinedAST(rules) {
    const response = await fetch('/combine-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rules }),
    });
    const ast = await response.json();
    return ast;
  }
  