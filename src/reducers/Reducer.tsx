import React, { useState } from "react";
import CountdownTimer from "../components/Timer/Timer";

const Timer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Number(e.target.value));
  };

  const handleStartTimer = () => {
    setShowTimer(true);
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <input
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
        min="1"
        placeholder="Enter minutes"
      />
      <button onClick={handleStartTimer}>Start Timer</button>

      {showTimer && <CountdownTimer initialMinutes={minutes} />}
    </div>
  );
};

export default Timer;
