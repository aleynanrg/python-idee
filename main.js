
let pyodideReadyPromise = loadPyodide();

async function runCode() {
  const output = document.getElementById("output");
  output.textContent = "Çalıştırılıyor...";
  let pyodide = await pyodideReadyPromise;
  try {
    let result = await pyodide.runPythonAsync(document.getElementById("code").value);
    output.textContent = result ?? "(Çıktı yok)";
  } catch (err) {
    output.textContent = "Hata:\n" + err;
  }
}
