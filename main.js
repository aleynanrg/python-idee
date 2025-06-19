let pyodideReadyPromise;
window.addEventListener('load', () => {
  pyodideReadyPromise = loadPyodide();
});

async function runCode() {
  const output = document.getElementById("output");
  output.textContent = "Çalıştırılıyor...\n";

  const pyodide = await pyodideReadyPromise;

  pyodide.setStdout({ batched: (data) => output.textContent += data });
  pyodide.setStderr({ batched: (data) => output.textContent += "\nHata: " + data });

  output.textContent = "";

  try {
    let code = document.getElementById("code").value;
    await pyodide.runPythonAsync(code);
  } catch (error) {
    output.textContent += "\nHata:\n" + error;
  }
}
