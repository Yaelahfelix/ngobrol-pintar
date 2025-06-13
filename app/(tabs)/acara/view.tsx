"use client";

import React, { useState, useEffect } from "react";
import { Acara } from "./type";
import AcaraCard from "./card";

const View = ({ initialData }: { initialData: Acara[] }) => {
  const [data, setData] = useState<Acara[]>(initialData);
  const [filteredData, setFilteredData] = useState<Acara[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(data.map((item) => item.category))),
  ];

  // Search and filter logic
  useEffect(() => {
    let filtered = data;

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tempat.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by price
    if (priceFilter === "free") {
      filtered = filtered.filter((item) => item.is_free);
    } else if (priceFilter === "paid") {
      filtered = filtered.filter((item) => !item.is_free);
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedCategory, priceFilter, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/3 rounded-full -translate-x-32 -translate-y-32"></div>
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Temukan Acara
              <span className="block text-blue-200">Terbaik Untukmu</span>
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Jelajahi berbagai seminar, workshop, dan acara menarik yang akan
              menambah wawasan dan pengalaman Anda
            </p>

            {/* Enhanced Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari acara berdasarkan nama atau lokasi..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-14 pr-6 py-4 text-lg bg-white rounded-2xl border-0 focus:ring-4 focus:ring-blue-300 focus:outline-none placeholder-gray-500 shadow-lg"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {data.length}+
                </div>
                <div className="text-blue-200">Total Acara</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-blue-200">Kategori</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">
                  {data.filter((item) => item.is_free).length}
                </div>
                <div className="text-blue-200">Acara Gratis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Filter:</span>
              <span className="text-sm text-gray-500">
                Menampilkan {filteredData.length} dari {data.length} acara
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">Semua Kategori</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="all">Semua Harga</option>
                <option value="free">Gratis</option>
                <option value="paid">Berbayar</option>
              </select>

              {/* Clear Filters */}
              {(searchTerm ||
                selectedCategory !== "all" ||
                priceFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setPriceFilter("all");
                  }}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          /* No Results */
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak Ada Acara Ditemukan
              </h3>
              <p className="text-gray-500 mb-6">
                Coba ubah kata kunci pencarian atau filter yang Anda gunakan
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setPriceFilter("all");
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        ) : (
          /* Results Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <AcaraCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
