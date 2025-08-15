import {
  Home, Settings, User, FilePlus, LogOut,
  MessageSquare, LayoutDashboard, Users,
  Menu, X, Hospital, History
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const navItems = [
  { path: "/",         label: "Home",        icon: Home,         roles: ["User", "Admin", "karyawan"] },
  { path: "/settings", label: "Settings",    icon: Settings,     roles: ["User", "Admin", "karyawan"] },
  { path: "/profile",  label: "Profile",     icon: User,         roles: ["User", "Admin", "karyawan"] },
  { path: "/patient",  label: "Pendaftaran", icon: FilePlus,     roles: ["User", "Admin", "karyawan"] },
  { path: "/HomePage", label: "Chat",        icon: MessageSquare,roles: ["User", "Admin"] },
  { path: "/History",  label: "History",     icon: History,      roles: ["Admin"] },
];

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const filtered = authUser
    ? navItems.filter((i) => i.roles.includes(authUser.userType))
    : [];

  return (
    <header className="bg-base-100/80 border-b border-base-300 fixed top-0 w-full backdrop-blur z-40">
      <div className="container mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Hospital className="size-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Weiku</h1>
        </Link>

        {/* Center Sapaan */}
        {authUser && (
          <span className="hidden sm:block flex-1 text-center text-sm font-funky animate-wiggle-x select-none text-primary">
            {authUser.userType === "Admin"
              ? "WELCOME, Admin"
              : `WELCOME, ${authUser.fullName || "User"}`}
          </span>
        )}

        {/* Right Section */}
        <nav className="hidden lg:flex items-center gap-6">
  {authUser ? (
    <>
      {filtered.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className="flex items-center gap-2 text-sm font-medium text-base-content hover:underline underline-offset-4 transition-all"
        >
          <Icon className="size-4" />
          <span>{label}</span>
        </Link>
      ))}
      <button
        onClick={logout}
        className="flex items-center gap-2 text-sm font-medium text-base-content hover:underline underline-offset-4 transition-all"
      >
        <LogOut className="size-5" />
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="text-sm font-medium text-base-content hover:underline underline-offset-4 transition-all">
        Login
      </Link>
    </>
  )}
</nav>


        {/* Burger Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-base-300/50 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden bg-base-100/95 backdrop-blur border-t border-base-300">
          <div className="container mx-auto flex flex-col p-4 gap-3">
            {authUser ? (
              <>
                {filtered.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className="flex items-center gap-3 py-2 hover:bg-base-200 rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="size-4" />
                    {label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-2 hover:bg-base-200 rounded-md"
                >
                  <LogOut className="size-5" />
                  Logout
                </button>
                <span className="text-center text-sm mt-2 text-primary font-funky animate-wiggle-x select-none">
                  {authUser.userType === "Admin"
                    ? "WELCOME, Dokter"
                    : `welcome, ${authUser.fullName || "User"}`}
                </span>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn btn-sm btn-outline">
                  Login
                </Link>
                
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
