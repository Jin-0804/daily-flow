
        // Global calendar events state — now follows real current datetime
        const _todayInit = new Date();
        let calYear = _todayInit.getFullYear();
        let calMonth = _todayInit.getMonth();
        let calDate = _todayInit.getDate();
        let calView = 'month';

        // ===== Placement Mode State (Add to Schedule flow) =====
        var pendingPlacement = null; // {title, type, location, duration, durationText}
        var placementGhost = null; // {date, time, minutes}
        var isPlacementMode = false;

        const calEvents = [
            // May 10 (Sunday)
            { date: '2026-05-10', title: 'Sunday Brunch', time: '11:00 AM', location: '📍 Campus Bistro', type: 'free', icon: '🍽️', badgeText: 'Free Time', durationText: '60m' },
            { date: '2026-05-10', title: 'Open Gym Session', time: '03:00 PM', location: '📍 Fitness Center', type: 'sport', icon: '🏃', badgeText: 'Workout', durationText: '60m' },

            // May 11 (Monday)
            { date: '2026-05-11', title: 'Linear Algebra', time: '09:00 AM', location: '📍 Hall A1', type: 'fixed', icon: '📐', badgeText: 'Lecture', durationText: '90m' },
            { date: '2026-05-11', title: 'Lunch Break', time: '12:00 PM', location: '📍 Student Union', type: 'free', icon: '🥪', badgeText: 'Free Time', durationText: '45m' },
            { date: '2026-05-11', title: 'Algorithm Prep', time: '02:00 PM', location: '📍 Library Wing B', type: 'focus', icon: '💻', badgeText: 'Deep Focus', durationText: '90m' },
            { date: '2026-05-11', title: 'Evening Walk', time: '05:00 PM', location: '📍 Central Quad', type: 'recovery', icon: '🌿', badgeText: 'Recovery', durationText: '45m' },

            // May 12
            { date: '2026-05-12', title: 'Team Sync', time: '08:00 AM', location: '📍 Zoom', type: 'meeting', icon: '📋', badgeText: 'Sync', durationText: '30m' },
            { date: '2026-05-12', title: 'Calculus Review', time: '02:00 PM', location: '📍 Library', type: 'focus', icon: '💻', badgeText: 'Focus', durationText: '90m' },
            { date: '2026-05-12', title: 'Campus Run', time: '05:00 PM', location: '📍 Track Field', type: 'sport', icon: '👟', badgeText: 'Sport', durationText: '45m' },
            
            // May 13
            { date: '2026-05-13', title: 'Office Hours', time: '02:00 PM', location: '📍 Dr. A Office', type: 'meeting', icon: '📋', badgeText: 'Office Hours', durationText: '45m' },
            { date: '2026-05-13', title: 'Study Group', time: '04:00 PM', location: '📍 Room 202', type: 'group', icon: '👥', badgeText: 'Group Study', durationText: '60m' },
            
            // May 14
            { date: '2026-05-14', title: 'Seminar', time: '11:00 AM', location: '📍 Auditorium', type: 'talk', icon: '🎤', badgeText: 'Seminar', durationText: '60m' },
            { date: '2026-05-14', title: 'Physics Lab', time: '01:00 PM', location: '📍 Lab 3', type: 'lab', icon: '🔬', badgeText: 'Lab Session', durationText: '120m' },
            
            // May 15
            { date: '2026-05-15', title: 'Morning Lecture', time: '09:00 AM', location: '📍 Hall 302', type: 'fixed', icon: '📚', badgeText: 'Fixed Event', durationText: '60m' },
            { date: '2026-05-15', title: 'Lunch Break', time: '12:00 PM', location: '📍 Cafeteria', type: 'free', icon: '🍽️', badgeText: 'Free Time', durationText: '45m' },
            { date: '2026-05-15', title: 'Study Session', time: '03:00 PM', location: '📍 Quiet Zone', type: 'focus', icon: '💻', badgeText: 'Deep Focus', durationText: '90m' },
            
            // May 16 (Today - Schedule & Timeline color-coded matching user reference)
            {
                date: '2026-05-16',
                time: '10:00 AM',
                title: 'Mathematics Lecture',
                locationHtml: '<span class="text-[#2563EB] font-medium">📍 Hall B4</span> · <span class="text-rose-500 font-medium">📍 High Mental Load</span>',
                type: 'fixed',
                icon: '🏫',
                badgeText: 'Fixed Event',
                badgeClass: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70',
                badgeDot: '•',
                cardClass: 'bg-white border border-blue-100/80 shadow-sm',
                nodeClass: 'bg-[#2563EB] ring-4 ring-[#EFF6FF]',
                durationText: '90m'
            },
            {
                date: '2026-05-16',
                time: '11:30 AM',
                title: 'Recovery Time',
                titleClass: 'text-[#064E3B]',
                location: 'Quiet walk & outdoor mindfulness in quad garden',
                locationClass: 'text-[#047857]',
                type: 'recovery',
                icon: '🌿',
                badgeText: 'Recovery',
                badgeClass: 'bg-[#065F46] text-white font-bold',
                badgeIcon: '🌿',
                cardClass: 'bg-[#E8F8F0] border border-[#A7F3D0] shadow-sm',
                nodeClass: 'bg-[#059669] ring-4 ring-[#E6F8F0]',
                metaClass: 'text-[#059669] font-bold',
                durationText: '+15% recharge',
                isProgress: true,
                progressPercent: 65,
                progressBarClass: 'bg-[#059669]',
                progressTrackClass: 'bg-white/80',
                progressLabelClass: 'text-[#059669] font-bold',
                progressLabel: 'Restoring'
            },
            {
                date: '2026-05-16',
                time: '12:00 PM',
                title: 'Lunch & Social Break',
                location: '🍴 Student Union Atrium with Study Pod',
                type: 'free',
                icon: '🍽️',
                badgeText: 'Free Time',
                badgeClass: 'bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]/70',
                badgeIcon: '💜',
                cardClass: 'bg-white border border-slate-200/80 shadow-sm',
                nodeClass: 'bg-[#CBD5E1] ring-4 ring-[#F1F5F9]',
                durationText: '1h 30m'
            },
            {
                date: '2026-05-16',
                time: '02:00 PM',
                title: 'Assignment: Discrete Math',
                location: 'Library Quiet Wing · Floor 3',
                type: 'focus',
                icon: '📚',
                badgeText: 'Smart Slotted',
                badgeClass: 'bg-[#F3E8FF] text-[#7E22CE] border border-[#DDD6FE]',
                badgeIcon: '✦',
                cardClass: 'bg-white border border-purple-200/80 shadow-sm',
                nodeClass: 'bg-[#8B5CF6] ring-4 ring-[#F5F3FF]',
                metaClass: 'text-[#7E22CE] font-bold',
                durationText: '98% Circadian Match',
                sprint: 'Focus Sprint: Proofs & Graphs',
                sprintClass: 'bg-[#FAF5FF] border border-[#E9D5FF] text-[#6B21A8]',
                sprintDotClass: 'bg-[#7E22CE]'
            },
            {
                date: '2026-05-16',
                time: '03:30 PM',
                title: 'Short Break / Snack',
                location: 'Hydration & brain recharge',
                type: 'break',
                icon: '☕',
                badgeText: 'Free Time',
                badgeClass: 'bg-[#F1F5F9] text-[#475569] border border-slate-200',
                cardClass: 'bg-white border border-slate-200/80 shadow-sm',
                nodeClass: 'bg-[#CBD5E1] ring-4 ring-[#F1F5F9]',
                durationText: '30m',
                rightEmoji: '🍎'
            },
            {
                date: '2026-05-16',
                time: '05:00 PM',
                title: 'Badminton Practice',
                locationHtml: '<span class="text-neutral-700">⤢ Sports Center Court 2</span> · <span class="text-emerald-600 font-medium">High Physical, Low Mental</span>',
                type: 'sport',
                icon: '🏸',
                badgeText: 'Fixed Event',
                badgeClass: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70',
                badgeDot: '•',
                cardClass: 'bg-white border border-blue-100/80 shadow-sm',
                nodeClass: 'bg-[#2563EB] ring-4 ring-[#EFF6FF]',
                durationText: '75m'
            },
            {
                date: '2026-05-16',
                time: '07:30 PM',
                title: 'Grocery & Dorm Supplies',
                location: "Trader Joe's • Greek yogurt, oats, fruit, notebook refill",
                type: 'errand',
                icon: '🛒',
                badgeText: 'Temporary Task / Errands',
                badgeClass: 'bg-[#F3E8FF] text-[#7E22CE] border border-[#DDD6FE]',
                cardClass: 'bg-white border border-purple-100/80 shadow-sm',
                nodeClass: 'bg-[#8B5CF6] ring-4 ring-[#F5F3FF]',
                durationText: '60m'
            },
            
            // May 17 (Sunday - Schedule & Timeline matching reference image)
            {
                date: '2026-05-17',
                time: '10:00 AM',
                title: 'Mathematics Lecture',
                locationHtml: '<span class="text-[#2563EB] font-medium">📍 Hall B4</span> · <span class="text-rose-500 font-medium">📍 High Mental Load</span>',
                type: 'fixed',
                icon: '🏫',
                badgeText: 'Fixed Event',
                badgeClass: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70',
                badgeDot: '•',
                cardClass: 'bg-white border border-blue-100/80 shadow-sm',
                nodeClass: 'bg-[#2563EB] ring-4 ring-[#EFF6FF]',
                durationText: '90m'
            },
            {
                date: '2026-05-17',
                time: '11:30 AM',
                title: 'Recovery Time',
                titleClass: 'text-[#064E3B]',
                location: 'Quiet walk & outdoor mindfulness in quad garden',
                locationClass: 'text-[#047857]',
                type: 'recovery',
                icon: '🌿',
                badgeText: 'Recovery',
                badgeClass: 'bg-[#065F46] text-white font-bold',
                badgeIcon: '🌿',
                cardClass: 'bg-[#E8F8F0] border border-[#A7F3D0] shadow-sm',
                nodeClass: 'bg-[#059669] ring-4 ring-[#E6F8F0]',
                metaClass: 'text-[#059669] font-bold',
                durationText: '+15% recharge',
                isProgress: true,
                progressPercent: 65,
                progressBarClass: 'bg-[#059669]',
                progressTrackClass: 'bg-white/80',
                progressLabelClass: 'text-[#059669] font-bold',
                progressLabel: 'Restoring'
            },
            {
                date: '2026-05-17',
                time: '12:00 PM',
                title: 'Lunch & Social Break',
                location: '🍴 Student Union Atrium with Study Pod',
                type: 'free',
                icon: '🍽️',
                badgeText: 'Free Time',
                badgeClass: 'bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]/70',
                badgeIcon: '💜',
                cardClass: 'bg-white border border-slate-200/80 shadow-sm',
                nodeClass: 'bg-[#CBD5E1] ring-4 ring-[#F1F5F9]',
                durationText: '1h 30m'
            },
            {
                date: '2026-05-17',
                time: '02:00 PM',
                title: 'Assignment: Discrete Math',
                location: 'Library Quiet Wing · Floor 3',
                type: 'focus',
                icon: '📚',
                badgeText: 'Smart Slotted',
                badgeClass: 'bg-[#F3E8FF] text-[#7E22CE] border border-[#DDD6FE]',
                badgeIcon: '✦',
                cardClass: 'bg-white border border-purple-200/80 shadow-sm',
                nodeClass: 'bg-[#8B5CF6] ring-4 ring-[#F5F3FF]',
                metaClass: 'text-[#7E22CE] font-bold',
                durationText: '98% Circadian Match',
                sprint: 'Focus Sprint: Proofs & Graphs',
                sprintClass: 'bg-[#FAF5FF] border border-[#E9D5FF] text-[#6B21A8]',
                sprintDotClass: 'bg-[#7E22CE]'
            },
            {
                date: '2026-05-17',
                time: '03:30 PM',
                title: 'Short Break / Snack',
                location: 'Hydration & brain recharge',
                type: 'break',
                icon: '☕',
                badgeText: 'Free Time',
                badgeClass: 'bg-[#F1F5F9] text-[#475569] border border-slate-200',
                cardClass: 'bg-white border border-slate-200/80 shadow-sm',
                nodeClass: 'bg-[#CBD5E1] ring-4 ring-[#F1F5F9]',
                durationText: '30m',
                rightEmoji: '🍎'
            },
            {
                date: '2026-05-17',
                time: '05:00 PM',
                title: 'Badminton Practice',
                locationHtml: '<span class="text-neutral-700">⤢ Sports Center Court 2</span> · <span class="text-emerald-600 font-medium">High Physical, Low Mental</span>',
                type: 'sport',
                icon: '🏸',
                badgeText: 'Fixed Event',
                badgeClass: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70',
                badgeDot: '•',
                cardClass: 'bg-white border border-blue-100/80 shadow-sm',
                nodeClass: 'bg-[#2563EB] ring-4 ring-[#EFF6FF]',
                durationText: '75m'
            },
            {
                date: '2026-05-17',
                time: '07:30 PM',
                title: 'Grocery & Dorm Supplies',
                location: "Trader Joe's • Greek yogurt, oats, fruit, notebook refill",
                type: 'errand',
                icon: '🛒',
                badgeText: 'Temporary Task / Errands',
                badgeClass: 'bg-[#F3E8FF] text-[#7E22CE] border border-[#DDD6FE]',
                cardClass: 'bg-white border border-purple-100/80 shadow-sm',
                nodeClass: 'bg-[#8B5CF6] ring-4 ring-[#F5F3FF]',
                durationText: '60m'
            },
            
            // May 18
            { date: '2026-05-18', title: 'Physics Lab', time: '09:00 AM', location: '📍 Lab 4', type: 'lab', icon: '🔬', badgeText: 'Lab Session', durationText: '120m' },
            { date: '2026-05-18', title: 'Office Hours', time: '11:00 AM', location: '📍 Dr. Smith Office', type: 'meeting', icon: '📋', badgeText: 'Office Hours', durationText: '45m' },
            { date: '2026-05-18', title: 'Research Meeting', time: '02:00 PM', location: '📍 Conference Room', type: 'meeting', icon: '📋', badgeText: 'Meeting', durationText: '60m' },

            // May 19
            { date: '2026-05-19', title: 'Algorithm Design', time: '10:00 AM', location: '📍 Hall 201', type: 'focus', icon: '💻', badgeText: 'Deep Focus', durationText: '90m' },
            { date: '2026-05-19', title: 'Lunch Break', time: '12:00 PM', location: '📍 Dining Hall', type: 'free', icon: '🥪', badgeText: 'Free Time', durationText: '45m' },
            { date: '2026-05-19', title: 'Badminton Practice', time: '04:00 PM', location: '📍 Court 2', type: 'sport', icon: '🏸', badgeText: 'Sport', durationText: '60m' },

            // May 20
            { date: '2026-05-20', title: 'Chemistry Lecture', time: '09:00 AM', location: '📍 Hall 105', type: 'fixed', icon: '🧪', badgeText: 'Lecture', durationText: '90m' },
            { date: '2026-05-20', title: 'Office Hours', time: '01:00 PM', location: '📍 Dr. Lee Office', type: 'meeting', icon: '📋', badgeText: 'Office Hours', durationText: '45m' },
            { date: '2026-05-20', title: 'Study Group', time: '03:00 PM', location: '📍 Study Room 3', type: 'focus', icon: '👥', badgeText: 'Study', durationText: '60m' },

            // May 21
            { date: '2026-05-21', title: 'Physics Seminar', time: '11:00 AM', location: '📍 Auditorium', type: 'fixed', icon: '🎤', badgeText: 'Seminar', durationText: '60m' },
            { date: '2026-05-21', title: 'Circuit Lab', time: '02:00 PM', location: '📍 EE Lab', type: 'lab', icon: '🔬', badgeText: 'Lab Session', durationText: '90m' },
            { date: '2026-05-21', title: 'Evening Walk', time: '05:00 PM', location: '📍 Lake Trail', type: 'recovery', icon: '🌿', badgeText: 'Recovery', durationText: '45m' },

            // May 22
            { date: '2026-05-22', title: 'Math Colloquium', time: '10:00 AM', location: '📍 Main Hall', type: 'fixed', icon: '📐', badgeText: 'Lecture', durationText: '90m' },
            { date: '2026-05-22', title: 'Lunch Break', time: '12:00 PM', location: '📍 Campus Cafe', type: 'free', icon: '☕', badgeText: 'Break', durationText: '45m' },
            { date: '2026-05-22', title: 'Deep Focus', time: '03:00 PM', location: '📍 Library Quiet', type: 'focus', icon: '💻', badgeText: 'Deep Focus', durationText: '90m' },

            // May 23
            { date: '2026-05-23', title: 'Weekend Jog', time: '09:00 AM', location: '📍 Stadium Track', type: 'sport', icon: '🏃', badgeText: 'Workout', durationText: '60m' },
            { date: '2026-05-23', title: 'Reading Time', time: '01:00 PM', location: '📍 Lounge', type: 'free', icon: '📖', badgeText: 'Free Time', durationText: '60m' },
            { date: '2026-05-23', title: 'Project Wrap-up', time: '04:00 PM', location: '📍 Library Wing C', type: 'focus', icon: '💻', badgeText: 'Focus', durationText: '90m' }
        ];

        function formatDateStr(year, month, date) {
            const y = year;
            const m = String(month + 1).padStart(2, '0');
            const d = String(date).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }

        function getCalEventsForDate(dateStr) {
            return calEvents.filter(e => e.date === dateStr);
        }

        function getSunday(date) {
            const d = new Date(date);
            const day = d.getDay();
            d.setDate(d.getDate() - day);
            return d;
        }

        // DOM references for Calendar
        const calMonthGrid = document.getElementById('calMonthGrid');
        const calWeekHeader = document.getElementById('calWeekHeader');
        const calWeekGrid = document.getElementById('calWeekGrid');
        const calDayHeader = document.getElementById('calDayHeader');
        const calDayTimeline = document.getElementById('calDayTimeline');
        const calDayEventCount = document.getElementById('calDayEventCount');
        const calViewTitle = document.getElementById('calViewTitle');
        const calMonthLabel = document.getElementById('calMonthLabel');

        const calMonthView = document.getElementById('calMonthView');
        const calWeekView = document.getElementById('calWeekView');
        const calDayView = document.getElementById('calDayView');

        const calViewBtns = document.querySelectorAll('.cal-view-btn');
        const calPrevBtn = document.getElementById('calPrevBtn');
        const calNextBtn = document.getElementById('calNextBtn');

        // Render Month View — today follows real date
        function renderCalMonth(year, month) {
            if (!calMonthGrid) return;
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const _now = new Date();
            const todayStr = formatDateStr(_now.getFullYear(), _now.getMonth(), _now.getDate());
            const offset = (firstDay === 0) ? 6 : firstDay - 1;
            let html = '';
            for (let i = 0; i < offset; i++) html += '<div class="w-8 h-8"></div>';
            for (let d = 1; d <= daysInMonth; d++) {
                const ds = formatDateStr(year, month, d);
                const isToday = ds === todayStr;
                const evs = getCalEventsForDate(ds);
                const hasEvent = evs.length > 0;
                let cls = 'w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-medium transition-transform cursor-pointer';
                if (isToday) cls += ' bg-[#181C21] text-white font-semibold shadow-md';
                else if (hasEvent) cls += ' bg-white shadow-xs font-normal relative hover:bg-neutral-100';
                else cls += ' bg-white shadow-xs font-normal hover:bg-neutral-100';
                
                html += `<div class="relative flex flex-col items-center justify-center w-8 h-8" onclick="openDayFromMonth('${ds}', ${d})">`;
                html += `<div class="${cls}">${d}</div>`;
                if (hasEvent && !isToday) {
                    html += `<span class="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>`;
                }
                html += `</div>`;
            }
            calMonthGrid.innerHTML = html;
            const monthName = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (calViewTitle) calViewTitle.textContent = monthName;
            if (calMonthLabel) calMonthLabel.textContent = monthName;
        }

        function openDayFromMonth(dateStr, dayNum) {
            if (isPlacementMode) {
                const h = placementGhost ? Math.floor(placementGhost.minutes/60) : 11;
                // Update ghost to picked date, keep hour
                placementGhost = { date: dateStr, time: minutesToTimeStr(h*60 + (placementGhost ? placementGhost.minutes%60 : 0)), minutes: h*60 + (placementGhost ? placementGhost.minutes%60 : 0) };
                const d = new Date(dateStr + 'T00:00:00');
                calYear = d.getFullYear(); calMonth = d.getMonth(); calDate = d.getDate();
                setCalView('week');
                renderCalWeek(calYear, calMonth, calDate);
                updatePlacementBar();
                const timeInput = document.getElementById('placementTimeInput');
                if (timeInput && placementGhost) timeInput.value = minutesTo24(placementGhost.minutes);
                showAppToast(`📅 Ghost moved to ${formatDateForDisplay(dateStr)}`);
                return;
            }
            const d = new Date(dateStr + 'T00:00:00');
            calYear = d.getFullYear(); calMonth = d.getMonth(); calDate = d.getDate();
            setCalView('day');
        }

        // Helper to get the top uncompleted task for a specific date (ignores breaks, recovery, lunch)
        function getTopUncompletedTaskForDate(dateStr) {
            const evs = getCalEventsForDate(dateStr);
            const nonTaskTypes = ['free', 'recovery', 'break'];
            const tasks = evs.filter(e => !nonTaskTypes.includes(e.type) && !e.completed);
            
            if (tasks.length === 0) return null;
            
            const priorityOrder = {
                'focus': 1,
                'smart': 1,
                'fixed': 2,
                'lab': 2,
                'sport': 3,
                'meeting': 4,
                'errand': 5
            };
            
            tasks.sort((a, b) => {
                const pa = priorityOrder[a.type] || 99;
                const pb = priorityOrder[b.type] || 99;
                return pa - pb;
            });
            
            return tasks[0];
        }

        function getTaskHour(task) {
            if (!task || !task.time) return 9;
            const parts = task.time.split(':');
            let h = parseInt(parts[0]);
            const isPM = task.time.includes('PM');
            const isAM = task.time.includes('AM');
            if (isPM && h !== 12) h += 12;
            if (isAM && h === 12) h = 0;
            return h;
        }

        // Render Week View (Original Timetable Grid Style: shows only that day's uncompleted most important task with its name)
        function renderCalWeek(year, month, refDate) {
            if (!calWeekHeader || !calWeekGrid) return;
            const ref = new Date(year, month, refDate);
            const sunday = getSunday(ref);
            const weekDays = [];
            for (let i = 0; i < 7; i++) {
                weekDays.push(new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i));
            }

            // Month title matching reference image "May"
            const monthTitle = sunday.toLocaleString('default', { month: 'long' });
            const monthTitleEl = document.getElementById('calWeekMonthTitle');
            if (monthTitleEl) monthTitleEl.textContent = monthTitle;

            // Transposed layout: Days on left (vertical), Time on top (horizontal) — hour blocks with touch horizontal scroll
            const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            const timeSlots = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
            const selectedDs = formatDateStr(year, month, calDate);

            // Build transposed grid: header row = time on top (horizontally scrollable), days on left (vertical + sticky)
            let gridHtml = '';

            // Time header row (sticky top, left corner sticky) — green/red energy hint when placing
            gridHtml += `<div class="flex items-stretch border-b border-neutral-200 bg-neutral-50/90 sticky top-0 z-20">`;
            gridHtml += `<div class="w-[56px] shrink-0 flex items-center justify-center text-[9px] font-extrabold tracking-wider text-neutral-500 select-none border-r border-neutral-200 bg-white sticky left-0 z-30">DAY</div>`;
            gridHtml += `<div class="grid gap-1.5 p-1.5 shrink-0" style="grid-template-columns: repeat(11, 72px);">`;
            timeSlots.forEach(t => {
                const h = parseInt(t);
                if (isPlacementMode) {
                    const e = getEnergyForHour(h);
                    const bg = e === 'high' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : e === 'medium' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-red-100 border-red-300 text-red-800';
                    const label = e === 'high' ? 'High' : e === 'medium' ? 'Mid' : 'Low';
                    gridHtml += `<div class="w-[72px] text-center py-1.5 select-none rounded-lg border shadow-sm ${bg}"><div class="text-[11px] font-bold leading-none">${t}:00</div><div class="text-[8px] font-bold opacity-60">${label}</div></div>`;
                } else {
                    gridHtml += `<div class="w-[72px] text-center text-[11px] font-bold text-neutral-600 py-1.5 select-none bg-white rounded-lg border border-neutral-200/60 shadow-sm">${t}:00</div>`;
                }
            });
            gridHtml += `</div></div>`;

            // Day rows (days on left sticky, time columns scrollable)
            weekDays.forEach((dateObj, idx) => {
                const ds = formatDateStr(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
                const isSelected = dateObj.getDate() === calDate && dateObj.getMonth() === calMonth;
                const dayNum = dateObj.getDate();
                const letter = dayLetters[idx];
                const evs = getCalEventsForDate(ds);

                let rowHtml = `<div class="flex items-stretch border-b border-neutral-100/80 min-h-[52px] last:border-b-0 ${isSelected ? 'bg-blue-50/20' : 'hover:bg-neutral-50/30'}">`;
                // Left column: Day + Date - sticky
                rowHtml += `
                    <div class="w-[56px] shrink-0 flex flex-col items-center justify-center cursor-pointer select-none py-2 border-r border-neutral-200 bg-white transition sticky left-0 z-10 ${isSelected ? 'shadow-[2px_0_8px_rgba(0,0,0,0.06)]' : ''}" onclick="handleWeekDayPlacementOrSelect(${dateObj.getFullYear()}, ${dateObj.getMonth()}, ${dayNum})">
                        <span class="text-[10px] font-bold ${isSelected ? 'text-[#2563EB]' : 'text-neutral-400'}">${letter}</span>
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-[12px] ${isSelected ? 'bg-[#2563EB] text-white shadow-md font-extrabold' : 'font-bold text-neutral-700 bg-neutral-100 border border-neutral-200/60'} transition-all mt-0.5">
                            ${dayNum}
                        </div>
                    </div>
                `;
                rowHtml += `<div class="grid gap-1.5 p-1.5 shrink-0" style="grid-template-columns: repeat(11, 72px);">`;
                timeSlots.forEach(t => {
                    const hourNum = parseInt(t);
                    const matched = evs.find(e => {
                        const parts = e.time.split(':');
                        let h = parseInt(parts[0]);
                        const isPM = e.time.includes('PM');
                        const isAM = e.time.includes('AM');
                        if (isPM && h !== 12) h += 12;
                        if (isAM && h === 12) h = 0;
                        return h === hourNum;
                    });
                    // Placement mode: show ghost and green/red energy
                    if (isPlacementMode && pendingPlacement) {
                        const isGhostHere = placementGhost && placementGhost.date === ds && Math.floor(placementGhost.minutes/60) === hourNum;
                        const energy = getEnergyForHour(hourNum);
                        const energyBg = energy === 'high' ? 'bg-emerald-50/70 border-emerald-200' : energy === 'medium' ? 'bg-amber-50/60 border-amber-200' : 'bg-red-50/70 border-red-200';
                        if (isGhostHere) {
                            const ghostIconMap = { focus: '💻', fixed: '📚', recovery: '🧘', sport: '🏸' };
                            const gIcon = ghostIconMap[pendingPlacement.type] || '📌';
                            const en = getEnergyForHour(hourNum);
                            const isLow = en === 'low';
                            const ghostBg = isLow ? 'bg-red-500 text-white border-red-400' : 'bg-[#1C1C1E] text-white border-emerald-400';
                            const ghostDot = isLow ? 'bg-red-400' : 'bg-emerald-400';
                            const ghostTimeColor = isLow ? 'text-red-200' : 'text-emerald-300';
                            const warnIcon = isLow ? '⚠️' : '';
                            rowHtml += `
                                <div class="w-[72px] min-h-[44px] rounded-xl ${ghostBg} shadow-lg border-2 flex flex-col items-start justify-center p-2 gap-0.5 cursor-grab active:cursor-grabbing ${isLow ? '' : 'animate-pulse'}" draggable="true" ondragstart="handleGhostDragStart(event, '${ds}', ${hourNum})" ontouchstart="handleGhostTouchStart(event, '${ds}', ${hourNum})" title="Drag me — ${pendingPlacement.title} at ${placementGhost.time}${isLow ? ' — Low energy!' : ''}">
                                    <div class="flex items-center gap-1 w-full">
                                        <span class="text-[11px]">${gIcon}</span>
                                        <span class="text-[9px] font-extrabold truncate flex-1">${pendingPlacement.title}</span>
                                        <span class="text-[9px] leading-none">${warnIcon}</span>
                                        <span class="w-2 h-2 rounded-full ${ghostDot} ${isLow ? '' : 'animate-pulse'}"></span>
                                    </div>
                                    <span class="text-[9px] font-bold ${ghostTimeColor}">${placementGhost.time} · ${pendingPlacement.durationText}</span>
                                </div>
                            `;
                        } else if (matched) {
                            let bgClass = 'bg-[#E2E8F0] text-neutral-800';
                            if (matched.type === 'focus' || matched.type === 'smart') bgClass = 'bg-[#FCA5A5] text-[#7F1D1D]';
                            else if (matched.type === 'fixed' || matched.type === 'lab') bgClass = 'bg-[#A5B4FC] text-[#1E1B4B]';
                            else if (matched.type === 'sport') bgClass = 'bg-[#93C5FD] text-[#1E3A8A]';
                            else if (matched.type === 'recovery' || matched.type === 'free' || matched.type === 'break') bgClass = 'bg-[#FED7AA] text-[#7C2D12]';
                            rowHtml += `
                                <div onclick="event.stopPropagation(); moveGhostTo('${ds}', ${hourNum})"
                                     title="Occupied: ${matched.title} — tap to move ghost here anyway"
                                     class="w-[72px] min-h-[44px] rounded-xl ${bgClass} shadow-sm opacity-60 border border-black/5 p-2 flex flex-col items-start justify-center text-left overflow-hidden gap-0.5 cursor-pointer hover:opacity-80">
                                    <span class="text-[8px] font-bold leading-tight line-clamp-2 w-full opacity-70">${matched.title}</span>
                                    <span class="text-[8px] font-semibold opacity-50">${matched.time}</span>
                                </div>
                            `;
                        } else {
                            rowHtml += `<div class="w-[72px] min-h-[44px] rounded-xl border-2 border-dashed ${energyBg} flex items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition" onclick="moveGhostTo('${ds}', ${hourNum})" ondragover="handleGhostDragOver(event)" ondrop="handleGhostDrop(event, '${ds}', ${hourNum})"><span class="text-[10px] font-bold ${energy === 'high' ? 'text-emerald-600' : energy === 'medium' ? 'text-amber-600' : 'text-red-500'}">${energy === 'high' ? '✓' : '·'}</span></div>`;
                        }
                    } else {
                        let cellHtml = `<div class="w-[72px] min-h-[44px] ${isSelected ? 'bg-blue-50/10' : 'hover:bg-neutral-50/60'} rounded-xl transition cursor-pointer border border-dashed border-neutral-200/60 flex items-center justify-center" onclick="selectWeekDay(${dateObj.getFullYear()}, ${dateObj.getMonth()}, ${dateObj.getDate()})"><span class="text-[9px] text-neutral-300">—</span></div>`;
                        if (matched) {
                            let bgClass = 'bg-[#E2E8F0] text-neutral-800';
                            if (matched.type === 'focus' || matched.type === 'smart') bgClass = 'bg-[#FCA5A5] text-[#7F1D1D]';
                            else if (matched.type === 'fixed' || matched.type === 'lab') bgClass = 'bg-[#A5B4FC] text-[#1E1B4B]';
                            else if (matched.type === 'sport') bgClass = 'bg-[#93C5FD] text-[#1E3A8A]';
                            else if (matched.type === 'recovery' || matched.type === 'free' || matched.type === 'break') bgClass = 'bg-[#FED7AA] text-[#7C2D12]';
                            cellHtml = `
                                <div onclick="event.stopPropagation(); openDayFromMonth('${ds}', ${dateObj.getDate()})"
                                     title="${matched.title} (${matched.time})"
                                     class="w-[72px] min-h-[44px] rounded-xl ${bgClass} shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all p-2 flex flex-col items-start justify-center text-left overflow-hidden border border-black/5 gap-0.5">
                                    <span class="text-[10px] font-extrabold leading-tight line-clamp-2 w-full">${matched.title}</span>
                                    <span class="text-[9px] font-semibold opacity-70 leading-none">${matched.time}</span>
                                </div>
                            `;
                        }
                        rowHtml += cellHtml;
                    }
                });
                rowHtml += `</div></div>`;
                gridHtml += rowHtml;
            });

            // Hide old header (now time is on top)
            if (calWeekHeader) {
                calWeekHeader.innerHTML = '';
                calWeekHeader.style.display = 'none';
            }
            calWeekGrid.innerHTML = gridHtml;
            calWeekGrid.style.minWidth = '860px';
            calWeekGrid.style.width = 'max-content';
            // Ensure grid container allows horizontal + vertical scroll with touch
            if (calWeekGrid.parentElement) {
                calWeekGrid.parentElement.classList.add('overflow-x-auto', 'overflow-y-auto');
                calWeekGrid.parentElement.classList.remove('overflow-hidden');
                calWeekGrid.parentElement.style.webkitOverflowScrolling = 'touch';
                calWeekGrid.parentElement.style.touchAction = 'pan-x pan-y';
                calWeekGrid.parentElement.style.overscrollBehavior = 'contain';
                calWeekGrid.parentElement.style.scrollbarWidth = 'thin';

            const startStr = weekDays[0].toLocaleString('default', { month: 'short', day: 'numeric' });
            const endStr = weekDays[6].toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
            calViewTitle.textContent = `${startStr} – ${endStr}`;
            }
        }

        function selectWeekDay(year, month, date) {
            calYear = year;
            calMonth = month;
            calDate = date;
            renderCalWeek(calYear, calMonth, calDate);
        }

        // Render Day View (Schedule & Timeline with sleek vertical line, nodes, and colored cards)
        function renderCalDay(year, month, date) {
            if (!calDayTimeline) return;
            const dt = new Date(year, month, date);
            const ds = formatDateStr(year, month, date);
            const dayName = dt.toLocaleString('default', { weekday: 'long', month: 'short', day: 'numeric' });
            const evs = getCalEventsForDate(ds);
            
            if (calViewTitle) {
                calViewTitle.textContent = dayName;
            }
            if (calDayHeader) {
                calDayHeader.innerHTML = `
                    <span class="text-[15px] font-bold text-neutral-900">${dayName}</span>
                    <span class="text-[11px] bg-neutral-100 px-3 py-0.5 rounded-full font-semibold">${evs.length} events</span>
                `;
            }
            if (calDayEventCount) {
                calDayEventCount.textContent = evs.length + ' events';
            }
            
            let html = '';
            if (evs.length === 0) {
                html = `
                    <div class="bg-white rounded-[24px] p-8 text-center text-neutral-400 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center space-y-2.5">
                        <div class="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                            <span class="material-symbols-outlined text-[28px]">event_available</span>
                        </div>
                        <h4 class="text-[14px] font-bold text-neutral-800">No events scheduled</h4>
                        <p class="text-[11px] text-neutral-500">Enjoy your free time or schedule a new task.</p>
                        <button onclick="openAddEventModal()" class="text-[11.5px] font-bold text-white bg-[#1C1C1E] hover:bg-black px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer mt-1">+ Add Daily Task</button>
                    </div>
                `;
            } else {
                html = '<div class="space-y-3.5">';
                evs.forEach((e, idx) => {
                    const isLast = idx === evs.length - 1;
                    const timeParts = (e.time || '10:00 AM').split(' ');
                    const timeHour = timeParts[0] || '10:00';
                    const timeAmPm = timeParts[1] || 'AM';

                    const iconMap = {
                        fixed: '🏫',
                        recovery: '🌿',
                        free: '☕',
                        focus: '📚',
                        break: '☕',
                        sport: '🏸',
                        errand: '🛒',
                        group: '👥',
                        talk: '🎤',
                        meeting: '📋',
                        lab: '🔬'
                    };
                    const icon = e.icon || iconMap[e.type] || '📌';
                    const badgeText = e.badgeText || (e.type === 'fixed' ? 'Fixed Event' : (e.type === 'recovery' ? 'Recovery' : (e.type === 'focus' ? 'Smart Slotted' : 'Free Time')));
                    const durationText = e.durationText || e.meta || '60m';

                    // Activity color-coding matching reference image
                    let badgeClass = e.badgeClass;
                    let nodeClass = e.nodeClass;
                    let cardClass = e.cardClass;
                    let metaClass = e.metaClass || 'text-neutral-500 font-semibold';
                    let titleClass = e.titleClass || 'text-[#161617]';

                    if (!nodeClass) {
                        if (e.type === 'fixed') {
                            nodeClass = 'bg-[#2563EB] ring-4 ring-[#EFF6FF]';
                            badgeClass = badgeClass || 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70';
                            cardClass = cardClass || 'bg-white border border-blue-100/80 shadow-sm';
                        } else if (e.type === 'recovery') {
                            nodeClass = 'bg-[#059669] ring-4 ring-[#E6F8F0]';
                            badgeClass = badgeClass || 'bg-[#065F46] text-white font-bold';
                            cardClass = cardClass || 'bg-[#E8F8F0] border border-[#A7F3D0] shadow-sm';
                            metaClass = 'text-[#059669] font-bold';
                            titleClass = 'text-[#064E3B]';
                        } else if (e.type === 'focus' || e.type === 'smart') {
                            nodeClass = 'bg-[#8B5CF6] ring-4 ring-[#F5F3FF]';
                            badgeClass = badgeClass || 'bg-[#F3E8FF] text-[#7E22CE] border border-[#DDD6FE]';
                            cardClass = cardClass || 'bg-white border border-purple-200/80 shadow-sm';
                            metaClass = 'text-[#7E22CE] font-bold';
                        } else if (e.type === 'sport') {
                            nodeClass = 'bg-[#2563EB] ring-4 ring-[#EFF6FF]';
                            badgeClass = badgeClass || 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70';
                            cardClass = cardClass || 'bg-white border border-blue-100/80 shadow-sm';
                        } else {
                            nodeClass = 'bg-[#CBD5E1] ring-4 ring-[#F1F5F9]';
                            badgeClass = badgeClass || 'bg-[#F1F5F9] text-[#475569] border border-slate-200';
                            cardClass = cardClass || 'bg-white border border-slate-200/80 shadow-sm';
                        }
                    }

                    html += `
                        <div class="relative flex items-start space-x-2 group w-full min-w-0">
                            <!-- Left Column: Time -->
                            <div class="w-[42px] pt-1 text-right shrink-0">
                                <span class="text-[12px] font-extrabold text-[#161617] tracking-tight block leading-tight">${timeHour}</span>
                                <span class="text-[8.5px] font-bold text-neutral-400 uppercase tracking-wider">${timeAmPm}</span>
                            </div>

                            <!-- Center Timeline Line & Node -->
                            <div class="relative flex flex-col items-center self-stretch shrink-0 w-3">
                                ${!isLast ? '<div class="w-[2px] bg-[#E2E8F0] absolute top-4 -bottom-4 left-1/2 -translate-x-1/2"></div>' : ''}
                                <div class="w-3 h-3 rounded-full ${nodeClass} z-10 shrink-0 mt-1"></div>
                            </div>

                            <!-- Right Event Card (Color Coded Matching Reference) -->
                            <div class="flex-1 min-w-0 ${cardClass} rounded-[20px] p-3 hover:shadow-md transition-all space-y-1.5 overflow-hidden">
                                <!-- Card Header: Badge & Duration/Status -->
                                <div class="flex items-center justify-between gap-1.5 min-w-0">
                                    <span class="text-[9.5px] font-bold px-2 py-0.5 rounded-full inline-flex items-center space-x-1 shrink min-w-0 truncate ${badgeClass}">
                                        ${e.badgeDot ? `<span class="text-xs leading-none mr-0.5 shrink-0">${e.badgeDot}</span>` : ''}
                                        ${e.badgeIcon ? `<span class="mr-0.5 shrink-0">${e.badgeIcon}</span>` : ''}
                                        <span class="truncate">${badgeText}</span>
                                    </span>
                                    <span class="text-[10px] ${metaClass} shrink-0 whitespace-nowrap">${durationText}</span>
                                </div>

                                <!-- Card Title -->
                                <div class="flex items-center justify-between gap-1 min-w-0">
                                    <h4 class="text-[13px] font-extrabold ${titleClass} tracking-tight flex items-center space-x-1 min-w-0 truncate">
                                        <span class="shrink-0">${icon}</span>
                                        <span class="truncate">${e.title}</span>
                                    </h4>
                                    ${e.rightEmoji ? `<span class="text-sm shrink-0">${e.rightEmoji}</span>` : ''}
                                </div>

                                <!-- Card Location / Details -->
                                ${e.locationHtml ? `<p class="text-[10.5px] font-medium leading-snug line-clamp-2">${e.locationHtml}</p>` : (e.location ? `<p class="text-[10.5px] font-medium ${e.locationClass || 'text-neutral-500'} leading-snug line-clamp-2">${e.location}</p>` : '')}

                                <!-- Recovery Progress Bar -->
                                ${e.isProgress ? `
                                    <div class="pt-0.5 flex items-center justify-between gap-2 min-w-0">
                                        <div class="flex-1 ${e.progressTrackClass || 'bg-white/80'} h-1.5 rounded-full overflow-hidden">
                                            <div class="${e.progressBarClass || 'bg-[#059669]'} h-full rounded-full" style="width: ${e.progressPercent || 65}%"></div>
                                        </div>
                                        <span class="text-[9.5px] ${e.progressLabelClass || 'text-[#059669] font-bold'} tracking-tight shrink-0">${e.progressLabel || 'Restoring'}</span>
                                    </div>
                                ` : ''}

                                <!-- Smart Slotted Focus Sprint Capsule -->
                                ${e.sprint ? `
                                    <div class="mt-0.5 flex items-center justify-between ${e.sprintClass || 'bg-[#FAF5FF] border border-[#E9D5FF] text-[#6B21A8]'} rounded-full px-2.5 py-0.5 text-[9.5px] font-semibold min-w-0">
                                        <div class="flex items-center space-x-1.5 min-w-0 truncate">
                                            <span class="w-1.5 h-1.5 rounded-full ${e.sprintDotClass || 'bg-[#7E22CE]'} shrink-0"></span>
                                            <span class="truncate">${e.sprint}</span>
                                        </div>
                                        <span class="material-symbols-outlined text-[13px] text-purple-400 shrink-0">more_horiz</span>
                                    </div>
                                ` : ''}

                                <!-- Post-Event Reflection Section -->
                                <div class="pt-1.5 border-t border-black/5 flex items-center justify-between text-[10px] gap-1.5 min-w-0">
                                    <div class="flex items-center space-x-1 min-w-0 flex-1">
                                        <span class="text-xs shrink-0">💭</span>
                                        <p class="italic text-neutral-600 truncate text-[10px] min-w-0">${e.reflection ? e.reflection : '<span class="text-neutral-400 not-italic font-normal">Add reflection</span>'}</p>
                                    </div>
                                    <button type="button" onclick="event.stopPropagation(); openReflectionForCalendarEvent('${(e.title || '').replace(/'/g, "\\'")}', '${e.date}', '${e.time}')" class="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-black/5 hover:bg-black/10 text-neutral-700 transition active:scale-95 shrink-0 cursor-pointer whitespace-nowrap">
                                        ${e.reflection ? 'Edit' : '+ Note'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            }
            calDayTimeline.innerHTML = html;
        }

        // Navigation (Prev / Next)
        function calNavigate(delta) {
            if (calView === 'month') {
                calMonth += delta;
                if (calMonth < 0) { calMonth = 11; calYear--; }
                if (calMonth > 11) { calMonth = 0; calYear++; }
                renderCalMonth(calYear, calMonth);
            } else if (calView === 'week') {
                const ref = new Date(calYear, calMonth, calDate);
                const sunday = getSunday(ref);
                sunday.setDate(sunday.getDate() + delta * 7);
                calYear = sunday.getFullYear();
                calMonth = sunday.getMonth();
                calDate = sunday.getDate();
                renderCalWeek(calYear, calMonth, calDate);
            } else if (calView === 'day') {
                calDate += delta;
                const d = new Date(calYear, calMonth, calDate);
                calYear = d.getFullYear();
                calMonth = d.getMonth();
                calDate = d.getDate();
                renderCalDay(calYear, calMonth, calDate);
            }
        }

        // View switching
        function setCalView(view) {
            calView = view;
            [calMonthView, calWeekView, calDayView].forEach(el => {
                if (el) {
                    el.classList.remove('view-visible');
                    el.classList.add('view-hidden');
                }
            });
            
            if (view === 'month') {
                calMonthView.classList.remove('view-hidden');
                calMonthView.classList.add('view-visible');
                renderCalMonth(calYear, calMonth);
            } else if (view === 'week') {
                calWeekView.classList.remove('view-hidden');
                calWeekView.classList.add('view-visible');
                renderCalWeek(calYear, calMonth, calDate);
            } else if (view === 'day') {
                calDayView.classList.remove('view-hidden');
                calDayView.classList.add('view-visible');
                renderCalDay(calYear, calMonth, calDate);
            }
            
            calViewBtns.forEach(btn => {
                const isSelected = btn.dataset.view === view;
                btn.classList.toggle('bg-[#18191c]', isSelected);
                btn.classList.toggle('text-white', isSelected);
                btn.classList.toggle('text-neutral-500', !isSelected);
                btn.classList.toggle('shadow-sm', isSelected);
                btn.classList.toggle('font-bold', isSelected);
            });
        }

        // ============================================================
        // Modal Handling (The '+' Functionality for Daily Tasks)
        // ============================================================
        const addEventModal = document.getElementById('addEventModal');
        const addEventSheet = document.getElementById('addEventSheet');
        const eventTitleInput = document.getElementById('eventTitleInput');
        const eventDurationInput = document.getElementById('eventDurationInput');
        const eventLocationInput = document.getElementById('eventLocationInput');
        const selectedEventTypeInput = document.getElementById('selectedEventType');

        function openAddEventModal() {
            if (!addEventModal || !addEventSheet) return;
            addEventModal.classList.remove('pointer-events-none', 'opacity-0');
            addEventModal.classList.add('pointer-events-auto', 'opacity-100');
            addEventSheet.classList.remove('translate-y-full');
            addEventSheet.classList.add('translate-y-0');
            
            if (eventTitleInput) {
                setTimeout(() => eventTitleInput.focus(), 150);
            }
            // Highlight correct duration button
            setTimeout(() => { if (typeof updateDurationButtons === 'function') updateDurationButtons(); }, 0);
        }

        function closeAddEventModal() {
            if (!addEventModal || !addEventSheet) return;
            addEventSheet.classList.remove('translate-y-0');
            addEventSheet.classList.add('translate-y-full');
            addEventModal.classList.remove('opacity-100');
            addEventModal.classList.add('opacity-0');
            
            setTimeout(() => {
                addEventModal.classList.remove('pointer-events-auto');
                addEventModal.classList.add('pointer-events-none');
            }, 300);
        }

        function setBlockType(type) {
            if (selectedEventTypeInput) selectedEventTypeInput.value = type;
            
            const buttons = document.querySelectorAll('.type-btn');
            buttons.forEach(btn => {
                const isMatch = btn.dataset.type === type;
                if (isMatch) {
                    btn.className = "type-btn p-2 rounded-xl border border-purple-500 bg-purple-50 text-purple-700 flex flex-col items-center justify-center text-center font-bold transition";
                } else {
                    btn.className = "type-btn p-2 rounded-xl border border-neutral-200 text-neutral-600 flex flex-col items-center justify-center text-center transition hover:bg-neutral-50";
                }
            });
        }

        function updateDurationButtons() {
            const val = eventDurationInput ? String(eventDurationInput.value).trim() : '';
            document.querySelectorAll('.duration-btn').forEach(btn => {
                const isMatch = btn.dataset.duration === val;
                if (isMatch) {
                    btn.className = "duration-btn w-9 h-9 rounded-xl bg-white text-[#1C1C1E] font-bold text-[11px] shadow active:scale-95 transition border border-white";
                } else {
                    btn.className = "duration-btn w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-[11px] border border-white/10 active:scale-95 transition";
                }
            });
        }

        function setDuration(val) {
            if (eventDurationInput) {
                eventDurationInput.value = val;
                updateDurationButtons();
            }
        }

        function applyEventPreset(title, type, duration, location) {
            if (eventTitleInput) eventTitleInput.value = title;
            if (eventDurationInput) { eventDurationInput.value = duration; updateDurationButtons(); }
            if (eventLocationInput) eventLocationInput.value = location;
            setBlockType(type);
        }

        function handleCreateEvent(e) {
            e.preventDefault();
            const title = eventTitleInput.value.trim() || 'Daily Focus Task';
            const durationMin = parseInt(eventDurationInput ? eventDurationInput.value : '60') || 60;
            const location = eventLocationInput.value.trim() || 'Library Quiet Zone';
            const type = selectedEventTypeInput.value || 'focus';
            const calcDuration = durationMin >= 60 && durationMin % 60 === 0 ? `${durationMin/60}h` : `${durationMin}m`;

            // Enter placement mode: weekly will show green/red and ghost, user picks any time
            pendingPlacement = { title, type, location, duration: durationMin, durationText: calcDuration };
            closeAddEventModal();
            // Reset form
            if (eventTitleInput) eventTitleInput.value = '';
            if (eventLocationInput) eventLocationInput.value = '';
            if (eventDurationInput) eventDurationInput.value = '60';
            // Switch to weekly placement
            switchScreen('calendar');
            setCalView('week');
            startPlacement();
            showAppToast(`📅 Place "${title}" on weekly calendar`);
        }

        // ============================================================
        // Placement Mode (Add to Schedule → Weekly with green/red)
        // ============================================================
        function getEnergyForHour(h) {
            if (h >= 9 && h <= 12) return 'high';
            if (h === 8 || h === 15 || h === 16) return 'medium';
            if (h >= 13 && h <= 14) return 'low';
            return 'low';
        }
        function energyBgForHour(h) {
            const e = getEnergyForHour(h);
            if (e === 'high') return 'bg-emerald-50 border-emerald-200/60';
            if (e === 'medium') return 'bg-amber-50 border-amber-200/60';
            return 'bg-red-50 border-red-200/60';
        }
        function minutesToTimeStr(mins) {
            let h = Math.floor(mins / 60);
            let m = mins % 60;
            const ampm = h >= 12 ? 'PM' : 'AM';
            let dh = h % 12; if (dh === 0) dh = 12;
            return `${String(dh).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}`;
        }
        function timeStrToMinutes(tStr) {
            const parts = tStr.split(':');
            let h = parseInt(parts[0]);
            let m = parseInt(parts[1]) || 0;
            if (tStr.includes('PM') && h !== 12) h += 12;
            if (tStr.includes('AM') && h === 12) h = 0;
            return h * 60 + m;
        }
        function minutesTo24(mins) {
            let h = Math.floor(mins/60); let m = mins%60;
            return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
        }
        function time24ToMinutes(val) {
            const [hh, mm] = val.split(':').map(Number);
            return (hh||0)*60 + (mm||0);
        }
        function formatDateForDisplay(ds) {
            const d = new Date(ds + 'T00:00:00');
            return d.toLocaleString('default', { weekday:'short', month:'short', day:'numeric' });
        }
        function findInitialGreenSlot() {
            const ref = new Date(calYear, calMonth, calDate);
            const sunday = getSunday(ref);
            const greenHours = [9,10,11,12];
            for (let i=0;i<7;i++) {
                const d = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate()+i);
                const ds = formatDateStr(d.getFullYear(), d.getMonth(), d.getDate());
                for (const h of greenHours) {
                    const evs = getCalEventsForDate(ds);
                    const occupied = evs.some(e => Math.floor(timeStrToMinutes(e.time)/60) === h);
                    if (!occupied) return { date: ds, time: minutesToTimeStr(h*60), minutes: h*60 };
                }
            }
            const todayStr = formatDateStr(calYear, calMonth, calDate);
            return { date: todayStr, time: '11:00 AM', minutes: 11*60 };
        }
        function startPlacement() {
            if (!pendingPlacement) return;
            isPlacementMode = true;
            const init = findInitialGreenSlot();
            placementGhost = { date: init.date, time: init.time, minutes: init.minutes };
            // Align calendar to ghost's week
            const gd = new Date(placementGhost.date + 'T00:00:00');
            calYear = gd.getFullYear(); calMonth = gd.getMonth(); calDate = gd.getDate();
            renderCalWeek(calYear, calMonth, calDate);
            updatePlacementBar();
            const bar = document.getElementById('placementBar');
            if (bar) bar.classList.remove('hidden');
            const timeInput = document.getElementById('placementTimeInput');
            if (timeInput) {
                timeInput.value = minutesTo24(placementGhost.minutes);
                timeInput.oninput = handlePlacementTimeChange;
                timeInput.onchange = handlePlacementTimeChange;
            }
        }
        function handlePlacementTimeChange(e) {
            const val = e.target.value;
            if (!val || !placementGhost) return;
            const mins = time24ToMinutes(val);
            placementGhost.minutes = mins;
            placementGhost.time = minutesToTimeStr(mins);
            updatePlacementBar();
            renderCalWeek(calYear, calMonth, calDate);
            const en = getEnergyForHour(Math.floor(mins/60));
            if (en === 'low') showAppToast('⚠️ Low energy zone — focus may be lower');
        }
        function moveGhostTo(dateStr, hour) {
            if (!isPlacementMode || !pendingPlacement) return;
            const prevMins = placementGhost ? placementGhost.minutes % 60 : 0;
            const mins = hour * 60 + prevMins;
            placementGhost = { date: dateStr, time: minutesToTimeStr(mins), minutes: mins };
            const gd = new Date(dateStr + 'T00:00:00');
            calYear = gd.getFullYear(); calMonth = gd.getMonth(); calDate = gd.getDate();
            updatePlacementBar();
            const timeInput = document.getElementById('placementTimeInput');
            if (timeInput) timeInput.value = minutesTo24(mins);
            renderCalWeek(calYear, calMonth, calDate);
            const en = getEnergyForHour(hour);
            if (en === 'low') showAppToast('⚠️ Low energy — placed in red zone');
        }
        function updatePlacementBar() {
            const titleEl = document.getElementById('placementBarTitle');
            const metaEl = document.getElementById('placementBarMeta');
            const warningEl = document.getElementById('placementWarning');
            if (!titleEl || !metaEl || !pendingPlacement || !placementGhost) return;
            titleEl.textContent = `${pendingPlacement.title} · ${pendingPlacement.durationText}`;
            const energy = getEnergyForHour(Math.floor(placementGhost.minutes/60));
            const energyLabel = energy === 'high' ? 'High energy ✓' : energy === 'medium' ? 'Medium' : 'Low energy';
            const dot = energy === 'high' ? '🟢' : energy === 'medium' ? '🟡' : '🔴';
            metaEl.textContent = `${formatDateForDisplay(placementGhost.date)} · ${placementGhost.time} ${dot} ${energyLabel} — tap any slot to move`;
            if (warningEl) {
                if (energy === 'low') warningEl.classList.remove('hidden');
                else warningEl.classList.add('hidden');
            }
        }
        function confirmPlacement() {
            if (!pendingPlacement || !placementGhost) return;
            const { title, type, location, durationText } = pendingPlacement;
            const { date, time } = placementGhost;
            const colorMapping = {
                focus: { badgeText: 'Smart Slotted', badgeClass: 'bg-[#F3E8FF] text-[#7E22CE] border border-[#DDD6FE]', badgeIcon: '✦', cardClass: 'bg-white border border-purple-200/80 shadow-sm', nodeClass: 'bg-[#8B5CF6] ring-4 ring-[#F5F3FF]', metaClass: 'text-[#7E22CE] font-bold', icon: '💻' },
                fixed: { badgeText: 'Fixed Event', badgeClass: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70', badgeDot: '•', cardClass: 'bg-white border border-blue-100/80 shadow-sm', nodeClass: 'bg-[#2563EB] ring-4 ring-[#EFF6FF]', icon: '📚' },
                recovery: { badgeText: 'Recovery', badgeClass: 'bg-[#065F46] text-white font-bold', badgeIcon: '🌿', cardClass: 'bg-[#E8F8F0] border border-[#A7F3D0] shadow-sm', nodeClass: 'bg-[#059669] ring-4 ring-[#E6F8F0]', metaClass: 'text-[#059669] font-bold', titleClass: 'text-[#064E3B]', isProgress: true, progressPercent: 70, progressBarClass: 'bg-[#059669]', progressTrackClass: 'bg-white/80', progressLabelClass: 'text-[#059669] font-bold', progressLabel: 'Restoring', icon: '🧘' },
                sport: { badgeText: 'Fixed Event', badgeClass: 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/70', badgeDot: '•', cardClass: 'bg-white border border-blue-100/80 shadow-sm', nodeClass: 'bg-[#2563EB] ring-4 ring-[#EFF6FF]', icon: '🏸' }
            };
            const config = colorMapping[type] || colorMapping.focus;
            const newEvent = {
                date, title, time,
                location: location ? (location.startsWith('📍') ? location : `📍 ${location}`) : '📍 Campus',
                type, icon: config.icon || '📌',
                badgeText: config.badgeText, badgeClass: config.badgeClass, badgeDot: config.badgeDot, badgeIcon: config.badgeIcon,
                cardClass: config.cardClass, nodeClass: config.nodeClass, metaClass: config.metaClass, titleClass: config.titleClass,
                isProgress: config.isProgress, progressPercent: config.progressPercent, progressBarClass: config.progressBarClass, progressTrackClass: config.progressTrackClass, progressLabelClass: config.progressLabelClass, progressLabel: config.progressLabel,
                durationText
            };
            calEvents.push(newEvent);
            // If today, update Today list
            const todayStr = formatDateStr(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            if (date === todayStr) {
                const list = document.getElementById('todayScheduleList');
                if (list && typeof renderTodayScheduleDynamic === 'function') {
                    // Use datetime.js helper if available, else simple push
                    try { renderTodayScheduleDynamic(); } catch(e) {}
                }
            }
            isPlacementMode = false;
            pendingPlacement = null;
            placementGhost = null;
            const bar = document.getElementById('placementBar');
            if (bar) bar.classList.add('hidden');
            closePlacementAgent();
            renderCalWeek(calYear, calMonth, calDate);
            renderCalDay(calYear, calMonth, calDate);
            renderCalMonth(calYear, calMonth);
            // Update Today header
            try { if (typeof updateTodayHeader === 'function') updateTodayHeader(); } catch(e) {}
            showAppToast(`✓ Placed: "${title}" at ${time}`);
        }
        function cancelPlacement() {
            isPlacementMode = false;
            pendingPlacement = null;
            placementGhost = null;
            const bar = document.getElementById('placementBar');
            if (bar) bar.classList.add('hidden');
            closePlacementAgent();
            renderCalWeek(calYear, calMonth, calDate);
            showAppToast('Placement cancelled');
        }
        function handleWeekDayPlacementOrSelect(year, month, date) {
            if (isPlacementMode) {
                const ds = formatDateStr(year, month, date);
                const h = placementGhost ? Math.floor(placementGhost.minutes/60) : 11;
                moveGhostTo(ds, h);
            } else {
                selectWeekDay(year, month, date);
            }
        }
        function handleGhostDragStart(e, dateStr, hour) {
            e.dataTransfer.setData('text/plain', dateStr + '|' + hour);
            e.dataTransfer.effectAllowed = 'move';
        }
        function handleGhostDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }
        function handleGhostDrop(e, dateStr, hour) {
            e.preventDefault();
            moveGhostTo(dateStr, hour);
        }
        function handleGhostTouchStart(e, dateStr, hour) {
            // Tap ghost to keep it, actual move is via tapping empty cells
        }

        // ===== Placement Agent Chat (pop-out from placement bar) =====
        function togglePlacementAgent() {
            const panel = document.getElementById('placementAgentPanel');
            if (!panel) return;
            const isHidden = panel.classList.contains('hidden');
            if (isHidden) openPlacementAgent();
            else closePlacementAgent();
        }
        function openPlacementAgent() {
            const panel = document.getElementById('placementAgentPanel');
            const msgs = document.getElementById('placementAgentMessages');
            if (!panel || !msgs) return;
            panel.classList.remove('hidden');
            panel.classList.remove('pointer-events-none');
            // Hide bottom nav dock while agent pop-out is open
            const navDock = document.querySelector('[data-purpose="bottom-navigation-container"]');
            if (navDock) { navDock.classList.add('hidden'); navDock.classList.remove('flex'); }
            if (msgs.children.length === 0 && pendingPlacement && placementGhost) {
                const energy = getEnergyForHour(Math.floor(placementGhost.minutes/60));
                const initMsg = `I see you're placing "${pendingPlacement.title}" (${pendingPlacement.durationText}) at ${placementGhost.time} on ${formatDateForDisplay(placementGhost.date)} — that's a ${energy === 'high' ? 'high-energy ✓' : energy === 'low' ? 'low-energy' : 'medium'} slot. Current day has ${getCalEventsForDate(placementGhost.date).length} tasks. Want me to suggest the best green slot?`;
                appendPlacementAgentMessage(initMsg, 'agent');
                setTimeout(() => appendPlacementAgentMessage('Tap any green slot (09-12) to move ghost, or ask "which is best for focus?"', 'agent'), 700);
            }
            setTimeout(() => { const inp=document.getElementById('placementAgentInput'); if(inp) inp.focus(); }, 150);
            // Highlight agent button
            const btn=document.getElementById('placementAgentBtn');
            if(btn) btn.classList.add('ring-2','ring-white/50');
        }
        function closePlacementAgent() {
            const panel = document.getElementById('placementAgentPanel');
            if (!panel) return;
            panel.classList.add('hidden');
            panel.classList.add('pointer-events-none');
            // Show bottom nav dock again
            const navDock = document.querySelector('[data-purpose="bottom-navigation-container"]');
            if (navDock) { navDock.classList.remove('hidden'); navDock.classList.add('flex'); }
            const btn=document.getElementById('placementAgentBtn');
            if(btn) btn.classList.remove('ring-2','ring-white/50');
        }
        function appendPlacementAgentMessage(text, sender) {
            const msgs = document.getElementById('placementAgentMessages');
            if (!msgs) return;
            const isUser = sender === 'user';
            const div = document.createElement('div');
            div.className = isUser ? 'flex justify-end' : 'flex justify-start';
            const safe = (function(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; })(text);
            div.innerHTML = isUser ? `<div class="bg-[#2563EB] text-white rounded-2xl rounded-tr-md px-3 py-2 text-[12px] max-w-[78%] shadow-sm">${safe}</div>` : `<div class="bg-white border border-black/5 rounded-2xl rounded-tl-md px-3 py-2 text-[12px] text-[#1C1C1E] max-w-[78%] shadow-sm">${safe}</div>`;
            msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        }
        function sendPlacementAgentMessage() {
            const inp = document.getElementById('placementAgentInput');
            if (!inp) return;
            const text = inp.value.trim();
            if (!text) return;
            appendPlacementAgentMessage(text, 'user');
            inp.value = '';
            setTimeout(() => {
                const reply = getPlacementAgentReply(text);
                appendPlacementAgentMessage(reply, 'agent');
            }, 600);
        }
        function getPlacementAgentReply(input) {
            const lower = input.toLowerCase();
            if (lower.includes('best') || lower.includes('where') || lower.includes('when') || lower.includes('suggest')) {
                const ref = new Date(calYear, calMonth, calDate);
                const sunday = getSunday(ref);
                for (let i=0;i<7;i++) {
                    const d = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate()+i);
                    const ds = formatDateStr(d.getFullYear(), d.getMonth(), d.getDate());
                    for (const h of [9,10,11]) {
                        const evs = getCalEventsForDate(ds);
                        const occupied = evs.some(e => Math.floor(timeStrToMinutes(e.time)/60) === h);
                        if (!occupied) return `Best is ${formatDateForDisplay(ds)} at ${minutesToTimeStr(h*60)} — green high-energy and free. Tap that cell to move ghost there.`;
                    }
                }
                return `All green slots busy this week, but ${formatDateForDisplay(placementGhost.date)} at ${placementGhost.time} is ${getEnergyForHour(Math.floor(placementGhost.minutes/60))}. Want me to check next week?`;
            }
            if (lower.includes('energy') || lower.includes('green') || lower.includes('red')) {
                return `Green 09-12 = peak focus (high), amber 08/15-16 = medium, red 13-14 = low dip. Your ghost at ${placementGhost.time} is ${getEnergyForHour(Math.floor(placementGhost.minutes/60))}. Drag to green for best focus.`;
            }
            if (lower.includes('move') || lower.includes('place') || lower.includes('tuesday') || lower.includes('monday') || lower.includes('wednesday')) {
                return `Tell me like "Tuesday 10am" and I'll move ghost, or just tap the weekly grid. Current: ${formatDateForDisplay(placementGhost.date)} ${placementGhost.time}.`;
            }
            return `Got it. Placing "${pendingPlacement.title}" (${pendingPlacement.durationText}) at ${placementGhost.time}. Ask "which is best for focus?" for suggestion.`;
        }

        // ===== Capacity Agent Chat (pop-out from capacity check-in) =====
        function toggleCapacityAgent() {
            const panel = document.getElementById('capacityAgentPanel');
            if (!panel) return;
            const isHidden = panel.classList.contains('hidden');
            if (isHidden) openCapacityAgent();
            else closeCapacityAgent();
        }
        function openCapacityAgent() {
            const panel = document.getElementById('capacityAgentPanel');
            const msgs = document.getElementById('capacityAgentMessages');
            if (!panel || !msgs) return;
            panel.classList.remove('hidden');
            panel.classList.remove('pointer-events-none');
            const navDock = document.querySelector('[data-purpose="bottom-navigation-container"]');
            if (navDock) { navDock.classList.add('hidden'); navDock.classList.remove('flex'); }
            if (msgs.children.length === 0) {
                const titleEl = document.querySelector('[data-purpose="event-overview-banner"] h2');
                const eventTitle = titleEl ? titleEl.textContent.trim() : 'this activity';
                const mVal = document.getElementById('mental-slider') ? document.getElementById('mental-slider').value : '8';
                const pVal = document.getElementById('physical-slider') ? document.getElementById('physical-slider').value : '7';
                appendCapacityAgentMessage(`How's your event? Share with me how "${eventTitle}" went — what felt good, what was tough?`, 'agent');
                setTimeout(() => appendCapacityAgentMessage('Share anything — e.g. "Focus was great but I felt drained after 30m"', 'agent'), 700);
            }
            setTimeout(() => { const inp=document.getElementById('capacityAgentInput'); if(inp) inp.focus(); }, 150);
        }
        function closeCapacityAgent() {
            const panel = document.getElementById('capacityAgentPanel');
            if (!panel) return;
            panel.classList.add('hidden');
            panel.classList.add('pointer-events-none');
            const navDock = document.querySelector('[data-purpose="bottom-navigation-container"]');
            if (navDock) { navDock.classList.remove('hidden'); navDock.classList.add('flex'); }
            // Also ensure capacity modal's nav dock handling (capacity modal is fullscreen, so nav already hidden, but restore)
        }
        function appendCapacityAgentMessage(text, sender) {
            const msgs = document.getElementById('capacityAgentMessages');
            if (!msgs) return;
            const isUser = sender === 'user';
            const div = document.createElement('div');
            div.className = isUser ? 'flex justify-end' : 'flex justify-start';
            const safe = (function(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; })(text);
            div.innerHTML = isUser ? `<div class="bg-[#2563EB] text-white rounded-2xl rounded-tr-md px-3 py-2 text-[12px] max-w-[78%] shadow-sm">${safe}</div>` : `<div class="bg-white border border-black/5 rounded-2xl rounded-tl-md px-3 py-2 text-[12px] text-[#1C1C1E] max-w-[78%] shadow-sm">${safe}</div>`;
            msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        }
        function sendCapacityAgentMessage() {
            const inp = document.getElementById('capacityAgentInput');
            if (!inp) return;
            const text = inp.value.trim();
            if (!text) return;
            appendCapacityAgentMessage(text, 'user');
            inp.value = '';
            setTimeout(() => {
                const reply = getCapacityAgentReply(text);
                appendCapacityAgentMessage(reply, 'agent');
            }, 600);
        }
        function getCapacityAgentReply(input) {
            const lower = input.toLowerCase();
            if (lower.includes('tired') || lower.includes('drained') || lower.includes('low') || lower.includes('hard')) {
                return `Thanks for sharing — low energy after 30m is common in a high mental load session. Want me to suggest a shorter 25m sprint + 5m recharge for next time, or a recovery block after?`;
            }
            if (lower.includes('great') || lower.includes('good') || lower.includes('focused') || lower.includes('high')) {
                return `Awesome — high focus is a great sign! Your 8.5 mental peak is paying off. Should I keep the next block at 90m or stretch to 100m?`;
            }
            if (lower.includes('group') || lower.includes('social') || lower.includes('collab')) {
                return `Love that — social energy at 6/10 suggests you recharged well. Want me to schedule a collaborative slot next?`;
            }
            if (lower.includes('physical') || lower.includes('sport') || lower.includes('energy')) {
                return `Noted — physical 7.8 steady is solid. I can rebalance your afternoon to protect that. How did the physical part feel?`;
            }
            return `Thanks for sharing! I'll remember this for your next calibration. Want to tell me one thing that clicked and one that was tough?`;
        }

        // ============================================================
        // Post-Event Reflection Modal Logic
        // ============================================================
        const reflectionModal = document.getElementById('reflectionModal');
        const reflectionSheet = document.getElementById('reflectionSheet');
        const reflectionTextarea = document.getElementById('reflectionTextarea');
        const reflectionEventSubtitle = document.getElementById('reflectionEventSubtitle');
        let activeReflectionContext = null;

        function openReflectionModal() {
            if (!reflectionModal || !reflectionSheet) return;
            reflectionModal.classList.remove('pointer-events-none', 'opacity-0');
            reflectionModal.classList.add('pointer-events-auto', 'opacity-100');
            reflectionSheet.classList.remove('translate-y-full');
            reflectionSheet.classList.add('translate-y-0');
            if (reflectionTextarea) {
                setTimeout(() => reflectionTextarea.focus(), 150);
            }
        }

        function closeReflectionModal() {
            if (!reflectionModal || !reflectionSheet) return;
            reflectionSheet.classList.remove('translate-y-0');
            reflectionSheet.classList.add('translate-y-full');
            reflectionModal.classList.remove('opacity-100');
            reflectionModal.classList.add('opacity-0');
            setTimeout(() => {
                reflectionModal.classList.remove('pointer-events-auto');
                reflectionModal.classList.add('pointer-events-none');
                activeReflectionContext = null;
            }, 300);
        }

        function appendReflectionTag(tag) {
            if (!reflectionTextarea) return;
            if (reflectionTextarea.value.trim().length > 0) {
                reflectionTextarea.value += ' ' + tag;
            } else {
                reflectionTextarea.value = tag + ' - ';
            }
            reflectionTextarea.focus();
        }

        function openReflectionForElement(el) {
            if (!el) return;
            const titleEl = el.querySelector('.task-title');
            const taskTitle = titleEl ? titleEl.textContent.trim() : 'Event';
            if (reflectionEventSubtitle) reflectionEventSubtitle.textContent = `Completed: ${taskTitle}`;
            
            const existingText = el.dataset.reflection || '';
            if (reflectionTextarea) reflectionTextarea.value = existingText;
            
            activeReflectionContext = { type: 'element', el: el };
            openReflectionModal();
        }

        function openReflectionForCalendarEvent(title, date, time) {
            if (reflectionEventSubtitle) reflectionEventSubtitle.textContent = `${title} (${time})`;
            
            const ev = calEvents.find(e => e.title === title && e.date === date);
            const existingText = ev && ev.reflection ? ev.reflection : '';
            if (reflectionTextarea) reflectionTextarea.value = existingText;
            
            activeReflectionContext = { type: 'calendar', title, date, time };
            openReflectionModal();
        }

        function handleSaveReflection(e) {
            if (e) e.preventDefault();
            const text = reflectionTextarea ? reflectionTextarea.value.trim() : '';

            if (activeReflectionContext) {
                if (activeReflectionContext.type === 'element' && activeReflectionContext.el) {
                    const el = activeReflectionContext.el;
                    el.dataset.reflection = text;
                    const container = el.querySelector('.task-reflection-container');
                    const textP = el.querySelector('.task-reflection-text');
                    if (container && textP) {
                        if (text) {
                            textP.textContent = `"${text}"`;
                            container.classList.remove('hidden');
                        } else {
                            container.classList.add('hidden');
                        }
                    }
                } else if (activeReflectionContext.type === 'calendar') {
                    const { title, date } = activeReflectionContext;
                    const ev = calEvents.find(item => item.title === title && item.date === date);
                    if (ev) {
                        ev.reflection = text;
                        if (calView === 'day') renderCalDay(calYear, calMonth, calDate);
                    }
                }
            }

            showAppToast('Reflection saved ✨');
            closeReflectionModal();
        }

        // ============================================================
        // Capacity Check-In Modal / Calibration Logic
        // ============================================================
        const capacityCheckinModal = document.getElementById('capacityCheckinModal');

        function openCapacityCheckinModal() {
            if (!capacityCheckinModal) return;
            capacityCheckinModal.classList.remove('pointer-events-none', 'opacity-0', 'translate-y-full');
            capacityCheckinModal.classList.add('pointer-events-auto', 'opacity-100', 'translate-y-0');
        }

        function closeCapacityCheckinModal() {
            if (!capacityCheckinModal) return;
            capacityCheckinModal.classList.remove('pointer-events-auto', 'opacity-100', 'translate-y-0');
            capacityCheckinModal.classList.add('pointer-events-none', 'opacity-0', 'translate-y-full');
            closeCapacityAgent();
        }

        function updateCheckinSlider(type, val) {
            const numVal = parseFloat(val).toFixed(1);
            if (type === 'mental') {
                const badge = document.getElementById('mental-val-badge');
                if (badge) {
                    const status = val >= 8.5 ? 'Peak' : (val >= 6.5 ? 'High' : (val >= 4 ? 'Baseline' : 'Foggy'));
                    badge.innerHTML = `${numVal} <span class="text-[9px] font-medium text-indigo-500">/ 10 · ${status}</span>`;
                }
            } else if (type === 'physical') {
                const badge = document.getElementById('physical-val-badge');
                if (badge) {
                    const status = val >= 8.5 ? 'Energized' : (val >= 6.5 ? 'Steady' : (val >= 4 ? 'Moderate' : 'Drained'));
                    badge.innerHTML = `${numVal} <span class="text-[9px] font-medium text-emerald-500">/ 10 · ${status}</span>`;
                }
            } else if (type === 'social') {
                const badge = document.getElementById('social-val-badge');
                if (badge) {
                    const status = val >= 8 ? 'Collaborative' : (val >= 5.5 ? 'Moderate' : (val >= 4 ? 'Reserved' : 'Solo only'));
                    badge.innerHTML = `${numVal} <span class="text-[9px] font-medium text-amber-500">/ 10 · ${status}</span>`;
                }
            }
        }

        function toggleContextTag(btn) {
            if (!btn) return;
            const isActive = btn.classList.contains('bg-neutral-900');
            if (isActive) {
                btn.classList.remove('bg-neutral-900', 'text-white', 'border-neutral-900');
                btn.classList.add('bg-white', 'text-neutral-800', 'border-neutral-200/70');
            } else {
                btn.classList.remove('bg-white', 'text-neutral-800', 'border-neutral-200/70');
                btn.classList.add('bg-neutral-900', 'text-white', 'border-neutral-900');
            }
        }

        function handleSaveCapacityCheckin() {
            const mentalInput = document.getElementById('mental-slider');
            const physicalInput = document.getElementById('physical-slider');
            const socialInput = document.getElementById('social-slider');

            const mVal = mentalInput ? parseFloat(mentalInput.value).toFixed(1) : '8.0';
            const pVal = physicalInput ? parseFloat(physicalInput.value).toFixed(1) : '7.5';
            const sVal = socialInput ? parseFloat(socialInput.value).toFixed(1) : '5.0';

            // Update Today screen Energy Capacity numbers
            const todayM = document.getElementById('todayMentalVal');
            const todayP = document.getElementById('todayPhysicalVal');
            const todayS = document.getElementById('todaySocialVal');
            if (todayM) todayM.textContent = mVal;
            if (todayP) todayP.textContent = pVal;
            if (todayS) todayS.textContent = sVal;

            const badgeM = document.getElementById('todayMentalBadge');
            const badgeP = document.getElementById('todayPhysicalBadge');
            const badgeS = document.getElementById('todaySocialBadge');
            if (badgeM) badgeM.textContent = mVal >= 8 ? 'Peak' : 'Steady';
            if (badgeP) badgeP.textContent = pVal >= 7 ? 'Steady' : 'Low';
            if (badgeS) badgeS.textContent = sVal >= 6 ? 'Social' : 'Rest';

            showAppToast('✓ Capacity calibrated! Schedule re-balanced ✨');
            closeCapacityAgent();
            closeCapacityCheckinModal();
        }

        // Initialize Calendar & Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Render the bottom dock immediately
            renderBottomDock();

            if (calViewBtns) {
                calViewBtns.forEach(btn => {
                    btn.addEventListener('click', () => setCalView(btn.dataset.view));
                });
            }

            if (calPrevBtn) calPrevBtn.addEventListener('click', () => calNavigate(-1));
            if (calNextBtn) calNextBtn.addEventListener('click', () => calNavigate(1));

            // Default: Day view for calendar
            setCalView('day');
        });
    