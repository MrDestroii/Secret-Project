import React, { useState, useCallback, useRef, useMemo } from "react";

import PropTypes from "prop-types";

import { Input } from "components/ui/Input";
import { SearchIcon } from "./SearchIcon";

import { useCallbackWithTimer } from "hooks/useCallbackWithTaimer";

import "./styles.scss";

export const SearchInput = (props) => {
  const { onSearch, onReset } = props;

  const wrapperRef = useRef();

  const [value, setValue] = useState("");

  const handleSearch = useCallback(
    (value) => {
      onSearch(value);
    },
    [onSearch]
  );

  const handleOnSearchWithTimer = useCallbackWithTimer(handleSearch);

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setValue(value);
      handleOnSearchWithTimer(value);
    },
    [handleOnSearchWithTimer]
  );

  const handleClickReset = useCallback(() => {
    onReset();
    setValue("");
  }, [onReset]);

  const rendererSeachIcon = useMemo(
    () => (
      <SearchIcon refWrapper={wrapperRef} onClickReset={handleClickReset} />
    ),
    [handleClickReset]
  );

  return (
    <div className="ui-search-input-wrapper" ref={wrapperRef}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Search..."
        icon={rendererSeachIcon}
      />
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
