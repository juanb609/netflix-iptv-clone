import React, { useState } from 'react';
import { Tv, Play, Film, Clock, TrendingUp, Star, Calendar, Users, Radio, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { liveChannels } from '../mock/liveData';
import { contentRows } from '../mock/data';
import { catchupContent, recentlyWatched, recentlyTunedChannels } from '../mock/catchupData';

const TileButton = ({ title, icon: Icon, onClick, isConnected = true, size = "medium", className = "" }) => {
  const sizeClasses = {
    large: "col-span-2 row-span-2 h-48",
    medium: "h-24",
    small: "h-20"
  };

  const iconSizes = {
    large: "w-12 h-12",
    medium: "w-6 h-6", 
    small: "w-5 h-5"
  };

  const textSizes = {
    large: "text-lg",
    medium: "text-sm",
    small: "text-xs"
  };

  return (
    <Card 
      className={`bg-gradient-to-br from-red-700 to-red-800 border-none cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
        !isConnected ? 'opacity-50 cursor-not-allowed from-gray-700 to-gray-800' : ''
      } ${sizeClasses[size]} ${className}`}
      onClick={isConnected ? onClick : undefined}
    >
      <CardContent className="h-full flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <Icon className={`${iconSizes[size]} mb-2 group-hover:scale-110 transition-transform`} />
          <h2 className={`${textSizes[size]} font-medium text-center leading-tight`}>{title}</h2>
          
          {!isConnected && (
            <Badge variant="destructive" className="text-xs mt-1">
              Login Required
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-white/5 rounded-full -mr-6 -mb-6 group-hover:scale-125 transition-transform" />
      </CardContent>
    </Card>
  );
};

const ContentPreviewCard = ({ content, type, onPlay, onPlayChannel }) => {
  const handlePlay = () => {
    if (content.type === 'live' && onPlayChannel) {
      const channel = liveChannels.find(ch => ch.name === content.channelName);
      if (channel) {
        onPlayChannel(channel);
      }
    } else if (onPlay) {
      onPlay(content);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer group">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={content.thumbnail || content.image} 
            alt={content.title || content.currentProgram}
            className="w-full h-32 object-cover"
          />
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              onClick={handlePlay}
              className="bg-white text-black hover:bg-white/90 rounded-full w-12 h-12 p-0"
            >
              <Play className="w-5 h-5 fill-current" />
            </Button>
          </div>

          {content.watchedPercentage !== undefined && content.watchedPercentage > 0 && content.type !== 'live' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
              <div 
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${content.watchedPercentage}%` }}
              />
            </div>
          )}

          {content.type === 'live' && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-600 text-white text-xs">
                <Radio className="w-2 h-2 mr-1" />
                LIVE
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
            {content.type === 'live' ? content.currentProgram : content.title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

const IPTVHome = ({ onTabChange, iptvConnected, onPlay, onPlayChannel }) => {
  const handleQuickAccess = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const combinedRecentContent = [
    ...recentlyWatched,
    ...(iptvConnected ? recentlyTunedChannels : [])
  ].sort((a, b) => new Date(b.lastWatched) - new Date(a.lastWatched));

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      <div className="px-4 md:px-16">
        {/* Minimized Welcome Section */}
        <div className="mb-8 text-center">
          <p className="text-gray-500 text-sm mb-2">Welcome to Netflix IPTV</p>
          <p className="text-gray-600 text-xs max-w-md mx-auto">
            Your complete entertainment destination with live TV, on-demand content, and catch-up services
          </p>
        </div>

        {/* Main Tile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          {/* Live TV - Large Tile */}
          <TileButton
            title="Live TV"
            icon={Tv}
            size="large"
            onClick={() => handleQuickAccess('livetv')}
            isConnected={iptvConnected}
            className="md:col-span-2 md:row-span-2"
          />
          
          {/* Movies */}
          <TileButton
            title="Movies"
            icon={Film}
            size="medium"
            onClick={() => handleQuickAccess('movies')}
            isConnected={true}
          />
          
          {/* TV Series */}
          <TileButton
            title="Series"
            icon={TrendingUp}
            size="medium"
            onClick={() => handleQuickAccess('tvshows')}
            isConnected={true}
          />
          
          {/* Catch-up */}
          <TileButton
            title="Catch-up"
            icon={Clock}
            size="medium"
            onClick={() => handleQuickAccess('catchup')}
            isConnected={iptvConnected}
          />
          
          {/* Settings */}
          <TileButton
            title="Settings"
            icon={Settings}
            size="medium"
            onClick={() => handleQuickAccess('iptv-settings')}
            isConnected={true}
          />
        </div>

        {/* Continue Watching */}
        {combinedRecentContent.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Play className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold">Continue Watching</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {combinedRecentContent.slice(0, 6).map((content, index) => (
                <ContentPreviewCard
                  key={`${content.type}-${content.id}`}
                  content={content}
                  type="continue"
                  onPlay={onPlay}
                  onPlayChannel={onPlayChannel}
                />
              ))}
            </div>
          </div>
        )}

        {/* Popular Movies & Shows */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Star className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold">Popular Right Now</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {contentRows[0]?.contents.slice(0, 6).map((content) => (
              <ContentPreviewCard
                key={content.id}
                content={content}
                type="popular"
                onPlay={onPlay}
              />
            ))}
          </div>
        </div>

        {/* IPTV Status Banner */}
        {!iptvConnected && (
          <Card className="bg-gradient-to-r from-red-900/20 to-red-800/20 border-red-800/50 mb-8">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Tv className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Enhanced Experience Available</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Connect your IPTV service to unlock live channels, TV guide, and catch-up features
              </p>
              <Button 
                onClick={() => handleQuickAccess('iptv-settings')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Connect IPTV Service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IPTVHome;
