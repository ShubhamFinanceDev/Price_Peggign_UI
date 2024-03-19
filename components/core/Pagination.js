import React from 'react';

const Pagination = ({ meta, next }) => {

    // nextPage : false,
    // currentPage : page,
    // totalPageCount: 1,
    // totalCount : 0

    const e = { preventDefault : () => {}}

    return (
        <div className="pagination">
            <button
                onClick={() => next(e, meta.currentPage - 1)}
                disabled={meta.currentPage <= 1}
            >
                Previous Page
            </button>

            <button>{meta?.currentPage} / {meta?.totalPageCount}</button>

            <button
                disabled={!meta.nextPage}
                onClick={() => next(e, meta.currentPage + 1)}
            >
                Next Page
            </button>
        </div>
    );
};

export default Pagination;