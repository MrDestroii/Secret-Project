import React, {
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import * as R from "ramda";

import { Panel } from "components/ui/Panel";
import { Spinner } from "components/ui/Spinner";
import { Modal } from "components/ui/Modal";
import { Pagination } from "components/ui/Pagination";
import { SearchInput } from "components/ui/SearchInput";

import { ButtonCreate } from "./ButtonCreate";
import { ListItem } from "./ListItem";
import { CreateForm } from "../CreateForm";

import * as projectActions from "store/project/actions";

import {
  getIsGetFetching,
  getIsCreateFetching,
  getIdsIsDeleting,
  getIsUpdateFetching,
  getItemsData,
  getItemsCount,
  getLimit,
  getPage,
  getFilters,
} from "store/project/selectors";

import "./styles.scss";

export const ProjectsList = () => {
  const refPanel = useRef();
  const refButtonCreate = useRef();

  const dispatch = useDispatch();

  const items = useSelector(getItemsData);
  const count = useSelector(getItemsCount);
  const isGetFetching = useSelector(getIsGetFetching);
  const isCreateFetching = useSelector(getIsCreateFetching);
  const isUpdateFetching = useSelector(getIsUpdateFetching);
  const idsIsDeleting = useSelector(getIdsIsDeleting);
  const limit = useSelector(getLimit)
  const page = useSelector(getPage)
  const filters = useSelector(getFilters)

  const handleGetProjects = useCallback(
    () => dispatch(projectActions.getProjects({ ...filters, page, limit })),
    [dispatch, filters, page, limit]
  );

  useEffect(() => {
    handleGetProjects();
  }, [handleGetProjects]);

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

  const handleCreateProject = useCallback(
    (callback) => (data) => {
      dispatch(projectActions.createProject(data, callback));
    },
    [dispatch]
  );

  const handleChangePage = useCallback(
    (newPage) => {
      dispatch(projectActions.setPage(newPage))
    },
    [dispatch]
  );

  const handleResetSearch = useCallback(() => {
    dispatch(projectActions.setPage(0))
    dispatch(projectActions.setFilter("searchValue", ""))
  }, [dispatch])

  const handleSearch = useCallback((value) => {
    dispatch(projectActions.setPage(0))
    dispatch(projectActions.setFilter("searchValue", value))
  }, [dispatch])

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
          {R.compose(R.not, R.isEmpty)(items) ? (
            R.compose(
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
            )(items)
          ) : (
            <tr>
              <td colSpan="100%">
                <div>Projects Not Found</div>
              </td>
            </tr>
          )}
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
  
  const rendererPagination = useMemo(() => {
    return (
      <Pagination
        count={count}
        countPerPage={limit}
        page={page}
        onChangePage={handleChangePage}
      />
    );
  }, [page, count, handleChangePage, limit]);

  const rendererCreateModal = useMemo(() => {
    return (
      <Modal refButton={refButtonCreate} title="Create Project">
        {(onChangeOpen) => (
          <CreateForm
            onSave={handleCreateProject(onChangeOpen)}
            isFetching={isCreateFetching}
          />
        )}
      </Modal>
    );
  }, [handleCreateProject, isCreateFetching]);

  return (
    <Panel
      refWrapper={refPanel}
      title="Projects"
      headerContent={
        <>
          <ButtonCreate refElem={refPanel} refButton={refButtonCreate} />
          <SearchInput
            onReset={handleResetSearch}
            onSearch={handleSearch}
          />
        </>
      }
      classes={{
        header: "project-list-header",
      }}
    >
      {rendererContent}
      {rendererPagination}
      {rendererCreateModal}
    </Panel>
  );
};
