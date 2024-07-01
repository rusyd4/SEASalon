export const paginate = (items, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};
