import type { LunarEvent, YearEvents } from "../model.ts";
import { getYear, previousSaturday, format } from "date-fns";

const dayOfWeekMapper: any = {
    Monday: "Thứ hai",
    Tuesday: "Thứ ba",
    Wednesday: "Thứ tư",
    Thursday: "Thứ năm",
    Friday: "Thứ sáu",
    Saturday: "Thứ bảy",
    Sunday: "Chủ nhật"
};

type YearEventProps = {
    yearEvents: YearEvents;
};
export function YearEventsComponent({ yearEvents }: YearEventProps) {
    return (
        <details name={yearEvents.year} open>
            <summary>Năm {yearEvents.year}</summary>
            <ul>
                {yearEvents.events.map((e, i) => {
                    const eventDate = new Date(e.solarYear, e.solarMonth - 1, e.solarDay);

                    const dayOfWeek = format(eventDate, "eeee");
                    const dayOfWeekVn = dayOfWeekMapper[dayOfWeek];
                    const dayLong = format(eventDate, "dd/MM/yyyy");
                    let prevSaturdayFormat = undefined;
                    if (dayOfWeek !== "Saturday") {
                        const prevSaturday = previousSaturday(eventDate);
                        prevSaturdayFormat = `- Thứ bảy liền trước: ${format(prevSaturday, "dd/MM/yyyy")}`;
                    }

                    return (
                        <li key={i}>
                            {e.desc}: {dayOfWeekVn} {dayLong} (tức {e.lunarDay}/{e.lunarMonth} âm lịch) {prevSaturdayFormat}
                        </li>
                    );
                })}
            </ul>
        </details>
    );
}
