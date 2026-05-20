const socket = io();

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

// online users
socket.on("users", (count) => {
  document.getElementById("userCount").innerText = count;
});

// enter key
document.getElementById("msg").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendText();
});