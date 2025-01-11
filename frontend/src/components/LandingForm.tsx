import React, { useState } from 'react';

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
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Data submitted successfully!');
      } else {
        setMessage(data.message || 'Submission failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="birthday">Birthday</label>
        <input type="date" id="birthday" value={formData.birthday} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};
