import { useDispatch, useSelector } from 'react-redux';
import { PROCESS } from '@/shared/config';
import { GithubState } from '../config';
import { githubAction, githubSelectors } from '../model';
import style from './self.module.scss';

export const GithubPage: React.FC<{ getLocalState: () => GithubState }> = ({
  getLocalState,
}) => {
  const dispatch = useDispatch();

  const process = useSelector(() => githubSelectors.process(getLocalState()));
  const error = useSelector(() => githubSelectors.error(getLocalState()));
  const users = useSelector(() => githubSelectors.users(getLocalState()));

  return (
    <main className={style.root}>
      <h1 className={style.title}>GitHub users</h1>

      {(() => {
        switch (process) {
          case 'LOADING':
            return <div>Loading...</div>;
          case 'FAILURE':
            return error ? <div>{`Error: ${error.message}`}</div> : null;
          default:
            return null;
        }
      })()}

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
          dispatch(githubAction.fetchUsers());
        }}
      >
        Load more
      </button>
    </main>
  );
};
