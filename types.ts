
export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Reel {
  id: string;
  thumbnail: string;
  videoUrl: string;
  title: string;
}
