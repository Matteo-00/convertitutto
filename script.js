function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* ===== BASE64 ===== */
function base64ToImage() {
  const val = b64input.value.trim();
  if (!val) return;
  b64preview.innerHTML = `<img src="${val.startsWith("data") ? val : "data:image/png;base64," + val}">`;
}

function imageToBase64() {
  const file = imgFile.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => b64output.value = r.result;
  r.readAsDataURL(file);
}

/* ===== CONVERTI IMMAGINE ===== */
function convertImage() {
  const file = imgInput.files[0];
  if (!file) return;

  loading.classList.remove("hidden");
  imgResult.innerHTML = "";

  const reader = new FileReader();
  const img = new Image();

  reader.onload = () => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img,0,0);

      const url = canvas.toDataURL(imgFormat.value, quality.value);

      loading.classList.add("hidden");
      imgResult.innerHTML = `
        <img src="${url}">
        <a href="${url}" download="convertito">⬇ Scarica immagine</a>
      `;
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
