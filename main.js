const analyzeBtn = document.getElementById("analyzeBtn");
const planSelect = document.getElementById("planSelect");
const fileInput = document.getElementById("fileInput");
const result = document.getElementById("result");

analyzeBtn.addEventListener("click", async () => {
  const plan = planSelect.value;

  // Aquí se podrían subir fotos
  const files = fileInput.files;
  if (files.length === 0) {
    result.textContent = "Por favor sube al menos una foto.";
    return;
  }

  const response = await fetch(`http://localhost:10000/analyze-${plan}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ files: Array.from(files).map(f => f.name) })
  });

  const data = await response.json();
  result.textContent = JSON.stringify(data, null, 2);
});
