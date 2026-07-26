import AuthLayout from "../../components/Auth/AuthLayout";
import InputField from "../../components/Auth/InputField";
import AuthButton from "../../components/Auth/AuthButton";

import { Checkbox } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

    const [rememberMe, setRememberMe] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {

            const response = await loginUser(email, password);

            console.log("Login Success:", response);

            // Save JWT Token
            localStorage.setItem("token", response.token);

            // Save Logged In User
            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }

            alert(response.message);
            navigate("/dashboard");

            // TODO:
            // Navigate to dashboard here
            // Example:
            // navigate("/dashboard");

        } catch (error) {

            alert(error.message || "Login Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout
            title="Welcome Back 👋"
            subtitle="Sign in to continue your health journey"
        >

            <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {

                    setEmail(e.target.value);

                    if (errors.email) {

                        setErrors((prev) => ({
                            ...prev,
                            email: "",
                        }));

                    }

                }}
                icon={<Email fontSize="small" />}
                error={errors.email}
            />

            <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {

                    setPassword(e.target.value);

                    if (errors.password) {

                        setErrors((prev) => ({
                            ...prev,
                            password: "",
                        }));

                    }

                }}
                icon={<Lock fontSize="small" />}
                error={errors.password}
            />

            <div className="login-options">

                <label className="remember-me">

                    <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        size="small"
                    />

                    Remember Me

                </label>

                <Link
                    to="/forgot-password"
                    className="forgot-password"
                >
                    Forgot Password?
                </Link>

            </div>

            <AuthButton
                text={loading ? "Signing In..." : "Sign In"}
                onClick={handleLogin}
                disabled={loading}
            />

        </AuthLayout>

    );

}

export default Login;