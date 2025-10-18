import React, { useState, useRef, useEffect, use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Logo from "../assets/Logo.png";
import {
  LogOut,
  Menu,
} from "lucide-react";
import { getUser } from "../lib/utils";
import { getNavigationItems, getRoleColor, getRoleDisplayName } from "../lib/sidebarUtils";

// Utility: Generate route path

export default function Layout({ children }) {


  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  

  useEffect(() => {


    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);
  
  useEffect(()=>{
      const checkUserVerified = () => {
        const token = localStorage.getItem("token");
      if(!token){
        navigate(`/login`);
      }
      }
      checkUserVerified();
    }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);




  const handleLogout = () => {
    
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

 

  const navigationItems = getNavigationItems(user?.role);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          overflow-hidden
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-10" />
            <div>
              <h2 className="font-bold text-xl text-[#047fcb] italic">
                AttendEase
              </h2>
              <p className="text-sm text-gray-500">Smart Education</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-2">
            Navigation
          </p>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 border-l-4 border-purple-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-purple-600" : ""}`}
                />
                <span>{item.title}</span>
                {item.title.includes("Notifications") && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">
                {getRoleDisplayName(user.role)}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 w-full">
            {/* Sidebar toggle for mobile */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition"
              >
                <Menu className="w-6 h-6 text-black/70" />
              </button>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getRoleColor(
                user.role
              )}`}
            >
              {getRoleDisplayName(user.role)}
            </div>
          </div>
        </header>

        {/* Page Content (scrollable) */}
        <main ref={scrollRef} className="flex-1 overflow-y-auto h-screen bg-gray-50">
          <Outlet />{children}
        </main>
      </div>
    </div>
  );
}
