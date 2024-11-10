import React, { useState } from "react";
import axios from 'axios';

import AnimatedButton from "../elements/animatedbutton";
import "font-awesome/css/font-awesome.min.css";
import "../../styles/components/forms/contactform.scss";
import ReCAPTCHA from "react-google-recaptcha";

const initFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  gCaptcha: '',
};

const ContactForm = () => {
  const [state, setState] = useState(initFormData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e: any) => {
    setState((preState) => ({
      ...preState,
      [e.target?.name]: e.target?.value,
    }));
    setError(false);
    setAlertMessage('');
  }

  const onChangeGCaptcha = (token: string | null) => {
    setState((preState) => ({
      ...preState,
      gCaptcha: token ?? '',
    }));
    setError(false);
    setAlertMessage('');
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const { name, email, phone, message, gCaptcha } = state;

    //Checking the captcha from Google
    if (
      gCaptcha === undefined ||
      gCaptcha === '' ||
      gCaptcha === null
    ) {
      setError(true);
      setAlertMessage('Please check the Captcha');
      return;
    }

    if (gCaptcha) {
      // If Captcha verify successfully
      console.log(name, email, phone, message, gCaptcha);
      setIsLoading(true);
      setTimeout(() => {
        axios
          .post(`${process.env.API_ENDPOINT}/save-contact?code=${process.env.API_CODE}`, {
            name, email, message, captchaToken: gCaptcha
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          }) // Post API call to send email
          .then((response) => {
            console.log(response);
            if (response.data) {
              setError(false);
              setAlertMessage('Thanks for contacting me. I\'ll get back to you as soon as possible.');

              // Reset the form
              resetForm();
            } else {
              setError(true);
              setAlertMessage('Something went wrong!!! Please try again later. Thank you!');
            }
            setIsLoading(false);
          }).catch(err => {
            console.log(err);
            setError(true);
            setAlertMessage('Something went wrong!!! Please try again later. Thank you!');
            setIsLoading(false);
          });
      }, 2000);
    }
  }

  const resetForm = () => {
    setState(initFormData);
  }

  return (
    <section className="contact-form">
      {/* <form method="POST" data-netlify="true"> */}
      <form id="contact-form">
        <div className="field">
          <div className="control has-icons-left">
            <input className="input" name="name" type="text" required placeholder="First & Last Name" onChange={handleChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>
          </div>
          {/* <p className="help is-danger">The field is required</p> */}
        </div>

        <div className="field">
          <div className="control has-icons-left">
            <input className="input" name="email" type="email" required placeholder="Your Email" onChange={handleChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>
          {/* <p className="help is-danger">This email is invalid</p> */}
        </div>
        <div className="field">
          <div className="control">
            <textarea className="textarea" name="message" placeholder="Your Message" onChange={handleChange}></textarea>
          </div>
        </div>
        <div className="field">
          <ReCAPTCHA
            className="gRecaptcha"
            sitekey={process.env.GOOGLE_RECAPTCHA_SITEKEY ?? ''}
            onChange={onChangeGCaptcha}
          />
        </div>
        <div className={'field ' + (alertMessage ? '' : 'is-hidden')}>
          <p className={'help ' + (error ? 'is-danger' : 'is-success')}>{alertMessage}</p>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <AnimatedButton className={`button btn btn-from-left btn-blue ${isLoading ? 'loading' : ''}`} internal='false' onClick={handleSubmit} >
              <span className="icon">
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </span>
              <span>Send</span>
            </AnimatedButton>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;