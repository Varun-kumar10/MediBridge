import "./HeroContent.css";

function HeroContent() {
  return (
    <div className="hero-content">

      <div className="hero-badge">
        <span className="badge-dot"></span>
        AI Powered Healthcare
      </div>

      <h1 className="hero-title">
        Your Health
        <br />
        Smarter with AI
      </h1>

      <p className="hero-description">
        Experience the future of healthcare with AI-powered
        disease prediction, medical report analysis,
        appointment management, medicine reminders,
        and personalized health insights—all in one platform.
      </p>

      <div className="hero-buttons">

        <button className="primary-btn">
          Get Started
        </button>

        <button className="secondary-btn">
          Watch Demo
        </button>

      </div>

      <div className="hero-trust">

        ⭐ Trusted by
        <strong> 50,000+ Patients </strong>
        across India

      </div>

    </div>
  );
}

export default HeroContent;