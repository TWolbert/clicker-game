export type ClickUpgrade = {
    id: number
    name: string;
    cost: number;
    multiplier: number;
    count: number;
    description: string;
    image?: string;
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
        cost: 100,
        multiplier: 1,
        count: 0,
        description: "Door de VC schreeuwen!",
        image: "/Discord.png"
    },
    {
        id: 2,
        name: "De server joinen",
        cost: 1000,
        multiplier: 4,
        count: 0,
        description: "Je joint en ziet dat de server lagged.",
        image: "/JoinServer.png"
    },
    {
        id: 3,
        name: "Tegen Bryan zeuren dat de server lagged",
        cost: 17500,
        multiplier: 15,
        count: 0,
        description: "Bryan is er niet blij mee..."
    },
    {
        id: 4,
        name: "12GB ram gebruiken",
        cost: 90000,
        multiplier: 50,
        count: 0,
        description: "Je minecraft client lagged hem helemaal kapot!",
        image: "/BlueScreen.png"
    },
    {
        id: 5,
        name: "Een nieuwe server kopen",
        cost: 870000,
        multiplier: 200,
        count: 0,
        description: "Hostvio nog meer geld geven? Gatver..."
    },
    {
        id: 6,
        name: "De nether in",
        cost: 6666666,
        multiplier: 666,
        count: 0,
        description: "Vorige keer dat je de nether in ging, crashte de server.",
        image: "/Nether.png"
    },
    {
        id: 7,
        name: "Mekanism Jetpack",
        cost: 10000000,
        multiplier: 1250,
        count: 0,
        description: "Je vliegt de hele server over!"
    }
];

export let CPSUpgrades: CPSUpgrade[] = [
    {
        id: 1,
        name: "Baue laten farmen",
        cost: 10,
        cpsIncrease: 0.1,
        count: 0,
        description: "Is hij dus wel heel goed in..."
    },
    {
        id: 2,
        name: "Auto Trader",
        cost: 100,
        cpsIncrease: 1,
        count: 0,
        description: "Werkslaaf minecraft villagers!"
    },
    {
        id: 3,
        name: "Nether Blaze farm",
        cost: 1100,
        cpsIncrease: 9,
        count: 0,
        description: "Pas op, niet dood gaan!"
    }, 
    {
        id: 4,
        name: "Mekanism Digital Miner",
        cost: 12000,
        cpsIncrease: 47,
        count: 0,
        description: "Deze miner is wel heel snel!"
    },
    {
        id: 5,
        name: "Powah Reactor",
        cost: 130000,
        cpsIncrease: 260,
        count: 0,
        description: "Zo veel ores!"
    }, 
    {
        id: 6,
        name: "Boos de grond slaan",
        cost: 1400000,
        cpsIncrease: 1400,
        count: 0,
        description: "Steen is helaas best hard."
    },
    {
        id: 7,
        name: "Daan laten proberen...",
        cost: 20000000,
        cpsIncrease: 7800,
        count: 0,
        description: "Hij heeft helaas geen idee wat hij doet..."
    },
    {
        id: 8,
        name: "Mekanism Fission Reactor",
        cost: 330000000,
        cpsIncrease: 44000,
        count: 0,
        description: "Zo veel energie! Hopen dat ie niet ontploft..."
    },
    {
        id: 9,
        name: "Botania leren...",
        cost: 5100000000,
        cpsIncrease: 260000,
        count: 0,
        description: "Zo veel energie! Hopen dat ie niet ontploft..."
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