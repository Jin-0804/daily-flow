
        const agentMessagesEl = document.getElementById('agentMessages');
        const agentInputEl = document.getElementById('agentInput');
        const agentTypingEl = document.getElementById('agentTypingIndicator');

        const agentMockReplies = [
            "Got it! I've scheduled that for your peak window. Anything else you want to tweak?",
            "Great question! Here's a quick breakdown: entropy measures disorder — higher microstates = higher entropy. Want a worked example with ΔS = Q/T?",
            "Based on your schedule, I'd recommend a 25-min focus sprint + 5-min recharge. Should I add it to Today?",
            "Your 4 focus blocks today look solid. Thermodynamics (Peak 92%), Discrete Math (98% match), plus 2 recharge windows. Need a summary card?",
            "Nice! I can create a checklist for that. Say 'add task' and I'll put it on your calendar."
        ];

        function scrollAgentToBottom() {
            if (!agentMessagesEl) return;
            agentMessagesEl.scrollTop = agentMessagesEl.scrollHeight;
        }

        function getAgentTime() {
            const now = new Date();
            let h = now.getHours();
            const m = String(now.getMinutes()).padStart(2, '0');
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            return `${String(h).padStart(2,'0')}:${m} ${ampm}`;
        }

        function appendAgentMessage(text, sender) {
            if (!agentMessagesEl || !agentTypingEl) return;
            const isUser = sender === 'user';
            const time = getAgentTime();
            const bubble = document.createElement('div');
            bubble.className = isUser ? 'flex items-start justify-end space-x-2 animate-[fadeIn_0.2s_ease-out]' : 'flex items-start space-x-2 animate-[fadeIn_0.2s_ease-out]';
            if (isUser) {
                bubble.innerHTML = `
                    <div class="flex flex-col items-end space-y-1 max-w-[78%]">
                        <div class="bg-[#2563EB] rounded-[18px] rounded-tr-[6px] px-3.5 py-2.5 shadow-sm">
                            <p class="text-[12.5px] font-medium text-white leading-[1.45] break-words">${escapeHtml(text)}</p>
                        </div>
                        <span class="text-[10px] text-neutral-400 font-medium px-1">${time} ✓✓</span>
                    </div>
                    <img src="https://lh3.googleusercontent.com/aida/AEtjO1UBtuXoUCcwRvLaLnbDAsaFGlfDasMTafLIU5krd7lZ1LqDHnAvYKNg9LGT1MpxOEETnDX44NtCS9VnutFKO6-b8CEN5Y3hmfpD6CVyO-xReXmpKbbNEcFHTfAgOnzewNbzHFh8G5qqgRr72MRdYASjNQoxPG2EQSA2XNBoIcu9ZJIjyRzX4fdMjvE" alt="You" class="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 shadow-sm"/>
                `;
            } else {
                bubble.innerHTML = `
                    <div class="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm overflow-hidden">
                        <img src="images/agent-penguin.png" alt="Agent" class="w-6 h-6 object-contain"/>
                    </div>
                    <div class="flex flex-col space-y-1 max-w-[78%]">
                        <div class="bg-white rounded-[18px] rounded-tl-[6px] px-3.5 py-2.5 shadow-sm border border-black/[0.04]">
                            <p class="text-[12.5px] font-medium text-[#1C1C1E] leading-[1.45] break-words">${escapeHtml(text)}</p>
                        </div>
                        <span class="text-[10px] text-neutral-400 font-medium px-1">${time}</span>
                    </div>
                `;
            }
            agentMessagesEl.insertBefore(bubble, agentTypingEl);
            scrollAgentToBottom();
        }

        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        function showAgentTyping(show) {
            if (!agentTypingEl) return;
            if (show) {
                agentTypingEl.classList.remove('hidden');
                agentTypingEl.classList.add('flex');
                scrollAgentToBottom();
            } else {
                agentTypingEl.classList.add('hidden');
                agentTypingEl.classList.remove('flex');
            }
        }

        function getAgentReplyFor(input) {
            const lower = input.toLowerCase();
            if (lower.includes('entropy') || lower.includes('enthalpy') || lower.includes('thermo')) {
                return "Entropy (S) = disorder: ΔS = Q_rev/T. For your midterm, focus on: 1) 2nd law (ΔS_universe >0), 2) microstates, 3) enthalpy Hess's law. Want a 5-min quiz?";
            }
            if (lower.includes('task') || lower.includes('calendar') || lower.includes('add')) {
                return "I can add that! Tell me title + time (e.g., 'Deep Review 2pm') and I'll slot it into your peak window.";
            }
            if (lower.includes('focus') || lower.includes('plan') || lower.includes('sprint')) {
                return "Optimal now: 25m focus → 5m recharge → 25m focus. Your peak until 12:30 PM is perfect for proofs & graphs. Start timer?";
            }
            if (lower.includes('recharge') || lower.includes('tired') || lower.includes('rest')) {
                return "Circadian dip at 1:30 PM — try: 10-min walk in quad garden + hydration. I’ve marked a 15-min Recovery block for you. 🌿";
            }
            if (lower.includes('summarize') || lower.includes('today')) {
                return "Today: 4 blocks — Math Lecture 10 AM, Recovery 11:30 AM, Discrete Math 2 PM (98% match), Badminton 5 PM. 78% active. Need export?";
            }
            return agentMockReplies[Math.floor(Math.random() * agentMockReplies.length)];
        }

        function sendAgentMessage() {
            if (!agentInputEl) return;
            const text = agentInputEl.value.trim();
            if (!text) return;
            appendAgentMessage(text, 'user');
            agentInputEl.value = '';
            showAgentTyping(true);
            const reply = getAgentReplyFor(text);
            setTimeout(() => {
                showAgentTyping(false);
                appendAgentMessage(reply, 'agent');
            }, 700 + Math.random() * 600);
        }

        function handleAgentInputKey(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendAgentMessage();
            }
        }

        function fillAgentInput(text) {
            if (!agentInputEl) return;
            agentInputEl.value = text;
            agentInputEl.focus();
        }

        function agentQuickAction(action) {
            if (action === 'Add to calendar') {
                showAppToast('✓ 3 focus blocks added to calendar');
                appendAgentMessage('Added 3 focus sprints to your calendar for 11 AM–12:30 PM. Good luck!', 'agent');
            } else if (action === 'Explain entropy') {
                fillAgentInput('Explain entropy simply');
                sendAgentMessage();
            } else {
                appendAgentMessage(action, 'user');
                showAgentTyping(true);
                setTimeout(() => {
                    showAgentTyping(false);
                    appendAgentMessage(getAgentReplyFor(action), 'agent');
                }, 600);
            }
        }

        function clearAgentChat() {
            if (!agentMessagesEl || !agentTypingEl) return;
            // Keep date separator and typing indicator, remove message bubbles
            const toRemove = Array.from(agentMessagesEl.children).filter(el => el.id !== 'agentTypingIndicator' && !el.textContent.includes('Today · May 16'));
            // Keep first greeting? Clear all except typing and date separator for fresh start
            agentMessagesEl.querySelectorAll(':scope > div:not(#agentTypingIndicator)').forEach(el => {
                if (el.textContent.includes('Today · May 16')) return;
                el.remove();
            });
            appendAgentMessage("Chat cleared — I'm still here! What do you want to focus on next?", 'agent');
            showAppToast('Chat cleared');
        }

        // Auto-scroll on screen switch to agent
        document.addEventListener('DOMContentLoaded', () => {
            // Ensure agent scrolls to bottom when opened
            const observer = new MutationObserver(() => {
                const agentScreen = document.getElementById('screen-agent');
                if (agentScreen && agentScreen.classList.contains('screen-visible')) {
                    setTimeout(scrollAgentToBottom, 100);
                }
            });
            const agentScreen = document.getElementById('screen-agent');
            if (agentScreen) observer.observe(agentScreen, { attributes: true, attributeFilter: ['class'] });
        });
    