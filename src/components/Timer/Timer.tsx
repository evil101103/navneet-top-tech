import React, { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  initialMinutes: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialMinutes }) => {
  const [time, setTime] = useState<number>(initialMinutes * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return; 

    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          setIsActive(false);
          setHasEnded(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(initialMinutes * 60);
    setHasEnded(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <div>Time Remaining: {formatTime(time)}</div>
      <button onClick={startTimer} disabled={isActive}>Start</button>
      <button onClick={stopTimer} disabled={!isActive}>Stop</button>
      <button onClick={resetTimer} disabled={isActive}>Reset</button>
      {hasEnded && <div>Time is up!</div>}
    </div>
  );
};

export default CountdownTimer;
