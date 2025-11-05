import { MinusCircle, PlusCircle } from "lucide-react";

export default function AccordionList({ data, isOpen, setIsOpen }) {
  const actve = data.id === isOpen;

  function handleTogle(id) {
    setIsOpen(isOpen === data.id ? null : id);
  }

  return (
   <div
  className="transition-all duration-300 ease-in-out hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl"
>
  <div
    onClick={() => handleTogle(data.id)}
    className="flex items-center gap-6 justify-between w-full px-6 py-5 text-left cursor-pointer"
  >
    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
      {data.title}
    </h3>

    <span
      className={`text-emerald-700 dark:text-emerald-400 transition-transform duration-300 ${
        actve ? "rotate-45" : "rotate-0"
      }`}
    >
      <PlusCircle className="w-6 h-6" />
    </span>
  </div>

  {/* Content */}
  <div
    className={`overflow-hidden transition-all duration-300 ease-in-out ${
      actve ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
    }`}
  >
    <p className="px-6 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed">
      {data.description}
    </p>
  </div>
</div>

  );
}
