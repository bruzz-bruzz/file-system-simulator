import { Deque } from '@datastructures-js/deque';
import Node from './Node';

export default class FileSystem {
    root: Node;

    constructor(root: Node) {
        this.root = root;
    }

    bfs(root: Node | undefined, returnVal: boolean, target: string, returnArr: boolean): Node | Node[][] | string[][] | null {
        if (!root) {
            return returnArr ? ([] as Node[][] | string[][]) : null;
        }

        const q = new Deque<Node>([root]);
        const res: Array<Node[] | string[]> = [];

        while (q.size() > 0) {
            const same: Array<Node | string> = [];
            const levelSize = q.size();

            for (let i = 0; i < levelSize; i++) {
                const p = q.popFront();
                if (!p) continue;

                if (p.path === target) {
                    return p;
                }

                same.push(returnVal ? p.name : p);

                if (p.children.length > 0) {
                    for (const child of p.children) {
                        q.pushBack(child);
                    }
                }
            }

            res.push(same as Node[] | string[]);
        }

        return returnArr ? (res as Node[][] | string[][]) : null;
    }

    dfs(root: Node | undefined, returnVal: boolean, target: string, returnArr: boolean): Node | Node[] | string[] | null {
        if (!root) {
            return returnArr ? ([] as Node[] | string[]) : null;
        }

        const stk = new Deque<Node>([root]);
        const res: Array<Node | string> = [];

        while (stk.size() > 0) {
            const p = stk.popFront();
            if (!p) continue;

            if (p.path === target) {
                return p;
            }

            if (p.children.length > 0) {
                for (let i = p.children.length - 1; i >= 0; i--) {
                    stk.pushFront(p.children[i]);
                }
            }

            res.push(returnVal ? p.name : p);
        }

        return returnArr ? (res as Node[] | string[]) : null;
    }
    doesPathExist(path:string){
        let root = this.root
        let res = this.dfs(root,false,path,false)
        return res !== null ? true : false
    }
    addData(parentPath: string, newNode: Node): string {
        const parentNode = this.bfs(this.root, false, parentPath, false) as Node | null;
        if (!parentNode) {
            return `${parentPath} does not exist.`;
        }
        if(parentNode.type === 'FILE'){
            return 'Only folders can have data added.'
        }
        let dupeCount = 0
        for(let x of parentNode.children){
            if(x.type === 'FOLDER'){
                if(x.name.split(' ')[0] === newNode.name){
                dupeCount += 1
            }    
            }else {
                if(x.name.split('.')[0].split(' ')[0] + '.' + x.name.split('.')[1] === newNode.name){
                    dupeCount = x.name.split('.')[0].length === 2 ? Math.max(dupeCount, parseInt(x.name.split('.')[0].split(' ')[1].slice(1,3))) + 1 : dupeCount + 1
                }
            }
        }
        let name = newNode.name.split('.')
        newNode.path = dupeCount > 0 ? `${parentNode.path}/${name[0]} (${dupeCount})${name.length === 2 ? '.' + name[1] : ''}` : `${parentNode.path}/${newNode.name}`;
        newNode.name = dupeCount > 0 ? `${name[0]} (${dupeCount})${name.length === 2 ? '.' + name[1] : ''}` : `${newNode.name}`
        parentNode.children.push(newNode);
        parentNode.editedDate = new Date()
        newNode.editedDate = new Date()
        return `${newNode.name} has been added successfully.`;
    }

    deleteData(parentPath: string, targetNode: string): string {
        const parentNode = this.bfs(this.root, false, parentPath, false) as Node | null;
        if (!parentNode) {
            return `${parentPath} does not exist.`;
        }

        const targetIndex = parentNode.children.findIndex((child) => child.name === targetNode);
        if (targetIndex === -1) {
            return `${targetNode} does not exist in ${parentPath}.`;
        }
        parentNode.children.splice(targetIndex, 1);
        parentNode.editedDate = new Date()
        return `${targetNode} has been deleted from ${parentPath}.`;
    }
    editParentData(path:string,operation:'ADD' | "REMOVE",newData:Node) : string | undefined {
        const targetNode = this.bfs(this.root,false,path,false) as Node | null
        if(!targetNode){
            return `${targetNode} does not exist`
        }
        targetNode.editedDate = new Date()
        if(operation === 'ADD'){
            targetNode.children.push(newData)
            return `${newData.name} has been added to ${targetNode.name}`
        } else if(operation === 'REMOVE'){
            let index = 0
            let found = false
            for(let i = 0; i < targetNode.children.length; i++){
                if(targetNode.children[i].name === newData.name){
                    index = i
                    found = true
                    break
                }
            }
            if(found === true){
                targetNode.children.splice(index,1)
                return `${newData.name} has been removed from ${targetNode.name}`
            }
            return `${targetNode.name} does not exist in ${newData.name}`
        }
    }
    moveNode(originalPath:string,newPath:string) : string {
        const targetNode = this.bfs(this.root,false,originalPath,false) as Node | null
        if(!targetNode){
            return `${originalPath} does not exist.`
        }
        let oldParentPath : string[] | string = originalPath.split('/')
        oldParentPath.pop()
        oldParentPath = oldParentPath.join('/')
        const test = this.bfs(this.root,false,newPath,false) as Node | null
        if(!test){
            return `${newPath} does not exist.`
        }
        if(test.type === 'FILE'){
            return `${newPath} must be a folder`
        }
        this.addData(newPath,targetNode)
        this.editParentData(oldParentPath,'REMOVE',targetNode)
        return `${originalPath} has been moved to ${newPath}.`
    }
    overWriteData(filePath:string,newData:string): string {
        const targetNode = this.bfs(this.root,false,filePath,false) as Node | null 
        if(!targetNode){
            return `${targetNode} does not exist.`
        }
        if(targetNode.type !== 'FILE'){
            return `Only files can have their data overwritten.`
        }
        targetNode.editedDate = new Date()
        targetNode.data = newData
        return `${targetNode.name} data overwritten.`
    }
    getData(targetPath: string): string {
        const targetNode = this.bfs(this.root, false, targetPath, false) as Node | null;
        if (!targetNode) {
            return `${targetPath} does not exist.`;
        }

        const haveChildren = targetNode.children.length > 0
            ? `Content: [${targetNode.children.map((child) => child.name).join(', ')}] \n`
            : '';

        return ` Name: ${targetNode.name} \n Path: ${targetNode.path} \n Type: ${targetNode.type} \n Data: \n ${targetNode.data.length > 0 ? targetNode.data : ''} \n Created Date: ${targetNode.createdDate} \n Edited Date: ${targetNode.editedDate} \n ${haveChildren}`;
    }

    listDir(startingRoot: Node | undefined): string {
        if (!startingRoot) {
            return '';
        }

        const res: string[] = [`[${startingRoot.name}]`];

        const recur = (node: Node, prefix = ''): void => {
            node.children.forEach((child, index) => {
                const isLast = index === node.children.length - 1;
                const branch = isLast ? '└── ' : '├── ';
                res.push(prefix + branch + `[${child.name}]`);
                const childPrefix = prefix + (isLast ? '    ' : '│   ');
                recur(child, childPrefix);
            });
        };

        recur(startingRoot);
        return res.join('\n');
    }
}