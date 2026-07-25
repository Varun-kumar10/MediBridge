import FloatingCards from "../FloatingCards/FloatingCards";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          🟢 AI Powered Healthcare
        </span>

        <h1>
          Your Health
          <br />
          Smarter with AI
        </h1>

        <p>
          Analyze medical reports, predict diseases,
          manage medicines and monitor your health
          using one intelligent healthcare platform.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

        <div className="hero-stats">

          <div>

            <h3>95%</h3>

            <p>Prediction Accuracy</p>

          </div>

          <div>

            <h3>1200+</h3>

            <p>Doctors</p>

          </div>

          <div>

            <h3>50000+</h3>

            <p>Patients</p>

          </div>

        </div>

      </div>
      <div className="hero-right">

    <div className="hero-image-container">

        <div className="hero-glow"></div>

        <img
            src="/images/doctor-2.png"
            alt="Doctor"
            className="doctor-2-image"
        />

        <FloatingCards />

    </div>

</div>

      
    </section>
  );
}

export default Hero;