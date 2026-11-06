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

const DEFAULT_ACCENT = "#7A4E6B";

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

// Days until a flashcard comes back, by box (0 = new or forgotten).
const BOX_DAYS = [0, 1, 3, 7, 14, 30];

const LANGUAGES = {
  en: {
    // navigation
    home: "Home", tasks: "Tasks", timetable: "Timetable", grades: "Grades",
    revision: "Revision", focus: "Focus", goals: "Goals", journal: "Reflection",
    settings: "Settings", logout: "Log out", more: "More",

    // account
    tagline: "Your space. Your pace. Your progress.",
    login: "Log in", createAccount: "Create account",
    email: "Email address", password: "Password", forgotPassword: "Forgot password?",
    fullName: "Full name", confirmPassword: "Confirm password",
    chooseNewPassword: "Choose a new password", newPassword: "New password",
    savePassword: "Save password", orDivider: "or",
    continueGoogle: "Continue with Google", wait: "Please wait…",
    passwordMismatch: "Your passwords do not match.",
    passwordShort: "Your password must contain at least 8 characters.",
    accountCreated: "Account created. Check your email if confirmation is required.",
    loginError: "Unable to log in. Check your email and password.",
    signupError: "Unable to create your account.",
    emailRequired: "Please enter your email address.",
    recoverySent: "If this address is registered, we have sent you instructions.",
    recoveryNeedsSetup: "Password recovery requires a configured account.",
    passwordUpdated: "Your password has been updated.",
    googleError: "Unable to sign in with Google.",
    googleNeedsSetup: "Google sign-in requires a configured account.",
    demoMode: "Demo mode is active. Your workspace is stored on this device.",
    accountExists: "This email already has an account. Log in with your password, or use Continue with Google.",
    confirmEmail: "Please confirm your email address first (check your inbox), then log in.",

    // home
    hello: "Hello, {name}",
    streakLabel: "{n}-day streak",
    tasksToDo: "To do", seeAll: "See all", today: "Today",
    dailyGoalTitle: "Daily focus goal", minShort: "min",
    noTasks: "Nothing to do. Enjoy the calm.",
    noSchedule: "Nothing planned today.",
    overdue: "Overdue", dueToday: "Due today", dueSoon: "Due soon",
    notifBody: "{n} task(s) need your attention.",

    // tasks
    newTask: "New task", editTask: "Edit task", searchTasks: "Search…",
    filterAll: "All", pending: "Pending", completed: "Completed",
    taskName: "Task", subject: "Subject", dueDate: "Due date",
    priority: "Priority", taskType: "Type", notes: "Notes",
    priority_high: "High", priority_medium: "Medium", priority_low: "Low",
    type_homework: "Homework", type_revision: "Revision", type_project: "Project", type_other: "Other",
    noTasksList: "No tasks yet. Add your first one.",
    taskSaved: "Task saved.", taskDeleted: "Task deleted.",

    // timetable
    addSession: "Add session", editSession: "Edit session",
    sessionName: "Session", day: "Day", startTime: "Start", endTime: "End",
    colour: "Colour", colorDefault: "Default", colorBlue: "Blue", colorGreen: "Green", colorOrange: "Orange",
    sessionSaved: "Session saved.", errTimes: "The end time must be later than the start time.",

    // grades
    addGrade: "Add grade", editGrade: "Edit grade",
    gradeName: "Name (optional)", gradeValue: "Grade", gradeOutOf: "Out of",
    gradeWeight: "Weight", gradeDate: "Date",
    overallAverage: "Overall average", gradesCount: "{n} grade(s)",
    noGrades: "No grades yet. Add one to see your average.",
    gradeSaved: "Grade saved.", gradeDeleted: "Grade deleted.", errGrade: "Please check the grade values.",
    defaultGradeName: "Grade",

    // revision
    newDeck: "New deck", editDeck: "Edit deck", deckName: "Deck name",
    noDecks: "Create a deck to start revising with flashcards.",
    cardsCount: "{n} card(s)", dueCount: "{n} to review",
    study: "Study", practiceAll: "Practice", addCard: "Add card", editCard: "Edit card",
    cardFront: "Question", cardBack: "Answer", noCards: "No cards yet. Add your first one.",
    showAnswer: "Show answer", notYet: "Not yet", gotIt: "Got it",
    allCaughtUp: "All caught up. Nothing to review today.",
    reviewDone: "Well done!", reviewedCount: "{n} card(s) reviewed.",
    decks: "Decks", close: "Close", question: "Question", answer: "Answer",
    deckSaved: "Deck saved.", cardSaved: "Card saved.",

    // focus
    modeFocus: "Focus", modeShort: "Short break", modeLong: "Long break",
    start: "Start", pause: "Pause", resume: "Resume", reset: "Reset",
    intentionTitle: "Today's intention", intentionPlaceholder: "Today, I want to…",
    intentionSaved: "Saved.", focusComplete: "Session completed!",
    focusStats: "{s} session(s) today · {m} min",

    // goals & reflection
    newGoal: "New goal", editGoal: "Edit goal", goalName: "Goal", description: "Description",
    target: "Target", unit: "Unit", current: "Progress so far",
    noGoals: "No goals yet. Create your first one.",
    goalsSummary: "{a} of {b} achieved", goalSaved: "Goal saved.", errGoal: "Please enter valid numbers.",
    journalWins: "What went well this week?", journalChallenges: "What was difficult?",
    journalNext: "What will you improve next week?",
    reflectionSaved: "Saved.", previousReflections: "Previous reflections",
    wentWell: "Went well", challenges: "Challenges", nextSteps: "Next steps",
    errReflection: "Write something first.",

    // settings
    appearance: "Appearance", accentColor: "Your colour", customColor: "Custom",
    theme: "Theme", themeLight: "Light", themeDark: "Dark", themeAuto: "Auto",
    preferences: "Preferences", displayName: "Your name",
    dailyGoalLabel: "Daily focus goal (minutes)",
    lblFocusLength: "Focus (min)", lblShortLength: "Short break (min)", lblLongLength: "Long break (min)",
    gradeScale: "Grades out of", reminders: "Deadline reminders",
    remindOff: "Off", remindSame: "Same day", remindOneDay: "1 day before",
    remindTwoDays: "2 days before", remindThreeDays: "3 days before",
    lblSound: "Sound after a session", soundOn: "On", soundOff: "Off",
    yourData: "Your data", exportData: "Export", importData: "Import", resetData: "Reset",
    installApp: "Install the app",
    installHint: "On iPhone: tap Share, then “Add to Home Screen”.",
    profileSaved: "Saved.", errName: "Please enter your name.",
    errDailyGoal: "The daily goal must be between 5 and 720 minutes.",
    errTimerLengths: "Timer lengths must be between 1 and 180 minutes.",
    errGradeScale: "Grades must be out of a number between 1 and 1000.",
    dataExported: "Backup exported.", dataImported: "Backup imported.",
    errBackup: "This backup file is not valid.",
    dataReset: "Your workspace has been reset.",
    confirmDelete: "Delete this item?",
    confirmReset: "Reset all your data? This cannot be undone.",
    notificationsBlocked: "Notifications are blocked in your browser, so reminders will only appear inside the app.",

    // common
    save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit"
  },

  fr: {
    home: "Accueil", tasks: "Tâches", timetable: "Emploi du temps", grades: "Notes",
    revision: "Révision", focus: "Concentration", goals: "Objectifs", journal: "Réflexion",
    settings: "Paramètres", logout: "Déconnexion", more: "Plus",

    tagline: "Ton espace. Ton rythme. Tes progrès.",
    login: "Connexion", createAccount: "Créer un compte",
    email: "Adresse e-mail", password: "Mot de passe", forgotPassword: "Mot de passe oublié ?",
    fullName: "Nom complet", confirmPassword: "Confirmer le mot de passe",
    chooseNewPassword: "Choisis un nouveau mot de passe", newPassword: "Nouveau mot de passe",
    savePassword: "Enregistrer", orDivider: "ou",
    continueGoogle: "Continuer avec Google", wait: "Un instant…",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
    passwordShort: "Le mot de passe doit contenir au moins 8 caractères.",
    accountCreated: "Compte créé. Vérifie ton e-mail si une confirmation est nécessaire.",
    loginError: "Connexion impossible. Vérifie ton e-mail et ton mot de passe.",
    signupError: "Impossible de créer le compte.",
    emailRequired: "Saisis ton adresse e-mail.",
    recoverySent: "Si cette adresse est enregistrée, les instructions ont été envoyées.",
    recoveryNeedsSetup: "La récupération du mot de passe nécessite un compte configuré.",
    passwordUpdated: "Ton mot de passe a été mis à jour.",
    googleError: "Connexion avec Google impossible.",
    googleNeedsSetup: "La connexion Google nécessite un compte configuré.",
    demoMode: "Mode démo actif. Ton espace est stocké sur cet appareil.",
    accountExists: "Cette adresse a déjà un compte. Connecte-toi avec ton mot de passe, ou utilise Continuer avec Google.",
    confirmEmail: "Confirme d'abord ton adresse e-mail (vérifie ta boîte de réception), puis connecte-toi.",

    hello: "Bonjour, {name}",
    streakLabel: "{n} jours d'affilée",
    tasksToDo: "À faire", seeAll: "Tout voir", today: "Aujourd'hui",
    dailyGoalTitle: "Objectif de concentration du jour", minShort: "min",
    noTasks: "Rien à faire. Profite du calme.",
    noSchedule: "Rien de prévu aujourd'hui.",
    overdue: "En retard", dueToday: "Pour aujourd'hui", dueSoon: "Bientôt",
    notifBody: "{n} tâche(s) demandent ton attention.",

    newTask: "Nouvelle tâche", editTask: "Modifier la tâche", searchTasks: "Rechercher…",
    filterAll: "Toutes", pending: "En attente", completed: "Terminées",
    taskName: "Tâche", subject: "Matière", dueDate: "Date limite",
    priority: "Priorité", taskType: "Type", notes: "Notes",
    priority_high: "Haute", priority_medium: "Moyenne", priority_low: "Basse",
    type_homework: "Devoirs", type_revision: "Révision", type_project: "Projet", type_other: "Autre",
    noTasksList: "Aucune tâche pour le moment. Ajoute la première.",
    taskSaved: "Tâche enregistrée.", taskDeleted: "Tâche supprimée.",

    addSession: "Ajouter une séance", editSession: "Modifier la séance",
    sessionName: "Séance", day: "Jour", startTime: "Début", endTime: "Fin",
    colour: "Couleur", colorDefault: "Par défaut", colorBlue: "Bleu", colorGreen: "Vert", colorOrange: "Orange",
    sessionSaved: "Séance enregistrée.", errTimes: "L'heure de fin doit être après l'heure de début.",

    addGrade: "Ajouter une note", editGrade: "Modifier la note",
    gradeName: "Nom (facultatif)", gradeValue: "Note", gradeOutOf: "Sur",
    gradeWeight: "Coefficient", gradeDate: "Date",
    overallAverage: "Moyenne générale", gradesCount: "{n} note(s)",
    noGrades: "Aucune note. Ajoutes-en une pour voir ta moyenne.",
    gradeSaved: "Note enregistrée.", gradeDeleted: "Note supprimée.", errGrade: "Vérifie les valeurs de la note.",
    defaultGradeName: "Note",

    newDeck: "Nouveau paquet", editDeck: "Modifier le paquet", deckName: "Nom du paquet",
    noDecks: "Crée un paquet pour réviser avec des fiches.",
    cardsCount: "{n} fiche(s)", dueCount: "{n} à revoir",
    study: "Réviser", practiceAll: "S'entraîner", addCard: "Ajouter une fiche", editCard: "Modifier la fiche",
    cardFront: "Question", cardBack: "Réponse", noCards: "Aucune fiche. Ajoute la première.",
    showAnswer: "Voir la réponse", notYet: "Pas encore", gotIt: "Je savais",
    allCaughtUp: "Tout est à jour. Rien à revoir aujourd'hui.",
    reviewDone: "Bien joué !", reviewedCount: "{n} fiche(s) revue(s).",
    decks: "Paquets", close: "Fermer", question: "Question", answer: "Réponse",
    deckSaved: "Paquet enregistré.", cardSaved: "Fiche enregistrée.",

    modeFocus: "Concentration", modeShort: "Pause courte", modeLong: "Pause longue",
    start: "Démarrer", pause: "Pause", resume: "Reprendre", reset: "Réinitialiser",
    intentionTitle: "Intention du jour", intentionPlaceholder: "Aujourd'hui, je veux…",
    intentionSaved: "Enregistré.", focusComplete: "Séance terminée !",
    focusStats: "{s} séance(s) aujourd'hui · {m} min",

    newGoal: "Nouvel objectif", editGoal: "Modifier l'objectif", goalName: "Objectif", description: "Description",
    target: "Cible", unit: "Unité", current: "Progression actuelle",
    noGoals: "Aucun objectif. Crée le premier.",
    goalsSummary: "{a} sur {b} atteint(s)", goalSaved: "Objectif enregistré.", errGoal: "Saisis des nombres valides.",
    journalWins: "Qu'est-ce qui s'est bien passé cette semaine ?", journalChallenges: "Qu'est-ce qui a été difficile ?",
    journalNext: "Que veux-tu améliorer la semaine prochaine ?",
    reflectionSaved: "Enregistré.", previousReflections: "Réflexions précédentes",
    wentWell: "Réussites", challenges: "Difficultés", nextSteps: "Prochaines étapes",
    errReflection: "Écris quelque chose d'abord.",

    appearance: "Apparence", accentColor: "Ta couleur", customColor: "Autre",
    theme: "Thème", themeLight: "Clair", themeDark: "Sombre", themeAuto: "Auto",
    preferences: "Préférences", displayName: "Ton prénom",
    dailyGoalLabel: "Objectif de concentration (minutes)",
    lblFocusLength: "Concentration (min)", lblShortLength: "Pause courte (min)", lblLongLength: "Pause longue (min)",
    gradeScale: "Notes sur", reminders: "Rappels d'échéance",
    remindOff: "Désactivés", remindSame: "Le jour même", remindOneDay: "1 jour avant",
    remindTwoDays: "2 jours avant", remindThreeDays: "3 jours avant",
    lblSound: "Son après une séance", soundOn: "Activé", soundOff: "Désactivé",
    yourData: "Tes données", exportData: "Exporter", importData: "Importer", resetData: "Réinitialiser",
    installApp: "Installer l'application",
    installHint: "Sur iPhone : touche Partager, puis « Sur l'écran d'accueil ».",
    profileSaved: "Enregistré.", errName: "Saisis ton prénom.",
    errDailyGoal: "L'objectif doit être compris entre 5 et 720 minutes.",
    errTimerLengths: "Les durées doivent être comprises entre 1 et 180 minutes.",
    errGradeScale: "Les notes doivent être sur un nombre entre 1 et 1000.",
    dataExported: "Sauvegarde exportée.", dataImported: "Sauvegarde importée.",
    errBackup: "Ce fichier de sauvegarde n'est pas valide.",
    dataReset: "Ton espace a été réinitialisé.",
    confirmDelete: "Supprimer cet élément ?",
    confirmReset: "Réinitialiser toutes tes données ? Cette action est irréversible.",
    notificationsBlocked: "Les notifications sont bloquées dans ton navigateur : les rappels n'apparaîtront que dans l'application.",

    save: "Enregistrer", cancel: "Annuler", delete: "Supprimer", edit: "Modifier"
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
let recoveryMode = false;
let currentLanguage = localStorage.getItem("keycla-language") || "en";

let timerInterval = null;
let timerEnd = null;
let timerRemaining = MODES.focus;
let currentMode = "focus";
let timerRunning = false;

let revision = {
  view: "list",
  deckId: null,
  queue: [],
  index: 0,
  revealed: false,
  retried: [],
  reviewed: 0
};

let deferredInstall = null;


// ==========================================
// 3. UTILITIES
// ==========================================

function t(key, values) {
  let text = LANGUAGES[currentLanguage]?.[key] ?? LANGUAGES.en[key] ?? key;

  if (values) {
    Object.keys(values).forEach((name) => {
      text = text.split(`{${name}}`).join(values[name]);
    });
  }

  return text;
}

function dateKey(date) {
  const p = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

// Local date (not UTC), so the day changes at local midnight.
function today() {
  return dateKey(new Date());
}

function daysAgo(count) {
  const date = new Date();
  date.setDate(date.getDate() - count);
  return dateKey(date);
}

function daysFromNow(count) {
  return daysAgo(-count);
}

function dayLabel(day) {
  return DAY_LABELS[currentLanguage]?.[day] || day;
}

function locale() {
  return currentLanguage === "fr" ? "fr-FR" : "en-GB";
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
  return date.toLocaleDateString(locale(), { day: "numeric", month: "short", year: "numeric" });
}

function formatNumber(value) {
  return (Math.round(Number(value) * 10) / 10).toLocaleString(locale());
}

function initials(name) {
  return String(name || "K")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || "")
    .join("") || "K";
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function toast(message) {
  const element = $("#toast");
  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => {
    element.classList.remove("show");
  }, 2600);
}

function setAuthMessage(message, isError = false) {
  const element = $("#authMessage");
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("error", Boolean(isError));
}

function defaults() {
  return {
    profile: {
      name: "Student",
      theme: "light",
      accent: DEFAULT_ACCENT,
      dailyGoal: 60,
      focusMinutes: 25,
      shortMinutes: 5,
      longMinutes: 15,
      sound: "on",
      gradeMax: 20,
      reminderDays: "1"
    },

    tasks: [],
    timetable: [],
    goals: [],
    reflections: [],
    grades: [],
    decks: [],
    history: {},

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
  const list = (value) => (Array.isArray(value) ? value : []);

  const result = {
    ...base,
    ...raw,
    profile: {
      ...base.profile,
      ...(raw.profile || {})
    },
    tasks: list(raw.tasks),
    timetable: list(raw.timetable),
    goals: list(raw.goals),
    reflections: list(raw.reflections),
    grades: list(raw.grades),
    decks: list(raw.decks).map(deck => ({ ...deck, cards: list(deck.cards) })),
    history: (raw.history && typeof raw.history === "object" && !Array.isArray(raw.history))
      ? raw.history
      : {},
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

// Seconds for each timer mode, using the lengths chosen in Settings.
function modeSeconds(mode) {
  const profile = data?.profile || {};
  const minutes = Number({
    focus: profile.focusMinutes,
    short: profile.shortMinutes,
    long: profile.longMinutes
  }[mode]);

  return (minutes > 0 ? minutes : (MODES[mode] || MODES.focus) / 60) * 60;
}

// Minutes focused per day, including today's live counter.
function getHistory() {
  const key = today();
  const stored = data?.history || {};

  return {
    ...stored,
    [key]: Math.max(Number(stored[key]) || 0, Number(data?.focus?.minutes) || 0)
  };
}

// Consecutive days with at least one focus minute.
// A day without focus yet today does not break the streak.
function computeStreak() {
  const history = getHistory();
  let offset = history[today()] > 0 ? 0 : 1;
  let streak = 0;

  while ((Number(history[daysAgo(offset)]) || 0) > 0) {
    streak++;
    offset++;
  }

  return streak;
}

function dueBadge(task) {
  if (task.completed || !task.due) return "";

  const current = today();

  if (task.due < current) {
    return `<span class="tag due-overdue">${escapeHTML(t("overdue"))}</span>`;
  }

  if (task.due === current) {
    return `<span class="tag due-today">${escapeHTML(t("dueToday"))}</span>`;
  }

  return "";
}

function playChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();

    [660, 880, 1040].forEach((frequency, index) => {
      const start = context.currentTime + index * 0.25;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      gain.connect(context.destination);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);

      oscillator.start(start);
      oscillator.stop(start + 0.32);
    });
  } catch (error) {
    console.warn("Sound could not be played:", error);
  }
}


// ==========================================
// 4. COLOURS AND APPEARANCE
// ==========================================

function normalizeHex(value) {
  const match = /^#?([0-9a-f]{6})$/i.exec(String(value || "").trim());
  return match ? `#${match[1].toUpperCase()}` : null;
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(rgb) {
  return "#" + rgb
    .map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function mixHex(a, b, amount) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex(A.map((v, i) => v + (B[i] - v) * amount));
}

// Moves a colour toward black or white until it is readable on a background.
function ensureContrast(color, background, minimum, toward) {
  let result = color;

  for (let i = 0; i < 24 && contrast(result, background) < minimum; i++) {
    result = mixHex(result, toward, 0.08);
  }

  return result;
}

function readSavedAppearance() {
  try {
    return JSON.parse(localStorage.getItem("keycla-appearance") || "null");
  } catch {
    return null;
  }
}

// One accent colour drives the whole site: buttons, highlights,
// soft backgrounds and borders are all derived from it in style.css.
function applyAppearance() {
  const saved = data ? null : readSavedAppearance();
  const profile = data?.profile || saved || {};

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const dark = profile.theme === "dark" || (profile.theme === "auto" && prefersDark);

  const accent = normalizeHex(profile.accent) || DEFAULT_ACCENT;
  const surface = dark ? "#1E1A1F" : "#FFFFFF";
  const toward = dark ? "#FFFFFF" : "#000000";

  const fill = ensureContrast(accent, surface, 2.2, toward);
  const onFill = contrast(fill, "#FFFFFF") >= contrast(fill, "#1F1A20") ? "#FFFFFF" : "#1F1A20";
  const text = ensureContrast(accent, surface, 4.5, toward);

  const root = document.documentElement;
  root.style.setProperty("--primary", fill);
  root.style.setProperty("--on-primary", onFill);
  root.style.setProperty("--accent-text", text);

  document.body.classList.toggle("dark-theme", dark);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#151216" : "#FCFBFA");

  if (data) {
    try {
      localStorage.setItem("keycla-appearance", JSON.stringify({
        accent: profile.accent,
        theme: profile.theme
      }));
    } catch {
      // Not important: the appearance is also stored in the workspace data.
    }
  }
}

window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", applyAppearance);


// ==========================================
// 5. LOCAL STORAGE AND SUPABASE
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
  }
}

async function saveData() {
  if (!data) return;
  saveLocalData();
  await saveCloudData();
}

async function loadStudentData(user, initialName = "") {
  if (loadingUser) return;
  if (data && user && currentUser?.id === user.id) return;
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
// 6. APPLICATION STARTUP
// ==========================================

function initializeSupabase() {
  if (
    SUPABASE_URL &&
    SUPABASE_KEY &&
    window.supabase?.createClient
  ) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY,
      {
        auth: {
          flowType: "pkce",
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true
        }
      }
    );
  } else {
    console.warn("Supabase is not configured. Local demo mode is available.");
  }
}

function hideBoot() {
  const boot = $("#bootScreen");
  if (boot) boot.hidden = true;
}

function showApplication() {
  hideBoot();

  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;

  applyLanguage();

  // Apply the focus / break lengths chosen in Settings.
  if (!timerRunning) setTimerMode(currentMode);

  showPage("dashboard");

  setTimeout(checkReminders, 1500);
}

function showAuth() {
  hideBoot();
  stopTimer();

  currentMode = "focus";
  timerRemaining = MODES.focus;
  document.title = "KEYCLA — Your Study Space";

  $("#authScreen").hidden = false;
  $("#appShell").hidden = true;

  currentUser = null;
  data = null;

  applyAppearance();
}

// Reads both ?query and #hash parameters sent back by Supabase / Google.
function readAuthURLParams() {
  const query = window.location.search.replace(/^\?/, "");
  const hash = window.location.hash.replace(/^#/, "");
  return new URLSearchParams(`${query}&${hash}`);
}

function cleanAuthURL() {
  const params = readAuthURLParams();
  const authKeys = ["code", "access_token", "refresh_token", "error", "error_description", "type"];

  if (authKeys.some(key => params.has(key))) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

async function handleAuthEvent(event, session) {
  if (event === "PASSWORD_RECOVERY") {
    recoveryMode = true;
    showAuth();
    showRecoveryForm();
    return;
  }

  if (event === "SIGNED_OUT") {
    recoveryMode = false;
    showAuth();
    return;
  }

  if (recoveryMode) return;

  // A session exists (page reload, return from Google, or normal login).
  if (session?.user && (event === "INITIAL_SESSION" || event === "SIGNED_IN")) {
    if (!data || currentUser?.id !== session.user.id) {
      await loadStudentData(session.user);
    }

    cleanAuthURL();
    return;
  }

  // First check finished and nobody is signed in.
  if (event === "INITIAL_SESSION" && !session) {
    const urlError = readAuthURLParams().get("error_description");

    showAuth();

    if (urlError) {
      setAuthMessage(urlError, true);
    }

    cleanAuthURL();
  }
}

async function initializeApp() {
  applyAppearance();
  initializeSupabase();

  const languageSelect = $("#languageSelect");
  if (languageSelect) languageSelect.value = currentLanguage;

  applyLanguage();

  if (!supabaseClient) {
    // Local demonstration mode.
    currentUser = null;
    data = readLocalData();
    showApplication();
    return;
  }

  supabaseClient.auth.onAuthStateChange((event, session) => {
    // Deferred, so calls made to Supabase from here never block its auth client.
    setTimeout(() => handleAuthEvent(event, session), 0);
  });

  // Safety net: if no auth event arrived, check the session once by hand.
  setTimeout(async () => {
    const boot = $("#bootScreen");
    if (!boot || boot.hidden || data || loadingUser) return;

    const { data: result } = await supabaseClient.auth.getSession();

    if (result?.session?.user) {
      await handleAuthEvent("SIGNED_IN", result.session);
    } else {
      showAuth();
    }
  }, 3000);
}


// ==========================================
// 7. NAVIGATION AND MODALS
// ==========================================

function showPage(name) {
  $$(".page").forEach(page => page.classList.remove("active"));

  const target = $(`#page-${name}`);
  if (target) target.classList.add("active");

  $$(".nav-link[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === name);
  });

  closeSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSidebar() {
  $("#sidebar")?.classList.add("open");
  $("#sidebarBackdrop")?.classList.add("show");
}

function closeSidebar() {
  $("#sidebar")?.classList.remove("open");
  $("#sidebarBackdrop")?.classList.remove("show");
}

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) showPage(pageButton.dataset.page);

  if (event.target.closest("[data-open-menu]")) openSidebar();

  const closeButton = event.target.closest("[data-close]");
  if (closeButton) closeModal(closeButton.dataset.close);
});

$("#menuToggle")?.addEventListener("click", openSidebar);
$("#closeSidebar")?.addEventListener("click", closeSidebar);
$("#sidebarBackdrop")?.addEventListener("click", closeSidebar);

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
    if (event.target === modal) closeModal(modal.id);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    $$(".modal-overlay.open").forEach(modal => closeModal(modal.id));
    closeSidebar();
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

  $$("#scheduleDay option").forEach((option) => {
    option.textContent = dayLabel(option.value);
  });

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
// 9. HOME
// ==========================================

function getReminderTasks() {
  const setting = data?.profile?.reminderDays;

  if (!data || setting === "off") return { overdue: [], soon: [] };

  const days = Math.max(0, Number(setting ?? 1) || 0);
  const current = today();
  const limit = daysFromNow(days);

  const open = data.tasks.filter(task => !task.completed && task.due);

  return {
    overdue: open.filter(task => task.due < current),
    soon: open.filter(task => task.due >= current && task.due <= limit)
  };
}

function renderHome() {
  const name = (data.profile.name || "").split(" ")[0] || "Student";
  setText("greeting", t("hello", { name }));

  const dateText = new Date().toLocaleDateString(locale(), {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const streak = computeStreak();
  setText(
    "heroSub",
    streak >= 2 ? `${dateText} · ${t("streakLabel", { n: streak })}` : dateText
  );

  const pending = data.tasks.filter(task => !task.completed);
  setText("sidebarTaskCount", pending.length);

  const countBadge = $("#sidebarTaskCount");
  if (countBadge) countBadge.hidden = pending.length === 0;

  // Reminder line, only shown when something needs attention.
  const reminder = $("#reminderCard");
  const { overdue, soon } = getReminderTasks();

  if (reminder) {
    const parts = [];
    if (overdue.length) parts.push(`${overdue.length} ${t("overdue").toLowerCase()}`);
    if (soon.length) parts.push(`${soon.length} ${t("dueSoon").toLowerCase()}`);

    reminder.hidden = parts.length === 0;
    reminder.textContent = parts.join(" · ");
  }

  // Daily goal
  const goal = Number(data.profile.dailyGoal) || 60;
  const minutes = Math.round(Number(data.focus.minutes) || 0);
  const percentage = Math.min(100, Math.round((minutes / goal) * 100));

  setText("dailyGoalText", `${minutes} / ${goal} ${t("minShort")}`);

  const bar = $("#dailyProgressBar");
  if (bar) bar.style.width = `${percentage}%`;

  // Tasks
  const upcoming = [...pending]
    .sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"))
    .slice(0, 4);

  $("#dashboardTasks").innerHTML = upcoming.length
    ? upcoming.map(task => `
      <div class="task-preview-item">
        <div class="task-info">
          <strong>${escapeHTML(task.title)}</strong>
          <p>${escapeHTML(task.subject || "")}${task.subject && task.due ? " · " : ""}${task.due ? escapeHTML(formatDate(task.due)) : ""}</p>
        </div>
        ${dueBadge(task)}
      </div>
    `).join("")
    : `<p class="empty-text">${escapeHTML(t("noTasks"))}</p>`;

  // Today's timetable
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
    : `<p class="empty-text">${escapeHTML(t("noSchedule"))}</p>`;
}


// ==========================================
// 10. PROFILE, APPEARANCE AND SETTINGS
// ==========================================

function renderProfile() {
  if (!data) return;

  const profile = data.profile;
  const name = profile.name || "Student";
  const avatar = initials(name);

  setText("sidebarUserName", name);
  setText("sidebarAvatar", avatar);
  setText("topAvatar", avatar);

  $("#userNameInput").value = name;
  $("#dailyGoalInput").value = profile.dailyGoal || 60;
  $("#focusLengthInput").value = profile.focusMinutes || 25;
  $("#shortLengthInput").value = profile.shortMinutes || 5;
  $("#longLengthInput").value = profile.longMinutes || 15;
  $("#gradeMaxInput").value = profile.gradeMax || 20;
  $("#reminderSelect").value = profile.reminderDays ?? "1";
  $("#soundSelect").value = profile.sound === "off" ? "off" : "on";

  const accent = normalizeHex(profile.accent) || DEFAULT_ACCENT;
  let matchedPreset = false;

  $$(".color-swatch").forEach(swatch => {
    const selected = swatch.dataset.color === accent;
    swatch.classList.toggle("selected", selected);
    if (selected) matchedPreset = true;
  });

  $(".color-custom")?.classList.toggle("selected", !matchedPreset);
  $("#customColor").value = accent.toLowerCase();

  $$("[data-theme-choice]").forEach(button => {
    button.classList.toggle("active", button.dataset.themeChoice === (profile.theme || "light"));
  });

  applyAppearance();
}

async function setAccent(color) {
  const accent = normalizeHex(color);
  if (!accent || !data) return;

  data.profile.accent = accent;
  renderProfile();
  await saveData();
}

$$(".color-swatch").forEach(swatch => {
  swatch.addEventListener("click", () => setAccent(swatch.dataset.color));
});

// Live preview while dragging in the colour picker, saved when released.
$("#customColor")?.addEventListener("input", (event) => {
  const accent = normalizeHex(event.target.value);
  if (!accent || !data) return;

  data.profile.accent = accent;
  applyAppearance();
});

$("#customColor")?.addEventListener("change", (event) => setAccent(event.target.value));

$$("[data-theme-choice]").forEach(button => {
  button.addEventListener("click", async () => {
    data.profile.theme = button.dataset.themeChoice;
    renderProfile();
    await saveData();
  });
});

$("#saveProfile")?.addEventListener("click", async () => {
  const name = $("#userNameInput").value.trim();
  const dailyGoal = Number($("#dailyGoalInput").value);
  const focusMinutes = Number($("#focusLengthInput").value);
  const shortMinutes = Number($("#shortLengthInput").value);
  const longMinutes = Number($("#longLengthInput").value);
  const gradeMax = Number($("#gradeMaxInput").value);

  if (!name) {
    toast(t("errName"));
    return;
  }

  if (!Number.isFinite(dailyGoal) || dailyGoal < 5 || dailyGoal > 720) {
    toast(t("errDailyGoal"));
    return;
  }

  const lengthsValid = [focusMinutes, shortMinutes, longMinutes].every(
    value => Number.isFinite(value) && value >= 1 && value <= 180
  );

  if (!lengthsValid) {
    toast(t("errTimerLengths"));
    return;
  }

  if (!Number.isFinite(gradeMax) || gradeMax < 1 || gradeMax > 1000) {
    toast(t("errGradeScale"));
    return;
  }

  const reminderDays = $("#reminderSelect").value;

  data.profile.name = name;
  data.profile.dailyGoal = dailyGoal;
  data.profile.focusMinutes = Math.round(focusMinutes);
  data.profile.shortMinutes = Math.round(shortMinutes);
  data.profile.longMinutes = Math.round(longMinutes);
  data.profile.gradeMax = gradeMax;
  data.profile.reminderDays = reminderDays;
  data.profile.sound = $("#soundSelect").value === "off" ? "off" : "on";

  await saveData();
  renderAll();

  if (!timerRunning) setTimerMode(currentMode);

  toast(t("profileSaved"));

  if (reminderDays !== "off" && "Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    } else if (Notification.permission === "denied") {
      toast(t("notificationsBlocked"));
    }
  }
});


// ==========================================
// 11. TASKS
// ==========================================

function refreshSubjectList() {
  const subjects = new Set();

  data.tasks.forEach(task => task.subject && subjects.add(task.subject));
  data.grades.forEach(grade => grade.subject && subjects.add(grade.subject));
  data.timetable.forEach(session => session.subject && subjects.add(session.subject));

  $("#subjectList").innerHTML = [...subjects]
    .sort((a, b) => a.localeCompare(b))
    .map(subject => `<option value="${escapeHTML(subject)}"></option>`)
    .join("");
}

function openTaskModal(task = null) {
  $("#taskForm").reset();
  refreshSubjectList();

  $("#taskId").value = task?.id || "";
  $("#taskTitle").value = task?.title || "";
  $("#taskSubject").value = task?.subject || "";
  $("#taskDue").value = task?.due || "";
  $("#taskPriority").value = task?.priority || "medium";
  $("#taskType").value = task?.type || "homework";
  $("#taskNotes").value = task?.notes || "";

  setText("taskModalTitle", task ? t("editTask") : t("newTask"));

  openModal("taskModal");
}

$("#addTaskButton")?.addEventListener("click", () => openTaskModal());

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

  let tasks = [...data.tasks];

  if (search) {
    tasks = tasks.filter(task =>
      `${task.title} ${task.subject} ${task.notes}`.toLowerCase().includes(search)
    );
  }

  if (filter === "pending") tasks = tasks.filter(task => !task.completed);
  if (filter === "completed") tasks = tasks.filter(task => task.completed);

  tasks.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return (a.due || "9999").localeCompare(b.due || "9999");
  });

  if (!tasks.length) {
    list.innerHTML = `<p class="empty-text">${escapeHTML(t("noTasksList"))}</p>`;
    return;
  }

  list.innerHTML = tasks.map(task => {
    const meta = [
      task.subject,
      task.due ? formatDate(task.due) : "",
      t(`type_${task.type || "homework"}`)
    ].filter(Boolean).map(escapeHTML).join(" · ");

    return `
      <article class="task-item ${task.completed ? "completed" : ""}">
        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
          data-task-check="${escapeHTML(task.id)}"
          aria-label="${escapeHTML(t("completed"))}"
        >

        <div class="task-info">
          <strong>${escapeHTML(task.title)}</strong>
          <p>${meta}</p>
          ${task.notes ? `<p>${escapeHTML(task.notes)}</p>` : ""}
        </div>

        ${dueBadge(task)}
        <span class="tag priority-${escapeHTML(task.priority || "medium")}">${escapeHTML(t(`priority_${task.priority || "medium"}`))}</span>

        <button type="button" class="icon-button subtle" data-task-edit="${escapeHTML(task.id)}" aria-label="${escapeHTML(t("edit"))}">✎</button>
        <button type="button" class="icon-button subtle" data-task-delete="${escapeHTML(task.id)}" aria-label="${escapeHTML(t("delete"))}">×</button>
      </article>
    `;
  }).join("");
}

$("#taskSearch")?.addEventListener("input", renderTasks);
$("#taskFilter")?.addEventListener("change", renderTasks);

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
// 12. TIMETABLE
// ==========================================

function openScheduleModal(session = null) {
  $("#scheduleForm").reset();
  refreshSubjectList();

  $("#scheduleId").value = session?.id || "";
  $("#scheduleSubject").value = session?.subject || "";
  $("#scheduleDay").value = session?.day || "Monday";
  $("#scheduleStart").value = session?.start || "17:00";
  $("#scheduleEnd").value = session?.end || "18:00";
  $("#scheduleColor").value = session?.color || "";

  setText("scheduleModalTitle", session ? t("editSession") : t("addSession"));

  $("#scheduleDelete").hidden = !session;

  openModal("scheduleModal");
}

$("#addScheduleButton")?.addEventListener("click", () => openScheduleModal());

$("#scheduleForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const start = $("#scheduleStart").value;
  const end = $("#scheduleEnd").value;

  if (start >= end) {
    toast(t("errTimes"));
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
            class="schedule-item${session.color ? " color-" + escapeHTML(session.color) : ""}"
            data-session-edit="${escapeHTML(session.id)}"
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
// 13. GRADES
// ==========================================

// Weighted average of a list of grades, expressed on the chosen scale.
function averageOf(list) {
  const scale = Number(data.profile.gradeMax) || 20;

  let weightTotal = 0;
  let sum = 0;

  list.forEach(grade => {
    const max = Number(grade.max) || scale;
    const weight = Number(grade.weight) || 1;

    sum += (Number(grade.value) / max) * weight;
    weightTotal += weight;
  });

  return weightTotal ? (sum / weightTotal) * scale : null;
}

function openGradeModal(grade = null) {
  $("#gradeForm").reset();
  refreshSubjectList();

  $("#gradeId").value = grade?.id || "";
  $("#gradeSubject").value = grade?.subject || "";
  $("#gradeName").value = grade?.name || "";
  $("#gradeValue").value = grade?.value ?? "";
  $("#gradeOutOf").value = grade?.max ?? (data.profile.gradeMax || 20);
  $("#gradeWeight").value = grade?.weight ?? 1;
  $("#gradeDate").value = grade?.date || today();

  setText("gradeModalTitle", grade ? t("editGrade") : t("addGrade"));
  $("#gradeDelete").hidden = !grade;

  openModal("gradeModal");
}

$("#addGradeButton")?.addEventListener("click", () => openGradeModal());

$("#gradeForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = $("#gradeId").value;
  const value = Number($("#gradeValue").value);
  const max = Number($("#gradeOutOf").value);
  const weight = Number($("#gradeWeight").value);

  if (!Number.isFinite(value) || value < 0 || !(max > 0) || !(weight > 0)) {
    toast(t("errGrade"));
    return;
  }

  const grade = {
    id: id || makeId(),
    subject: $("#gradeSubject").value.trim(),
    name: $("#gradeName").value.trim(),
    value,
    max,
    weight,
    date: $("#gradeDate").value || today()
  };

  if (id) {
    const index = data.grades.findIndex(item => item.id === id);
    if (index !== -1) data.grades[index] = grade;
  } else {
    data.grades.push(grade);
  }

  await saveData();
  closeModal("gradeModal");
  renderAll();
  toast(t("gradeSaved"));
});

$("#gradeDelete")?.addEventListener("click", async () => {
  const id = $("#gradeId").value;
  if (!id || !confirm(t("confirmDelete"))) return;

  data.grades = data.grades.filter(item => item.id !== id);

  await saveData();
  closeModal("gradeModal");
  renderAll();
  toast(t("gradeDeleted"));
});

function renderGrades() {
  const summary = $("#gradesSummary");
  const list = $("#gradesList");
  if (!summary || !list) return;

  const scale = Number(data.profile.gradeMax) || 20;

  if (!data.grades.length) {
    summary.innerHTML = "";
    list.innerHTML = `<p class="empty-text">${escapeHTML(t("noGrades"))}</p>`;
    return;
  }

  const overall = averageOf(data.grades);

  summary.innerHTML = `
    <section class="panel grade-summary">
      <span>${escapeHTML(t("overallAverage"))}</span>
      <strong>${escapeHTML(formatNumber(overall))}<small> / ${escapeHTML(formatNumber(scale))}</small></strong>
      <em>${escapeHTML(t("gradesCount", { n: data.grades.length }))}</em>
    </section>
  `;

  const bySubject = {};

  data.grades.forEach(grade => {
    const key = grade.subject || "—";
    (bySubject[key] = bySubject[key] || []).push(grade);
  });

  list.innerHTML = Object.keys(bySubject)
    .sort((a, b) => a.localeCompare(b))
    .map(subject => {
      const grades = bySubject[subject]
        .slice()
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

      return `
        <section class="panel grade-group">
          <div class="grade-group-head">
            <h3>${escapeHTML(subject)}</h3>
            <strong>${escapeHTML(formatNumber(averageOf(grades)))} / ${escapeHTML(formatNumber(scale))}</strong>
          </div>

          ${grades.map(grade => `
            <button type="button" class="grade-row" data-grade-edit="${escapeHTML(grade.id)}">
              <span class="grade-row-name">
                ${escapeHTML(grade.name || t("defaultGradeName"))}
                <small>${escapeHTML(formatDate(grade.date))}${Number(grade.weight) !== 1 ? ` · ×${escapeHTML(formatNumber(grade.weight))}` : ""}</small>
              </span>
              <span class="grade-row-value">${escapeHTML(formatNumber(grade.value))} / ${escapeHTML(formatNumber(grade.max))}</span>
            </button>
          `).join("")}
        </section>
      `;
    }).join("");
}

$("#gradesList")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-grade-edit]");
  if (!button) return;

  const grade = data.grades.find(item => item.id === button.dataset.gradeEdit);
  if (grade) openGradeModal(grade);
});


// ==========================================
// 14. REVISION (FLASHCARDS)
// ==========================================

function getDeck(id) {
  return data.decks.find(deck => deck.id === id);
}

function dueCards(deck) {
  return deck.cards.filter(card => (card.due || "") <= today());
}

function shuffle(list) {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function openDeckModal(deck = null) {
  $("#deckForm").reset();

  $("#deckId").value = deck?.id || "";
  $("#deckName").value = deck?.name || "";

  setText("deckModalTitle", deck ? t("editDeck") : t("newDeck"));
  $("#deckDelete").hidden = !deck;

  openModal("deckModal");
}

function openCardModal(card = null) {
  $("#cardForm").reset();

  $("#cardId").value = card?.id || "";
  $("#cardFront").value = card?.front || "";
  $("#cardBack").value = card?.back || "";

  setText("cardModalTitle", card ? t("editCard") : t("addCard"));
  $("#cardDelete").hidden = !card;

  openModal("cardModal");
}

$("#addDeckButton")?.addEventListener("click", () => openDeckModal());

$("#deckForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = $("#deckId").value;
  const name = $("#deckName").value.trim();

  if (id) {
    const deck = getDeck(id);
    if (deck) deck.name = name;
  } else {
    const deck = { id: makeId(), name, cards: [] };
    data.decks.push(deck);
    revision = { ...revision, view: "deck", deckId: deck.id };
  }

  await saveData();
  closeModal("deckModal");
  renderRevision();
  toast(t("deckSaved"));
});

$("#deckDelete")?.addEventListener("click", async () => {
  const id = $("#deckId").value;
  if (!id || !confirm(t("confirmDelete"))) return;

  data.decks = data.decks.filter(deck => deck.id !== id);
  revision = { ...revision, view: "list", deckId: null };

  await saveData();
  closeModal("deckModal");
  renderRevision();
});

$("#cardForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const deck = getDeck(revision.deckId);
  if (!deck) return;

  const id = $("#cardId").value;
  const front = $("#cardFront").value.trim();
  const back = $("#cardBack").value.trim();

  if (id) {
    const card = deck.cards.find(item => item.id === id);
    if (card) {
      card.front = front;
      card.back = back;
    }
  } else {
    deck.cards.push({ id: makeId(), front, back, box: 0, due: today() });
  }

  await saveData();
  closeModal("cardModal");
  renderRevision();
  toast(t("cardSaved"));
});

$("#cardDelete")?.addEventListener("click", async () => {
  const deck = getDeck(revision.deckId);
  const id = $("#cardId").value;
  if (!deck || !id || !confirm(t("confirmDelete"))) return;

  deck.cards = deck.cards.filter(card => card.id !== id);

  await saveData();
  closeModal("cardModal");
  renderRevision();
});

function startStudy(deckId) {
  const deck = getDeck(deckId);
  if (!deck || !deck.cards.length) return;

  const due = dueCards(deck);
  const cards = due.length ? due : deck.cards;

  revision = {
    view: "study",
    deckId,
    queue: shuffle(cards.map(card => card.id)),
    index: 0,
    revealed: false,
    retried: [],
    reviewed: 0
  };

  renderRevision();
}

function answerCard(knew) {
  const deck = getDeck(revision.deckId);
  const cardId = revision.queue[revision.index];
  const card = deck?.cards.find(item => item.id === cardId);

  if (card) {
    if (knew) {
      card.box = Math.min(BOX_DAYS.length - 1, (Number(card.box) || 0) + 1);
      card.due = daysFromNow(BOX_DAYS[card.box]);
    } else {
      card.box = 0;
      card.due = today();

      // A forgotten card comes back once more in this session.
      if (!revision.retried.includes(cardId)) {
        revision.retried.push(cardId);
        revision.queue.push(cardId);
      }
    }

    revision.reviewed++;
    saveData();
  }

  revision.index++;
  revision.revealed = false;
  renderRevision();
}

function renderRevision() {
  const view = $("#revisionView");
  if (!view || !data) return;

  const addButton = $("#addDeckButton");
  if (addButton) addButton.hidden = revision.view !== "list";

  const deck = getDeck(revision.deckId);

  if (revision.view !== "list" && !deck) {
    revision = { ...revision, view: "list", deckId: null };
  }

  // ----- list of decks
  if (revision.view === "list") {
    if (!data.decks.length) {
      view.innerHTML = `<p class="empty-text">${escapeHTML(t("noDecks"))}</p>`;
      return;
    }

    view.innerHTML = `
      <div class="deck-grid">
        ${data.decks.map(item => {
          const due = dueCards(item).length;

          return `
            <article class="panel deck-card" data-deck-open="${escapeHTML(item.id)}">
              <h3>${escapeHTML(item.name)}</h3>
              <p>${escapeHTML(t("cardsCount", { n: item.cards.length }))}${due ? ` · <b>${escapeHTML(t("dueCount", { n: due }))}</b>` : ""}</p>
              ${item.cards.length ? `
                <button type="button" class="${due ? "primary-button" : "secondary-button"}" data-deck-study="${escapeHTML(item.id)}">
                  ${escapeHTML(due ? t("study") : t("practiceAll"))}
                </button>` : ""}
            </article>
          `;
        }).join("")}
      </div>
    `;
    return;
  }

  // ----- one deck
  if (revision.view === "deck") {
    const due = dueCards(deck).length;

    view.innerHTML = `
      <div class="deck-header">
        <button type="button" class="text-button" data-revision-back>← ${escapeHTML(t("decks"))}</button>
        <h2>${escapeHTML(deck.name)}</h2>
        <div class="deck-header-actions">
          <button type="button" class="secondary-button" data-deck-edit>${escapeHTML(t("edit"))}</button>
          <button type="button" class="primary-button" data-card-add>${escapeHTML(t("addCard"))}</button>
        </div>
      </div>

      ${deck.cards.length ? `
        <div class="panel deck-study-bar">
          <p>${escapeHTML(t("cardsCount", { n: deck.cards.length }))}${due ? ` · <b>${escapeHTML(t("dueCount", { n: due }))}</b>` : ""}</p>
          <button type="button" class="${due ? "primary-button" : "secondary-button"}" data-deck-study="${escapeHTML(deck.id)}">
            ${escapeHTML(due ? t("study") : t("practiceAll"))}
          </button>
        </div>

        <div class="card-list">
          ${deck.cards.map(card => `
            <button type="button" class="card-row" data-card-edit="${escapeHTML(card.id)}">
              <strong>${escapeHTML(card.front)}</strong>
              <span>${escapeHTML(card.back)}</span>
            </button>
          `).join("")}
        </div>
      ` : `<p class="empty-text">${escapeHTML(t("noCards"))}</p>`}
    `;
    return;
  }

  // ----- study session
  const total = revision.queue.length;
  const finished = revision.index >= total;

  if (finished) {
    view.innerHTML = `
      <div class="study study-done">
        <h2>${escapeHTML(t("reviewDone"))}</h2>
        <p>${escapeHTML(t("reviewedCount", { n: revision.reviewed }))}</p>
        <button type="button" class="primary-button" data-study-exit>${escapeHTML(t("close"))}</button>
      </div>
    `;
    return;
  }

  const card = deck.cards.find(item => item.id === revision.queue[revision.index]);

  if (!card) {
    revision.index++;
    renderRevision();
    return;
  }

  const percent = Math.round((revision.index / total) * 100);

  view.innerHTML = `
    <div class="study">
      <div class="study-top">
        <button type="button" class="text-button" data-study-exit>✕ ${escapeHTML(t("close"))}</button>
        <span>${revision.index + 1} / ${total}</span>
      </div>

      <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>

      <article class="flashcard">
        <p class="flash-label">${escapeHTML(t("question"))}</p>
        <div class="flash-text">${escapeHTML(card.front)}</div>

        ${revision.revealed ? `
          <hr>
          <p class="flash-label">${escapeHTML(t("answer"))}</p>
          <div class="flash-text">${escapeHTML(card.back)}</div>
        ` : ""}
      </article>

      <div class="study-actions">
        ${revision.revealed ? `
          <button type="button" class="secondary-button" data-answer="no">${escapeHTML(t("notYet"))}</button>
          <button type="button" class="primary-button" data-answer="yes">${escapeHTML(t("gotIt"))}</button>
        ` : `
          <button type="button" class="primary-button" data-reveal>${escapeHTML(t("showAnswer"))}</button>
        `}
      </div>
    </div>
  `;
}

$("#revisionView")?.addEventListener("click", (event) => {
  const target = event.target;

  const study = target.closest("[data-deck-study]");
  if (study) {
    startStudy(study.dataset.deckStudy);
    return;
  }

  const open = target.closest("[data-deck-open]");
  if (open) {
    revision = { ...revision, view: "deck", deckId: open.dataset.deckOpen };
    renderRevision();
    return;
  }

  if (target.closest("[data-revision-back]")) {
    revision = { ...revision, view: "list", deckId: null };
    renderRevision();
    return;
  }

  if (target.closest("[data-deck-edit]")) {
    openDeckModal(getDeck(revision.deckId));
    return;
  }

  if (target.closest("[data-card-add]")) {
    openCardModal();
    return;
  }

  const cardEdit = target.closest("[data-card-edit]");
  if (cardEdit) {
    const card = getDeck(revision.deckId)?.cards.find(item => item.id === cardEdit.dataset.cardEdit);
    if (card) openCardModal(card);
    return;
  }

  if (target.closest("[data-reveal]")) {
    revision.revealed = true;
    renderRevision();
    return;
  }

  const answer = target.closest("[data-answer]");
  if (answer) {
    answerCard(answer.dataset.answer === "yes");
    return;
  }

  if (target.closest("[data-study-exit]")) {
    revision = { ...revision, view: "deck", queue: [], index: 0, revealed: false };
    renderRevision();
  }
});

// Space or Enter reveals the answer while studying.
document.addEventListener("keydown", (event) => {
  const onRevision = $("#page-revision")?.classList.contains("active");
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "");
  const modalOpen = $$(".modal-overlay.open").length > 0;

  if (!onRevision || typing || modalOpen || revision.view !== "study") return;
  if (revision.index >= revision.queue.length) return;

  if ((event.key === " " || event.key === "Enter") && !revision.revealed) {
    event.preventDefault();
    revision.revealed = true;
    renderRevision();
  }
});


// ==========================================
// 15. GOALS
// ==========================================

function openGoalModal(goal = null) {
  $("#goalForm").reset();

  $("#goalId").value = goal?.id || "";
  $("#goalTitle").value = goal?.title || "";
  $("#goalDescription").value = goal?.description || "";
  $("#goalTarget").value = goal?.target || 10;
  $("#goalUnit").value = goal?.unit || "sessions";
  $("#goalCurrent").value = goal?.current || 0;

  setText("goalModalTitle", goal ? t("editGoal") : t("newGoal"));

  openModal("goalModal");
}

$("#addGoalButton")?.addEventListener("click", () => openGoalModal());

$("#goalForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = $("#goalId").value;
  const target = Number($("#goalTarget").value);
  const current = Number($("#goalCurrent").value);

  if (target <= 0 || current < 0) {
    toast(t("errGoal"));
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

  setText(
    "goalsSummary",
    data.goals.length ? t("goalsSummary", { a: achieved, b: data.goals.length }) : ""
  );

  if (!data.goals.length) {
    list.innerHTML = `<p class="empty-text">${escapeHTML(t("noGoals"))}</p>`;
    return;
  }

  list.innerHTML = data.goals.map(goal => {
    const percent = Math.min(
      100,
      Math.round((Number(goal.current) / Number(goal.target)) * 100)
    );

    return `
      <article class="panel goal-card">
        <h3>${escapeHTML(goal.title)}</h3>
        ${goal.description ? `<p>${escapeHTML(goal.description)}</p>` : ""}

        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>

        <div class="goal-meta">
          <span>${escapeHTML(String(goal.current))} / ${escapeHTML(String(goal.target))} ${escapeHTML(goal.unit)}</span>
          <strong>${percent}%</strong>
        </div>

        <div class="goal-actions">
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
// 16. FOCUS
// ==========================================

function timerFullDuration() {
  return modeSeconds(currentMode);
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
  timerRemaining = modeSeconds(mode);

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
    data.focus.minutes += modeSeconds("focus") / 60;
    data.history[today()] = data.focus.minutes;
    await saveData();
    renderFocusStats();
    renderHome();
  }

  if (data?.profile?.sound !== "off") playChime();

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
  toast(t("intentionSaved"));
});

function renderFocusStats() {
  $("#focusIntention").value = data.intention || "";

  setText("focusStatsLine", t("focusStats", {
    s: data.focus.sessions || 0,
    m: Math.round(data.focus.minutes || 0)
  }));
}


// ==========================================
// 17. REFLECTION
// ==========================================

function renderJournal() {
  setText("journalDate", formatDate(today()));

  const history = $("#journalHistory");
  if (!history) return;

  if (!data.reflections.length) {
    history.hidden = true;
    history.innerHTML = "";
    return;
  }

  history.hidden = false;

  history.innerHTML = `
    <h3>${escapeHTML(t("previousReflections"))}</h3>
    ${data.reflections
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(item => `
        <article class="reflection-entry">
          <strong>${escapeHTML(formatDate(item.date))}</strong>
          <p><b>${escapeHTML(t("wentWell"))}:</b> ${escapeHTML(item.wins || "—")}</p>
          <p><b>${escapeHTML(t("challenges"))}:</b> ${escapeHTML(item.challenges || "—")}</p>
          <p><b>${escapeHTML(t("nextSteps"))}:</b> ${escapeHTML(item.next || "—")}</p>
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
    toast(t("errReflection"));
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

  setText("journalMessage", t("reflectionSaved"));
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
// 18. REMINDERS (NOTIFICATIONS)
// ==========================================

// Shows one notification per day when tasks are overdue or due soon.
// It runs while the app is open or installed and running on the device.
async function checkReminders() {
  if (!data || data.profile.reminderDays === "off") return;
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const { overdue, soon } = getReminderTasks();
  const count = overdue.length + soon.length;

  if (!count) return;

  const key = `keycla-reminded:${currentUser?.id || "local"}`;
  if (localStorage.getItem(key) === today()) return;

  localStorage.setItem(key, today());

  const body = t("notifBody", { n: count });

  try {
    const registration = await navigator.serviceWorker?.getRegistration();

    if (registration) {
      await registration.showNotification("KEYCLA", {
        body,
        icon: "icon-192.png",
        badge: "icon-192.png",
        tag: "keycla-reminder"
      });
    } else {
      new Notification("KEYCLA", { body, icon: "icon-192.png" });
    }
  } catch (error) {
    console.warn("Reminder could not be shown:", error);
  }
}

setInterval(checkReminders, 30 * 60 * 1000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    checkReminders();
    if (data) renderHome();
  }
});


// ==========================================
// 19. RENDER EVERYTHING
// ==========================================

function renderAll() {
  if (!data) return;

  renderProfile();
  renderHome();
  renderTasks();
  renderTimetable();
  renderGrades();
  renderRevision();
  renderGoals();
  renderFocusStats();
  renderJournal();
  updateTimerDisplay();
}


// ==========================================
// 20. EXPORT / IMPORT / RESET
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
    toast(t("errBackup"));
  }

  event.target.value = "";
});

$("#resetData")?.addEventListener("click", async () => {
  if (!confirm(t("confirmReset"))) return;

  data = defaults();
  revision = { ...revision, view: "list", deckId: null };

  await saveData();
  renderAll();

  toast(t("dataReset"));
});


// ==========================================
// 21. AUTHENTICATION
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
  hideBoot();
  $("#authScreen").hidden = false;
  $("#appShell").hidden = true;

  $("#loginForm").hidden = true;
  $("#signupForm").hidden = true;
  $("#recoveryForm").hidden = false;
  $("#authTabs").hidden = true;
  setAuthMessage("");
}

$("#forgotPassword")?.addEventListener("click", async () => {
  if (!supabaseClient) {
    setAuthMessage(t("recoveryNeedsSetup"), true);
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
      redirectTo: window.location.origin + window.location.pathname,
      queryParams: { prompt: "select_account" }
    }
  });

  if (error) {
    setAuthMessage(error.message || t("googleError"), true);
  }
}

$$("[data-google-login]").forEach((button) => {
  button.addEventListener("click", signInWithGoogle);
});

// Used when someone presses "Create account" with an email that already exists:
// we try to sign them in with the password they just typed.
async function signInExistingAccount(email, password) {
  const { data: result, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (!error && result?.user) {
    await loadStudentData(result.user);
    return;
  }

  $("#loginEmail").value = email;
  switchAuthTab("login");

  if (/not confirmed/i.test(error?.message || "")) {
    setAuthMessage(t("confirmEmail"), true);
  } else {
    setAuthMessage(t("accountExists"), true);
  }
}

$("#loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supabaseClient) {
    setAuthMessage(t("demoMode"), false);
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
    const message = error.message || "";

    if (/invalid login credentials/i.test(message)) {
      setAuthMessage(t("loginError"), true);
    } else if (/not confirmed/i.test(message)) {
      setAuthMessage(t("confirmEmail"), true);
    } else {
      setAuthMessage(message || t("loginError"), true);
    }

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

  // Supabase either returns an "already registered" error, or (when email
  // confirmation is on) a fake user with no identities.
  const alreadyExists =
    (error && /already|registered|exists/i.test(error.message || "")) ||
    (!error && Array.isArray(result?.user?.identities) && result.user.identities.length === 0);

  if (alreadyExists) {
    await signInExistingAccount(email, password);
    return;
  }

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

  recoveryMode = false;
  $("#authTabs").hidden = false;

  const { data: sessionResult } = await supabaseClient.auth.getSession();

  if (sessionResult?.session?.user) {
    await loadStudentData(sessionResult.session.user);
    toast(t("passwordUpdated"));
  } else {
    switchAuthTab("login");
    setAuthMessage(t("passwordUpdated"));
  }
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
// 22. INSTALLABLE APP (PWA)
// ==========================================

if ("serviceWorker" in navigator &&
    (window.location.protocol === "https:" || window.location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("Service worker not registered:", error);
    });
  });
}

const isStandalone =
  window.matchMedia?.("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

if (!isStandalone && isIOS) {
  // iPhone and iPad cannot show an install button: explain the manual steps.
  $("#installRow").hidden = false;
  $("#installButton").hidden = true;
  $("#installHint").hidden = false;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstall = event;

  $("#installRow").hidden = false;
  $("#installButton").hidden = false;
});

$("#installButton")?.addEventListener("click", async () => {
  if (!deferredInstall) return;

  deferredInstall.prompt();
  await deferredInstall.userChoice;

  deferredInstall = null;
  $("#installRow").hidden = true;
});

window.addEventListener("appinstalled", () => {
  deferredInstall = null;
  $("#installRow").hidden = true;
});


// ==========================================
// 23. START
// ==========================================

document.addEventListener("DOMContentLoaded", initializeApp);
