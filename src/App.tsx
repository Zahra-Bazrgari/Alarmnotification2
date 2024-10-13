import React, { useState, useEffect } from "react";
import AlarmForm from "./components/AlarmForm";
import AlarmList from "./components/AlarmList";
import AlarmModal from "./components/AlarmModal";
import SortAlarms from "./components/SortAlarms";

interface Alarm {
  id: number;
  title: string;
  description: string;
  time: string;
  dateCreated: number;
}

const App: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAlarm, setEditAlarm] = useState<Alarm | null>(null);
  const [alarmToRing, setAlarmToRing] = useState<Alarm | null>(null);
  const [sortOption, setSortOption] = useState<"time" | "title">("time");

  useEffect(() => {
    const savedAlarms = JSON.parse(localStorage.getItem("alarms") || "[]");
    if (Array.isArray(savedAlarms)) {
      setAlarms(savedAlarms);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    const checkAlarms = () => {
      const currentTime = new Date().toTimeString().slice(0, 5);
      const matchingAlarms = alarms.filter(
        (alarm) => alarm.time === currentTime
      );
      if (matchingAlarms.length > 0) {
        matchingAlarms.forEach((alarm) => {
          setAlarmToRing(alarm);
        });
      }
    };
    const interval = setInterval(checkAlarms, 60000);

    checkAlarms();

    return () => clearInterval(interval);
  }, [alarms]);

  const handleAddAlarm = (alarm: Alarm) => {
    if (editAlarm) {
      setAlarms(alarms.map((a) => (a.id === editAlarm.id ? alarm : a)));
      setEditAlarm(null);
    } else {
      setAlarms([...alarms, alarm]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteAlarm = (id: number) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  const handleSort = (option: "time" | "title") => {
    setSortOption(option);
    const sortedAlarms = [...alarms].sort((a, b) => {
      return option === "time"
        ? a.time.localeCompare(b.time)
        : a.title.localeCompare(b.title);
    });
    setAlarms(sortedAlarms);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Alarm App</h1>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white h-12 px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Alarm
        </button>
        <SortAlarms sortOption={sortOption} onSort={handleSort} />
      </div>

      <AlarmList
        alarms={alarms}
        onDelete={handleDeleteAlarm}
        onEdit={(alarm) => {
          setEditAlarm(alarm);
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && (
        <AlarmForm
          onSubmit={handleAddAlarm}
          onClose={() => setIsModalOpen(false)}
          existingAlarm={editAlarm}
        />
      )}

      {alarmToRing && (
        <AlarmModal
          alarm={alarmToRing}
          onSnooze={() => {
            setAlarmToRing(null);
            setAlarms(
              alarms.map((a) =>
                a.id === alarmToRing.id
                  ? {
                      ...a,
                      time: new Date(new Date().getTime() + 10 * 60000)
                        .toTimeString()
                        .slice(0, 5),
                    }
                  : a
              )
            );
          }}
          onDelete={() => {
            handleDeleteAlarm(alarmToRing.id);
            setAlarmToRing(null);
          }}
          onClose={() => setAlarmToRing(null)}
        />
      )}
    </div>
  );
};

export default App;
