export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  imageUrl: string;
  category: string;
  tickets: {
    available: number;
    total: number;
  };
  organizer: {
    name: string;
    contact: string;
  };
}
