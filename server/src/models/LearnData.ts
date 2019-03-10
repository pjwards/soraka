import {Aggregate, Document, model, Model, Query, Schema} from 'mongoose';
import {LearnDataInterface} from '../types/domain/inteface/learnData';

export type LearnDataModel = Aggregate<LearnDataInterface> &
    Document &
    Query<LearnDataInterface> &
    Model<Document> &
    LearnDataInterface;

/**
 * @swagger
 * tags:
 *   name: LearnData
 *   description: LearnData Model
 * definitions:
 *   LearnData:
 *     type: object
 *     required:
 *        - lastLearningDate
 *        - learnCount
 *        - correctCount
 *        - incorrectCount
 *        - favorite
 *     properties:
 *       lastLearningDate:
 *         type: Date
 *         description: Last access date
 *       learnCount:
 *         type: Number
 *         description : Counts of Click
 *       correctCount:
 *         type: Number
 *         description: Number of word quiz pass
 *       incorrectCount:
 *         type: Number
 *         description: Number of word quiz failures
 *       favorite:
 *         type: Boolean
 *         description: User-preferred words
 */
const learnDataSchema: Schema = new Schema({
    lastLearningDate: Date,
    learnCount: Number,
    correctCount: Number,
    incorrectCount: Number,
    favorite: Boolean,
}, {timestamps: true});


const LearnData: Model<LearnDataModel> = model('LearnData', learnDataSchema);
export default LearnData;
