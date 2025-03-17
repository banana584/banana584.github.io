const title = document.getElementById("title");
const button = document.getElementById("button");

function change_text() {
  title.innerHTML = "Button clicked!";
}

button.addEventListener("click", change_text);
