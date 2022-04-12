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
  // position-absolute top-50 start-50 translate-middle
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', backgroundColor: '#282d32' }}>
      <div className=" bg-dark p-5 text-light rounded-3">
        <h4>Gerenciador de tarefas</h4>
        <div className='col-sm-12 mt-4'>
          <label htmlFor="" >Login</label>
          <input
            className="form-control form-control-sm inputLogin"
            type="email"
            size="sm"
            value={login.login}
            onChange={({ target }) => setLogin({ ...login, email: target.value })}
            placeholder="teste@email.com"
            autoComplete={"off"}
          />
        </div>
        <div className='col-sm-12 mt-3'>
          <label htmlFor="">Senha</label>
          <input
            className="form-control form-control-sm inputLogin"
            type="password"
            size="sm"
            value={login.password}
            onChange={({ target }) => setLogin({ ...login, password: target.value })}
            placeholder="*******"
            autoComplete={"off"}
          />
        </div>
        <button onClick={auth} className='btn btn-sm btn-primary mt-4 w-100'>Logar</button>
      </div>
    </div>
  );
}
