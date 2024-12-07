import { FaDropbox } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { BsBoxSeam } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";

export const kategori = [
  { key: "Makanan", label: "Makanan" },
  { key: "Minuman", label: "Minuman" },
  { key: "ATK", label: "ATK" },
  { key: "Kebersihan", label: "Kebersihan" },
  { key: "Alat Masak", label: "Alat Masak" },
];

const Landing = () => {
  return (
    <div className="body-landing flex min-h-screen">
      <div className="sidebar min-h-screen bg-[#12376A] text-white w-[25rem] px-[20px]">
        <div className="head flex flex-row items-center justify-center mt-[20px] gap-[20px]">
          <FaDropbox className="text-[40px]" />
          <h2 className="text-[30px] font-semibold">TrackVentory</h2>
        </div>
        <div className="button-area flex flex-col justify-center mt-[60px] gap-[20px]">
          <div className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-amber-600 hover: rounded-2xl hover:cursor-pointer hover:text-black">
            <AiOutlineDashboard className="text-[35px]" />
            <h2 className="text-[25px]">Dashboard</h2>
          </div>
          <div className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-amber-600 hover: rounded-2xl hover:cursor-pointer hover:text-black">
            <MdOutlineHistory className="text-[35px]" />
            <h2 className="text-[25px]">History</h2>
          </div>
        </div>
      </div>
      <div className="main-board min-h-screen bg-[#F2F4F3] flex flex-col w-full text-black px-[16px]">
        <div className="head flex flex-row justify-end items-center mt-[16px]">
          <FaUserCircle className="text-[40px] text-[#12376A]" />
        </div>
        <div className="container flex justify-center ">
          <div className="box flex flex-row gap-[40px] ">
            <div className="box-1 flex flex-row items-center gap-[10px] w-[300px] px-[20px] py-[20px] rounded-2xl shadow-2xl">
              <FaCircleArrowUp className="text-green-700 text-[60px]" />
              <div className="text flex flex-col items-start text-[20px]">
                <h2 className="font-semibold">Barang Masuk</h2>
                <h2>100</h2>
              </div>
            </div>
            <div className="box-2 flex flex-row items-center gap-[10px] shadow-2xl w-[300px] px-[20px] py-[20px] rounded-2xl">
              <BsBoxSeam className="text-warning text-[60px]" />
              <div className="text flex flex-col items-start text-[20px]">
                <h2 className="font-semibold">Total Barang</h2>
                <h2>100</h2>
              </div>
            </div>
            <div className="box-2 flex flex-row items-center gap-[10px] shadow-2xl w-[300px] px-[20px] py-[20px] rounded-2xl">
              <FaCircleArrowDown className="text-red-700 text-[60px]" />
              <div className="text flex flex-col items-start text-[20px]">
                <h2 className="font-semibold">Barang Keluar</h2>
                <h2>100</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="search-engine flex flex-row items-center justify-between px-[20px] mt-[30px]">
          <div className="search">
            <div className="relative flex items-center w-[500px] h-[55px] rounded-2xl focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search" placeholder="Search Barang.." />
            </div>
          </div>
          <div className="katbar flex flex-row items-center gap-[10px]">
            <Select className="w-[300px] shadow-lg" size="md" label="Pilih Kategori" placeholder="Select an Category">
              {kategori.map((kategori) => (
                <SelectItem key={kategori.key}>{kategori.label}</SelectItem>
              ))}
            </Select>
            <Button className="bg-sky-600 text-white py-[28px] font-semibold">Add Product +</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
