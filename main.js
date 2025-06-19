
let pyodideReadyPromise = loadPyodide();
let editor;

window.onload = () => {
  editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python",
    theme: "default",
    lineNumbers: true,
    indentUnit: 4,
    viewportMargin: Infinity
  });
};

async function runCode() {
  const output = document.getElementById("output");
  const inputVal = document.getElementById("inputBox").value;
  output.textContent = "⏳ Kod çalıştırılıyor...";
  let pyodide = await pyodideReadyPromise;

  let code = editor.getValue().replace("input(\"Adınızı girin:\")", `"${inputVal}"`);

  try {
    let result = await pyodide.runPythonAsync(code);
    output.textContent = result ?? "(Çıktı yok)";
  } catch (err) {
    output.textContent = "🚫 Hata:\n" + err;
  }
}

function clearOutput() {
  document.getElementById("output").textContent = "";
}
