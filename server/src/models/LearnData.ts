import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {LearnDataInterface} from '../types/domain/inteface/learnData';

export type LearnDataModel = Aggregate<LearnDataInterface> &
    Document &
    Query<LearnDataInterface> &
    Model<Document> &
    LearnDataInterface;

const learnDataSchema: Schema = new Schema({
    lastLearningDate: Date,
    learnCount: Number,
    correctCount: Number,
    incorrectCount: Number,
    favorite: Boolean,
}, {timestamps: true});


const LearnData: Model<LearnDataModel> = model('LearnData', learnDataSchema);
export default LearnData;
