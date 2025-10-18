// import React, { useState, useEffect, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Plus, Search, UserCog, Building2 } from "lucide-react";

// import FacultyCard from "../components/faculty/FacultyCard";
// import FacultyForm from "../components/faculty/FacultyForm";
// import FacultyHeader from "../components/faculty/FacultyHeader";
// import Faculty from "../lib/Faculty";
// import { getFaculty } from "../lib/getFacultyData";

// export default function FacultyPage() {
//   // const [faculty, setFaculty] = useState([]);
//   // const [filteredFaculty, setFilteredFaculty] = useState([]);
//   // const [showForm, setShowForm] = useState(false);
//   // const [editingFaculty, setEditingFaculty] = useState(null);
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [searchTerm, setSearchTerm] = useState("");

//   // useEffect(() => {
//   //   loadFaculty();
//   // }, []);

//   // const loadFaculty = async () => {
//   //   setIsLoading(true);
//   //   // Get users with role 'user' (faculty) or 'admin'
//   //   const users = await Faculty.list("-created_date");
//   //   const facultyUsers = users.filter(
//   //     (user) => user.role === "user" || user.role === "admin"
//   //   );
//   //   setFaculty(facultyUsers);
//   //   setIsLoading(false);
//   // };

//   // const filterFaculty = useCallback(() => {
//   //   let filtered = faculty;

//   //   if (searchTerm) {
//   //     filtered = filtered.filter(
//   //       (member) =>
//   //         member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //         (member.employee_id &&
//   //           member.employee_id.toLowerCase().includes(searchTerm.toLowerCase()))
//   //     );
//   //   }

//   //   setFilteredFaculty(filtered);
//   // }, [faculty, searchTerm]); // Dependencies for useCallback

//   // useEffect(() => {
//   //   filterFaculty();
//   // }, [filterFaculty]); // Now depends on the memoized filterFaculty function

//   // const handleSubmit = async (facultyData) => {
//   //   if (editingFaculty) {
//   //     await Faculty.update(editingFaculty.id, facultyData);
//   //   } else {
//   //     // For new faculty, they need to be invited through the platform
//   //     alert(
//   //       "New faculty members need to be invited through the user management system."
//   //     );
//   //     return;
//   //   }
//   //   setShowForm(false);
//   //   setEditingFaculty(null);
//   //   loadFaculty();
//   // };

//   // const handleEdit = (facultyMember) => {
//   //   setEditingFaculty(facultyMember);
//   //   setShowForm(true);
//   // };

//   // const handleToggleStatus = async (facultyId, currentStatus) => {
//   //   await Faculty.update(facultyId, { is_active: !currentStatus });
//   //   loadFaculty();
//   // };
//   const [faculty, setFaculty] = useState([]); // ✅ use array
//   const [filteredFaculty, setFilteredFaculty] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingFaculty, setEditingFaculty] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Fetch students
//   const loadFaculty = async () => {
//     setIsLoading(true);
//     try {
//       const fac = await getFaculty();
//       if (fac) {
//         setFaculty(fac);
//         setFilteredFaculty(fac);
//       }
//     } catch (err) {
//       console.error("Error fetching faculty:", err);
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     loadFaculty();
//   }, []);

//   // ✅ Search filter
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredFaculty(faculty);
//     } else {
//       const term = searchTerm.toLowerCase();
//       setFilteredFaculty(
//         faculty.filter(
//           (s) =>
//             s.name.toLowerCase().includes(term) ||
//             s.email.toLowerCase().includes(term)
//         )
//       );
//     }
//   }, [searchTerm, faculty]);

//   const handleSubmit = async (facultyData) => {
//     if (editingFaculty) {
//       await Faculty.update(editingFaculty._id, facultyData);
//     } else {
//       await Faculty.create(facultyData);
//     }
//     setShowForm(false);
//     setEditingFaculty(null);
//     loadFaculty(); // reload list
//   };

//   const handleEdit = (faculty) => {
//     setEditingFaculty(faculty);
//     setShowForm(true);
//   };

//   const handleDelete = async (facultyId) => {
//     if (confirm("Are you sure you want to delete this student?")) {
//       await Faculty.delete(facultyId);
//       loadFaculty();
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <FacultyHeader
//           totalFaculty={faculty.length}
//           onAddFaculty={() => setShowForm(true)}
//         />

//         {/* Search */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               placeholder="Search faculty by name, email, or employee ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 h-12 text-lg"
//             />
//           </div>
//         </div>

//         {/* Faculty Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {isLoading ? (
//             Array(8)
//               .fill(0)
//               .map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
//                 >
//                   <div className="flex flex-col items-center">
//                     <div className="w-20 h-20 bg-gray-200 rounded-full mb-4" />
//                     <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
//                     <div className="h-3 bg-gray-200 rounded w-20 mb-4" />
//                     <div className="h-6 bg-gray-200 rounded w-24" />
//                   </div>
//                 </div>
//               ))
//           ) : filteredFaculty.length > 0 ? (
//             filteredFaculty.map((member) => (
//               <FacultyCard
//                 key={member._id}
//                 faculty={member}
//                 onEdit={() => handleEdit(member)}
//                 onToggleStatus={() =>
//                   handleToggleStatus(member.id, member.is_active)
//                 }
//               />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-12">
//               <UserCog className="w-20 h-20 mx-auto text-gray-300 mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {faculty.length === 0
//                   ? "No faculty members yet"
//                   : "No faculty found"}
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 {faculty.length === 0
//                   ? "Invite faculty members to get started"
//                   : "Try adjusting your search"}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Faculty Form Modal */}
//         {showForm && (
//           <FacultyForm
//             faculty={editingFaculty}
//             onSubmit={handleSubmit}
//             onCancel={() => {
//               setShowForm(false);
//               setEditingFaculty(null);
//             }}
//            onDelete={() => handleDelete(editingFaculty?._id)}

//           />
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCog } from "lucide-react";

import FacultyCard from "../components/faculty/FacultyCard";
import FacultyForm from "../components/faculty/FacultyForm";
import FacultyHeader from "../components/faculty/FacultyHeader";
import Faculty from "../lib/Faculty";
import { getFaculty } from "../lib/getFacultyData";

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Load all faculty data
  const loadFaculty = async () => {
    setIsLoading(true);
    try {
      const fac = await getFaculty();
      if (fac) {
        setFaculty(fac);
        setFilteredFaculty(fac);
      }
    } catch (err) {
      console.error("Error fetching faculty:", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  // ✅ Handle search filter
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFaculty(faculty);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredFaculty(
        faculty.filter(
          (s) =>
            s.name.toLowerCase().includes(term) ||
            s.email.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, faculty]);

  // ✅ Add or update faculty
  const handleSubmit = async (facultyData) => {
    if (editingFaculty) {
      await Faculty.update(editingFaculty._id, facultyData);
    } else {
      await Faculty.create(facultyData);
    }
    setShowForm(false);
    setEditingFaculty(null);
    loadFaculty();
  };

  // ✅ Edit existing faculty
  const handleEdit = (faculty) => {
    setEditingFaculty(faculty);
    setShowForm(true);
  };

  // ✅ Toggle faculty active/inactive status
  const handleToggleStatus = async (facultyId, currentStatus) => {
    await Faculty.update(facultyId, { is_active: !currentStatus });
    loadFaculty();
  };

  // ✅ Delete faculty
  const handleDelete = async (facultyId) => {
    if (confirm("Are you sure you want to delete this faculty?")) {
      try {
        await Faculty.delete(facultyId);
        loadFaculty();
      } catch (error) {
        console.error("Error deleting faculty:", error);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <FacultyHeader
          totalFaculty={faculty.length}
          onAddFaculty={() => {
            setEditingFaculty(null);
            setShowForm(true);
          }}
        />

        {/* 🔍 Search bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search faculty by name, email, or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* 🧑‍🏫 Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-20 mb-4" />
                    <div className="h-6 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              ))
          ) : filteredFaculty.length > 0 ? (
            filteredFaculty.map((member) => (
              <FacultyCard
                key={member._id}
                faculty={member}
                onEdit={() => handleEdit(member)}
                onToggleStatus={() =>
                  handleToggleStatus(member._id, member.is_active)
                }
                onDelete={() => handleDelete(member._id)} // ✅ Pass delete handler
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <UserCog className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {faculty.length === 0
                  ? "No faculty members yet"
                  : "No faculty found"}
              </h3>
              <p className="text-gray-500 mb-6">
                {faculty.length === 0
                  ? "Invite faculty members to get started"
                  : "Try adjusting your search"}
              </p>
            </div>
          )}
        </div>

        {/* 🧾 Faculty Form Modal */}
        {showForm && (
          <FacultyForm
            faculty={editingFaculty}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingFaculty(null);
            }}
            onDelete={() => handleDelete(editingFaculty?._id)} // ✅ delete from form too
          />
        )}
      </div>
    </div>
  );
}
