import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ContentRow from './components/ContentRow';
import VideoPlayer from './components/VideoPlayer';
import ContentModal from './components/ContentModal';
import LiveTV from './components/LiveTV';
import TVGuide from './components/TVGuide';
import LivePlayer from './components/LivePlayer';
import IPTVLogin from './components/IPTVLogin';
import IPTVHome from './components/IPTVHome';
import CatchupTV from './components/CatchupTV';
import Footer from './components/Footer';
import { PageLoadingSpinner } from './components/LoadingSpinner';
import { Toaster } from './components/ui/toaster';

// Mock Data
import { featuredContent, contentRows, userProfiles } from './mock/data';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showLivePlayer, setShowLivePlayer] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(userProfiles[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState(contentRows);
  
  // IPTV Connection State
  const [iptvCredentials, setIptvCredentials] = useState(null);
  const [iptvConnectionInfo, setIptvConnectionInfo] = useState(null);
  const [currentIPTVAccount, setCurrentIPTVAccount] = useState(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter content based on search query
    if (searchQuery.trim()) {
      const filtered = contentRows.map(row => ({
        ...row,
        contents: row.contents.filter(content =>
          content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          content.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(row => row.contents.length > 0);
      
      setFilteredRows(filtered);
    } else {
      setFilteredRows(contentRows);
    }
  }, [searchQuery]);

  const handlePlay = (content) => {
    setSelectedContent(content);
    setShowVideoPlayer(true);
  };

  const handleMoreInfo = (content) => {
    setSelectedContent(content);
    setShowContentModal(true);
  };

  const handlePlayChannel = (channel) => {
    setSelectedChannel(channel);
    setShowLivePlayer(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleProfileSelect = (profile) => {
    setCurrentProfile(profile);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery(''); // Clear search when switching tabs
  };

  const handleIPTVLogin = (credentials, connectionInfo) => {
    setIptvCredentials(credentials);
    setIptvConnectionInfo(connectionInfo);
    
    // If user disconnects, redirect to home
    if (!credentials) {
      setActiveTab('home');
      setCurrentIPTVAccount(null);
    }
  };

  const handleIPTVAccountChange = (account) => {
    // Set the selected account as active
    setCurrentIPTVAccount(account);
    // Mark this account as active and others as inactive
    // In a real app, this would update the backend state
    console.log('Switching to IPTV account:', account.name);
  };

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'iptv-settings':
        return (
          <IPTVLogin 
            onLogin={handleIPTVLogin}
            currentCredentials={iptvCredentials}
          />
        );
      case 'livetv':
        if (!iptvCredentials) {
          return (
            <div className="min-h-screen bg-black pt-20 pb-16 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-white text-2xl font-semibold mb-4">IPTV Not Connected</h2>
                <p className="text-gray-400 mb-6">Please connect to your IPTV service to access live channels</p>
                <button
                  onClick={() => setActiveTab('iptv-settings')}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md"
                >
                  Connect IPTV Service
                </button>
              </div>
            </div>
          );
        }
        return (
          <LiveTV 
            onPlayChannel={handlePlayChannel}
            onSelectChannelForGuide={(channel) => {
              setActiveTab('tvguide');
            }}
          />
        );
      case 'tvguide':
        if (!iptvCredentials) {
          return (
            <div className="min-h-screen bg-black pt-20 pb-16 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-white text-2xl font-semibold mb-4">IPTV Not Connected</h2>
                <p className="text-gray-400 mb-6">Please connect to your IPTV service to access TV guide</p>
                <button
                  onClick={() => setActiveTab('iptv-settings')}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md"
                >
                  Connect IPTV Service
                </button>
              </div>
            </div>
          );
        }
        return <TVGuide onPlayChannel={handlePlayChannel} />;
      case 'catchup':
        if (!iptvCredentials) {
          return (
            <div className="min-h-screen bg-black pt-20 pb-16 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-white text-2xl font-semibold mb-4">IPTV Not Connected</h2>
                <p className="text-gray-400 mb-6">Please connect to your IPTV service to access catch-up TV</p>
                <button
                  onClick={() => setActiveTab('iptv-settings')}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md"
                >
                  Connect IPTV Service
                </button>
              </div>
            </div>
          );
        }
        return <CatchupTV onPlay={handlePlay} />;
      case 'movies':
        return (
          <div className="min-h-screen bg-black pt-20 pb-16">
            <div className="px-4 md:px-16">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Movies</h1>
              {filteredRows.filter(row => row.title.includes('Action') || row.title.includes('Movies')).map((row, index) => (
                <ContentRow
                  key={index}
                  title={row.title}
                  contents={row.contents}
                  onPlay={handlePlay}
                  onMoreInfo={handleMoreInfo}
                />
              ))}
            </div>
          </div>
        );
      case 'tvshows':
        return (
          <div className="min-h-screen bg-black pt-20 pb-16">
            <div className="px-4 md:px-16">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">TV Shows</h1>
              {filteredRows.filter(row => !row.title.includes('Action') && !row.title.includes('Movies')).map((row, index) => (
                <ContentRow
                  key={index}
                  title={row.title}
                  contents={row.contents}
                  onPlay={handlePlay}
                  onMoreInfo={handleMoreInfo}
                />
              ))}
            </div>
          </div>
        );
      case 'mylist':
        return (
          <div className="min-h-screen bg-black pt-20 pb-16">
            <div className="px-4 md:px-16">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">My List</h1>
              <div className="text-center py-16">
                <h2 className="text-white text-xl mb-4">Your list is empty</h2>
                <p className="text-white/70">Add movies and shows to your list to watch them later.</p>
              </div>
            </div>
          </div>
        );
      default: // home
        return (
          <IPTVHome 
            onTabChange={handleTabChange}
            iptvConnected={!!iptvCredentials}
            onPlay={handlePlay}
            onPlayChannel={handlePlayChannel}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onProfileSelect={handleProfileSelect}
        currentProfile={currentProfile}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        iptvStatus={iptvCredentials}
        onIPTVAccountChange={handleIPTVAccountChange}
        currentIPTVAccount={currentIPTVAccount}
      />

      {/* Main Content */}
      {renderContent()}

      {/* Footer - only show on home page */}
      {activeTab === 'home' && <Footer />}

      {/* Video Player Modal */}
      <VideoPlayer
        isOpen={showVideoPlayer}
        onClose={() => setShowVideoPlayer(false)}
        content={selectedContent}
      />

      {/* Live Player Modal */}
      <LivePlayer
        isOpen={showLivePlayer}
        onClose={() => setShowLivePlayer(false)}
        channel={selectedChannel}
      />

      {/* Content Details Modal */}
      <ContentModal
        isOpen={showContentModal}
        onClose={() => setShowContentModal(false)}
        content={selectedContent}
        onPlay={handlePlay}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
