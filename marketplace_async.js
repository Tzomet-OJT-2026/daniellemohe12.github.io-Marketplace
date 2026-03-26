const fileInput = document.getElementById("fileinput");
const message = document.getElementById("message");
const content = document.getElementById("content");
const products = document.getElementById("products");

fileInput.addEventListener("change", handleFileSelection);

async function handleFileSelection(event) {
  const file = event.target.files[0];
  message.textContent = "";
  content.textContent = "";
  products.textContent = "";
  
  if (!file) {
    showMessage("No file selected please choose a file", "error");
    return;
  }

  try{
    const text = await readFileAsText(file);
    const items = Object.values(JSON.parse(text))[0];
    for(const product of items){
        const item = document.createElement("pre");
        let item_text = '';
        Object.entries(product).forEach(([key,value])=> {
            item_text += `${key} : ${value}\n`;
        });
        item.textContent = item_text;
        content.appendChild(item);
    }
    products.textContent = "products:";

  }catch(error){
    showMessage("error reading the file please try again!", "error")
  }
};

const readFileAsText = (file) => new Promise ((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
        resolve(reader.result);
    };
    reader.onerror = () => {
        reject(reader.error);
    };
    reader.readAsText(file);
});

function showMessage(text, type) {
  message.textContent = text;
  message.style.color = type === "error" ? "red" : "green";
}