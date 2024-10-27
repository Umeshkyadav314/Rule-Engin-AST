// components/ASTViewer.js
import React, { useEffect, useState } from 'react';
import { fetchCombinedAST } from '../utils/fetchCombinedAST';

function astViewer({ rules }) {
  const [ast, setAST] = useState(null);

  useEffect(() => {
    fetchCombinedAST(rules).then(setAST).catch(console.error);
  }, [rules]);

  return (
    <div>
      <h2>Combined AST for Rules</h2>
      <pre>{ast ? JSON.stringify(ast, null, 2) : "Loading..."}</pre>
    </div>
  );
}

export default astViewer;
