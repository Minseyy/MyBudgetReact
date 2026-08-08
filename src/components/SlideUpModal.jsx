import { X } from "lucide-react";

export default function SlideUpModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="
    fixed bottom-0 left-0 right-0 z-50
    rounded-t-3xl
    bg-white
    shadow-2xl
    p-10
    w-full
    h-[85vh]
    animate-slide-up
        "
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">{title}</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {children}
      </div>
    </>
  );
}