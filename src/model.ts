export type LunarEvent = {
    id: string;
    lunarDay: number;
    lunarMonth: number;
    desc: string;
};

export type SolarEvent = LunarEvent & {
    solarDay: number;
    solarMonth: number;
    solarYear: number;
    solarDate: Date;
};

export type YearEvents = {
    year: string;
    events: SolarEvent[];
};
