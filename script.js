document.addEventListener("DOMContentLoaded", () => {

  const b64input = document.getElementById("b64input");
  const b64output = document.getElementById("b64output");
  const imgPreview = document.getElementById("imgPreview");

  const imgFile = document.getElementById("imgFile");
  const dropZone = document.getElementById("dropZone");

  const textInput = document.getElementById("textInput");
  const textOutput = document.getElementById("textOutput");
  const charCount = document.getElementById("charCount");

  // Base64 → Immagine
  window.base64ToImage = function () {
    const val = b64input.value.trim();
    if (!val) return;
    imgPreview.innerHTML = `<img src="${val.startsWith("data") ? val : "data:image/png;base64," + val}">`;
  };

  // Immagine → Base64
  window.imageToBase64 = function () {
    const file = imgFile.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => b64output.value = reader.result;
    reader.readAsDataURL(file);
  };

  // Testo → Base64
  window.textToBase64 = function () {
    textOutput.value = btoa(unescape(encodeURIComponent(textInput.value)));
  };

  // Base64 → Testo
  window.base64ToText = function () {
    try {
      textOutput.value = decodeURIComponent(escape(atob(textInput.value)));
    } catch {
      textOutput.value = "Base64 non valido";
    }
  };

  // Conta caratteri
  textInput.addEventListener("input", () => {
    charCount.innerText = "Caratteri: " + textInput.value.length;
  });

  // Drag & Drop
  dropZone.onclick = () => imgFile.click();

  dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", e => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    imgFile.files = e.dataTransfer.files;
  });

});
