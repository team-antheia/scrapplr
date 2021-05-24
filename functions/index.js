//FUNCTIONS GO IN HRE...WERE THINKING OF NOT HAVING TO USE FIREBASE...MAKES SENSE  PART OF THE INFO IS COMING FROM SCRAPBOOKVIW..
//USER CREATES SCRAPBOOK=> USER WANTS TO SHARE SCRAPBOOK=>USER CLICKS FORM=> USER FILLS OUT FORM=> FILLS IN REQUIRD INCLUDING RECIPINTS EMAIL=> EMAIL SENT NEEDS SCRAPBOOK BEING SENT "/SCRAPBOOKS/SCRAPBOOKID" => can this be done in front end without firebase?
const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

const nodemailer = require('nodemailer');
var dotenv = require('dotenv');
dotenv.config({ path: '../configs/config.env' });

//when this cloud function is already deployed, change the origin to 'https://your-deployed-app-url
const cors = require('cors')({ origin: true });

//create and config transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    type: 'OAUTH2',
    user: process.env.GMAIL_USERNAME, //set these in your .env file
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    // accessToken: process.env.OAUTH_ACCESS_TOKEN,
    // user: process.env.GMAIL_USER,
    // pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//export the cloud function called `sendEmail`
exports.sendEmail = functions.https.onRequest((req, res) => {
  //for testing purposes
  console.log(
    'from sendEmail function. The request object is:',
    JSON.stringify(req.body)
  );

  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    //WILL THIS CHANGE AS WE WILL BE GETTING THIS INFO FROM STATE SOMEHOW?  OR from props?
    //CONSOLELOG IS SHOOWING UP WITH INFO
    const email = req.body.data.email;
    console.log('email', email);
    const name = req.body.data.name;
    const message = req.body.data.message;

    //config the email message
    const mailOptions = {
      //is this where the email will come from?
      from: email,
      to: 'fatsiet@gmail.com',
      subject: 'New message from the nodemailer-form app',
      text: `${name} says: ${message}`,
      //html: '<p>HTML version of the message</p>',
    };

    //call the built in `sendMail` function and return different responses upon success and failure
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        return res.status(500).send({
          data: {
            status: 500,
            message: error.toString(),
          },
        });
      }

      return res.status(200).send({
        data: {
          status: 200,
          message: 'sent',
        },
      });
    });
  });
});
