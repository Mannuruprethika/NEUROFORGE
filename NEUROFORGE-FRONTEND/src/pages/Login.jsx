import { useState } from "react";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();

            console.log("Login successful:", data);

            // Tell App.jsx that login was successful
            onLogin(data);

        } catch (err) {
            console.error(err);
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="logo-box">
                    N
                </div>

                <h1>NeuroForge</h1>

                <p className="subtitle">
                    Software Development Management Platform
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email address</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <button type="submit">
                        Sign in →
                    </button>

                </form>

                <p className="login-footer">
                    Manage projects. Track requirements. Build better software.
                </p>

            </div>

        </div>
    );
}

export default Login;