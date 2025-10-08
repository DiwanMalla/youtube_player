'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import VideoList from '@/components/VideoList';
import FeaturedVideo from '@/components/FeaturedVideo';
import DeveloperModal from '@/components/DeveloperModal';
import ThemeToggle from '@/components/ThemeToggle';
import { YouTubeService } from '@/lib/youtube';
import { VideoDetails } from '@/types/youtube';

const DEFAULT_SEARCH_TERM = 'Next.js tutorials';

export default function Home() {
  const [videos, setVideos] = useState<VideoDetails[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoDetails | null>(null);
  const [recommendations, setRecommendations] = useState<VideoDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

  // Load default videos on mount
  useEffect(() => {
    handleSearch(DEFAULT_SEARCH_TERM);
  }, []);

  // Fetch recommendations when a video is selected
  useEffect(() => {
    if (selectedVideo) {
      fetchRecommendations(selectedVideo.channelId, selectedVideo.id);
    }
  }, [selectedVideo]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await YouTubeService.searchVideos(query, 5);
      setVideos(results);
      
      // Auto-select first video
      if (results.length > 0) {
        setSelectedVideo(results[0]);
      }
    } catch (err) {
      setError('Failed to search videos. Please check your API key.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecommendations = async (channelId: string, currentVideoId: string) => {
    try {
      const recs = await YouTubeService.getVideosByChannel(channelId, 6);
      // Filter out the current video from recommendations
      const filtered = recs.filter(rec => rec.id !== currentVideoId).slice(0, 4);
      setRecommendations(filtered);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setRecommendations([]);
    }
  };

  const handleVideoSelect = (video: VideoDetails) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-200/20 dark:bg-slate-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="bg-white/40 dark:bg-gray-800/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 sticky top-0 z-50 shadow-lg shadow-gray-200/50 dark:shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-300/50 dark:shadow-purple-500/50 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              YouTube Player
            </h1>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsDeveloperModalOpen(true)}
                className="px-5 py-2.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md text-gray-800 dark:text-white rounded-2xl 
                         hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50
                         hover:shadow-xl hover:scale-105 font-medium text-sm flex items-center gap-2
                         border border-white/40 dark:border-gray-700/40"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Developer
              </button>
            </div>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-md border border-red-200/50 dark:border-red-800/50 rounded-2xl text-red-700 dark:text-red-300 shadow-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
            <p className="text-sm mt-2">
              Make sure you have set up your YouTube API key in the .env.local file.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 dark:border-purple-400"></div>
              <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 dark:border-blue-300 animate-reverse" style={{ animationDuration: '1.5s' }}></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Featured Video - Top on mobile/tablet, left on desktop */}
            <div className="lg:col-span-2">
              <div className="bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/40 dark:border-gray-700/50 shadow-xl shadow-gray-200/50 dark:shadow-black/50">
                <FeaturedVideo 
                  video={selectedVideo} 
                  recommendations={recommendations}
                  onRecommendationClick={handleVideoSelect}
                />
              </div>
            </div>

            {/* Video List - Bottom on mobile/tablet, right on desktop */}
            <div className="lg:col-span-1">
              <div className="bg-white/40 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/40 dark:border-gray-700/50 shadow-xl shadow-gray-200/50 dark:shadow-black/50">
                <VideoList 
                  videos={videos} 
                  onVideoSelect={handleVideoSelect}
                  selectedVideoId={selectedVideo?.id}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-white/40 dark:bg-gray-800/60 backdrop-blur-xl mt-12 border-t border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-700 dark:text-gray-300">
            Personal YouTube Web Player - Built with Next.js 15, Tailwind CSS, and YouTube Data API v3
          </p>
        </div>
      </footer>

      {/* Developer Modal */}
      <DeveloperModal 
        isOpen={isDeveloperModalOpen} 
        onClose={() => setIsDeveloperModalOpen(false)} 
      />
    </div>
  );
}
