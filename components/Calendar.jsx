import { useState, useEffect } from "react";

export default function Calendar() {
    const nowDate = new Date();
    const [selectedYearAndMonth, setSelectedYearAndMonth] = useState({
        year: nowDate.getFullYear(), //해당년도 반환
        month: nowDate.getMonth(),
    });
    const [selectedTimestamp, setSelectedTimestamp] = useState(
        nowDate.setHours(0, 0, 0, 0),
    );

    function leftClick() {
        if (selectedYearAndMonth === 0) {
            return selectedYearAndMonth(prev => ({
                year: prev.year - 1,
                month: 11,
            }));
        }
        setSelectedYearAndMonth(prev => ({ ...prev, month: prev.month - 1 }));
    }
    function rightClick() {
        if (selectedYearAndMonth === 0) {
            return selectedYearAndMonth(prev => ({
                year: prev.year + 1,
                month: 1,
            }));
        }
        setSelectedYearAndMonth(prev => ({ ...prev, month: prev.month + 1 }));
    }
    function handleDayClick(timestamp) {
        setSelectedTimestamp(timestamp);
    };
    function handleToday() {
        const nowDate = new Date();
        setSelectedTimestamp(nowDate.setHours(0, 0, 0, 0));
        setSelectedYearAndMonth({
            year: nowDate.getFullYear(),
            month: nowDate.getMonth(),
        });
    };

    useEffect(() => {
        const selectDate = new Date(selectedTimestamp);
        setSelectedYearAndMonth({
            year: selectDate.getFullYear(),
            month: selectDate.getMonth(),
        })
    }, [selectedTimestamp]);

    return (
        <div style={{ position: 'fixed', right: 10 }}>
            <p>{nowDate.toDateString}</p>
            <button onClick={leftClick}>Previous Month</button>
            <button onClick={rightClick}>Next Month</button>
            <div>
                <p>Year: {selectedYearAndMonth.year}</p>
                <p>Month: {selectedYearAndMonth.month + 1}</p> {/* Month는 0부터 */}
            </div>
        </div>
    );
}