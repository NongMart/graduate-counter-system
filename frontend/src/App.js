import "./App.css";

function App() {
  return (
    <div className="page">

      <header className="header">
        🎓 ระบบนับจำนวนบัณฑิตเข้ารับปริญญา
      </header>

      <div className="container">

        {/* Total Input */}
        <div className="card">
          <div className="title">กำหนดจำนวนบัณฑิตทั้งหมด</div>

          <div className="input-row">
            <input type="number" placeholder="เช่น 3941" />

            <button className="btn primary">ตั้งค่า</button>
          </div>
        </div>

        <div className="grid-2">

          <div className="card">
            <div className="title">จำนวนที่รับไปแล้ว</div>
            <div className="number blue">0</div>
            <div className="percent">0%</div>
          </div>

          <div className="card">
            <div className="title">จำนวนที่เหลือ</div>
            <div className="number red">0</div>
            <div className="percent">0%</div>
          </div>

        </div>

        <div className="card">
          <div className="title">ข้อมูลเวลา</div>
          <div className="time-box">
            <p>⏱ ใช้เวลาไปแล้ว: <span>00:00:00</span></p>
            <p>⏳ คาดว่าเหลือเวลาอีก: <span>00:00:00</span></p>
            <p>📌 เฉลี่ยต่อนาที: <span className="blue">0</span> คน</p>
          </div>
        </div>

        <div className="card center">
          <div className="title">สถานะระบบ</div>

          <h2 className="status green">-</h2>

          <div className="btn-row">
            <button className="btn start">START</button>
            <button className="btn stop">STOP</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;