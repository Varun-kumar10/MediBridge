import "./AuthButton.css";

function AuthButton({
  text,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      className="auth-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default AuthButton;