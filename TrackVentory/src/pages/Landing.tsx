import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDropbox,
  FaUserCircle,
} from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory, MdDeleteForever } from "react-icons/md";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { TbEdit } from "react-icons/tb";

const Landing = () => {
  const navigate = useNavigate();
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [produk, setProduk] = useState([]);
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriTerpilih, setKategoriTerpilih] = useState("Pakaian"); // Kategori default
  const [statistik, setStatistik] = useState({
    masuk: 0,
    total: 0,
    keluar: 0,
  });

  // Mengambil user_id dari localStorage
  const user_id = localStorage.getItem("user_id") || "1";

  useEffect(() => {
    ambilDataProduk();
  }, [kategoriTerpilih]);

  const ambilDataProduk = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?user_id=${user_id}&category=${kategoriTerpilih}`
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      const data = await response.json();
      setProduk(data);

      // Menghitung statistik
      setStatistik({
        total: data.length,
        masuk: data.filter((p) => p.stock > 0).length,
        keluar: data.filter((p) => p.stock === 0).length,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const hapusProduk = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh data setelah menghapus
        ambilDataProduk();
      } else {
        console.error("Gagal menghapus produk");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const kategori = [
    "Pakaian",
    "Aksesoris",
    "Peralatan",
    "Elektronik",
    "Obat-obatan",
  ];

  // Filter produk berdasarkan kata kunci pencarian
  const produkTerfilter = produk.filter((item) =>
    item.name.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="min-h-screen bg-[#12376A] text-white w-64 px-5">
        <div className="flex items-center justify-center mt-5 gap-5">
          <FaDropbox className="text-4xl" />
          <h2 className="text-3xl font-semibold">TrackVentory</h2>
        </div>

        <div className="flex flex-col gap-5 mt-16">
          <button
            onClick={() => navigate("/landing")}
            className="flex items-center gap-8 px-5 py-4 bg-amber-600 rounded-xl hover:shadow-amber-500/50 hover:shadow-md transition-all"
          >
            <AiOutlineDashboard className="text-3xl" />
            <span className="text-xl">Dashboard</span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-8 px-5 py-4 hover:bg-white hover:text-black rounded-xl transition-all"
          >
            <MdOutlineHistory className="text-3xl" />
            <span className="text-xl">Riwayat</span>
          </button>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 bg-[#F2F4F3] p-4">
        {/* Header */}
        <div className="flex justify-end">
          <FaUserCircle className="text-4xl text-[#12376A]" />
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-3 gap-8 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <FaCircleArrowUp className="text-green-700 text-5xl" />
            <div>
              <h2 className="text-xl font-semibold">Barang Masuk</h2>
              <p className="text-xl">{statistik.masuk}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <BsBoxSeam className="text-amber-500 text-5xl" />
            <div>
              <h2 className="text-xl font-semibold">Total Barang</h2>
              <p className="text-xl">{statistik.total}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
            <FaCircleArrowDown className="text-red-700 text-5xl" />
            <div>
              <h2 className="text-xl font-semibold">Barang Keluar</h2>
              <p className="text-xl">{statistik.keluar}</p>
            </div>
          </div>
        </div>

        {/* Pencarian dan Filter */}
        <div className="flex justify-between items-center mt-8">
          <div className="relative flex items-center bg-white rounded-xl shadow-md w-96">
            <IoIosSearch className="ml-4 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Cari Barang.."
              className="w-full p-4 rounded-xl focus:outline-none"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <button
                onClick={() => setMenuTerbuka(!menuTerbuka)}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-xl shadow-md transition-colors"
              >
                <span>{kategoriTerpilih || "Kategori Barang"}</span>
                <IoIosArrowDown />
              </button>

              {menuTerbuka && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  {kategori.map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setKategoriTerpilih(item);
                        setMenuTerbuka(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/addproduct")}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-xl shadow-md transition-colors"
            >
              Tambah Produk +
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-center">No</th>
                  <th className="px-6 py-3">Nama Barang</th>
                  <th className="px-6 py-3">Kategori</th>
                  <th className="px-6 py-3 text-center">Jumlah Stok</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                  <th className="px-6 py-3 text-center">Hapus</th>
                </tr>
              </thead>
              <tbody>
                {produkTerfilter.length > 0 ? (
                  produkTerfilter.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4 text-center">{item.stock}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => navigate(`/edit/${item.id}`)}>
                          <TbEdit className="text-blue-600 hover:text-blue-800 text-2xl" />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => hapusProduk(item.id)}>
                          <MdDeleteForever className="text-red-600 hover:text-red-800 text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Tidak ada produk tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
