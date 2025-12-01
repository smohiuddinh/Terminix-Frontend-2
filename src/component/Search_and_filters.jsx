import React from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react';
import ReactSelect from './buttonSelect';


function Search_and_filters({ search, setSearch, inptPlaceholder = '', children }) {

    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="mt-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/60 mb-6 shadow-lg shadow-slate-200/50">
            <div className="p-5 border-b border-slate-200/60 flex items-center justify-between gap-4">
                <div className="flex-1 max-w-md relative group">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder={inptPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all font-medium text-slate-700"
                >
                    <Filter className="w-4 h-4" />
                    Filters
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
                </button>
            </div>

            {showFilters && (
                <div className="p-5 border-b border-slate-200/60 bg-gradient-to-br from-slate-50 to-blue-50/30 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Search_and_filters