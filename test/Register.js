'use strict';

const assert = require('assert');
const action = require('../Global/commonActions')();
require('dotenv').config();

var GoodCodes = ['LIKOM5', 'P7ZAPH', '5W5XWN', 'VCR651', 'TC90AF', '4XR8JW'];
var UsedCodes = ['4Z2W9X', 'PCQFM8', '15EOAA', '3GTN9F'];
var Password = "8cH9Te75uuczBAV";

const Messages = {
    WarningNotAtLocation: 'We\'re sorry. We currently have a sufficient number of Roamlers at your location. Check Facebook and/or Twitter to see whether there are Roamlers who have an invite available for you. Good luck!',
    ErrorBadCode: 'Activation code incorrect',
    AccountCreated: 'Your registration was successful.',
    ErrorFirstName: 'Firstname is too short.',
    ErrorLastName: 'Lastname is too short.',
    ErrorEmailAddress: 'Email is invalid',
    ErrorPostCode: 'Areacode required',
    ErrorCity: 'City is invalid',
    ErrorBirthdate: 'Birthdate is mandatory',
    ErrorStreet: 'Street is mandatory',
    ErrorStreetNumber: 'Streetnumber is mandatory',
    ErrorPassword: 'Password required',
    ErrorConfirmPassword: 'Password must contain at least 6 characters'
};

const Register = {
    Yes: '#page-content > div > form > div:nth-child(1) > button',
    No: '#page-content > div > form > div:nth-child(2) > button',
    GoBack: '#check-location-back > a',
    NotNeededAtLocation: '#NotInWhiteSpot',
    ActivationCode: '#Data_ActivationCode',
    Activate: '#page-content > div > form > div.row.btn-rml > button',
    BadActivationCode: '#page-content > div > form > div.row.text-input-rml > span',
    Country: '#Data_CountryId',
    Next: '#page-content > div > form > div.row.btn-rml > button',
    FirstName: '#Data_Firstname',
    LastName: '#Data_Lastname',
    EmailAddress: '#Data_Email',
    PostalCode: '#Data_Areacode',
    City: '#Data_CityName',
    Street: '#Data_Street',
    HouseNumber: '#Data_StreetNumber',
    NewsletterSubscribe: '#Data_IsSubscribedToNewsletter',
    Password: '#Data_Password',
    ConfirmPassword: '#Data_PasswordMatch',
    NextDetails: '#page-content > div > form > div.row.btn-rml.last-row > button',
    ErrorFirstName: '#page-content > div > form > div:nth-child(1) > span',
    ErrorLastName: '#page-content > div > form > div:nth-child(2) > span',
    ErrorEmail: '#page-content > div > form > div:nth-child(3) > span',
    ErrorPostalCode: '#page-content > div > form > div:nth-child(4) > span',
    ErrorCity: '#page-content > div > form > div:nth-child(5) > span',
    ErrorDOB: '#page-content > div > form > div:nth-child(6) > span',
    ErrorStreet: '#page-content > div > form > div:nth-child(7) > span',
    ErrorStreetNumber: '#page-content > div > form > div:nth-child(8) > span',
    ErrorPassword: '#page-content > div > form > div:nth-child(11) > span:nth-child(4)',
    ErrorConfirmPassword: '#page-content > div > form > div:nth-child(12) > span',
    ExtraLanguage: '#AvailableLanguages',
    AddExtraLanguage: '#Button_AvailableLanguages',
    Register: '#page-content > div > form > div:nth-child(5) > input[type=submit]',
    AcceptLaws: '#submitButton',
    AgreeTerms: "#agreedWithTerms",
    AgreePolicy: '#agreedWithPrivacyPolicy',
    AccountCreated: "#page-content > div > div:nth-child(1)"
};

const Account = {
    Username: '#login-form-email > input',
    Password: '#Password',
    Login: '#doLogin',
    NewUser: '#profile-picture-row > div.profileAvatar > div > span'
};


describe('Registration functionality ', () => {

    it('A user can register using a valid code and correct data. User can login in new account', () => {
        const User = Math.floor(Math.random() * 11) + "testing@test.com";
        const FirstName = "Bogdan" + Math.floor(Math.random() * 11);
        const LastName = "Adamutiu" + Math.floor(Math.random() * 11);
        var code = GoodCodes[Math.floor(Math.random() * GoodCodes.length)];
        GoodCodes.splice(code, 1);
        UsedCodes.push(code);
        console.log("The code used was " + code);

        browser.setWindowSize(parseInt(process.env.windowWidth), parseInt(process.env.windowHeight));
        browser.url(process.env.registerUrl);
        action.Click(Register.Yes);
        action.CreateSelector(Register.ActivationCode).setValue(code);
        action.Click(Register.Activate);
        action.SetCountry(Register.Country, "Netherlands");
        action.Click(Register.Next);
        action.CreateSelector(Register.FirstName).setValue(FirstName);
        action.CreateSelector(Register.LastName).setValue(LastName);
        action.CreateSelector(Register.EmailAddress).setValue(User);
        action.CreateSelector(Register.PostalCode).setValue("8225 HJ");
        action.CreateSelector(Register.City).setValue("Lelystad");
        browser.execute('$(\'#Data_BirthDateYear\').val(1985)');
        browser.execute('$(\'#Data_BirthDateMonth\').val(10)');
        browser.execute('$(\'#Data_BirthDateDay\').val(14)');
        action.CreateSelector(Register.Street).setValue("Kamp");
        action.CreateSelector(Register.HouseNumber).setValue("12");
        action.CreateSelector(Register.Password).setValue(Password);
        action.CreateSelector(Register.ConfirmPassword).setValue(Password);
        action.Click(Register.NextDetails);
        browser.execute('$(\'#AvailableLanguages\').val(9)');
        action.Click(Register.AddExtraLanguage);
        action.Click(Register.Register);
        browser.pause(1000);
        action.Click(Register.AcceptLaws);
        browser.pause(1000);
        action.Click(Register.AgreeTerms);
        action.Click(Register.AgreePolicy);
        browser.pause(1000);
        action.Click(Register.AcceptLaws);
        browser.pause(1000);
        assert.strictEqual(action.CreateSelector(Register.AccountCreated).getText(), Messages.AccountCreated);
        browser.pause(1000);
        browser.url(process.env.accountUrl);
        action.CreateSelector(Account.Username).setValue(User);
        action.CreateSelector(Account.Password).setValue(Password);
        action.Click(Account.Login);
        browser.pause(1500);
        assert(action.CreateSelector(Account.NewUser).getText().includes(FirstName + LastName));
    });

    it('An error message should appear when no info is provided in the registration form', () => {
        var code = GoodCodes[Math.floor(Math.random() * GoodCodes.length)];

        browser.setWindowSize(parseInt(process.env.windowWidth), parseInt(process.env.windowHeight));
        browser.url(process.env.registerUrl);
        action.Click(Register.Yes);
        action.CreateSelector(Register.ActivationCode).setValue(code);
        action.Click(Register.Activate);
        action.SetCountry(Register.Country, "Netherlands");
        action.Click(Register.Next);
        action.Click(Register.NextDetails);
        browser.pause(1000);
        assert.strictEqual(action.CreateSelector(Register.ErrorFirstName).getText(), Messages.ErrorFirstName);
        assert.strictEqual(action.CreateSelector(Register.ErrorLastName).getText(), Messages.ErrorLastName);
        assert.strictEqual(action.CreateSelector(Register.ErrorEmail).getText(), Messages.ErrorEmailAddress);
        assert.strictEqual(action.CreateSelector(Register.ErrorPostalCode).getText(), Messages.ErrorPostCode);
        assert.strictEqual(action.CreateSelector(Register.ErrorCity).getText(), Messages.ErrorCity);
        assert.strictEqual(action.CreateSelector(Register.ErrorDOB).getText(), Messages.ErrorBirthdate);
        assert.strictEqual(action.CreateSelector(Register.ErrorStreet).getText(), Messages.ErrorStreet);
        assert.strictEqual(action.CreateSelector(Register.ErrorStreetNumber).getText(), Messages.ErrorStreetNumber);
        assert.strictEqual(action.CreateSelector(Register.ErrorPassword).getText(), Messages.ErrorPassword);
        assert.strictEqual(action.CreateSelector(Register.ErrorConfirmPassword).getText(), Messages.ErrorConfirmPassword);
    });

    it('A message appears if users from Netherlands try to register without code', () => {
        browser.setWindowSize(parseInt(process.env.windowWidth), parseInt(process.env.windowHeight));
        browser.url(process.env.registerUrl);
        action.Click(Register.No);
        browser.pause(1000);
        assert.strictEqual(action.CreateSelector(Register.NotNeededAtLocation).getText(), Messages.WarningNotAtLocation);
    });

    it('An error message should appear when no code is provided', () => {
        browser.setWindowSize(parseInt(process.env.windowWidth), parseInt(process.env.windowHeight));
        browser.url(process.env.registerUrl);
        action.Click(Register.Yes);
        action.Click(Register.Activate);
        assert.strictEqual(action.CreateSelector(Register.BadActivationCode).getText(), Messages.ErrorBadCode);
    });

    it('An error message should appear when an already used code is provided', () => {
        var code = UsedCodes[Math.floor(Math.random() * UsedCodes.length)];

        browser.setWindowSize(parseInt(process.env.windowWidth), parseInt(process.env.windowHeight));
        browser.url(process.env.registerUrl);
        action.Click(Register.Yes);
        action.CreateSelector(Register.ActivationCode).setValue(code);
        action.Click(Register.Activate);
        assert.strictEqual(action.CreateSelector(Register.BadActivationCode).getText(), Messages.ErrorBadCode);
    });

});