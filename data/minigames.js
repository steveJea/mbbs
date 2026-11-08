/* Minigame catalog. Counts and filters are derived from this list.
   A platform is shown only when public is true and url is https.
   Toss is supported by the type field, but unpublished Toss URLs must not be added.
   Planned games stay out until they have a real public link. */
(function (root) {
  root.MBBS_MG_CATEGORIES = [
    { id: "all", label: "전체" },
    { id: "puzzle", label: "퍼즐" },
    { id: "action", label: "액션·리듬" },
    { id: "versus", label: "대전·전략" },
    { id: "fortune", label: "운세·테스트" }
  ];
  root.MBBS_MINIGAMES = [
    {
      id: "othello",
      title: "VR 오델로",
      category: "versus",
      description: "여섯 명의 스킬로 판을 뒤집는 VR 오델로",
      image: "assets/img/mg-othello.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/abyss_othello_bot", public: true }
      ]
    },
    {
      id: "match3",
      title: "VR 3매치",
      category: "puzzle",
      description: "같은 얼굴 셋, 맞추면 관문이 열린다",
      image: "assets/img/mg-match3.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VRMatch_bot", public: true }
      ]
    },
    {
      id: "spotdiff",
      title: "VR 틀린그림찾기",
      category: "puzzle",
      description: "90초 안에 다른 곳 다섯 군데를 찾아라",
      image: "assets/img/mg-spotdiff.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_spot_choose_bot", public: true },
        { type: "web", url: "https://vrdifferentfindsweb.netlify.app/", public: true }
      ]
    },
    {
      id: "tarot",
      title: "VR 타로",
      category: "fortune",
      description: "VR 캐릭터 22장이 오늘의 운세를 알려준다",
      image: "assets/img/mg-tarot.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_tarot_bot/play", public: true }
      ]
    },
    {
      id: "escape",
      title: "VR 배척지 탈출",
      category: "puzzle",
      description: "그림 조각을 밀어 배척지를 탈출하라",
      image: "assets/img/mg-escape.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_escape_bot/play", public: true },
        { type: "web", url: "https://vr-escape.pages.dev/", public: true }
      ]
    },
    {
      id: "shooting",
      title: "VR 슈팅",
      category: "action",
      description: "VR 캐릭터 편대를 물리쳐라!",
      image: "assets/img/mg-shooting.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_shooting_bot/play", public: true },
        { type: "web", url: "https://vr-shooting-el2.pages.dev/", public: true }
      ]
    },
    {
      id: "merge",
      title: "VR 머지",
      category: "puzzle",
      description: "같은 얼굴을 합쳐 이지영까지!",
      image: "assets/img/mg-merge.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_Merge_bot/play", public: true },
        { type: "web", url: "https://vr-merge.pages.dev", public: true }
      ]
    },
    {
      id: "taptap",
      title: "VR 탭탭 리듬",
      category: "action",
      description: "떨어지는 VR 캐릭터 얼굴을 박자에 맞춰 탭하는 4줄 리듬게임 (쉬움·보통·어려움 3곡)",
      image: "assets/img/mg-taptap.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_TAP_TAP_RHYTHM_bot/play", public: true },
        { type: "web", url: "https://vr-taptap.pages.dev", public: true }
      ]
    },
    {
      id: "persona",
      title: "VR 성격 테스트",
      category: "fortune",
      description: "나랑 닮은 VR 캐릭터는 누구? 질문 10개로 알아보는 성격 테스트 (결과 8가지)",
      image: "assets/img/mg-persona.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_personality_bot/play", public: true },
        { type: "web", url: "https://vr-persona.pages.dev", public: true }
      ]
    },
    {
      id: "fortune",
      title: "VR 운세 뽑기",
      category: "fortune",
      description: "하루 한 번 무료로 캡슐을 뽑아 VR 캐릭터를 만나고 오늘의 운세(총운·연애·금전·건강, 행운의 색·숫자)를 확인해요. 캐릭터 8명 도감 모으기.",
      image: "assets/img/mg-fortune.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_today_luck_bot/play", public: true },
        { type: "web", url: "https://vr-fortune.pages.dev", public: true }
      ]
    },
    {
      id: "battle",
      title: "VR Battle Masters",
      category: "versus",
      description: "VR 캐릭터 카드로 겨루는 파워 배틀",
      image: "assets/img/mg-battle.webp",
      platforms: [
        { type: "web", url: "https://battle.mbbs.kr/", public: true }
      ]
    },
    {
      id: "wcup",
      title: "VR 이상형 월드컵",
      category: "fortune",
      description: "최애 캐릭터를 골라라",
      image: "assets/img/mg-worldcup.webp",
      platforms: [
        { type: "web", url: "https://wcup.mbbs.kr/", public: true }
      ]
    },
    {
      id: "shootmasters",
      title: "VR Shooting Masters",
      category: "action",
      description: "도시를 지키는 웹 슈팅",
      image: "assets/img/mg-shootmasters.webp",
      platforms: [
        { type: "web", url: "https://shoot.mbbs.kr/", public: true }
      ]
    },
    {
      id: "cardflip",
      title: "VR 카드 뒤집기",
      category: "puzzle",
      description: "같은 캐릭터 카드 짝을 맞추며 별과 콤보에 도전하는 기억력 퍼즐",
      image: "assets/img/mg-cardflip.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_brain_test_bot/play", public: true },
        { type: "web", url: "https://vr-card.pages.dev", public: true }
      ]
    },
    {
      id: "gomoku",
      title: "VR 배틀오목",
      category: "versus",
      description: "29명 캐릭터의 스킬로 겨루는 오목. AI 3단계와 2인 대전, 도감 수집을 즐겨요.",
      image: "assets/img/mg-gomoku.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_gomoku_bot/play", public: true },
        { type: "web", url: "https://vr-gomoku.pages.dev", public: true }
      ]
    },
    {
      id: "bubble",
      title: "VR 버블 슈터",
      category: "puzzle",
      description: "캐릭터 얼굴 버블을 쏴서 같은 색 3개 이상 맞추는 버블 슈터. 30스테이지 이상, 별점과 폭탄·무지개 버블을 즐겨요.",
      image: "assets/img/mg-bubble.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_BUBBLE_CRUSH_BOT/PLAY", public: true },
        { type: "web", url: "https://vr-bubble-4b6.pages.dev", public: true }
      ]
    },
    {
      id: "tile",
      title: "VR 타일 매칭",
      category: "puzzle",
      description: "귀여운 VR 캐릭터 타일 3개를 모아 없애는 퍼즐! 36스테이지에 도전하세요.",
      image: "assets/img/mg-tile.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_TILE_MATCHING_BOT/PLAY", public: true },
        { type: "web", url: "https://vr-tile.pages.dev", public: true }
      ]
    },
    {
      id: "potion",
      title: "VR 물약 정렬",
      category: "puzzle",
      description: "같은 색 물약을 한 병에 모으는 퍼즐! 응원 친구와 도감을 만나며 70스테이지에 도전하세요.",
      image: "assets/img/mg-potion.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_FILL_BOTTLE_BOT/PLAY", public: true },
        { type: "web", url: "https://vr-potion.pages.dev", public: true }
      ]
    },
    {
      id: "screw",
      title: "VR 나사풀기",
      category: "puzzle",
      description: "귀여운 VR 캐릭터 판의 알록달록 나사를 풀어 5칸 트레이에 정리하는 퍼즐! 65스테이지와 부스터·도감을 즐겨요.",
      image: "assets/img/mg-screw.webp",
      platforms: [
        { type: "telegram", url: "https://t.me/VR_solve_screw_bot/play", public: true },
        { type: "web", url: "https://vr-screw.pages.dev", public: true }
      ]
    }
  ];
})(typeof globalThis !== "undefined" ? globalThis : this);
