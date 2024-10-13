import React from "react";

interface SortAlarmsProps {
  sortOption: 'time' | 'title';
  onSort: (option: 'time' | 'title') => void;
}

const SortAlarms: React.FC<SortAlarmsProps> = ({ sortOption, onSort }) => {
  return (
    <div className="flex space-x-2">
      <button
        className={`px-4 py-2 rounded ${sortOption === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => onSort('time')}
      >
        Sort by Time
      </button>
      <button
        className={`px-4 py-2 rounded ${sortOption === 'title' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => onSort('title')}
      >
        Sort by Title
      </button>
    </div>
  );
};

export default SortAlarms;
