import { FaDropbox } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { IoIosCalendar } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import autoTable plugin

interface HistoryItem {
  product_name: string;
  stock_change: number;
  description: string;
  action_date: string;
}

const History = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract token from cookies
  const getTokenFromCookies = () => {
    const name = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }
    return ""; // Return empty string if token not found
  };

  // Fetch history data
  useEffect(() => {
    const fetchHistory = async () => {
      const token = getTokenFromCookies();

      if (!token) {
        console.log("Token tidak ditemukan. Silakan login.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data history");
        }

        const data = await response.json();
        setHistoryData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching history data:", error);
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Fetch PDF file and download
  const fetchPDF = async () => {
    const token = getTokenFromCookies();

    if (!token) {
      console.log("Token tidak ditemukan. Silakan login.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data history");
      }

      const data = await response.json();
      
      // Membuat PDF dengan jsPDF
      const doc = new jsPDF();

      // Menambahkan judul
      doc.setFontSize(20);
      doc.text("History Report", 14, 20);

      // Menambahkan tabel header
      doc.setFontSize(12);
      const tableColumn = ["Nama Barang", "Perubahan Stok", "Keterangan", "Tanggal"];
      const tableRows = data.map((item: HistoryItem) => [
        item.product_name,
        item.stock_change.toString(),
        item.description,
        new Date(item.action_date).toLocaleDateString("id-ID"),
      ]);

      // Menambahkan tabel ke PDF menggunakan autoTable
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30, // Mengatur posisi Y untuk mulai menambahkan tabel
      });

      // Menyimpan PDF
      doc.save("history.pdf");

    } catch (error) {
      console.error("Error fetching PDF:", error);
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
            onClick={() => window.location.href = "/landing"}
            className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-white hover:rounded-2xl hover:cursor-pointer hover:text-black"
          >
            <AiOutlineDashboard className="text-[35px]" />
            <h2 className="text-[25px]">Dashboard</h2>
          </button>
          <button
            onClick={() => window.location.href = "/history"}
            className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] bg-amber-600 rounded-2xl hover:cursor-pointer hover:shadow-sm hover:shadow-amber-500"
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

        {/* Tabel */}
        <div className="relative bg-white overflow-x-auto shadow-md sm:rounded-lg mt-[20px] mx-[20px]">
          <div className="h-full overflow-y-auto">
            <div className="mt-[30px]">
              <div className="flex justify-between items-center mb-[20px]">
                {/* Tanggal Awal */}
                <div className="flex items-center gap-[10px]">
                  <label className="text-sm text-gray-700 ml-[20px]">Tanggal Awal:</label>
                  <IoIosCalendar className="text-[20px] text-gray-500" />
                  <input
                    type="date"
                    className="px-[10px] py-[5px] border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Tanggal Akhir */}
                <div className="flex items-center gap-[10px]">
                  <label className="text-sm text-gray-700">Tanggal Akhir:</label>
                  <IoIosCalendar className="text-[20px] text-gray-500" />
                  <input
                    type="date"
                    className="px-[10px] py-[5px] border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Print Button */}
                <button
                  onClick={fetchPDF}
                  className="bg-[#12376A] py-[10px] w-[100px] mr-[10px] rounded-xl text-white rounded-lg hover:bg-blue-700"
                >
                  Print
                </button>
              </div>

              {/* Tabel Data */}
              {isLoading ? (
                <p className="text-center py-[20px] text-gray-500">Loading...</p>
              ) : (
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-[20px] py-[10px]">Nama Barang</th>
                      <th className="px-[20px] py-[10px]">Perubahan Stok</th>
                      <th className="px-[20px] py-[10px]">Keterangan</th>
                      <th className="px-[20px] py-[10px]">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.length > 0 ? (
                      historyData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-[20px] py-[10px]">{item.product_name}</td>
                          <td className="px-[20px] py-[10px]">{item.stock_change}</td>
                          <td className="px-[20px] py-[10px]">{item.description}</td>
                          <td className="px-[20px] py-[10px]">
                            {new Date(item.action_date).toLocaleDateString("id-ID")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-[10px]">Data tidak ditemukan.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
