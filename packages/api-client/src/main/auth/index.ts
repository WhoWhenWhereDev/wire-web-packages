//
// Wire
// Copyright (C) 2017 Wire Swiss GmbH
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see http://www.gnu.org/licenses/.
//

import AccessTokenData from './AccessTokenData';
import AccessTokenStore from './AccessTokenStore';
import AuthAPI from './AuthAPI';
import ClientPreKey from './ClientPreKey';
import Context from './Context';
import LoginData from './LoginData';
import PreKey from './PreKey';
import PreKeyBundle from './PreKeyBundle';
import RegisterData from './RegisterData';

const AUTH_ACCESS_TOKEN_KEY: string = 'access-token';
const AUTH_COOKIE_KEY: string = 'cookie';
const AUTH_TABLE_NAME: string = 'authentication';

export {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_COOKIE_KEY,
  AUTH_TABLE_NAME,
  AccessTokenData,
  AccessTokenStore,
  AuthAPI,
  ClientPreKey,
  Context,
  LoginData,
  PreKey,
  PreKeyBundle,
  RegisterData,
};
