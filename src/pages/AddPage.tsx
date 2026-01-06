import { useNavigate } from "react-router";
import { useStore } from "../store";
import { useState } from "react";
import type { LunarEvent } from "../model";

interface ParsedData {
    firstNumber: number;
    secondNumber: number;
    description: string;
}
const parseNamePattern = (input: string): ParsedData | null => {
    // Regex with named capture groups for better readability
    const pattern = /^(?<num1>\d+)\/(?<num2>\d+)\s+(?<desc>.+)$/;
    const match = input.match(pattern);

    if (!match || !match.groups) {
        return null; // Return null if the string doesn't follow the pattern
    }

    const { num1, num2, desc } = match.groups;

    const firstNumber = parseInt(num1, 10);
    const secondNumber = parseInt(num2, 10);
    if (firstNumber < 0 || firstNumber > 30) {
        return null;
    }
    if (secondNumber < 0 || secondNumber > 12) {
        return null;
    }

    return {
        firstNumber,
        secondNumber,
        description: desc.trim()
    };
};

export function AddPage() {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const lunarEvents = useStore((s) => s.lunarEvents);
    const deleteEvent = useStore((s) => s.deleteEvent);
    const add = useStore((s) => s.add);

    const handleBack = () => {
        navigate("/");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update state with the current value of the input
        setText(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = parseNamePattern(text);
        if (!result) {
            alert("Sai định dạng. Vui lòng nhập dữ liệu theo định dạng [ngày/tháng {ghi chú}]`. Ví dụ:\n `19/1 Giỗ ông Hảo`\n`15/7 Rằm tháng bảy`");
            return;
        }
        const { firstNumber, secondNumber, description } = result;

        if (result) {
            console.log(result);
            setText("");
            const newLunarEvent: LunarEvent = {
                id: crypto.randomUUID(),
                lunarDay: firstNumber,
                lunarMonth: secondNumber,
                desc: description
            };
            add(newLunarEvent);
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <button className="primary" onClick={handleBack}>
                            Quay lại
                        </button>
                    </li>
                    <li>
                        <strong>Thêm ngày âm lịch</strong>
                    </li>
                </ul>
            </nav>
            <hr />
            <ul>
                {lunarEvents.map((lunarEvent, i) => {
                    return (
                        <li key={i}>
                            <span>
                                {lunarEvent.lunarDay}/{lunarEvent.lunarMonth} {lunarEvent.desc}
                            </span>
                            <button style={{ marginLeft: 16 }} className="pico-background-red-600 primary" onClick={() => deleteEvent(lunarEvent.id)}>
                                Xóa
                            </button>
                        </li>
                    );
                })}
            </ul>
            <hr />
            <form onSubmit={handleSubmit}>
                <label>
                    Thêm ngày âm lịch
                    <input name="first_name" placeholder="Ví dụ: 15/08 Trung thu" value={text} onChange={handleChange} />
                </label>
                <input type="submit" value="Thêm" />
            </form>
        </>
    );
}
