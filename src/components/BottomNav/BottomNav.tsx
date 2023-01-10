import homeIcon from 'assets/home.png';
import personIcon from 'assets/person.png';
import searchIcon from 'assets/search.png';
import shuffleIcon from 'assets/shuffle.png';
import { useAppDispatch } from 'store/config';
import { toPage } from 'store/slices/routerSlice';
import styles from './BottomNav.module.scss';

const BottomNav = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles['bottom-nav']}>
      <ul>
        <li>
          <button
            onClick={() => {
              dispatch(toPage(1));
            }}
          >
            <img src={homeIcon} alt="" />
          </button>
        </li>
        <li>
          <button>
            <img src={shuffleIcon} alt="" />
          </button>
        </li>
        <li>
          <button>
            <img src={searchIcon} alt="" />
          </button>
        </li>
        <li>
          <button>
            <img src={personIcon} alt="" />
          </button>
        </li>
      </ul>
    </div>
  );
};
export default BottomNav;
