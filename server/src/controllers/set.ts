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
 *         description: Description
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

  set.save((err: any, set: any) => {
    if (err) {
      return res.status(500).json({
        errors: [
          {
            location: 'set',
            param: 'error',
            msg: 'Create Set error',
          },
        ],
      });
    }

    res.json(set);
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
        description: true,
      })
    .populate('owner', 'email profile')
    .exec((err: any, sets: any[]) => {
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

/**
 * @swagger
 * /sets/:id/:
 *   patch:
 *     summary: Update Set.
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
export const updateSet = (req: Request, res: Response, next: NextFunction) => {

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

  if (!req.params.id) {
    return res.status(500).json({
      errors: [
        {
          location: 'sets',
          param: 'error',
          msg: 'Can not find Set ID',
        },
      ],
    });
  }

  Set.findOneAndUpdate(
    { _id: req.params.id, owner: req.user },
    {
      title: req.body.title,
      state: req.body.state,
      description: req.body.description,
    },
    (err: any, set: any) => {
      if (err) {
        return res.status(500).json({
          errors: [
            {
              location: 'set',
              param: 'error',
              msg: 'Update Set error',
            },
          ],
        });
      }

      Set
        .findOne(
          { _id: (set as any)._id },
          {
            _id: true,
            owner: true,
            cards: true,
            state: true,
            title: true,
            description: true,
          })
        .populate('owner', 'email profile')
        .exec((err: any, set: any) => {
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
          res.json(set);
        });
    },
  );
};

/**
 * @swagger
 * /sets/:id/:
 *   delete:
 *     summary: Delete Set.
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
export const deleteSet = (req: Request, res: Response, next: NextFunction) => {
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

  if (!req.params.id) {
    return res.status(500).json({
      errors: [
        {
          location: 'sets',
          param: 'error',
          msg: 'Can not find Set ID',
        },
      ],
    });
  }

  Set.findOneAndDelete(
    { _id: req.params.id, owner: req.user },
    (err: any) => {
      if (err) {
        return res.status(500).json({
          errors: [
            {
              location: 'set',
              param: 'error',
              msg: 'Update Set error',
            },
          ],
        });
      }

      res.json(true);
    },
  );
};

