import { useState } from "react";

export default function AutoSuggestInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  suggestions = [],
}) {
  const [showList, setShowList] = useState(false);

  const filtered =
    value.trim().length === 0
      ? suggestions.slice(0, 5)
      : suggestions.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );

  const handleSelect = (val) => {
    // Update parent state
    onChange({ target: { name, value: val } });
    setShowList(false);
  };

  return (
    <div className="relative">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      <input
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-full p-3 border rounded dark:bg-gray-800 dark:border-gray-700"
        onChange={(e) => {
          onChange(e);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => {
          // delay hiding so click can register
          setTimeout(() => setShowList(false), 150);
        }}
        autoComplete="off"
      />

      {showList && filtered.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-h-48 overflow-auto">
          {filtered.map((item) => (
            <div
              key={item}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onMouseDown={() => handleSelect(item)} 
              // Important: onMouseDown fires BEFORE blur
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
