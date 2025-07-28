import { createContext, useState } from 'react';
import axios from 'axios';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitResume = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fallback URL if environment variable is not set
      const apiUrl = import.meta.env.VITE_API || 'http://localhost:8080';
      const token = localStorage.getItem("auth_token")
      
      const response = await axios.post(`${apiUrl}/resume`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 10000, // 10 second timeout
      });
      
      console.log('✅ Resume submitted successfully:', response.data);
      setResumeData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to submit resume';
      
      console.error('❌ Error submitting resume:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async (resumeId) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API || 'http://localhost:5000/api';
      
      const response = await axios.get(`${apiUrl}/resume/${resumeId}/download`, {
        responseType: 'blob',
        timeout: 15000, // 15 second timeout for file download
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume_${resumeId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Resume downloaded successfully');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to download resume';
      
      console.error('❌ Error downloading resume:', errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <ResumeContext.Provider value={{ 
      resumeData, 
      setResumeData, 
      submitResume,
      downloadResume,
      loading,
      error,
      clearError
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

