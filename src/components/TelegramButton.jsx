import { FaTelegramPlane } from "react-icons/fa";

function TelegramButton() {
  return (
    <a
      href="https://t.me/Yabuki_Joe19"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-3xl text-white shadow-2xl transition duration-300 hover:scale-110 hover:bg-sky-400"
    >
      <FaTelegramPlane />
    </a>
  );
}

export default TelegramButton;