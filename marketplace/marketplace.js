const fileInput = document.getElementById("fileinput");
const message = document.getElementById("message");
const content = document.getElementById("content");

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection(event) {
  const file = event.target.files[0];
  message.textContent = "";
  content.textContent = "";
  
  if (!file) {
    showMessage("No file selected please choose a file", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const items = Object.values(JSON.parse(reader.result))[0];
    for(const product of items){
        const item = document.createElement("pre");
        let item_text = '';
        Object.entries(product).forEach(([key,value])=> {
            item_text += `${key} : ${value}\n`;
        });
        item.textContent = item_text;
        content.appendChild(item);
    }
    
  };
  reader.onerror = () => {
    showMessage("Error reading the file Please try again!", "error");
  };
  reader.readAsText(file);

  
}

function showMessage(text, type) {
  message.textContent = text;
  message.style.color = type === "error" ? "red" : "green";
}