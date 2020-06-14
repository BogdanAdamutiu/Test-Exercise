'use strict';

const assert = require('assert');
const action = require('../Global/commonActions')();
require('dotenv').config();

const Profile = {
    Save: '#content-container > div > form > div:nth-child(21) > button',
};


describe('Profile functionality ', () => {
    //This one fails because the email address is not changing so there is a bug.
    //Checked it manually and the new email address is only saved after second try
    //Yet you can't login with the new email address, you still login with the old one
    it('User can change email address', () => {
        action.Login(process.env.profileUrl, 'test@test.com', '8cH9Te75uuczBAV');
        action.ChangeEmail("btest@test.com", "8cH9Te75uuczBAV");
        action.Click(Profile.Save);
        browser.pause(1500);
        action.LogoutAndLogin("btest@test.com", "8cH9Te75uuczBAV");

        //change password to initial one
        action.ChangeEmail("test@test.com", "8cH9Te75uuczBAV");
        action.Click(Profile.Save);
        browser.pause(1500);
    });

});



