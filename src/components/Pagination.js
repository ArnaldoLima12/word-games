import Link from "next/link";

export default function Pagination({ page, totalPages, limit, items, seach}) {
  
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, items);

  const generatePages = (page, totalPages) => {
    const current = Math.min(page, totalPages);
    const total = Math.max(1, totalPages);

    if (total <= 7) {
      return Array.from({ length: total }).map((_, i) => i + 1);
    }

    if (current < 4) {
      return [1, 2, 3, '...', total - 1, total];
    }

    if (current > total - 3) {
      return [1, '...', total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  const usePagination = ({ page, totalPages }) => {
    const pages = generatePages(page, totalPages);
    const isCurrentPage = n => n === page;

    return { pages, isCurrentPage };
  };

  const { pages, isCurrentPage } = usePagination({ page, totalPages });

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 sm:px-6">
      
      <div className="flex flex-1 justify-between sm:hidden">
      
        <Link href={seach ? `/?page=${page - 1 == 0 ? 1 : page - 1}&&item=${seach}` : `/?page=${page - 1 == 0 ? 1 : page - 1}`} passHref>
            <p className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 no-underline">
              Anterior
            </p>
        </Link>

        <Link href={seach ? `/?page=${page + 1 > totalPages ? totalPages : page + 1}&&item=${seach}` : `/?page=${page + 1 > totalPages ? totalPages : page + 1}`} passHref>
            <p className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 no-underline">
              Proxima
            </p>
        </Link>
        
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700"> Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of <span className="font-medium">{items}</span> results </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            
            <Link href={seach ? `/?page=${page - 1 == 0 ? 1 : page - 1}&&item=${seach}` : `/?page=${page - 1 == 0 ? 1 : page - 1}`} passHref>
              <p className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </p>
            </Link>
          

            {pages.map((pageNumber, index) => (
              <div key={index}>
                {pageNumber === '...' ? (
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                ) : (
                  <Link href={seach ? `/?page=${pageNumber}&&item=${seach}` : `/?page=${pageNumber}`} passHref>
                    <p className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${isCurrentPage(pageNumber) ? 'text-indigo-600' : 'text-gray-900'} ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}>
                      {pageNumber}
                    </p>
                  </Link>
                )}
              </div>
            ))}
          
          
           <Link href={seach ? `/?page=${page + 1 > totalPages ? totalPages : page + 1}&&item=${seach}` : `/?page=${page + 1 > totalPages ? totalPages : page + 1}`} passHref>
            <p className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </p>
           </Link>

          </nav>
        </div>
      </div>
    </div>
  );
}
