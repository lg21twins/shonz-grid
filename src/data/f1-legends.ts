export interface Champion {
  year: number;
  driver: string;
  team: string;
  wins: number;
  points: number;
}

/* ── Hall of Fame driver image lookup (F1 CDN / Getty Images) ── */
const HOF = "https://media.formula1.com/image/upload/c_fill,w_600,h_900,g_face/c_pad,w_600,h_930,g_south,b_auto/q_auto:best/v1740000000/fom-website/manual/Hall%20of%20Fame%202024";
const F1D = "https://media.formula1.com/image/upload/c_fill,w_600,h_900,g_face/c_pad,w_600,h_930,g_south,b_auto/q_auto:best/v1740000000/common/f1/2026";

export const CHAMPION_IMAGES: Record<string, string> = {
  "란도 노리스": `${F1D}/mclaren/lannor01/2026mclarenlannor01right.webp`,
  "막스 베르스타펜": `${F1D}/redbullracing/maxver01/2026redbullracingmaxver01right.webp`,
  "루이스 해밀턴": `${F1D}/ferrari/lewham01/2026ferrarilewham01right.webp`,
  "페르난도 알론소": `${F1D}/astonmartin/feralo01/2026astonmartinferalo01right.webp`,
  "니코 로즈버그": `${HOF}/GettyImages-607523452.webp`,
  "세바스티안 베텔": `${HOF}/GettyImages-82801122.webp`,
  "젠슨 버튼": `${HOF}/GettyImages-91979303.webp`,
  "키미 라이코넨": `${HOF}/GettyImages-2071874459.webp`,
  "미하엘 슈마허": `${HOF}/GettyImages-72220757.webp`,
  "미카 하키넨": `${HOF}/GettyImages-647968497.webp`,
  "자크 빌뇌브": `${HOF}/GettyImages-52918273.webp`,
  "데이먼 힐": `${HOF}/GettyImages-868558648.webp`,
  "나이젤 맨셀": `${HOF}/GettyImages-865701928.webp`,
  "알랭 프로스트": `${HOF}/GettyImages-537112453.webp`,
  "아일톤 세나": `${HOF}/GettyImages-659224375.webp`,
  "넬슨 피케": `${HOF}/GettyImages-1066217104.webp`,
  "니키 라우다": `${HOF}/GettyImages-525577811.webp`,
  "케케 로즈버그": `${HOF}/GettyImages-464497739.webp`,
  "앨런 존스": `${HOF}/GettyImages-868507192.webp`,
  "조디 셱터": `${HOF}/GettyImages-79750356.webp`,
  "마리오 안드레티": `${HOF}/GettyImages-851859388.webp`,
  "제임스 헌트": `${HOF}/GettyImages-827647160.webp`,
  "에머슨 피티팔디": `${HOF}/GettyImages-1189103543.webp`,
  "재키 스튜어트": `${HOF}/GettyImages-1443308803.webp`,
  "요헨 린트": `${HOF}/GettyImages-831631668.webp`,
  "그레이엄 힐": `${HOF}/GettyImages-864209082.webp`,
  "데니 헐미": `${HOF}/GettyImages-1063718326.webp`,
  "잭 브라밤": `${HOF}/GettyImages-3323162.webp`,
  "짐 클라크": `${HOF}/GettyImages-1328924500.webp`,
  "존 서티스": `${HOF}/GettyImages-3072443.webp`,
  "필 힐": `${HOF}/GettyImages-71183243.webp`,
  "마이크 호손": `${HOF}/GettyImages-1068321752.webp`,
  "후안 마누엘 팡지오": `${HOF}/GettyImages-827612408.webp`,
  "알베르토 아스카리": `${HOF}/GettyImages-106501211.webp`,
  "주세페 파리나": `${HOF}/GettyImages-856948472.webp`,
};

/* ── Constructor team car + logo images (2026 CDN — current teams only) ── */
const F1_CDN = "https://media.formula1.com/image/upload";
function legendCarImg(cdnSlug: string) {
  return `${F1_CDN}/c_lfill,w_800,h_500/q_auto:best/d_common:f1:2026:fallback:car:2026fallbackcarleft.webp/v1740000000/common/f1/2026/${cdnSlug}/2026${cdnSlug}carleft.webp`;
}
function legendTeamLogo(cdnSlug: string) {
  return `${F1_CDN}/c_fit,h_128/q_auto/v1740000000/common/f1/2026/${cdnSlug}/2026${cdnSlug}logowhite.webp`;
}

export const CONSTRUCTOR_IMAGES: Record<string, string> = {
  "맥라렌": legendCarImg("mclaren"),
  "레드불": legendCarImg("redbullracing"),
  "메르세데스": legendCarImg("mercedes"),
  "페라리": legendCarImg("ferrari"),
  "윌리엄스": legendCarImg("williams"),
  "르노": legendCarImg("alpine"),
};

export const CONSTRUCTOR_LOGOS: Record<string, string> = {
  "맥라렌": legendTeamLogo("mclaren"),
  "레드불": legendTeamLogo("redbullracing"),
  "메르세데스": legendTeamLogo("mercedes"),
  "페라리": legendTeamLogo("ferrari"),
  "윌리엄스": legendTeamLogo("williams"),
  "르노": legendTeamLogo("alpine"),
};

export interface ConstructorChampion {
  year: number;
  team: string;
  wins: number;
  points: number;
}

export interface AllTimeRecord {
  label: string;
  holder: string;
  value: string;
  period: string;
  size?: "lg" | "md";
  accent?: string;
}

export const ALL_TIME_RECORDS: AllTimeRecord[] = [
  { label: "최다 우승", holder: "루이스 해밀턴", value: "105승", period: "2007–2025", size: "lg", accent: "#27F4D2" },
  { label: "최다 챔피언십", holder: "미하엘 슈마허 / 루이스 해밀턴", value: "7회", period: "1994–2004 / 2008–2020", size: "lg", accent: "#E10600" },
  { label: "최다 폴 포지션", holder: "루이스 해밀턴", value: "104회", period: "2007–2025" },
  { label: "최다 포디움", holder: "루이스 해밀턴", value: "202회", period: "2007–2025" },
  { label: "최다 시즌 우승", holder: "막스 베르스타펜", value: "19승", period: "2023", size: "md", accent: "#3671C6" },
  { label: "최다 출전", holder: "페르난도 알론소", value: "412회", period: "2001–2025" },
  { label: "최다 연속 우승", holder: "세바스티안 베텔", value: "9연승", period: "2013" },
  { label: "최다 컨스트럭터 챔피언십", holder: "페라리", value: "16회", period: "1961–2008", size: "md", accent: "#DC0000" },
  { label: "최다 컨스트럭터 우승", holder: "페라리", value: "245승", period: "1950–2025" },
  { label: "최연소 챔피언", holder: "세바스티안 베텔", value: "23세 134일", period: "2010" },
];

export const DRIVER_CHAMPIONS: Champion[] = [
  { year: 2025, driver: "란도 노리스", team: "맥라렌", wins: 7, points: 423 },
  { year: 2024, driver: "막스 베르스타펜", team: "레드불", wins: 9, points: 437 },
  { year: 2023, driver: "막스 베르스타펜", team: "레드불", wins: 19, points: 575 },
  { year: 2022, driver: "막스 베르스타펜", team: "레드불", wins: 15, points: 454 },
  { year: 2021, driver: "막스 베르스타펜", team: "레드불", wins: 10, points: 395.5 },
  { year: 2020, driver: "루이스 해밀턴", team: "메르세데스", wins: 11, points: 347 },
  { year: 2019, driver: "루이스 해밀턴", team: "메르세데스", wins: 11, points: 413 },
  { year: 2018, driver: "루이스 해밀턴", team: "메르세데스", wins: 11, points: 408 },
  { year: 2017, driver: "루이스 해밀턴", team: "메르세데스", wins: 9, points: 363 },
  { year: 2016, driver: "니코 로즈버그", team: "메르세데스", wins: 9, points: 385 },
  { year: 2015, driver: "루이스 해밀턴", team: "메르세데스", wins: 10, points: 381 },
  { year: 2014, driver: "루이스 해밀턴", team: "메르세데스", wins: 11, points: 384 },
  { year: 2013, driver: "세바스티안 베텔", team: "레드불", wins: 13, points: 397 },
  { year: 2012, driver: "세바스티안 베텔", team: "레드불", wins: 5, points: 281 },
  { year: 2011, driver: "세바스티안 베텔", team: "레드불", wins: 11, points: 392 },
  { year: 2010, driver: "세바스티안 베텔", team: "레드불", wins: 5, points: 256 },
  { year: 2009, driver: "젠슨 버튼", team: "브론 GP", wins: 6, points: 95 },
  { year: 2008, driver: "루이스 해밀턴", team: "맥라렌", wins: 5, points: 98 },
  { year: 2007, driver: "키미 라이코넨", team: "페라리", wins: 6, points: 110 },
  { year: 2006, driver: "페르난도 알론소", team: "르노", wins: 7, points: 134 },
  { year: 2005, driver: "페르난도 알론소", team: "르노", wins: 7, points: 133 },
  { year: 2004, driver: "미하엘 슈마허", team: "페라리", wins: 13, points: 148 },
  { year: 2003, driver: "미하엘 슈마허", team: "페라리", wins: 6, points: 93 },
  { year: 2002, driver: "미하엘 슈마허", team: "페라리", wins: 11, points: 144 },
  { year: 2001, driver: "미하엘 슈마허", team: "페라리", wins: 9, points: 123 },
  { year: 2000, driver: "미하엘 슈마허", team: "페라리", wins: 9, points: 108 },
  { year: 1999, driver: "미카 하키넨", team: "맥라렌", wins: 5, points: 76 },
  { year: 1998, driver: "미카 하키넨", team: "맥라렌", wins: 8, points: 100 },
  { year: 1997, driver: "자크 빌뇌브", team: "윌리엄스", wins: 7, points: 81 },
  { year: 1996, driver: "데이먼 힐", team: "윌리엄스", wins: 8, points: 97 },
  { year: 1995, driver: "미하엘 슈마허", team: "베네통", wins: 9, points: 102 },
  { year: 1994, driver: "미하엘 슈마허", team: "베네통", wins: 8, points: 92 },
  { year: 1993, driver: "알랭 프로스트", team: "윌리엄스", wins: 7, points: 99 },
  { year: 1992, driver: "나이젤 맨셀", team: "윌리엄스", wins: 9, points: 108 },
  { year: 1991, driver: "아일톤 세나", team: "맥라렌", wins: 7, points: 96 },
  { year: 1990, driver: "아일톤 세나", team: "맥라렌", wins: 6, points: 78 },
  { year: 1989, driver: "알랭 프로스트", team: "맥라렌", wins: 4, points: 76 },
  { year: 1988, driver: "아일톤 세나", team: "맥라렌", wins: 8, points: 90 },
  { year: 1987, driver: "넬슨 피케", team: "윌리엄스", wins: 3, points: 73 },
  { year: 1986, driver: "알랭 프로스트", team: "맥라렌", wins: 4, points: 72 },
  { year: 1985, driver: "알랭 프로스트", team: "맥라렌", wins: 5, points: 73 },
  { year: 1984, driver: "니키 라우다", team: "맥라렌", wins: 5, points: 72 },
  { year: 1983, driver: "넬슨 피케", team: "브라밤", wins: 3, points: 59 },
  { year: 1982, driver: "케케 로즈버그", team: "윌리엄스", wins: 1, points: 44 },
  { year: 1981, driver: "넬슨 피케", team: "브라밤", wins: 3, points: 50 },
  { year: 1980, driver: "앨런 존스", team: "윌리엄스", wins: 5, points: 67 },
  { year: 1979, driver: "조디 셱터", team: "페라리", wins: 3, points: 51 },
  { year: 1978, driver: "마리오 안드레티", team: "로터스", wins: 6, points: 64 },
  { year: 1977, driver: "니키 라우다", team: "페라리", wins: 3, points: 72 },
  { year: 1976, driver: "제임스 헌트", team: "맥라렌", wins: 6, points: 69 },
  { year: 1975, driver: "니키 라우다", team: "페라리", wins: 5, points: 64.5 },
  { year: 1974, driver: "에머슨 피티팔디", team: "맥라렌", wins: 3, points: 55 },
  { year: 1973, driver: "재키 스튜어트", team: "티렐", wins: 5, points: 71 },
  { year: 1972, driver: "에머슨 피티팔디", team: "로터스", wins: 5, points: 61 },
  { year: 1971, driver: "재키 스튜어트", team: "티렐", wins: 6, points: 62 },
  { year: 1970, driver: "요헨 린트", team: "로터스", wins: 5, points: 45 },
  { year: 1969, driver: "재키 스튜어트", team: "마트라", wins: 6, points: 63 },
  { year: 1968, driver: "그레이엄 힐", team: "로터스", wins: 3, points: 48 },
  { year: 1967, driver: "데니 헐미", team: "브라밤", wins: 2, points: 51 },
  { year: 1966, driver: "잭 브라밤", team: "브라밤", wins: 4, points: 42 },
  { year: 1965, driver: "짐 클라크", team: "로터스", wins: 6, points: 54 },
  { year: 1964, driver: "존 서티스", team: "페라리", wins: 2, points: 40 },
  { year: 1963, driver: "짐 클라크", team: "로터스", wins: 7, points: 54 },
  { year: 1962, driver: "그레이엄 힐", team: "BRM", wins: 4, points: 42 },
  { year: 1961, driver: "필 힐", team: "페라리", wins: 2, points: 34 },
  { year: 1960, driver: "잭 브라밤", team: "쿠퍼", wins: 5, points: 43 },
  { year: 1959, driver: "잭 브라밤", team: "쿠퍼", wins: 2, points: 31 },
  { year: 1958, driver: "마이크 호손", team: "페라리", wins: 1, points: 42 },
  { year: 1957, driver: "후안 마누엘 팡지오", team: "마세라티", wins: 4, points: 40 },
  { year: 1956, driver: "후안 마누엘 팡지오", team: "페라리", wins: 3, points: 30 },
  { year: 1955, driver: "후안 마누엘 팡지오", team: "메르세데스", wins: 4, points: 40 },
  { year: 1954, driver: "후안 마누엘 팡지오", team: "마세라티 / 메르세데스", wins: 6, points: 42 },
  { year: 1953, driver: "알베르토 아스카리", team: "페라리", wins: 5, points: 34.5 },
  { year: 1952, driver: "알베르토 아스카리", team: "페라리", wins: 6, points: 36 },
  { year: 1951, driver: "후안 마누엘 팡지오", team: "알파 로메오", wins: 3, points: 31 },
  { year: 1950, driver: "주세페 파리나", team: "알파 로메오", wins: 3, points: 30 },
];

export const CONSTRUCTOR_CHAMPIONS: ConstructorChampion[] = [
  { year: 2025, team: "맥라렌", wins: 14, points: 833 },
  { year: 2024, team: "맥라렌", wins: 6, points: 666 },
  { year: 2023, team: "레드불", wins: 21, points: 860 },
  { year: 2022, team: "레드불", wins: 17, points: 759 },
  { year: 2021, team: "메르세데스", wins: 9, points: 613.5 },
  { year: 2020, team: "메르세데스", wins: 13, points: 573 },
  { year: 2019, team: "메르세데스", wins: 15, points: 739 },
  { year: 2018, team: "메르세데스", wins: 11, points: 655 },
  { year: 2017, team: "메르세데스", wins: 12, points: 668 },
  { year: 2016, team: "메르세데스", wins: 19, points: 765 },
  { year: 2015, team: "메르세데스", wins: 16, points: 703 },
  { year: 2014, team: "메르세데스", wins: 16, points: 701 },
  { year: 2013, team: "레드불", wins: 13, points: 596 },
  { year: 2012, team: "레드불", wins: 7, points: 460 },
  { year: 2011, team: "레드불", wins: 12, points: 650 },
  { year: 2010, team: "레드불", wins: 9, points: 498 },
  { year: 2009, team: "브론 GP", wins: 8, points: 172 },
  { year: 2008, team: "페라리", wins: 8, points: 172 },
  { year: 2007, team: "페라리", wins: 9, points: 204 },
  { year: 2006, team: "르노", wins: 8, points: 206 },
  { year: 2005, team: "르노", wins: 8, points: 191 },
  { year: 2004, team: "페라리", wins: 15, points: 262 },
  { year: 2003, team: "페라리", wins: 8, points: 158 },
  { year: 2002, team: "페라리", wins: 15, points: 221 },
  { year: 2001, team: "페라리", wins: 9, points: 179 },
  { year: 2000, team: "페라리", wins: 10, points: 170 },
  { year: 1999, team: "페라리", wins: 6, points: 128 },
  { year: 1998, team: "맥라렌", wins: 9, points: 156 },
  { year: 1997, team: "윌리엄스", wins: 8, points: 123 },
  { year: 1996, team: "윌리엄스", wins: 12, points: 175 },
  { year: 1995, team: "베네통", wins: 11, points: 137 },
  { year: 1994, team: "윌리엄스", wins: 7, points: 118 },
  { year: 1993, team: "윌리엄스", wins: 10, points: 168 },
  { year: 1992, team: "윌리엄스", wins: 10, points: 164 },
  { year: 1991, team: "맥라렌", wins: 8, points: 139 },
  { year: 1990, team: "맥라렌", wins: 6, points: 121 },
  { year: 1989, team: "맥라렌", wins: 10, points: 141 },
  { year: 1988, team: "맥라렌", wins: 15, points: 199 },
  { year: 1987, team: "윌리엄스", wins: 9, points: 137 },
  { year: 1986, team: "윌리엄스", wins: 9, points: 141 },
  { year: 1985, team: "맥라렌", wins: 6, points: 90 },
  { year: 1984, team: "맥라렌", wins: 12, points: 143.5 },
  { year: 1983, team: "페라리", wins: 4, points: 89 },
  { year: 1982, team: "페라리", wins: 3, points: 74 },
  { year: 1981, team: "윌리엄스", wins: 4, points: 95 },
  { year: 1980, team: "윌리엄스", wins: 6, points: 120 },
  { year: 1979, team: "페라리", wins: 6, points: 113 },
  { year: 1978, team: "로터스", wins: 8, points: 86 },
  { year: 1977, team: "페라리", wins: 4, points: 95 },
  { year: 1976, team: "페라리", wins: 6, points: 83 },
  { year: 1975, team: "페라리", wins: 6, points: 72.5 },
  { year: 1974, team: "맥라렌", wins: 4, points: 73 },
  { year: 1973, team: "로터스", wins: 7, points: 92 },
  { year: 1972, team: "로터스", wins: 5, points: 61 },
  { year: 1971, team: "티렐", wins: 7, points: 73 },
  { year: 1970, team: "로터스", wins: 6, points: 59 },
  { year: 1969, team: "마트라", wins: 6, points: 66 },
  { year: 1968, team: "로터스", wins: 5, points: 62 },
  { year: 1967, team: "브라밤", wins: 4, points: 63 },
  { year: 1966, team: "브라밤", wins: 3, points: 42 },
  { year: 1965, team: "로터스", wins: 6, points: 54 },
  { year: 1964, team: "페라리", wins: 3, points: 45 },
  { year: 1963, team: "로터스", wins: 7, points: 54 },
  { year: 1962, team: "BRM", wins: 4, points: 42 },
  { year: 1961, team: "페라리", wins: 5, points: 40 },
  { year: 1960, team: "쿠퍼", wins: 6, points: 48 },
  { year: 1959, team: "쿠퍼", wins: 5, points: 40 },
  { year: 1958, team: "배니월", wins: 6, points: 48 },
];
