import Newsletter from "../components/Newsletter"
import "./Home.css"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="tst-home">
      {/* Hero */}
      <header className="tst-hero">
        <div className="tst-hero-text">
          <h1>Statement Socks. Everyday Comfort.</h1>
          <p>
            TheseSocksTho turns outfits into conversations. Premium materials,
            bold designs, and the perfect fit—made to last and priced for real
            people.
          </p>

          <div className="tst-hero-ctas">
            <Link to="/shop" className="tst-btn primary">
              Browse Best Sellers
            </Link>
            <a href="#why" className="tst-btn">
              Why TheseSocksTho?
            </a>
          </div>

          <div className="tst-hero-badges">
            <span>🧼 Breathable</span>
            <span>🧦 Stay-up cuff</span>
            <span>🧵 Soft combed cotton</span>
            <span>🚚 Fast shipping</span>
          </div>
        </div>

        <div className="tst-hero-media">
          <img src="/sockexample.png" alt="Featured socks" />
        </div>
      </header>

      {/* Why / Value props */}
      <section id="why" className="tst-why">
        <h2>Why TheseSocksTho?</h2>
        <div className="tst-why-grid">
          <div className="tst-why-card">
            <h3>Comfort that actually lasts</h3>
            <p>
              Premium blends and reinforced heel/toe so they stay soft and hold
              shape wash after wash.
            </p>
          </div>
          <div className="tst-why-card">
            <h3>Designs that spark compliments</h3>
            <p>
              From subtle textures to loud prints—express yourself without
              saying a word.
            </p>
          </div>
          <div className="tst-why-card">
            <h3>Fair price, no middlemen</h3>
            <p>
              Direct-to-you pricing. No hype tax. Quality you can feel the first
              time you slip them on.
            </p>
          </div>
          <div className="tst-why-card">
            <h3>Built for daily wear</h3>
            <p>
              Breathable knit, stay-up cuff, and no-itch seams. Your feet’s new
              happy place.
            </p>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* About / Story */}
      <section id="about" className="tst-about">
        <div className="tst-about-text">
          <h2>Our Story</h2>
          <p>
            We started TheseSocksTho with a simple idea: socks should be more
            than an afterthought. They’re your daily canvas—so we obsess over
            materials, fit, and personality.
          </p>
          <p>
            We partner with responsible manufacturers and iterate on small
            batches, improving each drop based on real feedback from our
            community (that’s you).
          </p>

          <ul className="tst-bullets">
            <li>Small-batch crafted, big-time comfy</li>
            <li>Tested by athletes, designers, and everyday walkers</li>
            <li>Always limited—never boring</li>
          </ul>
        </div>

        <div className="tst-about-media">
          <img src="/sockexample.png" alt="TheseSocksTho details" />
        </div>
      </section>

      {/* CTA */}
      <section className="tst-cta">
        <h2>Ready to level up your sock game?</h2>
        <p>Grab a pair that’ll make your outfit—and your day.</p>
        <Link to="/shop" className="tst-btn primary big">
          Shop Best Sellers
        </Link>
      </section>
      <div style={{ height: "3em" }}></div>
    </div>
  )
}
