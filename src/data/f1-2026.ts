// ===== 2026 F1 Season Static Data =====

export interface Driver {
  pos: number;
  name: string;
  team: string;
  teamId: string;
  points: number | null;
  imageUrl: string;
}

export interface Constructor {
  pos: number;
  name: string;
  teamId: string;
  points: number | null;
  logoUrl: string;
}

export interface RaceSession {
  session: string;
  time: string; // KST
  isRace?: boolean;
}

export interface Race {
  round: number;
  flag: string;
  country: string;
  gp: string;
  circuit: string;
  city: string;
  date: string; // e.g. "3.8"
  fullDate: string; // e.g. "3월 8일 (일)"
  sessions: RaceSession[];
}

export interface Circuit {
  round: number;
  country: string;
  name: string;
  gp: string;
  fullDate: string;
  lengthKm: string;
  laps: number;
  corners: number;
  lapRecord?: string;
  trackImageUrl?: string;
}

// ===== Team Colors =====
export const TEAM_COLORS: Record<string, string> = {
  mclaren: "#FF8000",
  ferrari: "#DC0000",
  redbull: "#3671C6",
  mercedes: "#27F4D2",
  aston: "#229971",
  alpine: "#FF87BC",
  haas: "#B6BABD",
  rb: "#6692FF",
  williams: "#64C4FF",
  audi: "#C0C0C0",
  cadillac: "#1F3D2C",
};

// ===== F1 2026 CDN Image Base =====
const F1_CDN = "https://media.formula1.com/image/upload";

// Face-cropped circular avatar (Cloudinary auto face detection)
function driverImg(teamSlug: string, code: string) {
  return `${F1_CDN}/c_thumb,g_face,w_200,h_200/q_auto/v1740000000/common/f1/2026/${teamSlug}/${code}/2026${teamSlug}${code}right.webp`;
}

// 2026 team logo (white on transparent)
function teamLogo2026(teamSlug: string) {
  return `${F1_CDN}/c_lfill,w_100/q_auto/v1740000000/common/f1/2026/${teamSlug}/2026${teamSlug}logowhite.webp`;
}

// ===== Drivers =====
export const DRIVERS: Driver[] = [
  { pos: 1, name: "L. 노리스", team: "McLaren", teamId: "mclaren", points: null, imageUrl: driverImg("mclaren", "lannor01") },
  { pos: 2, name: "M. 베르스타펜", team: "Red Bull", teamId: "redbull", points: null, imageUrl: driverImg("redbullracing", "maxver01") },
  { pos: 3, name: "C. 르클레르", team: "Ferrari", teamId: "ferrari", points: null, imageUrl: driverImg("ferrari", "chalec01") },
  { pos: 4, name: "L. 해밀턴", team: "Ferrari", teamId: "ferrari", points: null, imageUrl: driverImg("ferrari", "lewham01") },
  { pos: 5, name: "O. 피아스트리", team: "McLaren", teamId: "mclaren", points: null, imageUrl: driverImg("mclaren", "oscpia01") },
  { pos: 6, name: "G. 러셀", team: "Mercedes", teamId: "mercedes", points: null, imageUrl: driverImg("mercedes", "georus01") },
  { pos: 7, name: "C. 사인츠", team: "Williams", teamId: "williams", points: null, imageUrl: driverImg("williams", "carsai01") },
  { pos: 8, name: "F. 알론소", team: "Aston Martin", teamId: "aston", points: null, imageUrl: driverImg("astonmartin", "feralo01") },
  { pos: 9, name: "I. 하자르", team: "Red Bull", teamId: "redbull", points: null, imageUrl: driverImg("redbullracing", "isahad01") },
  { pos: 10, name: "K. 안토넬리", team: "Mercedes", teamId: "mercedes", points: null, imageUrl: driverImg("mercedes", "andant01") },
  { pos: 11, name: "A. 알본", team: "Williams", teamId: "williams", points: null, imageUrl: driverImg("williams", "alealb01") },
  { pos: 12, name: "P. 가슬리", team: "Alpine", teamId: "alpine", points: null, imageUrl: driverImg("alpine", "piegas01") },
  { pos: 13, name: "L. 로슨", team: "Racing Bulls", teamId: "rb", points: null, imageUrl: driverImg("racingbulls", "lialaw01") },
  { pos: 14, name: "L. 스트롤", team: "Aston Martin", teamId: "aston", points: null, imageUrl: driverImg("astonmartin", "lanstr01") },
  { pos: 15, name: "E. 오콘", team: "Haas", teamId: "haas", points: null, imageUrl: driverImg("haas", "estoco01") },
  { pos: 16, name: "F. 콜라핀토", team: "Alpine", teamId: "alpine", points: null, imageUrl: driverImg("alpine", "fracol01") },
  { pos: 17, name: "O. 베어만", team: "Haas", teamId: "haas", points: null, imageUrl: driverImg("haas", "olibea01") },
  { pos: 18, name: "N. 휠켄베르크", team: "Audi", teamId: "audi", points: null, imageUrl: driverImg("audi", "nichul01") },
  { pos: 19, name: "A. 린드블라드", team: "Racing Bulls", teamId: "rb", points: null, imageUrl: driverImg("racingbulls", "arvlin01") },
  { pos: 20, name: "G. 보르톨레토", team: "Audi", teamId: "audi", points: null, imageUrl: driverImg("audi", "gabbar01") },
  { pos: 21, name: "S. 페레즈", team: "Cadillac", teamId: "cadillac", points: null, imageUrl: driverImg("cadillac", "serper01") },
  { pos: 22, name: "V. 보타스", team: "Cadillac", teamId: "cadillac", points: null, imageUrl: driverImg("cadillac", "valbot01") },
];

// ===== Constructors =====
export const CONSTRUCTORS: Constructor[] = [
  { pos: 1, name: "McLaren", teamId: "mclaren", points: null, logoUrl: teamLogo2026("mclaren") },
  { pos: 2, name: "Ferrari", teamId: "ferrari", points: null, logoUrl: teamLogo2026("ferrari") },
  { pos: 3, name: "Red Bull", teamId: "redbull", points: null, logoUrl: teamLogo2026("redbullracing") },
  { pos: 4, name: "Mercedes", teamId: "mercedes", points: null, logoUrl: teamLogo2026("mercedes") },
  { pos: 5, name: "Aston Martin", teamId: "aston", points: null, logoUrl: teamLogo2026("astonmartin") },
  { pos: 6, name: "Williams", teamId: "williams", points: null, logoUrl: teamLogo2026("williams") },
  { pos: 7, name: "Alpine", teamId: "alpine", points: null, logoUrl: teamLogo2026("alpine") },
  { pos: 8, name: "Racing Bulls", teamId: "rb", points: null, logoUrl: teamLogo2026("racingbulls") },
  { pos: 9, name: "Haas", teamId: "haas", points: null, logoUrl: teamLogo2026("haasf1team") },
  { pos: 10, name: "Audi", teamId: "audi", points: null, logoUrl: teamLogo2026("audi") },
  { pos: 11, name: "Cadillac", teamId: "cadillac", points: null, logoUrl: teamLogo2026("cadillac") },
];

// ===== Race Calendar =====
export const RACES: Race[] = [
  { round: 1, flag: "🇦🇺", country: "호주", gp: "호주 그랑프리", circuit: "Albert Park Circuit", city: "멜버른", date: "3.8", fullDate: "3월 8일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 18:00" }, { session: "프리 프랙티스 2", time: "금 21:00" }, { session: "프리 프랙티스 3", time: "토 18:00" }, { session: "퀄리파잉", time: "토 21:00" }, { session: "레이스", time: "일 21:00", isRace: true },
  ]},
  { round: 2, flag: "🇨🇳", country: "중국", gp: "중국 그랑프리", circuit: "Shanghai International", city: "상하이", date: "3.15", fullDate: "3월 15일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 18:00" }, { session: "프리 프랙티스 2", time: "금 21:00" }, { session: "프리 프랙티스 3", time: "토 18:00" }, { session: "퀄리파잉", time: "토 21:00" }, { session: "레이스", time: "일 21:00", isRace: true },
  ]},
  { round: 3, flag: "🇯🇵", country: "일본", gp: "일본 그랑프리", circuit: "Suzuka Circuit", city: "스즈카", date: "3.29", fullDate: "3월 29일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 18:00" }, { session: "프리 프랙티스 2", time: "금 21:00" }, { session: "프리 프랙티스 3", time: "토 18:00" }, { session: "퀄리파잉", time: "토 21:00" }, { session: "레이스", time: "일 21:00", isRace: true },
  ]},
  { round: 4, flag: "🇧🇭", country: "바레인", gp: "바레인 그랑프리", circuit: "Bahrain International", city: "사키르", date: "4.12", fullDate: "4월 12일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 22:00" }, { session: "프리 프랙티스 2", time: "토 01:00" }, { session: "프리 프랙티스 3", time: "토 22:00" }, { session: "퀄리파잉", time: "일 01:00" }, { session: "레이스", time: "일 24:00", isRace: true },
  ]},
  { round: 5, flag: "🇸🇦", country: "사우디", gp: "사우디아라비아 그랑프리", circuit: "Jeddah Corniche", city: "제다", date: "4.19", fullDate: "4월 19일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 23:00" }, { session: "프리 프랙티스 2", time: "토 02:00" }, { session: "프리 프랙티스 3", time: "토 23:00" }, { session: "퀄리파잉", time: "일 02:00" }, { session: "레이스", time: "일 01:00", isRace: true },
  ]},
  { round: 6, flag: "🇺🇸", country: "마이애미", gp: "마이애미 그랑프리", circuit: "Miami International", city: "마이애미", date: "5.3", fullDate: "5월 3일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "토 02:00" }, { session: "Sprint 예선", time: "토 06:00" }, { session: "Sprint", time: "일 02:00" }, { session: "퀄리파잉", time: "일 06:00" }, { session: "레이스", time: "월 04:00", isRace: true },
  ]},
  { round: 7, flag: "🇨🇦", country: "캐나다", gp: "캐나다 그랑프리", circuit: "Circuit Gilles Villeneuve", city: "몬트리올", date: "5.24", fullDate: "5월 24일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 23:30" }, { session: "프리 프랙티스 2", time: "토 02:30" }, { session: "프리 프랙티스 3", time: "토 22:30" }, { session: "퀄리파잉", time: "일 01:00" }, { session: "레이스", time: "일 24:00", isRace: true },
  ]},
  { round: 8, flag: "🇲🇨", country: "모나코", gp: "모나코 그랑프리", circuit: "Circuit de Monaco", city: "몬테카를로", date: "6.7", fullDate: "6월 7일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 9, flag: "🇪🇸", country: "스페인", gp: "스페인 그랑프리", circuit: "Circuit de Barcelona-Catalunya", city: "바르셀로나", date: "6.14", fullDate: "6월 14일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 10, flag: "🇦🇹", country: "오스트리아", gp: "오스트리아 그랑프리", circuit: "Red Bull Ring", city: "슈필베르크", date: "6.28", fullDate: "6월 28일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 11, flag: "🇬🇧", country: "영국", gp: "영국 그랑프리", circuit: "Silverstone Circuit", city: "실버스톤", date: "7.5", fullDate: "7월 5일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 23:00", isRace: true },
  ]},
  { round: 12, flag: "🇧🇪", country: "벨기에", gp: "벨기에 그랑프리", circuit: "Circuit de Spa-Francorchamps", city: "스파", date: "7.19", fullDate: "7월 19일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 13, flag: "🇭🇺", country: "헝가리", gp: "헝가리 그랑프리", circuit: "Hungaroring", city: "부다페스트", date: "7.26", fullDate: "7월 26일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 14, flag: "🇳🇱", country: "네덜란드", gp: "네덜란드 그랑프리", circuit: "Circuit Zandvoort", city: "잔트부르트", date: "8.23", fullDate: "8월 23일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 15, flag: "🇮🇹", country: "이탈리아", gp: "이탈리아 그랑프리", circuit: "Autodromo di Monza", city: "몬차", date: "9.6", fullDate: "9월 6일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 16, flag: "🇪🇸", country: "마드리드", gp: "마드리드 그랑프리", circuit: "Madrid Street Circuit", city: "마드리드", date: "9.13", fullDate: "9월 13일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 20:00" }, { session: "퀄리파잉", time: "토 23:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
  { round: 17, flag: "🇦🇿", country: "아제르바이잔", gp: "아제르바이잔 그랑프리", circuit: "Baku City Circuit", city: "바쿠", date: "9.26", fullDate: "9월 26일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 19:00" }, { session: "프리 프랙티스 2", time: "금 22:00" }, { session: "프리 프랙티스 3", time: "토 19:00" }, { session: "퀄리파잉", time: "토 22:00" }, { session: "레이스", time: "일 20:00", isRace: true },
  ]},
  { round: 18, flag: "🇸🇬", country: "싱가포르", gp: "싱가포르 그랑프리", circuit: "Marina Bay Street", city: "싱가포르", date: "10.11", fullDate: "10월 11일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 18:30" }, { session: "프리 프랙티스 2", time: "금 22:00" }, { session: "프리 프랙티스 3", time: "토 18:30" }, { session: "퀄리파잉", time: "토 22:00" }, { session: "레이스", time: "일 21:00", isRace: true },
  ]},
  { round: 19, flag: "🇺🇸", country: "미국", gp: "미국 그랑프리", circuit: "COTA", city: "오스틴", date: "10.25", fullDate: "10월 25일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "토 02:00" }, { session: "Sprint 예선", time: "토 06:00" }, { session: "Sprint", time: "일 02:00" }, { session: "퀄리파잉", time: "일 06:00" }, { session: "레이스", time: "월 04:00", isRace: true },
  ]},
  { round: 20, flag: "🇲🇽", country: "멕시코", gp: "멕시코 그랑프리", circuit: "Autodromo Hermanos Rodriguez", city: "멕시코시티", date: "11.1", fullDate: "11월 1일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "토 03:00" }, { session: "프리 프랙티스 2", time: "토 06:30" }, { session: "프리 프랙티스 3", time: "일 03:00" }, { session: "퀄리파잉", time: "일 06:00" }, { session: "레이스", time: "월 05:00", isRace: true },
  ]},
  { round: 21, flag: "🇧🇷", country: "브라질", gp: "브라질 그랑프리", circuit: "Interlagos", city: "상파울루", date: "11.8", fullDate: "11월 8일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "토 01:30" }, { session: "Sprint 예선", time: "토 05:30" }, { session: "Sprint", time: "일 01:00" }, { session: "퀄리파잉", time: "일 05:00" }, { session: "레이스", time: "월 02:00", isRace: true },
  ]},
  { round: 22, flag: "🇺🇸", country: "라스베가스", gp: "라스베가스 그랑프리", circuit: "Las Vegas Strip", city: "라스베가스", date: "11.21", fullDate: "11월 21일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "토 07:00" }, { session: "프리 프랙티스 2", time: "토 10:00" }, { session: "프리 프랙티스 3", time: "일 07:00" }, { session: "퀄리파잉", time: "일 10:00" }, { session: "레이스", time: "월 09:00", isRace: true },
  ]},
  { round: 23, flag: "🇶🇦", country: "카타르", gp: "카타르 그랑프리", circuit: "Lusail International", city: "루사일", date: "11.29", fullDate: "11월 29일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:30" }, { session: "Sprint 예선", time: "토 01:30" }, { session: "Sprint", time: "토 21:00" }, { session: "퀄리파잉", time: "일 01:00" }, { session: "레이스", time: "일 23:00", isRace: true },
  ]},
  { round: 24, flag: "🇦🇪", country: "아부다비", gp: "아부다비 그랑프리", circuit: "Yas Marina Circuit", city: "아부다비", date: "12.6", fullDate: "12월 6일 (일)", sessions: [
    { session: "프리 프랙티스 1", time: "금 21:00" }, { session: "프리 프랙티스 2", time: "금 24:00" }, { session: "프리 프랙티스 3", time: "토 22:00" }, { session: "퀄리파잉", time: "일 01:00" }, { session: "레이스", time: "일 22:00", isRace: true },
  ]},
];

// ===== Circuits =====
export const CIRCUITS: Circuit[] = [
  { round: 1, country: "호주", name: "Albert Park Circuit", gp: "호주 그랑프리", fullDate: "3월 8일 (일)", lengthKm: "5.278", laps: 58, corners: 14, lapRecord: "1:19.813", trackImageUrl: "https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026trackmelbournedetailed.webp" },
  { round: 2, country: "중국", name: "Shanghai International", gp: "중국 그랑프리", fullDate: "3월 15일 (일)", lengthKm: "5.451", laps: 56, corners: 16 },
  { round: 3, country: "일본", name: "Suzuka Circuit", gp: "일본 그랑프리", fullDate: "3월 29일 (일)", lengthKm: "5.807", laps: 53, corners: 18 },
  { round: 4, country: "바레인", name: "Bahrain International", gp: "바레인 그랑프리", fullDate: "4월 12일 (일)", lengthKm: "5.412", laps: 57, corners: 15 },
  { round: 5, country: "사우디아라비아", name: "Jeddah Corniche", gp: "사우디아라비아 그랑프리", fullDate: "4월 19일 (일)", lengthKm: "6.174", laps: 50, corners: 27 },
  { round: 6, country: "마이애미", name: "Miami International", gp: "마이애미 그랑프리", fullDate: "5월 3일 (일)", lengthKm: "5.412", laps: 57, corners: 19 },
  { round: 7, country: "캐나다", name: "Circuit Gilles Villeneuve", gp: "캐나다 그랑프리", fullDate: "5월 24일 (일)", lengthKm: "4.361", laps: 70, corners: 14 },
  { round: 8, country: "모나코", name: "Circuit de Monaco", gp: "모나코 그랑프리", fullDate: "6월 7일 (일)", lengthKm: "3.337", laps: 78, corners: 19 },
  { round: 9, country: "스페인", name: "Circuit de Barcelona-Catalunya", gp: "스페인 그랑프리", fullDate: "6월 14일 (일)", lengthKm: "4.657", laps: 66, corners: 16 },
  { round: 10, country: "오스트리아", name: "Red Bull Ring", gp: "오스트리아 그랑프리", fullDate: "6월 28일 (일)", lengthKm: "4.318", laps: 71, corners: 10 },
  { round: 11, country: "영국", name: "Silverstone Circuit", gp: "영국 그랑프리", fullDate: "7월 5일 (일)", lengthKm: "5.891", laps: 52, corners: 18 },
  { round: 12, country: "벨기에", name: "Spa-Francorchamps", gp: "벨기에 그랑프리", fullDate: "7월 19일 (일)", lengthKm: "7.004", laps: 44, corners: 19 },
  { round: 13, country: "헝가리", name: "Hungaroring", gp: "헝가리 그랑프리", fullDate: "7월 26일 (일)", lengthKm: "4.381", laps: 70, corners: 14 },
  { round: 14, country: "네덜란드", name: "Circuit Zandvoort", gp: "네덜란드 그랑프리", fullDate: "8월 23일 (일)", lengthKm: "4.259", laps: 72, corners: 14 },
  { round: 15, country: "이탈리아", name: "Autodromo di Monza", gp: "이탈리아 그랑프리", fullDate: "9월 6일 (일)", lengthKm: "5.793", laps: 53, corners: 11 },
  { round: 16, country: "마드리드", name: "Madrid Street Circuit", gp: "마드리드 그랑프리", fullDate: "9월 13일 (일)", lengthKm: "5.470", laps: 56, corners: 18 },
  { round: 17, country: "아제르바이잔", name: "Baku City Circuit", gp: "아제르바이잔 그랑프리", fullDate: "9월 26일 (일)", lengthKm: "6.003", laps: 51, corners: 20 },
  { round: 18, country: "싱가포르", name: "Marina Bay Street", gp: "싱가포르 그랑프리", fullDate: "10월 11일 (일)", lengthKm: "4.940", laps: 62, corners: 23 },
  { round: 19, country: "미국", name: "COTA", gp: "미국 그랑프리", fullDate: "10월 25일 (일)", lengthKm: "5.513", laps: 56, corners: 20 },
  { round: 20, country: "멕시코", name: "Autodromo Hermanos Rodriguez", gp: "멕시코 그랑프리", fullDate: "11월 1일 (일)", lengthKm: "4.304", laps: 71, corners: 17 },
  { round: 21, country: "브라질", name: "Interlagos", gp: "브라질 그랑프리", fullDate: "11월 8일 (일)", lengthKm: "4.309", laps: 71, corners: 15 },
  { round: 22, country: "라스베가스", name: "Las Vegas Strip", gp: "라스베가스 그랑프리", fullDate: "11월 21일 (일)", lengthKm: "6.201", laps: 50, corners: 17 },
  { round: 23, country: "카타르", name: "Lusail International", gp: "카타르 그랑프리", fullDate: "11월 29일 (일)", lengthKm: "5.419", laps: 57, corners: 16 },
  { round: 24, country: "아부다비", name: "Yas Marina Circuit", gp: "아부다비 그랑프리", fullDate: "12월 6일 (일)", lengthKm: "5.281", laps: 58, corners: 16 },
];

// ===== Helpers =====
function parseRaceDate(dateStr: string): Date {
  const [month, day] = dateStr.split(".").map(Number);
  return new Date(2026, month - 1, day);
}

export function getNextRace(): Race {
  const now = new Date();
  for (const race of RACES) {
    const cutoff = parseRaceDate(race.date);
    cutoff.setDate(cutoff.getDate() + 1);
    if (now < cutoff) return race;
  }
  return RACES[RACES.length - 1];
}

export function getNextCircuit(): Circuit {
  const nextRace = getNextRace();
  return CIRCUITS.find((c) => c.round === nextRace.round) ?? CIRCUITS[0];
}

export function getDaysUntilRace(): number {
  const raceDate = parseRaceDate(getNextRace().date);
  return Math.ceil((raceDate.getTime() - Date.now()) / 86400000);
}
