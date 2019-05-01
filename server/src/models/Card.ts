import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {CardInterface} from '../types/domain/inteface/card';

export type CardModel = Aggregate<CardInterface> &
    Document &
    Query<CardInterface> &
    Model<Document> &
    CardInterface;

/**
 * @swagger
 * tags:
 *   name: Card
 *   description: Card Model
 * definitions:
 *   Card:
 *     type: object
 *     required:
 *        - owner
 *        - word
 *     properties:
 *       owner:
 *         type: User
 *         description: User Object
 *       word:
 *         type: Definition
 *         description: Meaning Object
 *       meanings:
 *         type: Definition
 *         description: Meaning Objects
 */
const cardSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    word: {type: Schema.Types.ObjectId, ref: 'Definition'},
    meanings: [{type: Schema.Types.ObjectId, ref: 'Definition'}],
}, {timestamps: true});


const Card: Model<CardModel> = model('Card', cardSchema);
export default Card;
