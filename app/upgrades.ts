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
        name: "Schreeuwen in general VC",
        cost: 10,
        multiplier: 0.1,
        count: 0,
        description: "Door de VC schreeuwen!"
    },
    {
        id: 2,
        name: "Tegen Bryan zeuren dat de server lagged",
        cost: 100,
        multiplier: 1,
        count: 0,
        description: "Bryan is er niet blij mee..."
    },
    {
        id: 3,
        name: "12GB ram gebruiken",
        cost: 1000,
        multiplier: 10,
        count: 0,
        description: "Je minecraft client lagged hem helemaal kapot!"
    },
    {
        id: 4,
        name: "Een nieuwe server kopen",
        cost: 10000,
        multiplier: 100,
        count: 0,
        description: "Hostvio nog meer geld geven? Gatver..."
    },
    {
        id: 5,
        name: "De nether in",
        cost: 35000,
        multiplier: 250,
        count: 0,
        description: "Vorige keer dat je de nether in ging, crashte de server."
    },
    {
        id: 5,
        name: "Mekanism Jetpack",
        cost: 100000,
        multiplier: 1000,
        count: 0,
        description: "Je vliegt de hele server over!"
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