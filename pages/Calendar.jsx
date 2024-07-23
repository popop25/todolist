import { useState } from "react";
//useContext

import './Calendar.css';

//import { CalendarContext } from "../store/calendarContext";
import CalendarHeader from "../components/CalendarHeader";
import CalendarCells from "../components/CalendarCells";
import CalendarDays from "../components/CalendarDays";


export default function Calendar() {
    //const { currentMonth, prevMonth, nextMonth } = useContext(CalendarContext);

    return (
        <div>
            <div className="calendar">
                <CalendarHeader
                // currentMonth={currentMonth}
                // prevMonth={prevMonth}
                // nextMonth={nextMonth}
                />
                <CalendarDays />
                <CalendarCells
                //currentMonth={currentMonth}
                //selectedDate={selectedDate}
                //onDateClick={onDateClick}
                />
            </div>
        </div>
    );
};


// export default function Calendarr() {
//     const nowDate = new Date();
//     const [selectedYearAndMonth, setSelectedYearAndMonth] = useState({
//         year: nowDate.getFullYear(), //해당년도 반환
//         month: nowDate.getMonth(),
//     });
//     const [selectedTimestamp, setSelectedTimestamp] = useState(
//         nowDate.setHours(0, 0, 0, 0),
//     );

//     const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

//     function leftClick() {
//         if (selectedYearAndMonth === 0) {
//             return selectedYearAndMonth(prev => ({
//                 year: prev.year - 1,
//                 month: 11,
//             }));
//         }
//         setSelectedYearAndMonth(prev => ({ ...prev, month: prev.month - 1 }));
//     }
//     function rightClick() {
//         if (selectedYearAndMonth === 0) {
//             return selectedYearAndMonth(prev => ({
//                 year: prev.year + 1,
//                 month: 1,
//             }));
//         }
//         setSelectedYearAndMonth(prev => ({ ...prev, month: prev.month + 1 }));
//     }
//     function handleDayClick(timestamp) {
//         setSelectedTimestamp(timestamp);
//     };
//     function handleToday() {
//         const nowDate = new Date();
//         setSelectedTimestamp(nowDate.setHours(0, 0, 0, 0));
//         setSelectedYearAndMonth({
//             year: nowDate.getFullYear(),
//             month: nowDate.getMonth(),
//         });
//     };

//     useEffect(() => {
//         const selectDate = new Date(selectedTimestamp);
//         setSelectedYearAndMonth({
//             year: selectDate.getFullYear(),
//             month: selectDate.getMonth(),
//         })
//     }, [selectedTimestamp]);

//     return (
//         <div style={{ position: 'fixed', right: 10 }}>
//             <p>{nowDate.toDateString}</p>
//             <button onClick={leftClick}>Previous Month</button>
//             <button onClick={rightClick}>Next Month</button>
//             <div>
//                 <p>Year: {selectedYearAndMonth.year}</p>
//                 <p>Month: {selectedYearAndMonth.month + 1}</p> {/* Month는 0부터 */}
//             </div>
//             <div>
//                 {/* "일", "월", "화", "수", "목", "금", "토" */}
//                 <div>
//                     {daysOfWeek.map((day, i) => (
//                         <div key={i} data-testid="calendarHead">
//                             {day}
//                         </div>
//                     ))}
//                 </div>
//                 {/* {calendarRows.map((row, i) => (
//                         <tr key={i}>{row}</tr>
//                     ))}  */}
//             </div>
//         </div>

//     );
// }