
export const paginationAndSearch = (pageNumber, page, search, usersPerPage) => {

  const pagesVisited = pageNumber * usersPerPage;

  const displayPages = page?.slice(pagesVisited, pagesVisited + usersPerPage).filter((val) => {
    if (search === "") {
      return val;
    }
    else if (val?.loggedUser.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  })
  return displayPages;
}