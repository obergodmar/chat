import express from 'express';
import { v4 } from 'uuid';

import { CommonRoutesConfig } from '../common/common.routes.config';

export class SessionRoutes extends CommonRoutesConfig {
  sessionId: string;

  connections: string[];

  connectionsStatus: { [key: string]: string };

  sessionTimeout: NodeJS.Timeout;

  partnersTimeout: { [key: string]: NodeJS.Timeout };

  messages: { username: string; text: string; id: string }[];

  constructor(app: express.Application) {
    super(app, 'SessionRoutes');

    this.sessionId = '';

    this.connections = [];

    this.partnersTimeout = {};

    this.connectionsStatus = {};

    this.messages = [];
  }

  clearSession() {
    this.sessionId = '';

    this.connections = [];

    this.partnersTimeout = {};

    this.connectionsStatus = {};

    this.messages = [];

    console.log('Session was cleared');
  }

  configureRoutes() {
    this.app.route('/username').post((req, res) => {
      const { username } = req.body;

      if (!username) {
        res.status(200).send({ error: 'Username is empty' });
        return;
      }

      if (this.connectionsStatus[username] === 'active') {
        res.status(200).send({ error: 'Already logged in' });
        return;
      }

      if (
        this.connections.length >= 2 &&
        !this.connections.includes(username)
      ) {
        res.status(200).send({ error: 'Session is full' });
        return;
      }

      if (!this.connections.includes(username)) {
        this.connections.push(username);

        this.connectionsStatus[username] = 'active';
      }

      if (!this.sessionId) {
        [this.sessionId] = v4().split('-');
      }

      res.status(200).send({
        sessionId: this.sessionId,
      });
    });

    this.app.route('/check').post((req, res) => {
      const { username } = req.body;
      const partnerName =
        this.connections.find((name) => name !== username) || '';

      const partner = {
        name: partnerName,
        status: this.connectionsStatus[partnerName],
      };

      res.status(200).send({ partner, messages: this.messages });

      this.checkSession();

      this.checkStatus(username);
    });

    this.app.route('/message').post((req, res) => {
      const { username, text } = req.body;

      this.messages.push({ username, text, id: v4() });

      res.status(200).end();
    });

    return this.app;
  }

  checkSession() {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }
    this.sessionTimeout = setTimeout(() => {
      this.clearSession();
    }, 10000);
  }

  checkStatus(name: string) {
    if (name === '') {
      return;
    }

    if (this.partnersTimeout[name]) {
      clearTimeout(this.partnersTimeout[name]);

      this.connectionsStatus[name] = 'active';
    }
    this.partnersTimeout[name] = setTimeout(() => {
      this.disconnectPartner(name);
    }, 3000);
  }

  disconnectPartner(name: string) {
    this.connectionsStatus[name] = 'disconnected';
  }
}
