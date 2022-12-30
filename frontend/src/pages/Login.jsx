import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (eventCalled) => {
    setFormData((prevState) => ({
      ...prevState,
      [eventCalled.target.name]: eventCalled.target.value,
    }));
  };

  const onSubmit = (eventCalled) => {
    eventCalled.preventDefault();
  };
  
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p> Log and Set your Goals </p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              type='email' className='form-control'
              id='email' name='email' value={email}
              placeholder='Enter Your Email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input 
              type='password' className='form-control'
              id='password' name='password' value={password}
              placeholder='Enter Your Password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login;