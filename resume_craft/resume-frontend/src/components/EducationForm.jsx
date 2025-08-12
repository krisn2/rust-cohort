import Input from "./ui/Input";
import AddButton from "./ui/AddButton";
import { Trash2 } from "lucide-react";

export default function EducationForm({ data, updateField, addItem, removeItem, errors }) {
  const list = data.education?.educations || [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Education</h3>
      {list.map((edu, idx) => (
        <div key={idx} className="border border-white/20 rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Education {idx + 1}</h4>
            <button type="button" onClick={() => removeItem("education.educations", idx)} className="text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="School/College" value={edu.school} onChange={(e) => updateField(`education.educations.${idx}.school`, e.target.value)} required />
            <Input label="Degree/10th/12th" value={edu.degree} onChange={(e) => updateField(`education.educations.${idx}.degree`, e.target.value)} required />
            <Input label="Start Date" type="month" value={edu.start_date} onChange={(e) => updateField(`education.educations.${idx}.start_date`, e.target.value)} />
            <Input label="End Date" type="month" value={edu.end_date} onChange={(e) => updateField(`education.educations.${idx}.end_date`, e.target.value)} />
            <Input label="Address" value={edu.address} onChange={(e) => updateField(`education.educations.${idx}.address`, e.target.value)} />
          </div>
          <div className="text-sm text-red-300 mt-2">
            {errors[`education.${idx}.school`] && <div>{errors[`education.${idx}.school`]}</div>}
            {errors[`education.${idx}.degree`] && <div>{errors[`education.${idx}.degree`]}</div>}
            {errors[`education.${idx}.dates`] && <div>{errors[`education.${idx}.dates`]}</div>}
          </div>
        </div>
      ))}

      <AddButton text="Add Education" onClick={() => addItem("education.educations", { school: "", degree: "", start_date: "", end_date: "", address: "" })} />
    </div>
  );
}
