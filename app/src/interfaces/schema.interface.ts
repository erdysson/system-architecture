import {Document} from 'mongoose';

export type SchemaDocument<T> = T & Document;
