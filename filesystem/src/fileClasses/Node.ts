export default class Node {
    name: string;
    path: string;
    data: string;
    type: string;
    createdDate: Date;
    editedDate: Date;
    children: Node[];

    constructor(name: string, path: string, children: Node[]) {
        this.name = '';
        if (this.validateFileName(name)) {
            this.name = name;
        } else {
            throw new Error('File names must not include any of these symbols < > : " / \\ | ? *');
        }
        this.path = path;
        this.data = '';
        this.type = name.includes('.') ? 'FILE' : 'FOLDER';
        this.createdDate = new Date();
        this.editedDate = new Date();
        this.children = children;
    }

    validateFileName(fileName: string): boolean {
        const PROHIBITED = ['<', '>', ':', '"', '/', '\\', '|', '?', '*'];
        return !PROHIBITED.some((symbol) => fileName.includes(symbol));
    }
}