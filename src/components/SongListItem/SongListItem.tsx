import heartBtn from 'assets/heart-btn.png';
import playBtn from 'assets/play-btn.png';
import { useAppDispatch } from 'store/config';
import { getDetail } from 'store/slices/detailSlice';
import { toPage } from 'store/slices/routerSlice';
import { Track } from 'types/Track';
import styles from './SongListItem.module.scss';

const SongListItem = ({ track }: { track: Track['track'] }) => {
  const dispatch = useAppDispatch();
  const title = track?.title || 'Unknowm';
  const username = track?.user?.username || 'Unknown';
  const musicSrc =
    track?.media?.transcodings.find((trans) =>
      trans?.url?.endsWith('progressive')
    )?.url || '';
  const avatar = track.artwork_url.replace('large', 't500x500');
  const id = track.id;

  return (
    <div className={styles['song-list-item']}>
      <button
        onClick={() => {
          dispatch(
            getDetail({
              title,
              username,
              musicSrc,
              avatar,
              id,
            })
          );
          dispatch(toPage(3));
        }}
      >
        <img src={playBtn} alt="" />
      </button>
      <p>{title}</p>
      <button>
        <img src={heartBtn} alt="" />
      </button>
    </div>
  );
};
export default SongListItem;
