import Input from "./ui/Input";
import AddButton from "./ui/AddButton";
import { Trash2 } from "lucide-react";

export default function ExperienceForm({ data, updateField, addItem, removeItem, errors }) {
  const list = data.experience?.experiences || [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Experience (Optional)</h3>
      {list.map((exp, idx) => (
        <div key={idx} className="border border-white/20 rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Experience {idx + 1}</h4>
            <button type="button" onClick={() => removeItem("experience.experiences", idx)} className="text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Position" value={exp.position} onChange={(e) => updateField(`experience.experiences.${idx}.position`, e.target.value)} />
            <Input label="Company Name" value={exp.company_name} onChange={(e) => updateField(`experience.experiences.${idx}.company_name`, e.target.value)} />
            <Input label="Start Date" type="month" value={exp.start_date} onChange={(e) => updateField(`experience.experiences.${idx}.start_date`, e.target.value)} />
            <Input label="End Date" type="month" value={exp.end_date} onChange={(e) => updateField(`experience.experiences.${idx}.end_date`, e.target.value)} />
            <Input label="Address" value={exp.address} onChange={(e) => updateField(`experience.experiences.${idx}.address`, e.target.value)} />
          </div>

          {/* Job description lines */}
          <div className="md:col-span-2 mt-4">
            <label className="block text-sm font-medium text-purple-300 mb-2">Job Description</label>
            {(exp.job_des?.lines || []).map((line, lineIdx) => (
              <div key={lineIdx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Description line"
                  value={line || ""}
                  onChange={(e) => updateField(`experience.experiences.${idx}.job_des.lines.${lineIdx}`, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                />
                <button type="button" onClick={() => updateField(`experience.experiences.${idx}.job_des.lines`, (arr = []) => {
                  // remove line
                  const copy = arr.slice();
                  if (copy.length > 1) copy.splice(lineIdx, 1);
                  else copy[0] = "";
                  return copy;
                })} className="text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <AddButton text="Add Line" onClick={() => updateField(`experience.experiences.${idx}.job_des.lines`, (arr = []) => [...(arr || []), ""])} />
          </div>

          <div className="text-sm text-red-300 mt-2">
            {errors[`experience.${idx}.company_name`] && <div>{errors[`experience.${idx}.company_name`]}</div>}
            {errors[`experience.${idx}.position`] && <div>{errors[`experience.${idx}.position`]}</div>}
            {errors[`experience.${idx}.dates`] && <div>{errors[`experience.${idx}.dates`]}</div>}
          </div>
        </div>
      ))}

      <AddButton text="Add Experience" onClick={() => addItem("experience.experiences", {
        position: "", start_date: "", end_date: "", company_name: "", address: "", job_des: { lines: [""] }
      })} />
    </div>
  );
}
