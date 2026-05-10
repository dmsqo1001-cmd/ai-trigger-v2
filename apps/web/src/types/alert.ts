export type Grade = "S" | "A" | "B" | "C" | "F";

export type Alert = {
  id: string;
  ticker: string;
  price: string;
  floatShares: string;
  watchlistReasons: string[];
  latestNewsTitle: string;
  newsType: string;
  newsGrade: Grade;
  secRiskForm: string;
  secRiskGrade: Grade;
  shortSqueezeGrade: Grade;
  aiOneLine: string;
  createdAt: string;
  channel: string;
};
