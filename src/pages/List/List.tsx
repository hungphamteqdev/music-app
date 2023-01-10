import image from 'assets/list-image.png';
import SongListItem from 'components/SongListItem/SongListItem';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/config';
import { fetchList, useListSelector } from 'store/slices/listSlice';
import styles from './List.module.scss';

const List = () => {
  const dispatch = useAppDispatch();
  const { list, isLoading, isError } = useListSelector();
  let content: React.ReactNode = '';

  useEffect(() => {
    if (list.length === 0) dispatch(fetchList());
  }, [dispatch, list.length]);

  if (isError) {
    content = 'Error';
  }
  if (isLoading) {
    content = 'Loading';
  }
  if (list.length > 0) {
    content = (
      <ul className={styles.list__songs}>
        {list.slice(0, 4).map((item) => (
          <li key={item.track_id}>
            <SongListItem track={item.track} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.list}>
      <h1>Cardi B</h1>
      <h2>Invasion Of Privacy</h2>
      <div className={styles.list__image}>
        <img src={image} alt="" />
      </div>
      <p>My playlist</p>
      {content}
    </div>
  );
};
export default List;
