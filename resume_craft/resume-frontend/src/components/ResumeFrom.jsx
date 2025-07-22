import { useState } from "react";
import { useResume } from "../context/ResumeContext";

const ResumeForm = () => {
  const [Data, setData] = useState({
    personal: {
      fullname: "",
      number: "",
      email: "",
      linkedin_name: "",
      linkedin_url: "",
      github_name: "",
      github_url: "",
      website: "",
      address: "",
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
          company_address: "",
          job_des: {
            lines: [""],
          },
        },
      ],
    },
    project: {
      projects: [
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
    skills: {
      categories: [
        {
          name: "",
          items: [""],
        },
      ],
    },
  });

  const { submitResume } = useResume();

  const updatePersonal = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      personal: {
        ...prevData.personal,
        [field]: value,
      },
    }));
  };

  const updateEducation = (field, value) => {
    const updated = [...Data.education.educations];
    updated[0][field] = value;
    setData((prevData) => ({
      ...prevData,
      education: { educations: updated },
    }));
  };

  const updateExperience = (field, value) => {
    const updated = [...Data.experience.experiences];
    if (field === "job_des") {
      updated[0].job_des.lines[0] = value;
    } else {
      updated[0][field] = value;
    }
    setData((prevData) => ({
      ...prevData,
      experience: { experiences: updated },
    }));
  };

  const updateProject = (field, value) => {
    const updated = [...Data.project.projects];
    if (field === "project_des") {
      updated[0].project_des.lines[0] = value;
    } else {
      updated[0][field] = value;
    }
    setData((prevData) => ({
      ...prevData,
      project: { projects: updated },
    }));
  };

  const updateSkills = (field, value) => {
    const updated = [...Data.skills.categories];
    if (field === "name") {
      updated[0].name = value;
    } else if (field === "items") {
      updated[0].items[0] = value;
    }
    setData((prevData) => ({
      ...prevData,
      skills: { categories: updated },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitResume(Data);
      alert("🎉 Resume submitted successfully!");
    } catch (err) {
      alert("❌ Failed to submit resume.", err);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl border border-white/20">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Build Your Resume
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Information */}
          <Section title="Personal Information">
            {Object.keys(Data.personal).map((key) => (
              <Input
                key={key}
                label={key}
                value={Data.personal[key]}
                onChange={(e) => updatePersonal(key, e.target.value)}
              />
            ))}
          </Section>

          {/* Education */}
          <Section title="Education">
            {Object.keys(Data.education.educations[0]).map((key) => (
              <Input
                key={key}
                label={key}
                value={Data.education.educations[0][key]}
                onChange={(e) => updateEducation(key, e.target.value)}
              />
            ))}
          </Section>

          {/* Experience */}
          <Section title="Experience">
            {Object.entries(Data.experience.experiences[0]).map(([key, val]) =>
              key === "job_des" ? (
                <textarea
                  key={key}
                  placeholder="Job Description"
                  value={val.lines[0]}
                  onChange={(e) => updateExperience("job_des", e.target.value)}
                  className="form-textarea"
                />
              ) : (
                <Input
                  key={key}
                  label={key}
                  value={val}
                  onChange={(e) => updateExperience(key, e.target.value)}
                />
              )
            )}
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {Object.entries(Data.project.projects[0]).map(([key, val]) =>
              key === "project_des" ? (
                <textarea
                  key={key}
                  placeholder="Project Description"
                  value={val.lines[0]}
                  onChange={(e) => updateProject("project_des", e.target.value)}
                  className="form-textarea"
                />
              ) : (
                <Input
                  key={key}
                  label={key}
                  value={val}
                  onChange={(e) => updateProject(key, e.target.value)}
                />
              )
            )}
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <Input
              label="Category"
              value={Data.skills.categories[0].name}
              onChange={(e) => updateSkills("name", e.target.value)}
            />
            <Input
              label="Skill"
              value={Data.skills.categories[0].items[0]}
              onChange={(e) => updateSkills("items", e.target.value)}
            />
          </Section>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Submit Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, value, onChange }) => (
  <input
    type="text"
    placeholder={label.replace("_", " ")}
    value={value}
    onChange={onChange}
    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
  />
);

// Reusable Section Wrapper
const Section = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

export default ResumeForm;
