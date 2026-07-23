import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TelegramButton from "../components/TelegramButton";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(
          `https://infinity-chess-store-backend.onrender.com/api/courses/${id}`
        );

        const data = await response.json();

        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  const handleWebsitePurchase = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    navigate("/login");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await fetch(
      "https://infinity-chess-store-backend.onrender.com/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          amount: course.price,
        }),
      }
    );

    const order = await response.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: order.amount,
      currency: order.currency,
      name: "Infinity Chess Store",
      description: course.title,
      order_id: order.id,

      handler: async function (response) {
        const verify = await fetch(
          "https://infinity-chess-store-backend.onrender.com/api/payment/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
              courseId: course._id,
              amount: course.price,
            }),
          }
        );

        const data = await verify.json();

        alert(data.message);

        if (data.message === "Payment Successful") {
          navigate("/my-courses");
        }
      },

      theme: {
        color: "#facc15",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="flex h-[70vh] items-center justify-center">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!course || course.message) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="flex h-[70vh] items-center justify-center">
          <h1 className="text-4xl font-bold">Course Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {course.title}
        </h1>

        <span className="mt-5 inline-block rounded-full bg-amber-400 px-4 py-2 font-semibold text-black">
          {course.category}
        </span>

        <h2 className="mt-8 text-4xl font-bold text-amber-400 sm:text-5xl">
          ₹{course.price}
        </h2>

        <p className="mt-3 text-slate-400">
          One-time payment • Lifetime access
        </p>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

          <h3 className="mb-6 text-2xl font-bold">
            What You'll Get
          </h3>

          <ul className="space-y-4 text-lg text-slate-300">
            <li>✅ Lifetime Access</li>
            <li>✅ One-Time Payment</li>
            <li>✅ Premium Chess Course</li>
            <li>✅ Telegram Support</li>
          </ul>

        </div>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center sm:p-8">

          <h2 className="text-3xl font-bold">
            Ready to Purchase?
          </h2>

          <p className="mt-4 text-slate-400">
            Buy instantly through our website or contact us directly on Telegram.
          </p>

          <button
            onClick={handleWebsitePurchase}
            className="mt-8 w-full rounded-xl bg-amber-400 px-8 py-4 font-bold text-black transition hover:bg-amber-300 sm:w-auto"
          >
            Buy on Website
          </button>

          <div className="my-6 text-slate-500 font-semibold">
            OR
          </div>

          <a
            href="https://t.me/Yabuki_Joe19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full rounded-xl bg-sky-500 px-8 py-4 text-center font-bold text-white transition hover:bg-sky-400 sm:w-auto"
          >
            Buy via Telegram
          </a>

          <p className="mt-5 text-sm text-slate-500">
            Secure one-time payment • Lifetime access
          </p>

        </div>

      </div>

      <Footer />
      <TelegramButton />
    </div>
  );
}

export default CourseDetails;