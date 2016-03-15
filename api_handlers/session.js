/*eslint-env es6*/
'use strict';

const H = require('hanuman-js');
const OpenTok = require('opentok');
const Promise = require('bluebird');

// Opentok
const apiAccess = {
    key: '45397062',
    secret: '1a3bee9140e9e13f591294134d0b16f3cd9e38d5'
};
const opentok = new OpenTok(apiAccess.key, apiAccess.secret);

// Helper functions

const generateCallback = (res, err) => {

    let status = err && err.status ? err.status : 500;
    let errorMessage = err && err.message ? err.messsage : 'An error occured';

    return {
        err: function(err) {
            res.status(status);
            res.send(`${errorMessage}: ${err}`);
        },
        success: function(data) {
            res.json(data);
        }
    };

};

// Session
const _session = new Map();

// Helper methods

const createSession = () => {

    return new Promise((resolve, reject) => {

        opentok.createSession(function(err, session) {
            if (err) {
                reject(err);
            }
            _session.set('session', session);
            
            let sessionData = {
                apiKey: H.get(['ot', 'apiKey'], session),
                session: H.get('sessionId', session)
            };
            
            resolve(sessionData);
        });

    });
};

const createToken = sessionData => {

    let expireTime = (Date.now() / 1000 | 0) + (60 * 60 * 24 * 30);
    let role = 'publisher';

    let session = H.get('session', sessionData);
    let apiKey = H.get('apiKey')(sessionData);

    let token = opentok.generateToken(session, {
        role,
        expireTime
    });

    return {
        session,
        apiKey,
        token
    };

};

exports.createToken = (req, res, next) => {

    createSession()
        .then(session => {
            res.json(createToken(session));
        }, err => {
            res.status(500).send('Error occurred in generating token');
        });
};