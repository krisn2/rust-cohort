use super::{
    education::EducationSchema,
    experience::ExperienceSchema,
    profile::Personal,
    projects::ProjectSchema,
    skills::SkillSchema,
};
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ResumeRequest {
    pub personal: Personal,
    pub education: EducationSchema,
    pub experience:  Option<ExperienceSchema>,
    pub projects:  Option<ProjectSchema>,
    pub skills: SkillSchema,
}