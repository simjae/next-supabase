"use client";
import React from "react";
import Link from "next/link";

interface Blockpick {
  id: number;
  title: string;
  content: string;
  status: string;
}

async function fetchBlockpicks() {
  const res = await fetch("/api/blockpicks");
  if (!res.ok) {
    throw new Error("Failed to fetch blockpicks");
  }
  return res.json();
}

const BlockpickList: React.FC = () => {
  const [blockpicks, setBlockpicks] = React.useState<Blockpick[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchBlockpicks()
      .then((data) => {
        setBlockpicks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Blockpick List</h1>
      <ul className="space-y-4">
        {blockpicks.map((blockpick) => (
          <li key={blockpick.id} className="p-4 bg-white rounded shadow">
            <Link href={`/blockpicks/${blockpick.id}`}>
              <a className="text-xl font-semibold text-blue-600 hover:underline">
                {blockpick.title}
              </a>
            </Link>
            <p className="text-gray-600">{blockpick.content}</p>
            <p className="text-gray-600">Status: {blockpick.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockpickList;
