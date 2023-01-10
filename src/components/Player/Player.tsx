import nextBtn from 'assets/next-btn.png';
import prevBtn from 'assets/prev-btn.png';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { axiosInstance } from 'libs/axios/config';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'store/config';
import { DetailState, getDetail } from 'store/slices/detailSlice';
import { useListSelector } from 'store/slices/listSlice';
import { Track } from 'types/Track';
import styles from './Player.module.scss';

const StopIcon = () => {
  return <div className={styles['player__stop-icon']} />;
};
const PlayIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4276 6.51405C16.4276 7.66875 16.4276 10.5555 14.4276 11.7102L5.14736 17.0682C3.14736 18.2229 0.647365 16.7795 0.647365 14.4701L0.647365 3.75417C0.647365 1.44477 3.14737 0.00139406 5.14737 1.15609L14.4276 6.51405Z"
        fill="#fff"
      />
    </svg>
  );
};

const getSiblingSong = (
  currentTrackId: number,
  getNext: boolean,
  list: Track[]
) => {
  const currentTrackIdx = list.findIndex((item) => {
    return item.track.id === currentTrackId;
  });
  let siblingTrack: Track;
  if (getNext) {
    siblingTrack = list[currentTrackIdx + 1]
      ? list[currentTrackIdx + 1]
      : list[0];
  } else {
    siblingTrack = list[currentTrackIdx - 1]
      ? list[currentTrackIdx - 1]
      : list[list.length - 1];
  }
  const title = siblingTrack.track.title || 'Unknowm';
  const username = siblingTrack.track.user.username || 'Unknown';
  const musicSrc =
    siblingTrack.track?.media?.transcodings.find((trans) =>
      trans?.url?.endsWith('progressive')
    )?.url || '';
  const avatar = siblingTrack.track.artwork_url.replace('large', 't500x500');
  const id = siblingTrack.track.id;

  return {
    title,
    username,
    musicSrc,
    avatar,
    id,
  };
};

const Player = ({ musicSrc, avatar, title, username, id }: DetailState) => {
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const { list } = useListSelector();

  // for image rotating
  const percentRotate = audioRef.current
    ? (progress / audioRef.current.duration) * 360
    : 0;

  const handleProgressBarChange = useCallback((percentForwarded: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime =
      (audioRef.current.duration * percentForwarded) / 100;
  }, []);

  // fetch data
  useEffect(() => {
    (async () => {
      const res = await axiosInstance({
        url: musicSrc.split('https://api-v2.soundcloud.com')[1],
      });
      setAudioSrc(res.data.url);
    })();
  }, [musicSrc]);

  // play-pause fn
  useEffect(() => {
    if (!audioRef.current) return;
    const $audio = audioRef.current;

    if (!isPlaying) {
      $audio.pause();
      return;
    }

    $audio.play();
  }, [isPlaying]);

  // Autoplay
  useEffect(() => {
    if (audioSrc === '') return;
    if (!audioRef.current) return;

    const $audio = audioRef.current;
    const loadedCb = () => {
      $audio?.play();
    };
    const timeUpdatedCb = () => {
      const trackTime = $audio.duration;
      const currentTime = $audio.currentTime;
      const playedTime = (currentTime / trackTime) * 100;

      if (currentTime === trackTime) {
        setIsPlaying(false);
        setProgress(0);
        return;
      }

      setProgress(playedTime);
    };
    const endedCb = () => {
      if (nextBtnRef.current) nextBtnRef.current.click();
    };
    $audio.addEventListener('timeupdate', timeUpdatedCb);
    $audio.addEventListener('loadeddata', loadedCb);
    $audio.addEventListener('ended', endedCb);

    return () => {
      $audio.removeEventListener('loadeddata', loadedCb);
      $audio.removeEventListener('timeupdate', timeUpdatedCb);
      $audio.removeEventListener('ended', endedCb);
    };
  }, [audioSrc]);

  return (
    <div className={styles.player}>
      <div
        style={{
          transform: `rotate(${percentRotate * 30}deg)`,
        }}
        className={`${styles.player__image}`}
      >
        <img src={avatar} alt="" />
      </div>
      <h1>{title}</h1>
      <h2>{username}</h2>
      <ProgressBar onChange={handleProgressBarChange} progress={progress} />
      <div className={styles.player__actions}>
        <button
          onClick={() => {
            const prev = getSiblingSong(id, false, list);
            dispatch(
              getDetail({
                ...prev,
              })
            );
            setTimeout(() => {
              setIsPlaying(true);
            }, 500);
          }}
        >
          <img src={prevBtn} alt="" />
        </button>
        <button
          onClick={() => {
            setIsPlaying((prevState) => !prevState);
          }}
        >
          {isPlaying ? <StopIcon /> : <PlayIcon />}
        </button>
        <button
          ref={nextBtnRef}
          onClick={() => {
            const next = getSiblingSong(id, true, list);
            dispatch(
              getDetail({
                ...next,
              })
            );
            setTimeout(() => {
              setIsPlaying(true);
            }, 500);
          }}
        >
          <img src={nextBtn} alt="" />
        </button>
      </div>
      {audioSrc && <audio ref={audioRef} src={audioSrc}></audio>}
    </div>
  );
};
export default Player;
