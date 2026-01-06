
import { Star, ShieldCheck, Zap, Heart, Sparkles, Battery, Lightbulb, Truck, Clock, RefreshCw } from 'lucide-react';
import React from 'react';
import { Review, FAQItem, Reel } from './types';

export const COLORS = {
  primary: '#6B21A8', // Deep Purple
  accent: '#FCE7F3', // Soft Pink
  trust: '#059669', // Green
  yellow: '#FEF3C7', // Light Yellow
};

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Priya M. - Mumbai',
    rating: 5,
    date: '2 days ago',
    text: 'Literally a life saver! I used to go to the salon every week for threading. This is painless and so easy to use.',
    verified: true,
    avatar: 'images/review1.jpg'
  },
  {
    id: '2',
    author: 'Anjali S. - Delhi',
    rating: 5,
    date: '1 week ago',
    text: 'The built-in LED light is genius. I can see even the tiny hairs. Battery lasts a long time too.',
    verified: true,
    avatar: 'images/review2.png'
  },
  {
    id: '3',
    author: 'Sneha K. - Bangalore',
    rating: 5,
    date: '3 weeks ago',
    text: 'Very compact and looks like a lipstick. Perfect for carrying in my handbag.',
    verified: true,
    avatar: 'images/review3.png'
  },
  {
    id: '4',
    author: 'Mehak G. - Chandigarh',
    rating: 5,
    date: '1 day ago',
    text: 'Best purchase of the year. The dual heads are perfect for shaping my eyebrows and removing upper lip hair.',
    verified: true,
    // Replaced the man in leather jacket with a female avatar
    avatar: 'images/review4.png'
  },
  {
    id: '5',
    author: 'Ritu V. - Pune',
    rating: 5,
    date: '5 days ago',
    text: 'I was skeptical but it really works. No more salon appointments for me. Highly recommend the Duo Pack!',
    verified: true,
    avatar: 'images/review5.png'
  },
  {
    id: '6',
    author: 'Kavita L. - Ahmedabad',
    rating: 5,
    date: '10 days ago',
    text: 'The battery life is amazing. I have used it for two weeks and haven’t charged it once.',
    verified: true,
    avatar: 'images/review6.png'
  },
  {
    id: '7',
    author: 'Ishani R. - Hyderabad',
    rating: 4,
    date: '2 weeks ago',
    text: 'Great product. Very stylish and does the job perfectly. Fast delivery too.',
    verified: true,
    avatar: 'images/review7.png'
  },
  {
    id: '8',
    author: 'Pooja B. - Chennai',
    rating: 5,
    date: '3 days ago',
    text: 'My skin is very sensitive and this caused zero irritation. Very happy with the results.',
    verified: true,
    avatar: 'images/review8.png'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Is it really painless?",
    answer: "Yes! Unlike threading or waxing, the Pop & Pout trimmer uses precision micro-blades that cut hair without pulling or touching the skin directly, making it 100% painless."
  },
  {
    question: "How long does the battery last?",
    answer: "A single full charge via USB provides up to 45 minutes of continuous use, which typically lasts for 2-3 months of regular touch-ups."
  },
  {
    question: "Can I use it on other parts of my face?",
    answer: "Absolutely. Our design is safe for eyebrows, upper lips, chin, and cheeks."
  },
  {
    question: "Is it waterproof?",
    answer: "The trimmer heads are detachable and washable. However, the main body (the motor part) should not be submerged in water."
  }
];

export const REELS: Reel[] = [
  {
    id: 'r1',
    thumbnail: 'images/reel1icon.jpg',
    videoUrl: 'videos/Reel1.mp4',
    title: 'Monika from Delhi'
  },
  {
    id: 'r2',
    thumbnail: 'images/reel2icon.jpg',
    videoUrl: 'videos/reel2.mp4',
    title: 'Priya from Mumbai'
  },
  {
    id: 'r3',
    thumbnail: 'images/reel3icon.jpg',
    videoUrl: 'videos/reel3.mp4',
    title: 'Ananya from Pune'
  }
];

export const FEATURES = [
  { 
    title: 'Flawless Lighting', 
    desc: 'The built-in LED assist ensures you never miss a single hair, even in dimly lit rooms.', 
    img: 'images/model close eyebrow indian.png',
    icon: <Lightbulb className="w-7 h-7" />
  },
  { 
    title: 'Painless Precision', 
    desc: 'Say goodbye to redness and tears. Our precise system offers a gentle glide for sensitive skin.', 
    img: 'images/model closeup eyebrow.png',
    icon: <Heart className="w-7 h-7" />
  },
  { 
    title: 'Compact & Travel Friendly', 
    desc: 'Designed to look like a premium lipstick, it fits perfectly in your clutch for quick touch-ups.', 
    img:  'images/travel.png',
    icon: <Zap className="w-7 h-7" />
  },
  { 
    title: 'USB Rechargeable', 
    desc: 'A single full charge via USB provides up to 45 minutes of continuous use for months of touch-ups.', 
    img: 'images/charging.png',
    icon: <Battery className="w-7 h-7" />
  },
];
