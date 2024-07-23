import { createContext, useState } from 'react';
import { utils } from '../util/util';

export const CalendarContext = createContext({
    currentMonth: new Date(),
    selectedDate: new Date(),
    prevMonth: () => { },
    nextMonth: () => { },
    onDateClick: () => { },
    utils: {},
});

export default function CalendarProvider({ children }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    //date-fns submonth
    function prevMonth() {
        setCurrentMonth(utils.subMonths(currentMonth, 1));
    }

    //date-fns addmonth
    function nextMonth() {
        setCurrentMonth(utils.addMonths(currentMonth, 1));
    }

    function onDateClick(day) {
        setSelectedDate(day);
    }

    const calendarContextValue = {
        currentMonth,
        selectedDate,
        prevMonth,
        nextMonth,
        onDateClick,
        utils
    };

    return (
        <CalendarContext.Provider value={calendarContextValue}>
            {children}
        </CalendarContext.Provider>
    );
}
