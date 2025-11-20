import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard.jsx";
import { UploadForm } from "./components/UploadForm.jsx";
import { Results } from "./components/Results.jsx";

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">SmartCargo-AIPA</h1>
      {!results && <UploadForm setResults={setResults} />}
      {results && <Results data={results} />}
      <Dashboard />
    </div>
  );
}

export default App;
