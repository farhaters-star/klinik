import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/history");
        setHistory(data.data);            
      } catch (err) {
        toast.error("Gagal memuat riwayat");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start pt-20">
      <div className="w-full max-w-4xl p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Riwayat Pendaftaran Pasien
        </h1>

        {/* Loading state */}
        {loading ? (
          <p className="text-center">Memuat data…</p>
        ) : history.length === 0 ? (
          <p className="text-center">Belum ada riwayat</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">No</th>
                  <th className="border px-4 py-2">Nama</th>
                  <th className="border px-4 py-2">Tanggal Lahir</th>
                  <th className="border px-4 py-2">Alamat</th>
                  <th className="border px-4 py-2">Keluhan</th>
                  <th className="border px-4 py-2">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={h._id}>
                    <td className="border px-4 py-2">{i + 1}</td>
                    <td className="border px-4 py-2">{h.name}</td>
                    <td className="border px-4 py-2">{h.tgl}</td>
                    <td className="border px-4 py-2">{h.alamat}</td>
                    <td className="border px-4 py-2">{h.keluhan}</td>
                    <td className="border px-4 py-2">
                      {new Date(h.createdAt).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
