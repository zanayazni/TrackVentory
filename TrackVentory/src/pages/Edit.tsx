import { FaDropbox } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
{/* tabel area */}{/* tabel area */}
import { TbEdit } from "react-icons/tb"

const Edit = () => {
  const navigate = useNavigate();

  // State untuk mengontrol mode edit
  const [editable, setEditable] = useState({
    namaBarang: false,
    kategori: false,
    tanggalMasuk: false,
    jumlahStock: false,
  });

  // Fungsi untuk mengaktifkan mode edit pada field tertentu
  const toggleEdit = (field) => {
    setEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="body-landing flex min-h-screen">
      {/* Sidebar */}
      <div className="sidebar min-h-screen bg-[#12376A] text-white w-[25rem] px-[20px]">
        <div className="head flex flex-row items-center justify-center mt-[20px] gap-[20px]">
          <FaDropbox className="text-[40px]" />
          <h2 className="text-[30px] font-semibold">TrackVentory</h2>
        </div>
        <div className="button-area flex flex-col justify-center mt-[60px] gap-[20px]">
          <div className="button flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-amber-600 hover:rounded-2xl hover:cursor-pointer hover:text-black">
            <AiOutlineDashboard className="text-[35px]" />
            <h2 className="text-[25px]">Dashboard</h2>
          </div>
          <div className="button flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-amber-600 hover:rounded-2xl hover:cursor-pointer hover:text-black">
            <MdOutlineHistory className="text-[35px]" />
            <h2 className="text-[25px]">History</h2>
          </div>
        </div>
      </div>

      {/* Main board */}
      <div className="main-board min-h-screen bg-[#F2F4F3] flex flex-col w-full text-black px-[16px]">
        {/* Header */}
        <div className="head flex flex-row justify-end items-center mt-[10px]">
          <FaUserCircle className="text-[40px] text-[#12376A]" />
        </div>

        {/* Informasi Barang */}
        <div className="container flex justify-center mt-[20px]">
          <div className="box flex flex-row gap-[45px]">
            <div className="box-1 bg-white flex flex-row items-center gap-[10px] w-[350px] px-[20px] py-[20px] rounded-2xl shadow-md">
              <FaCircleArrowUp className="text-green-700 text-[60px]" />
              <div className="text flex flex-col items-start text-[20px]">
                <h2 className="font-semibold">Barang Masuk</h2>
                <h2>100</h2>
              </div>
            </div>
            <div className="box-2 bg-white flex flex-row items-center gap-[10px] w-[350px] px-[20px] py-[20px] rounded-2xl shadow-md">
              <BsBoxSeam className="text-warning text-[60px]" />
              <div className="text flex flex-col items-start text-[20px]">
                <h2 className="font-semibold">Total Barang</h2>
                <h2>100</h2>
              </div>
            </div>
            <div className="box-3 bg-white flex flex-row items-center gap-[10px] w-[350px] px-[20px] py-[20px] rounded-2xl shadow-md">
              <FaCircleArrowDown className="text-red-700 text-[60px]" />
              <div className="text flex flex-col items-start text-[20px]">
                <h2 className="font-semibold">Barang Keluar</h2>
                <h2>100</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Form Edit */}
        <div className="container flex flex-col items-center gap-[20px] mt-[40px]">
          <form className="form-container bg-white w-[1142px] p-[20px] mx-[20px] rounded-2xl shadow-md">
            {/* nama Barang */}
            <div className="mb-[15px]">
              <label className="block text-[18px] font-medium mb-[5px]">Nama Barang</label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="text"
                  className="w-full px-[15px] py-[10px] bg-[#466A92] text-white rounded-lg"
                  readOnly={!editable.namaBarang}
                />
                <TbEdit
                  className="text-[24px] text-black hover:text-blue-700 cursor-pointer"
                  onClick={() => toggleEdit("namaBarang")}
                />
              </div>
            </div>

            {/* Kategori */}
            <div className="mb-[15px]">
              <label className="block text-[18px] font-medium mb-[5px]">Kategori</label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="text"
                  className="w-full px-[15px] py-[10px] bg-[#466A92] text-white rounded-lg"
                  readOnly={!editable.kategori}
                />
                <TbEdit
                  className="text-[24px] text-black hover:text-blue-700 cursor-pointer"
                  onClick={() => toggleEdit("kategori")}
                />
              </div>
            </div>

            {/* Tanggal Masuk */}
            <div className="mb-[15px]">
              <label className="block text-[18px] font-medium mb-[5px]">Tanggal Masuk</label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="date"
                  className="w-full px-[15px] py-[10px] bg-[#466A92] text-white rounded-lg"
                  readOnly={!editable.tanggalMasuk}
                />
                <TbEdit
                  className="text-[24px] text-black hover:text-blue-700 cursor-pointer"
                  onClick={() => toggleEdit("tanggalMasuk")}
                />
              </div>
            </div>

            {/* Jumlah Stock */}
            <div className="mb-[15px]">
              <label className="block text-[18px] font-medium mb-[5px]">Jumlah Stock</label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="number"
                  className="w-full px-[15px] py-[10px] bg-[#466A92] text-white rounded-lg"
                  readOnly={!editable.jumlahStock}
                />
                <TbEdit
                  className="text-[24px] text-black hover:text-blue-700 cursor-pointer"
                  onClick={() => toggleEdit("jumlahStock")}
                />
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              className="w-full py-[10px] bg-[#466A92] text-white rounded-lg font-bold hover:bg-[#345472]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
