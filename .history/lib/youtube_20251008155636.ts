import axios from 'axios';
import { YouTubeSearchResponse, YouTubeVideo, VideoDetails } from '@/types/youtube';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export class YouTubeService {
  /**
   * Search for videos based on a query
   * @param query - Search term
   * @param maxResults - Maximum number of results (default: 5)
   */
  static async searchVideos(
    query: string,
    maxResults: number = 5
  ): Promise<VideoDetails[]> {
    try {
      const response = await axios.get<YouTubeSearchResponse>(
        `${BASE_URL}/search`,
        {
          params: {
            key: API_KEY,
            q: query,
            part: 'snippet',
            type: 'video',
            maxResults,
            videoEmbeddable: true,
          },
        }
      );

      return response.data.items.map((item) => this.formatVideoDetails(item));
    } catch (error) {
      console.error('Error searching videos:', error);
      throw new Error('Failed to search videos');
    }
  }

  /**
   * Get videos by channel ID (for recommendations)
   * @param channelId - YouTube channel ID
   * @param maxResults - Maximum number of results (default: 5)
   */
  static async getVideosByChannel(
    channelId: string,
    maxResults: number = 5
  ): Promise<VideoDetails[]> {
    try {
      const response = await axios.get<YouTubeSearchResponse>(
        `${BASE_URL}/search`,
        {
          params: {
            key: API_KEY,
            channelId,
            part: 'snippet',
            type: 'video',
            maxResults,
            order: 'date',
            videoEmbeddable: true,
          },
        }
      );

      return response.data.items.map((item) => this.formatVideoDetails(item));
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      throw new Error('Failed to fetch channel videos');
    }
  }

  /**
   * Format YouTube video data to our VideoDetails interface
   */
  private static formatVideoDetails(item: YouTubeVideo): VideoDetails {
    const videoId = typeof item.id === 'string' ? item.id : item.id.videoId;

    return {
      id: videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
    };
  }

  /**
   * Get video URL for react-player
   */
  static getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
}
