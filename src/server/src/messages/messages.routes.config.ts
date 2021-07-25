import express from 'express';

import { CommonRoutesConfig } from '../common/common.routes.config';

export class MessagesRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MessagesRoutes');
  }

  configureRoutes() {
    this.app
      .route('/users/:userId')
      .all((req, res, next) => {
        next();
      })
      .get((req, res) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req, res) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch((req, res) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete((req, res) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });

    return this.app;
  }
}
