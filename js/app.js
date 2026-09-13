
        // Screen management
        const screens = {
            today: document.getElementById('screen-today'),
            agent: document.getElementById('screen-agent'),
            calendar: document.getElementById('screen-calendar'),
            profile: document.getElementById('screen-profile')
        };
        
        let currentScreen = 'today';

        // SVG icon definition helper for the dark pill dock
        function getDockSvg(iconType) {
            switch(iconType) {
                case 'home':
                    return `<svg class="w-[18px] h-[18px] stroke-current stroke-[2.1]" fill="none" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20V9.5z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 21V12h6v9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                case 'clock':
                    return `<svg class="w-[18px] h-[18px] stroke-current stroke-[2.1]" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" stroke-linecap="round"/><polyline points="12 6.5 12 12 15.5 14" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                case 'agent':
                    return `<img src="images/agent-penguin.png" alt="Agent" class="w-[22px] h-[22px] object-contain"/>`;
                case 'calendar':
                    return `<svg class="w-[17px] h-[17px] stroke-current stroke-[2.1]" fill="none" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke-linecap="round"/><line x1="16" y1="2" x2="16" y2="6.5" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="6.5" stroke-linecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke-linecap="round"/></svg>`;
                case 'profile':
                    return `<svg class="w-[18px] h-[18px] stroke-current stroke-[2.1]" fill="none" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" stroke-linecap="round"/></svg>`;
                default:
                    return '';
            }
        }

        // Render the exact dark pill dock with center '+' button (icon-only, equal spacing)
        function renderBottomDock() {
            const dockContainer = document.getElementById('navDockContainer');
            if (!dockContainer) return;

            const tabs = [
                { id: 'today',    icon: 'home'     },
                { id: 'agent',    icon: 'agent'    },
                { id: '_plus',    icon: 'plus'     },   // center action
                { id: 'calendar', icon: 'calendar' },
                { id: 'profile',  icon: 'profile'  }
            ];

            const items = tabs.map(tab => {
                if (tab.id === '_plus') {
                    return `
                        <button onclick="openAddEventModal()" class="w-10 h-10 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.38)] border-2 border-white/10 active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer group shrink-0" title="Add Task">
                            <svg class="w-5 h-5 stroke-[2.8] transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    `;
                }
                const isActive = currentScreen === tab.id;
                if (isActive) {
                    return `
                        <button onclick="switchScreen('${tab.id}')" class="bg-white text-[#111111] w-10 h-10 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer shrink-0">
                            ${getDockSvg(tab.icon)}
                        </button>
                    `;
                } else {
                    return `
                        <button onclick="switchScreen('${tab.id}')" class="text-[#8E8E93] hover:text-white w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer shrink-0">
                            ${getDockSvg(tab.icon)}
                        </button>
                    `;
                }
            }).join('');

            dockContainer.innerHTML = items;
        }
        
        function switchScreen(screenName) {
            // Hide all screens
            Object.keys(screens).forEach(key => {
                if (screens[key]) {
                    screens[key].classList.remove('screen-visible');
                    screens[key].classList.add('screen-hidden');
                }
            });
            
            // Show target screen
            if (screens[screenName]) {
                screens[screenName].classList.remove('screen-hidden');
                screens[screenName].classList.add('screen-visible');
                currentScreen = screenName;
            }
            
            // Re-render bottom dock to highlight active tab
            renderBottomDock();
            // Keep placement bar visible only on calendar when in placement mode
            try {
                if (typeof isPlacementMode !== 'undefined' && isPlacementMode) {
                    const bar = document.getElementById('placementBar');
                    if (screenName === 'calendar') {
                        if (bar) bar.classList.remove('hidden');
                        if (typeof renderCalWeek === 'function' && typeof calView !== 'undefined' && calView === 'week') {
                            renderCalWeek(calYear, calMonth, calDate);
                        }
                    } else {
                        if (bar) bar.classList.add('hidden');
                    }
                }
            } catch(e) {}
        }

        // Toggle task completion in Today screen
        function toggleTaskComplete(el) {
            const checkCircle = el.querySelector('.task-check-circle');
            const checkIcon = el.querySelector('.task-check-circle span');
            const title = el.querySelector('.task-title');
            
            if (!checkCircle || !title) return;
            
            const isCompleted = title.classList.contains('task-completed');
            if (isCompleted) {
                title.classList.remove('task-completed');
                checkCircle.classList.remove('bg-emerald-500', 'border-emerald-500');
                checkCircle.classList.add('border-neutral-300');
                if (checkIcon) checkIcon.classList.add('opacity-0');
                const reflectionBox = el.querySelector('.task-reflection-container');
                if (reflectionBox) reflectionBox.classList.add('hidden');
                showAppToast('Task marked as incomplete');
            } else {
                title.classList.add('task-completed');
                checkCircle.classList.add('bg-emerald-500', 'border-emerald-500');
                checkCircle.classList.remove('border-neutral-300');
                if (checkIcon) checkIcon.classList.remove('opacity-0');
                showAppToast('✓ Focus task completed!');
                
                // Prompt user to write reflection when event ends
                setTimeout(() => {
                    if (typeof openReflectionForElement === 'function') {
                        openReflectionForElement(el);
                    }
                }, 350);
            }
        }
        
        // Toast notification helper
        function showAppToast(message) {
            const toast = document.getElementById('appToast');
            const msgSpan = document.getElementById('appToastMessage');
            if (!toast || !msgSpan) return;
            
            msgSpan.textContent = message;
            toast.classList.remove('-translate-y-16', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
            
            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('-translate-y-16', 'opacity-0');
            }, 2600);
        }
    