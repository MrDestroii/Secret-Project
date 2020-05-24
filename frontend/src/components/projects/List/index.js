import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as R from "ramda";

import { Panel } from "components/ui/Panel";
import { Spinner } from "components/ui/Spinner";

import * as projectActions from "store/project/actions";
import { getItems, getIsGetFetching } from "store/project/selectors";

export const ProjectsList = (props) => {
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
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Created By</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {R.compose(
              R.map((project) => {
                return (
                  <tr>
                    <td>{project.name}</td>
                    <td>{project.user.name}</td>
                    <td>{project.createdAt}</td>
                  </tr>
                );
              }),
              R.values
            )(items)}
          </tbody>
        </table>
      </div>
    );
  }, [isGetFetching]);

  return <Panel title="Projects">{rendererContent}</Panel>;
};
