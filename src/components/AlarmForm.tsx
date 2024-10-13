import React, { useState, useEffect } from "react";

interface AlarmFormProps {
  onSubmit: (alarm: { id: number; title: string; description: string; time: string }) => void;
  onClose: () => void;
  existingAlarm?: { id: number; title: string; description: string; time: string } | null;
}

const AlarmForm: React.FC<AlarmFormProps> = ({
  onSubmit,
  onClose,
  existingAlarm,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isValid, setIsValid] = useState(false);
  

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  const [touched, setTouched] = useState({
    title: false,
    description: false,
    time: false,
  });

  useEffect(() => {
    if (existingAlarm) {
      setTitle(existingAlarm.title);
      setDescription(existingAlarm.description);
      setTime(existingAlarm.time);
    }
  }, [existingAlarm]);

  const validateTime = (time: string): boolean => {
    const timeParts = time.split(":");
    if (timeParts.length !== 2) {
      setTimeError("Invalid time format");
      return false;
    }

    const [hours, minutes] = timeParts.map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      setTimeError("Invalid time format");
      return false;
    }
    if (hours < 0 || hours > 23 || minutes < 0 || minutes >= 60) {
      setTimeError("Hours must be between 0-23 and minutes between 0-59");
      return false;
    }
    setTimeError(null);
    return true;
  };

  const validateForm = () => {
    let valid = true;

    if (!title.trim()) {
      setTitleError("Title cannot be empty");
      valid = false;
    } else if (title.length > 50) {
      setTitleError("Title cannot be longer than 50 characters");
      valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(title)) {
      setTitleError("Title should only contain letters and spaces");
      valid = false;
    } else {
      setTitleError(null);
    }

    if (!description.trim()) {
      setDescriptionError("Description cannot be empty");
      valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(description)) {
      setDescriptionError("Description should only contain letters and spaces");
      valid = false;
    } else {
      setDescriptionError(null);
    }

    const timeValid = validateTime(time);
    valid = valid && timeValid;

    setIsValid(valid);
  };

  useEffect(() => {
    validateForm();
  }, [title, description, time]);

  const handleSubmit = () => {
    setTouched({ title: true, description: true, time: true });
    validateForm();
    if (isValid) {
      onSubmit({
        id: existingAlarm ? existingAlarm.id : Date.now(),
        title,
        description,
        time,
      });
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateForm();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {existingAlarm ? "Edit Alarm" : "Add Alarm"}
        </h2>
        
        <div className="mb-4">
          <input
            className={`border p-2 w-full ${titleError && touched.title ? "border-red-500" : "border-gray-300"}`}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleBlur('title')}
          />
          {titleError && touched.title && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
        </div>
        
        <div className="mb-4">
          <input
            className={`border p-2 w-full ${descriptionError && touched.description ? "border-red-500" : "border-gray-300"}`}
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => handleBlur('description')}
          />
          {descriptionError && touched.description && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
        </div>

        <div className="mb-4">
          <input
            className={`border p-2 w-full ${timeError && touched.time ? "border-red-500" : "border-gray-300"}`}
            type="text"
            placeholder="Time (HH:MM)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onBlur={() => handleBlur('time')}
          />
          {timeError && touched.time && <p className="text-red-500 text-sm mt-1">{timeError}</p>}
        </div>
        
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {existingAlarm ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmForm;
