'use strict';

const assert = require('assert');
const action = require('../Global/commonActions')();
require('dotenv').config();

const Account = {
    User: '#profile-picture-row > div.profileAvatar > div > span',
};


describe('Account functionality ', () => {

   it('User can login into account with valid username and password', () => {
       action.Login(process.env.accountUrl, 'test3@test.com', '9nRrhBTp6Rjj5wH');
       assert(action.CreateSelector(Account.User).getText().includes('Tester2 Testing'));
   });

});