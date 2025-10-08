'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import VideoList from '@/components/VideoList';
import FeaturedVideo from '@/components/FeaturedVideo';
import DeveloperModal from '@/components/DeveloperModal';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube Player
            </h1>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
            <p className="text-sm mt-2">
              Make sure you have set up your YouTube API key in the .env.local file.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Video - Left Side (2 columns on large screens) */}
            <div className="lg:col-span-2">
              <FeaturedVideo 
                video={selectedVideo} 
                recommendations={recommendations}
                onRecommendationClick={handleVideoSelect}
              />
            </div>

            {/* Video List - Right Side (1 column on large screens) */}
            <div className="lg:col-span-1">
              <VideoList 
                videos={videos} 
                onVideoSelect={handleVideoSelect}
                selectedVideoId={selectedVideo?.id}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            Personal YouTube Web Player - Built with Next.js 15, Tailwind CSS, and YouTube Data API v3
          </p>
        </div>
      </footer>
    </div>
  );
}
