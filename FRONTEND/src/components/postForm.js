import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({setPostOpen}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState();


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(event.target.files[0]);
    setFilePreview(URL.createObjectURL(selectedFile));  // image ka url banake src mai dalna 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('postFile', file);   //ye name same hona chahiye jaise post.modle mai hai
  }

    try {
      const response = await axios.post('http://localhost:3000/uploadPost', formData, {
      });
      console.log('Post uploaded:', response.data);
      setPostOpen(false);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 p-8 rounded-lg shadow-lg text-white w-full max-w-md mx-auto relative">
        <h2 className="text-2xl mb-4 font-bold text-center">Create a Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title" 
            required 
            className="w-full p-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-600 bg-black bg-opacity-10 text-white placeholder-white"
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description" 
            required 
            className="w-full p-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-600 bg-black bg-opacity-10 text-white placeholder-white"
          ></textarea>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="w-full p-2 border border-purple-500 rounded focus:outline-none focus:ring-2 focus:ring-violet-600 bg-black bg-opacity-10 text-white placeholder-white"
          />
          {filePreview && ( 
            <div className="w-full flex justify-center"> 
              <img src={filePreview} alt="Image preview" className=" h-44 object-cover mt-2 rounded" /> 
            </div> 
          )}
          <button 
            type="submit" 
            className="w-full p-2 bg-green-600 rounded-full hover:bg-green-400 transition-colors text-white font-bold"
          >
            Post
          </button>
        </form>
      <div className='h-6 w-6 rounded-full bg-transparent text-white border border-black absolute right-0 top-0 flex justify-center items-center pb-1 hover:scale-105 cursor-pointer transition-all duration-0' onClick={() =>{setPostOpen(false)}}>x</div>
      </div>
    </div>
  );
};

export default PostForm;





