import { useNavigate } from "react-router-dom";
import { FaDropbox } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import React, { useState } from "react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaBarang: "",
    kategori: "",
    tanggalMasuk: "",
    jumlahStock: "",
  });

  const [showNotification, setShowNotification] = useState(false); // State untuk notifikasi

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Barang Baru:", formData);
    // Tambahkan logika penyimpanan data di sini

    // Menampilkan notifikasi
    setShowNotification(true);

    // Menyembunyikan notifikasi setelah 3 detik dan navigasi ke halaman lain
    setTimeout(() => {
      setShowNotification(false);
      navigate("/landing"); // Arahkan ke halaman lain setelah data berhasil disimpan
    }, 1000);
  };

  return (
    <div className="body-landing flex min-h-screen">
      {/* side bar */}
      <div className="sidebar min-h-screen bg-[#12376A] text-white w-[25rem] px-[20px]">
        <div className="head flex flex-row items-center justify-center mt-[20px] gap-[20px]">
          <FaDropbox className="text-[40px]" />
          <h2 className="text-[30px] font-semibold">TrackVentory</h2>
        </div>
        <div className="button-area flex flex-col justify-center mt-[60px] gap-[20px]">
          <button
            onClick={() => {
              // Navigate to the current dashboard route
              navigate("/landing");

              // Trigger a page reload to refresh the dashboard
              window.location.reload();
            }}
            className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] bg-amber-600 rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-amber-500"
          >
            <AiOutlineDashboard className="text-[35px]" />
            <h2 className="text-[25px]">Dashboard</h2>
          </button>
          <button
            onClick={() => navigate("/History")}
            className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-white hover:rounded-2xl hover:cursor-pointer hover:text-black hover:shadow-md"
          >
            <MdOutlineHistory className="text-[35px]" />
            <h2 className="text-[25px]">History</h2>
          </button>
        </div>
      </div>

      {/* Main board */}
      <div className="main-board min-h-screen bg-[#F2F4F3] flex flex-col w-full text-black px-[16px]">
        {/* Header */}
        <div className="head flex flex-row justify-end items-center mt-[10px]">
          <FaUserCircle className="text-[40px] text-[#12376A]" />
        </div>

        {/* Informasi Barang */}
        <div className="container flex justify-center mt-[10px]">
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

        {/* Form "Buat Data Barang Baru" */}
        <div className="container flex flex-col items-center gap-[20px] mt-[30px]">
          <div className="form-container bg-white w-[1142px] p-[20px] mx-[20px] rounded-2xl shadow-md">
            <h2 className="text-[25px] font-bold mb-[20px]">
              Buat Data Barang Baru
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
              <label className="flex flex-col">
                Nama Barang
                <input
                  type="text"
                  name="namaBarang"
                  value={formData.namaBarang}
                  onChange={handleChange}
                  className="border border-gray-300 p-[10px] rounded-md"
                />
              </label>
              <label className="flex flex-col">
                Kategori
                <input
                  type="text"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="border border-gray-300 p-[10px] rounded-md"
                />
              </label>
              <label className="flex flex-col">
                Tanggal Masuk
                <input
                  type="date"
                  name="tanggalMasuk"
                  value={formData.tanggalMasuk}
                  onChange={handleChange}
                  className="border border-gray-300 p-[10px] rounded-md"
                />
              </label>
              <label className="flex flex-col">
                Jumlah Stock
                <input
                  type="number"
                  name="jumlahStock"
                  value={formData.jumlahStock}
                  onChange={handleChange}
                  className="border border-gray-300 p-[10px] rounded-md"
                />
              </label>
              <button
                type="submit"
                className="bg-amber-600 text-white py-[10px] px-[20px] rounded-md hover:bg-[#12376A]"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Notifikasi */}
      {showNotification && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Data baru berhasil dibuat!
        </div>
      )}
    </div>
  );
};

export default AddProduct;
