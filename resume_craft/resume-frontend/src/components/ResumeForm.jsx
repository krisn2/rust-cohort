import React, { useState } from "react";
import axios from "axios";
import useResumeReducer from "../hooks/useResumeReducer";
import { validateResume } from "../utils/validators";
import normalizeResumeData from "../utils/normalize";
import PersonalForm from "./PersonalForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import CertificationsForm from "./CertificationsForm";
import ProjectsForm from "./ProjectsForm";
import Section from "./ui/Section";
import { Save, AlertCircle } from "lucide-react";

export default function ResumeForm() {
  const { state, updateField, addItem, removeItem, reset } = useResumeReducer();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  const validation = validateResume(state);
  if (Object.keys(validation).length > 0) {
    setErrors(validation);
    setSubmitStatus({ type: "error", message: "Please fix validation errors." });
    return;
  }
  setErrors({});
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    const payload = normalizeResumeData(state);
    console.log("Submitting payload:", payload);

    // Get token from localStorage
    const token = localStorage.getItem("auth_token");

    const res = await axios.post(`${import.meta.env.VITE_API}/resume`, payload, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),  // Add auth header if token exists
      },
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

    setSubmitStatus({ type: "success", message: "🎉 Resume downloaded successfully!" });
  } catch (err) {
    console.error("Submission error", err);
    let message = `❌ Failed to download resume PDF. ${err.message || ""}`;
    if (err.response && err.response.data) {
      try {
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const json = JSON.parse(reader.result);
            message = json.message || message;
            setSubmitStatus({ type: "error", message });
          } catch {
            setSubmitStatus({ type: "error", message: `Server responded with status ${err.response.status}` });
          }
        };
        reader.readAsText(new Blob([err.response.data]));
      } catch {
        setSubmitStatus({ type: "error", message });
      }
    } else setSubmitStatus({ type: "error", message });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen py-16 pt-28 px-4 sm:px-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-inter">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl border border-white/20">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Build Your Resume
        </h1>

        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${submitStatus.type === "success" ? "bg-green-500/20 border border-green-500/30 text-green-100" : "bg-red-500/20 border border-red-500/30 text-red-100"}`}>
            <AlertCircle className="w-5 h-5" /> {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <Section title="Personal Information">
            <PersonalForm data={state} updateField={updateField} errors={errors} />
          </Section>

          <Section title="Education">
            <EducationForm data={state} updateField={updateField} addItem={addItem} removeItem={removeItem} errors={errors} />
          </Section>

          <Section title="Experience (Optional)">
            <ExperienceForm data={state} updateField={updateField} addItem={addItem} removeItem={removeItem} errors={errors} />
          </Section>

          <Section title="Projects (Optional)">
            <ProjectsForm data={state} updateField={updateField} addItem={addItem} removeItem={removeItem} errors={errors} />
          </Section>

          <Section title="Skills (Optional)">
            <SkillsForm data={state} updateField={updateField} addItem={addItem} removeItem={removeItem} errors={errors} />
          </Section>

          <Section title="Certifications (Optional)">
            <CertificationsForm data={state} updateField={updateField} addItem={addItem} removeItem={removeItem} errors={errors} />
          </Section>

          <div className="text-center pt-6">
            <button type="submit" disabled={isSubmitting} className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25 transform hover:scale-105"} text-white`}>
              <Save className="w-5 h-5" />
              {isSubmitting ? "Submitting..." : "Submit Resume"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
