import React from 'react';
import { dolchWords } from '../data/dolchWords';

interface GroupSelectorProps {
  selectedGroups: string[];
  onChange: (groups: string[]) => void;
}

export function GroupSelector({ selectedGroups, onChange }: GroupSelectorProps) {
  const toggleGroup = (grouping: string) => {
    const newSelection = selectedGroups.includes(grouping)
      ? selectedGroups.filter(g => g !== grouping)
      : [...selectedGroups, grouping];
    onChange(newSelection);
  };

  const toggleAll = () => {
    onChange(selectedGroups.length === dolchWords.length 
      ? []
      : dolchWords.map(g => g.grouping));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="selectAll"
          checked={selectedGroups.length === dolchWords.length}
          onChange={toggleAll}
          className="rounded text-blue-600"
        />
        <label htmlFor="selectAll" className="text-gray-700 dark:text-gray-300">
          Select All
        </label>
      </div>
      {dolchWords.map((group) => (
        <div key={group.grouping} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={group.grouping}
            checked={selectedGroups.includes(group.grouping)}
            onChange={() => toggleGroup(group.grouping)}
            className="rounded text-blue-600"
          />
          <label htmlFor={group.grouping} className="text-gray-700 dark:text-gray-300">
            {group.grouping} ({group.words.length} words)
          </label>
        </div>
      ))}
    </div>
  );
}