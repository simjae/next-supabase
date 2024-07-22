"use client";

export default function Home() {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-gray-400 mb-4">
        Welcome to blockpick!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        단하나의 블록을 골라, 승리를 쟁취하라!
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800">Place 1</h2>
          <p className="text-gray-600">Description of place 1.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800">Place 2</h2>
          <p className="text-gray-600">Description of place 2.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-800">Place 3</h2>
          <p className="text-gray-600">Description of place 3.</p>
        </div>
      </div>
    </div>
  );
}
