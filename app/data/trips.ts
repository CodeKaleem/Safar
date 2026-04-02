export interface Hotel {
  id: string;
  name: string;
  desc: string;
  img: string;
}

export interface Trip {
  id: string;
  title: string;
  days: string;
  budget: string;
  desc: string;
  type: "national" | "abroad";
  gallery: string[];
  hotels: Hotel[];
}

export const TRIPS: Trip[] = [
  {
    id: "skardu",
    title: "Islamabad to Skardu",
    days: "7 Days",
    budget: "Rs. 150,000",
    desc: "Journey through the majestic Karakoram Highway to the heart of Gilgit-Baltistan.",
    type: "national",
    gallery: [
      "https://images.unsplash.com/photo-1588665793086-44473e65ad0c?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620822606560-6ddbc6002476?w=600&auto=format&fit=crop"
    ],
    hotels: [
      { id: "h1", name: "Shangrila Resort Skardu", desc: "A luxury resort built around a serene heart-shaped lake.", img: "https://images.unsplash.com/photo-1542314831-c6a4d142104d?w=400&auto=format&fit=crop" },
      { id: "h2", name: "Serena Shigar Fort", desc: "Experience royal living in a beautifully restored 17th-century fort.", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: "naran",
    title: "Islamabad to Naran",
    days: "5 Days",
    budget: "Rs. 80,000",
    desc: "Explore the lush green valleys of Kaghan and the crystal clear waters of Lake Saif-ul-Malook.",
    type: "national",
    gallery: [
      "https://images.unsplash.com/photo-1600109724128-d8f9def75eb4?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583093201476-85750fed7105?w=600&auto=format&fit=crop"
    ],
    hotels: [
      { id: "h3", name: "Pine Park Edge Resort", desc: "Surrounded by dense pine forests overlooking the river.", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&auto=format&fit=crop" },
      { id: "h4", name: "Swiss Wood Cottages", desc: "Cozy, aesthetic wooden cabins offering premium comfort.", img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: "northern",
    title: "Karachi to Northern Pakistan",
    days: "10 Days",
    budget: "Rs. 200,000",
    desc: "A complete cross-country expedition from the shores of the Arabian Sea to the roof of the world.",
    type: "national",
    gallery: [
      "https://images.unsplash.com/photo-1627885061448-b4dd42525c34?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1655209355447-97d39ca1a346?w=600&auto=format&fit=crop"
    ],
    hotels: [
      { id: "h5", name: "Serena Hotel Islamabad", desc: "A perfect luxury transit stopover blending modern and cultural architecture.", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&auto=format&fit=crop" },
      { id: "h6", name: "Fairmont Hunza View", desc: "Wake up to majestic views of Rakaposhi right from your balcony.", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: "swiss-alps",
    title: "Zurich to Swiss Alps",
    days: "8 Days",
    budget: "$3,500",
    desc: "Experience world-class luxury aboard the Glacier Express, winding through the heart of the snow-capped Swiss mountains.",
    type: "abroad",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481541883737-2fb053d2bb0a?w=600&auto=format&fit=crop"
    ],
    hotels: [
      { id: "h7", name: "The Chedi Andermatt", desc: "Alpine chic meets Asian zen in this spectacular 5-star mountain retreat.", img: "https://images.unsplash.com/photo-1551882547-ff40c0d129fa?w=400&auto=format&fit=crop" },
      { id: "h8", name: "Badrutt's Palace Hotel", desc: "Historic grandeur and breathtaking lake views in St. Moritz.", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: "dubai",
    title: "Dubai to Abu Dhabi",
    days: "5 Days",
    budget: "$2,000",
    desc: "A breathtaking journey combining the modern skyline of Dubai with the cultural majesty of the capital.",
    type: "abroad",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop"
    ],
    hotels: [
      { id: "h9", name: "Burj Al Arab Jumeirah", desc: "The iconic sail-shaped hotel symbolizing modern Dubai luxury.", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&auto=format&fit=crop" },
      { id: "h10", name: "Emirates Palace Mandarin", desc: "Lavish decor and gold-leaf ceilings right on the Abu Dhabi corniche.", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&auto=format&fit=crop" }
    ]
  },
  {
    id: "turkey",
    title: "Istanbul to Cappadocia",
    days: "7 Days",
    budget: "$1,800",
    desc: "Cross through ancient history, culminating in a spectacular hot-air balloon ride over the fairy chimneys.",
    type: "abroad",
    gallery: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&auto=format&fit=crop"
    ],
    hotels: [
      { id: "h11", name: "Pera Palace Istanbul", desc: "A historic hotel that once hosted Agatha Christie and Ernest Hemingway.", img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&auto=format&fit=crop" },
      { id: "h12", name: "Museum Hotel Cappadocia", desc: "A luxury boutique cave hotel with unparalleled balloon views.", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&auto=format&fit=crop" }
    ]
  }
];
