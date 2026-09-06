# Daily Flow — Calendar & Rhythm Prototype

A high-fidelity mobile application prototype inspired by Apple Human Interface Guidelines and modern neo-minimalist productivity tools (Linear, Notion, Endel, Rise Science).

## 🌟 Navigation Dock & Core Features

### 1. Dark Capsule Navigation Dock (Matching Reference Design)
- **Aesthetic & Finish**: Floating black pill capsule dock (`bg-[#161617]`, `rounded-full`) with an ambient drop-shadow (`shadow-dock`) and refined border glow (`border-white/10`).
- **4 Screen Destinations**:
  - 🏠 **Today** (Circadian capacity and daily focus blocks)
  - 🕒 **Rhythm** (24-hour circadian energy & alertness curve)
  - 📅 **Calendar** (Interactive Month, Week, and Day views)
  - 👤 **Profile** (Biometric sensor sync, chronotype baseline, and preferences)
- **Active Tab White Capsule Badge (Exact match to screenshot)**:
  - The currently active destination expands into a **white rounded pill** (`bg-white text-[#111111] rounded-full px-3.5 py-1.5`) enclosing both the dark icon and text label (e.g., `[ 📅 Calendar ]`).
  - Inactive destinations remain clean, minimalist gray icons (`text-[#8E8E93] hover:text-white`).

### 2. Centered Elevated `+` Floating Action Button
- **Placement**: Situated directly between the left pair of tabs (`Today`, `Rhythm`) and the right pair (`Calendar`, `Profile`).
- **Design**: Royal blue circular button (`bg-[#2563EB]`, `w-[44px] h-[44px]`) elevated above the top rim (`-mt-3.5`) with a crisp white plus sign and blue ambient shadow.
- **Action**: Tapping the `+` button directly opens the **Add Daily Task** modal sheet.

### 3. "Add Daily Task" Modal Sheet
- **iOS Bottom Sheet Modal**: Smooth upward slide-in animation with backdrop blur (`backdrop-blur-[2px]`).
- **Quick 1-Tap Presets**:
  - 💻 **Deep Focus** (Quantum Mechanics Review)
  - 📚 **Lecture** (Bio-Systems Engineering Lecture)
  - 🏸 **Workout** (Badminton Match)
  - 🧘 **Rest & Recharge** (Midday Mindfulness & Breathwork)
- **Customizable Details**:
  - **Task Title**: Custom text input with clean placeholder.
  - **Category**: Focus, Lecture, Recovery, Sport.
  - **Date & Start Time**: Dropdowns with circadian peak indicators (`11:00 AM Peak Flow ⚡`).
  - **Location**: Specific room, quiet zone, or Zoom link.
  - **Circadian Intelligence Hint**: Highlights peak cognitive flow windows.
- **Real-Time System Synchronization**:
  - Submitting prepends the new task to the **Today Daily Tasks** schedule list.
  - Updates the active task count badge (`4 Tasks` $\rightarrow$ `5 Tasks`).
  - Dynamically updates the **Calendar** (Month dots, Week time grid, Day timeline).
  - Tasks in Today can be **checked off interactively** with smooth checkmark and strikethrough animation!

---

## 🚀 How to Run

Open directly in your web browser:
```powershell
start C:\Users\User\.gemini\antigravity\scratch\daily-flow\index.html
```
No build step or Node.js server required—all styles, fonts, and scripts are completely self-contained.
