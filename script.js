const q = document.getElementById("quality");
if (q) q.oninput = () => document.getElementById("qval").innerText = q.value;

function base64ToImage() {
  const val = b64input.value.trim();
  imgPreview.innerHTML = val ? `<img src="${val.startsWith("data") ? val : "data:image/png;base64,"+val}">` : "";
}

function imageToBase64() {
  const f = imgFile.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => b64output.value = r.result;
  r.readAsDataURL(f);
}

function convertImage() {
  const f = imgConvert.files[0];
  if (!f) return;
  const r = new FileReader();
  const img = new Image();

  r.onload = () => {
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      c.getContext("2d").drawImage(img,0,0);
      const url = c.toDataURL(imgFormat.value, q.value);
      downloadImg.href = url;
      downloadImg.download = "convertito";
      downloadImg.textContent = "Scarica immagine";
    };
    img.src = r.result;
  };
  r.readAsDataURL(f);
}

function textToBase64() {
  textOutput.value = btoa(unescape(encodeURIComponent(textInput.value)));
}

function base64ToText() {
  try {
    textOutput.value = decodeURIComponent(escape(atob(textInput.value)));
  } catch {
    textOutput.value = "Base64 non valido";
  }
}

function urlEncode() {
  textOutput.value = encodeURIComponent(textInput.value);
}

function urlDecode() {
  textOutput.value = decodeURIComponent(textInput.value);
}

async function generateHash() {
  const data = new TextEncoder().encode(hashInput.value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  hashOutput.value = Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

textInput?.addEventListener("input", () => {
  charCount.innerText = "Caratteri: " + textInput.value.length;
});
