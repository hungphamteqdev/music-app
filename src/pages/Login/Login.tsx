import image from 'assets/login-image.png';
import Form from 'components/Form/Form';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.login}>
      <h1
        style={{
          color: styles.brandSecondary,
        }}
      >
        Welcome
      </h1>
      <img src={image} alt="" />
      <Form />
    </div>
  );
};
export default Login;
