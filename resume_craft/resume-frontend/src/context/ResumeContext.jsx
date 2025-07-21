import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);

  const submitResume = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/resume`, data);
      console.log('✅ Resume submitted:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Error submitting resume:', err);
      throw err;
    }
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, submitResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
