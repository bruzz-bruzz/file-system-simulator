export default class Node{
    name:string;
    path:string;
    data:any;
    type:string;
    createdDate:Date;
    editedDate:Date;
    children:Node[]
    constructor(name:string,path:string,children:Node[]){
        this.name = ''
        this.path = path
        this.data = ''
        this.type = name.includes('.') ? 'FILE' : "FOLDER"
        this.createdDate = new Date()
        this.editedDate = new Date()
        this.children = children
    }
}