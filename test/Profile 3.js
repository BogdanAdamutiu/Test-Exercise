'use strict';

const assert = require('assert');
const action = require('../Global/commonActions')();
require('dotenv').config();

const Profile = {
    Save: '#content-container > div > form > div:nth-child(21) > button',
};


describe('Profile functionality ', () => {

    it('User can change password', () => {
        action.Login(process.env.profileUrl, 'test@test.com', '8cH9Te75uuczBAV');
        action.ChangePassword("Q7h859LfpWBwMCy", "8cH9Te75uuczBAV");
        action.Click(Profile.Save);
        browser.pause(1500);
        action.LogoutAndLogin("test@test.com", "Q7h859LfpWBwMCy");

        //change password to initial one
        action.ChangePassword("8cH9Te75uuczBAV", "Q7h859LfpWBwMCy");
        action.Click(Profile.Save);
        browser.pause(1500);
    });

});



