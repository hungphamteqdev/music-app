import { useState } from 'react';
import { useAppDispatch } from 'store/config';
import { toPage } from 'store/slices/routerSlice';
import styles from './Form.module.scss';

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password: string) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/.test(
    password
  );
};

const Form = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('Hp@0932170401');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const emailIsValid = isValidEmail(email);
        const passwordIsValid = isValidPassword(password);

        setEmailError(false);
        setPasswordError(false);

        if (!emailIsValid || !passwordIsValid) {
          if (!emailIsValid) {
            setEmailError(true);
          } else {
            setPasswordError(true);
          }
          return;
        }

        dispatch(toPage(2));
      }}
      className={styles.form}
    >
      <div className={styles.form__group}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="input your email"
        />
        {emailError && <p>Email is invalid</p>}
      </div>
      <div className={styles.form__group}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="input your password"
        />
        {passwordError && <p>Password is invalid</p>}
      </div>
      <button>LOGIN</button>
    </form>
  );
};
export default Form;
