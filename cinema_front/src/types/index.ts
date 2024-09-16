export interface IUser {
  username: string;
  email: string;
  password: string;
  password2: string;
}
export interface IRoom {
  id: number;
  name: string;
  seats_row: number;
  seats_column: number;
  schedules: IScheduledMovie[];
}

export interface IMovie {
  id: number;
  title: string;
  duration: number;
  poster_url: string;
}

interface ISeat {
  row: number;
  column: number;
  available: boolean;
}
export interface IScheduledMovie {
  id: number;
  title: string;
  showtime: string;
  movie: IMovie;
  status: string;
  seats: ISeat[];
}
