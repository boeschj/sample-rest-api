export class EntryModel {
    public id?: string;
    public title: string;
    public text: string;
    
    constructor(title: string, text: string, id?: string) {
        this.id = id;
        this.title = title;
        this.text = text;
    }

    toJson() {
        return JSON.parse(JSON.stringify(this));
    }

    toUpdateInput() {
        const updateInput: any = this.toJson();
        Object.keys(updateInput).forEach(key => updateInput[key] === undefined && delete updateInput[key]);
        return updateInput;
    }
}