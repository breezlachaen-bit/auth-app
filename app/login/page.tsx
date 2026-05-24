"use client";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("token", data.token);
                alert("เข้าสู่ระบบสำเร็จ");
            } else {
                setError(data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
            }
        } catch {
            setError("ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="vc-login-page">
            <div className="vc-login-background"></div>

            <div className="vc-container">
                <section className="vc-hero-card">
                    <div className="vc-badge">
                        <div className="logo">
                            <img
                                src="/image/L1.jpg"
                                alt="Logo"
                                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 18 }}
                            />
                        </div>
                        <div className="vc-badge-text">
                            <strong>วิทยาลัยการอาชีพกุมภวาปี</strong>
                            <span>สำนักงานคณะกรรมการการศึกษาอาชีวศึกษา</span>
                        </div>
                    </div>
                    <div className="vc-hero-visual" aria-hidden></div>
                    <h1>ระบบ Authentication ของวิทยาลัยการอาชีพกุมภวาปี</h1>
                    <p>
                        เข้าสู่ระบบด้วยบัญชีของวิทยาลัย เพื่อใช้งานบริการออนไลน์สำหรับครู ผู้บริหาร และนักเรียน
                       
                    </p>
                    <div className="vc-hero-pill-list">
                        
                    </div>
                </section>

                <section className="vc-login-panel" aria-labelledby="login-heading">
                    <div className="vc-login-header">
                        <div>
                            <p className="vc-login-label">เข้าสู่ระบบ</p>
                            <h2 id="login-heading">ล็อกอินด้วยบัญชีของวิทยาลัย</h2>
                        </div>
                        <p className="vc-login-note">  </p>
                    </div>

                    <form className="vc-login-form" onSubmit={handleLogin}>
                        <label>
                            อีเมล
                            <input
                                type="email"
                                placeholder="your.email@school.ac.th"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            รหัสผ่าน
                            <input
                                type="password"
                                placeholder="รหัสผ่าน"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>

                        {error && <div className="vc-login-error">{error}</div>}

                        <button type="submit" className="vc-login-button" disabled={isLoading}>
                            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>

                        <p className="vc-login-footnote">
                            หากลืมรหัสผ่าน กรุณาติดต่อเจ้าหน้าที่งานทะเบียนและวัดผลของวิทยาลัย
                        </p>
                    </form>
                </section>
            </div>
        </main>
    );
}