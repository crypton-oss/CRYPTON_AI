const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('chat-window');
const status = document.getElementById('generating-status');
const newChatBtn = document.getElementById('new-chat-btn');

// 1. HTML teglarni xavfsiz qilish
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 2. AI javobini formatlash
function formatAIResponse(text) {
    const codeRegex = /```(\w+)?([\s\S]*?)```/g;
    
    if (!text.includes('```')) {
        return `<div class="text-block">${text.replace(/\n/g, '<br>')}</div>`;
    }

    return text.replace(codeRegex, (match, language, code) => {
        const uniqueId = 'code-' + Math.random().toString(36).substr(2, 9);
        return `
            <div class="code-container" style="margin: 15px 0; border: 1px solid #30363d; border-radius: 8px; overflow: hidden;">
                <div class="code-header" style="display: flex; justify-content: space-between; background: #161b22; color: #8b949e; padding: 8px 15px; font-size: 12px; border-bottom: 1px solid #30363d;">
                    <span>${language || 'SCRIPT'}</span>
                    <button class="copy-btn" onclick="copyToClipboard('${uniqueId}')" style="cursor: pointer; background: #238636; border: none; color: white; border-radius: 4px; padding: 2px 10px; font-size: 11px;">Nusxa olish</button>
                </div>
                <pre id="${uniqueId}" style="margin: 0; background: #0d1117; color: #7ee787; padding: 15px; overflow-x: auto; font-family: monospace; font-size: 14px;"><code>${escapeHtml(code.trim())}</code></pre>
            </div>
        `;
    });
}

// 3. Nusxa olish funksiyasi
window.copyToClipboard = function(elementId) {
    const codeText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
        const originalText = btn.innerText;
        btn.innerText = "Nusxalandi!";
        btn.style.background = "#1f6feb";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "#238636";
        }, 2000);
    }).catch(err => {
        console.error('Nusxa olishda xatolik:', err);
    });
};

// 4. Xabarni ekranga chiqarish va xotiraga saqlash
function appendMessage(role, text, save = true) {
    const div = document.createElement('div');
    div.className = `message ${role === 'user' ? 'user-msg' : 'ai-msg'}`;
    
    if (role === 'ai') {
        div.innerHTML = `<strong style="color: #ff3e3e;">CRYPTON AI:</strong><br>${formatAIResponse(text)}`;
    } else {
        div.innerHTML = `<strong style="color: #00d4ff;">SIZ:</strong><br>${text}`;
    }
    
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    if (save) {
        saveChatHistory(role, text);
    }
}

// 5. Chat tarixini saqlash
function saveChatHistory(role, text) {
    let history = JSON.parse(localStorage.getItem('crypton_chat_history')) || [];
    history.push({ role, text });
    localStorage.setItem('crypton_chat_history', JSON.stringify(history));
}

// 6. Tarixni yuklash
function loadChatHistory() {
    let history = JSON.parse(localStorage.getItem('crypton_chat_history')) || [];
    history.forEach(item => {
        appendMessage(item.role, item.text, false);
    });
}

// 7. New Chat (Tozalash)
if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
        if (confirm("Haqiqatdan ham barcha yozishmalarni o'chirmoqchimisiz?")) {
            localStorage.removeItem('crypton_chat_history');
            chatWindow.innerHTML = '';
            appendMessage('ai', 'Tizim tozalandi. Buyruq kutilmoqda...', false);
        }
    });
}

// 8. Savol yuborish mantiqi
async function sendMessage() {
    const query = input.value.trim();
    if (!query) return;

    appendMessage('user', query);
    input.value = '';
    
    status.classList.remove('hidden');
    sendBtn.disabled = true;

    try {
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });
        
        const data = await response.json();
        status.classList.add('hidden');
        appendMessage('ai', data.response);
    } catch (error) {
        status.innerHTML = "<span style='color: red;'>ALOQA XATOLIGI!</span>";
        console.error(error);
    } finally {
        sendBtn.disabled = false;
    }
}

// Eventlar va Dastlabki yuklash
sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Sahifa yuklanganda tarixni tiklash
window.onload = loadChatHistory;