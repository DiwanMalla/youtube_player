'use client';

import { VideoDetails } from '@/types/youtube';
import Image from 'next/image';

interface VideoListProps {
  videos: VideoDetails[];
  onVideoSelect: (video: VideoDetails) => void;
  selectedVideoId?: string;
}

export default function VideoList({ videos, onVideoSelect, selectedVideoId }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No videos found. Try searching for something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results</h2>
      {videos.map((video) => (
        <div
          key={video.id}
          onClick={() => onVideoSelect(video)}
          className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200
                     hover:shadow-xl hover:scale-[1.02] border-2
                     ${selectedVideoId === video.id 
                       ? 'border-red-500 shadow-lg' 
                       : 'border-transparent hover:border-gray-300'
                     }`}
        >
          <div className="relative aspect-video bg-gray-200">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="p-4 bg-white">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600">{video.channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
