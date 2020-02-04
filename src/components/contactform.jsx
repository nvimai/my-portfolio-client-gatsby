import React, { Component } from "react";
import axios from 'axios';

import "font-awesome/css/font-awesome.min.css";
import "../styles/components/contactform.scss";
import ReCAPTCHA from "react-google-recaptcha";

export default class ContactForm extends Component {
  constructor(props) {
		super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      gCaptcha: '',
      error: false,
      alertMessage: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: false,
      alertMessage: ''
    });
  }
  
  onChangeGCaptcha = (value) => {
    this.setState({
      gCaptcha: value,
      error: false,
      alertMessage: ''
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const { name, email, phone, message, gCaptcha } = this.state;

		//Checking the captcha from Google
		if(
			gCaptcha === undefined ||
			gCaptcha === '' ||
			gCaptcha === null
		){
      // alert('Please check the captcha');
      this.setState({
        alertMessage: 'Please check the Captcha',
        error: true
      })
      return;
    }

    if(gCaptcha) {
      // If Captcha verify successfully
      console.log(name, email, phone, message, gCaptcha);

      axios
        .post(`${process.env.API_ENDPOINT}/contacts`, { name, email, message }) // Post API call to send email
        .then((response) => {
          console.log(response);
          if (response.data) {
            this.setState({
              alertMessage: 'Thanks for contacting me. I\'ll get back to you as soon as possible.',
              error: false
            });

            // Reset the form
            this.resetForm();
          } else {
            this.setState({
              alertMessage: 'Something went wrong!!! Please try again later. Thank you!',
              error: true
            });
          }
        }).catch(err => {
          console.log(err);
          this.setState({
            alertMessage: 'Something went wrong!!! Please try again later. Thank you!',
            error: true
          });
        });
    }
  }

  resetForm(){
    document.getElementById('contact-form').reset();
  }

  render() {
    const { name, email, phone, message, gCaptcha, error, alertMessage } = this.state;
    return (
      <section className="contact-form">
        {/* <form method="POST" data-netlify="true"> */}
        <form id="contact-form" onSubmit={this.handleSubmit} >
          <div className="field">
            <div className="control has-icons-left">
              <input className="input" name="name" type="text" required placeholder="First & Last Name" onChange={this.handleChange} />
              <span className="icon is-small is-left">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            {/* <p className="help is-danger">The field is required</p> */}
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input className="input" name="email" type="email" required placeholder="Your Email" onChange={this.handleChange}/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
            {/* <p className="help is-danger">This email is invalid</p> */}
          </div>
          <div className="field">
            <div className="control">
              <textarea className="textarea" name="message" placeholder="Your Message" onChange={this.handleChange}></textarea>
            </div>
          </div>
          <div className="field">
            <ReCAPTCHA 
              className="gRecaptcha" 
              sitekey={process.env.GOOGLE_RECAPTCHA_SITEKEY}
              onChange={this.onChangeGCaptcha}
            />
          </div>
          <div className={'field ' + ( alertMessage ? '' : 'is-hidden') }>
            <p className={ 'help ' + (error ? 'is-danger' : 'is-success') }>{alertMessage}</p>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">
                <span className="icon">
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </span>
                <span>Send</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
