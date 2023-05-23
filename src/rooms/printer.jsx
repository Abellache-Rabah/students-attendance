import React, { memo } from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { BsPrinterFill } from "react-icons/bs"

export default memo(function Printer ({ apiData }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const fileName = () => {
    return new Date(Date.now());
  }
  return (
    <button onClick={(e) => exportToCSV(apiData, fileName)} ><BsPrinterFill className='fill-green-400' /> </button>
  );
});