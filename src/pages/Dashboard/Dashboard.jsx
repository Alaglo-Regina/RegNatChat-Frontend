import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input.jsx';
import {Outlet, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faServer } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import './dashboard.css';
import Group from '../Includes/Group/Group.jsx';

export default function Dashboard() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: 'john',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)


    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v2.0.0/group/store",
      formData
    )
  }

  const modalClick = () => {
     
    let modal = document.getElementById("modal_container");
    let btn = document.getElementById("openModalBtn");
    let span = document.getElementsByClassName("modal-close");

        btn.onclick = function() {
      modal.style.display = "block";
      }

        span.onclick = function() {
      modal.style.display = "none";
      }
      
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  }

  
    const handleClick = () => {
        let btn = document.querySelector('#btn');
        let sidebar = document.querySelector('.sidebar');

        btn.addEventListener('click', () => {
            sidebar.classList.toggle('active')
      });
    }

  const onLogout = (e) => {
    e.preventDefault()
  }
  
  return (
    <div id='defaultLayout'>
          <aside>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/group">Groupes</Link>
              <Link to="/group">Profil</Link>
              <Link to="/group">Deconnexion</Link>
          </aside>
          <div className="content">
              <header>
                  <div>
                      header
                  </div>
                  <div>
                      {user.name}
                      <a href="#" className='btn-logout' onClick={onLogout}>Logout</a>
                  </div>
              </header>
              <main>
                  <Outlet/>
              </main>
          </div>
    </div>
  )
}
