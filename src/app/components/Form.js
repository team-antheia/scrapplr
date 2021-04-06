// import React from 'react';
// //emailjs service id service_w3gw5tr
// import { init } from 'emailjs-com';
// init('user_Vnt5CGWFKgRtdRwXKCs6v');

// export default class extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { feedback: '', name: 'kris', email: 'mm035359@gmail.com' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ feedback: event.target.value });
//   }

//   handleSubmit(event) {
//     const templateId = 'template_id';

//     this.sendFeedback(templateId, {
//       message_html: this.state.feedback,
//       from_name: this.state.name,
//       reply_to: this.state.email,
//     });
//   }

//   sendFeedback(templateId, variables) {
//     window.emailjs
//       .send('gmail', templateId, variables)
//       .then((res) => {
//         console.log('Email successfully sent!');
//       })
//       // Handle errors here however you like, or use a React error boundary
//       .catch((err) =>
//         console.error(
//           'Oh well, you failed. Here some thoughts on the error that occured:',
//           err
//         )
//       );
//   }

//   render() {
//     return (
//       <form className='test-mailing'>
//         <h1>Let's see if it works</h1>
//         <div>
//           <textarea
//             id='test-mailing'
//             name='test-mailing'
//             onChange={this.handleChange}
//             placeholder='Post some lorem ipsum here'
//             required
//             value={this.state.feedback}
//             style={{ width: '100%', height: '150px' }}
//           />
//         </div>
//         <input
//           type='button'
//           value='Submit'
//           className='btn btn--submit'
//           onClick={this.handleSubmit}
//         />
//       </form>
//     );
//   }
// }

import React from 'react';
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';
init('user_Vnt5CGWFKgRtdRwXKCs6v');
//import Swal from 'sweetalert2';

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
    console.log('props', this.props);
    console.log('id', this.scrapbookId);
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
          </div>
        </div>

        <input type='submit' value='Submit' className='btn btn-outline-light' />
      </form>
    );
  }
}

export default Form;
