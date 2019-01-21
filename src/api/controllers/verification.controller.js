var mjml2html = require('mjml');
var credentials = require('../../config/credentials');
var registrationTemplate = require('../../templates/email/registration');
var client = require('../../config/client');
var BulkMailer = require("../services/bulkEmail");
const User = require('../models/user.model');
var otpGenerator = require('otp-generator');

var bulkMailer = new BulkMailer({ transport: credentials.email, verbose: true });

var __mailerOptions = async (email, options) => {
  var companyLogo = client.logoUrl;
  // var verificationUrl = `${client.baseUrl}${client.verifyEmail}/${hash}`;
  const otp = otpGenerator.generate(4, { digits: true, specialChars: false, alphabets: false, upperCase: false });
  const message = await User.FindOneAndUpdate({ email }, { otp });
  var template = registrationTemplate(companyLogo, otp);
  var html = mjml2html(template);

  var mailOptions = options;
  mailOptions['html'] = html.html;
  mailOptions['text'] = 'Hi there!';
  mailOptions['from'] = credentials.email.auth.user;
  mailOptions['subject'] = 'Please verify your email';
  mailOptions['to'] = email;
  return mailOptions;
}

exports.sendVerificationEmail = async (email, options) => {
  var mailerOptions = await __mailerOptions(email, options);
  bulkMailer.send(mailerOptions, true, (error, result) => { // arg1: mailinfo, agr2: parallel mails, arg3: callback
    if (error) {
      console.error(error);
    } else {
      console.info(result);
    }
  });
}

exports.verifyUserEmail = async (req, res, next) => {
  const { uuid } = req.params;

  try {
    const message = await User.verifyEmail(uuid);
    return res.send(message);
  } catch (err) {
    return next(err);
  }
}

exports.verifyMobileOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    const message = await User.verifyMobileOtp(email, otp);
    return res.send(message);
  } catch(err) {
    return next(err);
  }
}