export interface Filters {
  page:
    | 'main'
    | 'about-museum'
    | 'etnozoo'
    | 'excursions'
    | 'events'
    | 'phone-number'
    | 'news'
    | 'profile'
    | 'path-to-museum';
}

export interface ImagesProps {
  id: number;
  name: string;
  name_2?: string;
  url: string;
}
