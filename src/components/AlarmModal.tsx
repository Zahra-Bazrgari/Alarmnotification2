import React from "react";

interface Alarm {
  id: number;
  title: string;
  description: string;
  time: string;
  dateCreated: number;
}

interface AlarmModalProps {
  alarm: Alarm;
  onSnooze: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ alarm, onSnooze, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Alarm Ringing</h2>
        <h3 className="text-xl font-semibold">{alarm.title}</h3>
        <p className="text-gray-600 mb-4">{alarm.description}</p>
        <p className="text-blue-500 mb-4">Time: {alarm.time}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={onSnooze}
          >
            Snooze 10 min
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
