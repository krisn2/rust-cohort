// validators.js
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRe = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
const phoneRe = /^[0-9+\-\s()]{6,20}$/;

const isEmpty = (v) => v === null || v === undefined || (typeof v === "string" && v.trim() === "");

export function validateResume(state) {
  const errors = {};

  // personal
  const p = state.personal || {};
  if (isEmpty(p.fullname)) errors.fullname = "Full name is required.";
  if (isEmpty(p.email)) errors.email = "Email is required.";
  else if (!emailRe.test(String(p.email).trim()))
    errors.email = "Enter a valid email address.";
  if (isEmpty(p.number)) errors.number = "Phone number is required.";
  else if (!phoneRe.test(String(p.number).trim()))
    errors.number = "Enter a valid phone number.";

  // education: ensure if any education exists then school & degree are provided
  (state.education?.educations || []).forEach((edu, i) => {
    if (!isEmpty(edu.school) || !isEmpty(edu.degree) || !isEmpty(edu.start_date) || !isEmpty(edu.end_date)) {
      if (isEmpty(edu.school)) errors[`education.${i}.school`] = "School/college is required.";
      if (isEmpty(edu.degree)) errors[`education.${i}.degree`] = "Degree is required.";
      // optional: check start <= end if both present
      if (!isEmpty(edu.start_date) && !isEmpty(edu.end_date)) {
        if (new Date(edu.start_date) > new Date(edu.end_date))
          errors[`education.${i}.dates`] = "Start date must be before end date.";
      }
    }
  });

  // experience: if any fields exist, company_name or position required
  (state.experience?.experiences || []).forEach((exp, i) => {
    if (!isEmpty(exp.position) || !isEmpty(exp.company_name) || (exp.job_des?.lines || []).some(l => !isEmpty(l))) {
      if (isEmpty(exp.company_name)) errors[`experience.${i}.company_name`] = "Company name is required.";
      if (isEmpty(exp.position)) errors[`experience.${i}.position`] = "Position is required.";
      if (!isEmpty(exp.start_date) && !isEmpty(exp.end_date)) {
        if (new Date(exp.start_date) > new Date(exp.end_date))
          errors[`experience.${i}.dates`] = "Start date must be before end date.";
      }
    }
  });

  // projects: if project is partially filled require name
  (state.project?.projects || []).forEach((proj, i) => {
    if (!isEmpty(proj.name) || !isEmpty(proj.tech_stack) || (proj.project_des?.lines || []).some(l => !isEmpty(l))) {
      if (isEmpty(proj.name)) errors[`projects.${i}.name`] = "Project name is required.";
    }
  });

  // skills: category name required when items filled
  (state.skills?.categories || []).forEach((cat, i) => {
    if (!isEmpty(cat.category_name) || (cat.items || []).some(it => !isEmpty(it))) {
      if (isEmpty(cat.category_name)) errors[`skills.${i}.category_name`] = "Category name is required.";
      if (!(cat.items || []).some(it => !isEmpty(it))) errors[`skills.${i}.items`] = "Add at least one skill.";
    }
  });

  // certifications: if any field present require title
  (state.certifications?.certifications || []).forEach((c, i) => {
    if (!isEmpty(c.title) || !isEmpty(c.issuer) || !isEmpty(c.certificate_url) || (c.details || []).some(d => !isEmpty(d))) {
      if (isEmpty(c.title)) errors[`certifications.${i}.title`] = "Certification title is required.";
      if (!isEmpty(c.certificate_url) && !urlRe.test(String(c.certificate_url).trim()))
        errors[`certifications.${i}.certificate_url`] = "Invalid URL.";
    }
  });

  return errors;
}
