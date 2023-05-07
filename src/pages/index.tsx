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

  const handleWork = () => {
    if (!isClicked) {
      setIsRunning((prevIsRunning) => !prevIsRunning);
      setIsClicked(true);
      setActiveTimer(2);
    }
    setActiveTimer(1);
  };

  const handleLife = () => {
    if (!isClicked) {
      setIsRunning((prevIsRunning) => !prevIsRunning);
      setIsClicked(true);
      setActiveTimer(1);
    }
    setActiveTimer(2);
  };

  const handleSleep = () => {
    setIsRunning(false);
    setIsClicked(false);
    if (activeTimer !== 3) {
      setInactiveTimer(activeTimer);
    }
    setTimer1(0);
    setTimer2(0);
    // setActiveTimer(3);
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
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[#e2a130]">Work</span>
            <span className="text-[#617A55]"> Life</span>
            <span className="text-[#675D50]"> App</span>
          </h1>
          <div className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-1 md:gap-8">
            <button
              className="relative flex h-48 w-48 flex-col
              items-center justify-center gap-4 rounded-full
              bg-[#e2a130]/30 p-4 text-[#FFF8D6] hover:bg-[#e2a130]/20"
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
          </div>
          <div className="grid grid-cols-3 items-center justify-center gap-8">
            <button
              className="relative flex h-12 w-36 flex-col items-center justify-center gap-4 rounded-full bg-[#e2a130] p-4 text-2xl font-bold text-[#2f2b27] hover:bg-[#e2a130]/80"
              onClick={handleWork}
            >
              work
            </button>
            <button
              className="relative flex h-12 w-36 flex-col items-center justify-center gap-4 rounded-full bg-[#617A55] p-4 text-2xl font-bold text-[#FFF8D6] hover:bg-[#617A55]/80"
              onClick={handleLife}
            >
              life
            </button>
            <button
              className="relative flex h-12 w-36 flex-col items-center justify-center gap-4 rounded-full bg-[#675D50]/70 p-4 text-2xl font-bold text-[#2f2b27] hover:bg-[#675D50]/50"
              onClick={handleSleep}
            >
              end day
            </button>
          </div>
          <button
            className="relative flex h-12 w-48 flex-col items-center justify-center gap-4 rounded-full bg-[#e2a130]/30 p-4 text-slate-100 hover:bg-[#e2a130]/20"
            onClick={handleReset}
          >
            <span className="text-2xl font-bold tracking-tight">Reset</span>
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
