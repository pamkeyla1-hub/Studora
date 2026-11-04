/* ==========================================  
KEYCLA — Main JavaScript
   Your space. Your pace. Your progress.
   ========================================== */

// 1) Paste your Supabase project values here.
const SUPABASE_URL ="https://wlvdoekstcisatqiqqow.supabase.co"; 
const SUPABASE_KEY ="sb_publishable__9cPey1XsdLTx5gBPY0Q5w_5Dv5owQU";  
const TABLE = "studyspace_data";
const LOCAL_KEY = "Keycla-data-v1";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MODES = { focus: 25, short: 5, long: 15 };

const sb = (SUPABASE_URL && SUPABASE_KEY && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

/* ---------- Helpers ---------- */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function iconButton(symbol, label, onClick) {
  const button = el("button", "icon-button", symbol);
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.addEventListener("click", onClick);
  return button;
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 2500);
}

/* ---------- Data ---------- */
function defaults() {
  return {
    profile: {
      name: "Student", workspace: "My Workspace", theme: "light",
      accent: "#8878c9", banner: "lavender", bannerImage: "", dailyGoal: 120
    },
    tasks: [], timetable: [], goals: [], reflections: [],
    intention: "",
    focus: { date: today(), sessions: 0, minutes: 0 }
  };
}

function normalize(raw) {
  const base = defaults();
  const source = raw && typeof raw === "object" ? raw : {};
  const merged = {
    ...base, ...source,
    profile: { ...base.profile, ...(source.profile || {}) },
    focus: { ...base.focus, ...(source.focus || {}) }
  };
  ["tasks", "timetable", "goals", "reflections"].forEach(key => {
    if (!Array.isArray(merged[key])) merged[key] = [];
  });
  if (merged.focus.date !== today()) merged.focus = { date: today(), sessions: 0, minutes: 0 };
  return merged;
}

let data = defaults();
let currentUser = null;
let saveTimer = null;

function saveData() {
  if (!currentUser) return;
  try {
    localStorage.setItem(`${LOCAL_KEY}-${currentUser.id}`, JSON.stringify(data));
  } catch (error) {
    console.warn("Local backup failed:", error);
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(cloudSave, 400);
}

async function cloudSave() {
  if (!sb || !currentUser) return;
  const { error } = await sb.from(TABLE).upsert(
    { user_id: currentUser.id, data },
    { onConflict: "user_id" }
  );
  if (error) {
    console.error("Cloud save error:", error.message);
    toast("Could not sync your data. Please try again.");
  }
}

/* ---------- Navigation & modals ---------- */
function showPage(name) {
  $$(".page").forEach(page => page.classList.toggle("active", page.id === `page-${name}`));
  $$(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.page === name));
  $("#sidebar").classList.remove("open");
  window.scrollTo({ top: 0 });
}

function openModal(id) {
  const modal = $(`#${id}`);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  const first = $("input:not([type=hidden]), textarea", modal);
  if (first) setTimeout(() => first.focus(), 30);
}

function closeModal(id) {
  const modal = $(`#${id}`);
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", event => {
  const page = event.target.closest("[data-page]");
  if (page) showPage(page.dataset.page);
  const close = event.target.closest("[data-close]");
  if (close) closeModal(close.dataset.close);
  if (event.target.classList.contains("modal-overlay")) closeModal(event.target.id);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") $$(".modal-overlay.open").forEach(modal => closeModal(modal.id));
});

$("#menuToggle").addEventListener("click", () => $("#sidebar").classList.add("open"));
$("#closeSidebar").addEventListener("click", () => $("#sidebar").classList.remove("open"));
$("#editWorkspace").addEventListener("click", () => {
  showPage("settings");
  $("#workspaceInput").focus();
});

/* ---------- Profile & appearance ---------- */
function renderProfile() {
  const p = data.profile;
  const initial = (p.name.trim()[0] || "S").toUpperCase();
  $("#sidebarUserName").textContent = p.name;
  $("#workspaceName").textContent = p.workspace;
  $("#bannerTitle").textContent = `Hello, ${p.name}`;
  ["#sidebarAvatar", "#topAvatar"].forEach(id => { $(id).textContent = initial; });
  $("#workspaceAvatar").textContent = (p.workspace.trim()[0] || "S").toUpperCase();

  const root = document.documentElement.style;
  root.setProperty("--accent", p.accent);
  root.setProperty("--accent-dark", `color-mix(in srgb, ${p.accent} 80%, black)`);
  root.setProperty("--accent-soft", `color-mix(in srgb, ${p.accent} 15%, white)`);

  document.body.classList.toggle("dark-theme", p.theme === "dark");
  $("#themeToggle").textContent = p.theme === "dark" ? "☀" : "☾";

  const banner = $("#welcomeBanner");
  banner.className = `welcome-banner banner-${p.banner}`;
  const hasImage = /^https:\/\//i.test(p.bannerImage || "");
  banner.style.backgroundImage = hasImage ? `url("${encodeURI(p.bannerImage)}")` : "";
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";
  $(".banner-content", banner).classList.toggle("has-image", hasImage);

  $$(".color-swatch").forEach(s => s.classList.toggle("selected", s.dataset.color === p.accent));
  $$(".banner-swatch").forEach(s => s.classList.toggle("selected", s.dataset.banner === p.banner));
  $("#todayDate").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  $("#journalDate").textContent = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function fillSettings() {
  const p = data.profile;
  $("#userNameInput").value = p.name;
  $("#workspaceInput").value = p.workspace;
  $("#dailyGoalInput").value = p.dailyGoal;
  $("#bannerImageInput").value = p.bannerImage || "";
  $("#themeSelect").value = p.theme;
  $("#focusIntention").value = data.intention || "";
}

$("#saveProfile").addEventListener("click", () => {
  data.profile.name = $("#userNameInput").value.trim() || "Student";
  data.profile.workspace = $("#workspaceInput").value.trim() || "My Workspace";
  data.profile.dailyGoal = Math.min(720, Math.max(5, Number($("#dailyGoalInput").value) || 120));
  saveData(); renderAll(); toast("Profile saved.");
});

$$(".color-swatch").forEach(swatch => swatch.addEventListener("click", () => {
  data.profile.accent = swatch.dataset.color; renderProfile();
}));
$$(".banner-swatch").forEach(swatch => swatch.addEventListener("click", () => {
  data.profile.banner = swatch.dataset.banner; renderProfile();
}));

$("#saveAppearance").addEventListener("click", () => {
  const url = $("#bannerImageInput").value.trim();
  if (url && !/^https:\/\//i.test(url)) { toast("The banner image URL must start with https://"); return; }
  data.profile.bannerImage = url;
  saveData(); renderProfile(); toast("Appearance saved.");
});

$("#savePreferences").addEventListener("click", () => {
  data.profile.theme = $("#themeSelect").value;
  saveData(); renderProfile(); toast("Preferences saved.");
});

$("#themeToggle").addEventListener("click", () => {
  data.profile.theme = data.profile.theme === "dark" ? "light" : "dark";
  $("#themeSelect").value = data.profile.theme;
  saveData(); renderProfile();
});

/* ---------- Tasks ---------- */
function openTask(task) {
  $("#taskModalTitle").textContent = task ? "Edit task" : "New task";
  $("#taskId").value = task ? task.id : "";
  $("#taskTitle").value = task ? task.title : "";
  $("#taskSubject").value = task ? task.subject : "";
  $("#taskDue").value = task ? task.dueDate : "";
  $("#taskPriority").value = task ? task.priority : "medium";
  $("#taskType").value = task ? task.type : "homework";
  $("#taskNotes").value = task ? task.notes : "";
  openModal("taskModal");
}

$("#taskForm").addEventListener("submit", event => {
  event.preventDefault();
  const id = $("#taskId").value;
  const fields = {
    title: $("#taskTitle").value.trim(),
    subject: $("#taskSubject").value.trim() || "General",
    dueDate: $("#taskDue").value,
    priority: $("#taskPriority").value,
    type: $("#taskType").value,
    notes: $("#taskNotes").value.trim()
  };
  if (!fields.title) { toast("Please enter a task name."); return; }
  const existing = id && data.tasks.find(t => String(t.id) === id);
  if (existing) Object.assign(existing, fields);
  else data.tasks.push({ id: Date.now(), completed: false, ...fields });
  saveData(); renderAll(); closeModal("taskModal");
  toast(existing ? "Task updated." : "Task added.");
});

function renderTasks() {
  const subjects = [...new Set(data.tasks.map(t => t.subject))].sort();
  const subjectFilter = $("#subjectFilter");
  const previous = subjectFilter.value;
  subjectFilter.replaceChildren(new Option("All subjects", "all"), ...subjects.map(s => new Option(s, s)));
  subjectFilter.value = subjects.includes(previous) ? previous : "all";

  const query = $("#taskSearch").value.trim().toLowerCase();
  const status = $("#taskFilter").value;
  const subject = subjectFilter.value;

  const visible = data.tasks.filter(t =>
    (status === "all" || (status === "completed") === t.completed) &&
    (subject === "all" || t.subject === subject) &&
    (!query || `${t.title} ${t.subject} ${t.notes}`.toLowerCase().includes(query))
  );

  const list = $("#taskList");
  list.replaceChildren();
  if (!visible.length) {
    list.append(el("div", "empty-state", data.tasks.length ? "No tasks match your filters." : "No tasks yet. Add your first task to get started."));
    return;
  }

  visible.forEach(task => {
    const card = el("div", `task-card${task.completed ? " is-completed" : ""}`);
    const check = el("input", "task-check");
    check.type = "checkbox";
    check.checked = task.completed;
    check.setAttribute("aria-label", `Mark "${task.title}" as done`);
    check.addEventListener("change", () => { task.completed = check.checked; saveData(); renderAll(); });

    const main = el("div", "task-main");
    main.append(el("strong", "", task.title),
      el("small", "", [task.subject, task.dueDate && `Due ${task.dueDate}`].filter(Boolean).join(" · ")));

    const badges = el("div", "task-badges");
    badges.append(el("span", `task-badge ${task.priority}`, task.priority), el("span", "task-badge", task.type));

    const actions = el("div", "task-actions");
    actions.append(
      iconButton("✎", "Edit task", () => openTask(task)),
      iconButton("×", "Delete task", () => {
        data.tasks = data.tasks.filter(t => t.id !== task.id);
        saveData(); renderAll(); toast("Task deleted.");
      })
    );
    card.append(check, main, badges, actions);
    list.append(card);
  });
}

$("#addTaskButton").addEventListener("click", () => openTask());
$("#quickAddTask").addEventListener("click", () => openTask());
$("#taskSearch").addEventListener("input", renderTasks);
$("#taskFilter").addEventListener("change", renderTasks);
$("#subjectFilter").addEventListener("change", renderTasks);

/* ---------- Timetable ---------- */
function openSession(session) {
  $("#scheduleModalTitle").textContent = session ? "Edit session" : "Add a session";
  $("#scheduleId").value = session ? session.id : "";
  $("#scheduleSubject").value = session ? session.subject : "";
  $("#scheduleDay").value = session ? session.day : DAYS[(new Date().getDay() + 6) % 7];
  $("#scheduleStart").value = session ? session.start : "17:00";
  $("#scheduleEnd").value = session ? session.end : "18:00";
  $("#scheduleColor").value = session ? session.color : "";
  $("#scheduleDelete").hidden = !session;
  openModal("scheduleModal");
}

$("#scheduleForm").addEventListener("submit", event => {
  event.preventDefault();
  const id = $("#scheduleId").value;
  const fields = {
    subject: $("#scheduleSubject").value.trim(),
    day: $("#scheduleDay").value,
    start: $("#scheduleStart").value,
    end: $("#scheduleEnd").value,
    color: $("#scheduleColor").value
  };
  if (!fields.subject) { toast("Please enter a session name."); return; }
  if (fields.end <= fields.start) { toast("The end time must be after the start time."); return; }
  const existing = id && data.timetable.find(s => String(s.id) === id);
  if (existing) Object.assign(existing, fields);
  else data.timetable.push({ id: Date.now(), ...fields });
  saveData(); renderAll(); closeModal("scheduleModal");
  toast(existing ? "Session updated." : "Session added.");
});

$("#scheduleDelete").addEventListener("click", () => {
  const id = $("#scheduleId").value;
  data.timetable = data.timetable.filter(s => String(s.id) !== id);
  saveData(); renderAll(); closeModal("scheduleModal"); toast("Session deleted.");
});

function renderTimetable() {
  const grid = $("#timetableGrid");
  grid.replaceChildren();
  DAYS.forEach(day => {
    const column = el("div", "day-column");
    column.append(el("div", "day-title", day.slice(0, 3).toUpperCase()));
    data.timetable
      .filter(s => s.day === day)
      .sort((a, b) => a.start.localeCompare(b.start))
      .forEach(session => {
        const block = el("button", `schedule-block ${session.color || ""}`.trim());
        block.type = "button";
        block.append(el("strong", "", session.subject), el("small", "", `${session.start} – ${session.end}`));
        block.addEventListener("click", () => openSession(session));
        column.append(block);
      });
    grid.append(column);
  });
}

$("#addScheduleButton").addEventListener("click", () => openSession());
$("#quickAddSession").addEventListener("click", () => openSession());

/* ---------- Goals ---------- */
function openGoal(goal) {
  $("#goalModalTitle").textContent = goal ? "Edit goal" : "Create a goal";
  $("#goalId").value = goal ? goal.id : "";
  $("#goalTitle").value = goal ? goal.title : "";
  $("#goalDescription").value = goal ? goal.description : "";
  $("#goalTarget").value = goal ? goal.target : 10;
  $("#goalUnit").value = goal ? goal.unit : "sessions";
  $("#goalCurrent").value = goal ? goal.progress : 0;
  openModal("goalModal");
}

$("#goalForm").addEventListener("submit", event => {
  event.preventDefault();
  const id = $("#goalId").value;
  const target = Math.max(1, Number($("#goalTarget").value) || 1);
  const fields = {
    title: $("#goalTitle").value.trim(),
    description: $("#goalDescription").value.trim(),
    target,
    unit: $("#goalUnit").value.trim() || "sessions",
    progress: Math.min(target, Math.max(0, Number($("#goalCurrent").value) || 0))
  };
  if (!fields.title) { toast("Please enter a goal name."); return; }
  const existing = id && data.goals.find(g => String(g.id) === id);
  if (existing) Object.assign(existing, fields);
  else data.goals.push({ id: Date.now(), ...fields });
  saveData(); renderAll(); closeModal("goalModal");
  toast(existing ? "Goal updated." : "Goal created.");
});

function renderGoals() {
  const list = $("#goalList");
  list.replaceChildren();
  $("#achievedGoals").textContent = data.goals.filter(g => g.progress >= g.target).length;

  if (!data.goals.length) {
    list.append(el("div", "empty-state", "You have no goals yet. Set your first goal to start tracking progress."));
    return;
  }

  data.goals.forEach(goal => {
    const percent = Math.round((goal.progress / goal.target) * 100);
    const card = el("article", "goal-card");

    const header = el("div", "goal-card-header");
    const actions = el("div", "task-actions");
    actions.append(
      iconButton("✎", "Edit goal", () => openGoal(goal)),
      iconButton("×", "Delete goal", () => {
        data.goals = data.goals.filter(g => g.id !== goal.id);
        saveData(); renderAll(); toast("Goal deleted.");
      })
    );
    header.append(el("h3", "", goal.title), actions);

    const bar = el("div", "goal-progress");
    const fill = el("div");
    fill.style.width = `${percent}%`;
    bar.append(fill);

    const footer = el("div", "goal-footer");
    const step = amount => () => {
      goal.progress = Math.min(goal.target, Math.max(0, goal.progress + amount));
      saveData(); renderAll();
    };
    const buttons = el("div", "task-actions");
    buttons.append(iconButton("−", "Decrease progress", step(-1)), iconButton("+", "Increase progress", step(1)));
    footer.append(el("span", "", `${goal.progress} / ${goal.target} ${goal.unit} · ${percent}%`), buttons);

    card.append(header);
    if (goal.description) card.append(el("p", "", goal.description));
    card.append(bar, footer);
    list.append(card);
  });
}

$("#addGoalButton").addEventListener("click", () => openGoal());
$("#quickAddGoal").addEventListener("click", () => openGoal());

/* ---------- Focus timer ---------- */
let timerMode = "focus";
let remaining = MODES.focus * 60;
let endAt = 0;
let tick = null;

function drawTimer() {
  const text = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  $("#timerDisplay").textContent = text;
  document.title = tick ? `${text} · STUDORA` : "STUDORA — Your Study Space";
}

function stopTimer() {
  clearInterval(tick);
  tick = null;
  $("#timerStart").textContent = "Start";
}

function setMode(mode) {
  timerMode = mode;
  stopTimer();
  remaining = MODES[mode] * 60;
  $$(".mode-button").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  drawTimer();
}

function finishTimer() {
  stopTimer();
  if (timerMode === "focus") {
    data = normalize(data);
    data.focus.sessions += 1;
    data.focus.minutes += MODES.focus;
    saveData(); renderAll();
  }
  toast(timerMode === "focus" ? "Session completed. Well done!" : "Break over. Ready to focus?");
  remaining = MODES[timerMode] * 60;
  drawTimer();
}

$("#timerStart").addEventListener("click", () => {
  if (tick) { stopTimer(); drawTimer(); return; }
  endAt = Date.now() + remaining * 1000;
  tick = setInterval(() => {
    remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    drawTimer();
    if (remaining === 0) finishTimer();
  }, 250);
  $("#timerStart").textContent = "Pause";
});

$("#timerReset").addEventListener("click", () => setMode(timerMode));
$$(".mode-button").forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));

$("#saveIntention").addEventListener("click", () => {
  data.intention = $("#focusIntention").value.trim();
  saveData(); toast("Intention saved.");
});

/* ---------- Weekly reflection ---------- */
$("#saveJournal").addEventListener("click", () => {
  const entry = {
    id: Date.now(), date: today(),
    wins: $("#journalWins").value.trim(),
    challenges: $("#journalChallenges").value.trim(),
    next: $("#journalNext").value.trim()
  };
  if (!entry.wins && !entry.challenges && !entry.next) { toast("Write something before saving."); return; }
  data.reflections.push(entry);
  ["#journalWins", "#journalChallenges", "#journalNext"].forEach(id => { $(id).value = ""; });
  saveData(); renderAll();
  $("#journalMessage").textContent = "Reflection saved.";
  setTimeout(() => { $("#journalMessage").textContent = ""; }, 2500);
});

function renderJournal() {
  const box = $("#journalHistory");
  box.replaceChildren();
  box.hidden = !data.reflections.length;
  if (!data.reflections.length) return;
  box.append(el("h3", "", "Past reflections"));
  [...data.reflections].reverse().forEach(entry => {
    const item = el("div", "journal-entry");
    const top = el("div", "goal-footer");
    top.append(el("small", "", entry.date), iconButton("×", "Delete reflection", () => {
      data.reflections = data.reflections.filter(r => r.id !== entry.id);
      saveData(); renderAll();
    }));
    item.append(top);
    [["Went well", entry.wins], ["Challenges", entry.challenges], ["Next week", entry.next]].forEach(([label, text]) => {
      if (!text) return;
      item.append(el("h4", "", label), el("p", "", text));
    });
    box.append(item);
  });
}

/* ---------- Dashboard ---------- */
function renderDashboard() {
  const total = data.tasks.length;
  const done = data.tasks.filter(t => t.completed).length;
  const pending = total - done;
  const goal = data.profile.dailyGoal;
  const minutes = data.focus.minutes;
  const percent = Math.min(100, Math.round((minutes / goal) * 100));

  $("#totalTasks").textContent = total;
  $("#completedTasks").textContent = done;
  $("#pendingTasks").textContent = pending;
  $("#sidebarTaskCount").textContent = pending;
  $("#dailyTargetValue").textContent = goal;
  $("#dailyProgressLabel").textContent = `${percent}%`;
  $("#dailyProgressBar").style.width = `${percent}%`;
  $("#remainingToday").textContent = Math.max(0, goal - minutes);
  $("#focusSessions").textContent = data.focus.sessions;
  $("#focusMinutes").textContent = minutes;

  const tasksBox = $("#dashboardTasks");
  tasksBox.replaceChildren();
  const upcoming = data.tasks.filter(t => !t.completed)
    .sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999")).slice(0, 4);
  if (!upcoming.length) tasksBox.append(el("div", "empty-state", "Nothing pending. Enjoy the calm."));
  upcoming.forEach(task => {
    const row = el("div", "preview-task");
    const text = el("div");
    text.append(el("strong", "", task.title), el("small", "", [task.subject, task.dueDate].filter(Boolean).join(" · ")));
    row.append(el("span", "preview-dot"), text);
    tasksBox.append(row);
  });

  const scheduleBox = $("#dashboardSchedule");
  scheduleBox.replaceChildren();
  const todayName = DAYS[(new Date().getDay() + 6) % 7];
  const sessions = data.timetable.filter(s => s.day === todayName).sort((a, b) => a.start.localeCompare(b.start));
  if (!sessions.length) scheduleBox.append(el("div", "empty-state", "No sessions planned today."));
  sessions.forEach(session => {
    const row = el("div", "schedule-preview-item");
    const text = el("div");
    text.append(el("strong", "", session.subject), el("small", "", `${session.start} – ${session.end}`));
    row.append(el("span", "preview-dot"), text);
    scheduleBox.append(row);
  });
}

function renderAll() {
  renderProfile();
  renderTasks();
  renderTimetable();
  renderGoals();
  renderJournal();
  renderDashboard();
}

/* ---------- Export / import / reset ---------- */
$("#exportData").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const link = el("a");
  link.href = url;
  link.download = "studora-backup.json";
  link.click();
  URL.revokeObjectURL(url);
  toast("Backup exported.");
});

$("#importDataButton").addEventListener("click", () => $("#importDataInput").click());

$("#importDataInput").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported || !Array.isArray(imported.tasks) || !Array.isArray(imported.goals)) throw new Error("Invalid backup format.");
      data = normalize(imported);
      saveData(); fillSettings(); renderAll();
      toast("Backup imported.");
    } catch (error) {
      console.error(error);
      toast("This backup file is not valid.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
});

$("#resetData").addEventListener("click", () => {
  if (!confirm("Are you sure? This will erase all your STUDORA data.")) return;
  const name = data.profile.name;
  data = defaults();
  data.profile.name = name;
  saveData(); fillSettings(); renderAll();
  toast("STUDORA has been reset.");
});

/* ---------- Authentication (Supabase) ---------- */
const authScreen = $("#authScreen");
const appShell = $("#appShell");
const authMessage = $("#authMessage");

function showAuthMessage(message, isError = false) {
  authMessage.textContent = message;
  authMessage.style.color = isError ? "#d9534f" : "#548b83";
}

function showAuthForm(name) {
  $("#loginForm").hidden = name !== "login";
  $("#signupForm").hidden = name !== "signup";
  $("#recoveryForm").hidden = name !== "recovery";
  $("#authTabs").hidden = name === "recovery";
  $("#loginTab").classList.toggle("active", name === "login");
  $("#signupTab").classList.toggle("active", name === "signup");
  showAuthMessage("");
}

$("#loginTab").addEventListener("click", () => showAuthForm("login"));
$("#signupTab").addEventListener("click", () => showAuthForm("signup"));

function requireClient() {
  if (sb) return true;
  showAuthMessage("Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_KEY at the top of script.js.", true);
  return false;
}

async function withButton(form, busyLabel, task) {
  const button = $('button[type="submit"]', form);
  const label = button.textContent;
  button.disabled = true;
  button.textContent = busyLabel;
  try { await task(); }
  catch (error) { showAuthMessage(error.message, true); }
  finally { button.disabled = false; button.textContent = label; }
}

$("#signupForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!requireClient()) return;
  const name = $("#signupName").value.trim();
  const email = $("#signupEmail").value.trim();
  const password = $("#signupPassword").value;
  if (password.length < 8) { showAuthMessage("Your password must contain at least 8 characters.", true); return; }
  if (password !== $("#signupConfirmPassword").value) { showAuthMessage("Your passwords do not match.", true); return; }

  withButton(event.target, "Creating account...", async () => {
    const { data: result, error } = await sb.auth.signUp({
      email, password,
      options: { data: { full_name: name }, emailRedirectTo: window.location.origin + window.location.pathname }
    });
    if (error) throw error;
    event.target.reset();
    if (result.session) return;
    showAuthForm("login");
    showAuthMessage("Account created! Check your email to confirm your address, then log in.");
  });
});

$("#loginForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!requireClient()) return;
  withButton(event.target, "Logging in...", async () => {
    const { error } = await sb.auth.signInWithPassword({
      email: $("#loginEmail").value.trim(),
      password: $("#loginPassword").value
    });
    if (error) throw error;
  });
});

$("#forgotPassword").addEventListener("click", async () => {
  if (!requireClient()) return;
  const email = $("#loginEmail").value.trim();
  if (!email) { showAuthMessage("Enter your email address first.", true); return; }
  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });
  if (error) showAuthMessage(error.message, true);
  else showAuthMessage("Password reset instructions have been sent to your email.");
});

$("#recoveryForm").addEventListener("submit", event => {
  event.preventDefault();
  withButton(event.target, "Saving...", async () => {
    const { error } = await sb.auth.updateUser({ password: $("#newPassword").value });
    if (error) throw error;
    event.target.reset();
    showAuthForm("login");
    showAuthMessage("Password updated. You can now log in.");
    await sb.auth.signOut();
  });
});

$("#logoutButton").addEventListener("click", async () => {
  if (!sb) return;
  clearTimeout(saveTimer);
  await cloudSave();
  const { error } = await sb.auth.signOut();
  if (error) toast("Could not log out.");
});

async function loadStudentData(user) {
  currentUser = user;
  let loaded = null;

  const { data: row, error } = await sb.from(TABLE).select("data").eq("user_id", user.id).maybeSingle();
  if (error) {
    console.error(error);
    try { loaded = JSON.parse(localStorage.getItem(`${LOCAL_KEY}-${user.id}`)); } catch { loaded = null; }
    if (!loaded) {
      currentUser = null;
      showAuthMessage("Could not load your study space. Please try again.", true);
      return;
    }
    toast("Offline copy loaded. Changes will sync when possible.");
  } else if (row && row.data) {
    loaded = row.data;
  }

  const isNew = !loaded;
  data = normalize(loaded);
  if (isNew) data.profile.name = user.user_metadata?.full_name || "Student";
  if (!error && isNew) await cloudSave();

  authScreen.hidden = true;
  appShell.hidden = false;
  fillSettings();
  setMode("focus");
  renderAll();
  showPage("dashboard");
}

function showLoggedOut() {
  currentUser = null;
  data = defaults();
  stopTimer();
  appShell.hidden = true;
  authScreen.hidden = false;
  document.body.classList.remove("dark-theme");
  showAuthForm("login");
}

if (sb) {
  sb.auth.onAuthStateChange((event, session) => {
    // Defer: calling Supabase inside this callback can deadlock.
    setTimeout(async () => {
      if (event === "PASSWORD_RECOVERY") { showAuthForm("recovery"); return; }
      if (session?.user) {
        if (currentUser && currentUser.id === session.user.id) return; // token refresh, nothing to reload
        await loadStudentData(session.user);
      } else {
        showLoggedOut();
      }
    }, 0);
  });
} else {
  showAuthForm("login");
  showAuthMessage("Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_KEY at the top of script.js.", true);
}
