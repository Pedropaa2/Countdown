import './App.css'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ButtonCountDown from './components/form/button';
import InputCountdown from './components/form/input';


function App() {
  const [hour, setHour] = useState(undefined);
  const [minute, setMinute] = useState(undefined);
  const [second, setSecond] = useState(undefined);
  const [totalMilliseconds, setTotalMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (totalMilliseconds === 0) {
      setHour(undefined);
      setMinute(undefined);
      setSecond(undefined);
      setIsRunning(false);
    }
  }, [totalMilliseconds]);

  useEffect(() => {
    let interval;

    if (isRunning && totalMilliseconds > 0) {
      interval = setInterval(() => {
        setTotalMilliseconds((prev) => {
          const newTime = prev - 1000;

          if (newTime <= 0) {
            clearInterval(interval);
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalMilliseconds]);

  useEffect(() => {
    if (totalMilliseconds > 0) {
      const totalSeconds = Math.floor(totalMilliseconds / 1000);
      setHour(String(Math.floor(totalSeconds / 3600)).padStart(2, '0'));
      setMinute(String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'));
      setSecond(String(totalSeconds % 60).padStart(2, '0'));
    }
  }, [totalMilliseconds]);
  const handleForm = (data) => {
    const hours = Number(data.hours || 0);
    const minutes = Number(data.minutes || 0);
    const seconds = Number(data.seconds || 0);
    const totalMili = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  
    // Reset everything explicitly
    setIsRunning(false);
    setTotalMilliseconds(0); // Reset to 0
    setHour(undefined); // Reset hour
    setMinute(undefined); // Reset minute
    setSecond(undefined); // Reset second
  
    // Ensure new values are set after state has been reset
    setTimeout(() => {
      setHour(String(hours).padStart(2, '0'));
      setMinute(String(minutes).padStart(2, '0'));
      setSecond(String(seconds).padStart(2, '0'));
      setTotalMilliseconds(totalMili); // Set the new totalMilliseconds
      setIsRunning(true); // Start the timer with new values
    }, 0);
  };
  const handlePause = () => {
    setIsRunning(false); // Simply stop the timer
  };

  const handleResume = () => {
    setIsRunning(true); // Continue the timer
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleInputChange = (e, setFunction) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFunction(value);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <InputCountdown
        placeholder="HH"
        value={hour === undefined ? '' : hour}
        onChange={(e) => handleInputChange(e, setHour)}
        register={register("hours")}
      />
      <InputCountdown
        placeholder="MM"
        value={minute === undefined ? '' : minute}
        onChange={(e) => handleInputChange(e, setMinute)}
        register={register("minutes")}
      />
      <InputCountdown
        placeholder="SS"
        value={second === undefined ? '' : second}
        onChange={(e) => handleInputChange(e, setSecond)}
        register={register("seconds")}
      />
      {isRunning ? (
        <>
          <ButtonCountDown type="button" onClick={handlePause}>
            Pause
          </ButtonCountDown>
          <ButtonCountDown type="button" onClick={handleRestart}>
            Restart
          </ButtonCountDown>
        </>
      ) : totalMilliseconds > 0 ? (
        <ButtonCountDown type="button" onClick={handleResume}>
          Resume
        </ButtonCountDown>
      ) : (
        <ButtonCountDown type="submit">Start</ButtonCountDown>
      )}
    </form>
  );
}

export default App;