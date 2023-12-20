"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    PlayerData,
    ClickUpgrades,
    setSingleClickUpgrades,
    ClickUpgrade,
    CPSUpgrades,
    CPSUpgrade,
    setSingleCPSUpgrades,
} from "./upgrades";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import numeral from "numeral";
import Emerald from "./_components/Emerald";
import Image from "next/image";

export default function Home() {
    const [score, setScore] = useState(0);
    const [scoreMultiplier, setScoreMultiplier] = useState(1);
    const [autoCps, setAutoCps] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState("click");
    const [currentBG, setCurrentBG] = useState("/overworld.webp");

    const buttonRef = useRef<HTMLButtonElement>(null);
    const saveButtonRef = useRef<HTMLButtonElement>(null);

    function incrementScore() {
        if (buttonRef.current == null) return;

        buttonRef.current.disabled = true;
        setTimeout(() => {
            if (buttonRef.current == null) return;
            buttonRef.current.disabled = false;
        }, 50);
        setScore(score + scoreMultiplier);
    }

    const handleToggle = (category: string) => {
        setSelectedCategory(category);
    };

    function buyUpgrade(upgrade: ClickUpgrade) {
        if (score >= upgrade.cost) {
            // round number
            setScore(Math.round((score - upgrade.cost) * 100) / 100);
            // round number
            setScoreMultiplier(
                Math.round((scoreMultiplier + upgrade.multiplier) * 100) / 100
            );

            upgrade.count++;

            if (upgrade.image && upgrade.count === 1) {
                setCurrentBG(upgrade.image!);
            }

            for (let index = 0; index < upgrade.count; index++) {
                upgrade.cost *= 1.05;
            }
        }
    }

    function buyAutoUpgrade(upgrade: CPSUpgrade) {
        if (score >= upgrade.cost) {
            // round number
            setScore(Math.round((score - upgrade.cost) * 100) / 100);
            // round number
            setAutoCps(Math.round((autoCps + upgrade.cpsIncrease) * 100) / 100);

            upgrade.count++;

            for (let index = 0; index < upgrade.count; index++) {
                upgrade.cost *= 1.05;
            }
        }
    }

    function saveData() {
        if (saveButtonRef.current == null) return;
        saveButtonRef.current.disabled = true;

        // Get current score rounded to avoid bullshit with saving
        const curScore = Math.round(score * 100) / 100;

        const playerData: PlayerData = {
            score: curScore,
            upgrades: ClickUpgrades,
            cpsUpgrades: CPSUpgrades,
        };

        axios
            .post("/api/data/save", playerData)
            .then((res) => {
                localStorage.setItem("playerData", res.data);
            })
            .finally(() => {
                if (saveButtonRef.current == null) return;
                saveButtonRef.current.disabled = false;
            });

        toast("Saved! 💾", {
            type: "success",
        });
    }

    function readData() {
        let playerDataString = "";

        // Check if playerData exists
        if (!localStorage.getItem("playerData")) return;

        // Check if playerData is valid json already, if it is, it is a legacy save and we delete it
        let legacySaveData;
        try {
            legacySaveData = JSON.parse(
                localStorage.getItem("playerData") as string
            );
        } catch {}

        if (legacySaveData?.score) {
            localStorage.removeItem("playerData");
            return;
        }

        axios
            .post("/api/data/load", localStorage.getItem("playerData"))
            .then((res) => {
                playerDataString = JSON.stringify(res.data);

                if (!playerDataString) return;

                const playerData: PlayerData = JSON.parse(playerDataString);

                console.log(playerData);

                setSingleClickUpgrades(playerData.upgrades);
                setSingleCPSUpgrades(playerData.cpsUpgrades);

                let clickMultiplier = 1;
                ClickUpgrades.forEach((element) => {
                    clickMultiplier += element.multiplier * element.count;
                    if (element.image && element.count > 0) {
                        setCurrentBG(element.image!);
                    }
                });

                let cps = 0;
                CPSUpgrades.forEach((element) => {
                    cps += element.cpsIncrease * element.count;
                });

                setScore(playerData.score);
                setAutoCps(cps);
                setScoreMultiplier(clickMultiplier);
            });
    }

    useEffect(() => {
        if (buttonRef.current != null) {
            buttonRef.current.disabled = true;
        }

        readData();

        const autoSaveTimer = setInterval(() => {
            saveButtonRef.current?.click();
        }, 30 * 1000);

        const autoClickTimer = setInterval(() => {
            setScore((prev) => {
                // Get current autoCPS
                let currentAutoCps = 0;

                if (!CPSUpgrades) return prev;

                CPSUpgrades.forEach((element) => {
                    currentAutoCps += element.cpsIncrease * element.count;
                });

                return (prev += currentAutoCps);
            });
        }, 1000);

        if (buttonRef.current != null) {
            buttonRef.current.disabled = false;
        }

        return () => {
            clearInterval(autoSaveTimer);
            clearInterval(autoClickTimer);
        };
    }, []);

    return (
        <main className="w-screen grid-cols-3 h-screen grid gap-2 bg-background overflow-hidden">
            <div>
                <ToastContainer theme="dark" />

                <div className="z-10 absolute w-[33%]">
                    <div className=" flex flex-col">
                        <div className="flex items-center mx-auto w-fit gap-2">
                            <Emerald className="h-12" />
                            <p className=" tabular-nums ordinal text-3xl font-bold">
                                Emeralds:{" "}
                                {numeral(Math.round(score))
                                    .format("0.0a")
                                    .toUpperCase()}
                            </p>
                        </div>

                        <div className="flex items-center mx-auto w-fit gap-2">
                            <p className=" tabular-nums ordinal">
                                Emeralds per second:{" "}
                                {numeral(Math.round(autoCps))
                                    .format("0.0a")
                                    .toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full relative">
                    <Image
                        src={currentBG}
                        className="h-full w-full object-cover absolute z-0 blur-md"
                        alt="Background"
                        priority={true}
                        width={1920}
                        height={1080}
                    />
                    <button
                        onClick={incrementScore}
                        ref={buttonRef}
                        className="text-text active:scale-95 transition-all hover:cursor-pointer m-auto h-fit w-fit z-10 drop-shadow-2xl"
                    >
                        <Emerald className="h-50" />
                    </button>
                </div>
            </div>

            <div className="p-2 bg-primary/30">
                <div className="flex justify-center items-center gap-4">
                    <button
                        className={`px-4 py-2 text-black rounded-xl transition-all ${
                            selectedCategory === "click"
                                ? "bg-white text-black"
                                : "bg-primary"
                        }`}
                        onClick={() => handleToggle("click")}
                    >
                        Click Upgrades
                    </button>
                    <button
                        className={`px-4 py-2 text-black rounded-xl transition-all ${
                            selectedCategory === "auto"
                                ? "bg-white text-black"
                                : "bg-primary"
                        }`}
                        onClick={() => handleToggle("auto")}
                    >
                        Auto Upgrades
                    </button>
                </div>

                <p>
                    {selectedCategory === "click"
                        ? "Click Upgrades:"
                        : "Auto Upgrades:"}
                </p>
                <ul className="flex flex-col gap-2">
                    {selectedCategory === "click"
                        ? // Render Click Upgrades
                          ClickUpgrades.map((upgrade, index) => (
                              <li
                                  key={index}
                                  className="px-3 py-2 rounded-xl bg-primary/30 flex justify-between items-center"
                              >
                                  <p className="w-fit text-sm">
                                      {upgrade.name}{" "}
                                  </p>

                                  <div className="flex gap-2 items-center w-full max-w-[50%]">
                                      <button
                                          className="bg-white rounded-xl px-3 py-2 text-black w-full active:scale-95 flex justify-between items-center"
                                          onClick={() => {
                                              buyUpgrade(upgrade);
                                          }}
                                      >
                                          <Emerald className="h-6" />
                                          <p>
                                              Buy for{" "}
                                              {numeral(Math.round(upgrade.cost))
                                                  .format("0.0a")
                                                  .toUpperCase()}{" "}
                                              points
                                          </p>
                                      </button>
                                      <div className="flex items-center gap-2 justify-center">
                                          <Image
                                              src={"/Chest.png"}
                                              width={20}
                                              height={20}
                                              priority={true}
                                              alt="Chest"
                                              className=""
                                          />
                                          <p className=" tabular-nums ordinal">
                                              {upgrade.count}
                                          </p>
                                      </div>
                                  </div>
                              </li>
                          ))
                        : // Render Auto Upgrades
                          CPSUpgrades.map((upgrade, index) => (
                              <li
                                  key={index}
                                  className="px-3 py-2 rounded-xl bg-gray-800 flex justify-between items-center"
                              >
                                  <p className="w-fit text-sm">
                                      {upgrade.name}{" "}
                                  </p>
                                  <div className="flex gap-2 items-center w-full max-w-[50%]">
                                      <button
                                          className="bg-white rounded-xl px-3 py-2 text-black w-full active:scale-95 flex justify-between items-center"
                                          onClick={() => {
                                              buyAutoUpgrade(upgrade);
                                          }}
                                      >
                                          <Emerald className="h-6" />
                                          <p>
                                              Buy for{" "}
                                              {numeral(Math.round(upgrade.cost))
                                                  .format("0.0a")
                                                  .toUpperCase()}{" "}
                                              points
                                          </p>
                                      </button>
                                      <div className="flex items-center gap-2 justify-center">
                                          <Image
                                              src={"/Chest.png"}
                                              width={20}
                                              height={20}
                                              priority={true}
                                              alt="Chest"
                                              className=""
                                          />
                                          <p className=" tabular-nums ordinal">
                                              {upgrade.count}
                                          </p>
                                      </div>
                                  </div>
                              </li>
                          ))}
                </ul>
            </div>
            <div>
                <p>Your stats will show here some day</p>
                <button onClick={() => saveData()} ref={saveButtonRef}>
                    Save data
                </button>
            </div>
        </main>
    );
}
