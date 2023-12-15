"use client"
import React, { useEffect, useRef, useState } from 'react'
import { PlayerData, ClickUpgrades, setSingleClickUpgrades, ClickUpgrade  } from './upgrades';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [score, setScore] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);

  const buttonRef = useRef<HTMLButtonElement>(null);

  function incrementScore() {
    if (buttonRef.current == null) return;

    buttonRef.current.disabled = true;
    setTimeout(() => {
      if (buttonRef.current == null) return;
      buttonRef.current.disabled = false;
    }, 50);
    setScore(score + scoreMultiplier);
  }

  function buyUpgrade(upgrade: ClickUpgrade) {
    if (score >= upgrade.cost) {
        // round number
        setScore(Math.round((score - upgrade.cost) * 100) / 100);
        // round number
        setScoreMultiplier(Math.round((scoreMultiplier + upgrade.multiplier) * 100) / 100);

        upgrade.count++;

        for (let index = 0; index < upgrade.count; index++) {
          upgrade.cost *= 1.05
        }
    }
  }

  function saveData() {
    localStorage.setItem("playerData", JSON.stringify({
      "score": score,
      "upgrades": ClickUpgrades
    }));

    toast("Saved! 💾", {
      type: "success"
    })
  }

  function readData() {
    const playerData: PlayerData = JSON.parse(localStorage.getItem("playerData")!);

    if (!playerData) return;
    setScore(playerData.score);
    setSingleClickUpgrades(playerData.upgrades);

    let multiplier = 1;

    ClickUpgrades.forEach(element => {
      multiplier += element.multiplier * element.count;
    });

    setScoreMultiplier(multiplier);
  }
 
  useEffect(() => {
      if(buttonRef.current != null) {
        buttonRef.current.disabled = true;
      }

      readData();

      const autoSaveTimer = setInterval(() => {
        saveData();
      }, 5 * 60 * 1000)

      if(buttonRef.current != null) {
        buttonRef.current.disabled = false;
      }

      return () => {
        clearInterval(autoSaveTimer);
      }
    }, [])

  return (
    <main className='w-screen grid-cols-3 h-screen grid gap-2'>
      <div>
        <ToastContainer theme='dark' />
        <button onClick={incrementScore} ref={buttonRef} className='bg-white rounded-xl px-3 py-2 text-black active:scale-95 transition-all hover:cursor-pointer '>Click me</button>
        <p className=' tabular-nums ordinal'>Score: {Math.round(score)}</p>
        <p>(temp) multiplier: {Math.round(scoreMultiplier*100) / 100 }</p>

        <button onClick={() => saveData()}>Save data</button>
      </div>
      <div>
      <p>Click Upgrades:</p>
      <ul className='flex flex-col gap-2'>
        {ClickUpgrades.map((upgrade, index) => (
          <li key={index}>
            <button className='bg-white rounded-xl px-3 py-2 text-black' onClick={() => {
              buyUpgrade(upgrade);
            }}>Buy {upgrade.name} for {Math.round(upgrade.cost)} points</button>
            {upgrade.count}
          </li>
        ))}
      </ul>
      </div>
      <div>
        <p>Auto click upgrades</p>
      </div>
    </main>
  )
}