import { Link, useLocation } from 'react-router-dom';
import { AppRoute, PageNames } from '../../const';

type BreadcrumbsProps = {
  productName?: string | null;
}

function Breadcrumbs({ productName }: BreadcrumbsProps): JSX.Element {
  const location = useLocation();

  const breadcrumbs = [
    { name: PageNames.Home.name, path: AppRoute.CatalogPage, key: PageNames.Home.key },
    { name: PageNames.Catalog.name, path: AppRoute.CatalogPage, key: PageNames.Catalog.key },
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
