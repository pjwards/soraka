import {UserInterface} from './user';
import {CardInterface} from './card';

export interface SetInterface {
    owner?: UserInterface;
    cards?: CardInterface[];
    state: string;
    title: string;
    description: string;
}