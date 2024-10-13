import React from "react";

interface Alarm {
  id: number;
  title: string;
  description: string;
  time: string;
  dateCreated: number;
}

interface AlarmListProps {
  alarms: Alarm[];
  onDelete: (id: number) => void;
  onEdit: (alarm: Alarm) => void;
}

const AlarmList: React.FC<AlarmListProps> = ({ alarms, onDelete, onEdit }) => {
  return (
    <div className="mt-6">
      {alarms.length === 0 ? (
        <p className="text-gray-500">No alarms set.</p>
      ) : (
        alarms.map((alarm) => (
          <div key={alarm.id} className="flex justify-between items-center border p-4 mb-2 rounded">
            <div>
              <h3 className="text-lg font-semibold">{alarm.title}</h3>
              <p className="text-gray-600">{alarm.description}</p>
              <p className="text-blue-500">{alarm.time}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => onEdit(alarm)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => onDelete(alarm.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AlarmList;
