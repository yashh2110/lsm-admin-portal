import React, {useState} from 'react';
import '../css/auth/signin.css';
import logo from '../../assets/images/logo.svg';
import {signinService} from './AuthService';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/actions/Users';
import {toast, ToastContainer} from 'react-toastify';
function Signin() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {isLogged} = useSelector(state => state.user);
  console.log(isLogged);
  const submit = e => {
    e.preventDefault();
    signinService({email, password})
      .then(res => {
        if (res.data.isSuccess) {
          dispatch(
            setUser({...res.data, isLogged: res.data.isSuccess ? true : false}),
          );
          localStorage.setItem('sessionId', res.data.sessionId);
          localStorage.setItem('user', JSON.stringify(res.data));
          toast.success(`Hey there ${res.data.name}!`, {
            autoClose: 2500,
          });
        } else {
          toast.error('Please enter valid credentials', {
            autoClose: 2500,
          });
        }
      })
      .catch(err => {
        toast.error('Something went wrong', {
          autoClose: 2000,
        });
      });
  };
  return (
    <div className="signinDiv">
      <ToastContainer />

      <div className="signin">
        <img src={logo} alt="Zasket" className="logo" />
        <p className="title">Inventory Tool</p>
        <form className="signinForm" onSubmit={submit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="siginInput"
            placeholder="Enter Email"
            required
          />
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            className="siginInput"
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
          <div className="showPass">
            <input
              type="checkbox"
              className="siginCheck"
              id="showpass"
              onChange={e => setShowPass(e.target.checked)}
            />
            <label forHtml="showpass">Show Password</label>
          </div>
          <button className="submitBtn">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
