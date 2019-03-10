import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {SetInterface} from '../types/domain/inteface/set';

export type SetModel = Aggregate<SetInterface> &
    Document &
    Query<SetInterface> &
    Model<Document> &
    SetInterface;

/**
 * @swagger
 * tags:
 *   name: Set
 *   description: Set Model
 * definitions:
 *   Set:
 *     type: object
 *     required:
 *        - owner
 *        - state
 *        - title
 *     properties:
 *       owner:
 *         type: user
 *         description: User Object
 *       cards:
 *         type: card
 *         description : Card Objects
 *       state:
 *         type: string
 *         description: Private or Public set
 *       title:
 *         type: string
 *         description: Card title
 *       definition:
 *         type: string
 *         description: Card description
 *
 */
const setSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'user'},
    cards: [{type: Schema.Types.ObjectId, ref: 'card'}],
    state: String,
    title: String,
    definition: String,
}, {timestamps: true});


const Set: Model<SetModel> = model('Card', setSchema);
export default Set;
