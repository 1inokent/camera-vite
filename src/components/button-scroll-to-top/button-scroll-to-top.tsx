import { smoothScrollToTop } from '../../utils/utils';

function ButtonScrollToTop():JSX.Element {
  return (
    <a
      className="up-btn"
      href="#header"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollToTop();
      }}
      style={{
        opacity: 0.7,
        transition: 'opacity 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </a>
  );
}

export default ButtonScrollToTop;
