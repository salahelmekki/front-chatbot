document.getElementById('send-btn').addEventListener('click', sendMessage);

async function sendMessage() {
  const userMessage = document.getElementById('user-input').value;
  displayMessage(userMessage, 'user');
  document.getElementById('user-input').value = '';  // Clear input field

  // Send user message to the backend
  const response = await fetch('http://localhost:8000/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] }),
  });

  const responseData = await response.json();
  const assistantReply = responseData.assistant_reply;
  displayMessage(assistantReply, 'bot');
}

function displayMessage(message, sender) {
  const chatDisplay = document.getElementById('chat-display');
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.innerText = message;
  chatDisplay.appendChild(messageElement);
}
