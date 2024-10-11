import React, { useState } from "react";

function TableList({ user, table, setTable }) {
  const [isChecked, setIsChecked] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); //
  };

  return (
    <div className="table-list">
      <div><h2>Выберите дату:</h2>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      
      <div className="custom-date-input">
        
        <button
          onClick={() => document.querySelector('input[type="date"]').click()}
        >
          {selectedDate || "День"}
        </button>{" "}
      </div>

      <h2>Время: {table.time}</h2>

      {user && (
        <label className="custom-checkbox">
          <input
            style={{ display: "none" }}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="checkmark"></span>
          Выбрать
        </label>
      )}
      {isChecked && (
        <button
          onClick={() => {
            setTable({ ...table, day: selectedDate });
          }}
        >
          Забронировать
        </button>
      )}
    </div>
  );
}

export default TableList;
