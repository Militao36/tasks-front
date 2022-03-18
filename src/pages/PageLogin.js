import "./index.css";
import { toast } from "react-toastify";
import LoginService from "../services/LoginService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormLogin() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  const auth = async () => {
    try {
      const data = await LoginService.login(login)
      sessionStorage.setItem('token', data.token)
      navigate('/home')
    } catch (error) {
      console.log(error)
      toast.error('Credenciais invalidas!')
    }
  };

  return (
    <div className="d-flex ">
      <div className="container-inputs">
        <div className="form-login">
          <div className="tituloLogin">
            <h4 style={{ color: "#000" }}>Gerenciador de tarefas</h4>
          </div>
          <div className='col-sm-12'>
            <label htmlFor=""
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >Login</label>
            <input
              className="form-control form-control-sm inputLogin"
              type="text"
              size="sm"
              value={login.login}
              onChange={({ target }) =>
                setLogin({ ...login, email: target.value })
              }
              placeholder="Insira seu login"
              autoComplete={"off"}
            />
          </div>
          <div className='col-sm-12 mt-3'>
            <label htmlFor=""
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
            >Senha</label>
            <input
              className="form-control form-control-sm inputLogin"
              type="text"
              size="sm"
              value={login.password}
              onChange={({ target }) =>
                setLogin({ ...login, password: target.value })
              }
              placeholder="Insira seu login"
              autoComplete={"off"}
            />
          </div>
          <div className='mt-4 d-flex justify-content-center'>
            <button onClick={auth} className='btn btn-sm btn-outline-dark' style={{width:'260px'}}>Logar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
