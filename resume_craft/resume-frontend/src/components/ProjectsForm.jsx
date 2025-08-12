import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function ProjectsForm({ projects, onAdd, onUpdate, onRemove }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      {projects.map((project, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg mb-4 bg-gray-50 space-y-4"
        >
          {/* Project Name */}
          <input
            type="text"
            value={project.name || ""}
            onChange={(e) => onUpdate(index, "name", e.target.value)}
            placeholder="Project Name"
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* Description */}
          <textarea
            value={project.description || ""}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            placeholder="Brief Description"
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />

          {/* Tech Stack */}
          <input
            type="text"
            value={project.tech || ""}
            onChange={(e) => onUpdate(index, "tech", e.target.value)}
            placeholder="Tech Stack (comma separated)"
            className="w-full border rounded px-3 py-2"
          />

          {/* Links */}
          <input
            type="url"
            value={project.link || ""}
            onChange={(e) => onUpdate(index, "link", e.target.value)}
            placeholder="Project Link (optional)"
            className="w-full border rounded px-3 py-2"
          />

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} /> Remove Project
          </button>
        </div>
      ))}

      {/* Add Project Button */}
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
      >
        <Plus size={16} /> Add Project
      </button>
    </section>
  );
}
