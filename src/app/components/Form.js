import React from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
//import { init } from 'emailjs-com';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      name: '',
      fromName: '',
      email: '',
      scarpbookId: '',
    };
  }

  //component did mount
  componentDidMount() {
    console.log('scrapbookId', this.props.location.state.scrapbookId);
    this.setState({ scrapbookId: this.props.location.state.scrapbookId });
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

  fromNameChange = (event) => {
    this.setState({ fromName: event.target.value });
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
      fromName: this.state.fromName,
      link: `http://scrapplr.web.app/scrapbooks/${this.state.scrapbookId}/share`,
    });
  };

  //Custom EmailJS method
  sendFeedback = (templateId, variables) => {
    console.log(variables);
    console.log('state', this.state);
    console.log(templateId);
    emailjs
      .send(
        'service_w3gw5tr',
        templateId,
        variables,
        'user_Vnt5CGWFKgRtdRwXKCs6v'
      )
      .then((res) => {
        console.log('success', variables);
        this.setState({ feedback: '', name: '', fromName: '', email: '' });
      })
      // Email Failed to send Error alert
      .catch((err) => {
        console.log('oops!', err);
      });
  };

  render() {
    console.log('props', this.props);
    const scrapbookId = this.props.location.state.scrapbookId;
    console.log('id');
    // console.log('idcrap', this.props.params);
    return (
      //Form layout that requires a Name, Email, and message
      <form className='test-mailing' onSubmit={this.handleSubmit}>
        <br />
        <div style={{ fontSize: '1.2rem' }}>
          <h6>Send me an email directly from here</h6>
          <div>
            <label htmlFor='name'>To</label>
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
            <label htmlFor='forName'>From</label>
            <input
              className='form-control email-inputs'
              name='from_name'
              type='text'
              id='name'
              onChange={this.fromNameChange}
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
          <div>
            <label htmlFor='link'>Link</label>
            <input
              className='form-control email-inputs'
              name='link'
              type='text'
              id='link'
              placeholder='no need to fill in'
            />
          </div>
          <label htmlFor='message'>Message</label>
          <div>
            <textarea
              id='message'
              name='message'
              onChange={this.messageChange}
              placeholder='type your message here'
              required
              className='email-text-area form-control'
              rows='15'
              cols='20'
            ></textarea>
          </div>
        </div>

        <input type='submit' value='Submit' className='btn btn-outline-light' />
      </form>
    );
  }
}

export default Form;
