import dayjs, { Dayjs } from "dayjs";
import "./index.scss";
import MonthCalendar from "./MonthCalendar";
import Header from "./Header";
import { CSSProperties, ReactNode, useState } from "react";
import cs from "classnames";
import LocaleContext from "../LocaleContext";
import { useControllableValue } from "ahooks";

export interface CalendarProps {
  value?: Dayjs;
  defaultValue?: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  //定制日期单元格，内容会被添加到单元格，只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  //国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}
function Calendar(props: CalendarProps) {
  const { style, className, locale, onChange } = props;
  const classNames = cs("calendar", className);
  const [curVale, setCurValue] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs(),
  });
  const [curMonth, setCurMonth] = useState<Dayjs>(curVale);

  function changeDate(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  function selectHandler(date: Dayjs) {
    changeDate(date);
  }

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, "month"));
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, "month"));
  }

  function todayHandler() {
    const date = dayjs(Date.now());
    changeDate(date);
  }

  return (
    <LocaleContext.Provider value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        ></Header>
        <MonthCalendar
          {...props}
          value={curVale}
          selectHandler={selectHandler}
          curMonth={curMonth}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
