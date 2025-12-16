/* ===== NAVIGAZIONE ===== */
function openTool(id) {
  document.querySelectorAll("main section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* ===== STATISTICHE ===== */
let stats = JSON.parse(localStorage.getItem("stats")) || {
  files: 0,
  mb: 0,
  conv: 0
};

function updateStatsUI() {
  filesCount.textContent = stats.files;
  mbCount.textContent = stats.mb.toFixed(2);
  convCount.textContent = stats.conv;
}

function addStats(size) {
  stats.files++;
  stats.mb += size / (1024 * 1024);
  stats.conv++;
  localStorage.setItem("stats", JSON.stringify(stats));
  updateStatsUI();
}

updateStatsUI();

/* ===== DRAG & DROP ===== */
dropZone.onclick = () => imgInput.click();
dropZone.ondragover = e => e.preventDefault();
dropZone.ondrop = e => {
  e.preventDefault();
  imgInput.files = e.dataTransfer.files;
};

/* ===== CONVERTI IMMAGINI ===== */
function convertImage() {
  const f = imgInput.files[0];
  if (!f) return;

  loading.classList.remove("hidden");
  imgResult.innerHTML = "";

  const r = new FileReader();
  const img = new Image();

  r.onload = () => {
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      c.getContext("2d").drawImage(img, 0, 0);

      const url = c.toDataURL(imgFormat.value, quality.value);

      loading.classList.add("hidden");
      imgResult.innerHTML = `
        <img src="${url}">
        <a href="${url}" download="convertito">⬇ Scarica immagine</a>
      `;

      addStats(f.size);
    };
    img.src = r.result;
  };
  r.readAsDataURL(f);
}

/* ===== BASE64 ===== */
function base64ToImage() {
  if (!b64input.value) return;
  b64preview.innerHTML = `<img src="${b64input.value}">`;
}

function imageToBase64() {
  const f = imgFile.files[0];
  if (!f) return;

  const r = new FileReader();
  r.onload = () => {
    b64output.value = r.result;
    addStats(f.size);
  };
  r.readAsDataURL(f);
}

/* ===== TESTO ===== */
function textToBase64() {
  textOutput.value = btoa(unescape(encodeURIComponent(textInput.value)));
  addStats(textInput.value.length);
}

function base64ToText() {
  try {
    textOutput.value = decodeURIComponent(escape(atob(textInput.value)));
    addStats(textInput.value.length);
  } catch {
    textOutput.value = "Base64 non valido";
  }
}
