'use strict';
require('dotenv').config();

const Selector = {
    NewPassword: '#NewPassword',
    ConfirmPassword: '#NewPasswordVerification',
    Email: '#Email',
    FirstName: '#FirstName',
    LastName: '#LastName',
    PostCode: '#ZipCode',
    City: '#City',
    Street: '#Street',
    HouseNumber: '#StreetNumber',
    CurrentPassword: '//*[@id="PassWord"]',
    Username: '#login-form-email > input',
    Password: '#Password',
    Login: '#doLogin',
    Extra: '#rml-navbar-collapse > ul > li.dropdown > a',
    Logout: '#rml-navbar-collapse > ul > li.dropdown.open > ul > li:nth-child(5) > a'
};

class CommonActions {

    Login(url, user, password) {
        browser.setWindowSize(parseInt(process.env.windowWidth), parseInt(process.env.windowHeight));
        browser.url(url);
        this.CreateSelector(Selector.Username).setValue(user);
        this.CreateSelector(Selector.Password).setValue(password);
        this.Click(Selector.Login);
        browser.pause(1000);
    }

    Click(selector) {
        const completeSelector = $(selector);
        completeSelector.click();
    }

    CreateSelector(selector) {
        return $(selector);
    }

    SetCountry(selector, country) {
        const completeSelector = $(selector);
        if(country == "Netherlands") {
            completeSelector.selectByAttribute('value', '1');
        }
        else if(country == "UK") {
            completeSelector.selectByAttribute('value', '2');
        }
    }

    SetProfileData(firstName, lastName, postalCode, city, street, houseNumber, password) {
        this.CreateSelector(Selector.FirstName).setValue(firstName);
        this.CreateSelector(Selector.LastName).setValue(lastName);
        this.CreateSelector(Selector.PostCode).setValue(postalCode);
        this.CreateSelector(Selector.City).setValue(city);
        this.CreateSelector(Selector.Street).setValue(street);
        this.CreateSelector(Selector.HouseNumber).setValue(houseNumber);
        this.CreateSelector(Selector.CurrentPassword).setValue(password);
    }

    ChangePassword(newPassword, currentPassword) {
        this.CreateSelector(Selector.NewPassword).setValue(newPassword);
        this.CreateSelector(Selector.ConfirmPassword).setValue(newPassword);
        this.CreateSelector(Selector.CurrentPassword).setValue(currentPassword);
    }

    ChangeEmail(newEmail, currentPassword) {
        this.CreateSelector(Selector.Email).setValue(newEmail);
        this.CreateSelector(Selector.CurrentPassword).setValue(currentPassword);
    }

    LogoutAndLogin(user, password) {
        this.Click(Selector.Extra);
        browser.pause(300);
        this.Click(Selector.Logout);
        browser.pause(1000);
        browser.url(process.env.profileUrl);
        this.CreateSelector(Selector.Username).setValue(user);
        this.CreateSelector(Selector.Password).setValue(password);
        this.Click(Selector.Login);
        browser.pause(1000);
    }

}

module.exports = () => new CommonActions();