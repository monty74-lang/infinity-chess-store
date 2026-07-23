import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function WatchCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

const [loading, setLoading] = useState(true);
const [hasAccess, setHasAccess] = useState(false);

const [chapters, setChapters] = useState([]);
const [selectedChapter, setSelectedChapter] = useState(null);
const [progress, setProgress] = useState([]);

  useEffect(() => {
    checkAccess();
  }, []);
  
  const checkAccess = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Course ID from URL:", id);
  console.log("Logged in user:", user);

  if (!user) {
    navigate("/login");
    return;
  }

  try {
    // Check purchase
    const response = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/purchase/check-access/${user.id}/${id}`
    );

    const data = await response.json();

    if (!data.access) {
      setLoading(false);
      return;
    }

    setHasAccess(true);

    // Load chapters
    const chapterResponse = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/chapters/${id}`
    );

    const chapterData = await chapterResponse.json();

    setChapters(chapterData);

    // Load progress
    const progressResponse = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/progress/${user.id}/${id}`
    );

    const progressData = await progressResponse.json();

    const completed = progressData.map(
      (item) => item.chapter
    );

    setProgress(completed);

    // Open first unfinished chapter
    const firstUnfinished = chapterData.find(
      (chapter) => !completed.includes(chapter._id)
    );

    if (firstUnfinished) {
      setSelectedChapter(firstUnfinished);

      localStorage.setItem(
        `lastChapter-${id}`,
        firstUnfinished._id
      );
    } else {
      const lastChapter = localStorage.getItem(
        `lastChapter-${id}`
      );

      const found = chapterData.find(
        (chapter) => chapter._id === lastChapter
      );

      if (found) {
        setSelectedChapter(found);
      } else if (chapterData.length > 0) {
        setSelectedChapter(chapterData[0]);
      }
    }

  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};
   
const nextChapter = () => {
  const index = chapters.findIndex(
    (chapter) => chapter._id === selectedChapter._id
  );

  if (index < chapters.length - 1) {
    const next = chapters[index + 1];

    setSelectedChapter(next);

    localStorage.setItem(
      `lastChapter-${id}`,
      next._id
    );
  }
};

const previousChapter = () => {
  const index = chapters.findIndex(
    (chapter) => chapter._id === selectedChapter._id
  );

  if (index > 0) {
    const prev = chapters[index - 1];

    setSelectedChapter(prev);

    localStorage.setItem(
      `lastChapter-${id}`,
      prev._id
    );
  }
};

const markChapterComplete = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await fetch(
      "https://infinity-chess-store-backend.onrender.com/api/progress/complete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user.id,
          course: id,
          chapter: selectedChapter._id,
        }),
      }
    );

    const response = await fetch(
      `https://infinity-chess-store-backend.onrender.com/api/progress/${user.id}/${id}`
    );

    const data = await response.json();

    setProgress(data.map((item) => item.chapter));

    alert("Chapter Completed!");

  } catch (error) {
    console.error(error);
  }
};
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="flex h-[80vh] flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-red-500">
            Access Denied
          </h1>

          <p className="mt-6 text-xl text-slate-400">
            You haven't purchased this course.
          </p>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 py-16">

        <h1 className="text-5xl font-bold text-amber-400">
          Watch Course
        </h1>
<div className="mt-8">

  <div className="flex justify-between text-sm text-slate-400">

    <span>Course Progress</span>

    <span>
      {progress.length} / {chapters.length} Completed
    </span>

  </div>

  <div className="mt-2 h-3 rounded-full bg-slate-800">

    <div
      className="h-3 rounded-full bg-green-500 transition-all duration-500"
      style={{
        width: `${
          chapters.length
            ? (progress.length / chapters.length) * 100
            : 0
        }%`,
      }}
    />

  </div>

</div>

{chapters.length > 0 &&
  progress.length === chapters.length && (
    <div className="mt-6 rounded-2xl border border-green-500 bg-green-900/30 p-6 text-center">

      <h2 className="text-3xl font-bold text-green-400">
        🎉 Course Completed!
      </h2>

      <p className="mt-3 text-slate-300">
        Congratulations! You have completed every chapter of this course.
      </p>

    </div>
)}

<div className="mt-10 grid gap-8 lg:grid-cols-3">

  {/* Chapters */}

  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

    <h2 className="mb-5 text-2xl font-bold text-cyan-400">
      Chapters
    </h2>

    {chapters.length === 0 ? (
      <p className="text-slate-400">
        No chapters added yet.
      </p>
    ) : (
      chapters.map((chapter) => (
        <button
  key={chapter._id}
  onClick={() => {
  setSelectedChapter(chapter);

  localStorage.setItem(
    `lastChapter-${id}`,
    chapter._id
  );
}}
  className={`mb-3 w-full rounded-lg p-3 text-left transition ${
    selectedChapter?._id === chapter._id
      ? "bg-cyan-500 text-black"
      : "bg-slate-800 hover:bg-slate-700"
  }`}
>
  <div className="flex items-center justify-between">

  <span>
    {progress.includes(chapter._id) ? "✅ " : "▶ "}
    {chapter.title}
  </span>

  {progress.includes(chapter._id) && (
    <span className="text-green-400 font-bold">
      100%
    </span>
  )}

</div>
</button>
      ))
    )}

  </div>

  {/* Video */}

  <div className="lg:col-span-2 rounded-2xl border border-slate-700 bg-slate-900 p-6">

    {selectedChapter ? (
      <>
        <h2 className="mb-5 text-3xl font-bold">
          {selectedChapter.title}
        </h2>

        <div className="aspect-video overflow-hidden rounded-xl bg-black">

  <video
    src={selectedChapter.videoUrl}
    controls
    controlsList="nodownload"
    className="h-full w-full"
  >
    Your browser does not support the video tag.
  </video>

</div>

<div className="mt-6 flex gap-4">

  <button
    onClick={previousChapter}
    className="rounded-xl bg-slate-700 px-6 py-3 font-bold hover:bg-slate-600"
  >
    ← Previous
  </button>

  <button
    onClick={markChapterComplete}
    className="rounded-xl bg-green-500 px-6 py-3 font-bold text-black hover:bg-green-400"
  >
    ✓ Mark Complete
  </button>

  <button
    onClick={nextChapter}
    className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black hover:bg-cyan-400"
  >
    Next →
  </button>

</div>
      </>
    ) : (
      <div className="flex h-[450px] items-center justify-center">

        <h2 className="text-3xl font-bold text-slate-500">
          No Chapter Selected
        </h2>

      </div>
    )}

  </div>

</div>

      </div>

      <Footer />
    </div>
  );
}

export default WatchCourse;