import React from "react";
import { FiExternalLink } from "react-icons/fi";

export function NewsCard({ image, title, url, summary, source, publishedAt }) {
  // Format date if provided
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="group relative h-full overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-500/30 hover:shadow-purple-500/10">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image || 'https://via.placeholder.com/600x400/0f0f17/ffffff?text=No+Image'} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/600x400/0f0f17/ffffff?text=No+Image';
          }}
        />
        {/* Source and Date */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
          <div className="flex justify-between items-center text-xs">
            {source && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium text-white text-xs">
                {source}
              </span>
            )}
            {publishedAt && (
              <span className="text-gray-300 bg-black/40 px-2 py-1 rounded-md">
                {formatDate(publishedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline decoration-purple-500 decoration-2 underline-offset-4"
          >
            {title}
            <FiExternalLink className="inline-block ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
          </a>
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {summary}
        </p>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-800 mt-auto">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium bg-white/50 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-500 transition-all flex items-center group"
          >
            Read Full Story
            <svg className="w-4 h-4 ml-1.5 text-purple-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          
          <div className="flex space-x-1">
            <button className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

NewsCard.defaultProps = {
  source: '',
  publishedAt: null,
  image: null
};
