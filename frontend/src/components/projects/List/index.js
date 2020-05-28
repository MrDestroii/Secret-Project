import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import moment from "moment";
import * as R from "ramda";

import { Panel } from "components/ui/Panel";
import { Spinner } from "components/ui/Spinner";
import { Actions } from "components/ui/Actions";
import { Modal } from "components/ui/Modal";

import { ButtonCreate } from "./ButtonCreate";
import { CreateForm } from "../CreateForm";

import * as projectActions from "store/project/actions";

import {
  getItems,
  getIsGetFetching,
  getIsCreateFetching,
  getIdsIsDeleting,
} from "store/project/selectors";

import "./styles.scss";

const ListItem = (props) => {
  const { project, onDeleteProject, isDeleting } = props;

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

  const handleClickEdit = useCallback(() => {
    console.log("edit");
  }, []);

  const handleClickDelete = useCallback(() => {
    onDeleteProject(project.id);
  }, [onDeleteProject, project.id]);

  return (
    <tr
      className="project-list-item"
      onMouseEnter={handleMouseOver(true)}
      onMouseLeave={handleMouseOver(false)}
    >
      <td>{project.name}</td>
      <td>{project.user.name}</td>
      <td>{createdAtFormatted}</td>
      <td>
        {!isDeleting && (
          <Actions
            isOpen={isOpenActions}
            onClickEdit={handleClickEdit}
            onClickClose={handleClickDelete}
          />
        )}
      </td>
    </tr>
  );
};

export const ProjectsList = () => {
  const refPanel = useRef();
  const refButtonCreate = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectActions.getProjects());
  }, [dispatch]);

  const isGetFetching = useSelector(getIsGetFetching);
  const isCreateFetching = useSelector(getIsCreateFetching);
  const items = useSelector(getItems);
  const idsIsDeleting = useSelector(getIdsIsDeleting);

  const handleDeleteProject = useCallback(
    (id) => {
      dispatch(projectActions.deleteProject(id));
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
                  isDeleting={isDeleting}
                />
              );
            }),
            R.values
          )(items)}
        </tbody>
      </table>
    );
  }, [isGetFetching, items, idsIsDeleting]);

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
            onCreate={(data) => {
              dispatch(projectActions.createProject(data, onChangeOpen));
            }}
            isCreateFetching={isCreateFetching}
          />
        )}
      </Modal>
    </Panel>
  );
};

ListItem.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};
