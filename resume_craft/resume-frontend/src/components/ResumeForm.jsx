import { useState } from "react";
import { useResume } from "../context/useResume";
import { Plus, Trash2, Save, AlertCircle } from "lucide-react";

const ResumeForm = () => {
  const [data, setData] = useState({
    personal: {
      fullname: "",
      number: "",
      email: "",
      linkedin_name: "",
      linkedin_url: "",
      github_name: "",
      github_url: "",
      web_url: "",
    },
    education: {
      educations: [
        {
          school: "",
          degree: "",
          start_date: "",
          end_date: "",
          address: "",
        },
      ],
    },
    experience: {
      experiences: [
        {
          position: "",
          start_date: "",
          end_data: "", 
          company_name: "",
          address: "",
          job_des: {
            lines: [""],
          },
        },
      ],
    },
    project: {
      projects: [
        {
          name: "",
          tech_stack: "",
          start_date: "",
          end_date: "",
          project_des: {
            lines: [""],
          },
        },
      ],
    },
    skills: {
      categories: [
        {
          category_name: "",
          items: [""],
        },
      ],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { submitResume } = useResume();

  // Personal Information Updates
  const updatePersonal = (field, value) => {
    setData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // Education Updates
  const updateEducation = (index, field, value) => {
    const updated = [...data.education.educations];
    updated[index][field] = value;
    setData(prev => ({
      ...prev,
      education: { educations: updated },
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: {
        educations: [
          ...prev.education.educations,
          {
            school: "",
            degree: "",
            start_date: "",
            end_date: "",
            address: "",
          },
        ],
      },
    }));
  };

  const removeEducation = (index) => {
    if (data.education.educations.length > 1) {
      setData(prev => ({
        ...prev,
        education: {
          educations: prev.education.educations.filter((_, i) => i !== index),
        },
      }));
    }
  };

  // Experience Updates
  const updateExperience = (index, field, value) => {
    const updated = [...data.experience.experiences];
    if (field === "job_des") {
      updated[index].job_des.lines[0] = value;
    } else {
      updated[index][field] = value;
    }
    setData(prev => ({
      ...prev,
      experience: { experiences: updated },
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: {
        experiences: [
          ...prev.experience.experiences,
          {
            position: "",
            start_date: "",
            end_date: "",
            company_name: "",
            company_address: "",
            job_des: {
              lines: [""],
            },
          },
        ],
      },
    }));
  };

  const removeExperience = (index) => {
    if (data.experience.experiences.length > 1) {
      setData(prev => ({
        ...prev,
        experience: {
          experiences: prev.experience.experiences.filter((_, i) => i !== index),
        },
      }));
    }
  };

  // Project Updates
  const updateProject = (index, field, value) => {
    const updated = [...data.project.projects];
    if (field === "project_des") {
      updated[index].project_des.lines[0] = value;
    } else {
      updated[index][field] = value;
    }
    setData(prev => ({
      ...prev,
      project: { projects: updated },
    }));
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      project: {
        projects: [
          ...prev.project.projects,
          {
            title: "",
            tech_stack: "",
            start_date: "",
            end_date: "",
            project_des: {
              lines: [""],
            },
          },
        ],
      },
    }));
  };

  const removeProject = (index) => {
    if (data.project.projects.length > 1) {
      setData(prev => ({
        ...prev,
        project: {
          projects: prev.project.projects.filter((_, i) => i !== index),
        },
      }));
    }
  };

  // Skills Updates
  const updateSkills = (index, field, value) => {
    const updated = [...data.skills.categories];
    if (field === "name") {
      updated[index].name = value;
    } else if (field === "items") {
      updated[index].items[0] = value;
    }
    setData(prev => ({
      ...prev,
      skills: { categories: updated },
    }));
  };

  const addSkillCategory = () => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: [
          ...prev.skills.categories,
          {
            name: "",
            items: [""],
          },
        ],
      },
    }));
  };

  const removeSkillCategory = (index) => {
    if (data.skills.categories.length > 1) {
      setData(prev => ({
        ...prev,
        skills: {
          categories: prev.skills.categories.filter((_, i) => i !== index),
        },
      }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const { personal } = data;
    if (!personal.fullname || !personal.email || !personal.number) {
      return "Please fill in required personal information (Name, Email, Phone)";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({ type: 'error', message: validationError });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitResume(data);
      setSubmitStatus({ 
        type: 'success', 
        message: '🎉 Resume submitted successfully!' 
      });
    } catch (err) {
      setSubmitStatus({ 
        type: 'error', 
        message: '❌ Failed to submit resume. Please try again.' 
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 pt-28 px-4 sm:px-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl border border-white/20">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Build Your Resume
        </h1>

        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            submitStatus.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/30 text-green-100' 
              : 'bg-red-500/20 border border-red-500/30 text-red-100'
          }`}>
            <AlertCircle className="w-5 h-5" />
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Information */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(data.personal).map((key) => (
                <Input
                  key={key}
                  label={formatLabel(key)}
                  value={data.personal[key]}
                  onChange={(e) => updatePersonal(key, e.target.value)}
                  required={['fullname', 'email', 'number'].includes(key)}
                />
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            {data.education.educations.map((edu, index) => (
              <div key={index} className="border border-white/20 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Education {index + 1}</h4>
                  {data.education.educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(edu).map((key) => (
                    <Input
                      key={key}
                      label={formatLabel(key)}
                      value={edu[key]}
                      onChange={(e) => updateEducation(index, key, e.target.value)}
                      type={key.includes('date') ? 'date' : 'text'}
                    />
                  ))}
                </div>
              </div>
            ))}
            <AddButton onClick={addEducation} text="Add Education" />
          </Section>

          {/* Experience */}
          <Section title="Experience">
            {data.experience.experiences.map((exp, index) => (
              <div key={index} className="border border-white/20 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Experience {index + 1}</h4>
                  {data.experience.experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(exp).map(([key, val]) =>
                    key === "job_des" ? (
                      <div key={key} className="md:col-span-2">
                        <textarea
                          placeholder="Job Description"
                          value={val.lines[0]}
                          onChange={(e) => updateExperience(index, "job_des", e.target.value)}
                          rows="4"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-vertical"
                        />
                      </div>
                    ) : (
                      <Input
                        key={key}
                        label={formatLabel(key)}
                        value={val}
                        onChange={(e) => updateExperience(index, key, e.target.value)}
                        type={key.includes('date') ? 'date' : 'text'}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
            <AddButton onClick={addExperience} text="Add Experience" />
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {data.project.projects.map((proj, index) => (
              <div key={index} className="border border-white/20 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Project {index + 1}</h4>
                  {data.project.projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(proj).map(([key, val]) =>
                    key === "project_des" ? (
                      <div key={key} className="md:col-span-2">
                        <textarea
                          placeholder="Project Description"
                          value={val.lines[0]}
                          onChange={(e) => updateProject(index, "project_des", e.target.value)}
                          rows="4"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-vertical"
                        />
                      </div>
                    ) : (
                      <Input
                        key={key}
                        label={formatLabel(key)}
                        value={val}
                        onChange={(e) => updateProject(index, key, e.target.value)}
                        type={key.includes('date') ? 'date' : 'text'}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
            <AddButton onClick={addProject} text="Add Project" />
          </Section>

          {/* Skills */}
          <Section title="Skills">
            {data.skills.categories.map((category, index) => (
              <div key={index} className="border border-white/20 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Skill Category {index + 1}</h4>
                  {data.skills.categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkillCategory(index)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Category Name"
                    value={category.name}
                    onChange={(e) => updateSkills(index, "name", e.target.value)}
                    placeholder="e.g., Programming Languages"
                  />
                  <Input
                    label="Skills"
                    value={category.items[0]}
                    onChange={(e) => updateSkills(index, "items", e.target.value)}
                    placeholder="e.g., JavaScript, Python, React"
                  />
                </div>
              </div>
            ))}
            <AddButton onClick={addSkillCategory} text="Add Skill Category" />
          </Section>

          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold ${
                isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25 transform hover:scale-105'
              } text-white`}
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Submit Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper Components
const Input = ({ label, value, onChange, type = "text", required = false, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-purple-300 mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
      {title}
    </h2>
    {children}
  </div>
);

const AddButton = ({ onClick, text }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-purple-400/50 rounded-lg text-purple-300 hover:text-purple-200 hover:border-purple-400 transition-all duration-200"
  >
    <Plus className="w-5 h-5" />
    {text}
  </button>
);

// Utility function to format field labels
const formatLabel = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default ResumeForm;