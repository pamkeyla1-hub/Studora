// ==========================================
// KEYCLA — Main JavaScript
// Your space. Your pace. Your progress.
// ==========================================

// 1. SUPABASE CONFIGURATION
// Keep your existing project URL and publishable key here.
// Never use your service_role / secret key in frontend code.

const SUPABASE_URL = "";
const SUPABASE_KEY = "";

const TABLE = "studyspace_data";

// Keep the previous key so existing local data can be recovered.
const LOCAL_KEY = "studora-data-v1";
const NEW_LOCAL_KEY = "keycla-data-v1";

const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday"
];

const MODES = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

const LANGUAGES = {
  en: {
    home: "Home",
    tasks: "My Tasks",
    timetable: "My Timetable",
    goals: "Goals & Progress",
    focus: "Focus Room",
    journal: "Weekly Reflection",
    settings: "Settings",
    logout: "Log out",
    newTask: "New task",
    addSession: "Add session",
    newGoal: "New goal",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    completed: "Completed",
    pending: "Pending",
    allTasks: "All tasks",
    search: "Search tasks...",
    today: "Today's timetable",
    priorities: "Tasks that need attention",
    seeAll: "See all",
    noTasks: "No tasks yet. Add your first task!",
    noSchedule: "No sessions planned for today.",
    noGoals: "No goals yet. Create your first goal!",
    noReflections: "No reflections saved yet.",
    taskSaved: "Task saved successfully.",
    taskDeleted: "Task deleted.",
    sessionSaved: "Session saved successfully.",
    goalSaved: "Goal saved successfully.",
    reflectionSaved: "Reflection saved.",
    profileSaved: "Profile updated.",
    appearanceSaved: "Appearance updated.",
    preferencesSaved: "Preferences saved.",
    dataExported: "Backup exported.",
    dataImported: "Backup imported.",
    dataReset: "Your local workspace has been reset.",
    confirmDelete: "Are you sure you want to delete this item?",
    confirmReset: "Reset all your workspace data? This cannot be undone.",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    focusComplete: "Focus session completed!",
    loginRequired: "Please log in to continue.",
    invalidEmail: "Please enter a valid email address.",
    passwordMismatch: "Your passwords do not match.",
    passwordShort: "Your password must contain at least 8 characters.",
    accountCreated: "Account created. Check your email if confirmation is required.",
    loginSuccess: "Welcome back!",
    loginError: "Unable to log in. Check your email and password.",
    signupError: "Unable to create your account.",
    emailRequired: "Please enter your email address.",
    recoverySent: "Password recovery instructions have been sent if the address is registered.",
    passwordUpdated: "Your password has been updated.",
    language: "Language"
  },

  fr: {
    home: "Accueil",
    tasks: "Mes tâches",
    timetable: "Mon emploi du temps",
    goals: "Objectifs et progrès",
    focus: "Salle de concentration",
    journal: "Réflexion hebdomadaire",
    settings: "Paramètres",
    logout: "Déconnexion",
    newTask: "Nouvelle tâche",
    addSession: "Ajouter une séance",
    newGoal: "Nouvel objectif",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    completed: "Terminées",
    pending: "En attente",
    allTasks: "Toutes les tâches",
    search: "Rechercher une tâche...",
    today: "Programme du jour",
    priorities: "Tâches à traiter",
    seeAll: "Tout voir",
    noTasks: "Aucune tâche pour le moment. Ajoute ta première tâche !",
    noSchedule: "Aucune séance prévue aujourd'hui.",
    noGoals: "Aucun objectif. Crée ton premier objectif !",
    noReflections: "Aucune réflexion enregistrée.",
    taskSaved: "Tâche enregistrée.",
    taskDeleted: "Tâche supprimée.",
    sessionSaved: "Séance enregistrée.",
    goalSaved: "Objectif enregistré.",
    reflectionSaved: "Réflexion enregistrée.",
    profileSaved: "Profil mis à jour.",
    appearanceSaved: "Apparence mise à jour.",
    preferencesSaved: "Préférences enregistrées.",
    dataExported: "Sauvegarde exportée.",
    dataImported: "Sauvegarde importée.",
    dataReset: "Ton espace local a été réinitialisé.",
    confirmDelete: "Veux-tu vraiment supprimer cet élément ?",
    confirmReset: "Réinitialiser toutes les données ? Cette action est irréversible.",
    start: "Démarrer",
    pause: "Pause",
    resume: "Reprendre",
    focusComplete: "Séance de concentration terminée !",
    loginRequired: "Connecte-toi pour continuer.",
    invalidEmail: "Saisis une adresse e-mail valide.",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
    passwordShort: "Le mot de passe doit contenir au moins 8 caractères.",
    accountCreated: "Compte créé. Vérifie ton e-mail si une confirmation est nécessaire.",
    loginSuccess: "Bon retour !",
    loginError: "Connexion impossible. Vérifie ton e-mail et ton mot de passe.",
    signupError: "Impossible de créer le compte.",
    emailRequired: "Saisis ton adresse e-mail.",
    recoverySent: "Si cette adresse est enregistrée, les instructions ont été envoyées.",
    passwordUpdated: "Ton mot de passe a été mis à jour.",
    language: "Langue"
  }
};


// ==========================================
// 2. APPLICATION STATE
// ==========================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let supabaseClient = null;
let currentUser = null;
let data = null;
let currentLanguage = localStorage.getItem("keycla-language") || "en";

let timerInterval = null;
let timerRemaining = MODES.focus;
let currentMode = "focus";
let timerRunning = false;


// ==========================================
// 3. UTILITIES
// ==========================================

function t(key) {
  return LANGUAGES[currentLanguage]?.[key] || LANGUAGES.en[key] || key;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function makeId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(
    currentLanguage === "fr" ? "fr-FR" : "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );
}

function formatTime(value) {
  return value || "";
}

function initials(name) {
  return String(name || "K")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || "")
    .join("") || "K";
}

function toast(message) {
  const element = $("#toast");
  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => {
    element.classList.remove("show");
  }, 2800);
}

function setAuthMessage(message, isError = false) {
  const element = $("#authMessage");
  if (!element) return;

  element.textContent = message;
  element.style.color = isError ? "#B96E70" : "var(--primary)";
}

function defaults() {
  return {
    profile: {
      name: "Student",
      workspace: "My Workspace",
      theme: "light",
      accent: "#542D46",
      banner: "plum",
      bannerImage: "",
      dailyGoal: 120
    },

    tasks: [],
    timetable: [],
    goals: [],
    reflections: [],

    intention: "",

    focus: {
      date: today(),
      sessions: 0,
      minutes: 0
    }
  };
}

function normalize(raw = {}) {
  const base = defaults();

  const result = {
    ...base,
    ...raw,
    profile: {
      ...base.profile,
      ...(raw.profile || {})
    },
    tasks: Array.isArray(raw.tasks) ? raw.tasks : [],
    timetable: Array.isArray(raw.timetable) ? raw.timetable : [],
    goals: Array.isArray(raw.goals) ? raw.goals : [],
    reflections: Array.isArray(raw.reflections) ? raw.reflections : [],
    focus: {
      ...base.focus,
      ...(raw.focus || {})
    }
  };

  if (result.focus.date !== today()) {
    result.focus = {
      date: today(),
      sessions: 0,
      minutes: 0
    };
  }

  return result;
}


// ==========================================
// 4. LOCAL STORAGE AND SUPABASE
// ==========================================

function readLocalData() {
  try {
    const newData = localStorage.getItem(NEW_LOCAL_KEY);
    const oldData = localStorage.getItem(LOCAL_KEY);

    const saved = newData || oldData;

    if (saved) {
      const parsed = JSON.parse(saved);
      localStorage.setItem(NEW_LOCAL_KEY, JSON.stringify(parsed));
      return normalize(parsed);
    }
  } catch (error) {
    console.error("Local data could not be read:", error);
  }

  return defaults();
}

function saveLocalData() {
  try {
    localStorage.setItem(NEW_LOCAL_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Local save failed:", error);
    toast("Unable to save local data. Check your device storage.");
  }
}

async function saveCloudData() {
  if (!supabaseClient || !currentUser || !data) return;

  const { error } = await supabaseClient
    .from(TABLE)
    .upsert({
      user_id: currentUser.id,
      data: data,
      updated_at: new Date().toISOString()
    }, {
      onConflict: "user_id"
    });

  if (error) {
    console.error("Cloud save failed:", error);
    toast("Saved on this device. Cloud sync needs attention.");
  }
}

async function saveData() {
  if (!data) return;
  saveLocalData();
  await saveCloudData();
}

async function loadStudentData(user) {
  currentUser = user;

  let cloudData = null;

  if (supabaseClient && user) {
    const { data: row, error } = await supabaseClient
      .from(TABLE)
      .select("data")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Cloud data could not be loaded:", error);
    } else if (row?.data) {
      cloudData = row.data;
    }
  }

  data = normalize(cloudData || readLocalData());

  if (cloudData) {
    saveLocalData();
  }

  await saveData();
  showApplication();
}


// ==========================================
// 5. APPLICATION STARTUP
// ==========================================

function initializeSupabase() {
  if (
    SUPABASE_URL &&
    SUPABASE_KEY &&
    window.supabase?.createClient
  ) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
  } else {
    console.warn("Supabase is not configured. Local demo mode is available.");
  }
}

function showApplication() {
  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;

  applyLanguage();
  renderAll();
  showPage("dashboard");
}

function showAuth() {
  $("#authScreen").hidden = false;
  $("#appShell").hidden = true;
  currentUser = null;
  data = null;
}

async function initializeApp() {
  initializeSupabase();

  const languageSelect = $("#languageSelect");
  if (languageSelect) languageSelect.value = currentLanguage;

  if (supabaseClient) {
    const { data: result, error } = await supabaseClient.auth.getSession();

    if (error) {
      console.error("Session error:", error);
    }

    if (result?.session?.user) {
      await loadStudentData(result.session.user);
    } else {
      showAuth();
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        showAuth();
      }

      if (event === "PASSWORD_RECOVERY") {
        showRecoveryForm();
      }

      if (event === "SIGNED_IN" && session?.user && !data) {
        loadStudentData(session.user);
      }
    });
  } else {
    // Local demonstration mode.
    data = readLocalData();
    currentUser = null;
    showApplication();
  }
}


// ==========================================
// 6. NAVIGATION
// ==========================================

function showPage(name) {
  $$(".page").forEach(page => page.classList.remove("active"));

  const target = $(`#page-${name}`);
  if (target) target.classList.add("active");

  $$(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === name);
  });

  $("#sidebar")?.classList.remove("open");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");

  if (pageButton) {
    showPage(pageButton.dataset.page);
  }

  const closeButton = event.target.closest("[data-close]");

  if (closeButton) {
    closeModal(closeButton.dataset.close);
  }
});

$("#menuToggle")?.addEventListener("click", () => {
  $("#sidebar")?.classList.add("open");
});

$("#closeSidebar")?.addEventListener("click", () => {
  $("#sidebar")?.classList.remove("open");
});

$("#editWorkspace")?.addEventListener("click", () => {
  showPage("settings");
  $("#workspaceInput")?.focus();
});


// ==========================================
// 7. MODALS
// ==========================================

function openModal(id) {
  const modal = $(`#${id}`);
  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  const firstInput = modal.querySelector(
    "input:not([type=hidden]), textarea, select"
  );

  setTimeout(() => firstInput?.focus(), 100);
}

function closeModal(id) {
  const modal = $(`#${id}`);
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$$(".modal-overlay").forEach(modal => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    $$(".modal-overlay.open").forEach(modal => closeModal(modal.id));
    $("#sidebar")?.classList.remove("open");
  }
});


// ==========================================
// 8. LANGUAGE
// ==========================================

function applyLanguage() {
  document.documentElement.lang = currentLanguage;

  const select = $("#languageSelect");
  if (select) select.value = currentLanguage;

  const translations = {
    en: {
      "Home": "Home",
      "My Tasks": "My Tasks",
      "My Timetable": "My Timetable",
      "Goals & Progress": "Goals & Progress",
      "Focus Room": "Focus Room",
      "Weekly Reflection": "Weekly Reflection",
      "Settings": "Settings",
      "Log out": "Log out",
      "Your day, at a glance.": "Your day, at a glance.",
      "Tasks that need attention": "Tasks that need attention",
      "Today's timetable": "Today's timetable",
      "Stay organized": "Stay organized"
    },
    fr: {
      "Home": "Accueil",
      "My Tasks": "Mes tâches",
      "My Timetable": "Mon emploi du temps",
      "Goals & Progress": "Objectifs et progrès",
      "Focus Room": "Salle de concentration",
      "Weekly Reflection": "Réflexion hebdomadaire",
      "Settings": "Paramètres",
      "Log out": "Déconnexion",
      "Your day, at a glance.": "Ta journée en un coup d'œil.",
      "Tasks that need attention": "Les tâches à traiter",
      "Today's timetable": "Programme du jour",
      "Stay organized": "Reste organisé"
    }
  };

  const map = translations[currentLanguage];

  // Translate navigation labels without changing their icons.
  $$(".nav-link").forEach(button => {
    const label = button.querySelector("span:not(.nav-icon):not(.nav-count)");
    if (label) {
      const original = label.dataset.original || label.textContent.trim();
      label.dataset.original = original;
      label.textContent = map[original] || original;
    }
  });

  const textNodes = document.createTreeWalker(
    document.querySelector(".content-area"),
    NodeFilter.SHOW_TEXT
  );

  const replacements = {
    "Your day, at a glance.": "Your day, at a glance.",
    "Tasks that need attention": "Tasks that need attention",
    "Today's timetable": "Today's timetable"
  };

  if (currentLanguage === "fr") {
    Object.assign(replacements, {
      "Your day, at a glance.": "Ta journée en un coup d'œil.",
      "Tasks that need attention": "Les tâches à traiter",
      "Today's timetable": "Programme du jour"
    });
  }

  let node;
  while ((node = textNodes.nextNode())) {
    const value = node.nodeValue.trim();
    if (replacements[value]) {
      node.nodeValue = node.nodeValue.replace(value, replacements[value]);
    }
  }

  renderAll();
}

$("#languageSelect")?.addEventListener("change", async (event) => {
  currentLanguage = event.target.value === "fr" ? "fr" : "en";
  localStorage.setItem("keycla-language", currentLanguage);
  applyLanguage();
});


// ==========================================
// 9. PROFILE AND APPEARANCE
// ==========================================

function renderProfile() {
  if (!data) return;

  const profile = data.profile;
  const name = profile.name || "Student";
  const workspace = profile.workspace || "My Workspace";
  const avatar = initials(name);

  $("#sidebarUserName").textContent = name;
  $("#workspaceName").textContent = workspace;

  $("#sidebarAvatar").textContent = avatar;
  $("#topAvatar").textContent = avatar;
  $("#workspaceAvatar").textContent = initials(workspace);

  $("#bannerTitle").textContent = `Hello, ${name.split(" ")[0]}!`;

  $("#userNameInput").value = name;
  $("#workspaceInput").value = workspace;
  $("#dailyGoalInput").value = profile.dailyGoal || 120;

  $("#themeSelect").value = profile.theme || "light";

  const banner = $("#welcomeBanner");
  banner.className = `welcome-banner banner-${profile.banner || "plum"}`;

  if (profile.bannerImage) {
    banner.style.backgroundImage = `linear-gradient(90deg, rgba(45,25,40,.8), rgba(45,25,40,.25)), url("${profile.bannerImage}")`;
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
  } else {
    banner.style.backgroundImage = "";
  }

  document.documentElement.style.setProperty(
    "--primary",
    profile.accent || "#542D46"
  );

  document.body.classList.toggle(
    "dark-theme",
    profile.theme === "dark"
  );

  $("#themeToggle").textContent =
    profile.theme === "dark" ? "☀" : "☾";

  $("#bannerImageInput").value = profile.bannerImage || "";

  $$(".color-swatch").forEach(swatch => {
    swatch.classList.toggle(
      "selected",
      swatch.dataset.color === profile.accent
    );
  });

  $$(".banner-swatch").forEach(swatch => {
    swatch.classList.toggle(
      "selected",
      swatch.dataset.banner === profile.banner
    );
  });
}

$("#saveProfile")?.addEventListener("click", async () => {
  const name = $("#userNameInput").value.trim();
  const workspace = $("#workspaceInput").value.trim();
  const dailyGoal = Number($("#dailyGoalInput").value);

  if (!name || !workspace) {
    toast("Please enter your name and workspace name.");
    return;
  }

  if (!Number.isFinite(dailyGoal) || dailyGoal < 5 || dailyGoal > 720) {
    toast("Daily goal must be between 5 and 720 minutes.");
    return;
  }

  data.profile.name = name;
  data.profile.workspace = workspace;
  data.profile.dailyGoal = dailyGoal;

  await saveData();
  renderProfile();
  toast(t("profileSaved"));
});

$$(".color-swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    data.profile.accent = swatch.dataset.color;
    renderProfile();
    saveData();
  });
});

$$(".banner-swatch").forEach(swatch => {
  swatch.addEventListener("click", () => {
    data.profile.banner = swatch.dataset.banner;
    data.profile.bannerImage = "";
    renderProfile();
    saveData();
  });
});

$("#saveAppearance")?.addEventListener("click", async () => {
  const image = $("#bannerImageInput").value.trim();

  if (image && !image.startsWith("https://")) {
    toast("Please use a secure HTTPS image URL.");
    return;
  }

  data.profile.bannerImage = image;
  await saveData();
  renderProfile();
  toast(t("appearanceSaved"));
});

$("#savePreferences")?.addEventListener("click", async () => {
  data.profile.theme = $("#themeSelect").value;
  await saveData();
  renderProfile();
  toast(t("preferencesSaved"));
});

$("#themeToggle")?.addEventListener("click", async () => {
  data.profile.theme =
    data.profile.theme === "dark" ? "light" : "dark";

  await saveData();
  renderProfile();
});


// ==========================================
// 10. TASKS
// ==========================================

function openTaskModal(task = null) {
  $("#taskForm").reset();

  $("#taskId").value = task?.id || "";
  $("#taskTitle").value = task?.title || "";
  $("#taskSubject").value = task?.subject || "";
  $("#taskDue").value = task?.due || "";
  $("#taskPriority").value = task?.priority || "medium";
  $("#taskType").value = task?.type || "homework";
  $("#taskNotes").value = task?.notes || "";

  $("#taskModalTitle").textContent = task ? "Edit task" : t("newTask");

  openModal("taskModal");
}

$("#addTaskButton")?.addEventListener("click", () => openTaskModal());
$("#quickAddTask")?.addEventListener("click", () => openTaskModal());

$("#taskForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = $("#taskId").value;

  const task = {
    id: id || makeId(),
    title: $("#taskTitle").value.trim(),
    subject: $("#taskSubject").value.trim(),
    due: $("#taskDue").value,
    priority: $("#taskPriority").value,
    type: $("#taskType").value,
    notes: $("#taskNotes").value.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  if (id) {
    const oldTask = data.tasks.find(item => item.id === id);
    if (oldTask) {
      task.completed = oldTask.completed;
      task.createdAt = oldTask.createdAt;
      Object.assign(oldTask, task);
    }
  } else {
    data.tasks.push(task);
  }

  await saveData();
  closeModal("taskModal");
  renderAll();
  toast(t("taskSaved"));
});

async function deleteTask(id) {
  if (!confirm(t("confirmDelete"))) return;

  data.tasks = data.tasks.filter(task => task.id !== id);
  await saveData();
  renderAll();
  toast(t("taskDeleted"));
}

async function toggleTask(id) {
  const task = data.tasks.find(item => item.id === id);
  if (!task) return;

  task.completed = !task.completed;
  await saveData();
  renderAll();
}

function renderTasks() {
  const list = $("#taskList");
  if (!list) return;

  const search = ($("#taskSearch")?.value || "").toLowerCase();
  const filter = $("#taskFilter")?.value || "all";
  const subject = $("#subjectFilter")?.value || "all";

  const subjects = [...new Set(data.tasks.map(task => task.subject).filter(Boolean))];

  const subjectSelect = $("#subjectFilter");
  const currentSubject = subjectSelect.value;

  subjectSelect.innerHTML =
    `<option value="all">${escapeHTML(t("allTasks")) === "Toutes les tâches" ? "Toutes les matières" : "All subjects"}</option>` +
    subjects.map(item =>
      `<option value="${escapeHTML(item)}">${escapeHTML(item)}</option>`
    ).join("");

  subjectSelect.value = subjects.includes(currentSubject) ? currentSubject : "all";

  let tasks = [...data.tasks];

  if (search) {
    tasks = tasks.filter(task =>
      `${task.title} ${task.subject} ${task.notes}`.toLowerCase().includes(search)
    );
  }

  if (filter === "pending") {
    tasks = tasks.filter(task => !task.completed);
  }

  if (filter === "completed") {
    tasks = tasks.filter(task => task.completed);
  }

  if (subjectSelect.value !== "all") {
    tasks = tasks.filter(task => task.subject === subjectSelect.value);
  }

  tasks.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return (a.due || "9999").localeCompare(b.due || "9999");
  });

  if (!tasks.length) {
    list.innerHTML = `<div class="panel empty-state"><p>${escapeHTML(t("noTasks"))}</p></div>`;
    return;
  }

  list.innerHTML = tasks.map(task => `
    <article class="task-item ${task.completed ? "completed" : ""}">
      <input
        type="checkbox"
        ${task.completed ? "checked" : ""}
        data-task-check="${escapeHTML(task.id)}"
        aria-label="Mark task complete"
      >

      <div class="task-info">
        <strong>${escapeHTML(task.title)}</strong>
        <p>
          ${escapeHTML(task.subject)}
          ${task.due ? ` · ${escapeHTML(formatDate(task.due))}` : ""}
          · ${escapeHTML(task.type || "homework")}
        </p>
        ${task.notes ? `<p>${escapeHTML(task.notes)}</p>` : ""}
      </div>

      <span class="priority-tag priority-${escapeHTML(task.priority || "medium")}">
        ${escapeHTML(task.priority || "medium")}
      </span>

      <button class="icon-button" data-task-edit="${escapeHTML(task.id)}" aria-label="Edit task">✎</button>
      <button class="icon-button" data-task-delete="${escapeHTML(task.id)}" aria-label="Delete task">×</button>
    </article>
  `).join("");
}

$("#taskSearch")?.addEventListener("input", renderTasks);
$("#taskFilter")?.addEventListener("change", renderTasks);
$("#subjectFilter")?.addEventListener("change", renderTasks);

$("#taskList")?.addEventListener("click", (event) => {
  const check = event.target.closest("[data-task-check]");
  const edit = event.target.closest("[data-task-edit]");
  const remove = event.target.closest("[data-task-delete]");

  if (check) toggleTask(check.dataset.taskCheck);

  if (edit) {
    const task = data.tasks.find(item => item.id === edit.dataset.taskEdit);
    if (task) openTaskModal(task);
  }

  if (remove) deleteTask(remove.dataset.taskDelete);
});


// ==========================================
// 11. TIMETABLE
// ==========================================

function openScheduleModal(session = null) {
  $("#scheduleForm").reset();

  $("#scheduleId").value = session?.id || "";
  $("#scheduleSubject").value = session?.subject || "";
  $("#scheduleDay").value = session?.day || "Monday";
  $("#scheduleStart").value = session?.start || "17:00";
  $("#scheduleEnd").value = session?.end || "18:00";
  $("#scheduleColor").value = session?.color || "";

  $("#scheduleModalTitle").textContent =
    session ? "Edit session" : t("addSession");

  $("#scheduleDelete").hidden = !session;

  openModal("scheduleModal");
}

$("#addScheduleButton")?.addEventListener("click", () => openScheduleModal());
$("#quickAddSession")?.addEventListener("click", () => openScheduleModal());

$("#scheduleForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const start = $("#scheduleStart").value;
  const end = $("#scheduleEnd").value;

  if (start >= end) {
    toast("The end time must be later than the start time.");
    return;
  }

  const id = $("#scheduleId").value;

  const session = {
    id: id || makeId(),
    subject: $("#scheduleSubject").value.trim(),
    day: $("#scheduleDay").value,
    start,
    end,
    color: $("#scheduleColor").value
  };

  if (id) {
    const index = data.timetable.findIndex(item => item.id === id);
    if (index !== -1) data.timetable[index] = session;
  } else {
    data.timetable.push(session);
  }

  await saveData();
  closeModal("scheduleModal");
  renderAll();
  toast(t("sessionSaved"));
});

$("#scheduleDelete")?.addEventListener("click", async () => {
  const id = $("#scheduleId").value;
  if (!id || !confirm(t("confirmDelete"))) return;

  data.timetable = data.timetable.filter(item => item.id !== id);

  await saveData();
  closeModal("scheduleModal");
  renderAll();
});

function renderTimetable() {
  const grid = $("#timetableGrid");
  if (!grid) return;

  grid.innerHTML = DAYS.map(day => {
    const sessions = data.timetable
      .filter(item => item.day === day)
      .sort((a, b) => a.start.localeCompare(b.start));

    return `
      <div class="timetable-day">
        <h4>${escapeHTML(day)}</h4>
        ${sessions.map(session => `
          <button
            class="schedule-item"
            data-session-edit="${escapeHTML(session.id)}"
            style="width:100%;text-align:left"
          >
            <strong>${escapeHTML(session.subject)}</strong>
            <span>${escapeHTML(session.start)} – ${escapeHTML(session.end)}</span>
          </button>
        `).join("")}
      </div>
    `;
  }).join("");
}

$("#timetableGrid")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-session-edit]");
  if (!button) return;

  const session = data.timetable.find(
    item => item.id === button.dataset.sessionEdit
  );

  if (session) openScheduleModal(session);
});


// ==========================================
// 12. GOALS
// ==========================================

function openGoalModal(goal = null) {
  $("#goalForm").reset();

  $("#goalId").value = goal?.id || "";
  $("#goalTitle").value = goal?.title || "";
  $("#goalDescription").value = goal?.description || "";
  $("#goalTarget").value = goal?.target || 10;
  $("#goalUnit").value = goal?.unit || "sessions";
  $("#goalCurrent").value = goal?.current || 0;

  $("#goalModalTitle").textContent = goal ? "Edit goal" : t("newGoal");

  openModal("goalModal");
}

$("#addGoalButton")?.addEventListener("click", () => openGoalModal());
$("#quickAddGoal")?.addEventListener("click", () => openGoalModal());

$("#goalForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = $("#goalId").value;
  const target = Number($("#goalTarget").value);
  const current = Number($("#goalCurrent").value);

  if (target <= 0 || current < 0) {
    toast("Please enter valid goal numbers.");
    return;
  }

  const goal = {
    id: id || makeId(),
    title: $("#goalTitle").value.trim(),
    description: $("#goalDescription").value.trim(),
    target,
    unit: $("#goalUnit").value.trim(),
    current: Math.min(current, target)
  };

  if (id) {
    const index = data.goals.findIndex(item => item.id === id);
    if (index !== -1) data.goals[index] = goal;
  } else {
    data.goals.push(goal);
  }

  await saveData();
  closeModal("goalModal");
  renderAll();
  toast(t("goalSaved"));
});

function renderGoals() {
  const list = $("#goalList");
  if (!list) return;

  const achieved = data.goals.filter(
    goal => Number(goal.current) >= Number(goal.target)
  ).length;

  $("#achievedGoals").textContent = achieved;

  if (!data.goals.length) {
    list.innerHTML = `<div class="panel"><p>${escapeHTML(t("noGoals"))}</p></div>`;
    return;
  }

  list.innerHTML = data.goals.map(goal => {
    const percent = Math.min(
      100,
      Math.round((Number(goal.current) / Number(goal.target)) * 100)
    );

    return `
      <article class="goal-card">
        <h3>${escapeHTML(goal.title)}</h3>
        <p>${escapeHTML(goal.description || "")}</p>

        <div class="goal-progress-track">
          <div class="goal-progress-fill" style="width:${percent}%"></div>
        </div>

        <div class="goal-meta">
          <span>${escapeHTML(String(goal.current))} / ${escapeHTML(String(goal.target))} ${escapeHTML(goal.unit)}</span>
          <strong>${percent}%</strong>
        </div>

        <div class="goal-actions" style="display:flex;gap:8px;margin-top:15px">
          <button class="secondary-button" data-goal-edit="${escapeHTML(goal.id)}">Edit</button>
          <button class="danger-button" data-goal-delete="${escapeHTML(goal.id)}">Delete</button>
        </div>
      </article>
    `;
  }).join("");
}

$("#goalList")?.addEventListener("click", async (event) => {
  const edit = event.target.closest("[data-goal-edit]");
  const remove = event.target.closest("[data-goal-delete]");

  if (edit) {
    const goal = data.goals.find(item => item.id === edit.dataset.goalEdit);
    if (goal) openGoalModal(goal);
  }

  if (remove) {
    if (!confirm(t("confirmDelete"))) return;

    data.goals = data.goals.filter(
      item => item.id !== remove.dataset.goalDelete
    );

    await saveData();
    renderAll();
  }
});


// ==========================================
// 13. FOCUS ROOM
// ==========================================

function updateTimerDisplay() {
  const minutes = Math.floor(timerRemaining / 60);
  const seconds = timerRemaining % 60;

  $("#timerDisplay").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  document.title = `${$("#timerDisplay").textContent} — KEYCLA`;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;

  $("#timerStart").textContent = t("start");
}

function setTimerMode(mode) {
  stopTimer();

  currentMode = mode;
  timerRemaining = MODES[mode] || MODES.focus;

  $$(".mode-button").forEach(button => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  updateTimerDisplay();
}

$$(".mode-button").forEach(button => {
  button.addEventListener("click", () => {
    setTimerMode(button.dataset.mode);
  });
});

$("#timerStart")?.addEventListener("click", () => {
  if (timerRunning) {
    stopTimer();
    $("#timerStart").textContent = t("resume");
    return;
  }

  timerRunning = true;
  $("#timerStart").textContent = t("pause");

  timerInterval = setInterval(async () => {
    timerRemaining--;

    updateTimerDisplay();

    if (timerRemaining <= 0) {
      stopTimer();

      if (currentMode === "focus") {
        data.focus.sessions++;
        data.focus.minutes += 25;
        await saveData();
        renderFocusStats();
      }

      toast(t("focusComplete"));
      setTimerMode(currentMode);
    }
  }, 1000);
});

$("#timerReset")?.addEventListener("click", () => {
  stopTimer();
  timerRemaining = MODES[currentMode];
  updateTimerDisplay();
});

$("#saveIntention")?.addEventListener("click", async () => {
  data.intention = $("#focusIntention").value.trim();
  await saveData();
  toast("Intention saved.");
});

function renderFocusStats() {
  $("#focusIntention").value = data.intention || "";
  $("#focusSessions").textContent = data.focus.sessions || 0;
  $("#focusMinutes").textContent = data.focus.minutes || 0;
}


// ==========================================
// 14. WEEKLY REFLECTION
// ==========================================

function renderJournal() {
  $("#journalDate").textContent = formatDate(today());

  const history = $("#journalHistory");
  if (!history) return;

  if (!data.reflections.length) {
    history.hidden = true;
    history.innerHTML = "";
    return;
  }

  history.hidden = false;

  history.innerHTML = `
    <h3>Previous reflections</h3>
    ${data.reflections
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(item => `
        <article class="reflection-entry" style="padding:15px 0;border-bottom:1px solid var(--border)">
          <strong>${escapeHTML(formatDate(item.date))}</strong>
          <p><b>Went well:</b> ${escapeHTML(item.wins || "—")}</p>
          <p><b>Challenges:</b> ${escapeHTML(item.challenges || "—")}</p>
          <p><b>Next steps:</b> ${escapeHTML(item.next || "—")}</p>
          <button class="danger-button" data-reflection-delete="${escapeHTML(item.id)}">Delete</button>
        </article>
      `).join("")}
  `;
}

$("#saveJournal")?.addEventListener("click", async () => {
  const wins = $("#journalWins").value.trim();
  const challenges = $("#journalChallenges").value.trim();
  const next = $("#journalNext").value.trim();

  if (!wins && !challenges && !next) {
    toast("Write something before saving your reflection.");
    return;
  }

  const existing = data.reflections.find(item => item.date === today());

  const reflection = {
    id: existing?.id || makeId(),
    date: today(),
    wins,
    challenges,
    next
  };

  if (existing) {
    Object.assign(existing, reflection);
  } else {
    data.reflections.push(reflection);
  }

  await saveData();

  $("#journalMessage").textContent = t("reflectionSaved");
  renderJournal();
});

$("#journalHistory")?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-reflection-delete]");
  if (!button || !confirm(t("confirmDelete"))) return;

  data.reflections = data.reflections.filter(
    item => item.id !== button.dataset.reflectionDelete
  );

  await saveData();
  renderJournal();
});


// ==========================================
// 15. HOME DASHBOARD
// ==========================================

function renderDashboard() {
  const pending = data.tasks.filter(task => !task.completed);
  const completed = data.tasks.filter(task => task.completed);

  $("#totalTasks").textContent = data.tasks.length;
  $("#completedTasks").textContent = completed.length;
  $("#pendingTasks").textContent = pending.length;
  $("#sidebarTaskCount").textContent = pending.length;

  $("#dailyTargetValue").textContent = data.profile.dailyGoal || 120;

  const goal = Number(data.profile.dailyGoal) || 120;
  const minutes = Number(data.focus.minutes) || 0;

  const percentage = Math.min(100, Math.round((minutes / goal) * 100));

  $("#dailyProgressLabel").textContent = `${percentage}%`;
  $("#dailyProgressBar").style.width = `${percentage}%`;
  $("#remainingToday").textContent = Math.max(0, goal - minutes);

  const upcoming = [...pending]
    .sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"))
    .slice(0, 5);

  $("#dashboardTasks").innerHTML = upcoming.length
    ? upcoming.map(task => `
      <div class="task-preview-item">
        <div class="task-info">
          <strong>${escapeHTML(task.title)}</strong>
          <p>${escapeHTML(task.subject)}${task.due ? ` · ${escapeHTML(formatDate(task.due))}` : ""}</p>
        </div>
        <span class="priority-tag priority-${escapeHTML(task.priority || "medium")}">
          ${escapeHTML(task.priority || "medium")}
        </span>
      </div>
    `).join("")
    : `<p class="muted-text">${escapeHTML(t("noTasks"))}</p>`;

  const dayName = DAYS[(new Date().getDay() + 6) % 7];

  const sessions = data.timetable
    .filter(session => session.day === dayName)
    .sort((a, b) => a.start.localeCompare(b.start));

  $("#dashboardSchedule").innerHTML = sessions.length
    ? sessions.map(session => `
      <div class="task-preview-item">
        <div class="task-info">
          <strong>${escapeHTML(session.subject)}</strong>
          <p>${escapeHTML(session.start)} – ${escapeHTML(session.end)}</p>
        </div>
      </div>
    `).join("")
    : `<p class="muted-text">${escapeHTML(t("noSchedule"))}</p>`;
}

function renderDate() {
  const date = new Date();

  $("#todayDate").textContent = date.toLocaleDateString(
    currentLanguage === "fr" ? "fr-FR" : "en-GB",
    {
      weekday: "short",
      day: "numeric",
      month: "long"
    }
  );
}

function renderAll() {
  if (!data) return;

  renderProfile();
  renderDate();
  renderTasks();
  renderTimetable();
  renderGoals();
  renderFocusStats();
  renderJournal();
  renderDashboard();
  updateTimerDisplay();
}


// ==========================================
// 16. EXPORT / IMPORT / RESET
// ==========================================

$("#exportData")?.addEventListener("click", () => {
  const file = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = "keycla-backup.json";
  link.click();

  URL.revokeObjectURL(url);
  toast(t("dataExported"));
});

$("#importDataButton")?.addEventListener("click", () => {
  $("#importDataInput").click();
});

$("#importDataInput")?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const content = await file.text();
    data = normalize(JSON.parse(content));

    await saveData();
    renderAll();

    toast(t("dataImported"));
  } catch (error) {
    console.error("Import failed:", error);
    toast("This backup file is not valid.");
  }

  event.target.value = "";
});

$("#resetData")?.addEventListener("click", async () => {
  if (!confirm(t("confirmReset"))) return;

  data = defaults();
  await saveData();
  renderAll();

  toast(t("dataReset"));
});


// ==========================================
// 17. AUTHENTICATION
// ==========================================

function switchAuthTab(tab) {
  const login = tab === "login";

  $("#loginForm").hidden = !login;
  $("#signupForm").hidden = login;
  $("#recoveryForm").hidden = true;

  $("#loginTab").classList.toggle("active", login);
  $("#signupTab").classList.toggle("active", !login);

  setAuthMessage("");
}

$("#loginTab")?.addEventListener("click", () => switchAuthTab("login"));
$("#signupTab")?.addEventListener("click", () => switchAuthTab("signup"));

function showRecoveryForm() {
  $("#loginForm").hidden = true;
  $("#signupForm").hidden = true;
  $("#recoveryForm").hidden = false;
  $("#authTabs").hidden = true;
  setAuthMessage("");
}

$("#forgotPassword")?.addEventListener("click", async () => {
  if (!supabaseClient) {
    setAuthMessage("Password recovery requires a configured account.", true);
    return;
  }

  const email = $("#loginEmail").value.trim();

  if (!email) {
    setAuthMessage(t("emailRequired"), true);
    return;
  }

  const redirectTo = window.location.origin + window.location.pathname;

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo
  });

  if (error) {
    setAuthMessage(error.message, true);
  } else {
    setAuthMessage(t("recoverySent"));
  }
});

$("#loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supabaseClient) {
    setAuthMessage(
      "Demo mode is active. Your workspace is stored on this device.",
      false
    );
    data = readLocalData();
    showApplication();
    return;
  }

  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;

  const button = $("#loginForm button[type=submit]");
  button.disabled = true;
  button.textContent = "Please wait...";

  const { data: result, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  button.disabled = false;
  button.textContent = t("loginSuccess") === "Bon retour!" ? "Connexion" : "Log in";

  if (error) {
    setAuthMessage(error.message || t("loginError"), true);
    return;
  }

  if (result?.user) {
    await loadStudentData(result.user);
  }
});

$("#signupForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = $("#signupName").value.trim();
  const email = $("#signupEmail").value.trim();
  const password = $("#signupPassword").value;
  const confirmation = $("#signupConfirmPassword").value;

  if (password.length < 8) {
    setAuthMessage(t("passwordShort"), true);
    return;
  }

  if (password !== confirmation) {
    setAuthMessage(t("passwordMismatch"), true);
    return;
  }

  if (!supabaseClient) {
    data = defaults();
    data.profile.name = name;
    await saveData();
    showApplication();
    toast("Demo workspace created on this device.");
    return;
  }

  const button = $("#signupForm button[type=submit]");
  button.disabled = true;
  button.textContent = "Please wait...";

  const { data: result, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: window.location.origin + window.location.pathname
    }
  });

  button.disabled = false;
  button.textContent = "Create account";

  if (error) {
    setAuthMessage(error.message || t("signupError"), true);
    return;
  }

  if (result?.session && result?.user) {
    data = defaults();
    data.profile.name = name;
    await loadStudentData(result.user);
  } else {
    setAuthMessage(t("accountCreated"));
  }
});

$("#recoveryForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supabaseClient) return;

  const password = $("#newPassword").value;

  if (password.length < 8) {
    setAuthMessage(t("passwordShort"), true);
    return;
  }

  const { error } = await supabaseClient.auth.updateUser({ password });

  if (error) {
    setAuthMessage(error.message, true);
    return;
  }

  $("#authTabs").hidden = false;
  switchAuthTab("login");
  setAuthMessage(t("passwordUpdated"));
});

$("#logoutButton")?.addEventListener("click", async () => {
  stopTimer();

  if (supabaseClient && currentUser) {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast(error.message);
      return;
    }
  }

  showAuth();
});


// ==========================================
// 18. START
// ==========================================

document.addEventListener("DOMContentLoaded", initializeApp);

