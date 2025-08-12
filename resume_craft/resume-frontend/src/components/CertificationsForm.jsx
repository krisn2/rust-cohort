import Input from "./ui/Input";
import AddButton from "./ui/AddButton";
import { Trash2 } from "lucide-react";

export default function CertificationsForm({ data, updateField, addItem, removeItem, errors }) {
  const certs = data.certifications?.certifications || [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Certifications</h3>
      {certs.map((c, idx) => (
        <div key={idx} className="border border-white/20 rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Certification {idx + 1}</h4>
            <button type="button" onClick={() => removeItem("certifications.certifications", idx)} className="text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={c.title} onChange={(e) => updateField(`certifications.certifications.${idx}.title`, e.target.value)} />
            <Input label="Date" value={c.date} onChange={(e) => updateField(`certifications.certifications.${idx}.date`, e.target.value)} />
            <Input label="Issuer" value={c.issuer} onChange={(e) => updateField(`certifications.certifications.${idx}.issuer`, e.target.value)} />
            <Input label="Certificate URL" type="url" value={c.certificate_url} onChange={(e) => updateField(`certifications.certifications.${idx}.certificate_url`, e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-purple-300 mb-2">Details</label>
            {(c.details || []).map((d, dIdx) => (
              <div key={dIdx} className="flex items-center gap-2 mb-2">
                <input value={d || ""} onChange={(e) => updateField(`certifications.certifications.${idx}.details.${dIdx}`, e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300" />
                <button type="button" onClick={() => updateField(`certifications.certifications.${idx}.details`, (arr = []) => {
                  const copy = arr.slice();
                  if (copy.length > 1) copy.splice(dIdx, 1);
                  else copy[0] = "";
                  return copy;
                })} className="text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <AddButton text="Add Detail" onClick={() => updateField(`certifications.certifications.${idx}.details`, (arr = []) => [...(arr || []), ""])} />
          </div>

          <div className="text-sm text-red-300 mt-2">
            {errors[`certifications.${idx}.title`] && <div>{errors[`certifications.${idx}.title`]}</div>}
            {errors[`certifications.${idx}.certificate_url`] && <div>{errors[`certifications.${idx}.certificate_url`]}</div>}
          </div>
        </div>
      ))}
      <AddButton text="Add Certification" onClick={() => addItem("certifications.certifications", { title: "", date: "", issuer: "", certificate_url: "", details: [""] })} />
    </div>
  );
}
