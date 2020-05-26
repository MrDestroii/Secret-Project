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

import { ButtonCreate } from "./ButtonCreate";

import * as projectActions from "store/project/actions";
import { getItems, getIsGetFetching } from "store/project/selectors";

import "./styles.scss";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectActions.getProjects());
  }, [dispatch]);

  const isGetFetching = useSelector(getIsGetFetching);
  const items = useSelector(getItems);

  const rendererContent = useMemo(() => {
    return isGetFetching ? (
      <Spinner />
    ) : (
      <>
        {R.compose(
          R.map((project) => {
            return <ListItem key={project.id} project={project} />;
          }),
          R.values
        )(items)}
      </>
    );
  }, [isGetFetching, items]);

  return (
    <Panel
      refWrapper={refPanel}
      title="Projects"
      headerContent={<ButtonCreate refElem={refPanel} />}
      classes={{
        header: 'project-list-header'
      }}
    >
      {rendererContent}
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
