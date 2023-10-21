export interface Episodes {
  createdAt:      Date;
  updatedAt:      Date;
  synopsis:       string;
  description:    string;
  titles:         Titles;
  canonicalTitle: string;
  seasonNumber:   number;
  number:         number;
  relativeNumber: number;
  airdate:        Date;
  length:         number;
  thumbnail:      Thumbnail;
  id:             string;
}

export interface Thumbnail {
  original: string;
  meta:     Meta;
}

export interface Meta {
  dimensions: Dimensions;
}

export interface Dimensions {
}

export interface Titles {
  en_jp: string;
  en_us: string;
  ja_jp: string;
}