import React, { useMemo, useCallback } from "react";

import PropTypes from "prop-types";
import classNames from "classnames";
import * as R from "ramda";

import { Button } from "components/ui/Button";

import { ReactComponent as IconArrow } from "assets/icons/down-arrow.svg";

import "./styles.scss";

const classesButton = {
  button: "ui-pagination-button",
};

export const Pagination = (props) => {
  const { count, page, countPerPage, onChangePage } = props;

  const handleChangePage = useCallback(
    (number) => () => {
      onChangePage(number);
    },
    [onChangePage]
  );

  const countPages = useMemo(() => Math.ceil(count / countPerPage), [
    count,
    countPerPage,
  ]);

  const rendererDots = useMemo(() => {
    const minimumDisplay = countPages - countPerPage;
    const pageMoreThenMinimumDisplay = R.gt(page, minimumDisplay);

    const viewsPagesArray = R.compose(
      R.slice(
        pageMoreThenMinimumDisplay ? minimumDisplay : page,
        pageMoreThenMinimumDisplay ? countPages : page + countPerPage
      ),
      R.range(0)
    )(countPages);

    return (
      <div className="ui-pagination-dots">
        {R.map((number) => {
          const isActivePage = R.equals(page, number);
          const className = classNames("ui-pagination-dot", {
            active: isActivePage,
          });

          return <div key={number} className={className} title={number + 1} />;
        }, viewsPagesArray)}
      </div>
    );
  }, [countPages, page, countPerPage]);

  return (
    <div className="ui-pagination-wrapper">
      <Button
        title={<IconArrow className="ui-pagination-button-icon left" />}
        classes={classesButton}
        onClick={handleChangePage(page - 1)}
        isDisable={R.equals(page, 0)}
      />
      {rendererDots}
      <Button
        title={<IconArrow className="ui-pagination-button-icon right" />}
        classes={classesButton}
        onClick={handleChangePage(page + 1)}
        isDisable={R.equals(page, countPages - 1)}
      />
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  countPerPage: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  countPerPage: 4,
};
