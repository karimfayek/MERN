import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const Google_API_Key = 'AIzaSyAuI-z9Hcywn3YdY9FhyIlqarATD46uSJw'
const SellerRegister = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate  = useNavigate();


  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -34.397,
    lng: 150.644,
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.error('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="form-container" style={{display:'flex' , flex:1 , justifyContent:'center' , alignItems:'center' , padding:10 , flexDirection:'column' , backgroundColor:'#c3c3c3'}}>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <LoadScript googleMapsApiKey={Google_API_Key}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default SellerRegister;
