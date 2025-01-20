import React, { useState } from 'react';
import logo from '../assets/logo.png';

export const LandingForm = () => {  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthday: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Datos enviados exitosamente!');
        setFormData({ name: '', phone: '', birthday: '' }); // Clear form fields
        window.location.href = 'https://www.instagram.com/sancochobacano.col/'; // Redirect to the Instagram URL
      } else {
        setMessage(data.message || 'Falló el envío');
      }
    } catch (error) {
      console.error(error);      
      setMessage('Ocurrió un Error');
    }
  };

  return (
    <div className="form-container">
      <div className='form-header'>
        <img src={logo} alt="Logo" className="form-logo" />
        <h3>Portal WiFi - Sancocho Bacano</h3>
        <p>Bienvenido a nuestro portal de acceso a internet. Por favor registrate para poder conectarte a nuestra red</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="name">Nombre</label>
          <input autoComplete="on" type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor="phone">Teléfono</label>
          <input autoComplete="on" type="tel" id="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label htmlFor="birthday">Fecha de Cumpleaños</label>
          <input type="date" id="birthday" value={formData.birthday} onChange={handleChange} required />
        </div>
        <br />
        <button className='submit-btn' type="submit">Enviar</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
