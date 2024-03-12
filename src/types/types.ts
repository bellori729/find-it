export interface GetDetailData {
  atcId: string;
  csteSteNm: string;
  depPlace: string;
  fdFilePathImg: string;
  fdHor: string;
  fdPlace: string;
  fdPrdtNm: string;
  fdSn: string;
  fdYmd: string;
  fndKeepOrgnSeNm: string;
  orgId: string;
  orgNm: string;
  prdtClNm: string;
  tel: string;
  uniq: string;
}

export interface LostDetailData {
  atcId: string;
  lstFilePathImg: string;
  uniq: string;
  lstLctNm: string;
  lstPlace: string;
  lstPlaceSeNm: string;
  lstPrdtNm: string;
  lstSbjt: string;
  lstSteNm: string;
  lstYmd: string;
  orgId: string;
  orgNm: string;
  prdtClNm: string;
  tel: string;
}

export interface DetailData {
  id: string;
  item_name: string;
  image: string;
  place: string;
  date: string;
  item_type: string;
  description: string;
  storage: string;
  contact: string;
}

export type JsonValue =
  | string
  | number
  | boolean
  | JsonArray
  | JsonObject
  | null;

export interface JsonArray extends Array<JsonValue> {}

export interface JsonObject {
  [key: string]: JsonValue;
}
