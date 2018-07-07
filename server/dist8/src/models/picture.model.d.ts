import { Entity } from '@loopback/repository';
export declare class Picture extends Entity {
    id?: number;
    url: string;
    width: number;
    height: number;
    silhouette: boolean;
    getId(): number | undefined;
}
