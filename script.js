function base64ToImage() {
  const input = base64Input.value.trim();
  imageResult.innerHTML = input ? `<img src="${input.startsWith('data') ? input : 'data:image/png;base64,' + input}">` : '';
}

function imageToBase64() {
  const file = imageInput.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => base64Output.value = r.result;
  r.readAsDataURL(file);
}

function convertImage() {
  const file = imgConvert.files[0];
  if (!file) return;
  const img = new Image();
  const r = new FileReader();
  r.onload = () => {
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width;
      c.height = img.height;
      c.getContext("2d").drawImage(img, 0, 0);
      const url = c.toDataURL(format.value);
      downloadImg.href = url;
      downloadImg.download = "convertito";
      downloadImg.textContent = "Scarica immagine";
    };
    img.src = r.result;
  };
  r.readAsDataURL(file);
}

function resizeImage() {
  const file = resizeInput.files[0];
  if (!file) return;
  const img = new Image();
  const r = new FileReader();
  r.onload = () => {
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = width.value || img.width;
      c.height = height.value || img.height;
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      const url = c.toDataURL("image/png");
      resizeDownload.href = url;
      resizeDownload.download = "resize.png";
      resizeDownload.textContent = "Scarica immagine";
    };
    img.src = r.result;
  };
  r.readAsDataURL(file);
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

function jsonToBase64() {
  try {
    jsonOutput.value = btoa(JSON.stringify(JSON.parse(jsonInput.value)));
  } catch {
    jsonOutput.value = "JSON non valido";
  }
}

function base64ToJson() {
  try {
    jsonOutput.value = JSON.stringify(JSON.parse(atob(jsonInput.value)), null, 2);
  } catch {
    jsonOutput.value = "Base64 / JSON non valido";
  }
}
