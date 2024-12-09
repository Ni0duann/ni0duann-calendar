import { useEffect, useImperativeHandle, useRef, useState } from "react";
import "./index.css";
import React from "react";
import { useControllableValue } from "ahooks";

interface CalendarProps {
  value?: Date,
  defaultvalue?: Date,
  onChange?: (date: Date) => void,
}

interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void,
}


const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef,CalendarProps> = (props,ref) => {
  const {value, defaultvalue = new Date(), onChange } = props;

  const [date, setDate] = useControllableValue(props,{defaultValue: new Date()});

  useImperativeHandle(ref,() => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date);
      }
    }
  })
  

  const daysOfMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate(); //date是0的话是上个月最后一天
  };

  const firstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const renderDates = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }
    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(),date.getMonth(),i);
        setDate(curDate);
      }
      if (i === date.getDate()) {
        days.push(
          <div key={i} className="day selected" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} className="day" onClick={() => clickHandler()}>
            {i}
          </div>
        );
      }
    }

    return days;
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonte = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()}年{monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonte}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
};

const Calendar = React.forwardRef(InternalCalendar);

function Test() {
  const [date,setDate] = useState(new Date())
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(()=> {
    

    setTimeout(()=> {
      calendarRef.current?.setDate(new Date("2024-12-15"))
      console.log(calendarRef.current?.getDate());
    },5000)
    
  })
  return (
    <div>
      <Calendar value={new Date("2024-12-13")} onChange={(date) => {setDate(date);alert(date.toLocaleDateString())}}></Calendar>
      <Calendar defaultvalue={new Date("2024-12-10")} ref={calendarRef}></Calendar>
    </div>
  );
}

export default Test;
