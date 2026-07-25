import AuthLayout from "../../components/Auth/AuthLayout";
import InputField from "../../components/Auth/InputField";
import AuthButton from "../../components/Auth/AuthButton";

import { Email } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {

    return (

        <AuthLayout
            title="Forgot Password?"
            subtitle="Enter your registered email to receive a password reset link."
        >

            <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your registered email"
                icon={<Email fontSize="small" />}
            />

            <AuthButton
                text="Send Reset Link"
            />

            <div className="back-login">

                <Link to="/login">

                    ← Back to Login

                </Link>

            </div>

        </AuthLayout>

    );

}

export default ForgotPassword;