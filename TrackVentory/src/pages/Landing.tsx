import { FaDropbox } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { BsBoxSeam } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
{
  /* tabel area */
}
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
}
export const kategori = [
  { key: "Electronics", label: "Electronics" },
  { key: "Books", label: "Books" },
  { key: "Clothing", label: "Clothing" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [totalBarang, setTotalBarang] = useState(0);
  const [barangMasuk, setBarangMasuk] = useState(0);
  const [barangKeluar, setBarangKeluar] = useState(0);
  const [products, setProducts] = useState<Product[]>([]); // An array of Product objects
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromCookies(); // Ambil token dari cookies
        if (!token) {
          console.log("Token tidak ditemukan, silakan login terlebih dahulu");
          return;
        }

        // Fetch total barang
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

        // Fetch barang masuk
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

        // Fetch barang keluar
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
        // Fetch all products
        const productsResponse = await fetch(
          "http://localhost:3000/api/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const productsData = await productsResponse.json();
        setProducts(productsData || []); // Save products to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const token = getTokenFromCookies();
      if (!token) {
        console.log("Token tidak ditemukan, silakan login terlebih dahulu");
        return;
      }

      const searchResponse = await fetch(
        `http://localhost:3000/api/products/search?name=${searchQuery}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const searchData = await searchResponse.json();
      setProducts(searchData || []);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handleCategoryChange = async (key: string) => {
    setSelectedCategory(key);
    console.log("Kategori yang dipilih:", selectedCategory);
    try {
      const token = getTokenFromCookies();
      if (!token) {
        console.log("Token tidak ditemukan, silakan login terlebih dahulu");
        return;
      }

      const categoryResponse = await fetch(
        `http://localhost:3000/api/products/filter?category=${key}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const categoryData = await categoryResponse.json();
      setProducts(categoryData || []);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );
    if (!confirmDelete) return;

    try {
      const token = getTokenFromCookies();
      if (!token) {
        console.log("Token tidak ditemukan, silakan login terlebih dahulu");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Produk berhasil dihapus");
        setProducts(products.filter((product) => product.id !== id));
      } else {
        alert("Gagal menghapus produk");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
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

      {/* Main Board */}
      <div className="main-board min-h-screen bg-[#F2F4F3] flex flex-col w-full text-black px-[16px]">
        <div className="head flex flex-row justify-end items-center mt-[10px]">
          <FaUserCircle className="text-[40px] text-[#12376A]" />
        </div>

        {/* Kotak Informasi */}
        <div className="container flex justify-center mt-[20px]">
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

        {/* search bar */}
        <div className="search-engine flex flex-row items-center justify-between px-[20px] mt-[30px] ">
          <div className="search">
            <div className="relative flex items-center w-[500px] h-[55px] rounded-2xl focus-within:shadow-lg bg-white overflow-hidden shadow-md">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search Barang.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="bg-blue-600 text-white py-[28px] font-semibold"
            onClick={handleSearch}
          >
            Search
          </Button>

          {/* sorting */}
          <div className="katbar flex flex-row items-center gap-[10px]">
            <Select
              className="w-[300px] shadow-lg"
              size="md"
              label="Pilih Kategori"
              placeholder="Select a Category"
              onChange={(key) => handleCategoryChange(key.target.value)}
            >
              {kategori.map((kategori) => (
                <SelectItem key={kategori.key}>{kategori.label}</SelectItem>
              ))}
            </Select>
            <Button
              className="bg-blue-600 text-white py-[28px] font-semibold"
              onClick={() => navigate("/AddProduct")}
            >
              Add Product +
            </Button>
          </div>
        </div>

        {/* Tabel Produk */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[20px] mx-[20px]">
          <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Nama Barang
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 text-left">{product.name}</td>
                    <td className="px-6 py-4 text-left">{product.category}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => navigate(`/${product.id}`)}>
                        <TbEdit className="text-[30px] text-blue-600 hover:text-[#12376A]" />
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <button>
                        <MdDeleteForever
                          className="text-[30px] text-red-600 hover:text-[#12376A]"
                          onClick={() => handleDelete(product.id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Landing;
