import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="form-container">
      <div className="login-page-container full-bg-light-grey">
        <div className="full-width-wrapper  body-min-width bg-light-grey">
          <div className="container pt-5 pb-6">
            <div className="row">
              <div className="col-12 col-md-10 col-lg-8 mx-auto">
                <div className="login-box-wrapper p-4 py-md-5 px-md-6 border rounded-extra bg-white mx-auto">
                  <form  onSubmit={onSubmit}>
                    
                      <h1 className="mb-1">Login</h1>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control "  defaultValue={email}
            onChange={onChange} tabIndex="1"/>
                      </div>
                      <div className="form-group">
                        <div className="d-flex justify-content-between align-items-center">
                          <label htmlFor="password">Password</label>
                          <a className="light-grey small mb-2" href="/en/gb/password/forgot/" tabIndex="7">Forgot password?</a>
                        </div>
                        <input type="password" className="form-control "  defaultValue={password}
            onChange={onChange} tabIndex="2" />
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input remember form-control-lg" id="remember" name="remember" tabIndex="3" />
                        <label className="custom-control-label" htmlFor="remember">Remember me</label>
                      </div>
                      <div className="btn-wrapper mt-4">
                        <button className="btn bark-btn btn-primary full-width" type="submit" tabIndex="4">Log in</button>
                      </div>
                      <div className="text-center py-3 text-light-grey">
                        OR
                      </div>
                      <div className="">
                        <a href="/en/gb/login/send-link/" className="btn bark-btn btn-outline-primary full-width send-magic-link-button" tabIndex="5">Send me a link to log in</a>
                      </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-10 col-lg-8 mx-auto text-center mt-5">
              <div className="pro-account">
                <p>Offering a service? <br className="d-xs-block d-sm-none" /><span><u><a href="/en/gb/sellers/create/" tabIndex="6">Join as a professional</a></u></span></p>
              </div>
              <div className="signup-text">
                <p>Looking for a service? <br className="d-xs-block d-sm-none" /><span><u><a href="/en/gb/" tabIndex="7">Get started</a></u></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Login;
