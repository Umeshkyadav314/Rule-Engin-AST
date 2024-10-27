import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [inputString, setInputString] = useState('');
  const [ast, setAst] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/rules', {
              inputString,
              ast,
          });
          setResponseMessage(`Rule created: ${JSON.stringify(response.data)}`);
      } catch (error) {
          setResponseMessage(`Error: ${error.response.data.error}`);
      }
      setInputString('')
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit} className="p-4 border rounded ">
      <h2 className="text-xl font-semibold mb-2">Add New Rule</h2>
      <input
        type="text"
        placeholder="Enter user input e.g: age > 18 AND income > 50000"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        className="border rounded p-2 mb-2 w-full"
        required
      />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create Rule
      </button>
      </form>
      
    </div>
  );
}
