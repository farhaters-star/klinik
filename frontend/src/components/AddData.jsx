
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { axiosInstance } from "../lib/axios";

const AddData = () => {
  const navigate = useNavigate();
  const [tgl, setTgl] = useState("");
  const [name, setName] = useState(""); 
  const [alamat, setAlamat] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [gender,setGender] = useState("")
  const [dataPatient, setDataPatient] = useState([]);

 const getData = async () => {
    try {
      const {data} = await axiosInstance.get('/patient/getAllPatient');
      console.log(data.data);
      setDataPatient(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  //add data
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosInstance.post('/patient/addPatient', {
      name,
      tgl,
      alamat,
      keluhan,
      gender
    });

    console.log(response.data);
    toast.success("Data berhasil ditambahkan");
    navigate('/patient');
  } catch (error) {
    console.error("Error adding data:", error);

  }
};


  return (
   <div className="min-h-screen flex justify-center items-start pt-20 ">
  <div className="w-full max-w-md  p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-center mb-6">Pendaftaran Pasien</h1>
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label htmlFor="name" className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Masukkan Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="tgl" className="block font-medium mb-1">tgl</label>
        <input
          type="date"
          name="tgl"
          id="tgl"
          placeholder="Masukkan alamat"
          value={tgl}
          onChange={(e) => setTgl(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="alamat" className="block font-medium mb-1">alamat</label>
        <input
          type="text"
          name="alamat"
          id="alamat"
          placeholder="Masukkan alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="keluhan" className="block font-medium mb-1">Keluhan</label>
        <input
          type="text"
          name="keluhan"
          id="keluhan"
          placeholder="Masukkan Keluhan"
          value={keluhan}
          onChange={(e) => setKeluhan(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block font-medium mb-1">Jenis Kelamin</label>
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
          Simpan
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddData;
