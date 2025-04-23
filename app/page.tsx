import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-white to-green-100 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-600 drop-shadow text-center">
        Next HAL
      </h1>

      <p className="mt-4 text-center text-lg text-gray-700 max-w-xl">
        春の風がそっと背中を押してくれるように。<br />
        新しいアイデアと出会いが芽吹く季節。<br />
        Next HALでは、未来をかたちにする旅がはじまります。
      </p>

      <div className="mt-6">
        <Link
          href="/counter"
          className="inline-block px-6 py-3 bg-sky-400 text-white font-semibold rounded-xl shadow hover:bg-sky-500 transition"
        >
          はじめよう
        </Link>
      </div>

      <div className="mt-10">
        <Image
          src="/flower.png"
          alt="Spring Flowers"
          width={400}
          height={300}
          className="rounded-2xl shadow-lg"
        />
      </div>

    </main>
  );
}
