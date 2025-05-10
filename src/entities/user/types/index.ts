export interface User {
  token: string;
  username: string;
  id: number;
  isAdmin: number;
  email: string;
}

export interface Requests {
  id: number;
  username: string;
  eventsName: string;
  count: number;
  date: string;
  email: string;
}

export interface Reviews {
  id: number;
  typeOrganization: string;
  sex: string;
  age: number;
  overview: string;
  review: string;
  region: string;
}
