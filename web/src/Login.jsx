import "./Login.css";
import logo_entreprise from "./assets/Logo.png";
import logo_stats from "./assets/Schéma_stats.png";
import "bootstrap/dist/css/bootstrap.min.css";


import { IoEyeOutline, IoEyeOffOutline, IoLogoGoogle } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route , useNavigate} from "react-router-dom";




function Login() {

    useEffect(() => {
        // Clear email and password from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('pswd');
        localStorage.removeItem('userID');
        localStorage.removeItem('location');
    }, [])

    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const googleLoginUrl = 'https://www.google.com';
    const handleGoogleLoginClick = () => {
        window.location.href = googleLoginUrl;
    };

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    let [email, setEmail] = useState('');
    let [pswd, setPswd] = useState('');
    const [userData, setUserData] = useState(null);

    const handleLogin = async () => {
        try {
            console.log(email + " " + pswd);
            const response = await fetch('http://localhost:3001/profils', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({pswd, email}),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setUserData(result.user);

                localStorage.setItem('email', email);
                localStorage.setItem('pswd', pswd);
                localStorage.setItem('userID', result.user.userID);
                localStorage.setItem('location', result.user.location);
            } else {
                console.error('Échec de la connexion - else');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion - catch', error);
        }
    };
    useEffect(() => {
        handleRole();
    }, [userData]);
    const handleRole = () => {
        try {
            if (userData) {
                if (userData.role === "client") {
                    console.log("Client connecté");
                    navigate("/client");

                } else {
                    console.log("Admin connecté");
                    navigate("/admin");
                }
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du rôle :', error);
        }
    };

    return (

        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-md-6 col-12 d-flex align-items-center justify-content-center ">
                    <div
                        style={{
                            position: "relative",
                            borderRadius: "40px",
                            background: "rgba(255, 255, 255, 0.50)",
                            backdropFilter: "blur(30px)",
                            boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.1)",
                            width: "70%",
                            height: "90%",
                            left: "5%",
                            top: "0.5%",
                            bottom: '3%',
                            margin: "5%",
                            padding: "5%",
                        }}
                    >
                        <div className="row mb-3 d-flex align-items-center justify-content-center">
                            <div className="col-6">
                                <div className="PEIot">P.E.IoT
                                </div>
                                <div className="Login" >Login </div>
                            </div>


                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <img
                                    src={logo_entreprise}
                                    alt="logo"

                                    style={{
                                        borderRadius: "20px",
                                        width: "100%",
                                        height: "auto",
                                    }}
                                />
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                <div className="Email">Email</div>
                            </label>

                            <input value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   style={{
                                       width: '100%',
                                       height: '6vh',
                                       background: '#FFE2CD',
                                       borderRadius: 16,
                                       color: '#592602',
                                       fontSize: 14,
                                       fontFamily: 'Istok Web',
                                       fontWeight: '400',
                                       wordWrap: 'break-word',
                                       border: emailFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                                       boxShadow: emailFocus ? '0 0 0 1px #C74617' : 'none',
                                   }}
                                   type="email"
                                   className="form-control"
                                   id="email"
                                   placeholder="username@gmail.com"
                                   autoComplete='off'
                                   onFocus={() => setEmailFocus(true)}
                                   onBlur={() => setEmailFocus(false)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                <div className="Password">Password</div>
                            </label>
                            <div className="password-input-container" style={{position: 'relative'}}>
                                <input value={pswd}
                                       onChange={(e) => setPswd(e.target.value)}
                                       style={{
                                           width: '100%',
                                           height: '6vh',
                                           background: '#FFE2CD',
                                           borderRadius: 16,
                                           color: '#592602',
                                           fontSize: 14,
                                           fontFamily: 'Istok Web',
                                           fontWeight: '400',
                                           wordWrap: 'break-word',
                                           border: passwordFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                                           boxShadow: passwordFocus ? '0 0 0 1px #C74617' : 'none',
                                       }}
                                    //type = "text"
                                       type={passwordVisible ? 'text' : 'password'}
                                       className="form-control textPassword"
                                       id="password"
                                       placeholder="Password"
                                       onFocus={() => setPasswordFocus(true)}
                                       onBlur={() => setPasswordFocus(false)}

                                />
                                <span onClick={togglePasswordVisibility} className="eye-icon" style={{
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    right: '15px',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }}>
                            {passwordVisible ? <IoEyeOutline/> : <IoEyeOffOutline/>}
                            </span>


                            </div>
                        </div>
                        <div className="mb-3">
                            <a href="/forgot-password" style={{
                                width: '100%',
                                height: '100%',
                                color: '#C74617',
                                fontSize: 12,
                                fontFamily: 'Istok Web',
                                fontWeight: '400',
                                textDecoration: 'underline',
                                wordWrap: 'break-word',
                            }}>
                                Forgot Password
                            </a>
                        </div>

                        <button type="button" className="btn" onClick={handleLogin} style={{
                            width: '100%',
                            height: '6vh',
                            background: '#C74617',
                            borderRadius: 16,
                            color: '#FFF4ED',
                            fontSize: 20,
                            fontFamily: 'Istok Web',
                            fontWeight: '400',
                            wordWrap: 'break-word',
                            border: 'none',
                            marginBottom: "10%",
                            marginTop: '5%'
                        }}>
                            Sign in
                        </button>
                        <div style={{
                            textAlign: 'center',
                            color: '#592602',
                            fontSize: 14,
                            fontFamily: 'Istok Web',
                            fontWeight: '400',
                            wordWrap: 'break-word',
                            marginBottom: "2%"
                        }}>
                            or continue with
                        </div>
                        <div className="Rectangle1384" onClick={handleGoogleLoginClick}>
                            <a href={googleLoginUrl} style={{textDecoration: 'none', color: 'inherit'}}>
                                <span style={{textAlign: 'center'}}>
                                <IoLogoGoogle style={{fontSize: '24px', color: '#C74617'}}/>
                                </span>
                            </a>
                        </div>
                        <div style={{
                            textAlign: 'center',
                            color: '#592602',
                            fontSize: 14,
                            fontFamily: 'Istok Web',
                            fontWeight: '400',
                            wordWrap: 'break-word',
                            marginTop: "4%"
                        }}>
                            Don't have an account yet ? <a href="/Register for free" style={{
                            width: '100%',
                            height: '100%',
                            color: '#C74617',
                            fontSize: 12,
                            fontFamily: 'Istok Web',
                            fontWeight: '400',
                            textDecoration: 'underline',
                            wordWrap: 'break-word'
                        }}>
                            Register for free
                        </a>
                        </div>

                    </div>
                </div>


                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div
                        style={{
                            position: "relative",
                            width: "80%",
                            right: "5%",
                            left: "5%",
                            top: "0.5%",
                            margin: "5%",
                        }}
                    >
                        <img
                            src={logo_stats}
                            alt="logo_stats"
                            className="img-fluid d-none d-md-block"
                            style={{
                                borderRadius: "40px",
                                width: "80%",
                                height: "auto",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Login;