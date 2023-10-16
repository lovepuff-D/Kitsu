export interface AnimeDetails {
  id:         string;
  details:    Details;
  categories: Category[];
}

export interface Category {
  id:         string;
  type:       Type;
  links:      Links;
  attributes: Attributes;
}

export interface Attributes {
  slug:  string;
  title: string;
}

export interface Links {
  self: string;
}

export enum Type {
  Categories = "categories",
}

export interface Details {
  createdAt:           Date;
  updatedAt:           Date;
  slug:                string;
  synopsis:            string;
  description:         string;
  coverImageTopOffset: number;
  titles:              Titles;
  canonicalTitle:      string;
  abbreviatedTitles:   string[];
  averageRating:       string;
  ratingFrequencies:   { [key: string]: string };
  userCount:           number;
  favoritesCount:      number;
  startDate:           Date;
  endDate:             Date;
  nextRelease:         null;
  popularityRank:      number;
  ratingRank:          number;
  ageRating:           string;
  ageRatingGuide:      string;
  subtype:             string;
  status:              string;
  tba:                 null;
  posterImage:         PosterImage;
  coverImage:          CoverImage;
  episodeCount:        number;
  episodeLength:       number;
  totalLength:         number;
  youtubeVideoId:      string;
  showType:            string;
  nsfw:                boolean;
}

export interface CoverImage {
  tiny:     string;
  large:    string;
  small:    string;
  original: string;
  meta:     Meta;
}

export interface Meta {
  dimensions: Dimensions;
}

export interface Dimensions {
  tiny:    Large;
  large:   Large;
  small:   Large;
  medium?: Large;
}

export interface Large {
  width:  number;
  height: number;
}

export interface PosterImage {
  tiny:     string;
  large:    string;
  small:    string;
  medium:   string;
  original: string;
  meta:     Meta;
}

export interface Titles {
  en:    string;
  en_jp: string;
  en_us: string;
  ja_jp: string;
}