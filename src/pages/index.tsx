import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [timer1, setTimer1] = useState(0);
  const [timer2, setTimer2] = useState(0);
  const [timer3, setTimer3] = useState(0);
  const [activeTimer, setActiveTimer] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const [isClicked, setIsClicked] = useState(false);
  const [inactiveTimer, setInactiveTimer] = useState(2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeTimer === 1 && isRunning) {
        setTimer1((prevTimer) => prevTimer + 1);
      }
    }, 10);
    return () => clearInterval(intervalId);
  }, [activeTimer, isRunning]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeTimer === 2 && isRunning) {
        setTimer2((prevTimer) => prevTimer + 1);
      }
    }, 10);
    return () => clearInterval(intervalId);
  }, [activeTimer, isRunning]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeTimer === 3) {
        setTimer3((prevTimer) => prevTimer + 1);
      }
    }, 10);
    return () => clearInterval(intervalId);
  }, [activeTimer, isRunning]);

  const handleToggle = () => {
    if (!isClicked) {
      setIsRunning((prevIsRunning) => !prevIsRunning);
      setIsClicked(true);
      setActiveTimer(2);
    }
    setActiveTimer((prevActiveTimer) => (prevActiveTimer === 1 ? 2 : 1));
  };

  const handleSleep = () => {
    setIsRunning(false);
    setIsClicked(false);
    setInactiveTimer(activeTimer);
    setActiveTimer(3);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer1(0);
    setTimer2(0);
    setTimer3(0);
    setActiveTimer(1);
    setIsClicked(false);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    // const milliseconds = time % 100;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#F6FFDE] to-[#c5ac72]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[#e2a130]">Work</span>
            <span className="text-[#617A55]"> Life</span>
            <span className="text-[#675D50]"> App</span>
          </h1>
          <div className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-1 md:gap-8">
            <button
              className="relative flex h-48 w-48 flex-col items-center justify-center gap-4 rounded-full bg-[#e2a130]/30 p-4 text-[#FFF8D6] hover:bg-[#e2a130]/20"
              onClick={handleToggle}
            >
              {(activeTimer === 1 ||
                (activeTimer === 3 && inactiveTimer === 1)) && (
                <span className="text-4xl font-bold tracking-tight text-[#e2a130]">
                  {formatTime(timer1)}
                </span>
              )}
              {(activeTimer === 2 ||
                (activeTimer === 3 && inactiveTimer === 2)) && (
                <span className="text- text-4xl font-bold tracking-tight text-[#617A55]">
                  {formatTime(timer2)}
                </span>
              )}
            </button>

            <button
              className="relative flex h-48 w-48 flex-col items-center justify-center gap-4 rounded-full bg-[#e2a130]/30 p-4 text-[#FFF8D6] hover:bg-[#e2a130]/20"
              onClick={handleSleep}
            >
              <span className="text- text-4xl font-bold tracking-tight text-[#675D50]">
                {formatTime(timer3)}
              </span>
            </button>

            <button
              className="relative flex h-12 w-48 flex-col items-center justify-center gap-4 rounded-full bg-[#e2a130]/30 p-4 text-[#FFF8D6] hover:bg-[#e2a130]/20"
              onClick={handleReset}
            >
              <span className="text-2xl font-bold tracking-tight">Reset</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
