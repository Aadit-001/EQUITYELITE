import React from "react";
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark, FaRegShareSquare } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { formatDistanceToNow } from 'date-fns';

export default function TweetCard({ post }) {
  // Format the post creation time
  const formatTimeAgo = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-black border-b border-gray-800 px-4 py-3 hover:bg-gray-900/50 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-purple-600 text-white text-xl font-bold flex items-center justify-center cursor-pointer">
            {post.owner?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* User info and timestamp */}
          <div className="flex items-center space-x-1">
            <span className="font-bold text-white text-base">{post.owner?.username || 'User'}</span>
            <span className="text-gray-500 text-sm">@{post.owner?.username?.toLowerCase().replace(/\s+/g, '') || 'user'}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">{formatTimeAgo(post.createdAt || new Date())}</span>
            {/* <button className="ml-auto text-gray-500 hover:text-purple-500 p-1 rounded-full hover:bg-purple-500/10">
              <FiMoreHorizontal />
            </button> */}
          </div>
          
          {/* Post content */}
          <div className="mt-1 mb-2">
            <h3 className="text-white text-base font-medium mb-2">{post.title}</h3>
            <p className="text-gray-300 text-base leading-snug">
              {post.description}
            </p>
          </div>
          
          {/* Post media */}
          {post.postFile && (
            <div className="mt-3 mb-2 rounded-2xl overflow-hidden border border-gray-800">
              <img 
                src={post.postFile} 
                alt="Post media" 
                className="w-full h-auto max-h-96 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Actions */}
          <div className="flex justify-between mt-3 max-w-md text-gray-500">
            <button className="flex items-center space-x-1 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-500">
                <FaRegComment className="text-sm" />
              </div>
              <span className="text-xs group-hover:text-blue-500">
                {post.comments?.length || 0}
              </span>
            </button>
            
            {/* <button className="flex items-center space-x-1 group">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 group-hover:text-green-500">
                <FaRetweet className="text-sm" />
              </div>
              <span className="text-xs group-hover:text-green-500">
                {post.retweets || 0}
              </span>
            </button> */}
            
            <button className="flex items-center space-x-1 group">
              <div className="p-2 rounded-full group-hover:bg-pink-500/10 group-hover:text-pink-500">
                <FaRegHeart className="text-sm" />
              </div>
              <span className="text-xs group-hover:text-pink-500">
                {post.likes?.length || 0}
              </span>
            </button>
            
            <button className="p-2 rounded-full hover:bg-purple-500/10 hover:text-purple-500">
              <FaRegBookmark className="text-sm" />
            </button>
            
            <button className="p-2 rounded-full hover:bg-blue-500/10 hover:text-blue-500">
              <FaRegShareSquare className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}