// Importaciones necesarias
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '../assets/logo.png';

interface IFormValues {
  name: string;
  phone: string;
  birthday: string;
}

export const LandingForm = () => {
  const {
    register,
    handleSubmit,    
    setValue, 
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => { 
    try {
      const response = await fetch('http://3.145.91.214/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Datos enviados exitosamente!');
        window.location.href = 'https://www.instagram.com/sancochobacano.col/';
      } else {
        alert(result.message || 'Falló el envío');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al enviar los datos.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <img src={logo} alt="Logo" className="form-logo" />
        <h3>Portal WiFi - Sancocho Bacano</h3>
        <p>Bienvenido a nuestro portal de acceso a internet. Por favor regístrate para poder conectarte a nuestra red.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'El nombre es obligatorio.',
              pattern: { 
                value: /^(?!.*(.)\1{2,})[A-ZÁÉÍÓÚÑ]{3,} (?!.*(.)\1{2,})[A-ZÁÉÍÓÚÑ]+$/, 
                message: 'Debe ingresar nombre y apellido válidos.' 
              },
            })}
            onChange={(e) => setValue('name', e.target.value.toUpperCase())} 
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        {/* Teléfono */}
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              required: 'El teléfono es obligatorio.',
              pattern: { 
                value: /^3\d{9}$/, 
                message: 'Debe ser un número de 10 dígitos.' 
              },
            })}
          />
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>

        {/* Fecha de cumpleaños */}
        <div className="form-group">
          <label htmlFor="birthday">Fecha de Cumpleaños</label>
          <input
            type="date"
            id="birthday"
            {...register('birthday', {
              required: 'La fecha de cumpleaños es obligatoria.',
              validate: (value: string) => (new Date(value) > new Date() ? 'No puede ser una fecha futura.' : true),
            })}
          />
          {errors.birthday && <p className="error-message">{errors.birthday.message}</p>}
        </div>

        <br />
        <button className="submit-btn" type="submit">Enviar</button>
      </form>
    </div>
  );
};
