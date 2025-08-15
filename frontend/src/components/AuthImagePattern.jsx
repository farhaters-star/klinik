const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-16 relative overflow-hidden">

      {/* Background image yang diburamkan */}
      <img
        src="/klinik.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75 z-0"
      />

      {/* Decorative Gradient Circles (boleh dipertahankan atau dihapus) */}
      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-pink-300/40 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-yellow-400/30 rounded-full blur-3xl animate-pulse z-0" />

      {/* Konten utama */}
      <div className="relative max-w-md text-center z-10">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-16 h-16 ${
                i % 2 === 0 ? "animate-bounce" : "hover:scale-110"
              } transition-transform duration-500`}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-yellow-400/70 hover:fill-pink-400"
              >
                <polygon points="50,5 61,39 98,39 67,61 78,95 50,75 22,95 33,61 2,39 39,39" />
              </svg>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-extrabold text-red-600 mb-3 drop-shadow-sm">{title}</h2>
        <p className="text-base text-black leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
