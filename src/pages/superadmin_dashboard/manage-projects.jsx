import { useState, memo } from "react";
import { Search, Box, Eye, Calendar, DollarSign, Briefcase, Clock, TrendingUp, Sparkles } from "lucide-react";
import { useGetAllProjects } from "../../../api/client/superadmin";

const ActiveProjects = () => {
  const [search, setSearch] = useState("");



  const { data: projects, isLoading, isError } = useGetAllProjects();


  const handleView = (id) => {
    console.log("View project:", id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const activeProjects = (projects || []).filter((project) => {
    const createdDate = new Date(project.created_at || project.deadline);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return createdDate >= thirtyDaysAgo;
  });

  const filteredProjects = activeProjects.filter(
    (project) =>
      project.title?.toLowerCase().includes(search.toLowerCase()) ||
      project.category?.toLowerCase().includes(search.toLowerCase()) ||
      project.subCategory?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
              <div className=" backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299] rounded-2xl shadow-lg shadow-blue-500/30">
                  <Box className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                      Active Projects
                    </h1>
                    <Sparkles className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-slate-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    View all active freelancer projects in real-time
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative group lg:min-w-96">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl 
                             bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white
                             transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                  placeholder="Search by title, category, or sub-category..."
                />
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatBadge
                  label="Active Projects"
                  value={filteredProjects.length}
                  icon={<Box className="w-4 h-4" />}
                  color="blue"
                />
                <StatBadge
                  label="Total Budget"
                  value={`$${filteredProjects.reduce((sum, p) => sum + parseInt(p.budget.replace(/[$,]/g, '')), 0).toLocaleString()}`}
                  icon={<DollarSign className="w-4 h-4" />}
                  color="emerald"
                />
                <StatBadge
                  label="Last Updated"
                  value={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  icon={<Clock className="w-4 h-4" />}
                  color="purple"
                />
              </div>
            </div>
          </div>
        </div>
            

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 
                           hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-300/60 
                           transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3C9299] via-[#2DD4BF] to-[#3C9299]"></div>
                
                {/* Background Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-6 flex flex-col gap-5 flex-1">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 text-xs font-bold rounded-full border border-blue-200/60">
                      <Briefcase className="w-3 h-3" />
                      {project.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {project.subCategory}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#59CBBA] transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {project.description.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200/60">
                    <ProjectDetail
                      icon={<DollarSign className="w-3.5 h-3.5" />}
                      label="Budget"
                      value={project.budget}
                    />
                    <ProjectDetail
                      icon={<Clock className="w-3.5 h-3.5" />}
                      label="Type"
                      value={project.type}
                    />
                    <ProjectDetail
                      icon={<Briefcase className="w-3.5 h-3.5" />}
                      label="Mode"
                      value={project.mode}
                    />
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center justify-between p-4 bg-amber-500/5 rounded-xl border border-amber-200/40">
                    <div className="flex items-center gap-2 text-amber-700">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-semibold">Deadline</span>
                    </div>
                    <span className="text-sm font-bold text-amber-900">
                      {formatDate(project.deadline)}
                    </span>
                  </div>

              
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 p-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-blue-100 mb-6">
                <Box className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Projects Found</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                {search
                  ? `No active projects match your search for "${search}"`
                  : "There are no active projects in the system yet"}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                             text-white px-6 py-3 rounded-xl font-bold transition-all duration-300
                             shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatBadge = ({ label, value, icon, color }) => {
  const colorClasses = {
    blue: "from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200/60",
    emerald: "from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-200/60",
    purple: "from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200/60"
  };

  return (
    <div className={`flex items-center gap-3 p-4 bg-gradient-to-br ${colorClasses[color]} rounded-xl border`}>
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold opacity-75">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
};

const ProjectDetail = ({ icon, label, value }) => (
  <div className="text-center">
    <div className="flex items-center justify-center text-slate-500 mb-1">
      {icon}
    </div>
    <p className="text-xs font-medium text-slate-500 mb-0.5">{label}</p>
    <p className="text-sm font-bold text-slate-900">{value}</p>
  </div>
);

export default memo(ActiveProjects);