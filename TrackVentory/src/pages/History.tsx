import { FaDropbox } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoIosCalendar } from "react-icons/io"; // Untuk ikon kalender

const History = () => {
  const navigate = useNavigate();

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
              navigate("/landing");
              window.location.reload();
            }}
            className="button-1 flex flex-row items-center gap-[30px] px-[20px] py-[15px] hover:bg-white hover:rounded-2xl hover:cursor-pointer hover:text-black hover:shadow-md"
          >
            <AiOutlineDashboard className="text-[35px]" />
            <h2 className="text-[25px]">Dashboard</h2>
          </button>
          <button
            onClick={() => navigate("/History")}
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
                  <label className="text-sm text-gray-700">
                    Tanggal Akhir:
                  </label>
                  <IoIosCalendar className="text-[20px] text-gray-500" />
                  <input
                    type="date"
                    className="px-[10px] py-[5px] border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Print Button */}
                <button className="bg-[#12376A] py-[10px] w-[100px] mr-[10px] rounded-xl text-white rounded-lg hover:bg-blue-700">
                  Print
                </button>
              </div>

              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-[20px] py-[10px]">Nama Barang</th>
                    <th className="px-[20px] py-[10px]">Kategori</th>
                    <th className="px-[20px] py-[10px]">Stock Lama</th>
                    <th className="px-[20px] py-[10px]">Keluar\Masuk</th>
                    <th className="px-[20px] py-[10px]">Stock Baru</th>
                    <th className="px-[20px] py-[10px]">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Data tabel */}
                  <tr>
                    <td className="px-[20px] py-[10px]">Barang A</td>
                    <td className="px-[20px] py-[10px]">Kategori 1</td>
                    <td className="px-[20px] py-[10px]">50</td>
                    <td className="px-[20px] py-[10px]">Masuk</td>
                    <td className="px-[20px] py-[10px]">70</td>
                    <td className="px-[20px] py-[10px]">12/12/2024</td>
                  </tr>
                  {/* Tambahkan baris lainnya */}
                </tbody>
                <tbody>
                  {/* Data tabel */}
                  <tr>
                    <td className="px-[20px] py-[10px]">Barang A</td>
                    <td className="px-[20px] py-[10px]">Kategori 1</td>
                    <td className="px-[20px] py-[10px]">50</td>
                    <td className="px-[20px] py-[10px]">Masuk</td>
                    <td className="px-[20px] py-[10px]">70</td>
                    <td className="px-[20px] py-[10px]">12/12/2024</td>
                  </tr>
                  {/* Tambahkan baris lainnya */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
