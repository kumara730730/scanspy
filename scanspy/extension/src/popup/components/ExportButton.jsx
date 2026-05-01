import { useToast } from "../context/ToastContext";

export default function ExportButton({ label, onExport }) {
  const { push } = useToast();
  const handleClick = () => {
    onExport();
    push({ tone: "success", message: `${label} exported` });
  };

  return (
    <button
      onClick={handleClick}
      className="rounded border border-cyber-teal/50 bg-cyan-500/10 px-3 py-2 text-sm hover:shadow-glow"
    >
      {label}
    </button>
  );
}
