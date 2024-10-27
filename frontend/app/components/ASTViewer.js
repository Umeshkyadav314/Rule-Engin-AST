// components/ASTViewer.js
import React, { useEffect, useState } from 'react';
import { fetchAST } from '../utils/fetchAST';

function ASTViewer({ rule }) {
  const [ast, setAST] = useState(null);

  useEffect(() => {
    fetchAST(rule).then(setAST).catch(console.error);
  }, [rule]);

  return (
    <div>
      <h2>AST for Rule: {rule}</h2>
      <pre>{ast ? JSON.stringify(ast, null, 2) : "Loading..."}</pre>
    </div>
  );
}

export default ASTViewer;
