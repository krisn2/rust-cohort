import { useContext } from "react";
import { ResumeContext } from "./ResumeContext"; // ✅ Correct import

export const useResume = () => {
  const context = useContext(ResumeContext); // ✅ Use the context, not the provider
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
