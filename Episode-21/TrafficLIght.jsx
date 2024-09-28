import React, { useEffect, useState, useCallback } from "react";
import "./styles.css"

const lightDurations = {
  red: 10,
  yellow: 5,
  green: 15,
};

const TrafficLight = () => {
  const [activeLight, setActiveLight] = useState("red");
  const [time, setTime] = useState(lightDurations.red);

  const switchLight = useCallback((light) => {
    setActiveLight(light);
    setTime(lightDurations[light]);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          switch (activeLight) {
            case "red":
              switchLight("yellow");
              break;
            case "yellow":
              switchLight("green");
              break;
            case "green":
              switchLight("red");
              break;
            default:
              return prevTime;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [activeLight, switchLight]);

  const formattedTime = String(time).padStart(2, "0");

  return (
    <div className="container">
      <h1>Traffic Light</h1>
      <div className="box">
        <div
          className="light red"
          style={{ opacity: activeLight === "red" ? 1 : 0.1 }}
        ></div>
        <div
          className="light yellow"
          style={{ opacity: activeLight === "yellow" ? 1 : 0.1 }}
        ></div>
        <div
          className="light green"
          style={{ opacity: activeLight === "green" ? 1 : 0.1 }}
        ></div>
      </div>
      <h1>{formattedTime}</h1>
      <div className="btns">
        <button onClick={() => switchLight("red")}>Red</button>
        <button onClick={() => switchLight("yellow")}>Yellow</button>
        <button onClick={() => switchLight("green")}>Green</button>
      </div>
    </div>
  );
};

export default TrafficLight;
