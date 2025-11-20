import { useRouter } from "next/navigation";
import { useState } from "react"

const SearchBlog = ({ className, onSubmit, currentSearch }) => {
    const [search, setSearch] = useState(currentSearch);
    const route =useRouter()
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            route.push(`/?search=${search}`)
            onSubmit(search.trim());
        
        }} className={className + ' w-fit flex gap-4 items-center'}>
            <input className="w-fit rounded-xl border border-gray-300 px-4 py-2 text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none" type="text" placeholder="Search blog" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="cursor-pointer inline-block px-8 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl transition" type="submit">Search</button>
        </form>
    )
}

export default SearchBlog;