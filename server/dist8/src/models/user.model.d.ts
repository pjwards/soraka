import { Entity } from '@loopback/repository';
import { Picture } from './picture.model';
export declare class User extends Entity {
    id: string;
    email: string;
    name: string;
    picture?: Picture;
    getId(): string;
}
