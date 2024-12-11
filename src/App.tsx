import dayjs from "dayjs";
import Calendar from "./Calendar";

function App() {
  return (
    <Calendar value={dayjs('2024-11-11')}></Calendar>
  )
}

export default App
