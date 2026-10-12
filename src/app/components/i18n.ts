// Три мови сайту: no (норвезька, основна), en (англійська), ua (українська).
export type Lang = "no" | "en" | "ua";

export const toLang = (l: string): Lang => (l === "ua" ? "ua" : l === "en" ? "en" : "no");

// tr(lang, "norsk", "english", "українська")
export const tr = <T,>(lang: string, no: T, en: T, ua: T): T => (lang === "ua" ? ua : lang === "en" ? en : no);

export const locale = (lang: string) => tr(lang, "nb-NO", "en-GB", "uk-UA");
