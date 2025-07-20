import { useState } from "react";




const ResumeForm = () => {
  const [Data, setData] = useState({
    personal: {
      fullname:"",
      number:"",
      email:"",
      linkedin_name:"",
      linkedin_url:"",
      github_name:"",
      github_url:"",
      website:"",
      address:"",
    },
    education: {
      educations:[{
        school:"",
        degree:"",
        start_date:"",
        end_date:"",
        address:"",
      }]
    },
    experience:{
      experiences:[{
        position:"",
        start_date:"",
        end_data:"",
        company_name:"",
        company_address:"",
        job_des:{
          lines:[""],
        }
      }]
    },
    project:{
      projects:[{
        title:"",
        tech_stack:"",
        start_date:"",
        end_date:"",
        project_des:{
          lines:[""],
        }
      }]
    },
    skills:{
      categories:[{
        name:"",
        items:[""],
      }]
    }
  });

  const updatePersonal =(field, value) => {
    setData(prevData => ({
      ...prevData,
      personal:{
        ...prevData.personal,
        [field]: value
      }
    }))
  }

  const addEducation = () => {
    setData(prevData => ({
      ...prevData,
      education:{
        educations: [...prevData.education.educations, {
          school:"",
          degree:"",
          start_date:"",
          end_date:"",
          address:""
        }]
      }
    }))
  }

  const updateEducation = (index, field, value)=> {
    setData(prevData => ({
      ...prevData,
      education:{
        educations: prevData.education.educations.map((edu, i)=>
          i === index ? {...edu, [field]: value} : edu
        )
      }
    }))
  }

  const removeEducation = (index) => {
    setData(prevData => ({
      ...prevData,
      education:{
        educations: prevData.education.educations.filter((_, i)=> i !== index)
      }
    }))
  }

  const addExperience = () => {
    setData(prevData => ({
      ...prevData,
      experience:{
        experiences: [...prevData.experience.experiences, {
          position:"",
          start_date:"",
          end_data:"",
          company_name:"",
          company_address:"",
          job_des:{
            lines:[""],
          }
        }]
      }
    }))
  }

  const updateExperience = (index, field, value) => {
    setData(prevData => ({
      ...prevData,
      experience:{
        experiences: prevData.experience.experiences.map((exp, i) =>
          i === index ? {...exp, [field]: value} : exp
        )
      }
    }))
  }

  const updateExperienceDescription = (expIndex, lineIndex, value) => {
    setData(prev => ({
      ...prev,
      experience: {
        experiences: prev.experience.experiences.map((exp, i) => 
          i === expIndex ? {
            ...exp,
            job_des: {
              lines: exp.job_des.lines.map((line, j) => j === lineIndex ? value : line)
            }
          } : exp
        )
      }
    }));
  };

  const addExperienceDescription = (expIndex) => {
    setData(prev => ({
      ...prev,
      experience: {
        experiences: prev.experience.experiences.map((exp, i) => 
          i === expIndex ? {
            ...exp,
            job_des: { lines: [...exp.job_des.lines, ""] }
          } : exp
        )
      }
    }));
  };

  const removeExperienceDescription = (expIndex, lineIndex) => {
    setData(prev => ({
      ...prev,
      experience: {
        experiences: prev.experience.experiences.map((exp, i) => 
          i === expIndex ? {
            ...exp,
            job_des: { lines: exp.job_des.lines.filter((_, j) => j !== lineIndex) }
          } : exp
        )
      }
    }));
  };

  const removeExperience = (index) => {
    setData(prev => ({
      ...prev,
      experience: {
        experiences: prev.experience.experiences.filter((_, i) => i !== index)
      }
    }));
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: {
        projects: [...prev.projects.projects, {
          name: "",
          tech_stack: "",
          start_date: "",
          end_date: "",
          project_des: { lines: [""] }
        }]
      }
    }));
  };

  const updateProject = (index, field, value) => {
    setData(prev => ({
      ...prev,
      projects: {
        projects: prev.projects.projects.map((proj, i) => 
          i === index ? { ...proj, [field]: value } : proj
        )
      }
    }));
  };

  const updateProjectDescription = (projIndex, lineIndex, value) => {
    setData(prev => ({
      ...prev,
      projects: {
        projects: prev.projects.projects.map((proj, i) => 
          i === projIndex ? {
            ...proj,
            project_des: {
              lines: proj.project_des.lines.map((line, j) => j === lineIndex ? value : line)
            }
          } : proj
        )
      }
    }));
  };

  const addProjectDescription = (projIndex) => {
    setData(prev => ({
      ...prev,
      projects: {
        projects: prev.projects.projects.map((proj, i) => 
          i === projIndex ? {
            ...proj,
            project_des: { lines: [...proj.project_des.lines, ""] }
          } : proj
        )
      }
    }));
  };

  const removeProjectDescription = (projIndex, lineIndex) => {
    setData(prev => ({
      ...prev,
      projects: {
        projects: prev.projects.projects.map((proj, i) => 
          i === projIndex ? {
            ...proj,
            project_des: { lines: proj.project_des.lines.filter((_, j) => j !== lineIndex) }
          } : proj
        )
      }
    }));
  };

  const removeProject = (index) => {
    setData(prev => ({
      ...prev,
      projects: {
        projects: prev.projects.projects.filter((_, i) => i !== index)
      }
    }));
  };

  const addSkillCategory = () => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: [...prev.skills.categories, {
          category_name: "",
          items: [""]
        }]
      }
    }));
  };

  const updateSkillCategory = (index, field, value) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map((cat, i) => 
          i === index ? { ...cat, [field]: value } : cat
        )
      }
    }));
  };

  const updateSkillItem = (catIndex, itemIndex, value) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map((cat, i) => 
          i === catIndex ? {
            ...cat,
            items: cat.items.map((item, j) => j === itemIndex ? value : item)
          } : cat
        )
      }
    }));
  };

  const addSkillItem = (catIndex) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map((cat, i) => 
          i === catIndex ? { ...cat, items: [...cat.items, ""] } : cat
        )
      }
    }));
  };

  const removeSkillItem = (catIndex, itemIndex) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.map((cat, i) => 
          i === catIndex ? { ...cat, items: cat.items.filter((_, j) => j !== itemIndex) } : cat
        )
      }
    }));
  };

  const removeSkillCategory = (index) => {
    setData(prev => ({
      ...prev,
      skills: {
        categories: prev.skills.categories.filter((_, i) => i !== index)
      }
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', JSON.stringify(Data, null, 2));
    alert('Resume data logged to console! Check the browser console (F12) to see the output.');
  };
  return (
   <div className="">
      
   </div>
  )
}

export default ResumeForm