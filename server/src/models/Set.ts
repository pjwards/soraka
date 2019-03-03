import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {SetInterface} from '../types/domain/inteface/set';

export type SetModel = Aggregate<SetInterface> &
    Document &
    Query<SetInterface> &
    Model<Document> &
    SetInterface;

const setSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'user'},
    cards: [{type: Schema.Types.ObjectId, ref: 'card'}],
    state: String,
    title: String,
    definition: String,
}, {timestamps: true});


const Set: Model<SetModel> = model('Card', setSchema);
export default Set;
