
        (function() {
            function getTodayStr() {
                const n = new Date();
                return formatDateStr(n.getFullYear(), n.getMonth(), n.getDate());
            }

            // Live clock for status bars
            function updateLiveClocks() {
                const now = new Date();
                const hh = String(now.getHours()).padStart(2, '0');
                const mm = String(now.getMinutes()).padStart(2, '0');
                const t = hh + ':' + mm;
                const sb = document.getElementById('statusBarTime');
                if (sb) sb.textContent = t;
                const cb = document.getElementById('capacityModalTime');
                if (cb) cb.textContent = t;
            }

            // Populate Add Task date select with next 7 days from today
            function populateDateSelect() {
                const sel = document.getElementById('eventDateSelect');
                if (!sel || typeof formatDateStr !== 'function') return;
                const today = new Date();
                sel.innerHTML = '';
                for (let i = 0; i < 8; i++) {
                    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
                    const ds = formatDateStr(d.getFullYear(), d.getMonth(), d.getDate());
                    let label;
                    if (i === 0) label = 'Today (' + d.toLocaleString('default', { month: 'short', day: 'numeric' }) + ')';
                    else if (i === 1) label = 'Tomorrow (' + d.toLocaleString('default', { month: 'short', day: 'numeric' }) + ')';
                    else label = d.toLocaleString('default', { weekday: 'long' }) + ' (' + d.toLocaleString('default', { month: 'short', day: 'numeric' }) + ')';
                    const opt = document.createElement('option');
                    opt.value = ds;
                    opt.textContent = label;
                    sel.appendChild(opt);
                }
            }

            // Ensure today/tomorrow have demo events if empty (clone May 16/17 templates)
            function ensureTodayHasEvents() {
                const todayStr = getTodayStr();
                if (getCalEventsForDate(todayStr).length > 0) return;
                const templates = calEvents.filter(e => e.date === '2026-05-16');
                templates.forEach(t => {
                    const clone = Object.assign({}, t, { date: todayStr });
                    calEvents.push(clone);
                });
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowStr = formatDateStr(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
                if (getCalEventsForDate(tomorrowStr).length === 0) {
                    const tpl2 = calEvents.filter(e => e.date === '2026-05-17');
                    tpl2.forEach(t => {
                        calEvents.push(Object.assign({}, t, { date: tomorrowStr }));
                    });
                }
            }

            // Update Today header (subtitle + badge) to current date
            function updateTodayHeader() {
                const now = new Date();
                const todayStr = getTodayStr();
                const evs = getCalEventsForDate(todayStr);
                const badge = document.getElementById('todayTaskBadge');
                const subtitle = document.getElementById('todaySubtitle');
                if (badge) badge.textContent = evs.length + ' Tasks';
                if (subtitle) {
                    const weekday = now.toLocaleString('default', { weekday: 'long' });
                    const monthDay = now.toLocaleString('default', { month: 'long', day: 'numeric' });
                    subtitle.textContent = weekday + ', ' + monthDay + ' · ' + evs.length + ' focus blocks';
                }
            }

            // Re-render Today's schedule list from calendar events for today
            function renderTodayScheduleDynamic() {
                const list = document.getElementById('todayScheduleList');
                if (!list) return;
                const todayStr = getTodayStr();
                const evs = getCalEventsForDate(todayStr);
                if (evs.length === 0) return;
                list.innerHTML = '';
                const iconMap = {
                    focus: '⚡',
                    fixed: '📚',
                    recovery: '🧘',
                    sport: '🏸',
                    free: '☕',
                    break: '☕',
                    lab: '🔬',
                    meeting: '📋',
                    group: '👥',
                    talk: '🎤',
                    errand: '🛒'
                };
                const bgMap = {
                    focus: 'bg-[#EBF9F1]',
                    fixed: 'bg-[#E8F0FE]',
                    recovery: 'bg-[#EBF9F1]',
                    sport: 'bg-[#FFF4E5]',
                    free: 'bg-[#F1F5F9]',
                    break: 'bg-[#F1F5F9]',
                    lab: 'bg-[#E8F0FE]',
                    meeting: 'bg-[#E8F0FE]',
                    errand: 'bg-[#F3E8FF]'
                };
                evs.forEach(ev => {
                    const icon = ev.icon || iconMap[ev.type] || '📌';
                    const bg = bgMap[ev.type] || 'bg-[#EBF9F1]';
                    const loc = ev.locationHtml ? ev.locationHtml.replace(/<[^>]*>/g, '').trim() : (ev.location ? ev.location.replace('📍','').trim() : 'Campus');
                    const article = document.createElement('article');
                    article.className = 'bg-white rounded-[24px] p-3.5 flex flex-col shadow-soft border border-black/[0.02] group cursor-pointer';
                    article.setAttribute('onclick', 'toggleTaskComplete(this)');
                    article.innerHTML = `
                        <div class="flex items-center justify-between w-full">
                            <div class="flex items-center space-x-3">
                                <div class="task-check-circle w-6 h-6 rounded-full border-2 border-neutral-300 group-hover:border-blue-500 flex items-center justify-center shrink-0 transition-colors">
                                    <span class="material-symbols-outlined text-[14px] text-white opacity-0 transition-opacity">check</span>
                                </div>
                                <div class="w-10 h-10 rounded-2xl ${bg} flex items-center justify-center shrink-0 text-[18px]">${icon}</div>
                                <div>
                                    <h3 class="task-title text-[14px] font-bold text-[#1C1C1E] tracking-tight leading-tight transition-all">${ev.title}</h3>
                                    <p class="text-[11px] font-medium text-[#8E8E93] mt-0.5">${loc}</p>
                                </div>
                            </div>
                            <span class="bg-[#1C1C1E] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-tight">${ev.time}</span>
                        </div>
                        <div class="task-reflection-container mt-2.5 pt-2 border-t border-neutral-100/90 flex items-start justify-between space-x-2 text-[11px] hidden">
                            <div class="flex items-start space-x-1.5 flex-1 min-w-0">
                                <span class="text-xs shrink-0">💭</span>
                                <p class="task-reflection-text italic text-neutral-600 truncate text-[11px]"></p>
                            </div>
                            <button type="button" onclick="event.stopPropagation(); openReflectionForElement(this.closest('article'))" class="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0">Edit</button>
                        </div>
                    `;
                    if (ev.reflection) {
                        article.dataset.reflection = ev.reflection;
                        const container = article.querySelector('.task-reflection-container');
                        const textP = article.querySelector('.task-reflection-text');
                        if (container && textP) {
                            textP.textContent = '"' + ev.reflection + '"';
                            container.classList.remove('hidden');
                        }
                    }
                    list.appendChild(article);
                });
            }

            document.addEventListener('DOMContentLoaded', function() {
                try {
                    populateDateSelect();
                    ensureTodayHasEvents();
                    updateTodayHeader();
                    renderTodayScheduleDynamic();
                    updateLiveClocks();
                    setInterval(updateLiveClocks, 30000);
                    // Re-render calendar views to pick up cloned events and new today highlight
                    if (typeof renderCalDay === 'function') renderCalDay(calYear, calMonth, calDate);
                    if (typeof renderCalMonth === 'function') renderCalMonth(calYear, calMonth);
                    if (typeof renderCalWeek === 'function') renderCalWeek(calYear, calMonth, calDate);
                    setCalView('day');
                } catch (e) {
                    console.error('Live datetime init failed', e);
                }
            });
        })();
    