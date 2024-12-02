export interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  wallerAddress: string;
  registrationDate: Date;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  imageUrl: string;
  category: string;
  tickets: {
    available: number;
    total: number ;
  };
  organizer: {
    name: string;
    contact: string;
  };
  status: 'upcoming' | 'ongoing' | 'cancelled' | 'completed';
  registered: Attendee[];
}
