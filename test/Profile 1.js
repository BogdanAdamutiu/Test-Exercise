'use strict';

const assert = require('assert');
const action = require('../Global/commonActions')();
require('dotenv').config();

const Messages = {
    FirstName: 'Tester1',
    LastName: 'Testing',
    PostCode: '8225 HJ',
    City: 'Lelystad',
    Birthdate: '10-10-1958',
    Street: 'Kamp',
    HouseNumber: '54',
};

const Profile = {
    Username: '#login-form-email > input',
    Password: '#Password',
    Login: '#doLogin',
    User: '#profile-picture-row > div.profileAvatar > div > span',
    Email: '#Email',
    FirstName: '#FirstName',
    LastName: '#LastName',
    PostCode: '#ZipCode',
    City: '#City',
    Birthdate: '#content-container > div > form > div:nth-child(14)',
    Street: '#Street',
    HouseNumber: '#StreetNumber',
};


describe('Profile functionality ', () => {

    it('User can see his personal data', () => {
        action.Login(process.env.profileUrl, 'test@test.com', '8cH9Te75uuczBAV');
        assert.strictEqual(action.CreateSelector(Profile.FirstName).getValue(), Messages.FirstName);
        assert.strictEqual(action.CreateSelector(Profile.LastName).getValue(), Messages.LastName);
        assert.strictEqual(action.CreateSelector(Profile.PostCode).getValue(), Messages.PostCode);
        assert.strictEqual(action.CreateSelector(Profile.City).getValue(), Messages.City);
        assert(action.CreateSelector(Profile.Birthdate).getText().includes(Messages.Birthdate));
        assert.strictEqual(action.CreateSelector(Profile.Street).getValue(), Messages.Street);
        assert.strictEqual(action.CreateSelector(Profile.HouseNumber).getValue(), Messages.HouseNumber);
    });

});