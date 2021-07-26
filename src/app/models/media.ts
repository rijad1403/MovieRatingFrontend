import { MediaType } from './media-type';

export interface Media {
  title: string;
  description: string;
  rating?: Number;
  releaseDate: Date | string;
  coverImage?: string;
  mediaType: MediaType;
  actors: number[];
}
