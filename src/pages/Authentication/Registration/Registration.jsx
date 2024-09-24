import React, {useState} from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";

import './Registration.css';


export default function Registration() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        if (email.trim().length < 6 || email.trim().length > 32) {
            setError(true);
            const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
            toast.error(errorMessage);
            return;
        }

        if (password.trim().length < 6 || password.trim().length > 32) {
            setError(true);
            const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
            toast.error(errorMessage);
            return;
        }

        if (passwordConfirm.trim() != password.trim()) {
            setError(true);
            const errorMessage = "Les deux mot de passe sont différents";
            toast.error(errorMessage);
            return;
        }
        
        localStorage.setItem("email", email);

        setIsLoading(true);
        const formData = new FormData();

        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("passwordConfirm", passwordConfirm);

        const response = await axios.post(
            "http://127.0.0.1:8000/api/v2.0.0/register",
            formData
        );
        
        if (response.data.success) {
            toast.success(response.data.message);
            setIsLoading(false);
            setTimeout(function () {
                navigate("/otp-code/" + email);
            }, 3000);
        } else {
            console.log(response.data);

            if (response.data.data.name !== undefined) {
                toast.error(response.data.data.name[0]);
            } else if (response.data.data.email !== undefined) {
                toast.error(response.data.data.email[0]);
            } else if (response.data.data.password !== undefined) {
                toast.error(response.data.data.password[0]);
            } else if (response.data.data.passwordConfirm !== undefined) {
                toast.error(response.data.data.passwordConfirm[0]);
            }

            setIsLoading(false);
        }
    }
  return (
    <div className="d-flex-col box">
        <div className='container d-grid-2'>
            <ToastContainer stacked/>
                <div class="form-container sign-up-container">
                    <form action="" className="d-flex-col" onSubmit={handleSubmit}>
                      {/* sign up */}
                        <h1>Créer un compte</h1>
                        <div className="social-container">
                            <a href="#" class="social">
                                <i class="fas fa-facebook    "></i>
                            </a>
                            <a href="#" class="social">
                                <i class="fa fa-google-plus" aria-hidden="true"></i>
                            </a>
                            <a href="#" class="social">
                                <i class="fa fa-linkedin" aria-hidden="true"></i>
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <Input type={"text"} value={name} placeholder={"name"} reference={ "name"} onChange={(e) =>setName(e.target.value)} />
                        <Input type={"email"} value={email} placeholder={"email"} reference={ "email"} onChange={(e) =>setEmail(e.target.value)} />
                        <Input type={"password"}  value={password} placeholder={"password"} reference={ "password"} onChange={(e) =>setPassword(e.target.value)} />
                        <Input type={"password"}  value={passwordConfirm} placeholder={"password"} reference={ "passwordConfirm"} onChange={(e) =>setPasswordConfirm(e.target.value)} />
                        
                        <Button diseable={isLoading} type={"submit"} text={isLoading ? "chargement" : "soumettre"}>S'Inscrire</Button>
                    </form>
                </div>
                <div className="overlay-container ">
                    <div className="overlay">
                        <div class="overlay-panel overlay-right  d-flex-col ">
                            <h1>Salut l'Ami</h1>
                            <p>Entrez vos données personnelles et commencez votre discussions avec nous</p>
                            <div>
                                <Link to={"/"} className='sign'>Connexion</Link>
                            </div>
                        </div>
                    </div>

                </div>
        </div>
     </div>
  )
}
