import React, { useState, useEffect } from "react";
import "./App.css";

export default function TimeManager() {
  const [stopwatch, setStopwatch] = useState(0); // Stopwatch time in milliseconds
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const [timer, setTimer] = useState(0); // Timer duration in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Stopwatch functionality
  useEffect(() => {
    let stopwatchInterval;
    if (isStopwatchRunning) {
      const start = Date.now() - stopwatch;
      stopwatchInterval = setInterval(() => {
        setStopwatch(Date.now() - start); // Update elapsed time
      }, 10); // Update every 10ms for smooth operation
    }
    return () => clearInterval(stopwatchInterval);
  }, [isStopwatchRunning, stopwatch]);

  // Timer functionality
  useEffect(() => {
    let timerInterval;
    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert("Timer finished!");
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);

  // Format time (HH:MM:SS:MS)
  const formatStopwatchTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
  };

  // Format time for the timer (HH:MM:SS)
  const formatTimerTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Time Manager Here</h1>

      {/* Stopwatch */}
      <div>
        <h2>Stopwatch</h2>
        <p>{formatStopwatchTime(stopwatch)}</p>
        <button
          onClick={() => setIsStopwatchRunning(true)}
          disabled={isStopwatchRunning} // Disable when running
        >
          Start
        </button>
        <button
          onClick={() => setIsStopwatchRunning(false)}
          disabled={!isStopwatchRunning} // Disable when stopped
        >
          Stop
        </button>
        <button
          onClick={() => {
            setStopwatch(0);
            setIsStopwatchRunning(false);
          }}
        >
          Reset
        </button>
      </div>

      {/* Timer */}
      <div>
        <h2>Timer</h2>
        <input
          type="number"
          placeholder="Enter seconds"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
        />
        <p>{formatTimerTime(timer)}</p>
        <button onClick={() => setIsTimerRunning(true)}>Start Timer</button>
        <button onClick={() => setIsTimerRunning(false)}>Pause</button>
        <button onClick={() => setTimer(0)}>Reset</button>
      </div>
    </div>
  </div>
  );
}
