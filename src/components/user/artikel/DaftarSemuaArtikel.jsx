import React, { useEffect, useState } from "react";
import ArtikelCard from "./ArtikelCard";
import axiosInstance from "../../../utils/axiosInstance";

const DaftarSemuaArtikel = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get("/user/artikel");
                // Simpan data artikel ke dalam state
                setArticles(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "Gagal memuat artikel.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <section id="artikel" className="bg-white p-5 md:p-10">
            <h2 className="text-cyan-900 text-2xl font-semibold text-center mb-6">
                Daftar Semua Artikel
            </h2>
            {isLoading && (
                <div className="text-gray-500 text-center">
                    Memuat artikel...
                </div>
            )}
            {error && (
                <div className="text-red-500 text-center">
                    {error}
                </div>
            )}
            {!isLoading && !error && (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    aria-label="Daftar artikel"
                >
                    {articles.map((article) => (
                        <ArtikelCard
                            key={article.id}
                            id={article.id}
                            title={article.judul}
                            date={new Date(article.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                            description={article.isi.substring(0, 100)} // Ambil sebagian isi sebagai deskripsi
                            // image={article.gambar || "/images/default-article.png"} // Gambar default jika kosong
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default DaftarSemuaArtikel;
