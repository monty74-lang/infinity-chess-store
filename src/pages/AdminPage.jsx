import { useEffect, useState } from "react";

function AdminPage() {
  // Add Course
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Opening");
  const [price, setPrice] = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState("");

  // Edit
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Opening");
  const [editPrice, setEditPrice] = useState("");
  // Chapters
const [chapterCourse, setChapterCourse] = useState("");
const [chapterTitle, setChapterTitle] = useState("");
const [chapterVideo, setChapterVideo] = useState(null);
const [chapterOrder, setChapterOrder] = useState("");
const [chapterList, setChapterList] = useState([]);
const [editingChapter, setEditingChapter] = useState(null);

const [editChapterTitle, setEditChapterTitle] = useState("");

const [editChapterVideo, setEditChapterVideo] = useState("");

const [editChapterOrder, setEditChapterOrder] = useState("");

  // Course List
  const [courses, setCourses] = useState([]);

  // Search + Filter
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Dashboard Stats
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
  });
const user = JSON.parse(localStorage.getItem("user"));
  
  // Fetch Courses
const fetchCourses = async () => {
  try {
    const response = await fetch(
      "https://infinity-chess-store-backend.onrender.com/api/admin/courses",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    setCourses(data);
  } catch (error) {
    console.error(error);
  }
};

  // Fetch Dashboard
const fetchDashboardStats = async () => {
  try {
    const response = await fetch(
      "https://infinity-chess-store-backend.onrender.com/api/admin/dashboard",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    setStats(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchCourses();
  fetchDashboardStats();
}, []);

  // ADD COURSE
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://infinity-chess-store-backend.onrender.com/api/admin/add-course",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: Number(id),
          title,
          category,
          price: Number(price),
          description: "",
          image: "",
        }),
      }
    );

    const data = await response.json();

    alert(data.message);
    

    fetchCourses();
    fetchDashboardStats();

    setId("");
    setTitle("");
    setCategory("Opening");
    setPrice("");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
const fetchChapters = async () => {
  if (!chapterCourse) return;

  try {
    const response = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/chapters/${chapterCourse}`
    );

    const data = await response.json();

    setChapterList(data);
  } catch (error) {
    console.error(error);
  }
};
const handleDeleteChapter = async (chapterId) => {
  const confirmDelete = window.confirm(
    "Delete this chapter?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
  `https://infinity-chess-store-backend.onrender.com/api/chapters/${chapterId}`,
  {
    method: "DELETE",
  }
);

    const data = await response.json();

    alert(data.message);

    fetchChapters();
  } catch (error) {
    console.error(error);
  }
};
const handleUpdateChapter = async () => {
  try {
    const response = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/chapters/${editingChapter}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editChapterTitle,
          videoUrl: editChapterVideo,
          order: Number(editChapterOrder),
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchChapters();

    setEditingChapter(null);
    setEditChapterTitle("");
    setEditChapterVideo("");
    setEditChapterOrder("");

  } catch (error) {
    console.error(error);
  }
};
    // DELETE COURSE
const handleDelete = async () => {
  if (!deleteId) {
    alert("Enter Course ID");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/admin/delete-course/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();

    alert(data.message);

fetchCourses();

    fetchDashboardStats();

    setDeleteId("");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  // UPDATE COURSE
const handleUpdate = async () => {
  if (!editId) {
    alert("Enter Course ID");
    return;
  }

  try {
    const response = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/admin/update-course/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          price: Number(editPrice),
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchCourses();
    fetchDashboardStats();

    setEditId("");
    setEditTitle("");
    setEditCategory("Opening");
    setEditPrice("");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
const handleAddChapter = async () => {
  if (
    !chapterCourse ||
    !chapterTitle ||
    !chapterVideo ||
    !chapterOrder
  ) {
    alert("Fill all fields");
    return;
  }

  const formData = new FormData();

  formData.append("course", chapterCourse);
  formData.append("title", chapterTitle);
  formData.append("order", chapterOrder);
  formData.append("video", chapterVideo);

  try {
    const response = await fetch(
      "https://infinity-chess-store-backend.onrender.com/api/chapters/add",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    alert(data.message);

    setChapterTitle("");
    setChapterVideo(null);
    setChapterOrder("");

    fetchChapters();
  } catch (error) {
    console.error(error);
  }
};

if (!user) {
  window.location.href = "/login";
  return null;
}

if (user.role !== "admin") {
  window.location.href = "/";
  return null;
}
  return (
    <div className="min-h-screen bg-slate-950 py-10 px-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-slate-900 p-8">

        <h1 className="mb-8 text-center text-4xl font-bold text-amber-400">
          Admin Panel
        </h1>

        {/* DASHBOARD */}

        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-slate-800 p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-300">
              📚 Courses
            </h3>

            <p className="mt-3 text-4xl font-bold text-amber-400">
              {stats.totalCourses}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-300">
              👤 Users
            </h3>

            <p className="mt-3 text-4xl font-bold text-blue-400">
              {stats.totalUsers}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-300">
              💳 Purchases
            </h3>

            <p className="mt-3 text-4xl font-bold text-green-400">
              {stats.totalPurchases}
            </p>
          </div>

                    <div className="rounded-xl bg-slate-800 p-6 text-center">
            <h3 className="text-lg font-semibold text-slate-300">
              💰 Revenue
            </h3>

            <p className="mt-3 text-4xl font-bold text-yellow-400">
              ₹{stats.totalRevenue}
            </p>
          </div>

        </div>

        {/* ADD COURSE */}

        <form onSubmit={handleSubmit}>

          <input
            type="number"
            placeholder="Course ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
            required
          />

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
          >
            <option>Opening</option>
            <option>Middlegame</option>
            <option>Endgame</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mb-8 w-full rounded-lg bg-white p-4 text-black"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-400 py-4 text-xl font-bold text-black hover:bg-amber-300"
          >
            Add Course
          </button>

        </form>

        {/* DELETE COURSE */}

        <div className="mt-10 border-t border-slate-700 pt-8">

          <h2 className="mb-4 text-center text-2xl font-bold text-red-400">
            Delete Course
          </h2>

          <input
            type="number"
            placeholder="Course ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
          />

          <button
            onClick={handleDelete}
            className="w-full rounded-lg bg-red-600 py-4 text-xl font-bold text-white hover:bg-red-500"
          >
            Delete Course
          </button>

        </div>

        {/* EDIT COURSE */}

        <div className="mt-10 border-t border-slate-700 pt-8">

          <h2 className="mb-4 text-center text-2xl font-bold text-green-400">
            Edit Course
          </h2>
                    <input
            type="number"
            placeholder="Course ID"
            value={editId}
            onChange={(e) => setEditId(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
          />

          <input
            type="text"
            placeholder="New Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
          />

          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
          >
            <option>Opening</option>
            <option>Middlegame</option>
            <option>Endgame</option>
          </select>

          <input
            type="number"
            placeholder="New Price"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            className="mb-5 w-full rounded-lg bg-white p-4 text-black"
          />

          <button
            onClick={handleUpdate}
            className="w-full rounded-lg bg-green-500 py-4 text-xl font-bold text-black hover:bg-green-400"
          >
            Update Course
          </button>

        </div>

{/* MANAGE CHAPTERS */}

<div className="mt-10 border-t border-slate-700 pt-8">

  <h2 className="mb-6 text-center text-2xl font-bold text-cyan-400">
    Manage Chapters
  </h2>

  <input
    type="text"
    placeholder="Course MongoDB ID"
    value={chapterCourse}
    onChange={(e) => setChapterCourse(e.target.value)}
    className="mb-5 w-full rounded-lg bg-white p-4 text-black"
  />

  <input
    type="text"
    placeholder="Chapter Title"
    value={chapterTitle}
    onChange={(e) => setChapterTitle(e.target.value)}
    className="mb-5 w-full rounded-lg bg-white p-4 text-black"
  />

  <input
  type="file"
  accept="video/*"
  onChange={(e) => setChapterVideo(e.target.files[0])}
  className="mb-5 w-full rounded-lg bg-white p-4 text-black"
/>

  <input
    type="number"
    placeholder="Chapter Order"
    value={chapterOrder}
    onChange={(e) => setChapterOrder(e.target.value)}
    className="mb-5 w-full rounded-lg bg-white p-4 text-black"
  />

  <button
    onClick={handleAddChapter}
    className="w-full rounded-lg bg-cyan-500 py-4 text-xl font-bold text-black hover:bg-cyan-400"
  >
    Add Chapter
  </button>
<button
  onClick={fetchChapters}
  className="mt-4 w-full rounded-xl bg-cyan-500 py-3 font-bold text-black hover:bg-cyan-400"
>
  Load Chapters
</button>
<div className="mt-6 space-y-3">

  {chapterList.map((chapter) => (
    <div
      key={chapter._id}
      className="rounded-xl border border-slate-700 bg-slate-800 p-4"
    >
      <h3 className="text-xl font-bold">
        {chapter.order}. {chapter.title}
      </h3>

      <p className="mt-2 break-all text-sm text-slate-400">
        {chapter.videoUrl}
      </p>

      <div className="mt-4 flex gap-3">

        <button
  onClick={() => {
    setEditingChapter(chapter._id);
    setEditChapterTitle(chapter.title);
    setEditChapterVideo(chapter.videoUrl);
    setEditChapterOrder(chapter.order);
  }}
  className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black hover:bg-yellow-400"
>
  Edit
</button>

       <button
  onClick={() => handleDeleteChapter(chapter._id)}
  className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-400"
>
  Delete
</button>

      </div>

    </div>
  ))}

</div>
{editingChapter && (
  <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">

    <h2 className="mb-5 text-2xl font-bold text-yellow-400">
      Edit Chapter
    </h2>

    <input
      type="text"
      placeholder="Chapter Title"
      value={editChapterTitle}
      onChange={(e) => setEditChapterTitle(e.target.value)}
      className="mb-4 w-full rounded-lg bg-white p-3 text-black"
    />

    <input
      type="text"
      placeholder="Video URL"
      value={editChapterVideo}
      onChange={(e) => setEditChapterVideo(e.target.value)}
      className="mb-4 w-full rounded-lg bg-white p-3 text-black"
    />

    <input
      type="number"
      placeholder="Order"
      value={editChapterOrder}
      onChange={(e) => setEditChapterOrder(e.target.value)}
      className="mb-5 w-full rounded-lg bg-white p-3 text-black"
    />

    <button
      onClick={handleUpdateChapter}
      className="w-full rounded-lg bg-yellow-500 py-3 text-xl font-bold text-black hover:bg-yellow-400"
    >
      Save Changes
    </button>

  </div>
)}
</div>
        {/* ALL COURSES */}

        <div className="mt-10 border-t border-slate-700 pt-8">

          <h2 className="mb-6 text-center text-3xl font-bold text-amber-400">
            All Courses ({courses.length})
          </h2>

          <input
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full rounded-lg bg-white p-4 text-black"
          />

          <div className="mb-6 flex flex-wrap gap-3">

            {["All", "Opening", "Middlegame", "Endgame"].map((item) => (
              <button
                key={item}
                onClick={() => setFilterCategory(item)}
                className={`rounded-lg px-5 py-2 font-bold ${
                  filterCategory === item
                    ? "bg-amber-400 text-black"
                    : "bg-slate-700 text-white"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          <div className="max-h-[600px] space-y-4 overflow-y-auto pr-2">

            {courses
              .filter((course) =>
                course.title.toLowerCase().includes(search.toLowerCase())
              )
              .filter((course) =>
                filterCategory === "All"
                  ? true
                  : course.category === filterCategory
              )
              .map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-5"
                >

                  <p className="text-sm text-slate-400">
                    ID: {course.id}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {course.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="rounded-full bg-slate-700 px-3 py-1 text-sm text-white">
                      {course.category}
                    </span>

                    <span className="text-2xl font-bold text-amber-400">
                      ₹{course.price}
                    </span>

                  </div>

                  <div className="mt-5 flex gap-3">

                    <button
                      onClick={() => {
                        setEditId(course.id);
                        setEditTitle(course.title);
                        setEditCategory(course.category);
                        setEditPrice(course.price);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="flex-1 rounded-lg bg-green-500 py-3 font-bold text-black hover:bg-green-400"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `Delete "${course.title}"?`
                          )
                        )
                          return;

                        try {
                          const response = await fetch(
                            `https://infinity-chess-store-backend.onrender.com/api/admin/delete-course/${course.id}`,
                            {
                              method: "DELETE",
                            }
                          );

                          const data = await response.json();

                          alert(data.message);

                          fetchCourses();
                          fetchDashboardStats();
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      className="flex-1 rounded-lg bg-red-600 py-3 font-bold text-white hover:bg-red-500"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>
              ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminPage;