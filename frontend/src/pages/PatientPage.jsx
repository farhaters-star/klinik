import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";
import { io } from "socket.io-client";
import { axiosInstance } from "../lib/axios";

const socket = io("http://localhost:5001");

const AddFormCRUD = () => {
  const { authUser } = useAuthStore();
  const isAdmin = authUser?.userType === "Admin";
  const isUser = authUser?.userType === "User";
  const isKaryawan = authUser?.userType === "karyawan";

  const [dataPatient, setDataPatient] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/patient/getAllPatient");
        setDataPatient(data.data);
      } catch (error) {
        console.error(error);
      }
    })();

    // Realtime socket listener
    socket.on("patient-updated", ({ action, data }) => {
      setDataPatient((prev) => {
        if (action === "add") {
          return [...prev, data];
        }
        if (action === "update") {
          return prev.map((p) => (p._id === data._id ? data : p));
        }
        if (action === "delete") {
          return prev.filter((p) => p._id !== data._id);
        }
        return prev;
      });
    });

    return () => {
      socket.off("patient-updated");
    };
  }, []);

  const deleteData = async (id) => {
    try {
      await axiosInstance.delete(`/patient/deleteData/${id}`);
      toast.success("Data berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-20">
      <div className="w-full max-w-5xl shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Formulir Pendaftaran
        </h1>

        {isUser && (
  <div className="mb-4 text-right">
    <Link
      to="/addData"
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Silakan daftar di sini
    </Link>
  </div>
)}


        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Lengkap</th>
                <th className="border px-4 py-2">Tanggal Lahir</th>
                <th className="border px-4 py-2">Alamat</th>
                <th className="border px-4 py-2">Jenis Kelamin</th>
                {isAdmin && (
                  <th className="border px-4 py-2">Keluhan</th>
                )}
                {isKaryawan && (<th className="border px-4 py-2">Aksi</th>)}
              </tr>
            </thead>
            <tbody>
              {dataPatient.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="py-4 text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                dataPatient.map((p, i) => (
                  <tr key={p._id}>
                    <td className="border px-4 py-2">{i + 1}</td>
                    <td className="border px-4 py-2">{p.name}</td>
                    <td className="border px-4 py-2">{p.tgl}</td>
                    <td className="border px-4 py-2">{p.alamat}</td>
                    <td className="border px-4 py-2">{p.gender}</td>
                    {isAdmin && (
                      <td className="border px-4 py-2">
                        {p.keluhan || "-"}
                      </td>
                    )}
                 {isKaryawan && (
                    <td className="border px-4 py-2 space-x-2">
                      <Link to={`/editData/${p._id}`}>
                        <i className="fa-solid fa-pen-to-square" title="Edit Data"></i>
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(p._id);
                          setShowConfirmModal(true);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash text-red-600 hover:text-red-800"
                          title="Delete Data"
                        ></i>
                      </button>
                    </td>
                  )}

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal konfirmasi */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Konfirmasi Penghapusan
            </h2>
            <p className="mb-6">
              Apakah Anda yakin ingin menghapus data ini?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  deleteData(deleteId);
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFormCRUD;
