/*
 * Wire
 * Copyright (C) 2016 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

'use strict';

const CBOR = require('wire-webapp-cbor');

const ClassUtil = require('../util/ClassUtil');
const DontCallConstructor = require('../errors/DontCallConstructor');
const TypeUtil = require('../util/TypeUtil');

const ChainKey = require('./ChainKey');
const CipherKey = require('../derived/CipherKey');
const DerivedSecrets = require('../derived/DerivedSecrets');
const KeyPair = require('../keys/KeyPair');
const PublicKey = require('../keys/PublicKey');

/** @module session */

/**
 * @class RootKey
 * @throws {DontCallConstructor}
 */
class RootKey {
  constructor() {
    throw new DontCallConstructor(this);
  }

  /**
   * @param {!derived.CipherKey} cipher_key - Cipher key generated by derived secrets
   * @returns {RootKey}
   */
  static from_cipher_key(cipher_key) {
    TypeUtil.assert_is_instance(CipherKey, cipher_key);

    const rk = ClassUtil.new_instance(RootKey);
    rk.key = cipher_key;
    return rk;
  }

  /**
   * @param {!keys.KeyPair} ours - Our key pair
   * @param {!keys.PublicKey} theirs - Their public key
   * @returns {Array<RootKey|session.ChainKey>}
   */
  dh_ratchet(ours, theirs) {
    TypeUtil.assert_is_instance(KeyPair, ours);
    TypeUtil.assert_is_instance(PublicKey, theirs);

    const secret = ours.secret_key.shared_secret(theirs);
    const derived_secrets = DerivedSecrets.kdf(secret, this.key.key, 'dh_ratchet');

    return [
      RootKey.from_cipher_key(derived_secrets.cipher_key),
      ChainKey.from_mac_key(derived_secrets.mac_key, 0),
    ];
  }

  /**
   * @param {!CBOR.Encoder} e
   * @returns {CBOR.Encoder}
   */
  encode(e) {
    e.object(1);
    e.u8(0);
    return this.key.encode(e);
  }

  /**
   * @param {!CBOR.Decoder} d
   * @returns {RootKey}
   */
  static decode(d) {
    TypeUtil.assert_is_instance(CBOR.Decoder, d);

    let cipher_key = null;

    const nprops = d.object();
    for (let i = 0; i <= nprops - 1; i++) {
      switch (d.u8()) {
        case 0:
          cipher_key = CipherKey.decode(d);
          break;
        default:
          d.skip();
      }
    }
    return RootKey.from_cipher_key(cipher_key);
  }
}

module.exports = RootKey;
