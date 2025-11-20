const form = document.getElementById("cargoForm");
const results = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const files = formData.getAll("files");
  const filesArray = [];
  for (let file of files) {
    const reader = new FileReader();
    await new Promise(resolve => {
      reader.onload = () => {
        filesArray.push({ name: file.name, data: reader.result });
        resolve();
      };
      reader.readAsDataURL(file);
    });
  }

  const payload = {
    client: formData.get("client"),
    destination: formData.get("destination"),
    boxes: formData.get("boxes"),
    weight: formData.get("weight"),
    files: filesArray
  };

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  results.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
});
