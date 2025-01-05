import { FaDropbox } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";

const Edit = () => {
  const { productId } = useParams(); // Mengambil id dari URL
  const [totalBarang, setTotalBarang] = useState(0);
  const [barangMasuk, setBarangMasuk] = useState(0);
  const [barangKeluar, setBarangKeluar] = useState(0);
  const [formData, setFormData] = useState({
    namaBarang: "",
    kategori: "",
    tanggalMasuk: "",
    jumlahStock: 0,
  });
  const [editable, setEditable] = useState({
    namaBarang: false,
    kategori: false,
    tanggalMasuk: false,
    jumlahStock: false,
  });
  const [kategoriOptions, setKategoriOptions] = useState([
    "Elektronics",
    "Clothing",
    "Books ",
  ]);
  const [saveStatus, setSaveStatus] = useState<string | null>(null); // Status untuk menunjukkan apakah penyimpanan berhasil

  const getTokenFromCookies = () => {
    const name = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getTokenFromCookies();
        if (!token) {
          console.log("Token tidak ditemukan, silakan login terlebih dahulu");
          setSaveStatus("Token tidak ditemukan. Silakan login.");
          return;
        }

        // Ambil data produk berdasarkan ID
        const productResponse = await fetch(
          `http://localhost:3000/api/products/${productId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (productResponse.ok) {
          const productData = await productResponse.json();
          setFormData({
            namaBarang: productData.name || "",
            kategori: productData.category || "", // Menggunakan kategori yang diterima langsung
            tanggalMasuk: productData.last_input_date
              ? productData.last_input_date.split("T")[0]
              : "", // Menangani tanggal
            jumlahStock: productData.quantity || 0,
          });
        } else {
          console.error(
            "Gagal mengambil detail produk:",
            productResponse.statusText
          );
          setSaveStatus(
            `Gagal mengambil detail produk: ${productResponse.statusText}`
          );
        }

        // Mengambil data total barang, barang masuk, dan barang keluar
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
        setSaveStatus("Terjadi kesalahan saat mengambil data.");
      }
    };

    if (productId) {
      fetchData();
    } else {
      console.error("ID produk tidak ditemukan di URL.");
      setSaveStatus("ID produk tidak ditemukan di URL.");
    }
  }, [productId]); // Menggunakan productId sebagai dependency

  const toggleEdit = (field: keyof typeof editable) => {
    setEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Data yang disimpan:", formData);

    // Ambil token dari cookies
    const token = getTokenFromCookies();
    if (!token) {
      console.log("Token tidak ditemukan, silakan login terlebih dahulu");
      setSaveStatus("Token tidak ditemukan. Silakan login.");
      return;
    }

    if (!productId) {
      console.log("ID produk tidak ditemukan");
      setSaveStatus("ID produk tidak ditemukan.");
      return;
    }

    // Menentukan category_id berdasarkan kategori yang dipilih
    const categoryId =
      kategoriOptions.findIndex(
        (option) => option.toLowerCase() === formData.kategori.toLowerCase()
      ) + 1;
    if (categoryId === 0) {
      setSaveStatus("Kategori tidak valid.");
      return;
    }

    // Struktur data yang akan dikirim ke API
    const updatedData = {
      name: formData.namaBarang,
      category_id: categoryId, // Menggunakan category_id sebagai ID
      quantity: formData.jumlahStock,
      last_input_date: formData.tanggalMasuk,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Menggunakan token Bearer
          },
          body: JSON.stringify(updatedData), // Kirim data dalam format JSON
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Produk berhasil diperbarui:", responseData);
        setSaveStatus("Produk berhasil diperbarui!");
        // Bisa menambahkan notifikasi atau redirect setelah berhasil
      } else {
        console.error("Gagal memperbarui produk:", response.statusText);
        setSaveStatus(`Gagal memperbarui produk: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setSaveStatus("Terjadi kesalahan saat memperbarui produk.");
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

        {/* Form Edit */}
        <div className="relative overflow-x-auto  sm:rounded-lg mt-[20px] mx-[20px]">
          <form
            className="form-container bg-white w-[1140px] p-[20px] rounded-2xl shadow-md"
            onSubmit={handleSubmit}
          >
            {/* Nama Barang */}
            <div className="mb-[15px]">
              <label className="block text-[18px] font-medium mb-[5px]">
                Nama Barang
              </label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="text"
                  name="namaBarang"
                  value={formData.namaBarang}
                  onChange={handleInputChange}
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
              <label className="block text-[18px] font-medium mb-[5px]">
                Kategori
              </label>
              <div className="flex items-center gap-[10px]">
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full px-[15px] py-[10px] bg-[#466A92] text-white rounded-lg"
                  disabled={!editable.kategori}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {kategoriOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <TbEdit
                  className="text-[24px] text-black hover:text-blue-700 cursor-pointer"
                  onClick={() => toggleEdit("kategori")}
                />
              </div>
            </div>

            {/* Tanggal Masuk */}
            <div className="mb-[15px]">
              <label className="block text-[18px] font-medium mb-[5px]">
                Tanggal Masuk
              </label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="date"
                  name="tanggalMasuk"
                  value={formData.tanggalMasuk}
                  onChange={handleInputChange}
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
              <label className="block text-[18px] font-medium mb-[5px]">
                Jumlah Stock
              </label>
              <div className="flex items-center gap-[10px]">
                <input
                  type="number"
                  name="jumlahStock"
                  value={formData.jumlahStock}
                  onChange={handleInputChange}
                  className="w-full px-[15px] py-[10px] bg-[#466A92] text-white rounded-lg"
                  readOnly={!editable.jumlahStock}
                />
                <TbEdit
                  className="text-[24px] text-black hover:text-blue-700 cursor-pointer"
                  onClick={() => toggleEdit("jumlahStock")}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              //onClick={() => window.location.href = "/landing"}
              type="submit"
              className="w-full py-[12px] bg-blue-700 text-white rounded-lg hover:bg-blue-600"
            >
              Simpan Perubahan
            </button>
          </form>

          {/* Status */}
          {saveStatus && (
            <div className="mt-[20px] text-center text-[16px]">
              <p>{saveStatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
