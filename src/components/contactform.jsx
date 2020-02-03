import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "../styles/components/contactform.scss";

export default class ContactForm extends Component {
  constructor(props) {
		super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      gCaptcha: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  

  handleSubmit(e){
    e.preventDefault();
    const { name, email, phone, message, gCaptcha } = this.state;
    console.log(name, email, phone, message);

		// //Checking the captcha from Google
		// if(
		// 	gCaptcha === undefined ||
		// 	gCaptcha === '' ||
		// 	gCaptcha === null
		// ){
    //   alert('Please select captcha');
    //   return;
		// }
		// // Secret Key
		// // const secretKey = '6LewG5IUAAAAAIfjmq8QoQjJS_x22LEPrn7YgIbw';

		// // Verify URL
		// // const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${gCaptcha}`;
		// // // console.log(verifyUrl);
		// // captchaRequest(verifyUrl, (captErr, captRes, captBody) => {

    // // If Not Successful
    // // if(!gCaptchaCallBack){
    // //   alert('Failed captcha verification');
    // // }
    
    // if(gCaptcha) {
    //   // If Captcha verify successfully
    //   axios
    //     .post('/api/contact', {name, email, phone, message}) // Post API call to send email
    //     .then((response) => {
    //         if(response.data) {
    //           alert(response.data.alertMessage);
    //           if(!response.data.failure)
    //             this.resetForm();
    //         } else {
    //           alert("Opps! Something went wrong! Please try again.");
    //         }
    //       })
    // }
  }

  render() {
    const { name, email, phone, message, gCaptcha } = this.state;
    return (
      <section className="contact-form">
        <form method="POST" data-netlify="true">
          <div className="field">
            <label className="label">Name</label>
            <div className="control has-icons-left">
              <input className="input" name="name" type="text" required placeholder="First & Last Name" onChange={this.handleChange} />
              <span className="icon is-small is-left">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            {/* <p className="help is-danger">The field is required</p> */}
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input className="input" name="email" type="email" required placeholder="Your Email" onChange={this.handleChange}/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
            {/* <p className="help is-danger">This email is invalid</p> */}
          </div>
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" name="message" placeholder="Your Message" onChange={this.handleChange}></textarea>
            </div>
          </div>

          <div className="field">
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
