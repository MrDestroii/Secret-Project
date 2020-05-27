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

import * as projectActions from "store/project/actions";
import {
  getItems,
  getIsGetFetching,
  getIsCreateFetching,
} from "store/project/selectors";

import "./styles.scss";
import { CreateForm } from "../CreateForm";

const ListItem = (props) => {
  const { project } = props;

  const [isOpenActions, setIsOpenActions] = useState(false);

  const createdAtFormatted = useMemo(
    () => moment(project.createdAt).format("lll"),
    [project.createdAt]
  );

  const handleMouseOver = useCallback(() => {
    setIsOpenActions(!isOpenActions);
  }, [isOpenActions]);

  const handleClickEdit = useCallback(() => {
    console.log("edit");
  }, []);

  const handleClickClose = useCallback(() => {
    console.log("close");
  }, []);

  return (
    <div
      className="project-list-item"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOver}
    >
      <span>{project.name}</span>
      <span>{project.user.name}</span>
      <span>{createdAtFormatted}</span>
      <Actions
        isOpen={isOpenActions}
        onClickEdit={handleClickEdit}
        onClickClose={handleClickClose}
      />
    </div>
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

  const rendererContent = useMemo(() => {
    return isGetFetching ? (
      <Spinner />
    ) : (
      <div>
        {R.compose(
          R.map((project) => {
            return <ListItem key={project.id} project={project} />;
          }),
          R.values
        )(items)}
      </div>
    );
  }, [isGetFetching, items]);

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
