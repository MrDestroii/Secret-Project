import React, { useEffect, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as R from "ramda";

import { Panel } from "components/ui/Panel";
import { Spinner } from "components/ui/Spinner";
import { Modal } from "components/ui/Modal";

import { ButtonCreate } from "./ButtonCreate";
import { ListItem } from "./ListItem";
import { CreateForm } from "../CreateForm";

import * as projectActions from "store/project/actions";

import {
  getItems,
  getIsGetFetching,
  getIsCreateFetching,
  getIdsIsDeleting,
  getIsUpdateFetching,
} from "store/project/selectors";

import "./styles.scss";

export const ProjectsList = () => {
  const refPanel = useRef();
  const refButtonCreate = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectActions.getProjects());
  }, [dispatch]);

  const items = useSelector(getItems);
  const isGetFetching = useSelector(getIsGetFetching);
  const isCreateFetching = useSelector(getIsCreateFetching);
  const isUpdateFetching = useSelector(getIsUpdateFetching);
  const idsIsDeleting = useSelector(getIdsIsDeleting);

  const handleDeleteProject = useCallback(
    (id) => {
      dispatch(projectActions.deleteProject(id));
    },
    [dispatch]
  );

  const handleUpdateProject = useCallback(
    (id, data, callback) => {
      dispatch(projectActions.updateProject(id, data, callback));
    },
    [dispatch]
  );

  const rendererContent = useMemo(() => {
    return isGetFetching ? (
      <Spinner />
    ) : (
      <table className="project-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created By</th>
            <th>Create At</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {R.compose(
            R.map((project) => {
              const isDeleting = R.includes(project.id, idsIsDeleting);
              return (
                <ListItem
                  key={project.id}
                  project={project}
                  onDeleteProject={handleDeleteProject}
                  onUpdateProject={handleUpdateProject}
                  isDeleting={isDeleting}
                  isUpdateFetching={isUpdateFetching}
                />
              );
            }),
            R.values
          )(items)}
        </tbody>
      </table>
    );
  }, [
    isGetFetching,
    items,
    idsIsDeleting,
    handleDeleteProject,
    handleUpdateProject,
    isUpdateFetching,
  ]);

  const handleOnCreate = useCallback(
    (callback) => (data) => {
      dispatch(projectActions.createProject(data, callback));
    },
    [dispatch]
  );

  return (
    <Panel
      refWrapper={refPanel}
      title="Projects"
      headerContent={
        <ButtonCreate refElem={refPanel} refButton={refButtonCreate} />
      }
      classes={{
        header: "project-list-header",
      }}
    >
      {rendererContent}
      <Modal refButton={refButtonCreate} title="Create Project">
        {(onChangeOpen) => (
          <CreateForm
            onSave={handleOnCreate(onChangeOpen)}
            isFetching={isCreateFetching}
          />
        )}
      </Modal>
    </Panel>
  );
};
