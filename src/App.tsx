import dayjs from "dayjs";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Calendar
        value={dayjs("2024-11-08")}
        curMonth={dayjs("2024-11-08")}
        locale="en-US"
        dateInnerContent={(value) => {
          return (
            <div>
              <p style={{ background: "yellowgreen", height: "30px" }}>
                {value.format("YYYY/MM/DD")}
              </p>
            </div>
          );
        }}
        onChange={(date) => {
          console.log(date.format("YYYY-MM-DD"));
        }}
      ></Calendar>
    </div>
  );
}

export default App;
