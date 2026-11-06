// ==========================================
// KEYCLA — Main JavaScript
// Your space. Your pace. Your progress.
// ==========================================

// 1. SUPABASE CONFIGURATION
// Keep your existing project URL and publishable key here.
// Never use your service_role / secret key in frontend code.

const SUPABASE_URL = "https://wlvdoekstcisatqiqqow.supabase.co";
const SUPABASE_KEY = "sb_publishable__9cPey1XsdLTx5gBPY0Q5w_5Dv5owQU";

const TABLE = "studyspace_data";

// Legacy keys, only used by the local demo mode (no account).
const LOCAL_KEY = "studora-data-v1";
const NEW_LOCAL_KEY = "keycla-data-v1";

const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday"
];

const DAY_LABELS = {
  en: {
    Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday",
    Thursday: "Thursday", Friday: "Friday", Saturday: "Saturday", Sunday: "Sunday"
  },
  fr: {
    Monday: "Lundi", Tuesday: "Mardi", Wednesday: "Mercredi",
    Thursday: "Jeudi", Friday: "Vendredi", Saturday: "Samedi", Sunday: "Dimanche"
  }
};

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
    tasksShort: "Tasks",
    planShort: "Plan",
    focusShort: "Focus",
    moreShort: "More",
    glance: "Your day, at a glance.",
    glanceSub: "Focus on what needs your attention.",
    customize: "Customize ↗",
    viewTasks: "View my tasks",
    priorities: "Tasks that need attention",
    prioritiesSub: "Your upcoming work.",
    seeAll: "See all",
    seeAllArrow: "See all →",
    today: "Today's timetable",
    todaySub: "What your day looks like.",
    editArrow: "Edit ↗",
    newTask: "New task",
    btnNewTask: "＋ New task",
    addSession: "Add session",
    btnAddSession: "＋ Add session",
    newGoal: "New goal",
    btnNewGoal: "＋ New goal",
    tasksEyebrow: "STAY ORGANIZED",
    tasksSub: "Keep track of homework, revision and projects.",
    timetableEyebrow: "PLAN YOUR WEEK",
    timetableSub: "Build a weekly routine that works for you.",
    weeklySchedule: "Weekly schedule",
    yourWeek: "YOUR WEEK",
    timetableHelper: "Select a session to edit or remove it.",
    goalsEyebrow: "MAKE PROGRESS",
    goalsSub: "Turn your plans into achievable steps.",
    achievedGoals: "Achieved goals",
    focusEyebrow: "DEEP WORK",
    focusSub: "Give one task your full attention.",
    timeToFocus: "TIME TO FOCUS",
    modeFocus: "Focus",
    modeShort: "Short break",
    modeLong: "Long break",
    reset: "Reset",
    timerNote: "One step at a time. Stay present.",
    intentionTitle: "Today's intention",
    intentionSub: "What would you like to accomplish?",
    saveIntention: "Save intention",
    focusToday: "Your focus today",
    sessionsToday: "Sessions today",
    minutesFocused: "Minutes focused",
    journalEyebrow: "PAUSE & REFLECT",
    journalSub: "Notice your progress and plan your next steps.",
    journalTodayLabel: "TODAY",
    saveReflection: "Save reflection",
    settingsEyebrow: "MAKE IT YOURS",
    settingsSub: "Personalize your KEYCLA workspace.",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    completed: "Completed",
    pending: "Pending",
    allTasks: "All tasks",
    allSubjects: "All subjects",
    search: "Search tasks...",
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
    login: "Log in",
    createAccount: "Create account",
    wait: "Please wait...",
    continueGoogle: "Continue with Google",
    orDivider: "or",
    googleError: "Unable to sign in with Google.",
    googleNeedsSetup: "Google sign-in requires a configured account.",
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
    tasksShort: "Tâches",
    planShort: "Planning",
    focusShort: "Focus",
    moreShort: "Plus",
    glance: "Ta journée en un coup d'œil.",
    glanceSub: "Concentre-toi sur l'essentiel.",
    customize: "Personnaliser ↗",
    viewTasks: "Voir mes tâches",
    priorities: "Tâches à traiter",
    prioritiesSub: "Ton travail à venir.",
    seeAll: "Tout voir",
    seeAllArrow: "Tout voir →",
    today: "Programme du jour",
    todaySub: "À quoi ressemble ta journée.",
    editArrow: "Modifier ↗",
    newTask: "Nouvelle tâche",
    btnNewTask: "＋ Nouvelle tâche",
    addSession: "Ajouter une séance",
    btnAddSession: "＋ Ajouter une séance",
    newGoal: "Nouvel objectif",
    btnNewGoal: "＋ Nouvel objectif",
    tasksEyebrow: "RESTE ORGANISÉ",
    tasksSub: "Suis tes devoirs, révisions et projets.",
    timetableEyebrow: "PLANIFIE TA SEMAINE",
    timetableSub: "Construis une routine hebdomadaire qui te convient.",
    weeklySchedule: "Planning de la semaine",
    yourWeek: "TA SEMAINE",
    timetableHelper: "Sélectionne une séance pour la modifier ou la supprimer.",
    goalsEyebrow: "AVANCE",
    goalsSub: "Transforme tes projets en étapes réalisables.",
    achievedGoals: "Objectifs atteints",
    focusEyebrow: "TRAVAIL PROFOND",
    focusSub: "Donne toute ton attention à une seule tâche.",
    timeToFocus: "C'EST L'HEURE DE SE CONCENTRER",
    modeFocus: "Concentration",
    modeShort: "Pause courte",
    modeLong: "Pause longue",
    reset: "Réinitialiser",
    timerNote: "Une étape à la fois. Reste présent.",
    intentionTitle: "Intention du jour",
    intentionSub: "Que souhaites-tu accomplir ?",
    saveIntention: "Enregistrer l'intention",
    focusToday: "Ta concentration aujourd'hui",
    sessionsToday: "Séances aujourd'hui",
    minutesFocused: "Minutes de concentration",
    journalEyebrow: "FAIS UNE PAUSE",
    journalSub: "Observe tes progrès et prépare la suite.",
    journalTodayLabel: "AUJOURD'HUI",
    saveReflection: "Enregistrer la réflexion",
    settingsEyebrow: "PERSONNALISE",
    settingsSub: "Personnalise ton espace KEYCLA.",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    completed: "Terminées",
    pending: "En attente",
    allTasks: "Toutes les tâches",
    allSubjects: "Toutes les matières",
    search: "Rechercher une tâche...",
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
    login: "Connexion",
    createAccount: "Créer un compte",
    wait: "Un instant...",
    continueGoogle: "Continuer avec Google",
    orDivider: "ou",
    googleError: "Connexion avec Google impossible.",
    googleNeedsSetup: "La connexion Google nécessite un compte configuré.",
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
let loadingUser = false;
let currentLanguage = localStorage.getItem("keycla-language") || "en";

let timerInterval = null;
let timerEnd = null;
let timerRemaining = MODES.focus;
let currentMode = "focus";
let timerRunning = false;


// ==========================================
// 3. UTILITIES
// ==========================================

function t(key) {
  return LANGUAGES[currentLanguage]?.[key] || LANGUAGES.en[key] || key;
}

// Local date (not UTC), so the day changes at local midnight.
function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function dayLabel(day) {
  return DAY_LABELS[currentLanguage]?.[day] || day;
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

function isSafeImageURL(value) {
  if (!value) return true;
  if (/["'()\\\s]/.test(value)) return false;

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
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

// One local key per account, so two users on the same device
// never see each other's data.
function localKey() {
  return `${NEW_LOCAL_KEY}:${currentUser?.id || "local"}`;
}

function readLocalData() {
  try {
    let saved = localStorage.getItem(localKey());

    // The legacy keys are only recovered in local demo mode.
    if (!saved && !currentUser) {
      saved = localStorage.getItem(NEW_LOCAL_KEY) || localStorage.getItem(LOCAL_KEY);
    }

    if (saved) {
      return normalize(JSON.parse(saved));
    }
  } catch (error) {
    console.error("Local data could not be read:", error);
  }

  return defaults();
}

function saveLocalData() {
  try {
    localStorage.setItem(localKey(), JSON.stringify(data));
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

async function loadStudentData(user, initialName = "") {
  if (loadingUser) return;
  loadingUser = true;

  try {
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

    const providerName =
      initialName ||
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      "";

    if (!cloudData && providerName && data.profile.name === "Student") {
      data.profile.name = providerName;
    }

    await saveData();
    showApplication();
  } finally {
    loadingUser = false;
  }
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
  showPage("dashboard");
}

function showAuth() {
  stopTimer();
  timerRemaining = MODES.focus;
  currentMode = "focus";
  document.title = "KEYCLA — Your Study Space";

  $("#authScreen").hidden = false;
  $("#appShell").hidden = true;
  currentUser = null;
  data = null;
}

async function initializeApp() {
  initializeSupabase();

  const languageSelect = $("#languageSelect");
  if (languageSelect) languageSelect.value = currentLanguage;

  applyLanguage();

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
    currentUser = null;
    data = readLocalData();
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

// Every translatable element in index.html carries a data-i18n key
// (text) or data-i18n-placeholder key (placeholder).
function applyLanguage() {
  document.documentElement.lang = currentLanguage;

  const select = $("#languageSelect");
  if (select) select.value = currentLanguage;

  $$("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  $$("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  // Dynamic labels that depend on the timer state.
  if ($("#timerStart")) {
    $("#timerStart").textContent = timerRunning
      ? t("pause")
      : (timerRemaining < timerFullDuration() ? t("resume") : t("start"));
  }

  renderAll();
}

$("#languageSelect")?.addEventListener("change", (event) => {
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

  const firstName = name.split(" ")[0];
  $("#bannerTitle").textContent =
    currentLanguage === "fr" ? `Bonjour, ${firstName} !` : `Hello, ${firstName}!`;

  $("#userNameInput").value = name;
  $("#workspaceInput").value = workspace;
  $("#dailyGoalInput").value = profile.dailyGoal || 120;

  $("#themeSelect").value = profile.theme || "light";

  const banner = $("#welcomeBanner");
  banner.className = `welcome-banner banner-${profile.banner || "plum"}`;

  if (profile.bannerImage && isSafeImageURL(profile.bannerImage)) {
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
  renderAll();
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

  if (!isSafeImageURL(image)) {
    toast("Please use a secure HTTPS image URL (no spaces, quotes or parentheses).");
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

  const subjects = [...new Set(data.tasks.map(task => task.subject).filter(Boolean))];

  const subjectSelect = $("#subjectFilter");
  const currentSubject = subjectSelect.value;

  subjectSelect.innerHTML =
    `<option value="all">${escapeHTML(t("allSubjects"))}</option>` +
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

      <button type="button" class="icon-button" data-task-edit="${escapeHTML(task.id)}" aria-label="Edit task">✎</button>
      <button type="button" class="icon-button" data-task-delete="${escapeHTML(task.id)}" aria-label="Delete task">×</button>
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
        <h4>${escapeHTML(dayLabel(day))}</h4>
        ${sessions.map(session => `
          <button
            type="button"
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
          <button type="button" class="secondary-button" data-goal-edit="${escapeHTML(goal.id)}">${escapeHTML(t("edit"))}</button>
          <button type="button" class="danger-button" data-goal-delete="${escapeHTML(goal.id)}">${escapeHTML(t("delete"))}</button>
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

function timerFullDuration() {
  return MODES[currentMode] || MODES.focus;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerRemaining / 60);
  const seconds = timerRemaining % 60;

  const text =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const display = $("#timerDisplay");
  if (display) display.textContent = text;

  document.title = timerRunning
    ? `${text} — KEYCLA`
    : "KEYCLA — Your Study Space";
}

// Fully stops the timer and clears the end time.
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  timerEnd = null;

  const button = $("#timerStart");
  if (button) button.textContent = t("start");
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

async function finishTimer() {
  const wasFocus = currentMode === "focus";
  stopTimer();

  if (wasFocus && data) {
    data.focus.sessions++;
    data.focus.minutes += MODES.focus / 60;
    await saveData();
    renderFocusStats();
    renderDashboard();
  }

  toast(t("focusComplete"));
  setTimerMode(currentMode);
}

// The remaining time comes from the real clock, so it stays
// accurate even when the browser slows down a background tab.
function tick() {
  timerRemaining = Math.max(
    0,
    Math.round((timerEnd - Date.now()) / 1000)
  );

  updateTimerDisplay();

  if (timerRemaining <= 0) {
    finishTimer();
  }
}

$("#timerStart")?.addEventListener("click", () => {
  if (timerRunning) {
    // Pause: keep timerRemaining, drop the end time.
    clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
    timerEnd = null;
    $("#timerStart").textContent = t("resume");
    updateTimerDisplay();
    return;
  }

  timerRunning = true;
  timerEnd = Date.now() + timerRemaining * 1000;
  $("#timerStart").textContent = t("pause");

  timerInterval = setInterval(tick, 500);
  updateTimerDisplay();
});

$("#timerReset")?.addEventListener("click", () => {
  stopTimer();
  timerRemaining = timerFullDuration();
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
          <button type="button" class="danger-button" data-reflection-delete="${escapeHTML(item.id)}">${escapeHTML(t("delete"))}</button>
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

async function signInWithGoogle() {
  if (!supabaseClient) {
    setAuthMessage(t("googleNeedsSetup"), true);
    return;
  }

  // The browser leaves for Google, then comes back to this page.
  // initializeApp() picks the session up from the URL automatically.
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    setAuthMessage(error.message || t("googleError"), true);
  }
}

$$("[data-google-login]").forEach((button) => {
  button.addEventListener("click", signInWithGoogle);
});

$("#loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supabaseClient) {
    setAuthMessage(
      "Demo mode is active. Your workspace is stored on this device.",
      false
    );
    currentUser = null;
    data = readLocalData();
    showApplication();
    return;
  }

  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;

  const button = $("#loginForm button[type=submit]");
  button.disabled = true;
  button.textContent = t("wait");

  const { data: result, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  button.disabled = false;
  button.textContent = t("login");

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
    currentUser = null;
    data = defaults();
    data.profile.name = name;
    await saveData();
    showApplication();
    toast("Demo workspace created on this device.");
    return;
  }

  const button = $("#signupForm button[type=submit]");
  button.disabled = true;
  button.textContent = t("wait");

  const { data: result, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: window.location.origin + window.location.pathname
    }
  });

  button.disabled = false;
  button.textContent = t("createAccount");

  if (error) {
    setAuthMessage(error.message || t("signupError"), true);
    return;
  }

  if (result?.session && result?.user) {
    await loadStudentData(result.user, name);
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
