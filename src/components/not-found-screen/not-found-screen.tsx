import { Link } from 'react-router-dom';
import styles from './not-found-screen.module.css';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <div className={`${styles.container} ${styles.notFound}`}>
      <h1 className={styles.notFoundTitle}>404 Not Found</h1>
      <Link
        className={styles.notFoundLink}
        to={AppRoute.CatalogPage}
        style={{ color: 'blue', textDecoration: 'underline'}}
      >
        Go to Catalog page
      </Link>
    </div>
  );
}

export default NotFoundScreen;
