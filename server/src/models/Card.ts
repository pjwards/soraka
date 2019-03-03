import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {CardInterface} from '../types/domain/inteface/card';

export type CardModel = Aggregate<CardInterface> &
    Document &
    Query<CardInterface> &
    Model<Document> &
    CardInterface;

const cardSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'user'},
    word: {type: Schema.Types.ObjectId, ref: 'definition'},
    meanings: [{type: Schema.Types.ObjectId, ref: 'definition'}],
}, {timestamps: true});


const Card: Model<CardModel> = model('Card', cardSchema);
export default Card;
