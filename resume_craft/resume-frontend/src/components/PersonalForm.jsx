import Input from "./ui/Input";

export default function PersonalForm({ data, updateField, errors }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name" value={data.fullname} required onChange={(e) => updateField("personal.fullname", e.target.value)} />
        <Input label="Phone" value={data.number} required onChange={(e) => updateField("personal.number", e.target.value)} type="tel" />
        <Input label="Email" value={data.email} required onChange={(e) => updateField("personal.email", e.target.value)} type="email" />
        <Input label="Website" value={data.web_url} onChange={(e) => updateField("personal.web_url", e.target.value)} type="url" />
        <Input label="LinkedIn Name" value={data.linkedin_name} onChange={(e) => updateField("personal.linkedin_name", e.target.value)} />
        <Input label="LinkedIn URL" value={data.linkedin_url} onChange={(e) => updateField("personal.linkedin_url", e.target.value)} type="url" />
        <Input label="GitHub Name" value={data.github_name} onChange={(e) => updateField("personal.github_name", e.target.value)} />
        <Input label="GitHub URL" value={data.github_url} onChange={(e) => updateField("personal.github_url", e.target.value)} type="url" />
        <Input label="Address" value={data.address} onChange={(e) => updateField("personal.address", e.target.value)} />
      </div>
      <div className="text-sm text-red-300 mt-2">
        {errors.fullname && <div>{errors.fullname}</div>}
        {errors.email && <div>{errors.email}</div>}
        {errors.number && <div>{errors.number}</div>}
      </div>
    </div>
  );
}
