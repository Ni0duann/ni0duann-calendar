import dayjs from "dayjs";
import Calendar from "./Calendar";
import { useState } from "react";

function App() {
  const [value,setValue] = useState(dayjs("2024-11-08"))
  return (
    <div className="App">
      <Calendar
        value={value}
        onChange={(value) => {
          setValue(value)
        }}
      ></Calendar>
    </div>
  );
}

export default App;
