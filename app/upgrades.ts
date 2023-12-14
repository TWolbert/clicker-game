export type Upgrade = {
    id: number
    name: string;
    cost: number;
    multiplier: number;
    count: number;
    description: string;
};

export const upgrades: Upgrade[] = [
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
        multiplier: 0.25,
        count: 0,
        description: "Cranks up the clicks!"
    },
    {
        id: 3,
        name: "Speedy Crank",
        cost: 1000,
        multiplier: 0.35,
        count: 0,
        description: "Crank it up even more with the speedy crank!"
    }
];

export type PlayerData = {
    score: number,
    upgrades: Upgrade[]
}