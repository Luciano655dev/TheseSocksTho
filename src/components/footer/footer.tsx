import "./footer.css"

export default function Footer() {
  return (
    <footer className="tst-footer">
      <div className="tst-footer-main">
        <div className="tst-footer-brand">
          <img
            src="/thesesockstho_logo.png"
            alt="TheseSocksTho"
            className="tst-footer-logo"
          />
          <p className="tst-footer-tag">
            Statement socks for people who like compliments.
          </p>
        </div>

        <div className="tst-footer-section">
          <h4>About Me</h4>
          <ul>
            <li>
              <a href="https://daykeeper.app">Daykeeper</a>
            </li>
            <li>
              <a href="https://luciano655.netlify.app">Website</a>
            </li>
            <li>
              <a href="https://github.com/luciano655dev">GitHub</a>
            </li>
            <li>
              <a href="https://instagram.com/lucianohlmenezes">Instagram</a>
            </li>
          </ul>
        </div>

        <div className="tst-footer-section">
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="/shop">Best Sellers</a>
            </li>
            <li>
              <a href="/shop#all">All Products</a>
            </li>
          </ul>
        </div>

        <div className="tst-footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="/about">Our Story</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="tst-footer-bottom">
        <p>© {new Date().getFullYear()} TheseSocksTho. All rights reserved.</p>
      </div>
    </footer>
  )
}
