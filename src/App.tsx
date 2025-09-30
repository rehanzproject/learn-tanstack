import { useState, useMemo } from "react";

const JOBS = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Innovate",
    city: "Jakarta",
    jobType: "Full-time",
    level: "Mid",
    mode: "Hybrid",
    salaryMin: 8000000,
    salaryMax: 12000000,
    postedAt: "2025-09-25",
    tags: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    city: "Bandung",
    jobType: "Full-time",
    level: "Junior",
    mode: "Onsite",
    salaryMin: 5000000,
    salaryMax: 8000000,
    postedAt: "2025-09-20",
    tags: ["Figma", "Adobe XD", "Design"],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Data Solutions",
    city: "Surabaya",
    jobType: "Full-time",
    level: "Senior",
    mode: "Remote",
    salaryMin: 15000000,
    salaryMax: 20000000,
    postedAt: "2025-09-28",
    tags: ["Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "Startup Maju",
    city: "Yogyakarta",
    jobType: "Internship",
    level: "Intern",
    mode: "Hybrid",
    salaryMin: 2000000,
    salaryMax: 3000000,
    postedAt: "2025-09-15",
    tags: ["Social Media", "Content", "Marketing"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    city: "Jakarta",
    jobType: "Full-time",
    level: "Senior",
    mode: "WFH",
    salaryMin: 18000000,
    salaryMax: 25000000,
    postedAt: "2025-09-27",
    tags: ["Kubernetes", "Docker", "CI/CD"],
  },
  {
    id: 6,
    title: "Content Writer",
    company: "Media Group",
    city: "Semarang",
    jobType: "Part-time",
    level: "Junior",
    mode: "Remote",
    salaryMin: 3000000,
    salaryMax: 5000000,
    postedAt: "2025-09-22",
    tags: ["SEO", "Writing", "Content"],
  },
  {
    id: 7,
    title: "Data Analyst",
    company: "Analytics Pro",
    city: "Jakarta",
    jobType: "Contract",
    level: "Mid",
    mode: "Onsite",
    salaryMin: 10000000,
    salaryMax: 14000000,
    postedAt: "2025-09-26",
    tags: ["Python", "SQL", "Tableau"],
  },
  {
    id: 8,
    title: "Mobile Developer",
    company: "App Innovations",
    city: "Bandung",
    jobType: "Full-time",
    level: "Mid",
    mode: "Hybrid",
    salaryMin: 9000000,
    salaryMax: 13000000,
    postedAt: "2025-09-24",
    tags: ["React Native", "Flutter", "iOS"],
  },
  {
    id: 9,
    title: "Product Manager",
    company: "Digital Ventures",
    city: "Surabaya",
    jobType: "Full-time",
    level: "Senior",
    mode: "Hybrid",
    salaryMin: 16000000,
    salaryMax: 22000000,
    postedAt: "2025-09-29",
    tags: ["Product", "Agile", "Strategy"],
  },
  {
    id: 10,
    title: "Graphic Designer",
    company: "Creative Agency",
    city: "Yogyakarta",
    jobType: "Part-time",
    level: "Junior",
    mode: "Remote",
    salaryMin: 4000000,
    salaryMax: 6000000,
    postedAt: "2025-09-18",
    tags: ["Photoshop", "Illustrator", "Branding"],
  },
  {
    id: 11,
    title: "QA Tester",
    company: "Quality First",
    city: "Jakarta",
    jobType: "Full-time",
    level: "Junior",
    mode: "Onsite",
    salaryMin: 6000000,
    salaryMax: 9000000,
    postedAt: "2025-09-21",
    tags: ["Testing", "Selenium", "QA"],
  },
  {
    id: 12,
    title: "Full Stack Developer",
    company: "Tech Solutions",
    city: "Semarang",
    jobType: "Full-time",
    level: "Mid",
    mode: "WFH",
    salaryMin: 11000000,
    salaryMax: 15000000,
    postedAt: "2025-09-23",
    tags: ["JavaScript", "React", "Node.js"],
  },
];

const formatRupiah = (num: number) => {
  if (!num) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function JobFinderApp() {
  const [filters, setFilters] = useState({
    nama: "",
    kota: "Semua",
    jenisPekerjaan: "Semua",
    tingkat: "Semua",
    mode: "Semua",
    gajiMinimum: "",
  });
  const [sortBy, setSortBy] = useState("Terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleFilterChange = (field: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      nama: "",
      kota: "Semua",
      jenisPekerjaan: "Semua",
      tingkat: "Semua",
      mode: "Semua",
      gajiMinimum: "",
    });
    setSortBy("Terbaru");
    setCurrentPage(1);
  };

  const filteredJobs = useMemo(() => {
    let result = JOBS.filter((job) => {
      const namaMatch =
        !filters.nama ||
        job.title.toLowerCase().includes(filters.nama.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.nama.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(filters.nama.toLowerCase())
        );

      const kotaMatch = filters.kota === "Semua" || job.city === filters.kota;
      const jenisMatch =
        filters.jenisPekerjaan === "Semua" ||
        job.jobType === filters.jenisPekerjaan;
      const tingkatMatch =
        filters.tingkat === "Semua" || job.level === filters.tingkat;
      const modeMatch = filters.mode === "Semua" || job.mode === filters.mode;
      const gajiMatch =
        !filters.gajiMinimum || job.salaryMax >= parseInt(filters.gajiMinimum);

      return (
        namaMatch &&
        kotaMatch &&
        jenisMatch &&
        tingkatMatch &&
        modeMatch &&
        gajiMatch
      );
    });

    if (sortBy === "Terbaru") {
      result.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    } else if (sortBy === "Gaji Tertinggi") {
      result.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sortBy === "A–Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
            Job Finder
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Temukan pekerjaan impianmu
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Filter Pencarian
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama
                  </label>
                  <input
                    id="nama"
                    type="text"
                    placeholder="Cari pekerjaan, perusahaan..."
                    value={filters.nama}
                    onChange={(e) => handleFilterChange("nama", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="kota"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kota
                  </label>
                  <select
                    id="kota"
                    value={filters.kota}
                    onChange={(e) => handleFilterChange("kota", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Semua</option>
                    <option>Jakarta</option>
                    <option>Bandung</option>
                    <option>Yogyakarta</option>
                    <option>Surabaya</option>
                    <option>Semarang</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="jenisPekerjaan"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Jenis Pekerjaan
                  </label>
                  <select
                    id="jenisPekerjaan"
                    value={filters.jenisPekerjaan}
                    onChange={(e) =>
                      handleFilterChange("jenisPekerjaan", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Semua</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tingkat"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tingkat
                  </label>
                  <select
                    id="tingkat"
                    value={filters.tingkat}
                    onChange={(e) =>
                      handleFilterChange("tingkat", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Semua</option>
                    <option>Intern</option>
                    <option>Junior</option>
                    <option>Mid</option>
                    <option>Senior</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mode
                  </label>
                  <select
                    id="mode"
                    value={filters.mode}
                    onChange={(e) => handleFilterChange("mode", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Semua</option>
                    <option>Onsite</option>
                    <option>Hybrid</option>
                    <option>Remote</option>
                    <option>WFH</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="gajiMinimum"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gaji Minimum
                  </label>
                  <input
                    id="gajiMinimum"
                    type="number"
                    placeholder="Contoh: 5000000"
                    value={filters.gajiMinimum}
                    onChange={(e) =>
                      handleFilterChange("gajiMinimum", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-gray-700" role="status" aria-live="polite">
                Menampilkan{" "}
                <span className="font-bold">{filteredJobs.length}</span>{" "}
                lowongan
              </p>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label
                  htmlFor="sortBy"
                  className="text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                  Urutkan:
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option>Terbaru</option>
                  <option>Gaji Tertinggi</option>
                  <option>A–Z</option>
                </select>
              </div>
            </div>

            {paginatedJobs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Tidak ada hasil
                </h3>
                <p className="text-gray-600 mb-4">
                  Coba ubah filter pencarian Anda
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                  {paginatedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-1">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        📍 {job.city}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          {job.jobType}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          {job.level}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                          {job.mode}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700">
                          {formatRupiah(job.salaryMin)} -{" "}
                          {formatRupiah(job.salaryMax)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Diposting: {formatDate(job.postedAt)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                        Lamar
                      </button>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Previous
                    </button>
                    <span className="text-gray-700">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2025 Job Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
