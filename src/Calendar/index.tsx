import { Dayjs } from 'dayjs';
import './index.scss'
import MonthCalendar from './MonthCalendar'

export interface CalendarProps {
    value: Dayjs;
}
function Calendar(props: CalendarProps) {
    return(
        <div className='calendar'>
            <MonthCalendar {...props}/>
        </div>
    )
}


export default Calendar