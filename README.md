DAILY FLOW - USER GUIDE
========================

Daily Flow is a personal focus and scheduling app that helps you plan your
day around your actual energy levels, not just the clock. It pairs a daily
task list with an AI agent you can talk to, and a full calendar for
planning ahead.

This guide walks through every screen so a new user can pick up the app
and start using it right away.


GETTING STARTED
----------------

When you open the app you land on the Today screen. Navigation between
the four main sections happens through the dark pill-shaped dock at the
bottom of the screen:

    Icon                        Screen
    ----------------------------------------
    House                       Today
    Penguin                     AI Agent
    Black circle (center, +)    Add Task
    Calendar                    Calendar
    Person                      Profile

Tap any icon to switch screens instantly. The active tab is always
highlighted in white.


1. TODAY - YOUR DAILY OVERVIEW
--------------------------------

The Today screen is the home base of the app. From top to bottom you will
see:

Energy Capacity
    A live snapshot of how you're doing right now, broken into three
    scores out of 10:
      - Mental   -> how sharp/focused you feel
      - Physical -> your energy level
      - Social   -> your readiness for group activities

    Below the scores, a colored progress bar shows how much of your
    "optimal focus window" is still active for the day
    (e.g. "Optimal focus until 5:30 PM - 78% Active").

    TIP: Tap anywhere on the "Next Up" banner below the Energy Capacity
    card to open the Capacity Check-In, where you can log how you're
    actually feeling and get the agent's input.

Next Up Banner
    Shows your next scheduled task, its time, and location. Tap it to
    check in before the task starts.

Daily Tasks
    Your full task list for the day. Each task card shows:
      - An icon representing the task type (lecture, study, sport, etc.)
      - The task title and location
      - The scheduled time

    To complete a task: tap anywhere on the task card. The circle
    checkmark fills in, the title gets a strikethrough, and you'll see a
    confirmation toast. Right after completing a task, a reflection
    prompt pops up so you can jot down a quick note about how it went.
    Tap "Edit" on a completed task any time to add or update that
    reflection.

    To add a new task: tap "+ Add Task" next to the "Daily Tasks" header,
    or use the (+) button in the bottom dock.


2. AI AGENT - CHAT WITH YOUR PLANNER
--------------------------------------

Tap the penguin icon to open the Agent screen, a chat interface where you
can talk to your planning assistant in plain language.

What you can ask it to do:
    - "Help me plan today's study session"
        -> suggests a focus/recharge schedule based on your current
           energy window
    - "Explain entropy" (or any study topic you mention)
        -> gives a quick explanation
    - "Add a task"
        -> tell it a title and time and it will help you schedule it
    - "Summarize today"
        -> gives you a quick rundown of your day's blocks
    - "I'm tired" / "I need to recharge"
        -> suggests a short recovery break

Use the quick-action chips above the input box for one-tap common
requests (e.g. "Add to calendar", "Explain entropy"). Your conversation
stays in the chat until you tap "Clear Chat" to start fresh.


3. CALENDAR - PLAN AHEAD
--------------------------

Tap the calendar icon to see your full schedule. Three view modes are
available at the top of the screen:

    - Day   -> a single day, hour by hour
    - Week  -> a 7-day overview
    - Month -> the full month at a glance

Switch between them using the toggle at the top of the Calendar screen.
Tap any date to jump to that day's schedule.

Adding an event: tap the (+) button in the bottom dock from anywhere in
the app. It opens the Add Task modal where you choose a date (from a
dropdown of the next 7 days), a title, and a time.

Ask the agent while planning: on the Calendar screen, tap the small
floating "Ask Agent" button to get scheduling suggestions without
leaving the calendar view.


4. PROFILE - YOUR BIO & PREFERENCES
--------------------------------------

Tap the person icon to view:

    - Your profile card
          Name, program/major, and current sync status.

    - Chronobiology Baseline
          Your natural energy rhythm (e.g. "Early Peak - Lion") along
          with connected wearables (Apple Watch, Oura Ring, etc.) and
          your peak circadian focus window.

    - System Preferences
          Account, study program, and bio-sensor settings.


QUICK REFERENCE: KEY ACTIONS
-------------------------------

    I want to...                          How
    --------------------------------------------------------------------
    See today's schedule                  Open the Today tab
    Mark a task done                      Tap the task card
    Add a note to a completed task        Tap "Edit" under that task
    Add a new task                        Tap "+ Add Task" or the (+) dock button
    Ask for help planning my day          Open the Agent tab, type your request
    View my whole week/month              Open the Calendar tab, switch views
    Check in on how I'm feeling           Tap the "Next Up" banner on Today
    Update my profile / connected devices Open the Profile tab


NOTES FOR SETUP / HOSTING
----------------------------

This is a static front-end (HTML/CSS/JS) - no backend required to
preview it.

File structure:

    index.html
    css/style.css
    js/app.js               -> screen navigation, dock, task completion
    js/agent.js              -> AI agent chat logic
    js/calendar.js            -> calendar rendering (day/week/month), event data
    js/datetime.js             -> live clock, "today" date handling
    images/agent-penguin.png   -> agent mascot

To preview locally, just serve the folder with any static file server
(for example: python3 -m http.server) and open index.html in a browser.
