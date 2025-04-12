function SkillSelector({ skill, onChange }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className={`w-8 h-8 rounded-md ${
            value <= skill
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onChange(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default SkillSelector;
