import { FaDropbox } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
/* search */
import { IoIosSearch } from "react-icons/io";
/* sorting */
import { IoIosArrowDown } from "react-icons/io";
/* tabel area */
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const Landing = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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

        {/* search bar */}
        <div className="search-engine flex flex-row items-center justify-between px-[20px] mt-[30px] ">
          <div className="relative flex items-center w-[500px] py-[17px] rounded-xl bg-white focus-within:shadow-lg overflow-hidden shadow-md">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <IoIosSearch className="h-6 w-6 text-gray-300" />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search Barang.."
            />
          </div>

          {/* sorting */}
          <div className="katbar flex flex-row items-center gap-[10px] ">
            <div className="relative inline-block text-left ">
              <button
                onClick={toggleDropdown}
                className="text-white py-[17px] bg-blue-700 hover:bg-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center shadow-md"
              >
                Kategori Barang
                <IoIosArrowDown className="ml-[14px] text-[19px] font-extrabold" />
              </button>

              {isOpen && (
                <div
                  id="dropdown"
                  className="z-10 absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Pakaian
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Aksesoris
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Peralatan
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Elektronik
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Obat-obatan
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              className="text-white py-[17px] bg-blue-700 hover:bg-blue-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center shadow-md"
              onClick={() => navigate("/AddProduct")}
            >
              Add Product +
            </button>
          </div>
        </div>

        {/* tabel area */}
        <div className="relative bg-white overflow-x-auto shadow-md sm:rounded-lg mt-[20px] mx-[20px]">
          <div className="h-[400px] overflow-y-auto">
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 align-middle">1</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4 text-left">Laptop</td>
                  <td className="px-6 py-4 align-middle">$2999</td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <TbEdit
                        className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:text-[#12376A]"
                        onClick={() => navigate("/edit")}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <MdDeleteForever className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:cursor-pointer hover:text-[#12376A]" />
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 align-middle">1</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4 text-left">Laptop</td>
                  <td className="px-6 py-4 align-middle">$2999</td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <TbEdit
                        className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:text-[#12376A]"
                        onClick={() => navigate("/edit")}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <MdDeleteForever className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:cursor-pointer hover:text-[#12376A]" />
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 align-middle">2</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4 text-left">Laptop PC</td>
                  <td className="px-6 py-4 align-middle">$1999</td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <TbEdit
                        className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:text-[#12376A]"
                        onClick={() => navigate("/edit")}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <MdDeleteForever className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:cursor-pointer hover:text-[#12376A]" />
                    </button>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 align-middle">3</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4 text-left">Accessories</td>
                  <td className="px-6 py-4 align-middle">$99</td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <TbEdit
                        className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:text-[#12376A]"
                        onClick={() => navigate("/edit")}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <MdDeleteForever className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:cursor-pointer hover:text-[#12376A]" />
                    </button>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 align-middle">3</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4 text-left">Accessories</td>
                  <td className="px-6 py-4 align-middle">$99</td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <TbEdit
                        className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:text-[#12376A]"
                        onClick={() => navigate("/edit")}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <MdDeleteForever className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:cursor-pointer hover:text-[#12376A]" />
                    </button>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 align-middle">3</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4 text-left">Accessories</td>
                  <td className="px-6 py-4 align-middle">$99</td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <TbEdit
                        className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:text-[#12376A]"
                        onClick={() => navigate("/edit")}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <MdDeleteForever className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:cursor-pointer hover:text-[#12376A]" />
                    </button>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 align-middle">3</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4 text-left">Accessories</td>
                  <td className="px-6 py-4 align-middle">$99</td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <TbEdit
                        className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:text-[#12376A]"
                        onClick={() => navigate("/edit")}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <button>
                      <MdDeleteForever className="font-medium text-blue-600 dark:text-blue-500 text-[30px] hover:cursor-pointer hover:text-[#12376A]" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
