import React, { useState, useCallback, useMemo } from "react";

import PropTypes from "prop-types";
import * as R from "ramda";

import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { Spinner } from "components/ui/Spinner";

import "./styles.scss";

export const CreateForm = (props) => {
  const { onCreate, isCreateFetching } = props;

  const [name, setName] = useState("");

  const handleChangeName = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const handleClickCreate = useCallback(() => {
    onCreate({ name });
  }, [onCreate, name]);

  const isDisabledCreate = useMemo(() => R.isEmpty(name), [name]);

  const rendererSpinner = useMemo(() => {
    return isCreateFetching ? (
      <Spinner classes={{ wrapper: "project-create-form-spinner-wrapper" }} />
    ) : null;
  }, [isCreateFetching]);

  return (
    <div className="project-create-form-wrapper">
      <div className="project-create-form-body">
        <Input
          label="Name"
          placeholder="Name"
          onChange={handleChangeName}
          value={name}
        />
      </div>
      <div className="project-create-form-buttons">
        <Button
          title="Create"
          onClick={handleClickCreate}
          isDisable={isDisabledCreate}
        />
      </div>
      {rendererSpinner}
    </div>
  );
};

CreateForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  isCreateFetching: PropTypes.bool,
};
