// normalize.js
const isEmptyString = (s) => s === null || s === undefined || (typeof s === "string" && s.trim() === "");
const isArrEmpty = (arr) => !Array.isArray(arr) || arr.length === 0 || arr.every(isEmptyString);

export default function normalizeResumeData(data) {
  const out = JSON.parse(JSON.stringify(data)); // safe shallow clone for plain data

  // personal optional urls -> null
  ["web_url", "linkedin_url", "github_name", "github_url"].forEach(k => {
    if (out.personal && isEmptyString(out.personal[k])) out.personal[k] = null;
  });

  // experiences
  const ex = (out.experience?.experiences || []).filter(exp => {
    const hasNonEmptyLine = (exp.job_des?.lines || []).some(l => !isEmptyString(l));
    return !(
      isEmptyString(exp.position) && isEmptyString(exp.start_date) && isEmptyString(exp.end_date) &&
      isEmptyString(exp.company_name) && isEmptyString(exp.address) && !hasNonEmptyLine
    );
  });
  if (ex.length) out.experience = { experiences: ex };
  else delete out.experience;

  // projects
  const pr = (out.projects?.projects || []).filter(p => {
    const hasDes = (p.project_des?.lines || []).some(l => !isEmptyString(l));
    return !(
      isEmptyString(p.name) && isEmptyString(p.tech_stack) && isEmptyString(p.start_date) &&
      isEmptyString(p.end_date) && !hasDes
    );
  });
  if (pr.length) out.projects = { projects: pr };
  else delete out.projects;

  // skills
  const cats = (out.skills?.categories || []).map(cat => ({
    ...cat,
    items: (cat.items || []).filter(it => !isEmptyString(it)),
  })).filter(cat => !isEmptyString(cat.category_name) && (cat.items || []).length > 0);
  if (cats.length) out.skills = { categories: cats };
  else delete out.skills;

  // certifications
  const certs = (out.certifications?.certifications || []).map(c => ({
    ...c,
    details: (c.details || []).filter(d => !isEmptyString(d)),
  })).filter(c => !isEmptyString(c.title) || !isEmptyString(c.issuer) || !isEmptyString(c.certificate_url) || (c.details || []).length > 0);
  if (certs.length) out.certifications = { certifications: certs };
  else delete out.certifications;

  return out;
}
