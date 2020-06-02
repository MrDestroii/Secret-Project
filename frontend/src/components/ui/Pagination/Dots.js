import React, { memo } from "react";

import * as R from "ramda";
import classNames from "classnames";

import { usePrevious } from "hooks/spring";

import { getRangeData } from "./helpers";

export const Dots = memo((props) => {
  const { page, countPages, countPerPage, handleChangePage } = props;

  const previousPage = usePrevious(page);

  const [firstPage, lastPage] = getRangeData(
    page,
    countPages,
    countPerPage,
    previousPage
  );

  const viewsPagesArray = R.compose(
    R.slice(firstPage, lastPage),
    R.range(0)
  )(countPages);

  return (
    <div className="ui-pagination-dots">
      {R.map((number) => {
        const isActivePage = R.equals(page, number);
        const className = classNames("ui-pagination-dot", {
          active: isActivePage,
        });

        return (
          <div
            key={number}
            className={className}
            title={number + 1}
            onClick={handleChangePage(number)}
          />
        );
      }, viewsPagesArray)}
    </div>
  );
});
