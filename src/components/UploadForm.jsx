import React, { useState } from "react";
import axios from "axios";

export const UploadForm = ({ setResults }) => {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    boxes: "",
    weight: "",
    dimensions: "",
    destination: "",
    temperature: "",
    dg: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      files.forEach(file => formData.append("photos", file));
      formData.append("data", JSON.stringify(data));

      const uploadRes = await axios.post("/upload", formData);
      const analyzeRes = await axios.post("/analyze", { ...data, photos: uploadRes.data.urls });

      setResults(analyzeRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="number" placeholder="Boxes" value={data.boxes} onChange={e => setData({...data, boxes: e.target.value})} required />
      <input type="text" placeholder="Dimensions LxWxH" value={data.dimensions} onChange={e => setData({...data, dimensions: e.target.value})} required />
      <input type="number" placeholder="Weight" value={data.weight} onChange={e => setData({...data, weight: e.target.value})} required />
      <input type="text" placeholder="Destination" value={data.destination} onChange={e => setData({...data, destination: e.target.value})} required />
      <input type="text" placeholder="Temperature" value={data.temperature} onChange={e => setData({...data, temperature: e.target.value})} />
      <label>
        DG?
        <input type="checkbox" checked={data.dg} onChange={e => setData({...data, dg: e.target.checked})} />
      </label>
      <input type="file" multiple onChange={e => setFiles([...e.target.files])} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};
