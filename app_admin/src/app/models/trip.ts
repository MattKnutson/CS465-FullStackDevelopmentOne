
export interface Trip {

    _id: string, // Internal primary KEY in MongoDB. //
    code: string,
    name: string,
    length: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string

}