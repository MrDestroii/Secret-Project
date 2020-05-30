import React, { useState, useCallback, useMemo } from "react";

import PropTypes from "prop-types";
import * as R from "ramda";

import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { Spinner } from "components/ui/Spinner";

import "./styles.scss";

export const CreateForm = (props) => {
  const { onSave, isCreateFetching, projectName, idProject } = props;

  const [name, setName] = useState(projectName);

  const handleChangeName = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const handleClickSave = useCallback(() => {
    onSave({ name });
  }, [onSave, name]);

  const isDisabledSaveButton = useMemo(() => {
    const idProjectIsNil = R.isNil(idProject);
    const nameIsEmpty = R.isEmpty(name);

    return idProjectIsNil
      ? nameIsEmpty
      : R.or(nameIsEmpty, R.equals(name, projectName));
  }, [name, idProject, projectName]);

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
          title="Save"
          onClick={handleClickSave}
          isDisable={isDisabledSaveButton}
        />
      </div>
      {rendererSpinner}
    </div>
  );
};

CreateForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  isCreateFetching: PropTypes.bool,
  projectName: PropTypes.string,
  idProject: PropTypes.string,
};

CreateForm.defaultProps = {
  projectName: "",
};
