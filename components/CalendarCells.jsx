import { useContext } from "react";

import { CalendarContext } from "../store/calendarContext";
import { TodosContext } from "../store/todoContext";

export default function CalendarCells() {
    const { currentMonth, selectedDate, onDateClick, utils } = useContext(CalendarContext);
    const { datalist } = useContext(TodosContext);
    const { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parse } = utils;

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd'); // 현재 날짜 day 형식으로 포맷
            const cloneDay = day; // 현재 날짜 복사하여 onClick 핸들러에서 사용

            //각 날짜 셀 datalist 필터링하여 deadline와 일치하는 todo 항목 찾기
            const todosDay = datalist.filter(todo => {
                return format(parse(todo.deadline, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd')
                    === format(day, 'yyyy-MM-dd');
            });

            days.push(
                <div
                    className={`col cell ${!isSameMonth(day, monthStart)
                        ? 'disabled' // 현재 월이 아닌 날짜 'disabled' 클래스 추가
                        : isSameDay(day, selectedDate)
                            ? 'selected' // 선택된 날짜는 'selected' 클래스 추가
                            : format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid' // 현재 월의 날짜 아닌 경우 'not-valid' 클래스 추가
                                : 'valid' // 그 외에는 'valid' 클래스 추가
                        }`}
                    key={day}
                    onClick={() => onDateClick(day)} // 날짜 클릭 시 onDateClick 호출
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }// 현재 월의 날짜 아닌 경우 'text not-valid' 클래스 추가
                    >
                        {formattedDate}
                    </span>
                    {todosDay.length > 0 && (
                        <div className="todos">
                            {todosDay.map((todo, index) => (
                                <div key={index} className="todo">
                                    {todo.contents}
                                </div>
                            ))}
                        </div>
                    )}
                </div>,
            );
            day = addDays(day, 1); // 날짜를 하루 증가
        }
        rows.push(
            // 현재 주의 모든 날짜 셀을 포함하는 row 추가
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = []; // 새로운 주를 시작하기 위해 days 배열 초기화
    }

    return <div className="body">{rows}</div>;
};
