import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer() {
  return (
    <footer className="bg-primary py-3 text-white">
      <div className="container">
        <div className="footer__copyright">
          {/* &copy; Casey James Perno 2022 */}
        </div>
        <div className="footer__utility-nav" />
        <div className="footer__social text-end">
          <Link to="https://github.com/khaosophy/gamebook">
            Source Code
          </Link>  
          {} by {}
          <Link to="https://caseyjamesperno.com">
            Casey James Perno
          </Link>
        </div>
      </div>
    </footer>
  )
}