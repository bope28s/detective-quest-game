const locations = [
  { id: "bakery", name: "별빛 빵집", icon: "★", x: 18, y: 62, intro: "고소한 쿠키 냄새가 가득해요. 계산대와 오븐 옆을 살펴보세요." },
  { id: "library", name: "무지개 도서관", icon: "◆", x: 35, y: 31, intro: "조용한 책장 사이에 작은 흔적이 숨어 있어요." },
  { id: "park", name: "연못 공원", icon: "●", x: 53, y: 69, intro: "연못과 꽃밭 근처에서 발자국을 찾아볼 수 있어요." },
  { id: "toyshop", name: "빙글 장난감점", icon: "■", x: 75, y: 52, intro: "태엽 장난감과 인형 무대가 반짝반짝 놓여 있어요." },
  { id: "clocktower", name: "시계탑 광장", icon: "▲", x: 82, y: 24, intro: "사건이 시작된 광장이에요. 시계탑 계단을 잘 살펴보세요." },
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
    level: "쉬움",
    name: "사라진 별 배지",
    title: "시계탑의 별 배지가 사라졌어요!",
    itemAlt: "사라진 별 배지",
    intro: "지도에서 장소를 눌러 안으로 들어가세요. 첫 사건은 범인의 물건 단서가 아주 또렷하게 남아 있어요.",
    stageTitles: ["지도에서 장소 선택", "장소 안 단서 찾기", "알리바이 듣기", "물건 주인 비교", "범인 지목"],
    evidenceLocation: "clocktower",
    createClues(culprit) {
      return {
        clocktower: [
          { id: "bell", label: "시계탑 계단", text: `사라진 별 배지 옆에서 ${culprit.token}이 발견됐어요. 이 물건의 주인은 ${culprit.name}이에요.`, important: true },
          { id: "time", label: "커다란 시계", text: "별 배지는 오후 3시에 사라졌어요.", important: false },
        ],
        bakery: [{ id: "receipt", label: "계산대 영수증", text: "빵집 계산대에는 오후 3시 쿠키 영수증이 남아 있어요.", important: false }],
        library: [{ id: "card", label: "대출 카드", text: "도서관 카드에는 오후 3시 책 정리 도장이 찍혀 있어요.", important: false }],
        park: [{ id: "pond", label: "연못 벤치", text: "공원 벤치에는 물뿌리개 물방울이 아직 반짝여요.", important: false }],
        toyshop: [{ id: "train", label: "장난감 기차", text: "장난감점 기차는 오후 3시에 딸깍딸깍 움직였어요.", important: false }],
      };
    },
    alibi(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `${suspect.name}: "나는 내 장소에만 있었어." 하지만 시계탑에서 ${suspect.token}이 나왔어요.`;
      }
      return `${suspect.name}: "나는 ${locationName(suspect.home)}에 있었어." 그 장소의 작은 기록도 알리바이를 도와줘요.`;
    },
    hint(culprit) {
      return `쉬운 힌트: 중요한 단서에 나온 물건 "${culprit.token}"의 주인을 찾으면 돼요.`;
    },
    success: "정답이에요! 별 배지를 되찾았어요. 이제 조금 더 어려운 두 번째 사건이 열렸습니다.",
  },
  {
    id: "puppet",
    level: "조금 어려움",
    name: "인형극 속 가짜 살인 사건",
    title: "무대 위 탐정 인형이 쓰러졌어요!",
    itemAlt: "인형극 사건",
    intro: "무서운 진짜 사건이 아니라 인형극 무대의 장난 사건이에요. 이번에는 물건 단서와 시간 단서를 함께 비교해야 해요.",
    stageTitles: ["새 사건 시작", "무대 단서 찾기", "알리바이 시간 듣기", "두 단서 연결", "범인 지목"],
    evidenceLocation: "toyshop",
    createClues(culprit) {
      const falseLead = suspects.find((item) => item.id !== culprit.id && item.home !== "toyshop");
      return {
        toyshop: [
          { id: "stage", label: "인형 무대", text: `탐정 인형 옆에 ${culprit.token}이 살짝 끼어 있었어요.`, important: true },
          { id: "clock", label: "무대 시계", text: "인형이 쓰러진 시간은 오후 4시 10분이에요.", important: true },
          { id: "ribbon", label: "반짝 리본", text: `${falseLead.token}처럼 보이는 리본도 있었지만, 새 장식이라 누구나 만질 수 있었어요.`, important: false },
        ],
        bakery: [{ id: "oven", label: "오븐 타이머", text: "오븐 타이머는 오후 4시에 울렸고 4시 10분 기록은 없어요.", important: false }],
        library: [{ id: "desk", label: "반납 책상", text: "도서관에는 4시 5분 독서 모임 기록이 있어요.", important: false }],
        park: [{ id: "mud", label: "꽃밭 흙", text: "공원 흙은 젖어 있지만 무대까지 이어진 발자국은 없어요.", important: false }],
        clocktower: [{ id: "gear", label: "작은 종", text: "시계탑 종은 4시 정각에 울렸고 4시 10분에는 조용했어요.", important: false }],
      };
    },
    alibi(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `${suspect.name}: "4시 10분엔 아무도 안 봤을 거야." 시간 알리바이가 비어 있어요.`;
      }
      const timeByHome = {
        bakery: "4시 10분에 쿠키 포장 줄을 도와주고 있었어요.",
        library: "4시 10분에 독서 모임 아이들에게 책갈피를 나눠줬어요.",
        park: "4시 10분에 연못 옆 꽃밭에 물을 주고 있었어요.",
        toyshop: "4시 10분에 장난감 계산대에서 손님을 맞았어요.",
        clocktower: "4시 10분에 시계탑 아래에서 종소리 기록을 적고 있었어요.",
      };
      return `${suspect.name}: "${timeByHome[suspect.home]}"`;
    },
    hint(culprit) {
      return `조금 어려운 힌트: 무대의 물건 단서 "${culprit.token}"와 4시 10분 알리바이가 빈 사람을 함께 찾아요.`;
    },
    success: "멋져요! 인형극 사건도 해결했어요. 탐정단의 두 사건 수첩이 완성됐습니다.",
  },
];

let game = {};

const caseCard = document.querySelector("#caseCard");
const caseName = document.querySelector("#caseName");
const stageTitle = document.querySelector("#stageTitle");
const stageText = document.querySelector("#stageText");
const stageMeter = document.querySelector("#stageMeter");
const stageActions = document.querySelector("#stageActions");
const mapPins = document.querySelector("#mapPins");
const suspectsEl = document.querySelector("#suspects");
const deductionScreen = document.querySelector("#deductionScreen");
const deductionCount = document.querySelector("#deductionCount");
const toast = document.querySelector("#toast");
const placeView = document.querySelector("#placeView");
const placeName = document.querySelector("#placeName");
const placeIntro = document.querySelector("#placeIntro");
const placeStep = document.querySelector("#placeStep");
const placeClues = document.querySelector("#placeClues");
const placeAlibis = document.querySelector("#placeAlibis");
const evidencePopup = document.querySelector("#evidencePopup");
const evidenceIcon = document.querySelector("#evidenceIcon");
const evidenceType = document.querySelector("#evidenceType");
const evidenceTitle = document.querySelector("#evidenceTitle");
const evidenceText = document.querySelector("#evidenceText");

document.querySelector("#newGameButton").addEventListener("click", () => startCase(0));
document.querySelector("#closePlaceButton").addEventListener("click", closePlace);
document.querySelector("#evidenceCloseButton").addEventListener("click", closeEvidence);
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
  const culprit = suspects[Math.floor(Math.random() * suspects.length)];
  const selectedCase = cases[caseIndex];
  game = {
    caseIndex,
    case: selectedCase,
    culpritId: culprit.id,
    cluesFound: new Set(),
    alibisHeard: new Set(),
    placesOpened: new Set(),
    clues: [],
    selected: null,
    solvedCases: caseIndex === 0 ? new Set() : new Set(["star"]),
    solved: false,
  };
  addClue(`${selectedCase.name}: ${selectedCase.intro}`, "");
  render();
  showEvidence("사건 발생", selectedCase.name, selectedCase.intro, "!");
}

function locationName(locationId) {
  return locations.find((location) => location.id === locationId).name;
}

function currentCulprit() {
  return suspects.find((suspect) => suspect.id === game.culpritId);
}

function currentClues() {
  return game.case.createClues(currentCulprit());
}

function allCaseClues() {
  return Object.values(currentClues()).flat();
}

function foundClueCount() {
  return allCaseClues().filter((clue) => game.cluesFound.has(clue.id)).length;
}

function stageIndex() {
  if (game.solved) return 4;
  if (game.alibisHeard.size === suspects.length && foundClueCount() >= allCaseClues().length) return 4;
  if (game.alibisHeard.size >= 3 && foundClueCount() >= Math.min(3, allCaseClues().length)) return 3;
  if (game.alibisHeard.size > 0 || foundClueCount() > 0) return 2;
  if (game.placesOpened.size > 0) return 1;
  return 0;
}

function render() {
  renderCaseHeader();
  renderStage();
  renderMap();
  renderSuspects();
  renderDeduction();
}

function renderCaseHeader() {
  caseName.textContent = game.case.title;
  caseCard.classList.toggle("done", game.solved);
}

function renderStage() {
  const index = stageIndex();
  stageTitle.textContent = `${index + 1}단계: ${game.case.stageTitles[index]}`;
  stageText.textContent =
    index < 4
      ? "지도 장소를 눌러 안으로 들어가고, 반짝 단서와 알리바이를 직접 모아 보세요."
      : "방금까지 나온 단서와 알리바이를 머릿속에서 연결해 범인을 지목하세요.";
  stageMeter.innerHTML = game.case.stageTitles
    .map((_, dotIndex) => `<span class="stage-dot ${dotIndex < index ? "done" : ""} ${dotIndex === index ? "active" : ""}"></span>`)
    .join("");

  stageActions.innerHTML = "";
  const progress = document.createElement("div");
  progress.className = "case-progress";
  progress.innerHTML = `
    <div class="progress-row"><span>장소 탐색</span><strong>${game.placesOpened.size}/5</strong></div>
    <div class="progress-row"><span>단서 수집</span><strong>${foundClueCount()}/${allCaseClues().length}</strong></div>
    <div class="progress-row"><span>알리바이</span><strong>${game.alibisHeard.size}/5</strong></div>
  `;
  stageActions.appendChild(progress);

  addAction(
    "추리 힌트 보기",
    () => {
      const hint = game.case.hint(currentCulprit());
      addClue(hint, "important");
      renderDeduction();
      showEvidence("추리 힌트", "탐정의 생각", hint, "?");
    },
    false,
    false,
  );
  if (game.alibisHeard.size >= 3 && foundClueCount() >= Math.min(3, allCaseClues().length)) {
    addAccuseButtons();
  } else {
    addAction("범인 지목 준비 중", () => {}, true, true);
  }
  if (game.solved && game.caseIndex === 0) {
    addAction("두 번째 사건 시작", () => startCase(1), false, true);
  }
  if (game.solved && game.caseIndex === 1) {
    addAction("처음 사건부터 다시", () => startCase(0), false, true);
  }
}

function addAction(label, handler, disabled = false, primary = false) {
  const button = document.createElement("button");
  button.className = `action-button ${primary ? "primary" : ""}`;
  button.type = "button";
  button.textContent = label;
  button.disabled = disabled;
  button.addEventListener("click", handler);
  stageActions.appendChild(button);
}

function addAccuseButtons() {
  const grid = document.createElement("div");
  grid.className = "accuse-grid";
  suspects.forEach((suspect) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = suspect.name;
    button.addEventListener("click", () => accuse(suspect));
    grid.appendChild(button);
  });
  stageActions.appendChild(grid);
}

function renderMap() {
  mapPins.innerHTML = "";
  locations.forEach((location) => {
    const button = document.createElement("button");
    button.className = `pin current ${game.placesOpened.has(location.id) ? "visited" : ""}`;
    button.type = "button";
    button.style.left = `${location.x}%`;
    button.style.top = `${location.y}%`;
    button.setAttribute("aria-label", `${location.name} 자세히 보기`);
    button.textContent = location.icon;
    button.addEventListener("click", () => openPlace(location));
    mapPins.appendChild(button);
  });
}

function renderSuspects() {
  suspectsEl.innerHTML = "";
  suspects.forEach((suspect) => {
    const card = document.createElement("button");
    card.className = `suspect-card ${game.selected === suspect.id ? "selected" : ""} ${game.alibisHeard.has(suspect.id) ? "cleared" : ""}`;
    card.type = "button";
    card.innerHTML = `
      <div class="portrait-wrap">
        <img src="${suspect.img}" alt="${suspect.name} 초상화" />
        <span class="badge">${game.alibisHeard.has(suspect.id) ? "✓" : "?"}</span>
      </div>
      <div class="suspect-info">
        <strong>${suspect.name}</strong>
        <span>${locationName(suspect.home)} · ${suspect.token}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      const location = locations.find((item) => item.id === suspect.home);
      openPlace(location);
      showToast(`${suspect.name}은 ${location.name} 안에서 만날 수 있어요.`);
    });
    suspectsEl.appendChild(card);
  });
}

function renderDeduction() {
  const clueTotal = allCaseClues().length;
  const importantFound = game.clues.filter((clue) => clue.kind === "important").length;
  const latest = game.clues[game.clues.length - 1];
  deductionCount.textContent = `${foundClueCount()}개 발견`;
  deductionScreen.innerHTML = `
    <div class="radar-pips">
      <div class="radar-pip">장소<span>${game.placesOpened.size}/5</span></div>
      <div class="radar-pip">단서<span>${foundClueCount()}/${clueTotal}</span></div>
      <div class="radar-pip">대화<span>${game.alibisHeard.size}/5</span></div>
    </div>
    <div class="radar-card">
      <strong>${importantFound ? "중요 단서가 잡혔어요" : "아직 더 둘러봐요"}</strong>
      ${latest ? latest.text : "지도 장소를 누르면 현장 안으로 들어가 직접 조사할 수 있어요."}
    </div>
    <div class="radar-card">
      <strong>탐정의 다음 행동</strong>
      ${nextPrompt()}
    </div>
  `;
}

function nextPrompt() {
  if (game.solved && game.caseIndex === 0) return "첫 사건을 해결했어요. 두 번째 사건 버튼을 눌러 새 사건으로 넘어가요.";
  if (game.solved) return "두 사건을 모두 해결했어요. 새 게임으로 다시 도전할 수 있어요.";
  if (!game.placesOpened.size) return "지도에서 가장 궁금한 장소를 눌러 현장으로 들어가요.";
  if (foundClueCount() < Math.min(3, allCaseClues().length)) return "장소 안의 반짝 단서 버튼을 더 눌러 보세요.";
  if (game.alibisHeard.size < 3) return "용의자가 있는 장소로 들어가 알리바이를 들어 보세요.";
  return "이제 범인을 지목할 수 있어요. 중요한 팝업 단서를 떠올려 보세요.";
}

function openPlace(location) {
  game.placesOpened.add(location.id);
  const cluesByLocation = currentClues();
  const locationClues = cluesByLocation[location.id] || [];
  const localSuspects = suspects.filter((suspect) => suspect.home === location.id);

  placeStep.textContent = `${game.case.name} · ${game.case.level}`;
  placeName.textContent = location.name;
  placeIntro.textContent = location.intro;
  placeClues.innerHTML = "";
  placeAlibis.innerHTML = "";

  locationClues.forEach((clue) => {
    const button = document.createElement("button");
    button.className = `detail-button ${game.cluesFound.has(clue.id) ? "done" : ""}`;
    button.type = "button";
    button.textContent = `${game.cluesFound.has(clue.id) ? "찾음" : "찾기"}: ${clue.label}`;
    button.addEventListener("click", () => findClue(location, clue));
    placeClues.appendChild(button);
  });

  if (!locationClues.length) {
    placeClues.innerHTML = `<div class="clue">여기는 깨끗해 보여요. 다른 장소도 살펴보세요.</div>`;
  }

  localSuspects.forEach((suspect) => {
    const button = document.createElement("button");
    button.className = `detail-button ${game.alibisHeard.has(suspect.id) ? "done" : ""}`;
    button.type = "button";
    button.textContent = `${game.alibisHeard.has(suspect.id) ? "들음" : "듣기"}: ${suspect.name}`;
    button.addEventListener("click", () => hearAlibi(suspect));
    placeAlibis.appendChild(button);
  });

  placeView.hidden = false;
  render();
}

function closePlace() {
  placeView.hidden = true;
}

function findClue(location, clue) {
  if (!game.cluesFound.has(clue.id)) {
    game.cluesFound.add(clue.id);
    addClue(`${location.name} · ${clue.label}: ${clue.text}`, clue.important ? "important" : "good");
    showEvidence(clue.important ? "중요 단서" : "현장 단서", clue.label, clue.text, clue.important ? "!" : "★");
  } else {
    showToast("이미 찾은 단서예요.");
  }
  openPlace(location);
}

function hearAlibi(suspect) {
  game.selected = suspect.id;
  if (!game.alibisHeard.has(suspect.id)) {
    game.alibisHeard.add(suspect.id);
    const alibi = game.case.alibi(suspect, currentCulprit());
    addClue(`알리바이 · ${alibi}`, suspect.id === game.culpritId ? "important" : "good");
    showEvidence("알리바이 대화", suspect.name, alibi, "“”");
  } else {
    showToast("이미 들은 알리바이예요.");
  }
  const location = locations.find((item) => item.id === suspect.home);
  openPlace(location);
}

function addClue(text, kind = "") {
  if (game.clues.some((clue) => clue.text === text)) return;
  game.clues.push({ text, kind });
}

function accuse(suspect) {
  if (game.solved) return;
  game.selected = suspect.id;
  if (suspect.id === game.culpritId) {
    game.solved = true;
    document.querySelector(".game-shell").classList.add("celebrate");
    addClue(`해결! ${suspect.name}이 범인이었어요. ${game.case.success}`, "important");
    showEvidence("사건 해결", suspect.name, game.case.success, "✓");
    setTimeout(() => document.querySelector(".game-shell").classList.remove("celebrate"), 520);
  } else {
    addClue(`${suspect.name}은 아닌 것 같아요. 중요한 물건 단서와 시간 단서를 다시 비교해 보세요.`, "");
    showEvidence("다시 추리", suspect.name, "아까워요. 중요한 물건 단서와 시간 단서를 다시 비교해 보세요.", "?");
  }
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
