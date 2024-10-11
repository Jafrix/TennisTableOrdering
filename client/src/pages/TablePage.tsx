import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axiosInstance from "../shared/api/axiosInstance";
import { UserRegType } from "./UserRegType";
import TableCard from "../entities/Tables/ui/TableCard";
import TableList from "../entities/Tables/ui/TableList";
import { CategoryTypeArray } from "./UserRegType";

type props = {
  user: null | UserRegType;
}
type props2 = {
  setTable: Dispatch<SetStateAction<[] | TableType[]>>;
}
type TableType = {
  id: number;
  day: string;
  time: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// import { useNavigate } from "react-router-dom";

function TablePage({ user }:props):JSX.Element {

  const [table, setTable] = useState<props2 | []>([]);
  // const nav = useNavigate();

  const loadTable = async () => {
    try {
      const response = await axiosInstance.get<{ categories: CategoryTypeArray }>("/table");
      if (response.status === 200) {
        console.log(response.data, "DATA CLIENT")
        setTable(response.data.tables);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // nav("/");

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <div className="add-form">
      <>
      {user && <TableCard setTable={setTable} user={user}/>}
      </>
      <div id="item-wrapper">
        <>
        {table.map((table) => (
          <TableList  key={table.id} table={table} setTable={setTable} user={user} />
        ))}
        </>
      </div>
    </div>
  );
}

export default TablePage;
