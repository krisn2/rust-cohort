import { Plus } from "lucide-react";
const AddButton = ({ onClick, text }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-purple-400/50 rounded-lg text-purple-300 hover:text-purple-200 hover:border-purple-400 transition-all duration-200"
  >
    <Plus className="w-5 h-5" />
    {text}
  </button>
);

export default AddButton;
