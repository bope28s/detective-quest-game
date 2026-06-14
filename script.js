const locations = [
  { id: "bakery", name: "별빛 빵집", icon: "★", x: 18, y: 62, clue: "빵집 계산대에는 3시에 찍힌 쿠키 영수증이 있었어요." },
  { id: "library", name: "무지개 도서관", icon: "◆", x: 35, y: 31, clue: "도서관 대출 카드에는 조용한 발자국 도장이 남아 있었어요." },
  { id: "park", name: "연못 공원", icon: "●", x: 53, y: 69, clue: "공원 벤치 근처에서 젖은 흙 발자국이 이어졌어요." },
  { id: "toyshop", name: "빙글 장난감점", icon: "■", x: 75, y: 52, clue: "장난감점 앞에는 작은 태엽 소리가 딸깍딸깍 들렸어요." },
  { id: "clocktower", name: "시계탑 광장", icon: "▲", x: 82, y: 24, clue: "별 배지가 사라진 시간은 정확히 오후 3시였어요." },
];

const suspectTemplates = [
  {
    id: "baker",
    name: "루루 제빵사",
    job: "쿠키를 굽는 빵집 주인",
    img: "assets/baker.png",
    home: "bakery",
    token: "별 모양 밀가루",
    innocent: "오후 3시에 따끈한 별 쿠키를 포장하고 있었어요.",
    witness: "손님 두 명이 루루의 새 쿠키 냄새를 기억했어요.",
  },
  {
    id: "librarian",
    name: "모모 사서",
    job: "책을 정리하는 도서관 사서",
    img: "assets/librarian.png",
    home: "library",
    token: "무지개 책갈피",
    innocent: "오후 3시에 그림책 책장을 정리하고 있었어요.",
    witness: "어린이 독서 모임이 모모의 목소리를 들었어요.",
  },
  {
    id: "gardener",
    name: "초록 정원사",
    job: "공원을 돌보는 정원사",
    img: "assets/gardener.png",
    home: "park",
    token: "초록 물뿌리개 자국",
    innocent: "오후 3시에 연못 옆 꽃밭에 물을 주고 있었어요.",
    witness: "연못 옆 오리 모양 표지판에 물방울이 튀어 있었어요.",
  },
  {
    id: "toymaker",
    name: "토토 장난감점장",
    job: "태엽 장난감을 고치는 점장",
    img: "assets/toy-maker.png",
    home: "toyshop",
    token: "작은 태엽 톱니",
    innocent: "오후 3시에 고장 난 기차 장난감을 고치고 있었어요.",
    witness: "가게 앞 아이들이 기차 소리를 들었다고 말했어요.",
  },
  {
    id: "clockkeeper",
    name: "째깍 시계관리인",
    job: "시계탑을 살피는 관리인",
    img: "assets/clock-keeper.png",
    home: "clocktower",
    token: "반짝이는 작은 톱니",
    innocent: "오후 3시에 광장 시계를 맞추고 있었어요.",
    witness: "광장 벨이 울릴 때 째깍이 사다리 위에 있었어요.",
  },
];

const stages = [
  { title: "1단계: 지도를 펼쳐요", text: "반짝이는 장소 표식을 눌러 마을 다섯 곳을 살펴보세요." },
  { title: "2단계: 알리바이를 들어요", text: "용의자 카드를 하나씩 눌러 각자의 이야기를 탐정 수첩에 모으세요." },
  { title: "3단계: 목격 단서를 찾아요", text: "목격 단서 버튼을 눌러 알리바이가 맞는지 확인해 보세요." },
  { title: "4단계: 시간표를 맞춰요", text: "수첩의 단서를 보고 오후 3시에 말이 어긋난 사람을 찾아보세요." },
  { title: "5단계: 범인을 지목해요", text: "가장 수상한 용의자를 선택하세요. 맞히면 별 배지를 되찾아요!" },
];

let game = {};

const stageTitle = document.querySelector("#stageTitle");
const stageText = document.querySelector("#stageText");
const stageMeter = document.querySelector("#stageMeter");
const stageActions = document.querySelector("#stageActions");
const mapPins = document.querySelector("#mapPins");
const suspectsEl = document.querySelector("#suspects");
const clueList = document.querySelector("#clueList");
const notebookCount = document.querySelector("#notebookCount");
const toast = document.querySelector("#toast");

document.querySelector("#newGameButton").addEventListener("click", startGame);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // The game still works online when service workers are unavailable.
    });
  });
}

function startGame() {
  const culprit = suspectTemplates[Math.floor(Math.random() * suspectTemplates.length)];
  game = {
    stage: 0,
    culpritId: culprit.id,
    visited: new Set(),
    heard: new Set(),
    witnesses: new Set(),
    clues: [],
    selected: null,
    solved: false,
  };
  render();
  showToast("새 사건이 시작됐어요. 이번 범인은 비밀이에요!");
}

function buildSuspect(template) {
  const place = locations.find((item) => item.id === template.home);
  const isCulprit = template.id === game.culpritId;
  const alibi = isCulprit
    ? `오후 3시에 ${place.name}에 있었다고 말했지만, 수첩 단서와 맞지 않아요.`
    : template.innocent;
  const witness = isCulprit
    ? `${place.name}에는 ${template.name}을 본 사람이 없었고, 시계탑 계단에서 ${template.token}이 발견됐어요.`
    : template.witness;
  return { ...template, place: place.name, isCulprit, alibi, witness };
}

function render() {
  renderStage();
  renderMap();
  renderSuspects();
  renderNotebook();
}

function renderStage() {
  const stage = stages[game.stage];
  stageTitle.textContent = stage.title;
  stageText.textContent = stage.text;
  stageMeter.innerHTML = stages
    .map((_, index) => `<span class="stage-dot ${index < game.stage ? "done" : ""} ${index === game.stage ? "active" : ""}"></span>`)
    .join("");
  stageActions.innerHTML = "";

  if (game.stage === 0) {
    addAction(`방문 ${game.visited.size}/5`, () => advanceStage(), game.visited.size < 5, true);
  }

  if (game.stage === 1) {
    addAction(`알리바이 ${game.heard.size}/5`, () => advanceStage(), game.heard.size < 5, true);
  }

  if (game.stage === 2) {
    suspectTemplates.map(buildSuspect).forEach((suspect) => {
      addAction(`${suspect.name} 단서`, () => revealWitness(suspect), game.witnesses.has(suspect.id), false);
    });
    addAction("시간표 맞추기", () => advanceStage(), game.witnesses.size < 5, true);
  }

  if (game.stage === 3) {
    const wrapper = document.createElement("div");
    wrapper.className = "timeline-grid";
    suspectTemplates.map(buildSuspect).forEach((suspect) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `<span>${suspect.isCulprit ? "?" : "✓"}</span><div><strong>${suspect.name}</strong>${suspect.alibi}<br>${suspect.witness}</div>`;
      wrapper.appendChild(item);
    });
    stageActions.appendChild(wrapper);
    addAction("범인 지목하기", () => advanceStage(), false, true);
  }

  if (game.stage === 4) {
    const grid = document.createElement("div");
    grid.className = "accuse-grid";
    suspectTemplates.map(buildSuspect).forEach((suspect) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.textContent = suspect.name;
      button.addEventListener("click", () => accuse(suspect));
      grid.appendChild(button);
    });
    stageActions.appendChild(grid);
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

function renderMap() {
  mapPins.innerHTML = "";
  locations.forEach((location) => {
    const button = document.createElement("button");
    button.className = `pin ${game.visited.has(location.id) ? "visited" : ""} ${game.stage === 0 ? "current" : ""}`;
    button.type = "button";
    button.style.left = `${location.x}%`;
    button.style.top = `${location.y}%`;
    button.setAttribute("aria-label", location.name);
    button.textContent = location.icon;
    button.addEventListener("click", () => visitLocation(location));
    mapPins.appendChild(button);
  });
}

function renderSuspects() {
  suspectsEl.innerHTML = "";
  suspectTemplates.map(buildSuspect).forEach((suspect) => {
    const card = document.createElement("button");
    card.className = `suspect-card ${game.selected === suspect.id ? "selected" : ""} ${game.heard.has(suspect.id) ? "cleared" : ""}`;
    card.type = "button";
    card.innerHTML = `
      <div class="portrait-wrap">
        <img src="${suspect.img}" alt="${suspect.name} 초상화" />
        <span class="badge">${game.heard.has(suspect.id) ? "✓" : "?"}</span>
      </div>
      <div class="suspect-info">
        <strong>${suspect.name}</strong>
        <span>${suspect.job}</span>
      </div>
    `;
    card.addEventListener("click", () => hearAlibi(suspect));
    suspectsEl.appendChild(card);
  });
}

function renderNotebook() {
  clueList.innerHTML = "";
  notebookCount.textContent = `단서 ${game.clues.length}개`;
  if (!game.clues.length) {
    clueList.innerHTML = `<div class="clue">아직 수첩이 비어 있어요. 지도 표식부터 눌러 보세요.</div>`;
    return;
  }
  game.clues.slice().reverse().forEach((clue) => {
    const item = document.createElement("div");
    item.className = `clue ${clue.kind || ""}`;
    item.textContent = clue.text;
    clueList.appendChild(item);
  });
}

function visitLocation(location) {
  if (!game.visited.has(location.id)) {
    game.visited.add(location.id);
    addClue(`${location.name}: ${location.clue}`, location.id === "clocktower" ? "important" : "good");
    showToast(`${location.name} 단서를 찾았어요.`);
  } else {
    showToast(`${location.name}은 이미 살펴봤어요.`);
  }
  render();
}

function hearAlibi(suspect) {
  game.selected = suspect.id;
  if (game.stage < 1) {
    showToast("먼저 지도 다섯 곳을 살펴봐요.");
    renderSuspects();
    return;
  }
  if (!game.heard.has(suspect.id)) {
    game.heard.add(suspect.id);
    addClue(`${suspect.name}의 알리바이: ${suspect.alibi}`, suspect.isCulprit ? "important" : "good");
    showToast(`${suspect.name}의 알리바이를 수첩에 적었어요.`);
  } else {
    showToast(`${suspect.name}의 이야기는 이미 들었어요.`);
  }
  render();
}

function revealWitness(suspect) {
  if (game.stage < 2 || game.witnesses.has(suspect.id)) {
    return;
  }
  game.witnesses.add(suspect.id);
  addClue(`목격 단서: ${suspect.witness}`, suspect.isCulprit ? "important" : "good");
  showToast(suspect.isCulprit ? "이 단서는 아주 중요해 보여요!" : "알리바이가 튼튼해졌어요.");
  render();
}

function addClue(text, kind = "") {
  game.clues.push({ text, kind });
}

function advanceStage() {
  game.stage = Math.min(game.stage + 1, stages.length - 1);
  render();
}

function accuse(suspect) {
  if (game.solved) return;
  game.selected = suspect.id;
  if (suspect.isCulprit) {
    game.solved = true;
    document.querySelector(".game-shell").classList.add("celebrate");
    addClue(`해결! ${suspect.name}의 알리바이가 틀렸어요. 별 배지를 되찾았습니다!`, "important");
    showToast("정답이에요! 멋진 추리였어요.");
    setTimeout(() => document.querySelector(".game-shell").classList.remove("celebrate"), 520);
  } else {
    addClue(`${suspect.name}은 아닌 것 같아요. 목격 단서를 다시 비교해 보세요.`, "");
    showToast("조금만 더 생각해 봐요. 단서가 한 사람을 가리켜요.");
  }
  render();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1900);
}

startGame();
