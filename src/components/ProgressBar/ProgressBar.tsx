import { useCallback, useRef } from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({
  progress,
  onChange,
}: {
  progress: number;
  onChange: (percentForwarded: number) => void;
}) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const handleProgressChange = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current) return;

      const $progressBar = progressBarRef.current;
      const currentMousePos = clientX;
      const progressBarWidth = $progressBar.clientWidth;
      const progressBarPos = $progressBar.getBoundingClientRect().left;

      // calc % forwarded
      const pixelForwarded = currentMousePos - progressBarPos;
      const percentForwarded =
        pixelForwarded > 0 ? (pixelForwarded / progressBarWidth) * 100 : 0;
      // get value to set audio in seconds

      onChange(percentForwarded);
    },
    [onChange]
  );
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleProgressChange(e.clientX);
    },
    [handleProgressChange]
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={progressBarRef}
      className={styles['progress-bar']}
      onClick={(e) => handleProgressChange(e.clientX)}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          width: progress + '%',
        }}
      />
      <div
        style={{
          left: `calc(${progress}% - 7.5px)`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
