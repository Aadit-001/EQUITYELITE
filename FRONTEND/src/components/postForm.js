import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FiX, FiImage, FiSend, FiLoader } from 'react-icons/fi';

const PostForm = ({ setPostOpen }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);
  // const url = process.env.REACT_APP_API_BASE_URL;


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(event.target.files[0]);
    setFilePreview(URL.createObjectURL(selectedFile));  // image ka url banake src mai dalna 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('postFile', file);   //ye name same hona chahiye jaise post.modle mai hai
  }

    try {
      const response = await axios.post(`https://equityelite-1.onrender.com/uploadPost`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Post uploaded:', response.data);
      setPostOpen(false);
    } catch (error) {
      console.error('Error uploading post:', error);
      // Optionally show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4 ${isLoading ? 'cursor-wait' : ''}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-white bg-clip-text text-transparent">
              Create Post
            </h2>
            <button 
              onClick={() => setPostOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1.5">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your thoughts..."
              rows="4"
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Add Media (Optional)
            </label>
            <div 
              className={`border-2 border-dashed border-gray-700 rounded-xl text-center cursor-pointer hover:border-purple-500/50 transition-all duration-200 ${
                filePreview ? 'p-3' : 'p-6'
              }`}
              onClick={handleButtonClick}
            >
              {filePreview ? (
                <div className="relative group w-full">
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-lg border border-gray-800"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="bg-black/50 p-2 rounded-full">
                      <FiImage className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-3 rounded-full bg-gray-800/50">
                    <FiImage className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      <span className="text-purple-400 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Remove image button */}
          {filePreview && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setFilePreview(null);
                  setFile(null);
                }}
                className="flex items-center space-x-1 text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                <FiX className="w-4 h-4" />
                <span>Remove image</span>
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={handleButtonClick}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <FiImage className="w-5 h-5" />
              <span>Add Photo</span>
            </button>
            <button
              type="submit"
              className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 min-w-[120px] ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;