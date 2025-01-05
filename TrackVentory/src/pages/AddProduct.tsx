import { useNavigate } from "react-router-dom";
import { FaDropbox } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [totalBarang, setTotalBarang] = useState(0);
  const [barangMasuk, setBarangMasuk] = useState(0);
  const [barangKeluar, setBarangKeluar] = useState(0);

  // Function to get the token from cookies
  const getTokenFromCookies = () => {
    const name = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1); // Remove leading spaces
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length); // Return token
      }
    }
    return ""; // Return empty string if no token is found
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromCookies(); // Retrieve token from cookies
        if (!token) {
          console.log("Token not found, please log in first");
          return;
        }

        // Fetch total product count
        const totalResponse = await fetch(
          "http://localhost:3000/api/products/user/total-product",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const totalData = await totalResponse.json();
        setTotalBarang(totalData.total_product || 0);

        // Fetch incoming stock
        const masukResponse = await fetch(
          "http://localhost:3000/api/products/user/stock-in",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const masukData = await masukResponse.json();
        setBarangMasuk(masukData.total_stock_in || 0);

        // Fetch outgoing stock
        const keluarResponse = await fetch(
          "http://localhost:3000/api/products/user/stock-out",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const keluarData = await keluarResponse.json();
        setBarangKeluar(keluarData.total_stock_out || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Form data state
  const [formData, setFormData] = useState({
    namaBarang: "",
    kategori: "",
    tanggalMasuk: "",
    jumlahStock: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getTokenFromCookies(); // Get the token from cookies

    if (!token) {
      console.log("Token not found, please log in first");
      return;
    }

    const productData = {
      name: formData.namaBarang,
      category_id:
        formData.kategori === "Electronics"
          ? 1
          : formData.kategori === "Clothing"
          ? 2
          : 3,
      quantity: parseInt(formData.jumlahStock),
      last_input_date: formData.tanggalMasuk,
    };

    try {
      const response = await fetch("http://localhost:3000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Product added successfully:", data);
        navigate("/products"); // Navigate to a product listing or another page upon success
      } else {
        console.error("Error adding product:", data);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
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
          <button
            onClick={() => (window.location.href = "/landing")}
            className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] bg-amber-600 rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-amber-500"
          >
            <AiOutlineDashboard className="text-[35px]" />
            <h2 className="text-[25px]">Dashboard</h2>
          </button>
          <button
            onClick={() => (window.location.href = "/history")}
            className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-white hover:rounded-2xl hover:cursor-pointer hover:text-black"
          >
            <MdOutlineHistory className="text-[35px]" />
            <h2 className="text-[25px]">History</h2>
          </button>
        </div>
      </div>

      {/* Main board */}
      <div className="main-board min-h-screen bg-[#F2F4F3] flex flex-col w-full text-black px-[16px]">
        <div className="head flex flex-row justify-end items-center mt-[10px]">
          <FaUserCircle className="text-[40px] text-[#12376A]" />
        </div>
        <div className="container flex flex-col items-center gap-[20px] mt-[20px]">
          {/* Product information boxes */}
          <div className="container flex justify-center ">
            <div className="box flex flex-row gap-[45px] ">
              <div className="box-1 bg-white flex flex-row items-center gap-[10px] w-[350px] px-[20px] py-[20px] rounded-2xl shadow-md">
                <FaCircleArrowUp className="text-green-700 text-[60px]" />
                <div className="text flex flex-col items-start text-[20px]">
                  <h2 className="font-semibold">Barang Masuk</h2>
                  <h2>{barangMasuk}</h2>
                </div>
              </div>
              <div className="box-2 bg-white flex flex-row items-center gap-[10px] w-[350px] px-[20px] py-[20px] rounded-2xl shadow-md">
                <BsBoxSeam className="text-warning text-[60px]" />
                <div className="text flex flex-col items-start text-[20px]">
                  <h2 className="font-semibold">Total Barang</h2>
                  <h2>{totalBarang}</h2>
                </div>
              </div>
              <div className="box-3 bg-white flex flex-row items-center gap-[10px] w-[350px] px-[20px] py-[20px] rounded-2xl shadow-md">
                <FaCircleArrowDown className="text-red-700 text-[60px]" />
                <div className="text flex flex-col items-start text-[20px]">
                  <h2 className="font-semibold">Barang Keluar</h2>
                  <h2>{barangKeluar}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Form for adding a new product */}
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
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="border border-gray-300 p-[10px] rounded-md"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                </select>
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
                onClick={() => (window.location.href = "/landing")}
                type="submit"
                className="bg-[#4E6990] text-white py-[10px] px-[20px] rounded-md hover:bg-blue-600"
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
