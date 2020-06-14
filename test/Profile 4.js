'use strict';

const assert = require('assert');
const action = require('../Global/commonActions')();
require('dotenv').config();

const Profile = {
    Save: '#content-container > div > form > div:nth-child(21) > button',
    Error: '#content-container > div > form > div:nth-child(20) > span'
};

const Messages = {
    NewFirstName: 'Marius',
    NewLastName: 'Dragan',
    NewPostCode: '1011 AC',
    NewCity: 'Amsterdam',
    NewStreet: 'De Ruijterkade',
    NewHouseNumber: '23'
};


describe('Profile functionality ', () => {

    it('User can\'t  change anything in profile if he doesn\t provide the correct current passprd', () => {
        action.Login(process.env.profileUrl, 'test@test.com', '8cH9Te75uuczBAV');
        action.ChangePassword("Q7h859LfpWBwMCy", "8cH9Te75uuczBA");
        action.Click(Profile.Save);
        browser.pause(1500);
        assert.strictEqual(action.CreateSelector(Profile.Error).getText(), "Het wachtwoord is niet correct.");

        action.SetProfileData(Messages.NewFirstName, Messages.NewLastName, Messages.NewPostCode, Messages.NewCity, Messages.NewStreet, Messages.NewHouseNumber, "8cH9Te75uu");
        action.Click(Profile.Save);
        browser.pause(1500);
        assert.strictEqual(action.CreateSelector(Profile.Error).getText(), "Het wachtwoord is niet correct.");
    });

});



