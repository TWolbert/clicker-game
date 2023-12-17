"use client"
import React, { useEffect, useRef, useState } from 'react'
import { PlayerData, ClickUpgrades, setSingleClickUpgrades, ClickUpgrade, CPSUpgrades, CPSUpgrade, setSingleCPSUpgrades  } from './upgrades';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Home() {
  const [score, setScore] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const [autoCps, setAutoCps] = useState<number>(0);

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
  
  function buyAutoUpgrade(upgrade: CPSUpgrade) {
    if (score >= upgrade.cost) {
        // round number
        setScore(Math.round((score - upgrade.cost) * 100) / 100);
        // round number
        setAutoCps(Math.round((autoCps + upgrade.cpsIncrease) * 100) / 100);

        upgrade.count++;

        for (let index = 0; index < upgrade.count; index++) {
          upgrade.cost *= 1.05
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
      cpsUpgrades: CPSUpgrades
    }

    axios.post('/api/data/save', playerData).then((res) => { 
      localStorage.setItem("playerData", res.data);
    }).finally(() => {
      if (saveButtonRef.current == null) return;
      saveButtonRef.current.disabled = false;
     })

    toast("Saved! 💾", {
      type: "success"
    })
  }

    function readData() {
      let playerDataString = "";

      // Check if playerData exists
      if (!localStorage.getItem('playerData')) return;

      // Check if playerData is valid json already, if it is, it is a legacy save and we delete it
      let legacySaveData;
      try {
        legacySaveData = JSON.parse(localStorage.getItem('playerData') as string);
      }
      catch {

      }

      if (legacySaveData?.score) {
        localStorage.removeItem('playerData');
        return;
      }

      axios.post('/api/data/load', localStorage.getItem('playerData')).then((res) => { 
        playerDataString = JSON.stringify(res.data);

        if (!playerDataString) return;
    
        const playerData: PlayerData = JSON.parse(playerDataString);

        console.log(playerData);
      
        setSingleClickUpgrades(playerData.upgrades);
        setSingleCPSUpgrades(playerData.cpsUpgrades);
      
        let clickMultiplier = 1;
        ClickUpgrades.forEach((element) => {
          clickMultiplier += element.multiplier * element.count;
        });
      
        let cps = 0;
        CPSUpgrades.forEach((element) => {
          cps += element.cpsIncrease * element.count;
        });
      
        setScore(playerData.score);
        setAutoCps(cps);
        setScoreMultiplier(clickMultiplier);
      })  
    }
  
 
  useEffect(() => {
      if(buttonRef.current != null) {
        buttonRef.current.disabled = true;
      }

      readData();

      const autoSaveTimer = setInterval(() => {
        saveButtonRef.current?.click();
      }, 30 * 1000)

      const autoClickTimer = setInterval(() => {
        setScore((prev) => {
          // Get current autoCPS
          let currentAutoCps = 0;

          if (!CPSUpgrades) return prev;

          CPSUpgrades.forEach((element) => {
            currentAutoCps += element.cpsIncrease * element.count;
          });

          return prev += currentAutoCps;
        });
      }, 1000);

      if(buttonRef.current != null) {
        buttonRef.current.disabled = false;
      }

      return () => {
        clearInterval(autoSaveTimer);
        clearInterval(autoClickTimer);
      }
    }, [])

  return (
    <main className='w-screen grid-cols-3 h-screen grid gap-2'>
      <div>
        <ToastContainer theme='dark' />
        <button onClick={incrementScore} ref={buttonRef} className='bg-white rounded-xl px-3 py-2 text-black active:scale-95 transition-all hover:cursor-pointer '>Click me</button>
        <p className=' tabular-nums ordinal'>Score: {Math.round(score)}</p>
        <p>(temp) multiplier: {Math.round(scoreMultiplier*100) / 100 }</p>
        <p>(temp) autoCPS: {Math.round(autoCps*100) / 100 }</p>

        <button onClick={() => saveData()} ref={saveButtonRef}>Save data</button>
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
      <p>Auto upgrades:</p>
      <ul className='flex flex-col gap-2'>
        {CPSUpgrades.map((upgrade, index) => (
          <li key={index}>
            <button className='bg-white rounded-xl px-3 py-2 text-black' onClick={() => {
              buyAutoUpgrade(upgrade);
            }}>Buy {upgrade.name} for {Math.round(upgrade.cost)} points</button>
            {upgrade.count}
          </li>
        ))}
      </ul>
      </div>
      <div>
        <p>Your stats will show here some day</p>
      </div>
    </main>
  )
}