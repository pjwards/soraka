import mongoose from 'mongoose';
import {SetInterface} from "../types/domain/inteface/set";

export type SetModel = mongoose.Document & SetInterface;

const setSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'card'}],
    state: String,
    title: String,
    definition: String,
}, { timestamps: true });


const Set = mongoose.model('Card', setSchema);
export default Set;