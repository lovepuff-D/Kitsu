export interface Names {
  en:    string;
  ja_jp: string;
}

export interface Character {
  createdAt:     Date;
  updatedAt:     Date;
  slug:          string;
  names:         Names;
  canonicalName: string;
  otherNames:    string[];
  name:          string;
  malId:         number;
  description:   string;
  image:         Image;
}

export interface Image {
  tiny:     string;
  large:    string;
  small:    string;
  medium:   string;
  original: string;
  meta:     Meta;
}

export interface Meta {
  dimensions: Dimensions;
}

export interface Dimensions {
  tiny:   Large;
  large:  Large;
  small:  Large;
  medium: Large;
}

export interface Large {
  width:  number;
  height: number;
}