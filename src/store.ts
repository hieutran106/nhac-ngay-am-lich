import { create } from "zustand";
import type { LunarEvent } from "./model";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
    lunarEvents: LunarEvent[];
    add: (newEvent: LunarEvent) => void;
    deleteEvent: (id: string) => void;
}

const lunarEvents: LunarEvent[] = [
    {
        id: crypto.randomUUID(),
        lunarDay: 19,
        lunarMonth: 1,
        desc: "Giỗ ông Hảo"
    }
    // {
    //     id: crypto.randomUUID(),
    //     lunarDay: 25,
    //     lunarMonth: 11,
    //     desc: "Giỗ ông Văn"
    // }
];

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            lunarEvents,
            add(newEvent: LunarEvent) {
                set((state) => ({
                    lunarEvents: [...state.lunarEvents, newEvent]
                }));
            },
            deleteEvent(id: string) {
                set((state) => ({ lunarEvents: state.lunarEvents.filter((item) => item.id != id) }));
            }
        }),
        {
            name: "amlich-storage"
        }
    )
);
