export interface Artist {
  id: string;
  name: string;
  category: string[];
  languages: string[];
  feeRange: string;
  location: string;
  profileImage: string;
  bio: string;
}

export interface Booking {
  id: string;
  artistId: string;
  eventPlanner: string;
  eventDate: string;
  location: string;
  message: string;
  status: string;
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  managedArtists: string[];
}
