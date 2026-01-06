import { YearEventsComponent } from "../components/YearEvents.tsx";
import type { LunarEvent, SolarEvent, YearEvents } from "../model";
import { convertSolar2Lunar, convertLunar2Solar } from "../utils/lunar.js";

import { groupBy } from "es-toolkit/array";
import { format, addDays, isWithinInterval } from "date-fns";
import { useNavigate } from "react-router";
import { useStore } from "../store.ts";

function getDateParts(date: Date) {
    const dd = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = String(date.getFullYear());
    return {
        day: dd,
        month,
        year
    };
}

export function HomePage() {
    const navigate = useNavigate();

    const lunarEvents = useStore((s) => s.lunarEvents);
    const years = [2025, 2026];
    let events: SolarEvent[] = [];
    for (const year of years) {
        for (const lunarEvent of lunarEvents) {
            const { lunarDay, lunarMonth, desc } = lunarEvent;
            const [solarDay, solarMonth, solarYear] = convertLunar2Solar(lunarDay, lunarMonth, year, 0, 7);
            events.push({
                ...lunarEvent,
                solarDay,
                solarMonth,
                solarYear,
                solarDate: new Date(solarYear, solarMonth - 1, solarDay)
            });
        }
    }
    // filter events
    const today = new Date();
    const start = addDays(today, -1);
    const end = addDays(today, 366);

    events = events.filter((e) => isWithinInterval(e.solarDate, { start, end }));
    // groups by year
    const grouped = groupBy(events, (item) => item.solarYear);
    console.log(grouped);
    const data: YearEvents[] = Object.entries(grouped).map((e) => {
        return {
            year: e[0],
            events: e[1]
        };
    });
    console.log(data);

    const handleAdd = () => {
        navigate("/add");
    };
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <strong>Nhắc ngày âm lịch</strong>
                    </li>
                </ul>
                <ul>
                    <li>
                        <button className="primary" onClick={handleAdd}>
                            Thêm
                        </button>
                    </li>
                </ul>
            </nav>
            {data.map((yearEvents, i) => {
                return <YearEventsComponent key={i} yearEvents={yearEvents} />;
            })}
        </>
    );
}
