'use client';

import { X, Github, Globe } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperModal({ isOpen, onClose }: DeveloperModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg backdrop-blur-sm border-2 border-white/30">
            DM
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Diwan Malla</h2>
          <p className="text-white/80">Full Stack Developer</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-white/90 text-center leading-relaxed">
            Passionate full-stack developer specializing in modern web technologies. 
            Built this YouTube Player with Next.js 15, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white mb-3 text-center">Tech Stack Used</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'React 19', 'YouTube API'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full font-medium border border-white/30 hover:bg-white/30 transition-colors"
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
            className="flex items-center gap-3 p-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
          >
            <Github className="w-5 h-5 text-white/80 group-hover:text-white" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">GitHub</p>
              <p className="text-xs text-white/70">@DiwanMalla</p>
            </div>
          </a>

          <a
            href="https://github.com/DiwanMalla/youtube_player.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
          >
            <Globe className="w-5 h-5 text-white/80 group-hover:text-white" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Project Repository</p>
              <p className="text-xs text-white/70">View source code</p>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/20 text-center">
          <p className="text-xs text-white/70">
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
