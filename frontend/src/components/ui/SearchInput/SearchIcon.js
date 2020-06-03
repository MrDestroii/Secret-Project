import React, { useState, useCallback, useMemo } from "react";

import { useMouseEnterAndLeave } from "hooks/useMouseEnterAndLeave";

import { ReactComponent as IconSearch } from "assets/icons/search.svg";
import { ReactComponent as IconReset } from "assets/icons/return.svg";

export const SearchIcon = (props) => {
  const { refWrapper, onClickReset } = props;

  const [isReset, setIsReset] = useState(false);

  useMouseEnterAndLeave(
    refWrapper,
    () => {
      setIsReset(true);
    },
    () => {
      setIsReset(false);
    }
  );

  const Icon = useMemo(() => (isReset ? IconReset : IconSearch), [isReset]);

  const handleClick = useCallback(() => {
    if (isReset) {
      onClickReset();
    }
  }, [isReset, onClickReset]);

  return <Icon className="ui-search-input-icon" onClick={handleClick} />;
};
