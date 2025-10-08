'use client';

import { X, Github, Globe } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperModal({ isOpen, onClose }: DeveloperModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            DM
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Diwan Malla</h2>
          <p className="text-gray-600">Full Stack Developer</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 text-center leading-relaxed">
            Passionate full-stack developer specializing in modern web technologies. 
            Built this YouTube Player with Next.js 15, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center">Tech Stack Used</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'React 19', 'YouTube API'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <a
            href="https://github.com/DiwanMalla"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
          >
            <Github className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">GitHub</p>
              <p className="text-xs text-gray-500">@DiwanMalla</p>
            </div>
          </a>

          <a
            href="https://github.com/DiwanMalla/youtube_player.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
          >
            <Globe className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Project Repository</p>
              <p className="text-xs text-gray-500">View source code</p>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Built with ❤️ using Next.js 15
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
