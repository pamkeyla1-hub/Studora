// ==========================================
// KEYCLA — Features
// Exam countdown, IB / IGCSE projects, XP, levels and daily challenge.
//
// Loaded AFTER script.js. It reuses the helpers and the `data` object of
// script.js and only adds new keys to the saved workspace:
//   data.exams, data.projects, data.xp, data.daily
// ==========================================

(function () {
  "use strict";

  if (typeof LANGUAGES === "undefined" || typeof $ !== "function") {
    console.warn("features.js: script.js must be loaded first.");
    return;
  }

  const CHALLENGE_XP = 30;
  const PROJECT_DONE_XP = 40;
  const STEP_XP = 5;
  const STEP_XP_DAILY_CAP = 25;
  const CARD_XP_DAILY_CAP = 50;

  // ------------------------------------------
  // 1. TEXT
  // ------------------------------------------

  Object.assign(LANGUAGES.en, {
    kxExams: "Exams",
    kxProjects: "Projects",
    kxExamsIntro: "Every exam, counted down to the day.",
    kxProjectsIntro: "Big projects, broken into small steps.",

    kxNewExam: "New exam",
    kxEditExam: "Edit exam",
    kxExamSubject: "Subject",
    kxExamLabel: "Paper or name (optional)",
    kxExamLabelPh: "Paper 1",
    kxExamDate: "Exam date",
    kxNoExams: "Add your exam dates and watch the countdown.",
    kxExamSaved: "Exam saved.",
    kxExamDeleted: "Exam deleted.",
    kxPast: "Past exams",
    kxNextExam: "Next exam",
    kxAddExamCta: "Add your exam dates",
    kxDay: "day",
    kxDays: "days",
    kxToday: "Today",
    kxWeeks: "about {n} weeks left",

    kxNewProject: "New project",
    kxEditProject: "Edit project",
    kxProjTitle: "Title",
    kxProjTitlePh: "My Extended Essay",
    kxProjKind: "Type",
    kxProjDue: "Deadline",
    kxAddSteps: "Add suggested steps",
    kxNoProjects: "Track your Extended Essay, IAs and CAS step by step.",
    kxProjectSaved: "Project saved.",
    kxProjectDeleted: "Project deleted.",
    kxAddStep: "Add a step…",
    kxAdd: "Add",
    kxSteps: "{a} / {b} steps",
    kxNoSteps: "No steps yet.",
    kxDueIn: "due in {n} days",
    kxKind_ee: "Extended Essay",
    kxKind_ia: "Internal Assessment",
    kxKind_cas: "CAS",
    kxKind_tok: "TOK",
    kxKind_other: "Coursework",
    kxProjectComplete: "Project complete! +{n} XP",

    kxLevel: "Level {n}",
    kxXpLeft: "{n} XP to level {l}",
    kxNoStreak: "Start your streak today",
    kxChallenge: "Daily challenge",
    kxChMinutes: "Focus for {n} minutes",
    kxChTasks: "Complete {n} tasks",
    kxChCards: "Review {n} flashcards",
    kxChDone: "Completed",
    kxChallengeDone: "Challenge complete! +{n} XP",
    kxLevelUp: "Level up! You are now level {n}.",
    kxError: "Error"
  });

  Object.assign(LANGUAGES.fr, {
    kxExams: "Examens",
    kxProjects: "Projets",
    kxExamsIntro: "Chaque examen, décompté au jour près.",
    kxProjectsIntro: "Les gros projets, découpés en petites étapes.",

    kxNewExam: "Nouvel examen",
    kxEditExam: "Modifier l'examen",
    kxExamSubject: "Matière",
    kxExamLabel: "Épreuve ou nom (facultatif)",
    kxExamLabelPh: "Paper 1",
    kxExamDate: "Date de l'examen",
    kxNoExams: "Ajoute tes dates d'examen et regarde le compte à rebours.",
    kxExamSaved: "Examen enregistré.",
    kxExamDeleted: "Examen supprimé.",
    kxPast: "Examens passés",
    kxNextExam: "Prochain examen",
    kxAddExamCta: "Ajoute tes dates d'examen",
    kxDay: "jour",
    kxDays: "jours",
    kxToday: "Aujourd'hui",
    kxWeeks: "environ {n} semaines restantes",

    kxNewProject: "Nouveau projet",
    kxEditProject: "Modifier le projet",
    kxProjTitle: "Titre",
    kxProjTitlePh: "Mon Extended Essay",
    kxProjKind: "Type",
    kxProjDue: "Date limite",
    kxAddSteps: "Ajouter les étapes conseillées",
    kxNoProjects: "Suis ton Extended Essay, tes IA et ton CAS étape par étape.",
    kxProjectSaved: "Projet enregistré.",
    kxProjectDeleted: "Projet supprimé.",
    kxAddStep: "Ajouter une étape…",
    kxAdd: "Ajouter",
    kxSteps: "{a} / {b} étapes",
    kxNoSteps: "Aucune étape pour le moment.",
    kxDueIn: "dans {n} jours",
    kxKind_ee: "Extended Essay",
    kxKind_ia: "Évaluation interne (IA)",
    kxKind_cas: "CAS",
    kxKind_tok: "TOK",
    kxKind_other: "Projet",
    kxProjectComplete: "Projet terminé ! +{n} XP",

    kxLevel: "Niveau {n}",
    kxXpLeft: "{n} XP avant le niveau {l}",
    kxNoStreak: "Commence ta série aujourd'hui",
    kxChallenge: "Défi du jour",
    kxChMinutes: "Concentre-toi {n} minutes",
    kxChTasks: "Termine {n} tâches",
    kxChCards: "Révise {n} fiches",
    kxChDone: "Terminé",
    kxChallengeDone: "Défi réussi ! +{n} XP",
    kxLevelUp: "Niveau supérieur ! Tu es niveau {n}.",
    kxError: "Erreur"
  });

  const STEP_TEMPLATES = {
    en: {
      ee: [
        "Choose your subject and topic",
        "Get your research question approved",
        "Research and take notes",
        "Write an outline",
        "Write the first draft",
        "Get supervisor feedback",
        "Write the final draft",
        "Complete the reflection forms",
        "Submit"
      ],
      ia: [
        "Choose a topic",
        "Plan your method",
        "Collect data or sources",
        "Write the first draft",
        "Get teacher feedback",
        "Write the final version",
        "Submit"
      ],
      cas: [
        "Plan your next experience",
        "Do the experience",
        "Collect evidence",
        "Write a reflection",
        "Meet your CAS coordinator"
      ],
      tok: [
        "Choose your title or objects",
        "Write an outline",
        "Write the first draft",
        "Get teacher feedback",
        "Write the final version",
        "Submit"
      ],
      other: []
    },
    fr: {
      ee: [
        "Choisir la matière et le sujet",
        "Faire valider la question de recherche",
        "Faire les recherches et prendre des notes",
        "Écrire le plan",
        "Écrire le premier jet",
        "Recevoir les retours du superviseur",
        "Écrire la version finale",
        "Remplir les formulaires de réflexion",
        "Rendre le travail"
      ],
      ia: [
        "Choisir un sujet",
        "Planifier la méthode",
        "Collecter les données ou les sources",
        "Écrire le premier jet",
        "Recevoir les retours du professeur",
        "Écrire la version finale",
        "Rendre le travail"
      ],
      cas: [
        "Planifier la prochaine expérience",
        "Réaliser l'expérience",
        "Rassembler les preuves",
        "Écrire une réflexion",
        "Rencontrer le coordinateur CAS"
      ],
      tok: [
        "Choisir le titre ou les objets",
        "Écrire un plan",
        "Écrire le premier jet",
        "Recevoir les retours du professeur",
        "Écrire la version finale",
        "Rendre le travail"
      ],
      other: []
    }
  };

  const KINDS = ["ee", "ia", "cas", "tok", "other"];

  const CHALLENGES = [
    { id: "m25", type: "minutes", target: 25 },
    { id: "t2", type: "tasks", target: 2 },
    { id: "c10", type: "cards", target: 10 },
    { id: "m45", type: "minutes", target: 45 },
    { id: "t3", type: "tasks", target: 3 },
    { id: "m60", type: "minutes", target: 60 }
  ];

  const CHALLENGE_KEYS = {
    minutes: "kxChMinutes",
    tasks: "kxChTasks",
    cards: "kxChCards"
  };

  // ------------------------------------------
  // 2. DATA HELPERS
  // ------------------------------------------

  // Makes sure the new keys exist (older saves do not have them).
  function ensure() {
    if (!data) return false;

    if (!Array.isArray(data.exams)) data.exams = [];
    if (!Array.isArray(data.projects)) data.projects = [];
    data.xp = Math.max(0, Number(data.xp) || 0);

    const daily = data.daily;
    if (!daily || typeof daily !== "object" || daily.date !== today()) {
      data.daily = { date: today(), tasks: 0, cards: 0, cardXp: 0, stepXp: 0, done: false };
    }

    return true;
  }

  function daysUntil(dateString) {
    const from = new Date(`${today()}T00:00:00`);
    const to = new Date(`${dateString}T00:00:00`);
    return Math.round((to - from) / 86400000);
  }

  function dayNumber() {
    const [y, m, d] = today().split("-").map(Number);
    return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
  }

  function levelInfo(xp) {
    const level = Math.floor(Math.sqrt(xp / 50)) + 1;
    const base = 50 * (level - 1) ** 2;
    const next = 50 * level ** 2;

    return {
      level,
      next,
      toNext: next - xp,
      pct: Math.max(0, Math.min(100, Math.round(((xp - base) / (next - base)) * 100)))
    };
  }

  function todaysChallenge() {
    return CHALLENGES[dayNumber() % CHALLENGES.length];
  }

  function metricValue(challenge) {
    if (challenge.type === "minutes") {
      return data.focus && data.focus.date === today()
        ? Math.round(Number(data.focus.minutes) || 0)
        : 0;
    }

    if (challenge.type === "tasks") return data.daily.tasks;
    if (challenge.type === "cards") return data.daily.cards;
    return 0;
  }

  function stepTemplate(kind) {
    const set = STEP_TEMPLATES[currentLanguage] || STEP_TEMPLATES.en;
    return set[kind] || [];
  }

  function upcomingExams() {
    return data.exams
      .filter(exam => exam.date && daysUntil(exam.date) >= 0)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  function examName(exam) {
    return [exam.subject, exam.label].filter(Boolean).join(" — ");
  }

  // ------------------------------------------
  // 3. XP
  // ------------------------------------------

  // Changes the XP in memory only (the caller saves).
  function grantXP(amount) {
    const before = levelInfo(data.xp).level;
    data.xp = Math.max(0, Math.round(data.xp + amount));
    const after = levelInfo(data.xp).level;

    if (after > before) toast(t("kxLevelUp", { n: after }));
  }

  async function awardXP(amount) {
    if (!ensure()) return;

    grantXP(amount);
    await saveData();
    renderKxHome();
  }

  function checkChallenge() {
    const challenge = todaysChallenge();

    if (!data.daily.done && metricValue(challenge) >= challenge.target) {
      data.daily.done = true;
      grantXP(CHALLENGE_XP);
      toast(t("kxChallengeDone", { n: CHALLENGE_XP }));
      saveData();
    }
  }

  // ------------------------------------------
  // 4. PAGE STRUCTURE (injected once)
  // ------------------------------------------

  function injectStructure() {
    // Navigation
    const firstNav = $("#sidebar .main-nav");

    if (firstNav && !firstNav.querySelector('[data-page="exams"]')) {
      const make = (page, icon, key) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "nav-link";
        button.dataset.page = page;
        button.innerHTML =
          `<span class="nav-icon">${icon}</span>` +
          `<span data-i18n="${key}">${escapeHTML(t(key))}</span>`;
        return button;
      };

      firstNav.append(make("exams", "⏳", "kxExams"), make("projects", "◈", "kxProjects"));
    }

    // Pages
    const content = $(".content-area");

    if (content && !$("#page-exams")) {
      content.insertAdjacentHTML("beforeend", `
        <section class="page" id="page-exams">
          <div class="page-heading">
            <div>
              <h1 data-i18n="kxExams">${escapeHTML(t("kxExams"))}</h1>
              <p data-i18n="kxExamsIntro">${escapeHTML(t("kxExamsIntro"))}</p>
            </div>
            <button type="button" class="primary-button" id="addExamButton" data-i18n="kxNewExam">${escapeHTML(t("kxNewExam"))}</button>
          </div>
          <div id="kxExamList"></div>
        </section>

        <section class="page" id="page-projects">
          <div class="page-heading">
            <div>
              <h1 data-i18n="kxProjects">${escapeHTML(t("kxProjects"))}</h1>
              <p data-i18n="kxProjectsIntro">${escapeHTML(t("kxProjectsIntro"))}</p>
            </div>
            <button type="button" class="primary-button" id="addProjectButton" data-i18n="kxNewProject">${escapeHTML(t("kxNewProject"))}</button>
          </div>
          <div id="kxProjectList"></div>
        </section>
      `);
    }

    // Modals
    if (!$("#examModal")) {
      document.body.insertAdjacentHTML("beforeend", `
        <div class="modal-overlay" id="examModal" aria-hidden="true">
          <div class="modal" role="dialog" aria-modal="true" aria-labelledby="examModalTitle">
            <div class="modal-heading">
              <h2 id="examModalTitle">${escapeHTML(t("kxNewExam"))}</h2>
              <button type="button" class="icon-button" data-close="examModal" aria-label="Close">×</button>
            </div>

            <form id="examForm">
              <input type="hidden" id="examId">

              <label for="examSubject" data-i18n="kxExamSubject">${escapeHTML(t("kxExamSubject"))}</label>
              <input id="examSubject" type="text" required maxlength="40" list="subjectList">

              <label for="examLabel" data-i18n="kxExamLabel">${escapeHTML(t("kxExamLabel"))}</label>
              <input id="examLabel" type="text" maxlength="40" data-i18n-placeholder="kxExamLabelPh" placeholder="${escapeHTML(t("kxExamLabelPh"))}">

              <label for="examDate" data-i18n="kxExamDate">${escapeHTML(t("kxExamDate"))}</label>
              <input id="examDate" type="date" required>

              <div class="modal-actions">
                <button type="button" class="danger-button" id="examDelete" hidden data-i18n="delete">${escapeHTML(t("delete"))}</button>
                <button type="button" class="secondary-button" data-close="examModal" data-i18n="cancel">${escapeHTML(t("cancel"))}</button>
                <button type="submit" class="primary-button" data-i18n="save">${escapeHTML(t("save"))}</button>
              </div>
            </form>
          </div>
        </div>

        <div class="modal-overlay" id="projectModal" aria-hidden="true">
          <div class="modal" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
            <div class="modal-heading">
              <h2 id="projectModalTitle">${escapeHTML(t("kxNewProject"))}</h2>
              <button type="button" class="icon-button" data-close="projectModal" aria-label="Close">×</button>
            </div>

            <form id="projectForm">
              <input type="hidden" id="projectId">

              <label for="projectTitle" data-i18n="kxProjTitle">${escapeHTML(t("kxProjTitle"))}</label>
              <input id="projectTitle" type="text" required maxlength="80" data-i18n-placeholder="kxProjTitlePh" placeholder="${escapeHTML(t("kxProjTitlePh"))}">

              <div class="form-row">
                <div>
                  <label for="projectKind" data-i18n="kxProjKind">${escapeHTML(t("kxProjKind"))}</label>
                  <select id="projectKind" class="select-input"></select>
                </div>
                <div>
                  <label for="projectDue" data-i18n="kxProjDue">${escapeHTML(t("kxProjDue"))}</label>
                  <input id="projectDue" type="date">
                </div>
              </div>

              <label for="projectSubject" data-i18n="subject">${escapeHTML(t("subject"))}</label>
              <input id="projectSubject" type="text" maxlength="40" list="subjectList">

              <label class="kx-check" id="projectStepsRow">
                <input id="projectSteps" type="checkbox" checked>
                <span data-i18n="kxAddSteps">${escapeHTML(t("kxAddSteps"))}</span>
              </label>

              <div class="modal-actions">
                <button type="button" class="danger-button" id="projectDelete" hidden data-i18n="delete">${escapeHTML(t("delete"))}</button>
                <button type="button" class="secondary-button" data-close="projectModal" data-i18n="cancel">${escapeHTML(t("cancel"))}</button>
                <button type="submit" class="primary-button" data-i18n="save">${escapeHTML(t("save"))}</button>
              </div>
            </form>
          </div>
        </div>
      `);

      // Click outside the card closes the new modals (script.js only
      // wired the modals that existed when it started).
      ["examModal", "projectModal"].forEach((id) => {
        const overlay = document.getElementById(id);
        overlay.addEventListener("click", (event) => {
          if (event.target === overlay) closeModal(id);
        });
      });
    }

    // Home cards (placed before the To do / Today panels)
    if (!$("#kxHome")) {
      const grid = $("#page-dashboard .home-grid");
      const host = document.createElement("section");
      host.id = "kxHome";
      host.className = "kx-home-grid";

      if (grid) grid.before(host);
      else $("#page-dashboard")?.append(host);
    }
  }

  // ------------------------------------------
  // 5. HOME CARDS
  // ------------------------------------------

  function countParts(days) {
    if (days === 0) return { num: t("kxToday"), unit: "", word: true };
    return { num: String(days), unit: days === 1 ? t("kxDay") : t("kxDays"), word: false };
  }

  function renderKxHome() {
    const host = $("#kxHome");
    if (!host || !ensure()) return;

    checkChallenge();

    // Level, XP and streak
    const info = levelInfo(data.xp);
    const streak = computeStreak();

    const levelCard = `
      <article class="kx-card kx-level">
        <div class="kx-badge" aria-hidden="true">${info.level}</div>
        <div class="kx-level-body">
          <span class="kx-eyebrow">${escapeHTML(t("kxLevel", { n: info.level }))}</span>
          <strong>${escapeHTML(String(data.xp))} XP</strong>
          <div class="progress-track"><div class="progress-fill" style="width:${info.pct}%"></div></div>
          <small>${escapeHTML(t("kxXpLeft", { n: info.toNext, l: info.level + 1 }))}</small>
          <span class="kx-streak">🔥 ${escapeHTML(streak >= 1 ? t("streakLabel", { n: streak }) : t("kxNoStreak"))}</span>
        </div>
      </article>
    `;

    // Next exam
    const next = upcomingExams()[0];
    let examCard;

    if (next) {
      const parts = countParts(daysUntil(next.date));

      examCard = `
        <button type="button" class="kx-card kx-exam-card" data-page="exams">
          <span class="kx-eyebrow">${escapeHTML(t("kxNextExam"))}</span>
          <span class="kx-bignum${parts.word ? " is-word" : ""}">
            <strong>${escapeHTML(parts.num)}</strong>
            ${parts.unit ? `<span>${escapeHTML(parts.unit)}</span>` : ""}
          </span>
          <span class="kx-exam-name">${escapeHTML(examName(next))}</span>
        </button>
      `;
    } else {
      examCard = `
        <button type="button" class="kx-card kx-exam-card kx-empty" data-kx-add-exam>
          <span class="kx-eyebrow">${escapeHTML(t("kxNextExam"))}</span>
          <span class="kx-exam-name">+ ${escapeHTML(t("kxAddExamCta"))}</span>
        </button>
      `;
    }

    // Daily challenge
    const challenge = todaysChallenge();
    const value = metricValue(challenge);
    const done = data.daily.done;
    const pct = Math.min(100, Math.round((value / challenge.target) * 100));
    const label = t(CHALLENGE_KEYS[challenge.type], { n: challenge.target });

    const challengeCard = `
      <article class="kx-card kx-challenge${done ? " is-done" : ""}">
        <span class="kx-eyebrow">${escapeHTML(t("kxChallenge"))}</span>
        <strong>${escapeHTML(label)}</strong>
        <div class="progress-track"><div class="progress-fill" style="width:${done ? 100 : pct}%"></div></div>
        <small>${escapeHTML(done
          ? `✓ ${t("kxChDone")}`
          : `${Math.min(value, challenge.target)} / ${challenge.target} · +${CHALLENGE_XP} XP`)}</small>
      </article>
    `;

    host.innerHTML = levelCard + examCard + challengeCard;
  }

  // ------------------------------------------
  // 6. EXAMS
  // ------------------------------------------

  function openExamModal(exam = null) {
    if (!ensure()) return;

    $("#examForm").reset();
    refreshSubjectList();

    $("#examId").value = exam?.id || "";
    $("#examSubject").value = exam?.subject || "";
    $("#examLabel").value = exam?.label || "";
    $("#examDate").value = exam?.date || "";

    setText("examModalTitle", exam ? t("kxEditExam") : t("kxNewExam"));
    $("#examDelete").hidden = !exam;

    openModal("examModal");
  }

  function examCardHTML(exam, past) {
    const days = daysUntil(exam.date);
    const parts = past ? { num: "✓", unit: "", word: true } : countParts(days);
    const weeks = !past && days >= 14
      ? ` · ${t("kxWeeks", { n: Math.round(days / 7) })}`
      : "";

    const soon = !past && days <= 14 ? " is-soon" : "";

    return `
      <button type="button" class="panel kx-exam${past ? " is-past" : ""}${soon}" data-exam-edit="${escapeHTML(exam.id)}">
        <span class="kx-count${parts.word ? " is-word" : ""}">
          <strong>${escapeHTML(parts.num)}</strong>
          ${parts.unit ? `<span>${escapeHTML(parts.unit)}</span>` : ""}
        </span>
        <span class="kx-exam-info">
          <h3>${escapeHTML(exam.subject)}</h3>
          <p>${escapeHTML([exam.label, formatDate(exam.date)].filter(Boolean).join(" · "))}${escapeHTML(weeks)}</p>
        </span>
      </button>
    `;
  }

  function renderExams() {
    const list = $("#kxExamList");
    if (!list || !ensure()) return;

    if (!data.exams.length) {
      list.innerHTML = `<p class="empty-text">${escapeHTML(t("kxNoExams"))}</p>`;
      return;
    }

    const upcoming = upcomingExams();
    const past = data.exams
      .filter(exam => exam.date && daysUntil(exam.date) < 0)
      .sort((a, b) => b.date.localeCompare(a.date));

    list.innerHTML = `
      ${upcoming.map(exam => examCardHTML(exam, false)).join("")}
      ${past.length ? `
        <h3 class="kx-section-title">${escapeHTML(t("kxPast"))}</h3>
        ${past.map(exam => examCardHTML(exam, true)).join("")}
      ` : ""}
    `;
  }

  $("#addExamButton")?.addEventListener("click", () => openExamModal());

  $("#kxExamList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-exam-edit]");
    if (!button || !ensure()) return;

    const exam = data.exams.find(item => item.id === button.dataset.examEdit);
    if (exam) openExamModal(exam);
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-kx-add-exam]")) {
      showPage("exams");
      openExamModal();
    }
  });

  $("#examForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!ensure()) return;

    const id = $("#examId").value;

    const exam = {
      id: id || makeId(),
      subject: $("#examSubject").value.trim(),
      label: $("#examLabel").value.trim(),
      date: $("#examDate").value
    };

    if (!exam.subject || !exam.date) return;

    if (id) {
      const index = data.exams.findIndex(item => item.id === id);
      if (index !== -1) data.exams[index] = exam;
    } else {
      data.exams.push(exam);
    }

    await saveData();
    closeModal("examModal");
    renderExams();
    renderKxHome();
    toast(t("kxExamSaved"));
  });

  $("#examDelete")?.addEventListener("click", async () => {
    const id = $("#examId").value;
    if (!id || !ensure() || !confirm(t("confirmDelete"))) return;

    data.exams = data.exams.filter(item => item.id !== id);

    await saveData();
    closeModal("examModal");
    renderExams();
    renderKxHome();
    toast(t("kxExamDeleted"));
  });

  // ------------------------------------------
  // 7. PROJECTS (Extended Essay, IA, CAS, TOK...)
  // ------------------------------------------

  function openProjectModal(project = null) {
    if (!ensure()) return;

    $("#projectForm").reset();
    refreshSubjectList();

    $("#projectKind").innerHTML = KINDS
      .map(kind => `<option value="${kind}">${escapeHTML(t(`kxKind_${kind}`))}</option>`)
      .join("");

    $("#projectId").value = project?.id || "";
    $("#projectTitle").value = project?.title || "";
    $("#projectKind").value = project?.kind || "ee";
    $("#projectDue").value = project?.due || "";
    $("#projectSubject").value = project?.subject || "";

    // Suggested steps only make sense for a new project.
    $("#projectStepsRow").hidden = Boolean(project);
    $("#projectSteps").checked = true;

    setText("projectModalTitle", project ? t("kxEditProject") : t("kxNewProject"));
    $("#projectDelete").hidden = !project;

    openModal("projectModal");
  }

  function dueText(due) {
    if (!due) return "";

    const days = daysUntil(due);
    if (days < 0) return t("overdue");
    if (days === 0) return t("dueToday");
    return t("kxDueIn", { n: days });
  }

  function projectCardHTML(project) {
    const steps = Array.isArray(project.steps) ? project.steps : [];
    const done = steps.filter(step => step.done).length;
    const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
    const meta = [
      project.subject,
      project.due ? formatDate(project.due) : "",
      dueText(project.due)
    ].filter(Boolean).map(escapeHTML).join(" · ");

    const id = escapeHTML(project.id);

    return `
      <article class="panel kx-project${pct === 100 ? " is-complete" : ""}">
        <div class="kx-project-head">
          <div class="kx-project-title">
            <span class="kx-tag">${escapeHTML(t(`kxKind_${project.kind || "other"}`))}</span>
            <h3>${escapeHTML(project.title)}</h3>
            ${meta ? `<p>${meta}</p>` : ""}
          </div>
          <button type="button" class="icon-button subtle" data-project-edit="${id}" aria-label="${escapeHTML(t("edit"))}">✎</button>
        </div>

        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <p class="kx-progress-label">${escapeHTML(t("kxSteps", { a: done, b: steps.length }))}</p>

        ${steps.length ? `
          <ul class="kx-steps">
            ${steps.map(step => `
              <li class="kx-step${step.done ? " is-done" : ""}">
                <label>
                  <input type="checkbox" data-step-toggle="${id}|${escapeHTML(step.id)}" ${step.done ? "checked" : ""}>
                  <span>${escapeHTML(step.text)}</span>
                </label>
                <button type="button" class="kx-step-del" data-step-delete="${id}|${escapeHTML(step.id)}" aria-label="${escapeHTML(t("delete"))}">×</button>
              </li>
            `).join("")}
          </ul>
        ` : `<p class="empty-text">${escapeHTML(t("kxNoSteps"))}</p>`}

        <div class="kx-step-add">
          <input type="text" maxlength="120" data-step-input="${id}" placeholder="${escapeHTML(t("kxAddStep"))}" aria-label="${escapeHTML(t("kxAddStep"))}">
          <button type="button" class="secondary-button" data-step-add="${id}">${escapeHTML(t("kxAdd"))}</button>
        </div>
      </article>
    `;
  }

  function renderProjects() {
    const list = $("#kxProjectList");
    if (!list || !ensure()) return;

    if (!data.projects.length) {
      list.innerHTML = `<p class="empty-text">${escapeHTML(t("kxNoProjects"))}</p>`;
      return;
    }

    const projects = [...data.projects].sort((a, b) =>
      (a.due || "9999").localeCompare(b.due || "9999")
    );

    list.innerHTML = projects.map(projectCardHTML).join("");
  }

  function findProject(id) {
    return data.projects.find(project => project.id === id);
  }

  async function addStep(projectId, input) {
    const project = findProject(projectId);
    const text = input.value.trim();
    if (!project || !text) return;

    project.steps = Array.isArray(project.steps) ? project.steps : [];
    project.steps.push({ id: makeId(), text, done: false });

    await saveData();
    renderProjects();

    const again = document.querySelector(`[data-step-input="${CSS.escape(projectId)}"]`);
    again?.focus();
  }

  $("#addProjectButton")?.addEventListener("click", () => openProjectModal());

  $("#projectForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!ensure()) return;

    const id = $("#projectId").value;
    const kind = $("#projectKind").value;

    const fields = {
      title: $("#projectTitle").value.trim(),
      kind,
      due: $("#projectDue").value,
      subject: $("#projectSubject").value.trim()
    };

    if (!fields.title) return;

    if (id) {
      const project = findProject(id);
      if (project) Object.assign(project, fields);
    } else {
      const steps = $("#projectSteps").checked
        ? stepTemplate(kind).map(text => ({ id: makeId(), text, done: false }))
        : [];

      data.projects.push({ id: makeId(), ...fields, steps, rewarded: false });
    }

    await saveData();
    closeModal("projectModal");
    renderProjects();
    toast(t("kxProjectSaved"));
  });

  $("#projectDelete")?.addEventListener("click", async () => {
    const id = $("#projectId").value;
    if (!id || !ensure() || !confirm(t("confirmDelete"))) return;

    data.projects = data.projects.filter(project => project.id !== id);

    await saveData();
    closeModal("projectModal");
    renderProjects();
    toast(t("kxProjectDeleted"));
  });

  $("#kxProjectList")?.addEventListener("click", async (event) => {
    if (!ensure()) return;

    const edit = event.target.closest("[data-project-edit]");
    if (edit) {
      const project = findProject(edit.dataset.projectEdit);
      if (project) openProjectModal(project);
      return;
    }

    const remove = event.target.closest("[data-step-delete]");
    if (remove) {
      const [projectId, stepId] = remove.dataset.stepDelete.split("|");
      const project = findProject(projectId);
      if (!project) return;

      project.steps = (project.steps || []).filter(step => step.id !== stepId);

      await saveData();
      renderProjects();
      return;
    }

    const add = event.target.closest("[data-step-add]");
    if (add) {
      const projectId = add.dataset.stepAdd;
      const input = document.querySelector(`[data-step-input="${CSS.escape(projectId)}"]`);
      if (input) addStep(projectId, input);
    }
  });

  $("#kxProjectList")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const input = event.target.closest("[data-step-input]");
    if (!input) return;

    event.preventDefault();
    addStep(input.dataset.stepInput, input);
  });

  $("#kxProjectList")?.addEventListener("change", async (event) => {
    const box = event.target.closest("[data-step-toggle]");
    if (!box || !ensure()) return;

    const [projectId, stepId] = box.dataset.stepToggle.split("|");
    const project = findProject(projectId);
    const step = project?.steps?.find(item => item.id === stepId);
    if (!step) return;

    step.done = box.checked;

    if (step.done) {
      // Each step pays out once, and never more than the daily cap.
      if (!step.xpGiven && data.daily.stepXp + STEP_XP <= STEP_XP_DAILY_CAP) {
        step.xpGiven = true;
        data.daily.stepXp += STEP_XP;
        grantXP(STEP_XP);
      }

      if (project.steps.length && project.steps.every(item => item.done) && !project.rewarded) {
        project.rewarded = true;
        grantXP(PROJECT_DONE_XP);
        toast(t("kxProjectComplete", { n: PROJECT_DONE_XP }));
      }
    }

    await saveData();
    renderProjects();
    renderKxHome();
  });

  // ------------------------------------------
  // 8. HOOKS INTO script.js
  // ------------------------------------------
  // script.js calls these functions by name, so replacing them on
  // `window` makes every internal call go through the wrappers.

  const originalRenderHome = window.renderHome;
  window.renderHome = function () {
    originalRenderHome.apply(this, arguments);
    renderKxHome();
  };

  const originalRenderAll = window.renderAll;
  window.renderAll = function () {
    originalRenderAll.apply(this, arguments);

    if (data) {
      renderExams();
      renderProjects();
    }
  };

  // A finished focus session gives XP (1 per minute, +5 from 15 minutes).
  const originalFinishTimer = window.finishTimer;
  window.finishTimer = async function () {
    const before = data?.focus?.sessions || 0;

    await originalFinishTimer.apply(this, arguments);

    if (data && (data.focus.sessions || 0) > before) {
      const minutes = Math.round(modeSeconds("focus") / 60);
      await awardXP(minutes + (minutes >= 15 ? 5 : 0));
    }
  };

  // Completing a task gives XP; un-completing it takes the same XP back.
  const originalToggleTask = window.toggleTask;
  window.toggleTask = async function (id) {
    const task = data?.tasks.find(item => item.id === id);
    const wasDone = task ? Boolean(task.completed) : null;

    await originalToggleTask.apply(this, arguments);

    if (!task || !ensure()) return;

    if (!wasDone && task.completed) {
      data.daily.tasks++;
      await awardXP(15);
    } else if (wasDone && !task.completed) {
      data.daily.tasks = Math.max(0, data.daily.tasks - 1);
      await awardXP(-15);
    }
  };

  // Reviewing a flashcard gives a little XP, capped each day.
  const originalAnswerCard = window.answerCard;
  window.answerCard = function (knew) {
    const before = revision.reviewed;

    originalAnswerCard.apply(this, arguments);

    if (!data || revision.reviewed <= before || !ensure()) return;

    data.daily.cards++;

    if (data.daily.cardXp < CARD_XP_DAILY_CAP) {
      const gain = knew ? 2 : 1;
      data.daily.cardXp += gain;
      grantXP(gain);
    }

    saveData();
    renderKxHome();
  };

  // Subjects used by exams and projects also appear in the suggestions.
  const originalRefreshSubjects = window.refreshSubjectList;
  window.refreshSubjectList = function () {
    originalRefreshSubjects.apply(this, arguments);

    if (!ensure()) return;

    const list = $("#subjectList");
    if (!list) return;

    const known = new Set([...list.querySelectorAll("option")].map(option => option.value));

    [...data.exams, ...data.projects].forEach((item) => {
      if (item.subject && !known.has(item.subject)) {
        known.add(item.subject);
        const option = document.createElement("option");
        option.value = item.subject;
        list.append(option);
      }
    });
  };

  // ------------------------------------------
  // 9. LOGIN SCREEN: SHOW ERRORS INSTEAD OF FAILING SILENTLY
  // ------------------------------------------

  function showAuthProblem(message) {
    const auth = $("#authScreen");
    if (!auth || auth.hidden || !message) return;
    if (/ResizeObserver/i.test(message)) return;

    setAuthMessage(`${t("kxError")} : ${message}`, true);
  }

  window.addEventListener("error", (event) => showAuthProblem(event.message));

  window.addEventListener("unhandledrejection", (event) => {
    showAuthProblem(event.reason?.message || String(event.reason || ""));
  });

  // ------------------------------------------
  // 10. START
  // ------------------------------------------

  injectStructure();

  // script.js may already have drawn the app (demo mode): draw the new parts.
  if (data) {
    renderExams();
    renderProjects();
    renderKxHome();
  }
})();
