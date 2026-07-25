import "./InputField.css";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="input-group">
      <label>{label}</label>

      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}

        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {isPassword && (
          <span
            className={`password-toggle ${
              showPassword ? "active" : ""
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="input-error">{error}</p>}
    </div>
  );
}

export default InputField;