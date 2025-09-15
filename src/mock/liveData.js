// Live TV and TV Guide mock data
export const liveChannels = [
  {
    id: 1,
    name: "HBO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg",
    number: "101",
    category: "Premium",
    streamUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    isLive: true,
    currentProgram: {
      title: "Game of Thrones",
      startTime: "20:00",
      endTime: "21:00",
      description: "The epic fantasy series continues with political intrigue and dragons."
    }
  },
  {
    id: 2,
    name: "Netflix",
    logo: "https://logoeps.com/wp-content/uploads/2013/03/netflix-vector-logo.png",
    number: "102",
    category: "Streaming",
    streamUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    isLive: true,
    currentProgram: {
      title: "Stranger Things Marathon",
      startTime: "19:30",
      endTime: "22:30", 
      description: "All seasons of the supernatural thriller series."
    }
  },
  {
    id: 3,
    name: "ESPN",
    logo: "https://logoeps.com/wp-content/uploads/2013/03/espn-vector-logo.png",
    number: "103",
    category: "Sports",
    streamUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    isLive: true,
    currentProgram: {
      title: "Monday Night Football",
      startTime: "20:15",
      endTime: "23:30",
      description: "Live NFL coverage with expert commentary and analysis."
    }
  },
  {
    id: 4,
    name: "CNN",
    logo: "https://logoeps.com/wp-content/uploads/2012/10/cnn-vector-logo.png",
    number: "104",
    category: "News",
    streamUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", 
    isLive: true,
    currentProgram: {
      title: "CNN Tonight",
      startTime: "20:00",
      endTime: "21:00",
      description: "Breaking news and analysis from around the world."
    }
  }
];

export const channelCategories = [
  "All",
  "Premium", 
  "Sports",
  "News",
  "Documentary",
  "Comedy",
  "Lifestyle",
  "Streaming"
];

export const iptvAccounts = [
  {
    id: 1,
    name: "Premium IPTV",
    url: "http://premium.iptv-service.com:8080",
    username: "premium_user",
    status: "connected",
    channelCount: 1247,
    isActive: false
  },
  {
    id: 2,
    name: "Sports Plus",
    url: "http://sportsplus.stream.net:9090",
    username: "sports_fan",
    status: "connected", 
    channelCount: 850,
    isActive: false
  },
  {
    id: 3,
    name: "Global Streams",
    url: "http://global.streaming.tv:7777",
    username: "global_user",
    status: "disconnected",
    channelCount: 2100,
    isActive: false
  },
  {
    id: 4,
    name: "Family Bundle",
    url: "http://family.iptv.zone:8888",
    username: "family_account",
    status: "connected",
    channelCount: 680,
    isActive: false
  }
];

export const tvGuideData = [
  {
    time: "19:00",
    programs: [
      { channelId: 1, title: "Game of Thrones Rerun", duration: "1h" },
      { channelId: 2, title: "Stranger Things S1E1", duration: "45min" },
      { channelId: 3, title: "SportsCenter", duration: "1h" },
      { channelId: 4, title: "CNN Newsroom", duration: "1h" }
    ]
  },
  {
    time: "20:00",
    programs: [
      { channelId: 1, title: "Game of Thrones", duration: "1h" },
      { channelId: 2, title: "Stranger Things Marathon", duration: "3h" },
      { channelId: 3, title: "Monday Night Football", duration: "3h 15min" },
      { channelId: 4, title: "CNN Tonight", duration: "1h" }
    ]
  }
];

export const currentTime = "20:30";
