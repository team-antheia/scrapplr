import React from 'react';
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';
init('user_Vnt5CGWFKgRtdRwXKCs6v');
//import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedback: '', name: '', email: '' };
  }
  // saves the user's name entered to state
  nameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  // saves the user's email entered to state
  emailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  // saves the user's message entered to state
  messageChange = (event) => {
    this.setState({ feedback: event.target.value });
  };

  //onSubmit of email form
  handleSubmit = (event) => {
    event.preventDefault();

    //This templateId is created in EmailJS.com
    const templateId = 'template_1advps8';
    //'basic';

    //This is a custom method from EmailJS that takes the information
    //from the form and sends the email with the information gathered
    //and formats the email based on the templateID provided.
    this.sendFeedback(templateId, {
      message: this.state.feedback,
      name: this.state.name,
      email: this.state.email,
    });
  };

  //Custom EmailJS method
  sendFeedback = (templateId, variables) => {
    console.log(variables);
    console.log(templateId);
    emailjs
      .send(
        'service_w3gw5tr',
        templateId,
        variables,
        'user_Vnt5CGWFKgRtdRwXKCs6v'
      )
      .then((res) => {
        // Email successfully sent alert
        // Swal.fire({
        //   title: 'Email Successfully Sent',
        //   icon: 'success',
        // });
        console.log('success', variables);
        this.setState({ feedback: '', name: '', email: '' });
      })
      // Email Failed to send Error alert
      .catch((err) => {
        console.log('oops!', err);
        //   Swal.fire({
        //     title: 'Email Failed to Send',
        //     icon: 'error',
        //   });
        //   console.error('Email Error:', err);
      });
  };

  render() {
    console.log('props', this.props.location.state.scrapbookId);
    console.log('id');
    console.log('idcrap', this.props.params);
    return (
      //Form layout that requires a Name, Email, and message
      <form className='test-mailing' onSubmit={this.handleSubmit}>
        <br />
        <div style={{ fontSize: '1.2rem' }}>
          <h6>You can also send me an email directly from here</h6>
          <div>
            <label htmlFor='name'>Name</label>
            <input
              className='form-control email-inputs'
              name='user_name'
              type='text'
              id='name'
              onChange={this.nameChange}
              required
            />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input
              className='form-control email-inputs'
              name='user_email'
              type='text'
              id='email'
              onChange={this.emailChange}
              required
            />
          </div>

          <label htmlFor='message'>Message</label>
          <div>
            <textarea
              id='message'
              name='message'
              onChange={this.messageChange}
              placeholder='Put your message here'
              required
              className='email-text-area form-control'
              rows='15'
              cols='20'
            />
            <Link>
              <p id='link'>{`scrapplr.web.app/scrapbooks/${props.params.scrapbookId}/share`}</p>
            </Link>
          </div>
        </div>

        <input type='submit' value='Submit' className='btn btn-outline-light' />
      </form>
    );
  }
}

export default Form;
