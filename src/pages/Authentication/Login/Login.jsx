
import React, { useState } from 'react'
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";

import './Login.css'

export default function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.set("email", email);
    formData.set("password", password);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v2.0.0/login",
      formData
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(function () {
        navigate("/dashboard");
      }, 3000);
    } else {
      console.log(response.data);
      toast.error(response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div >
        <div className="d-flex-col box">
            <div className="container d-grid-2">
                <ToastContainer />
                <div className="form-container sign-up-container">
                    <form action="" className="d-flex-col" onSubmit={handleSubmit}>
                        {/* sign up */}
                        <h1>Se connecter</h1>
                        <span>Connectez-vous à votre compte</span>
                        <Input type={"email"} value={email} placeholder={"email"} reference={"email"} onChange={(e) =>setEmail(e.target.value)} />
                        <Input type={"password"}  value={password} placeholder={"password"} reference={"password"} onChange={(e) =>setPassword(e.target.value)} />
                        
                        <Button diseable={isLoading} type={"submit"} text={isLoading ? "chargement" : "Se Connecter"}>S'Inscrire</Button>
                        
                    </form>
                </div>
                <div className="overlay-container ">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left d-flex-col">
                        <h1>Content de vous revoir</h1>
                        <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
                        <div>
                            <Link to={"/registration"} className='sign'>Inscription</Link>
                        </div>
                    </div>
                    </div>
                </div> 
              </div>
               
        </div>  
    </div>
  )
}
