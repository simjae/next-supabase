"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";
import BlockpickRound from "../../components/BlockpickRound";

interface Block {
  id: number;
  x: number;
  y: number;
  overlay?: string;
}

const fetchBlocks = async (): Promise<Block[]> => {
  const response = await axios.get("/blocks");
  return response.data;
};

const BlockpickPage: React.FC = () => {
  const {
    data: blocks = [],
    isLoading,
    isError,
  } = useQuery<Block[], Error>({
    queryKey: ["blocks"],
    queryFn: fetchBlocks,
    initialData: [],
  });
  const [selectedBlock, setSelectedBlock] = React.useState<Block | null>(null);

  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading blocks</div>;

  return (
    <div>
      <BlockpickRound blocks={blocks} onBlockClick={handleBlockClick} />
      {selectedBlock && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold">Selected Block</h2>
          <p>ID: {selectedBlock.id}</p>
          <p>
            Coordinates: ({selectedBlock.x}, {selectedBlock.y})
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() =>
              alert(`Confirming selection for block ${selectedBlock.id}`)
            }
          >
            Confirm Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockpickPage;
