import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";


const ubahData = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tgl, setTgl] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [gender,setGender] = useState("");

  const {id} = useParams(); // Get the ID from the URL parameters



  useEffect(() => {
  const getDataById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/patient/getData/${id}`);
      console.log(response);
      setName(response.data.data.name);
      setTgl(response.data.data.tgl);
      setAlamat(response.data.data.alamat);
      setKeluhan(response.data.data.keluhan);
      setGender(response.data.data.gender);
    } catch (error) {
      console.error("Error fetching data by ID:", error);
      toast.error("Gagal memuat data");
      
    }
  }
    getDataById();
  }, [id]);

  //update data
  const updateData = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await axiosInstance.put(`/patient/editData/${id}`, { name, alamat, tgl, keluhan,gender });
      toast.success("Data berhasil diubah");
      navigate("/patient");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengubah data");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 ">
  <div className="w-full max-w-md  p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-center mb-6">Update Data</h1>
    <form className="space-y-4" onSubmit={updateData}>
      <div>
        <label htmlFor="name" className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Masukkan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="tgl" className="block font-medium">Tanggal Lahir</label>
        <input
          type="text"
          name="tgl"
          id="tgl"
          placeholder="Masukkan tgl"
          value={tgl}
          onChange={(e) => setTgl(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="alamat" className="block font-medium">Alamat</label>
        <input
          type="text"
          name="alamat"
          id="alamat"
          placeholder="Masukkan Alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="keluhan" className="block font-medium">Keluhan</label>
        <input
          type="text"
          name="keluhan"
          id="keluhan"
          placeholder="Masukkan keluhan"
          value={keluhan}
          onChange={(e) => setKeluhan(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="gender" className="block font-medium">Jenis Kelamin</label>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="" disabled>-- Pilih Jenis Kelamin --</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Data
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default ubahData;
