import {
  NextFunction,
  Request,
  Response,
} from 'express';

import Set from '../models/Set';
import { SetState } from '../types/domain/inteface/set';

/**
 * @swagger
 * /sets:
 *   post:
 *     summary: Create Set.
 *     tags: [Set]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: title
 *         description: Title
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: definition
 *         description: Definition
 *         schema:
 *           type: string
 *       - in: body
 *         name: state
 *         description: State
 *         schema:
 *           type: '#/definitions/SetState'
 *     responses:
 *       200:
 *         description: set
 *         schema:
 *           $ref: '#/definitions/Set'
 *       500:
 *         description: errors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/GeneralError'
 */
export const createSet = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(500).json({
      errors: [
        {
          location: 'account',
          param: 'error',
          msg: 'Account is not logged in.',
        },
      ],
    });
  }

  const set = new Set();
  set.title = req.body.title;
  set.description = req.body.description || '';
  set.state = req.body.state || SetState.Public;
  set.owner = req.user;

  set.save((err: any) => {
    if (err) {
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });
};

/**
 * @swagger
 * /sets:
 *   get:
 *     summary: Read Set.
 *     tags: [Set]
 *     responses:
 *       200:
 *         description: set
 *         schema:
 *           $ref: '#/definitions/Set'
 *       500:
 *         description: errors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/GeneralError'
 */
export const readSet = (req: Request, res: Response, next: NextFunction) => {
  return Set
    .find(
      {},
      {
        _id: true,
        owner: true,
        cards: true,
        state: true,
        title: true,
        definition: true,
      })
    .populate('owner', 'email profile')
    .exec((err: any, sets) => {
      if (err) {
        return res.status(500).send({
          errors: [
            {
              location: 'set',
              param: 'error',
              msg: 'Sets Read error.',
            },
          ],
        });
      }
      res.json(sets);
    });
};
