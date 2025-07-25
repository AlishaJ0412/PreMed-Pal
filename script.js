async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  input.value = "";

  const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-small', {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_HUGGINGFACE_API_TOKEN",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: message })
  });

  const data = await response.json();
  const reply = data[0]?.generated_text || "Sorry, I'm not sure how to answer that.";
  chatBox.innerHTML += `<p><strong>PreMed Pal:</strong> ${reply}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}