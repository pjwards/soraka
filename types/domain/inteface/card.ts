import {DefinitionInterface} from './definition';
import {UserInterface} from './user';

export interface CardInterface {
    owner?: UserInterface;
    word?: DefinitionInterface;
    meanings?: DefinitionInterface[];
}
