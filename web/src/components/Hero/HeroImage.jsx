import "./HeroImage.css";

import FloatingCards from "../FloatingCards";

function HeroImage() {
  return (
    <div className="hero-image-section">

      <div className="hero-glow"></div>

      <img
        src="/images/doctor.png"
        alt="Doctor"
        className="doctor-image"
      />

      <FloatingCards />

    </div>
  );
}

export default HeroImage;