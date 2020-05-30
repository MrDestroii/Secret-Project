import React, { useState, useRef, useMemo, useCallback } from "react";

import moment from "moment";
import PropTypes from "prop-types";

import { CreateForm } from "components/projects/CreateForm";

import { Actions } from "components/ui/Actions";
import { Spinner } from "components/ui/Spinner";
import { Modal } from "components/ui/Modal";

import "./styles.scss";

export const ListItem = (props) => {
  const { project, onDeleteProject, isDeleting, onUpdateProject } = props;

  const refEditButton = useRef();

  const [isOpenActions, setIsOpenActions] = useState(false);

  const createdAtFormatted = useMemo(
    () => moment(project.createdAt).format("lll"),
    [project.createdAt]
  );

  const handleMouseOver = useCallback(
    (value) => () => {
      setIsOpenActions(value);
    },
    []
  );

  const handleClickDelete = useCallback(() => {
    onDeleteProject(project.id);
  }, [onDeleteProject, project.id]);

  const handleUpdateProject = useCallback(
    (callback) => (data) => {
      onUpdateProject(project.id, data, callback);
    },
    [project.id, onUpdateProject]
  );

  const rendererActions = useMemo(() => {
    return isDeleting ? (
      <Spinner
        fontSize={13}
        classes={{ spinner: "project-list-item-deleting-spinner" }}
      />
    ) : (
      <>
        <Actions
          refEdit={refEditButton}
          isOpen={isOpenActions}
          onClickClose={handleClickDelete}
        />
        <Modal refButton={refEditButton} title="Edit Project">
          {(onChangeOpen) => (
            <CreateForm
              onSave={handleUpdateProject(onChangeOpen)}
              idProject={project.id}
              projectName={project.name}
              isCreateFetching={false}
            />
          )}
        </Modal>
      </>
    );
  }, [
    isDeleting,
    isOpenActions,
    handleClickDelete,
    project.id,
    project.name,
    handleUpdateProject,
  ]);

  return (
    <tr
      className="project-list-item"
      onMouseEnter={handleMouseOver(true)}
      onMouseLeave={handleMouseOver(false)}
    >
      <td>{project.name}</td>
      <td>{project.user.name}</td>
      <td>{createdAtFormatted}</td>
      <td>{rendererActions}</td>
    </tr>
  );
};

ListItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onUpdateProject: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
};
