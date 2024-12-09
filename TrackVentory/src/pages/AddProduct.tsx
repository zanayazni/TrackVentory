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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data Barang Baru:", formData);
        // Tambahkan logika penyimpanan data
    };

    return (
        <div className="body-landing flex min-h-screen">
            <div className="sidebar min-h-screen bg-[#12376A] text-white w-[25rem] px-[20px]">
                <div className="head flex flex-row items-center justify-center mt-[20px] gap-[20px]">
                    <FaDropbox className="text-[40px]" />
                    <h2 className="text-[30px] font-semibold">TrackVentory</h2>
                </div>
                <div className="button-area flex flex-col justify-center mt-[60px] gap-[20px]">
                    <div className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-amber-600 hover:rounded-2xl hover:cursor-pointer hover:text-black">
                        <AiOutlineDashboard className="text-[35px]" />
                        <h2 className="text-[25px]">Dashboard</h2>
                    </div>
                    <div className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-amber-600 hover:rounded-2xl hover:cursor-pointer hover:text-black">
                        <MdOutlineHistory className="text-[35px]" />
                        <h2 className="text-[25px]">History</h2>
                    </div>
                </div>
            </div>
            <div className="main-board min-h-screen bg-[#F2F4F3] flex flex-col w-full text-black px-[16px]">
                <div className="head flex flex-row justify-end items-center mt-[16px]">
                    <FaUserCircle className="text-[40px] text-[#12376A]" />
                </div>
                <div className="container flex flex-col items-center gap-[20px]">
                    {/* Kotak informasi */}
                    <div className="box flex flex-row gap-[40px]">
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
                    {/* Form "Buat Data Barang Baru" */}
                    <div className="form-container bg-white w-[500px] p-[20px] rounded-2xl shadow-xl">
                        <h2 className="text-[25px] font-bold mb-[20px] text-center">Buat Data Barang Baru</h2>
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
                                className="bg-blue-500 text-white py-[10px] px-[20px] rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
