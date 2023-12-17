export type ClickUpgrade = {
    id: number
    name: string;
    cost: number;
    multiplier: number;
    count: number;
    description: string;
};

export type CPSUpgrade = {
    id: number;
    name: string;
    cost: number;
    cpsIncrease: number;
    count: number;
    description: string;
}

export let ClickUpgrades: ClickUpgrade[] = [
    {
        id: 1,
        name: "Clicker",
        cost: 10,
        multiplier: 0.1,
        count: 0,
        description: "Clicks for you!"
    },
    {
        id: 2,
        name: "Crank",
        cost: 100,
        multiplier: 1,
        count: 0,
        description: "Cranks up the clicks!"
    },
    {
        id: 3,
        name: "Speedy Crank",
        cost: 1000,
        multiplier: 10,
        count: 0,
        description: "Crank it up even more with the speedy crank!"
    }
];

export let CPSUpgrades: CPSUpgrade[] = [
    {
        id: 1,
        name: "Auto Clicker",
        cost: 100,
        cpsIncrease: 1,
        count: 0,
        description: "Clicks for you!"
    },
    {
        id: 2,
        name: "Auto Crank",
        cost: 1000,
        cpsIncrease: 5,
        count: 0,
        description: "Cranks up the clicks!"
    },
    {
        id: 3,
        name: "Speedy Auto Crank",
        cost: 10000,
        cpsIncrease: 10,
        count: 0,
        description: "Crank it up even more with the speedy crank!"
    }
]

export function setSingleClickUpgrades(upgradesNew: ClickUpgrade[]) {
    ClickUpgrades = upgradesNew;
}

export function setSingleCPSUpgrades(upgradesNew: CPSUpgrade[]) {
    CPSUpgrades = upgradesNew;
}

export type PlayerData = {
    score: number,
    upgrades: ClickUpgrade[],
    cpsUpgrades: CPSUpgrade[],
}