import { useState } from "react";
import { Plus, Trash2, Save, AlertCircle } from "lucide-react";
import axios from "axios";

const ResumeForm = () => {
  // State for authentication token, loaded from localStorage (commented out for simplicity as per HTML form)
  const token = localStorage.getItem("auth_token") || "";

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
          end_date: "",
          company_name: "",
          address: "",
          job_des: {
            lines: [""], // Initialize with one empty line
          },
        },
      ],
    },
    // Corrected the key from 'project' to 'projects' to match backend expectation from HTML form
    projects: {
      projects: [
        {
          name: "",
          tech_stack: "",
          start_date: "",
          end_date: "",
          project_des: {
            lines: [""], // Initialize with one empty line
          },
        },
      ],
    },
    skills: {
      categories: [
        {
          category_name: "",
          items: [""], // Initialize with one empty item
        },
      ],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Personal Information Updates
  const updatePersonal = (field, value) => {
    setData((prev) => ({
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
    setData((prev) => ({
      ...prev,
      education: { educations: updated },
    }));
  };

  const addEducation = () => {
    setData((prev) => ({
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
      setData((prev) => ({
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
    updated[index][field] = value;
    setData((prev) => ({
      ...prev,
      experience: { experiences: updated },
    }));
  };

  const addJobDescriptionLine = (expIndex) => {
    const updatedExperiences = [...data.experience.experiences];
    if (!updatedExperiences[expIndex].job_des) {
      updatedExperiences[expIndex].job_des = { lines: [] };
    }
    updatedExperiences[expIndex].job_des.lines.push("");
    setData((prev) => ({
      ...prev,
      experience: { experiences: updatedExperiences },
    }));
  };

  const removeJobDescriptionLine = (expIndex, lineIndex) => {
    const updatedExperiences = [...data.experience.experiences];
    if (updatedExperiences[expIndex].job_des.lines.length > 1) {
      updatedExperiences[expIndex].job_des.lines.splice(lineIndex, 1);
      setData((prev) => ({
        ...prev,
        experience: { experiences: updatedExperiences },
      }));
    }
  };

  const updateJobDescriptionLine = (expIndex, lineIndex, value) => {
    const updatedExperiences = [...data.experience.experiences];
    updatedExperiences[expIndex].job_des.lines[lineIndex] = value;
    setData((prev) => ({
      ...prev,
      experience: { experiences: updatedExperiences },
    }));
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: {
        experiences: [
          ...prev.experience.experiences,
          {
            position: "",
            start_date: "",
            end_date: "",
            company_name: "",
            address: "",
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
      setData((prev) => ({
        ...prev,
        experience: {
          experiences: prev.experience.experiences.filter(
            (_, i) => i !== index
          ),
        },
      }));
    }
  };

  // Project Updates
  // Ensure this uses 'projects' not 'project' to match state structure
  const updateProject = (index, field, value) => {
    const updated = [...data.projects.projects];
    updated[index][field] = value;
    setData((prev) => ({
      ...prev,
      projects: { projects: updated },
    }));
  };

  const addProjectDescriptionLine = (projIndex) => {
    const updatedProjects = [...data.projects.projects];
    if (!updatedProjects[projIndex].project_des) {
      updatedProjects[projIndex].project_des = { lines: [] };
    }
    updatedProjects[projIndex].project_des.lines.push("");
    setData((prev) => ({
      ...prev,
      projects: { projects: updatedProjects },
    }));
  };

  const removeProjectDescriptionLine = (projIndex, lineIndex) => {
    const updatedProjects = [...data.projects.projects];
    if (updatedProjects[projIndex].project_des.lines.length > 1) {
      updatedProjects[projIndex].project_des.lines.splice(lineIndex, 1);
      setData((prev) => ({
        ...prev,
        projects: { projects: updatedProjects },
      }));
    }
  };

  const updateProjectDescriptionLine = (projIndex, lineIndex, value) => {
    const updatedProjects = [...data.projects.projects];
    updatedProjects[projIndex].project_des.lines[lineIndex] = value;
    setData((prev) => ({
      ...prev,
      projects: { projects: updatedProjects },
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: {
        // Use 'projects' here
        projects: [
          ...prev.projects.projects, // Use 'projects' here
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
    }));
  };

  const removeProject = (index) => {
    if (data.projects.projects.length > 1) {
      // Use 'projects' here
      setData((prev) => ({
        ...prev,
        projects: {
          // Use 'projects' here
          projects: prev.projects.projects.filter((_, i) => i !== index), // Use 'projects' here
        },
      }));
    }
  };

  // Skills Updates
  const updateSkillCategoryName = (index, value) => {
    const updated = [...data.skills.categories];
    updated[index].category_name = value;
    setData((prev) => ({
      ...prev,
      skills: { categories: updated },
    }));
  };

  const addSkillItem = (catIndex) => {
    const updatedCategories = [...data.skills.categories];
    if (!updatedCategories[catIndex].items) {
      updatedCategories[catIndex].items = [];
    }
    updatedCategories[catIndex].items.push("");
    setData((prev) => ({
      ...prev,
      skills: { categories: updatedCategories },
    }));
  };

  const removeSkillItem = (catIndex, itemIndex) => {
    const updatedCategories = [...data.skills.categories];
    if (updatedCategories[catIndex].items.length > 1) {
      updatedCategories[catIndex].items.splice(itemIndex, 1);
      setData((prev) => ({
        ...prev,
        skills: { categories: updatedCategories },
      }));
    }
  };

  const updateSkillItem = (catIndex, itemIndex, value) => {
    const updatedCategories = [...data.skills.categories];
    updatedCategories[catIndex].items[itemIndex] = value;
    setData((prev) => ({
      ...prev,
      skills: { categories: updatedCategories },
    }));
  };

  const addSkillCategory = () => {
    setData((prev) => ({
      ...prev,
      skills: {
        categories: [
          ...prev.skills.categories,
          {
            category_name: "",
            items: [""],
          },
        ],
      },
    }));
  };

  const removeSkillCategory = (index) => {
    if (data.skills.categories.length > 1) {
      setData((prev) => ({
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
    // Check if token exists before submission (if token is enabled)
    if (!token) {
      return "An authentication token is required to submit your resume. Please ensure you are logged in.";
    }
    return null;
  };

  const normalizeResumeData = (data) => {
    const normalizedPersonal = { ...data.personal };
    ["web_url", "linkedin_url", "github_name", "github_url"].forEach((key) => {
      if (normalizedPersonal[key]?.trim() === "")
        normalizedPersonal[key] = null;
    });

    // Ensure we are normalizing data.projects.projects
    const normalizedProjects = data.projects.projects.map((project) => {
      return {
        ...project,
        tech_stack:
          project.tech_stack?.trim() === "" ? null : project.tech_stack,
      };
    });

    return {
      ...data,
      personal: normalizedPersonal,
      projects: { projects: normalizedProjects }, // Use 'projects' here
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = normalizeResumeData(data);
      console.log("📦 Payload to submit:", payload);

      const res = await axios.post(
        `${import.meta.env.VITE_API}/resume`,
        payload,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Uncomment if token needed
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSubmitStatus({
        type: "success",
        message: "🎉 Resume downloaded successfully!",
      });
    } catch (err) {
      console.error("❌ Error submitting resume:", err);
      let errorMessage = `❌ Failed to download resume PDF. ${err.message}`;
      if (err.response && err.response.data) {
        try {
          const errorBlob = new Blob([err.response.data], {
            type: "application/json",
          });
          const reader = new FileReader();
          reader.onload = function () {
            try {
              const errorJson = JSON.parse(reader.result);
              errorMessage = `❌ Failed to download resume PDF. ${
                errorJson.message || JSON.stringify(errorJson)
              }`;
              setSubmitStatus({ type: "error", message: errorMessage });
            } catch (parseError) {
              setSubmitStatus({
                type: "error",
                message: `❌ Failed to download resume PDF. Server responded with status: ${err.response.status}`,
              });
            }
          };
          reader.readAsText(errorBlob);
        } catch (readError) {
          setSubmitStatus({
            type: "error",
            message: `❌ Failed to download resume PDF. Server responded with status: ${err.response.status}`,
          });
        }
      } else {
        setSubmitStatus({ type: "error", message: errorMessage });
      }
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
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              submitStatus.type === "success"
                ? "bg-green-500/20 border border-green-500/30 text-green-100"
                : "bg-red-500/20 border border-red-500/30 text-red-100"
            }`}
          >
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
                  type={
                    key.includes("url")
                      ? "url"
                      : key.includes("email")
                      ? "email"
                      : key.includes("number")
                      ? "tel"
                      : "text"
                  }
                  required={["fullname", "email", "number"].includes(key)}
                />
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            {data.education.educations.map((edu, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-6 mb-4"
              >
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
                  <Input
                    label="School/College"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, "school", e.target.value)}
                    type="text"
                    required={true}
                  />
                  <Input
                    label="Degree/10th/12th"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    type="text"
                    required={true}
                  />
                  <Input
                    label="Start Date"
                    value={edu.start_date}
                    onChange={(e) =>
                      updateEducation(index, "start_date", e.target.value)
                    }
                    type="month"
                    required={true}
                  />
                  <Input
                    label="End Date"
                    value={edu.end_date}
                    onChange={(e) =>
                      updateEducation(index, "end_date", e.target.value)
                    }
                    type="month"
                    required={true}
                  />
                  <Input
                    label="Address"
                    value={edu.address}
                    onChange={(e) =>
                      updateEducation(index, "address", e.target.value)
                    }
                    type="text"
                    required={true}
                  />
                </div>
              </div>
            ))}
            <AddButton onClick={addEducation} text="Add Education" />
          </Section>

          {/* Experience - Now Optional */}
          <Section title="Experience (Optional)">
            {data.experience.experiences.map((exp, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-6 mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">
                    Experience {index + 1}
                  </h4>
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
                  <Input
                    label="Position"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                  />
                  <Input
                    label="Company Name"
                    value={exp.company_name}
                    onChange={(e) =>
                      updateExperience(index, "company_name", e.target.value)
                    }
                  />
                  <Input
                    label="Start Date"
                    value={exp.start_date}
                    onChange={(e) =>
                      updateExperience(index, "start_date", e.target.value)
                    }
                    type="month"
                  />
                  <Input
                    label="End Date"
                    value={exp.end_date}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    type="month"
                  />
                  <Input
                    label="Address"
                    value={exp.address}
                    onChange={(e) =>
                      updateExperience(index, "address", e.target.value)
                    }
                  />
                  {/* Dynamic Job Description Lines */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Job Description
                    </label>
                    {exp.job_des.lines.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Description line"
                          value={line || ""}
                          onChange={(e) =>
                            updateJobDescriptionLine(index, lineIdx, e.target.value)
                          }
                          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {exp.job_des.lines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeJobDescriptionLine(index, lineIdx)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <AddButton onClick={() => addJobDescriptionLine(index)} text="Add Line" />
                  </div>
                </div>
              </div>
            ))}
            <AddButton onClick={addExperience} text="Add Experience" />
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {data.projects.projects.map((proj, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-6 mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Project {index + 1}</h4>
                  {data.projects.projects.length > 1 && (
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
                  <Input
                    label="Project Name"
                    value={proj.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    required={true}
                  />
                  <Input
                    label="Tech Stack"
                    value={proj.tech_stack}
                    onChange={(e) => updateProject(index, "tech_stack", e.target.value)}
                    required={true}
                  />
                  <Input
                    label="Start Date"
                    value={proj.start_date}
                    onChange={(e) => updateProject(index, "start_date", e.target.value)}
                    type="month"
                    required={true}
                  />
                  <Input
                    label="End Date"
                    value={proj.end_date}
                    onChange={(e) => updateProject(index, "end_date", e.target.value)}
                    type="month"
                    required={true}
                  />

                  {/* Dynamic Project Description Lines */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Project Description
                    </label>
                    {proj.project_des.lines.map((line, lineIdx) => (
                      <div key={lineIdx} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Description line"
                          value={line || ""}
                          onChange={(e) => updateProjectDescriptionLine(index, lineIdx, e.target.value)}
                          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {proj.project_des.lines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProjectDescriptionLine(index, lineIdx)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <AddButton onClick={() => addProjectDescriptionLine(index)} text="Add Line" />
                  </div>
                </div>
              </div>
            ))}
            <AddButton onClick={addProject} text="Add Project" />
          </Section>

          {/* Skills */}
          <Section title="Skills">
            {data.skills.categories.map((category, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-6 mb-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">
                    Skill Category {index + 1}
                  </h4>
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
                    value={category.category_name}
                    onChange={(e) =>
                      updateSkillCategoryName(index, e.target.value)
                    }
                    placeholder="e.g., Programming Languages"
                    required={true} // Category name is required in HTML
                  />
                  {/* Dynamic Skill Items */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Skills
                    </label>
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Skill"
                          value={item || ""}
                          onChange={(e) =>
                            updateSkillItem(index, itemIdx, e.target.value)
                          }
                          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {category.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkillItem(index, itemIdx)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <AddButton onClick={() => addSkillItem(index)} text="Add Skill" />
                  </div>
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
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25 transform hover:scale-105"
              } text-white`}
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? "Submitting..." : "Submit Resume"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper Components (remain mostly the same)
const Input = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}) => (
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
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export default ResumeForm;