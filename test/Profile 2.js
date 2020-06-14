'use strict';

const assert = require('assert');
const action = require('../Global/commonActions')();
require('dotenv').config();

const Messages = {
    InitialFirstName: 'Tester1',
    InitialLastName: 'Testing',
    InitialPostCode: '8225 HJ',
    InitialCity: 'Lelystad',
    InitialStreet: 'Kamp',
    InitialHouseNumber: '54',
    NewFirstName: 'Marius',
    NewLastName: 'Dragan',
    NewPostCode: '1011 AC',
    NewCity: 'Amsterdam',
    NewStreet: 'De Ruijterkade',
    NewHouseNumber: '23'
};

const Profile = {
    FirstName: '#FirstName',
    LastName: '#LastName',
    PostCode: '#ZipCode',
    City: '#City',
    Street: '#Street',
    HouseNumber: '#StreetNumber',
    Save: '#content-container > div > form > div:nth-child(21) > button',
};


describe('Profile functionality ', () => {

    it('User can change contact information', () => {
        action.Login(process.env.profileUrl, '2testing@test.com', '8cH9Te75uuczBAV');
        action.SetProfileData(Messages.NewFirstName, Messages.NewLastName, Messages.NewPostCode, Messages.NewCity, Messages.NewStreet, Messages.NewHouseNumber, "8cH9Te75uuczBAV");
        action.Click(Profile.Save);
        browser.pause(1500);
        action.LogoutAndLogin("2testing@test.com", "8cH9Te75uuczBAV");
        browser.pause(1000);
        assert.strictEqual(action.CreateSelector(Profile.FirstName).getValue(), Messages.NewFirstName);
        assert.strictEqual(action.CreateSelector(Profile.LastName).getValue(), Messages.NewLastName);
        assert.strictEqual(action.CreateSelector(Profile.PostCode).getValue(), Messages.NewPostCode);
        assert.strictEqual(action.CreateSelector(Profile.City).getValue(), Messages.NewCity);
        assert.strictEqual(action.CreateSelector(Profile.Street).getValue(), Messages.NewStreet);
        assert.strictEqual(action.CreateSelector(Profile.HouseNumber).getValue(), Messages.NewHouseNumber);

        //Set back to initial values
        action.SetProfileData(Messages.InitialFirstName, Messages.InitialLastName, Messages.InitialPostCode, Messages.InitialCity, Messages.InitialStreet, Messages.InitialHouseNumber, "8cH9Te75uuczBAV");
        action.Click(Profile.Save);
        browser.closeWindow();
    });

});



