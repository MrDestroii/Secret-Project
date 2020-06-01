import * as R from 'ramda'

export const getRangeData = (page, countPages, countPerPage, previousPage) => {
  const countPagesLessCountPerPage = countPages < countPerPage;
  const minimumDisplay = countPagesLessCountPerPage
    ? countPages
    : countPages - countPerPage;
  const pageMoreThenMinimumDisplay = R.gt(page, minimumDisplay);
  const pageLessThenCountPerPage = R.lt(page + 1, countPerPage);

  if (pageMoreThenMinimumDisplay) {
    return [minimumDisplay, countPages];
  } else {
    if (pageLessThenCountPerPage) {
      return [0, countPerPage];
    } else {
      const previousPageLessPage = R.lt(previousPage, page);
      const bias = countPerPage - (previousPageLessPage ? 2 : countPerPage - 1);

      return [page - bias, page + countPerPage - bias];
    }
  }
};

export const isControl = R.equals("Control");
