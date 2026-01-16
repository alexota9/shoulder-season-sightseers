import { DetailedItinerary, PersonalHighlight } from '@/lib/types/itinerary';

// Personal highlights - direct quotes from notes
export const moroccoPersonalHighlights: PersonalHighlight[] = [
  {
    author: 'alex',
    title: "Alex's Morocco Highlights",
    quote: "The sunset was really spectacular and I got to try my sand boarding before heading back to camp. Dinner was fantastic multi course meal with orzo salad, tajine, and dessert. The actual tent was nicely decorated but absolutely frigid at night.",
    favoritePhoto: '/images/Morocco 11-25/nightsahara.JPEG',
    topMoments: [
      'Best fauxito I\'ve ever had at Full Sun Cafe',
      'The camels get up back first which was unexpected',
      'The driver just sent it into the desert yelling AFRICA as we crested over the dunes',
      'Sand boarding in the Sahara at sunset',
      'Star gazing and taking photos at the desert camp'
    ]
  },
  {
    author: 'lissi',
    title: "Lissi's Morocco Highlights",
    quote: "Riad Fes Ziyat and it\'s GORGEOUS. I went out into that random hallway and I love it so much. If this was my house, I\'d never leave that area. I could hear the birds and see a cat walking along the wall. The courtyard was probably my favorite breakfast purely for the views.",
    favoritePhoto: '/images/Morocco 11-25/fesriad.JPEG',
    topMoments: [
      'The call to prayer echoing through the towns - it really is a cool sound',
      'The wild 4x4 drives on the dunes with the driver yelling "AFRICA"',
      'My tajine at Full Sun Cafe was 10/10',
      'Getting to try spinning clay at the mosaic tile factory',
      'Sunrise over the Sahara dunes'
    ]
  }
];

// Morocco itinerary - corrected chronological order based on Wanderlog
export const moroccoItinerary: DetailedItinerary = {
  dates: 'November 25 - December 5, 2025',

  personalHighlights: moroccoPersonalHighlights,

  busynessRating: {
    stars: 5,
    description: "Very crowded destinations! Marrakech, Fes medina, and popular sites like Ait Benhaddou were packed with tourists. The Sahara and Dades Gorge offered more peaceful moments."
  },

  days: [
    {
      date: 'Nov 25',
      title: 'Travel Day - ABQ to Marrakech',
      description: 'Long journey: Albuquerque → Atlanta → Marrakech',
      highlights: [
        'Delta flights DL 1888 and DL 186',
        'Departed ABQ 7:00 AM',
        'International flight to Marrakech'
      ],
      accommodation: null,
      meals: ['Airplane meals'],
      thoughts: {
        shared: [
          "Long travel day ahead of us",
          "Excited to finally get to Morocco!"
        ]
      }
    },
    {
      date: 'Nov 26',
      title: 'Arrival & Drive to Dades Gorge',
      description: 'Landed in Marrakech around 7 AM local time, then long travel day through the Atlas Mountains to Dades Gorge',
      highlights: [
        'No lines at passport control',
        'Met tour operator',
        'Scenic drive through High Atlas Mountains',
        'Arrived at Dades Xaluca Hotel'
      ],
      accommodation: 'Dades Xaluca Hotel (Boumalne Dades)',
      meals: ['Breakfast', 'Lunch on the road', 'Dinner at hotel'],
      photos: [],
      thoughts: {
        shared: [
          "Jet lagged but excited",
          "The Atlas Mountain scenery is stunning",
          "Long drive but worth it"
        ]
      }
    },
    {
      date: 'Nov 27',
      title: 'Dades to Merzouga (Sahara Desert)',
      description: 'Journey from Dades Gorge to the edge of the Sahara Desert, including Todra Gorge stop',
      highlights: [
        'Todra River and Todra Gorge - towering canyon walls',
        'Restaurant Nomad stop',
        'Erg Chebbi - arrival at Sahara',
        'Camel trek into desert at sunset',
        'Night at Sahara Majestic Luxury Camp'
      ],
      accommodation: 'Sahara Majestic Luxury Camp (Merzouga)',
      meals: ['Breakfast at hotel', 'Lunch', 'Dinner at desert camp'],
      photos: [
        {
          src: '/images/Morocco 11-25/saharacamel.JPEG',
          alt: 'Camel in Sahara',
          caption: 'Camel trekking into the Sahara at sunset',
          takenBy: 'both'
        },
        {
          src: '/images/Morocco 11-25/saharalissisilhouette.JPEG',
          alt: 'Sahara desert silhouette',
          caption: 'Silhouette in the Sahara dunes at sunset',
          takenBy: 'alex'
        },
        {
          src: '/images/Morocco 11-25/nightsaharacamp.JPEG',
          alt: 'Night at Sahara camp',
          caption: 'Desert camp under the stars',
          takenBy: 'lissi'
        },
        {
          src: '/images/Morocco 11-25/nightsahara.JPEG',
          alt: 'Sahara night sky',
          caption: 'Starry night in the Sahara - unforgettable',
          takenBy: 'alex'
        }
      ],
      thoughts: {
        shared: [
          "Todra Gorge is absolutely breathtaking",
          "The camel ride into the desert at sunset was magical",
          "Sleeping under the stars in the Sahara - bucket list moment"
        ]
      }
    },
    {
      date: 'Nov 28',
      title: 'Full Day in Sahara Desert',
      description: 'Second night in the Sahara, exploring Erg Chebbi dunes',
      highlights: [
        'Sunrise over the dunes',
        'Desert exploration',
        'More time at the camp',
        'Stargazing'
      ],
      accommodation: 'Sahara Majestic Luxury Camp (Merzouga)',
      meals: ['Breakfast at camp', 'Lunch', 'Dinner at camp'],
      photos: [],
      thoughts: {
        shared: [
          "Waking up to sunrise over the dunes",
          "The silence of the desert is profound",
          "Could spend days here"
        ]
      }
    },
    {
      date: 'Nov 29',
      title: 'Sahara to Fes via Middle Atlas',
      description: 'Epic journey from Sahara through Middle Atlas Mountains to ancient Fes',
      highlights: [
        'Ziz Valley palm groves',
        'Midelt stop',
        'Ifrane - "Little Switzerland"',
        'Ifrane National Park',
        'Arrival at stunning Riad Fes Ziyat'
      ],
      accommodation: 'Riad Fes Ziyat (Fes)',
      meals: ['Breakfast at camp', 'Lunch stops', 'Dinner at riad'],
      photos: [
        {
          src: '/images/Morocco 11-25/oasis.JPEG',
          alt: 'Desert oasis',
          caption: 'Lush palm oasis',
          takenBy: 'lissi'
        },
        {
          src: '/images/Morocco 11-25/fesriad.JPEG',
          alt: 'Fes riad interior',
          caption: 'Beautiful Riad Fes Ziyat',
          takenBy: 'lissi'
        }
      ],
      thoughts: {
        shared: [
          "The landscape changes so dramatically from desert to green mountains",
          "Ifrane feels like Switzerland in the middle of Morocco",
          "Riad Fes Ziyat is absolutely stunning - best accommodation yet"
        ]
      }
    },
    {
      date: 'Nov 30',
      title: 'Exploring Fes - The Ancient Medina',
      description: 'Full day in Fes, exploring the largest and oldest medina in the world',
      highlights: [
        'Het Koninklijk Paleis van Fez (Royal Palace)',
        'Quartier Mellah (Jewish Quarter)',
        'Fes-Medina - UNESCO World Heritage site',
        'Moroccan Tannery viewing',
        'Mosaic tile factory',
        'Getting lost in the maze'
      ],
      accommodation: 'Riad Fes Ziyat (Fes)',
      meals: ['Amazing breakfast at riad', 'Lunch in medina', 'Dinner at riad'],
      photos: [
        {
          src: '/images/Morocco 11-25/fes.JPEG',
          alt: 'Fes city view',
          caption: 'Historic city of Fes from above',
          takenBy: 'alex'
        },
        {
          src: '/images/Morocco 11-25/localshop.JPEG',
          alt: 'Local Moroccan shop',
          caption: 'Colorful local shop display in Fes medina',
          takenBy: 'lissi'
        }
      ],
      thoughts: {
        shared: [
          "Fes medina is on another level - like stepping back 1000 years",
          "The tanneries were pungent but fascinating",
          "Could easily spend another day here",
          "The breakfast at this riad is incredible"
        ]
      }
    },
    {
      date: 'Dec 1',
      title: 'Fes to Chefchaouen',
      description: 'Journey through Rif Mountains to the famous blue pearl of Morocco',
      highlights: [
        'Scenic mountain drive',
        'Chefchaouen Medina - the blue city',
        'Cafe Clock',
        'Cape Spartel'
      ],
      accommodation: 'Dar Echchaouen Maison d\'hôtes & Riad (Chefchaouen)',
      meals: ['Breakfast at riad', 'Lunch in Chefchaouen', 'Dinner'],
      photos: [],
      thoughts: {
        shared: [
          "Chefchaouen is even more blue than the photos",
          "Mountain setting makes it cooler and more relaxed",
          "Every corner is photo-worthy"
        ]
      }
    },
    {
      date: 'Dec 2',
      title: 'Chefchaouen to Marrakech via Ait Benhaddou',
      description: 'Return journey to Marrakech with stop at famous UNESCO kasbah',
      highlights: [
        'Drive back through Atlas Mountains',
        'Ait Benhaddou UNESCO kasbah (planned stop based on typical route)',
        'Arrival in bustling Marrakech',
        'Check into Riad Andallaspa'
      ],
      accommodation: 'Riad Andallaspa (Marrakech)',
      meals: ['Breakfast', 'Lunch on route', 'Dinner in Marrakech'],
      photos: [
        {
          src: '/images/Morocco 11-25/IMG_0500.JPEG',
          alt: 'Morocco landscape',
          caption: 'Atlas Mountain scenery',
          takenBy: 'both'
        }
      ],
      thoughts: {
        shared: [
          "Long drive back to Marrakech",
          "The Atlas Mountain scenery never gets old",
          "Marrakech feels much more touristy than Fes"
        ]
      }
    },
    {
      date: 'Dec 3',
      title: 'Exploring Marrakech',
      description: 'Full day in the red city',
      highlights: [
        'Jemaa el-Fna square',
        'Marrakech souks',
        'Shopping and exploring'
      ],
      accommodation: 'Riad Andallaspa (Marrakech)',
      meals: ['Breakfast at riad', 'Lunch', 'Dinner in medina'],
      photos: [
        {
          src: '/images/Morocco 11-25/marrakechsouk.JPEG',
          alt: 'Marrakech souk',
          caption: 'Vibrant marketplace in Marrakech medina',
          takenBy: 'alex'
        }
      ],
      thoughts: {
        shared: [
          "Jemaa el-Fna is absolute chaos in the best way",
          "The souks are even more intense than Fes",
          "So many tourists but still authentic"
        ]
      }
    },
    {
      date: 'Dec 4',
      title: 'More Marrakech Exploration',
      description: 'Another day in Marrakech',
      highlights: [
        'Additional sightseeing',
        'Souvenir shopping',
        'Relaxing at riad'
      ],
      accommodation: 'Riad Andallaspa (Marrakech)',
      meals: ['Breakfast at riad', 'Lunch', 'Dinner'],
      photos: [],
      thoughts: {
        shared: [
          "Taking it a bit easier today",
          "Last chance for souvenir shopping",
          "Can't believe the trip is almost over"
        ]
      }
    },
    {
      date: 'Dec 5',
      title: 'Departure from Morocco',
      description: 'Morning in Marrakech, then flights home: Marrakech → Tangier → Atlanta → Albuquerque',
      highlights: [
        'Last tajine breakfast',
        'Flight to Tangier (TNG to RAK - confirmation VRTZ5F)',
        'Long journey home'
      ],
      accommodation: null,
      meals: ['Breakfast at riad', 'Airport/airplane food'],
      photos: [
        {
          src: '/images/Morocco 11-25/donkey.JPEG',
          alt: 'Donkey in Morocco',
          caption: 'Traditional transport - a common sight',
          takenBy: 'alex'
        },
        {
          src: '/images/Morocco 11-25/tangiersunsetpalm.JPEG',
          alt: 'Tangier sunset with palm',
          caption: 'Palm tree silhouette (from layover)',
          takenBy: 'lissi'
        },
        {
          src: '/images/Morocco 11-25/tangiersunsetbeach.JPEG',
          alt: 'Tangier beach sunset',
          caption: 'Golden sunset over Tangier during layover',
          takenBy: 'alex'
        },
        {
          src: '/images/Morocco 11-25/tangierlighthouse.JPEG',
          alt: 'Tangier lighthouse',
          caption: 'Tangier lighthouse during layover',
          takenBy: 'alex'
        }
      ],
      thoughts: {
        shared: [
          "Can't believe it's over",
          "Morocco exceeded all expectations",
          "Already want to come back",
          "Every tajine was delicious"
        ]
      }
    }
  ],

  culturalObservations: [
    'Call to prayer 5 times daily - beautiful and atmospheric',
    'Tajines are everywhere and always delicious',
    'Negotiation is expected in souks - part of the culture',
    'Mint tea is offered everywhere - sign of hospitality',
    'Conservative dress recommended, especially for women',
    'French and Arabic are main languages, some English in tourist areas',
    'Paid bathrooms are standard - bring small change',
    'Riads offer authentic Moroccan hospitality',
    'Donkeys and mules still common in medinas',
    'Marrakech and Fes medinas were very crowded with tourists'
  ],

  essentialInfo: [
    {
      title: 'Tour Operator',
      items: [
        'Marvelous Morocco Tours (https://marvelous-moroccotours.com/)',
        'Email: marvelousmoroccotours@gmail.com',
        'Phone (WhatsApp): +212661480472',
        'Highly recommended for multi-day desert tours'
      ]
    },
    {
      title: 'Crowd Levels',
      items: [
        'Marrakech: Very crowded, lots of tourists',
        'Fes Medina: Busy but less touristy than Marrakech',
        'Sahara Desert: Peaceful, fewer people',
        'Chefchaouen: Moderate crowds',
        'Dades Gorge/Todra Gorge: Less crowded',
        'November is shoulder season - better than summer'
      ]
    },
    {
      title: 'Money',
      items: [
        'Moroccan Dirham (MAD) - roughly 10 MAD = $1 USD',
        'Flight TNG to RAK: MAD 1,115.95',
        'Riad Andallaspa: $118.51 total',
        'Budget ~$80-120 per person per day',
        'Negotiate prices in souks'
      ]
    }
  ],

  budgetBreakdown: {
    accommodation: 'Riads: $30-60/night for two people. Hotels included in tour package.',
    food: 'Tajines $10-25 per person, street food $3-8',
    tours: 'Multi-day tour with Marvelous Morocco Tours (price included accommodations and transport)',
    transportation: 'Included in tour package. Internal flight TNG to RAK: MAD 1,115.95 (~$112)',
    shopping: 'Souks - negotiate! Budget $50-200 depending on purchases',
    total: 'Total trip cost listed in Wanderlog: $269.54 for tracked expenses. Average $80-120 per person per day.'
  },

  topRecommendations: [
    {
      title: 'Must Stay',
      item: 'Riad Fes Ziyat',
      reason: 'Absolutely stunning traditional riad with incredible breakfast and hospitality'
    },
    {
      title: 'Must Do',
      item: 'Sahara Desert Experience',
      reason: 'Camel trek, sunset/sunrise over dunes, sleeping under stars - unforgettable'
    },
    {
      title: 'Must Visit',
      item: 'Fes Medina',
      reason: 'Largest and oldest medina in the world - get lost in the maze'
    },
    {
      title: 'Must See',
      item: 'Todra Gorge',
      reason: 'Stunning towering canyon walls and palm groves'
    },
    {
      title: 'Must Experience',
      item: 'Chefchaouen',
      reason: 'The blue pearl - every street is Instagram-worthy'
    },
    {
      title: 'Tour Operator',
      item: 'Marvelous Morocco Tours',
      reason: 'Professional, reliable, and made the multi-day desert tour seamless'
    }
  ]
};
