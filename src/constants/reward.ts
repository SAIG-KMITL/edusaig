import { RewardType } from "@/types/reward";

type RewardOptions = {
  id: string;
  label: string;
  count: number;
};

export const rewards: RewardType[] = [
  {
    id: "1",
    name: "Free Coffee",
    description:
      "Enjoy a warm, freshly brewed coffee of your choice from participating cafes. Whether you prefer a classic espresso, a creamy latte, or a rich mocha, this reward lets you savor a comforting coffee experience to start your day off right.",
    thumbnail: "/mockup.jpg",
    type: "Food & Beverage",
    points: 100,
    stock: 50,
    status: "Available",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Movie Ticket",
    description:
      "Get a complimentary movie ticket to see any film of your choice at selected theaters. Escape into a cinematic experience, whether you're in the mood for action, romance, or comedy, and enjoy a night out with friends or family.",
    thumbnail: "/mockup.jpg",
    type: "Entertainment",
    points: 200,
    stock: 30,
    status: "Available",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Gift Card",
    description:
      "Receive a $10 gift card redeemable at various popular retail stores and online shops. Use it to treat yourself to a new item on your wishlist or put it towards a special purchase for a loved one.",
    thumbnail: "/mockup.jpg",
    type: "Gift",
    points: 300,
    stock: 20,
    status: "Available",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-20",
  },
  {
    id: "4",
    name: "Spa Day Pass",
    description:
      "Indulge in a day of relaxation and rejuvenation with a premium spa day pass. Enjoy access to soothing treatments like massages, facials, and saunas, and let go of all your stress for a few blissful hours.",
    thumbnail: "/mockup.jpg",
    type: "Wellness",
    points: 500,
    stock: 15,
    status: "Limited",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-10",
  },
  {
    id: "5",
    name: "Dinner for Two",
    description:
      "Treat yourself and a guest to a memorable dining experience at a fine restaurant, complete with an exquisite menu and ambiance. Enjoy a night out savoring gourmet dishes and quality time with someone special.",
    thumbnail: "/mockup.jpg",
    type: "Food & Beverage",
    points: 600,
    stock: 10,
    status: "Available",
    createdAt: "2024-02-15",
    updatedAt: "2024-02-25",
  },
  {
    id: "6",
    name: "Fitness Class",
    description:
      "Join a high-energy fitness class to boost your health and wellness. From yoga and Pilates to strength training and cardio, this reward helps you stay active and motivated on your fitness journey.",
    thumbnail: "/mockup.jpg",
    type: "Wellness",
    points: 150,
    stock: 25,
    status: "Available",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-10",
  },
  {
    id: "7",
    name: "Concert Tickets",
    description:
      "Enjoy a night of live music with two concert tickets for you and a friend. Experience the thrill of seeing your favorite artist or band perform live and make lasting memories together.",
    thumbnail: "/mockup.jpg",
    type: "Entertainment",
    points: 700,
    stock: 5,
    status: "Limited",
    createdAt: "2024-03-05",
    updatedAt: "2024-03-15",
  },
  {
    id: "8",
    name: "Travel Voucher",
    description:
      "Redeem a $50 travel voucher and use it to cover expenses on your next getaway. Whether you’re looking to explore a new city, enjoy a staycation, or take a road trip, this reward makes traveling more affordable.",
    thumbnail: "/mockup.jpg",
    type: "Travel",
    points: 800,
    stock: 8,
    status: "Available",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-30",
  },
  {
    id: "9",
    name: "Online Course",
    description:
      "Get exclusive access to an online course in a subject of your choice. Expand your knowledge or pick up a new skill, from creative writing to programming or marketing, with professional instruction and support.",
    thumbnail: "/mockup.jpg",
    type: "Education",
    points: 350,
    stock: 12,
    status: "Available",
    createdAt: "2024-04-01",
    updatedAt: "2024-04-10",
  },
  {
    id: "10",
    name: "Charity Donation",
    description:
      "Make a meaningful contribution by donating $5 to a charity of your choice. Support causes you care about, from animal welfare to environmental protection, and help make a positive impact in the world.",
    thumbnail: "/mockup.jpg",
    type: "Charity",
    points: 100,
    stock: 100,
    status: "Available",
    createdAt: "2024-04-15",
    updatedAt: "2024-04-20",
  },
  {
    id: "11",
    name: "Gourmet Chocolate Box",
    description: "Indulge in a selection of premium gourmet chocolates, handpicked and crafted by top chocolatiers. Perfect for a sweet treat or as a gift for someone special.",
    thumbnail: "/mockup.jpg",
    type: "Food & Beverage",
    points: 150,
    stock: 40,
    status: "Available",
    createdAt: "2024-05-01",
    updatedAt: "2024-05-10"
  },
  {
    id: "12",
    name: "E-Book Collection",
    description: "Unlock access to a collection of popular e-books across genres. From thrilling mysteries to insightful self-help, dive into a world of stories and knowledge.",
    thumbnail: "/mockup.jpg",
    type: "Education",
    points: 250,
    stock: 60,
    status: "Available",
    createdAt: "2024-05-15",
    updatedAt: "2024-05-25"
  },
  {
    id: "13",
    name: "Virtual Fitness Class",
    description: "Join a virtual fitness class with expert instructors, designed to fit any schedule. Enjoy options from yoga to HIIT to stay active from home.",
    thumbnail: "/mockup.jpg",
    type: "Wellness",
    points: 180,
    stock: 50,
    status: "Available",
    createdAt: "2024-06-01",
    updatedAt: "2024-06-10"
  },
  {
    id: "14",
    name: "Music Streaming Subscription",
    description: "Enjoy unlimited music streaming for one month with access to millions of songs, playlists, and podcasts. Perfect for music lovers who want to explore new sounds.",
    thumbnail: "/mockup.jpg",
    type: "Entertainment",
    points: 200,
    stock: 25,
    status: "Available",
    createdAt: "2024-06-15",
    updatedAt: "2024-06-20"
  },
  {
    id: "15",
    name: "Cooking Class Voucher",
    description: "Take a virtual or in-person cooking class taught by a professional chef. Learn new recipes, techniques, and flavors from the comfort of your kitchen.",
    thumbnail: "/mockup.jpg",
    type: "Education",
    points: 300,
    stock: 10,
    status: "Limited",
    createdAt: "2024-07-01",
    updatedAt: "2024-07-10"
  },
  {
    id: "16",
    name: "Personalized Water Bottle",
    description: "Stay hydrated with a high-quality, personalized water bottle. Choose from a variety of colors and add your name or initials for a custom look.",
    thumbnail: "/mockup.jpg",
    type: "Merchandise",
    points: 120,
    stock: 80,
    status: "Available",
    createdAt: "2024-07-05",
    updatedAt: "2024-07-15"
  },
  {
    id: "17",
    name: "Streaming Service Subscription",
    description: "Enjoy one month of access to popular streaming services, offering movies, shows, and exclusive content for binge-watching enthusiasts.",
    thumbnail: "/mockup.jpg",
    type: "Entertainment",
    points: 250,
    stock: 20,
    status: "Available",
    createdAt: "2024-08-01",
    updatedAt: "2024-08-10"
  },
  {
    id: "18",
    name: "Customized Notebook",
    description: "Receive a beautifully crafted notebook with your chosen cover design, perfect for journaling, taking notes, or sketching out your next big idea.",
    thumbnail: "/mockup.jpg",
    type: "Merchandise",
    points: 90,
    stock: 100,
    status: "Available",
    createdAt: "2024-08-20",
    updatedAt: "2024-08-30"
  },
  {
    id: "19",
    name: "Language Learning Subscription",
    description: "Get three months of premium access to a language-learning platform. Start speaking a new language with lessons, activities, and practice sessions.",
    thumbnail: "/mockup.jpg",
    type: "Education",
    points: 400,
    stock: 30,
    status: "Available",
    createdAt: "2024-09-01",
    updatedAt: "2024-09-10"
  },
  {
    id: "20",
    name: "Eco-Friendly Tote Bag",
    description: "Carry your essentials in style with this eco-friendly, reusable tote bag. Made from sustainable materials, it's perfect for everyday use or shopping trips.",
    thumbnail: "/mockup.jpg",
    type: "Merchandise",
    points: 75,
    stock: 120,
    status: "Available",
    createdAt: "2024-09-15",
    updatedAt: "2024-09-25"
  }
];

export const rewardOptions: RewardOptions[] = [
  {
    id: "badge",
    label: "Badge",
    count: 10,
  },
  {
    id: "certificate",
    label: "Certificate",
    count: 1,
  },
  {
    id: "item",
    label: "Item",
    count: 1,
  },
];

