import "./AuthLayout.css";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>🏥 MediBridge</h1>

          <h2>{title}</h2>

          <p>{subtitle}</p>

        </div>

        <div className="auth-content">

          {children}

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;