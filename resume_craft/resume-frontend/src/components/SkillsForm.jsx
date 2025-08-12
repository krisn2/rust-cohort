import Input from "./ui/Input";
import AddButton from "./ui/AddButton";
import { Trash2 } from "lucide-react";

export default function SkillsForm({ data, updateField, addItem, removeItem, errors }) {
  const cats = data.skills?.categories || [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Skills</h3>
      {cats.map((cat, idx) => (
        <div key={idx} className="border border-white/20 rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Category {idx + 1}</h4>
            <button type="button" onClick={() => removeItem("skills.categories", idx)} className="text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <Input label="Category Name" value={cat.category_name} onChange={(e) => updateField(`skills.categories.${idx}.category_name`, e.target.value)} />

          <div className="mt-3">
            {(cat.items || []).map((it, itIdx) => (
              <div key={itIdx} className="flex items-center gap-2 mb-2">
                <input value={it || ""} onChange={(e) => updateField(`skills.categories.${idx}.items.${itIdx}`, e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <button type="button" onClick={() => updateField(`skills.categories.${idx}.items`, (arr = []) => {
                  const copy = arr.slice();
                  if (copy.length > 1) copy.splice(itIdx, 1);
                  else copy[0] = "";
                  return copy;
                })} className="text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <AddButton text="Add Skill" onClick={() => updateField(`skills.categories.${idx}.items`, (arr = []) => [...(arr || []), ""])} />
            <div className="text-sm text-red-300 mt-2">
              {errors[`skills.${idx}.category_name`] && <div>{errors[`skills.${idx}.category_name`]}</div>}
              {errors[`skills.${idx}.items`] && <div>{errors[`skills.${idx}.items`]}</div>}
            </div>
          </div>
        </div>
      ))}

      <AddButton text="Add Skill Category" onClick={() => addItem("skills.categories", { category_name: "", items: [""] })} />
    </div>
  );
}
