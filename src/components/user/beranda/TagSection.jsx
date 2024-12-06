import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

export default function TagSection() {
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axiosInstance.get("/user/spesialis");
                setTags(response.data.data); // Simpan data tags dari API
            } catch (err) {
                setError(err.response?.data?.message || "Gagal mengambil data.");
            } finally {
                setIsLoading(false); // Set loading selesai
            }
        };

        fetchTags();
    }, []);

    return (
        <>
            <div className="text-cyan-900 text-base font-semibold mt-8 text-center lg:text-left">
                Masalah Yang Sering Dihadapi
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start p-4">
                {isLoading && (
                    <div className="text-gray-500 text-center w-full">
                        Memuat data...
                    </div>
                )}
                {error && (
                    <div className="text-red-500 text-center w-full">
                        {error}
                    </div>
                )}
                {!isLoading &&
                    !error &&
                    tags.map((tag) => (
                        <div
                            key={tag.id}
                            className="w-[80px] h-[80px] md:w-[114px] md:h-[114px] flex flex-col items-center justify-center bg-gray-100 rounded-md shadow-md text-center"
                        >
                            {/* <img
                                src={`/images/user/beranda/tags/${tag.name
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}.svg`}
                                alt={`Tag ${tag.name}`}
                                className="w-full h-full object-contain"
                            /> */}
                            <span className="text-sm font-medium mt-2">{tag.name}</span>
                        </div>
                    ))}
            </div>
        </>
    );
}
