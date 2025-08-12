import Input from "./ui/Input";
import AddButton from "./ui/AddButton";
import { Trash2 } from "lucide-react";

const ProjectsForm = ({ data, updateField, addItem, removeItem, errors }) => {
  const list = data.projects?.projects || [];
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Projects (Optional)</h3>
      {list.map((project, idx) => (
        <div key={idx} className="border border-white/20 rounded-lg  p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Project {idx + 1}</h4>
            <button
              type="button"
              onClick={() => removeItem("projects.projects", idx)}
              className="text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Name"
              value={project.name}
              onChange={(e) =>
                updateField(`project.projects.${idx}.name`, e.target.value)
              }
            />
            <Input
              label="Project URL"
              value={project.tech_stack}
              onChange={(e) =>
                updateField(
                  `project.projects.${idx}.tech_stack`,
                  e.target.value
                )
              }
            />
            <Input
              label="Start Date"
              type="month"
              value={project.start_date}
              onChange={(e) =>
                updateField(
                  `project.projects.${idx}.start_date`,
                  e.target.value
                )
              }
            />
            <Input
              label="End Date"
              type="month"
              value={project.end_date}
              onChange={(e) =>
                updateField(`project.projects.${idx}.end_date`, e.target.value)
              }
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Project Description
            </label>
            {(project.project_des?.lines || []).map((line, lineIdx) => (
              <div key={lineIdx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Description line"
                  value={line || ""}
                  onChange={(e) =>
                    updateField(
                      `project.projects.${idx}.project_des.lines.${lineIdx}`,
                      e.target.value
                    )
                  }
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      `projects.projects.${idx}.project_des.lines`,
                      (arr = []) => {
                        // remove line
                        const copy = arr.slice();
                        if (copy.length > 1) copy.splice(lineIdx, 1);
                        else copy[0] = "";
                        return copy;
                      }
                    )
                  }
                  className="text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <AddButton
              text="Add Line"
              onClick={() =>
                updateField(
                  `projects.projects.${idx}.project_des.lines`,
                  (arr = []) => [...(arr || []), ""]
                )
              }
            />
          </div>
          <div className="text-sm text-red-300 mt-2">
            {errors[`projects.${idx}`] && (
              <div>{errors[`projects.${idx}`]}</div>
            )}
            {errors[`projects.${idx}.name`] && (
              <div>{errors[`projects.${idx}.name`]}</div>
            )}
            {errors[`projects.${idx}.tech_stack`] && (
              <div>{errors[`projects.${idx}.tech_stack`]}</div>
            )}
            {errors[`projects.${idx}.dates`] && (
              <div>{errors[`projects.${idx}.dates`]}</div>
            )}
            {errors[`projects.${idx}.description`] && (
              <div>{errors[`projects.${idx}.description`]}</div>
            )}
          </div>
        </div>
      ))}

      <AddButton text="Add Project" onClick={() => addItem("projects.projects", {
        name: "",
        tech_stack: "",
        start_date: "",
        end_date: "",
        project_des: { lines: [""] }
      })} />
    </div>
  );
};

export default ProjectsForm;
