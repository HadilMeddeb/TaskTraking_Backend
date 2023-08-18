import { Schema, Document } from 'mongoose';

//adress
interface IList {
    list: string;
    listOrder: string;
}

interface I_List extends Document {
    list: string;
    listOrder: string;
}


const listSchema = new Schema<I_List>({
    list: String,
    listOrder: String,
});


export  {listSchema ,IList } 