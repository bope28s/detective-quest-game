const locations = [
  {
    id: "bakery",
    name: "별빛 빵집",
    icon: "★",
    x: 18,
    y: 62,
    focus: "18% 48%",
    clueSpot: [36, 70],
    actorSpot: [64, 54],
    intro: "고소한 쿠키 냄새가 가득한 빵집이에요.",
    quiz: { question: "빵집에서 쿠키를 굽는 데 꼭 필요한 것은?", options: ["밀가루", "책갈피", "태엽"], answer: "밀가루" },
  },
  {
    id: "library",
    name: "무지개 도서관",
    icon: "◆",
    x: 35,
    y: 31,
    focus: "78% 30%",
    clueSpot: [39, 61],
    actorSpot: [67, 50],
    intro: "책장 사이가 조용해서 작은 소리도 잘 들려요.",
    quiz: { question: "도서관에서 책 위치를 표시할 때 쓰기 좋은 것은?", options: ["책갈피", "물뿌리개", "오븐 장갑"], answer: "책갈피" },
  },
  {
    id: "park",
    name: "연못 공원",
    icon: "●",
    x: 53,
    y: 69,
    focus: "24% 80%",
    clueSpot: [40, 64],
    actorSpot: [68, 52],
    intro: "연못과 꽃밭 사이에 발자국이 남기 쉬워요.",
    quiz: { question: "꽃밭에 물을 줄 때 가장 어울리는 도구는?", options: ["물뿌리개", "대출 카드", "톱니"], answer: "물뿌리개" },
  },
  {
    id: "toyshop",
    name: "빙글 장난감점",
    icon: "■",
    x: 75,
    y: 52,
    focus: "82% 76%",
    clueSpot: [42, 58],
    actorSpot: [68, 48],
    intro: "태엽 장난감과 인형 무대가 놓인 가게예요.",
    quiz: { question: "태엽 장난감 속에서 빙글빙글 맞물리는 것은?", options: ["톱니", "꽃잎", "영수증"], answer: "톱니" },
  },
  {
    id: "clocktower",
    name: "시계탑 광장",
    icon: "▲",
    x: 82,
    y: 24,
    focus: "52% 48%",
    clueSpot: [48, 68],
    actorSpot: [68, 44],
    intro: "마을 사람들이 시간을 확인하러 모이는 광장이에요.",
    quiz: { question: "시계탑이 알려주는 것은 무엇일까요?", options: ["시간", "빵 냄새", "책 제목"], answer: "시간" },
  },
];

const suspects = [
  { id: "baker", name: "루루 제빵사", job: "쿠키를 굽는 빵집 주인", img: "assets/baker.png", home: "bakery", token: "별 모양 밀가루" },
  { id: "librarian", name: "모모 사서", job: "책을 정리하는 도서관 사서", img: "assets/librarian.png", home: "library", token: "무지개 책갈피" },
  { id: "gardener", name: "초록 정원사", job: "공원을 돌보는 정원사", img: "assets/gardener.png", home: "park", token: "초록 물뿌리개 자국" },
  { id: "toymaker", name: "토토 장난감점장", job: "태엽 장난감을 고치는 점장", img: "assets/toy-maker.png", home: "toyshop", token: "작은 태엽 톱니" },
  { id: "clockkeeper", name: "째깍 시계관리인", job: "시계탑을 살피는 관리인", img: "assets/clock-keeper.png", home: "clocktower", token: "반짝이는 작은 톱니" },
];

const cases = [
  {
    id: "star",
    label: "첫 번째 사건",
    level: "쉬움",
    name: "사라진 별 배지",
    title: "시계탑의 별 배지가 사라졌어요!",
    intro: "장소마다 한 사람씩 만나 보세요. 단서가 아주 직접적으로 범인을 알려줄 거예요.",
    success: "정답이에요! 별 배지를 되찾았어요. 이제 조금 더 어려운 두 번째 사건이 열립니다.",
    item(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `별 배지 옆 흔적이 ${suspect.name}의 물건과 딱 맞아요. 이 사람을 강하게 의심해 볼 수 있어요.`;
      }
      return `${suspect.name}의 물건과 사건 현장의 흔적이 달라요. 이 사람은 후보에서 지워도 좋아요.`;
    },
    alibi(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `"나는 계속 ${locationName(suspect.home)}에 있었어." 그런데 중요한 물건이 사건 현장에 남아 있어요.`;
      }
      return `"나는 ${locationName(suspect.home)}에서 일을 하고 있었어." 주변 기록도 그 말을 도와줘요.`;
    },
  },
  {
    id: "puppet",
    label: "두 번째 사건",
    level: "조금 어려움",
    name: "인형극 속 가짜 사건",
    title: "무대 위 탐정 인형이 쓰러졌어요!",
    intro: "무서운 진짜 사건이 아니라 인형극 장난 사건이에요. 이번에는 단서와 알리바이를 함께 생각해야 해요.",
    success: "멋져요! 인형극 사건도 해결했어요. 반짝별 탐정단의 오늘 사건이 모두 끝났습니다.",
    item(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `무대 주변의 작은 흔적이 ${suspect.name}의 물건과 이어져요. 알리바이 시간까지 함께 보면 아주 수상해요.`;
      }
      return `${suspect.name}의 물건처럼 보였지만 새 장식과 섞인 흔적이에요. 이 사람은 범인 후보에서 멀어져요.`;
    },
    alibi(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `"4시 10분에는 혼자 있었어." 인형이 쓰러진 바로 그 시간 알리바이가 비어 있어요.`;
      }
      const alibis = {
        bakery: "4시 10분에 쿠키 포장 줄을 도와주고 있었어.",
        library: "4시 10분에 독서 모임 아이들에게 책갈피를 나눠줬어.",
        park: "4시 10분에 연못 옆 꽃밭에 물을 주고 있었어.",
        toyshop: "4시 10분에 계산대에서 손님을 맞았어.",
        clocktower: "4시 10분에 시계탑 아래에서 종소리 기록을 적고 있었어.",
      };
      return `"${alibis[suspect.home]}" 시간 단서와 잘 맞는 알리바이예요.`;
    },
  },
];

let game = {};

const caseCard = document.querySelector("#caseCard");
const caseName = document.querySelector("#caseName");
const caseProgress = document.querySelector("#caseProgress");
const sceneTitle = document.querySelector("#sceneTitle");
const sceneText = document.querySelector("#sceneText");
const sceneActions = document.querySelector("#sceneActions");
const mapPins = document.querySelector("#mapPins");
const suspectsEl = document.querySelector("#suspects");
const deductionScreen = document.querySelector("#deductionScreen");
const deductionCount = document.querySelector("#deductionCount");
const toast = document.querySelector("#toast");
const placeView = document.querySelector("#placeView");
const placeSceneImage = document.querySelector("#placeSceneImage");
const placeName = document.querySelector("#placeName");
const placeIntro = document.querySelector("#placeIntro");
const placeStep = document.querySelector("#placeStep");
const clueHotspot = document.querySelector("#clueHotspot");
const suspectActor = document.querySelector("#suspectActor");
const placeSuspectImage = document.querySelector("#placeSuspectImage");
const clueDiscovery = document.querySelector("#clueDiscovery");
const placeBubble = document.querySelector("#placeBubble");
const sceneTip = document.querySelector("#sceneTip");
const quizPopup = document.querySelector("#quizPopup");
const quizTitle = document.querySelector("#quizTitle");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const evidencePopup = document.querySelector("#evidencePopup");
const evidenceIcon = document.querySelector("#evidenceIcon");
const evidenceType = document.querySelector("#evidenceType");
const evidenceTitle = document.querySelector("#evidenceTitle");
const evidenceText = document.querySelector("#evidenceText");

document.querySelector("#newGameButton").addEventListener("click", () => startCase(0));
document.querySelector("#closePlaceButton").addEventListener("click", closePlace);
document.querySelector("#quizCloseButton").addEventListener("click", closeQuiz);
document.querySelector("#evidenceCloseButton").addEventListener("click", closeEvidence);
clueHotspot.addEventListener("click", inspectCurrent);
suspectActor.addEventListener("click", hearCurrent);
placeBubble.addEventListener("click", () => {
  placeBubble.hidden = true;
});
placeView.addEventListener("click", (event) => {
  if (event.target === placeView) closePlace();
});
evidencePopup.addEventListener("click", (event) => {
  if (event.target === evidencePopup) closeEvidence();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // The game still works online when service workers are unavailable.
    });
  });
}

function startCase(caseIndex) {
  const selectedCase = cases[caseIndex];
  const culprit = suspects[Math.floor(Math.random() * suspects.length)];
  game = {
    caseIndex,
    case: selectedCase,
    culpritId: culprit.id,
    routeIndex: 0,
    items: new Set(),
    eliminated: new Set(),
    primeSuspectId: null,
    heard: new Set(),
    cleared: new Set(),
    latest: selectedCase.intro,
    solved: false,
  };
  closePlace();
  closeQuiz();
  render();
  showEvidence("사건 발생", selectedCase.name, selectedCase.intro, "!");
}

function locationName(locationId) {
  return locations.find((location) => location.id === locationId).name;
}

function currentLocation() {
  return locations[game.routeIndex];
}

function suspectAt(locationId) {
  return suspects.find((suspect) => suspect.home === locationId);
}

function currentSuspect() {
  return suspectAt(currentLocation().id);
}

function currentCulprit() {
  return suspects.find((suspect) => suspect.id === game.culpritId);
}

function canJudgeCurrent() {
  const suspect = currentSuspect();
  return game.items.has(suspect.id) && game.heard.has(suspect.id);
}

function render() {
  renderCaseHeader();
  renderScene();
  renderMap();
  renderSuspects();
  renderDeduction();
}

function renderCaseHeader() {
  caseName.textContent = game.case.title;
  caseCard.classList.toggle("done", game.solved);
}

function renderScene() {
  const location = currentLocation();
  const suspect = currentSuspect();
  caseProgress.textContent = `${game.case.label} · ${game.case.level} · ${game.routeIndex + 1}/${locations.length}`;
  sceneTitle.textContent = `${location.name}에서 ${suspect.name} 만나기`;
  sceneText.textContent = game.solved
    ? "사건이 해결됐어요. 다음 사건으로 넘어가거나 처음부터 다시 도전할 수 있어요."
    : "장소에 들어가 퀴즈로 힌트 아이템을 얻고, 알리바이까지 들은 뒤 이 사람이 범인인지 추리하세요.";
  sceneActions.innerHTML = "";

  const spotlight = document.createElement("div");
  spotlight.className = "suspect-spotlight";
  spotlight.innerHTML = `
    <img src="${suspect.img}" alt="${suspect.name} 초상화" />
    <div>
      <strong>${suspect.name}</strong>
      <span>${suspect.job}</span>
    </div>
  `;
  sceneActions.appendChild(spotlight);

  addAction("이 장소로 들어가기", () => openPlace(location), game.solved, true);
  addAction("범인이다", () => judge(true), game.solved || !canJudgeCurrent(), false);
  addAction("아니다, 다음 장소로", () => judge(false), game.solved || !canJudgeCurrent(), false);

  if (game.solved && game.caseIndex === 0) {
    addAction("두 번째 사건 시작", () => startCase(1), false, true);
  }
  if (game.solved && game.caseIndex === 1) {
    addAction("처음부터 다시", () => startCase(0), false, true);
  }
}

function addAction(label, handler, disabled = false, primary = false) {
  const button = document.createElement("button");
  button.className = `action-button ${primary ? "primary" : ""}`;
  button.type = "button";
  button.textContent = label;
  button.disabled = disabled;
  button.addEventListener("click", handler);
  sceneActions.appendChild(button);
}

function renderMap() {
  mapPins.innerHTML = "";
  locations.forEach((location, index) => {
    const button = document.createElement("button");
    const locked = index > game.routeIndex || game.solved;
    button.className = `pin ${index === game.routeIndex && !game.solved ? "current" : ""} ${index < game.routeIndex ? "solved" : ""} ${locked ? "locked" : ""}`;
    button.type = "button";
    button.style.left = `${location.x}%`;
    button.style.top = `${location.y}%`;
    button.setAttribute("aria-label", `${location.name} 자세히 보기`);
    button.textContent = location.icon;
    button.disabled = locked;
    button.addEventListener("click", () => openPlace(location));
    mapPins.appendChild(button);
  });
}

function renderSuspects() {
  suspectsEl.innerHTML = "";
  suspects.forEach((suspect) => {
    const locationIndex = locations.findIndex((location) => location.id === suspect.home);
    const active = locationIndex === game.routeIndex && !game.solved;
    const card = document.createElement("button");
    card.className = `suspect-card ${active ? "selected" : ""} ${game.cleared.has(suspect.id) ? "cleared" : ""}`;
    card.type = "button";
    card.disabled = !active;
    card.innerHTML = `
      <div class="portrait-wrap">
        <img src="${suspect.img}" alt="${suspect.name} 초상화" />
        <span class="badge">${game.cleared.has(suspect.id) ? "✓" : active ? "!" : "?"}</span>
      </div>
      <div class="suspect-info">
        <strong>${suspect.name}</strong>
        <span>${locationName(suspect.home)}</span>
      </div>
    `;
    card.addEventListener("click", () => openPlace(currentLocation()));
    suspectsEl.appendChild(card);
  });
}

function renderDeduction() {
  const suspect = currentSuspect();
  deductionCount.textContent = game.solved ? "해결" : `${game.routeIndex + 1}/${locations.length}`;
  deductionScreen.innerHTML = `
    <div class="radar-pips">
      <div class="radar-pip">현재 장소<span>${game.routeIndex + 1}/5</span></div>
      <div class="radar-pip">아이템<span>${game.items.size}/5</span></div>
      <div class="radar-pip">알리바이<span>${game.heard.has(suspect.id) ? "확인" : "대기"}</span></div>
    </div>
    <div class="radar-card">
      <strong>지금 만난 사람</strong>
      ${suspect.name} · ${suspect.job}
    </div>
    <div class="radar-card">
      <strong>획득한 힌트 아이템</strong>
      ${renderItemRows()}
    </div>
    <div class="radar-card">
      <strong>남은 후보</strong>
      ${renderCandidates()}
    </div>
    <div class="radar-card">
      <strong>추리 포인트</strong>
      ${game.latest}
    </div>
  `;
}

function renderItemRows() {
  if (!game.items.size) return "아직 힌트 아이템이 없어요. 장소 안의 반짝 지점에서 퀴즈를 풀어 보세요.";
  return suspects
    .filter((suspect) => game.items.has(suspect.id))
    .map((suspect) => `<div class="item-row">${suspect.token}<span>${suspect.name}</span></div>`)
    .join("");
}

function renderCandidates() {
  return `<div class="candidate-grid">${suspects
    .map((suspect) => {
      const out = game.eliminated.has(suspect.id);
      const hot = game.primeSuspectId === suspect.id;
      return `<span class="candidate-chip ${out ? "out" : ""} ${hot ? "hot" : ""}">${suspect.name}</span>`;
    })
    .join("")}</div>`;
}

function openPlace(location) {
  if (location.id !== currentLocation().id || game.solved) return;
  const suspect = currentSuspect();
  placeStep.textContent = `${game.case.name} · ${game.case.level}`;
  placeName.textContent = location.name;
  placeIntro.textContent = `${location.intro} 반짝이는 곳의 퀴즈를 풀어 힌트 아이템을 얻고, ${suspect.name}을 직접 눌러 대화하세요.`;
  placeSceneImage.style.objectPosition = location.focus;
  clueHotspot.style.left = `${location.clueSpot[0]}%`;
  clueHotspot.style.top = `${location.clueSpot[1]}%`;
  suspectActor.style.left = `${location.actorSpot[0]}%`;
  suspectActor.style.top = `${location.actorSpot[1]}%`;
  placeSuspectImage.src = suspect.img;
  placeSuspectImage.alt = `${suspect.name} 초상화`;
  clueHotspot.classList.toggle("done", game.items.has(suspect.id));
  suspectActor.classList.toggle("done", game.heard.has(suspect.id));
  sceneTip.textContent = game.items.has(suspect.id) && game.heard.has(suspect.id)
    ? "힌트 아이템과 알리바이를 모두 확인했어요. 바깥 화면에서 추리 선택을 해 보세요."
    : "반짝이는 조사 지점의 퀴즈를 풀고, 용의자를 눌러 알리바이도 들어 보세요.";
  if (placeBubble.hidden) {
    placeBubble.innerHTML = `<strong>${location.name}에 들어왔어요</strong>주변을 살펴보고 ${suspect.name}에게 말을 걸어 보세요.`;
  }
  if (clueDiscovery.hidden) {
    positionClueDiscovery(location);
  }

  placeView.hidden = false;
  render();
}

function closePlace() {
  placeView.hidden = true;
  placeBubble.hidden = true;
  clueDiscovery.hidden = true;
  clueDiscovery.classList.remove("item");
}

function inspectCurrent() {
  const suspect = currentSuspect();
  if (game.items.has(suspect.id)) {
    showHintItem(suspect);
    return;
  }
  openQuiz(suspect, currentLocation());
}

function hearCurrent() {
  const suspect = currentSuspect();
  const alibi = game.case.alibi(suspect, currentCulprit());
  game.heard.add(suspect.id);
  game.latest = alibi;
  openPlace(currentLocation());
  showPlaceBubble(`${suspect.name}의 말`, alibi);
}

function showPlaceBubble(title, text) {
  placeBubble.innerHTML = `<strong>${title}</strong>${text}`;
  placeBubble.hidden = false;
}

function showClueDiscovery(title, text) {
  const location = currentLocation();
  positionClueDiscovery(location);
  clueDiscovery.innerHTML = `<strong>${title}</strong>${text}`;
  clueDiscovery.hidden = false;
}

function openQuiz(suspect, location) {
  quizTitle.textContent = `${suspect.token} 찾기`;
  quizQuestion.textContent = location.quiz.question;
  quizOptions.innerHTML = "";
  location.quiz.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuiz(option, location.quiz.answer, suspect));
    quizOptions.appendChild(button);
  });
  quizPopup.hidden = false;
}

function answerQuiz(option, answer, suspect) {
  if (option !== answer) {
    showToast("조금만 더 생각해 봐요. 장소와 어울리는 물건을 골라 보세요.");
    return;
  }
  quizPopup.hidden = true;
  acquireHintItem(suspect);
}

function closeQuiz() {
  quizPopup.hidden = true;
}

function acquireHintItem(suspect) {
  const text = game.case.item(suspect, currentCulprit());
  game.items.add(suspect.id);
  if (suspect.id === game.culpritId) {
    game.primeSuspectId = suspect.id;
  } else {
    game.eliminated.add(suspect.id);
  }
  game.latest = `${suspect.token}: ${text}`;
  openPlace(currentLocation());
  showHintItem(suspect);
}

function showHintItem(suspect) {
  const text = game.case.item(suspect, currentCulprit());
  showClueDiscovery(`${suspect.token} 획득`, text);
  clueDiscovery.classList.add("item");
}

function positionClueDiscovery(location) {
  clueDiscovery.style.left = `${location.clueSpot[0]}%`;
  clueDiscovery.style.top = `${location.clueSpot[1]}%`;
}

function judge(accuse) {
  const suspect = currentSuspect();
  const isCulprit = suspect.id === game.culpritId;

  if (accuse === isCulprit) {
    if (isCulprit) {
      solveCase(suspect);
      return;
    }
    game.cleared.add(suspect.id);
    game.routeIndex += 1;
    if (game.routeIndex >= locations.length) {
      solveCase(currentCulprit());
      return;
    }
    game.latest = `${suspect.name}은 범인이 아니었어요. 다음 장소로 이동합니다.`;
    showEvidence("추리 성공", suspect.name, "좋아요! 이 사람은 범인이 아니에요. 다음 장소로 이동해요.", "✓");
    closePlace();
    render();
    return;
  }

  const message = accuse ? `${suspect.name}은 범인이 아니었어요. 사건을 처음부터 다시 시작합니다.` : `${suspect.name}이 범인이었어요. 놓쳤으니 처음부터 다시 도전해요.`;
  showEvidence("추리 실패", "다시 시작", message, "?");
  setTimeout(() => startCase(game.caseIndex), 900);
}

function solveCase(suspect) {
  game.solved = true;
  game.latest = `${suspect.name}이 범인이었어요. ${game.case.success}`;
  closePlace();
  document.querySelector(".game-shell").classList.add("celebrate");
  showEvidence("사건 해결", suspect.name, game.case.success, "✓");
  setTimeout(() => document.querySelector(".game-shell").classList.remove("celebrate"), 520);
  render();
}

function showEvidence(type, title, text, icon) {
  evidenceType.textContent = type;
  evidenceTitle.textContent = title;
  evidenceText.textContent = text;
  evidenceIcon.textContent = icon;
  evidencePopup.hidden = false;
}

function closeEvidence() {
  evidencePopup.hidden = true;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1900);
}

startCase(0);
