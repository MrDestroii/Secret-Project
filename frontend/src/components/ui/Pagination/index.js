import React, { useMemo, useCallback, useState } from "react";

import PropTypes from "prop-types";
import * as R from "ramda";

import { Button } from "components/ui/Button";
import { ControlsIcon } from "./ControlsIcon";
import { Dots } from "./Dots";

import { isControl } from "./helpers";

import "./styles.scss";

const classesButton = {
  button: "ui-pagination-button",
};

const titleControls = `Press "Control" button on your keyboard for to switch general controls buttons`;

export const Pagination = (props) => {
  const { count, page, countPerPage, onChangePage } = props;

  const [isGeneralControls, setIsGeneralControls] = useState(false);

  const handleChangePage = useCallback(
    (number) => () => {
      if (R.compose(R.not, R.equals(number))(page)) {
        onChangePage(number);
      }
    },
    [onChangePage, page]
  );

  const handleDownCtrl = useCallback(
    ({ key }) => {
      if (isControl(key) && !isGeneralControls) {
        setIsGeneralControls(true);
      }
    },
    [isGeneralControls]
  );

  const handleUpCtrl = useCallback(({ key }) => {
    if (isControl(key)) {
      setIsGeneralControls(false);
    }
  }, []);

  const countPages = useMemo(() => Math.ceil(count / countPerPage), [
    count,
    countPerPage,
  ]);

  const configsControlsButtons = useMemo(
    () => ({
      prev: {
        isDisable: R.equals(page, 0),
        clickValue: isGeneralControls ? 0 : page - 1,
      },
      next: {
        isDisable: R.equals(page + 1, countPages),
        clickValue: isGeneralControls ? countPages - 1 : page + 1,
      },
    }),
    [page, countPages, isGeneralControls]
  );

  return (
    <div
      tabIndex="0"
      className="ui-pagination-wrapper"
      onKeyDown={handleDownCtrl}
      onKeyUp={handleUpCtrl}
      title={titleControls}
    >
      <Button
        title={
          <ControlsIcon
            className="ui-pagination-button-icon prev"
            isDouble={isGeneralControls}
          />
        }
        classes={classesButton}
        onClick={handleChangePage(configsControlsButtons.prev.clickValue)}
        isDisable={configsControlsButtons.prev.isDisable}
      />
      <Dots
        page={page}
        countPerPage={countPerPage}
        count={count}
        countPages={countPages}
        handleChangePage={handleChangePage}
      />
      <Button
        title={
          <ControlsIcon
            className="ui-pagination-button-icon next"
            isDouble={isGeneralControls}
          />
        }
        classes={classesButton}
        onClick={handleChangePage(configsControlsButtons.next.clickValue)}
        isDisable={configsControlsButtons.next.isDisable}
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
