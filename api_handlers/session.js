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

// Store a single session
const _session = new Map();

// Helper functions
const createSession = userName => {

    return new Promise((resolve, reject) => {

        let existingSession = _session.get('session');

        if (!!existingSession) {
            
            let sessionData = Object.assign({userName}, existingSession);
            
            resolve(Object.assign({userName}, existingSession));
            
        } else {
            
            opentok.createSession(function(err, session) {
                if (err) {
                    reject(err);
                }

                let sessionData = {
                    apiKey: H.get(['ot', 'apiKey'], session),
                    session: H.get('sessionId', session),
                };
                
                _session.set('session', sessionData);
                
                resolve(Object.assign({userName}, sessionData));

            });
            
        }
    });
};

const createToken = sessionData => {
    
    let expireTime = (Date.now() / 1000 | 0) + (60 * 60 * 24 * 30);
    let role = 'publisher';

    let session = H.get('session', sessionData);
    let apiKey = H.get('apiKey', sessionData);
    let data = H.get('userName', sessionData); // Chat widget uses token's data attribute to set user's name

    let token = opentok.generateToken(session, {
        role,
        expireTime,
        data
    });
    
    return {
        session,
        apiKey,
        token
    };

};

exports.createToken = (req, res, next) => {
    
    let userName = H.get(['body', 'name'], req);
    
    createSession(userName)
        .then(session => {
            res.json(createToken(session));
        }, err => {
            res.status(500).send('Error occurred in generating token');
        });
};