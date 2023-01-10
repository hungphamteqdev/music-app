import leftIcon from 'assets/left-icon.png';
import dotsIcon from 'assets/three-dots.png';
import Player from 'components/Player/Player';
import { useAppDispatch } from 'store/config';
import { useDetailSelector } from 'store/slices/detailSlice';
import { toPage } from 'store/slices/routerSlice';
import styles from './Detail.module.scss';

const Detail = () => {
  const dispatch = useAppDispatch();
  const detail = useDetailSelector();

  return (
    <div className={styles.detail}>
      <div className={styles.detail__header}>
        <button
          onClick={() => {
            dispatch(toPage(2));
          }}
        >
          <img src={leftIcon} alt="" />
        </button>
        <p>Now Playing</p>
        <button>
          <img src={dotsIcon} alt="" />
        </button>
      </div>
      <Player
        id={detail.id}
        avatar={detail.avatar}
        title={detail.title}
        username={detail.username}
        musicSrc={detail.musicSrc}
      />
    </div>
  );
};
export default Detail;
