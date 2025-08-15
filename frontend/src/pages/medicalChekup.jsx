import React, { useEffect, useState, useRef } from "react";

import {Link} from "react-router-dom";

export default function MedicalUpPage() {
const [visibleSections, setVisibleSections] = useState({});

const sectionRefs = useRef({});

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    },
    { threshold: 0.2 }
  );

  Object.values(sectionRefs.current).forEach((section) => {
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
}, []);


return (
     <div className="font-sans">
      {/* Hero Section */}
<section
  ref={(el) => (sectionRefs.current["hero"] = el)}
  data-id="hero"
  className="p-8 mt-10 bg-cover bg-center bg-fixed relative min-h-[600px] flex items-center"
  style={{
    backgroundImage: "url('/sa.jpg')",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
>

  {/* Overlay transparan gelap */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

  {/* Konten */}
 <div
    className={`text-center md:text-left md:w-1/2 px-4 transform transition-all duration-1000 ease-out ${
      visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
  >
  <h2 className="font-extrabold text-5xl md:text-6xl leading-tight mb-6 drop-shadow-md">
    Selamat Datang di <br /> Klinik Kecantikan Weiku
  </h2>
  <p className=" text-base md:text-lg font-light tracking-wide leading-relaxed max-w-lg drop-shadow-sm">
    Kami hadir untuk memberikan pelayanan kesehatan yang ramah, profesional, dan terpercaya.
    Klinik kecantikan dan kesehatan weiku melayani berbagai kebutuhan medis Anda
  </p>
</div>

    </section>

      {/* Why Choose Us */}
      <section ref={(el) => (sectionRefs.current["layanan"] = el)}
  data-id="layanan" className="p-8 text-center ">
         <div
  className={`max-w-6xl mx-auto`}
>
    <h3 className="text-lg font-semibold text-primary tracking-wide uppercase">Medical Checkup</h3>
    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-12 ">
      Mengapa Memilih Kami untuk Perawatan Kesehatan Anda?
    </h2>

    <div
  className={`grid md:grid-cols-3 gap-12 transform transition-all duration-1000 ease-out ${
    visibleSections["layanan"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
>

      {[
        {
          image: "/perawatan.jpeg",
          title: "Perawatan di Rumah",
          desc: "Dapatkan akses ke pakar tepercaya di setiap bidang medis—kardiologi, dermatologi, ortopedi, dan banyak lagi.",
        },
        {
          image: "/dukungan.jpeg",
          title: "Dukungan Pelanggan",
          desc: "Tim Dukungan Pelanggan kami yang berdedikasi siap membantu Anda dengan pertanyaan atau masalah apa pun.",
        },
        {
          image: "/medical.jpeg",
          title: "Rekam Medis",
          desc: "Pantau riwayat kesehatan Anda secara mudah dan aman dengan fitur rekam medis digital kami.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 md:h-56 object-cover"
          />
          <div className="p-6">
            <h4 className="font-bold text-2xl mb-3">{item.title}</h4>
            <p className="text-base leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Layanan Kami */}
      <section ref={(el) => (sectionRefs.current["pelayanan"] = el)}
  data-id="pelayanan" className="py-12 px-4  text-center">
  <h2 className="text-3xl font-bold mb-8 text-primary">Layanan Kami</h2>
   <div
  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transform transition-all duration-1000 ease-out ${
      visibleSections["pelayanan"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
>

    {[
      {
        nama: "Khitan",
        gambar: "/khitan.png",
        deskripsi: "Pelayanan khitan dengan metode modern dan minim rasa sakit, cocok untuk semua usia.",
      },
      {
        nama: "Medikasi Luka",
        gambar: "/medikasiluka.jpg",
        deskripsi: "Perawatan luka ringan hingga berat dengan prosedur yang aman dan steril.",
      },
      {
        nama: "Akupuntur",
        gambar: "/akupuntur.jpeg",
        deskripsi: "Terapi akupuntur tradisional yang membantu memperbaiki sirkulasi dan meredakan nyeri.",
      },
      {
        nama: "Cek Darah",
        gambar: "/cekdarah.jpg",
        deskripsi: "Pemeriksaan darah lengkap untuk deteksi dini berbagai kondisi kesehatan.",
      },
      {
        nama: "Pemeriksaan Umum",
        gambar: "/kosultasi.png",
        deskripsi: "siap dan sedia untuk pemeriksaan kesehatan umum, termasuk konsultasi dokter.",
      },
      {
        nama: "home Care",
        gambar: "/pemeriksaan.jpeg",
        deskripsi: "siap melayani perawatan kesehatan di rumah bagi pasien yang membutuhkan.",
      },
    ].map((layanan) => (
      <div
        key={layanan.nama}
        className="flex flex-col items-center text-center p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
      >
        <img
          src={layanan.gambar}
          alt={layanan.nama}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h4 className="text-base font-semibold mb-1 text-primary">{layanan.nama}</h4>
        <p className="text-sm ">{layanan.deskripsi}</p>
      </div>
    ))}
  </div>
      </section>

      { /* Doktor kami */}
      <section 
      ref={(el) => (sectionRefs.current["medis"] = el)}
  data-id="medis" className="p-8 bg-primary/5">
  <h2 className="text-2xl font-bold text-center mb-6">Tenaga Medis</h2>

  {/* Scroll horizontal di mobile, tampil normal di desktop */}
    <div
  className={`overflow-x-auto lg:overflow-visible  transform transition-all duration-1000 ease-out ${
      visibleSections["medis"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}
>
    <div className="flex lg:justify-center gap-6 w-max lg:w-full px-4 py-2">
      {[
        {
          nama: "dr. Salsabila Ramadhani",
          spesialis: "Dokter Umum",
          deskripsi:
            "Berpengalaman lebih dari 10 tahun dalam bidang pelayanan kesehatan umum dan pengobatan keluarga.",
          foto: "/avatar.png",
        },
        {
          nama: "Uchro Wianto",
          spesialis: "Spesialis Akupuntur",
          deskripsi:
            "Menggabungkan pendekatan modern dan tradisional dalam terapi akupuntur untuk hasil yang maksimal.",
          foto: "/bapak.jpg",
        },
        {
          nama: "Sri Mulyati",
          spesialis: "Spesialis Luka & cek darah",
          deskripsi:
            "Ahli dalam penanganan luka dan prosedur pada pengecekan darah",
          foto: "/ibu.jpg",
        },
      ].map((dokter, index) => (
        <div
          key={index}
          className="w-[300px] min-w-[280px] rounded-xl shadow-lg hover:shadow-xl transition-all p-6 flex-shrink-0 "
        >
          <img
            src={dokter.foto}
            alt={dokter.nama}
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-primary/30 mb-4"
          />
          <h3 className="text-lg font-bold text-center">{dokter.nama}</h3>
          <p className="text-sm text-center text-primary">{dokter.spesialis}</p>
          <p className="mt-3 text-sm text-center text-gray-700">{dokter.deskripsi}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Jam Buka */}
    <section ref={(el) => (sectionRefs.current["jam"] = el)}
  data-id="jam" className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 text-center text-sm font-semibold tracking-wide rounded-xl shadow-inner ">
      <div
  className={`max-w-md mx-auto  `}
>
  <div className={`transition-all duration-1000 ease-out ${
    visibleSections["jam"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}>
    <p className="text-primary text-base">Kami buka setiap hari</p>
    <p className=" text-base">Kecuali hari Ahad dan tanggal Merah</p>
    <div className="mt-4 inline-block bg-primary/20 text-primary px-4 py-2 rounded-full shadow-sm animate-pulse">
      15.00 s/d 20.00
    </div>
    <p className=" text-base mt-2">Kecuali jika ada janji temu</p>
  </div>
  </div>
      </section>

      {/* Testimoni */}
      <section ref={(el) => (sectionRefs.current["testimoni"] = el)}
  data-id="testimoni" className="p-8 text-center">
        
  <h2 className="text-3xl font-extrabold mb-10 text-primary">Testimoni</h2>
  
         <div
  className={`grid md:grid-cols-2 gap-10 max-w-7xl mx-auto transition-all duration-1000 ease-out ${
    visibleSections["testimoni"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
>
    {[
      {
        name: "Yunita Wildan",
        role: "Pasien",
        image: "/embak.jpg",
        message: "Pelayanan di Klinik Weiku sangat ramah dan profesional! Saya datang untuk pemeriksaan kesehatan umum, dan dari awal masuk sudah disambut dengan senyum oleh petugas. Dokternya sabar menjelaskan hasil pemeriksaan dan memberikan solusi yang mudah dimengerti. Terima kasih Weiku!"
      },
      {
        name: "Fatkhu Roy",
        role: "Pasien",
        image: "/adek.jpg",
        message: "Saya sangat puas dengan pelayanan di Klinik Weiku. Dokternya sangat profesional dan peduli dengan kesehatan saya. Proses pendaftaran juga cepat dan mudah. Saya merasa diperhatikan dan mendapatkan perawatan yang terbaik. Sangat merekomendasikan!"
      },
      {
        name: "Alwi Fahrozi",
        role: "Pasien",
        image: "/mz.jpg",
        message: "Klinik Weiku adalah tempat yang sangat nyaman untuk berobat. Fasilitasnya bersih dan modern, dan stafnya sangat membantu. Saya merasa tenang dan aman selama pemeriksaan. Terima kasih Weiku atas pelayanan yang luar biasa!"
      },
      {
        name: "Farhat",
        role: "Pasien",
        image: "/mFarhat.JPG",
        message: "Dari semua klinik yang pernah saya kunjungi, Weiku yang paling memuaskan. Proses pendaftaran cepat, tenaga medisnya sopan, dan alat-alatnya modern. Saya merasa benar-benar diperhatikan dan dihargai sebagai pasien."
      }
    ].map((testi) => (
      <div
        key={testi.name}
        className="p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border  text-left"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-primary/10">
            <img src={testi.image} alt={testi.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">{testi.name}</h4>
            <p className="text-sm ">{testi.role}</p>
          </div>
        </div>
        <p className="text-base leading-relaxed italic ">
          "{testi.message}"
        </p>
      </div>
    ))}
  </div>
      </section>


      {/* Footer */}
      <footer className="p-8 border-t border-base-300 bg-base-100 mt-10">
  <div className="flex justify-center mb-6">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-extrabold">
      WEIKU
    </div>
  </div>

  {/* Buat container grid */}
  <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
    {/* Kiri: Tulisan */}
    <div>
      <p className="text-sm text-left pl-10">
        Jadilah bagian dari keluarga besar Klinik Weiku. Kami berkomitmen untuk menjadi tempat terbaik bagi kesehatan Anda dan keluarga. Dengan pelayanan yang ramah, tenaga medis yang profesional, dan fasilitas yang nyaman.
      </p>
    </div>

    {/* Kanan: Pelayanan dan Link Cepat */}
    <div className="text-xs grid grid-cols-2 md:grid-cols-2 gap-6 text-left">
      <div>
        <h5 className="font-bold mb-3">Pelayanan</h5>
        <ul className="space-y-1">
          <li>Khitan</li>
          <li>Medikasi Luka</li>
          <li>Khitan</li>
          <li>Cek darah</li>
          <li>Home Care</li>
          <li>Pemeriksaan umum</li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold mb-3">Link Cepat</h5>
        <ul className="space-y-1">
          <Link to={"/"}>Home</Link>
          <br />
          <Link to={"/settings"}>Pengaturan</Link>
          <br />
          <Link to={"/profile"}>Profile</Link>
          <br />
          <Link to={"/patient"}>Pasien</Link>
        </ul>
      </div>
    </div>
  </div>
      </footer>


    </div>
  );
}
