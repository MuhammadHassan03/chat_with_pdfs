export default function Loader() {
  return (
    <div className="flex gap-1.5 p-4 bg-white border border-slate-100 rounded-2xl w-fit shadow-sm">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
    </div>
  );
}