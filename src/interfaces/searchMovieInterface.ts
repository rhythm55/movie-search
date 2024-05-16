export interface SearchMovieDataInterface {
  searchText: string;
  searchResultMovie: {
    [key: number]: SearchResultMovieInterface[];
  };
  totalResults: number;
  isLoading: boolean;
  error: string;
}

export interface SearchResultMovieInterface {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
}

export interface MovieDetailsInterface extends SearchResultMovieInterface {
  Released: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  isLoading: boolean;
  Error?: string;
}
