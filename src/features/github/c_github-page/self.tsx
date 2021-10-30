import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PROCESS } from "../../../enums";

import { fetchUsers } from "../ducks/actions";
import { selectUsers, selectProcess, selectError } from "../ducks/selectors";

import style from "./style.module.scss";

export const GithubPage = () => {
  const dispatch = useDispatch();

  const process = useSelector(selectProcess);
  const error = useSelector(selectError);
  const users = useSelector(selectUsers);

  const renderProcessIndicator = () => {
    switch (process) {
      case "LOADING":
        return <div>Loading...</div>;

      case "FAILURE":
        return error ? <div>{`Error: ${error.message}`}</div> : null;

      default:
        return null;
    }
  };

  return (
    <main className={style.root}>
      <h1 className={style.title}>GitHub users</h1>

      {renderProcessIndicator()}

      {users.length > 0 ? (
        <ul className={style.userList}>
          {users.map(({ id, login, avatar_url }) => (
            <li key={id} className={style.userCard}>
              <div>{`${id}: ${login}`}</div>
              <img className={style.userAvatar} src={avatar_url} alt={login} />
            </li>
          ))}
        </ul>
      ) : null}

      <button
        className={style.loadButton}
        type="button"
        disabled={process === PROCESS.LOADING}
        onClick={() => {
          dispatch(fetchUsers());
        }}
      >
        Load more
      </button>
    </main>
  );
};
