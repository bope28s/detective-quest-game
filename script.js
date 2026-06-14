const starLocations = [
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

const starSuspects = [
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
    image: "assets/case1-intro.png",
    mapImg: "assets/quest-map.png",
    introImg: "assets/case1-intro.png",
    successImg: "assets/case1-success.png",
    failImg: "assets/case1-fail.png",
    locations: starLocations,
    suspects: starSuspects,
    intro: "시계탑 축제 아침, 반짝이던 별 배지가 사라졌어요. 장소마다 한 사람씩 만나 보세요. 단서가 아주 직접적으로 범인을 알려줄 거예요.",
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
    id: "museum-night",
    label: "두 번째 사건",
    level: "조금 어려움",
    name: "밤의 박물관 사건",
    title: "달빛 박물관에서 관장이 쓰러진 채 발견됐어요",
    image: "assets/case2-intro.png",
    mapImg: "assets/case2-intro.png",
    introImg: "assets/case2-intro.png",
    successImg: "assets/case2-success.png",
    failImg: "assets/case2-fail.png",
    locations: [
      {
        id: "night-gallery",
        name: "달빛 전시실",
        icon: "◆",
        x: 24,
        y: 58,
        focus: "42% 48%",
        clueSpot: [40, 66],
        actorSpot: [68, 52],
        intro: "깨진 유리 진열장 주변에 작은 흔적이 남아 있어요.",
        quiz: { question: "전시실 바닥의 반짝이는 조각은 무엇과 가장 관련 있을까요?", options: ["유리 조각", "조개껍데기", "빵 봉투"], answer: "유리 조각" },
      },
      {
        id: "security-room",
        name: "보안실",
        icon: "●",
        x: 42,
        y: 35,
        focus: "62% 44%",
        clueSpot: [35, 58],
        actorSpot: [66, 50],
        intro: "꺼진 CCTV 화면 옆에 시간표가 비뚤어져 있어요.",
        quiz: { question: "보안실에서 시간을 확인하는 데 가장 중요한 것은?", options: ["CCTV 기록", "요리책", "물뿌리개"], answer: "CCTV 기록" },
      },
      {
        id: "museum-cafe",
        name: "야간 카페",
        icon: "▲",
        x: 62,
        y: 68,
        focus: "50% 60%",
        clueSpot: [48, 70],
        actorSpot: [67, 51],
        intro: "계산대 아래에 구겨진 영수증 한 장이 보여요.",
        quiz: { question: "카페에서 손님이 있었는지 알 수 있는 흔적은?", options: ["영수증", "바이올린 줄", "나침반"], answer: "영수증" },
      },
      {
        id: "museum-plaza",
        name: "박물관 앞 광장",
        icon: "★",
        x: 78,
        y: 48,
        focus: "70% 52%",
        clueSpot: [44, 62],
        actorSpot: [66, 48],
        intro: "가로등 아래에 낡은 악보 조각이 떨어져 있어요.",
        quiz: { question: "광장에서 연주자와 이어질 수 있는 물건은?", options: ["악보 조각", "청소 열쇠", "연구 노트"], answer: "악보 조각" },
      },
      {
        id: "service-hall",
        name: "직원 복도",
        icon: "■",
        x: 86,
        y: 24,
        focus: "58% 36%",
        clueSpot: [50, 63],
        actorSpot: [68, 48],
        intro: "바닥에 젖은 대걸레 자국과 작은 열쇠 흔적이 남아 있어요.",
        quiz: { question: "직원 복도에서 문을 열고 닫은 흔적과 가장 가까운 것은?", options: ["열쇠 고리", "카메라 렌즈", "간식 바구니"], answer: "열쇠 고리" },
      },
    ],
    suspects: [
      { id: "security", name: "한별 보안요원", job: "야간 보안실을 지키는 요원", img: "assets/case2-security.png", home: "security-room", token: "꺼진 CCTV 시간표" },
      { id: "curator", name: "서윤 큐레이터", job: "전시품을 관리하는 큐레이터", img: "assets/case2-curator.png", home: "night-gallery", token: "흰 장갑의 유리 가루" },
      { id: "cafeowner", name: "민재 카페주인", job: "박물관 카페를 닫는 주인", img: "assets/case2-cafe-owner.png", home: "museum-cafe", token: "구겨진 영수증" },
      { id: "violinist", name: "라라 바이올리니스트", job: "광장에서 밤 연주를 하는 연주자", img: "assets/case2-violinist.png", home: "museum-plaza", token: "찢어진 악보 조각" },
      { id: "janitor", name: "도윤 관리인", job: "직원 복도를 청소하는 관리인", img: "assets/case2-janitor.png", home: "service-hall", token: "젖은 열쇠 고리 자국" },
    ],
    intro: "달빛 박물관 폐관 후, 관장이 전시실에서 쓰러진 채 발견됐어요. 피가 보이거나 무서운 장면은 없지만, 누군가 진열장을 만지고 시간을 속였어요.",
    success: "침착한 추리였어요! 관장은 안전하게 회복했고, 범인은 경찰에게 조용히 인계됐어요. 이제 더 어려운 실종사건이 열립니다.",
    item(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `${suspect.token}이 사건 시간의 빈틈과 이어져요. 알리바이까지 함께 보면 ${suspect.name}이 가장 수상해요.`;
      }
      return `${suspect.token}은 현장 흔적과 비슷하지만 결정적인 시간과 맞지 않아요. ${suspect.name}은 후보에서 멀어져요.`;
    },
    alibi(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `"9시 20분에는 혼자 있었어." 바로 그때 전시실 불이 꺼졌고, 확인해 줄 사람이 없어요.`;
      }
      const alibis = {
        "night-gallery": "9시 20분에 전시품 점검표를 다른 직원과 확인했어.",
        "security-room": "9시 20분에 무전 기록을 남기고 있었어.",
        "museum-cafe": "9시 20분에 마지막 손님의 결제를 처리했어.",
        "museum-plaza": "9시 20분에 광장 가로등 아래서 연주 중이었어.",
        "service-hall": "9시 20분에 복도 청소 체크를 마쳤어.",
      };
      return `"${alibis[suspect.home]}" 시간 단서와 잘 맞는 알리바이예요.`;
    },
  },
  {
    id: "missing-camp",
    label: "세 번째 사건",
    level: "어려움",
    name: "바닷가 과학캠프 실종사건",
    title: "과학캠프에서 친구가 사라졌어요",
    image: "assets/case3-intro.png",
    mapImg: "assets/case3-intro.png",
    introImg: "assets/case3-intro.png",
    successImg: "assets/case3-success.png",
    failImg: "assets/case3-fail.png",
    locations: [
      {
        id: "marine-lab",
        name: "해양 연구실",
        icon: "◆",
        x: 22,
        y: 44,
        focus: "44% 54%",
        clueSpot: [42, 66],
        actorSpot: [68, 50],
        intro: "젖은 연구 노트에 지워진 시간 표시가 남아 있어요.",
        quiz: { question: "바다 생물을 기록할 때 가장 어울리는 물건은?", options: ["연구 노트", "영수증", "악보"], answer: "연구 노트" },
      },
      {
        id: "kayak-pier",
        name: "카약 선착장",
        icon: "●",
        x: 42,
        y: 70,
        focus: "58% 66%",
        clueSpot: [46, 72],
        actorSpot: [66, 52],
        intro: "카약 밧줄이 다시 묶인 방향이 이상해요.",
        quiz: { question: "선착장에서 배가 움직였는지 알 수 있는 것은?", options: ["밧줄 매듭", "우산 손잡이", "쿠키 봉투"], answer: "밧줄 매듭" },
      },
      {
        id: "weather-station",
        name: "등대 기상대",
        icon: "▲",
        x: 64,
        y: 29,
        focus: "54% 34%",
        clueSpot: [48, 58],
        actorSpot: [68, 48],
        intro: "무전기 옆에 바람 방향 기록이 한 줄 비어 있어요.",
        quiz: { question: "기상대에서 길을 찾는 데 도움이 되는 정보는?", options: ["바람 방향", "커피 쿠폰", "장갑 가루"], answer: "바람 방향" },
      },
      {
        id: "photo-kiosk",
        name: "사진 매점",
        icon: "★",
        x: 76,
        y: 56,
        focus: "66% 52%",
        clueSpot: [43, 64],
        actorSpot: [67, 50],
        intro: "사진 인화기에는 한 장 빠진 시간대의 사진 번호가 남아 있어요.",
        quiz: { question: "누가 어디에 있었는지 보여 줄 수 있는 것은?", options: ["사진 번호", "대걸레 자국", "비늘 표본"], answer: "사진 번호" },
      },
      {
        id: "camp-kitchen",
        name: "캠프 식당",
        icon: "■",
        x: 87,
        y: 78,
        focus: "62% 62%",
        clueSpot: [50, 68],
        actorSpot: [68, 51],
        intro: "간식 바구니 옆에 찢어진 쪽지가 놓여 있어요.",
        quiz: { question: "식당에서 누군가를 불러낸 단서로 가장 알맞은 것은?", options: ["찢어진 쪽지", "유리 조각", "시계 톱니"], answer: "찢어진 쪽지" },
      },
    ],
    suspects: [
      { id: "biologist", name: "하린 연구원", job: "해양 생물을 기록하는 연구원", img: "assets/case3-biologist.png", home: "marine-lab", token: "지워진 연구 노트" },
      { id: "coach", name: "준호 카약코치", job: "선착장 안전을 맡은 코치", img: "assets/case3-kayak-coach.png", home: "kayak-pier", token: "다시 묶인 밧줄" },
      { id: "weather", name: "미라 기상관찰원", job: "등대에서 날씨를 기록하는 관찰원", img: "assets/case3-weather-watcher.png", home: "weather-station", token: "빈 바람 기록" },
      { id: "photographer", name: "태오 사진사", job: "캠프 사진을 찍는 사진사", img: "assets/case3-photographer.png", home: "photo-kiosk", token: "빠진 사진 번호" },
      { id: "cook", name: "소담 캠프요리사", job: "간식과 식사를 준비하는 요리사", img: "assets/case3-cook.png", home: "camp-kitchen", token: "찢어진 간식 쪽지" },
    ],
    intro: "바닷가 과학캠프에서 한 친구가 저녁 점호 전에 사라졌어요. 위험한 장면은 없지만, 누군가 친구를 다른 곳으로 데려가 숨긴 듯해요. 단서가 서로 연결되어야 진짜 범인이 보여요.",
    success: "대단해요! 사라진 친구는 무사히 발견됐고, 범인은 경찰에게 인계됐어요. 어려운 실종사건까지 해결했습니다.",
    item(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `${suspect.token}은 다른 장소의 시간 단서와 이어져요. 여러 힌트를 모아 보면 ${suspect.name}의 동선이 가장 이상해요.`;
      }
      return `${suspect.token}은 수상하지만 다른 사람의 기록과 맞물려 알리바이를 도와줘요. 아직 진짜 연결고리를 찾아야 해요.`;
    },
    alibi(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `"해 질 무렵엔 혼자 정리하고 있었어." 그런데 그 시간의 사진과 바람 기록이 비어 있어요.`;
      }
      const alibis = {
        "marine-lab": "해 질 무렵 연구실에서 표본 수를 두 명이 함께 세고 있었어.",
        "kayak-pier": "해 질 무렵 선착장에서 구명조끼를 학생들과 확인했어.",
        "weather-station": "해 질 무렵 등대에서 무전 보고를 했어.",
        "photo-kiosk": "해 질 무렵 단체 사진을 인화하고 있었어.",
        "camp-kitchen": "해 질 무렵 식당에서 간식 바구니를 나눠 주고 있었어.",
      };
      return `"${alibis[suspect.home]}" 다른 단서와 함께 보면 꽤 탄탄한 알리바이예요.`;
    },
  },
  {
    id: "zoo-puppy",
    label: "네 번째 사건",
    level: "쉬움+",
    name: "동물원 강아지 실종 사건",
    title: "동물원 안내견 강아지 콩이가 사라졌어요!",
    image: "assets/case4-intro.png",
    mapImg: "assets/case4-intro.png",
    introImg: "assets/case4-intro.png",
    successImg: "assets/case4-success.png",
    failImg: "assets/case4-fail.png",
    locations: [
      {
        id: "zoo-gate",
        name: "동물원 정문",
        icon: "🎟️",
        x: 32,
        y: 70,
        focus: "42% 62%",
        clueSpot: [42, 70],
        actorSpot: [68, 52],
        intro: "정문 앞에 빨간 목줄과 작은 발자국이 남아 있어요.",
        quiz: { question: "강아지가 지나간 흔적을 찾을 때 가장 먼저 볼 것은 무엇일까요?", options: ["발자국", "구름 모양", "기린 무늬"], answer: "발자국" },
      },
      {
        id: "zoo-clinic",
        name: "동물 병원",
        icon: "💊",
        x: 58,
        y: 62,
        focus: "56% 58%",
        clueSpot: [48, 66],
        actorSpot: [68, 50],
        intro: "진료대 옆에 콩이 이름표와 건강 기록 카드가 놓여 있어요.",
        quiz: { question: "동물 병원에서 강아지 이름을 확인할 수 있는 것은 무엇일까요?", options: ["이름표", "입장권", "팝콘 컵"], answer: "이름표" },
      },
      {
        id: "zoo-photo",
        name: "기념사진 부스",
        icon: "📷",
        x: 73,
        y: 49,
        focus: "70% 52%",
        clueSpot: [46, 64],
        actorSpot: [66, 49],
        intro: "사진 부스 화면에는 콩이가 누군가를 따라간 시간이 찍혀 있어요.",
        quiz: { question: "사진 부스에서 시간을 확인할 수 있는 단서는 무엇일까요?", options: ["사진 번호", "간식 봉지", "물그릇"], answer: "사진 번호" },
      },
      {
        id: "zoo-yard",
        name: "강아지 훈련장",
        icon: "🦴",
        x: 50,
        y: 36,
        focus: "50% 45%",
        clueSpot: [44, 62],
        actorSpot: [67, 50],
        intro: "훈련장 울타리 옆에 씹힌 공과 새로 묶은 매듭이 보여요.",
        quiz: { question: "강아지가 좋아해서 따라갈 만한 물건은 무엇일까요?", options: ["씹힌 공", "CCTV 기록", "식물 이름표"], answer: "씹힌 공" },
      },
      {
        id: "snack-cart",
        name: "간식 수레",
        icon: "🥨",
        x: 82,
        y: 76,
        focus: "76% 68%",
        clueSpot: [50, 68],
        actorSpot: [68, 51],
        intro: "간식 수레 아래에 강아지 간식 부스러기와 수레 바퀴 자국이 이어져 있어요.",
        quiz: { question: "강아지를 유인할 수 있는 가장 그럴듯한 것은 무엇일까요?", options: ["강아지 간식", "지도 접기", "사진 배경"], answer: "강아지 간식" },
      },
    ],
    suspects: [
      { id: "trainer", name: "도윤 훈련사", job: "안내견 훈련을 맡은 선생님", img: "assets/case4-trainer.svg", home: "zoo-yard", token: "씹힌 공과 새 매듭" },
      { id: "vet", name: "하린 수의사", job: "동물 병원에서 건강을 살피는 수의사", img: "assets/case4-vet.svg", home: "zoo-clinic", token: "콩이 이름표" },
      { id: "photographer", name: "민준 사진사", job: "기념사진 부스를 운영하는 사진사", img: "assets/case4-photographer.svg", home: "zoo-photo", token: "사진 부스 시간 기록" },
      { id: "zookeeper", name: "서아 사육사", job: "동물원 동물들을 돌보는 사육사", img: "assets/case4-zookeeper.svg", home: "zoo-gate", token: "정문 발자국" },
      { id: "snackkeeper", name: "나래 간식 담당", job: "동물원 간식 수레를 맡은 담당자", img: "assets/case4-snackkeeper.svg", home: "snack-cart", token: "강아지 간식 부스러기" },
    ],
    intro: "동물원 어린이 안내견 강아지 콩이가 사라졌어요. 위험한 일은 아니지만, 누군가 콩이를 조용한 곳으로 데려간 것 같아요. 발자국, 시간 기록, 간식 흔적을 모아 진짜 이유를 찾아보세요.",
    success: "콩이를 무사히 찾았어요! 범인은 콩이를 몰래 데려가려 했지만 단서들이 모두 이어졌어요. 이제 사건 선택 화면으로 돌아가 다른 사건도 해결해 보세요.",
    item(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `${suspect.token}이 콩이가 사라진 길과 정확히 이어져요. 여러 단서를 합치면 ${suspect.name}이 가장 수상해요.`;
      }
      return `${suspect.token}은 수상해 보이지만 다른 기록과 맞춰 보면 콩이를 데려간 결정적인 단서는 아니에요. ${suspect.name}은 후보에서 조금 멀어졌어요.`;
    },
    alibi(suspect, culprit) {
      if (suspect.id === culprit.id) {
        return `"잠깐 혼자 정리하고 있었어요." 하지만 그 시간에 콩이 목줄과 같은 방향의 흔적이 이어졌어요.`;
      }
      const alibis = {
        "zoo-yard": "훈련장에서는 아이들과 함께 공 던지기 수업을 하고 있었어요.",
        "zoo-clinic": "동물 병원에서는 다른 강아지의 건강 기록을 쓰고 있었어요.",
        "zoo-photo": "사진 부스에서는 단체 사진 번호를 정리하고 있었어요.",
        "zoo-gate": "정문에서는 입장 팔찌를 나눠 주는 일을 도와주고 있었어요.",
        "snack-cart": "간식 수레에서는 주문표를 세고 있었어요.",
      };
      return `"${alibis[suspect.home]}" 다른 단서와 맞춰 보면 괜찮은 알리바이예요.`;
    },
  },
];

const PROGRESS_KEY = "detectiveQuestProgressV1";
const FINALE_KEY = "detectiveQuestFinaleV1";

const savedProgress = loadProgress();
let game = { mode: "select" };
let completedCases = new Set(savedProgress.completedCases);
let solvedCulprits = savedProgress.solvedCulprits;
let finalSolved = savedProgress.finalSolved;

const caseCard = document.querySelector("#caseCard");
const caseImage = document.querySelector("#caseImage");
const caseName = document.querySelector("#caseName");
const caseSelect = document.querySelector("#caseSelect");
const caseProgress = document.querySelector("#caseProgress");
const sceneTitle = document.querySelector("#sceneTitle");
const sceneText = document.querySelector("#sceneText");
const sceneActions = document.querySelector("#sceneActions");
const mapImage = document.querySelector("#mapImage");
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
const installButton = document.querySelector("#installButton");
const endingView = document.querySelector("#endingView");
const endingCloseButton = document.querySelector("#endingCloseButton");
let suppressHotspotUntil = 0;
let pendingRestartCaseIndex = null;
let deferredInstallPrompt = null;

document.querySelector("#newGameButton").addEventListener("click", showCaseSelect);
installButton.addEventListener("click", handleInstallClick);
endingCloseButton.addEventListener("click", closeEnding);
document.querySelector("#closePlaceButton").addEventListener("click", closePlace);
document.querySelector("#quizCloseButton").addEventListener("click", closeQuiz);
document.querySelector("#evidenceCloseButton").addEventListener("click", closeEvidence);
clueHotspot.addEventListener("click", inspectCurrent);
suspectActor.addEventListener("click", hearCurrent);
["pointerdown", "touchstart", "click"].forEach((eventName) => {
  clueDiscovery.addEventListener(eventName, dismissClueDiscovery, { passive: false });
});
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

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  showInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  hideInstallButton();
  showToast("앱 설치가 완료됐어요.");
});

setupInstallUi();

function setupInstallUi() {
  if (isStandaloneApp()) {
    hideInstallButton();
    return;
  }

  if (isIosSafari()) {
    showInstallButton();
  }
}

function showInstallButton() {
  installButton.hidden = false;
}

function hideInstallButton() {
  installButton.hidden = true;
}

function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIosSafari() {
  const ua = window.navigator.userAgent;
  const isIos = /iphone|ipad|ipod/i.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!CriOS|FxiOS|EdgiOS|OPiOS).)*Safari/i.test(ua);
  return isIos && isSafari;
}

async function handleInstallClick() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (choice.outcome === "accepted") {
      hideInstallButton();
    }
    return;
  }

  if (isIosSafari()) {
    showToast("Safari 공유 버튼을 누른 뒤 '홈 화면에 추가'를 선택하세요.");
    return;
  }

  showToast("브라우저 메뉴에서 '앱 설치' 또는 '홈 화면에 추가'를 선택하세요.");
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    return {
      completedCases: Array.isArray(saved.completedCases) ? saved.completedCases : [],
      solvedCulprits: saved.solvedCulprits || {},
      finalSolved: localStorage.getItem(FINALE_KEY) === "done",
    };
  } catch {
    return { completedCases: [], solvedCulprits: {}, finalSolved: false };
  }
}

function saveProgress() {
  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify({
      completedCases: [...completedCases],
      solvedCulprits,
    }),
  );
  if (finalSolved) {
    localStorage.setItem(FINALE_KEY, "done");
  }
}

function showCaseSelect() {
  game = { mode: "select" };
  closePlace();
  closeQuiz();
  closeEvidence();
  hideEnding();
  document.querySelector(".quest-board").hidden = true;
  document.querySelector(".play-area").hidden = true;
  caseSelect.hidden = false;
  renderCaseHeader();
  renderCaseSelect();
}

function renderCaseSelect() {
  const completedCount = completedCases.size;
  const finalReady = completedCount === cases.length && allCaseCulpritsReady();
  caseSelect.innerHTML = `
    <div class="case-select-heading">
      <div>
        <p class="eyebrow">사건 파일</p>
        <h2>해결할 사건을 고르세요</h2>
      </div>
      <span>${completedCount}/${cases.length} 클리어</span>
    </div>
    <div class="case-grid">
      ${cases.map((caseFile, index) => renderCaseChoice(caseFile, index)).join("")}
      ${renderFinalChoice(finalReady)}
    </div>
  `;

  caseSelect.querySelectorAll("[data-case-index]").forEach((button) => {
    button.addEventListener("click", () => startCase(Number(button.dataset.caseIndex)));
  });
  caseSelect.querySelector("[data-final-game]")?.addEventListener("click", startFinalGame);
}

function renderCaseChoice(caseFile, index) {
  const cleared = completedCases.has(caseFile.id);
  return `
    <button class="case-choice ${cleared ? "cleared" : ""}" type="button" data-case-index="${index}">
      <img src="${caseFile.image}" alt="${caseFile.name}" />
      <span class="case-status">${cleared ? "클리어" : caseFile.level}</span>
      <strong>${caseFile.name}</strong>
      <small>${caseFile.title}</small>
    </button>
  `;
}

function renderFinalChoice(finalReady) {
  const locked = !finalReady && !finalSolved;
  return `
    <button class="case-choice final-choice ${finalSolved ? "cleared" : ""}" type="button" data-final-game ${locked ? "disabled" : ""}>
      <img src="assets/icon-512.png" alt="최종 추리" />
      <span class="case-status">${finalSolved ? "완전 클리어" : finalReady ? "최종 개방" : "잠김"}</span>
      <strong>최종 거짓말 게임</strong>
      <small>네 사건의 범인이 한자리에 모입니다. 세 명은 진실, 한 명은 거짓말을 해요.</small>
    </button>
  `;
}

function allCaseCulpritsReady() {
  return cases.every((caseFile) => solvedCulprits[caseFile.id]);
}

function startFinalGame() {
  if (!finalSolved && (!completedCases.size || completedCases.size < cases.length || !allCaseCulpritsReady())) {
    showToast("네 사건을 모두 클리어하면 열려요.");
    return;
  }

  const lineup = cases.map((caseFile) => solvedCulprits[caseFile.id]);
  const liarIndex = finalSolved ? 0 : Math.floor(Math.random() * lineup.length);
  const liar = lineup[liarIndex];
  const decoy = lineup[(liarIndex + 1) % lineup.length];
  game = {
    mode: "final",
    finalLineup: lineup.map((culprit, index) => ({
      ...culprit,
      statement:
        index === liarIndex
          ? `진짜 범인은 제가 아니라 ${decoy.name}예요. 저는 그저 지나가던 중이었어요.`
          : `진짜 범인은 ${liar.name}예요. 네 사건의 단서가 모두 그쪽을 가리켜요.`,
      truth: index !== liarIndex,
    })),
    finalCulpritId: liar.id,
  };
  caseSelect.hidden = true;
  document.querySelector(".quest-board").hidden = false;
  document.querySelector(".play-area").hidden = false;
  closePlace();
  closeQuiz();
  render();
}

function startCase(caseIndex) {
  const selectedCase = cases[caseIndex];
  const culprit = selectedCase.suspects[Math.floor(Math.random() * selectedCase.suspects.length)];
  game = {
    mode: "case",
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
  caseSelect.hidden = true;
  document.querySelector(".quest-board").hidden = false;
  document.querySelector(".play-area").hidden = false;
  closePlace();
  closeQuiz();
  render();
  showEvidence("사건 발생", selectedCase.name, selectedCase.intro, "!", selectedCase.introImg);
}

function currentLocations() {
  return game.case.locations;
}

function currentSuspects() {
  return game.case.suspects;
}

function locationName(locationId) {
  return currentLocations().find((location) => location.id === locationId).name;
}

function currentLocation() {
  return currentLocations()[game.routeIndex];
}

function suspectAt(locationId) {
  return currentSuspects().find((suspect) => suspect.home === locationId);
}

function currentSuspect() {
  return suspectAt(currentLocation().id);
}

function currentCulprit() {
  return currentSuspects().find((suspect) => suspect.id === game.culpritId);
}

function canJudgeCurrent() {
  const suspect = currentSuspect();
  return game.items.has(suspect.id) && game.heard.has(suspect.id);
}

function render() {
  if (game.mode === "select") {
    renderCaseHeader();
    renderCaseSelect();
    return;
  }
  if (game.mode === "final") {
    renderFinalGame();
    return;
  }
  renderCaseHeader();
  renderScene();
  renderMap();
  renderSuspects();
  renderDeduction();
}

function renderCaseHeader() {
  if (!game.case) {
    caseImage.src = "assets/icon-512.png";
    caseImage.alt = "탐정 퀘스트 클럽";
    caseName.textContent = finalSolved ? "모든 사건을 완전히 해결했어요!" : "네 사건 중 하나를 골라 단서를 모으세요.";
    caseCard.classList.toggle("done", finalSolved);
    return;
  }
  caseImage.src = game.case.image;
  caseImage.alt = game.case.name;
  caseName.textContent = game.case.title;
  caseCard.classList.toggle("done", game.solved);
}

function renderFinalGame() {
  const lineup = game.finalLineup;
  const truthCount = lineup.filter((person) => person.truth).length;
  caseImage.src = "assets/icon-512.png";
  caseImage.alt = "최종 추리";
  caseName.textContent = "세 명의 진실과 한 명의 거짓말";
  caseCard.classList.remove("done");
  caseProgress.textContent = "최종 게임";
  sceneTitle.textContent = "범인들의 마지막 모임";
  sceneText.textContent = "네 사건의 범인들이 한 장소에 모였어요. 세 명은 진실을 말하고, 한 명만 거짓말을 합니다. 거짓말을 하는 사람이 마지막 진짜 범인이에요.";
  sceneActions.innerHTML = "";
  addAction("사건 선택으로 돌아가기", showCaseSelect, false, false);
  mapImage.src = "assets/icon-512.png";
  mapImage.alt = "최종 추리";
  mapPins.innerHTML = "";
  suspectsEl.innerHTML = lineup
    .map(
      (person) => `
        <button class="suspect-card selected final-suspect" type="button" data-final-suspect="${person.id}">
          <div class="portrait-wrap">
            <img src="${person.img}" alt="${person.name}" />
            <span class="badge">?</span>
          </div>
          <div class="suspect-info">
            <strong>${person.name}</strong>
            <span>${person.caseName}</span>
          </div>
        </button>
      `,
    )
    .join("");
  suspectsEl.querySelectorAll("[data-final-suspect]").forEach((button) => {
    button.addEventListener("click", () => judgeFinal(button.dataset.finalSuspect));
  });
  deductionCount.textContent = `${truthCount}명 진실`;
  deductionScreen.innerHTML = lineup
    .map(
      (person) => `
        <div class="radar-card final-statement">
          <strong>${person.name}</strong>
          ${person.statement}
        </div>
      `,
    )
    .join("");
}

function renderScene() {
  const location = currentLocation();
  const suspect = currentSuspect();
  caseProgress.textContent = `${game.case.label} · ${game.case.level} · ${game.routeIndex + 1}/${currentLocations().length}`;
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

  if (game.solved) {
    addAction("사건 선택으로 돌아가기", showCaseSelect, false, true);
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
  mapImage.src = game.case.mapImg;
  mapImage.alt = `${game.case.name} 지도`;
  mapPins.innerHTML = "";
  currentLocations().forEach((location, index) => {
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
  currentSuspects().forEach((suspect) => {
    const locationIndex = currentLocations().findIndex((location) => location.id === suspect.home);
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
  deductionCount.textContent = game.solved ? "해결" : `${game.routeIndex + 1}/${currentLocations().length}`;
  deductionScreen.innerHTML = `
    <div class="radar-pips">
      <div class="radar-pip">현재 장소<span>${game.routeIndex + 1}/${currentLocations().length}</span></div>
      <div class="radar-pip">아이템<span>${game.items.size}/${currentSuspects().length}</span></div>
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
  return currentSuspects()
    .filter((suspect) => game.items.has(suspect.id))
    .map((suspect) => `<div class="item-row">${suspect.token}<span>${suspect.name}</span></div>`)
    .join("");
}

function renderCandidates() {
  return `<div class="candidate-grid">${currentSuspects()
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
  placeSceneImage.src = location.scene || game.case.mapImg;
  placeSceneImage.alt = location.name;
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
  if (!isClueDiscoveryOpen()) {
    positionClueDiscovery(location);
  }

  placeView.hidden = false;
  render();
}

function closePlace() {
  placeView.hidden = true;
  placeBubble.hidden = true;
  hideClueDiscovery();
}

function inspectCurrent() {
  if (Date.now() < suppressHotspotUntil) return;

  const suspect = currentSuspect();
  if (isClueDiscoveryOpen()) {
    dismissClueDiscovery();
    return;
  }
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
  clueDiscovery.style.display = "block";
  clueDiscovery.style.pointerEvents = "auto";
  clueDiscovery.classList.remove("is-hidden");
  clueDiscovery.setAttribute("aria-hidden", "false");
}

function dismissClueDiscovery(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
  }
  suppressHotspotUntil = Date.now() + 500;
  hideClueDiscovery();
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

function hideClueDiscovery() {
  clueDiscovery.hidden = true;
  clueDiscovery.style.display = "none";
  clueDiscovery.style.pointerEvents = "none";
  clueDiscovery.classList.add("is-hidden");
  clueDiscovery.classList.remove("item");
  clueDiscovery.setAttribute("aria-hidden", "true");
}

function isClueDiscoveryOpen() {
  return !clueDiscovery.hidden && !clueDiscovery.classList.contains("is-hidden") && clueDiscovery.style.display !== "none";
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
    if (game.routeIndex >= currentLocations().length) {
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
  pendingRestartCaseIndex = game.caseIndex;
  showEvidence("추리 실패", "다시 도전", message, "?", game.case.failImg);
}

function solveCase(suspect) {
  game.solved = true;
  game.latest = `${suspect.name}이 범인이었어요. ${game.case.success}`;
  completedCases.add(game.case.id);
  solvedCulprits[game.case.id] = {
    id: `${game.case.id}-${suspect.id}`,
    suspectId: suspect.id,
    caseId: game.case.id,
    caseName: game.case.name,
    name: suspect.name,
    job: suspect.job,
    img: suspect.img,
    token: suspect.token,
  };
  saveProgress();
  closePlace();
  document.querySelector(".game-shell").classList.add("celebrate");
  showEvidence("사건 해결", suspect.name, game.case.success, "✓", game.case.successImg);
  setTimeout(() => document.querySelector(".game-shell").classList.remove("celebrate"), 520);
  render();
}

function showEvidence(type, title, text, icon, imageSrc = "") {
  const evidenceCard = document.querySelector(".evidence-card");
  evidenceCard.querySelector(".evidence-art")?.remove();
  evidenceCard.classList.toggle("has-image", Boolean(imageSrc));
  if (imageSrc) {
    const image = document.createElement("img");
    image.className = "evidence-art";
    image.src = imageSrc;
    image.alt = title;
    evidenceCard.prepend(image);
  }
  evidenceType.textContent = type;
  evidenceTitle.textContent = title;
  evidenceText.textContent = text;
  evidenceIcon.textContent = icon;
  evidencePopup.hidden = false;
}

function closeEvidence() {
  evidencePopup.hidden = true;
  if (pendingRestartCaseIndex !== null) {
    const nextCaseIndex = pendingRestartCaseIndex;
    pendingRestartCaseIndex = null;
    startCase(nextCaseIndex);
    return;
  }
  if (game.mode === "case" && game.solved) {
    showCaseSelect();
  }
}

function judgeFinal(suspectId) {
  if (suspectId !== game.finalCulpritId) {
    showToast("그 사람의 말은 논리적으로 맞아요. 한 명만 거짓말한다는 조건을 다시 보세요.");
    return;
  }

  finalSolved = true;
  saveProgress();
  showFinalEnding();
}

function showFinalEnding() {
  endingView.hidden = false;
  endingView.querySelector(".ending-sky").innerHTML = Array.from({ length: 28 }, (_, index) => `<span style="--i:${index}"></span>`).join("");
}

function hideEnding() {
  endingView.hidden = true;
  endingView.querySelector(".ending-sky").innerHTML = "";
}

function closeEnding() {
  hideEnding();
  showCaseSelect();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1900);
}

showCaseSelect();
