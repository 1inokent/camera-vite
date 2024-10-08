import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  productName?: string | null;
}

function Breadcrumbs({ productName }: BreadcrumbsProps): JSX.Element {
  const location = useLocation();

  const breadcrumbs = [
    { name: 'Главная', path: AppRoute.CatalogPage, key: 'home' },
    { name: 'Каталог', path: AppRoute.CatalogPage, key: 'catalog' },
    productName ? { name: productName, path: location.pathname, key: location.pathname } : null,
  ].filter(Boolean);

  return (
    <nav className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {breadcrumbs.map((breadcrumb, index) => {
            if (!breadcrumb) {
              return null;
            }

            return (
              <li key={`${breadcrumb.key}`} className="breadcrumbs__item">
                {breadcrumb ? (
                  <Link className={
                    `breadcrumbs__link ${index === breadcrumbs.length - 1 ? 'breadcrumbs__link--active' : ''}`
                  }
                  to={breadcrumb.path}
                  >
                    {breadcrumb.name}
                    {index < breadcrumbs.length - 1 && (
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    )}
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Breadcrumbs;
