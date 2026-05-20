const socket = io();

// send message
function sendText() {
  let input = document.getElementById("msg");
  let msg = input.value;

  if (msg.trim() === "") return;

  socket.emit("chat message", msg);
  input.value = "";
}

// receive msg
socket.on("chat message", (data) => {
  let li = document.createElement("li");
  li.innerText = data.user + ": " + data.message;
  document.getElementById("messages").appendChild(li);
});

// show users
socket.on("users", (users) => {
  document.getElementById("users").innerText = users.join(", ");
});

// full alert
socket.on("full", (msg) => {
  alert(msg);
});

// enter key
document.getElementById("msg").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendText();
});