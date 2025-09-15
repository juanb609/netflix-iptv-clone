// Catch-up TV mock data
export const catchupContent = [
  {
    id: 1,
    title: "Game of Thrones - Season Finale",
    channel: "HBO",
    channelLogo: "https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg",
    originalAirTime: "2024-09-14 21:00",
    duration: "62 minutes",
    description: "The epic conclusion to the battle for the Iron Throne as alliances are tested and destinies fulfilled.",
    thumbnail: "https://image.tmdb.org/t/p/w500/1M876KQUEYGFdK1UdDSMRYlFHU1.jpg",
    category: "Drama",
    availableUntil: "2024-09-21",
    watchedPercentage: 0
  },
  {
    id: 2,
    title: "Monday Night Football - Patriots vs Chiefs",
    channel: "ESPN",
    channelLogo: "https://logoeps.com/wp-content/uploads/2013/03/espn-vector-logo.png",
    originalAirTime: "2024-09-14 20:15",
    duration: "3 hours 15 minutes",
    description: "Live NFL coverage featuring the New England Patriots against the Kansas City Chiefs.",
    thumbnail: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=500",
    category: "Sports",
    availableUntil: "2024-09-16",
    watchedPercentage: 45
  }
];

export const recentlyWatched = [
  {
    id: 1,
    title: "Stranger Things S4E9",
    thumbnail: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    watchedPercentage: 67,
    lastWatched: "2024-09-14 18:30",
    type: "series"
  },
  {
    id: 2,
    title: "Breaking Bad S3E7",
    thumbnail: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    watchedPercentage: 34,
    lastWatched: "2024-09-13 21:15",
    type: "series"
  },
  {
    id: 3,
    title: "The Crown S5E3",
    thumbnail: "https://image.tmdb.org/t/p/w500/1M876KQUEYGFdK1UdDSMRYlFHU1.jpg",
    watchedPercentage: 89,
    lastWatched: "2024-09-12 20:45",
    type: "series"
  }
];

export const recentlyTunedChannels = [
  {
    id: 1,
    channelName: "HBO",
    channelNumber: "101",
    channelLogo: "https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg",
    currentProgram: "Game of Thrones",
    lastWatched: "2024-09-14 20:30",
    thumbnail: "https://image.tmdb.org/t/p/w500/1M876KQUEYGFdK1UdDSMRYlFHU1.jpg",
    type: "live",
    category: "Premium"
  }
];
