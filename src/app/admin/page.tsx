"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../lib/axios";

interface UpdateLengthFormData {
  length: number;
}

interface UpdateOverlayFormData {
  id: number;
  overlay?: string;
  file?: FileList;
  uploadType: "url" | "file";
}

const AdminPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<UpdateLengthFormData>();
  const {
    register: overlayRegister,
    handleSubmit: overlaySubmit,
    reset: overlayReset,
    watch,
    setValue,
  } = useForm<UpdateOverlayFormData>();

  const [uploadType, setUploadType] = useState<"url" | "file">("url");

  const updateBlocksLengthMutation = useMutation({
    mutationFn: async (data: UpdateLengthFormData) => {
      return axios.put("/blocks", data);
    },
    onSuccess: () => {
      alert("Blocks length updated");
      reset();
      queryClient.invalidateQueries({ queryKey: ["blocks"] }); // 데이터가 변경된 후 다시 가져오기
    },
    onError: () => {
      alert("Failed to update blocks length");
    },
  });

  const updateBlockOverlayMutation = useMutation({
    mutationFn: async (data: UpdateOverlayFormData) => {
      if (uploadType === "file" && data.file && data.file[0]) {
        const formData = new FormData();
        formData.append("file", data.file[0]);
        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        data.overlay = uploadResponse.data.url;
      }
      return axios.post("/blocks", { id: data.id, overlay: data.overlay });
    },
    onSuccess: () => {
      alert("Block overlay updated");
      overlayReset();
      queryClient.invalidateQueries({ queryKey: ["blocks"] }); // 데이터가 변경된 후 다시 가져오기
    },
    onError: () => {
      alert("Failed to update block overlay");
    },
  });

  const onLengthSubmit = (data: UpdateLengthFormData) => {
    updateBlocksLengthMutation.mutate(data);
  };

  const onOverlaySubmit = (data: UpdateOverlayFormData) => {
    updateBlockOverlayMutation.mutate(data);
  };

  useEffect(() => {
    setValue("uploadType", uploadType);
  }, [uploadType, setValue]);

  const selectedUploadType = watch("uploadType", "url");

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-400 mb-4">Admin Page</h1>
      <div className="mb-6">
        <form onSubmit={handleSubmit(onLengthSubmit)}>
          <label className="block text-gray-500 text-sm font-bold mb-2">
            Set Number of Blocks
          </label>
          <input
            type="number"
            {...register("length", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Update Length
          </button>
        </form>
      </div>
      <div className="mb-6">
        <form onSubmit={overlaySubmit(onOverlaySubmit)}>
          <label className="block text-gray-500 text-sm font-bold mb-2">
            Set Overlay Image for Block
          </label>
          <input
            type="number"
            placeholder="Block ID"
            {...overlayRegister("id", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="url"
              value="url"
              {...overlayRegister("uploadType", { required: true })}
              checked={uploadType === "url"}
              onChange={() => setUploadType("url")}
              className="mr-2"
            />
            <label htmlFor="url" className="text-gray-500">
              URL
            </label>
            <input
              type="radio"
              id="file"
              value="file"
              {...overlayRegister("uploadType", { required: true })}
              checked={uploadType === "file"}
              onChange={() => setUploadType("file")}
              className="ml-4 mr-2"
            />
            <label htmlFor="file" className="text-gray-500">
              File
            </label>
          </div>
          {selectedUploadType === "url" ? (
            <input
              type="text"
              placeholder="Overlay Image URL"
              {...overlayRegister("overlay", {
                required: selectedUploadType === "url",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <input
              type="file"
              {...overlayRegister("file", {
                required: selectedUploadType === "file",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Update Block
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
