import {Deque} from '@datastructures-js/deque'
import Node from './Node'
export default class FileSystem{
    root:Node;
    constructor(root:Node){
        this.root = root
    }
    bfs(root:Node,returnVal:boolean,target:string,returnArr:boolean):Node[][] | string[][] | Node | null{
        let r = root
        let q = new Deque<Node>([r])
        let res:any[][] = []
        if(root === undefined){
            return res as Node[][] | string[][]
        }
        while(q.size() > 0){
            let same:any[] = []
            for(let i = 0; i < q.size(); i++){
                const p = q.popFront()
                if(!p) continue
                if(p.path === target){
                    return p
                }
                if(returnVal === false){
                    same.push(p)
                } else {
                    same.push(p.name)
                }
                if(p.children.length > 0){
                    for(let i = 0; i < p.children.length; i++){
                        q.pushBack(p.children[i] as Node)
                    }
                }
            }
            res.push(same)
        }
        return returnArr === false ? null : (res as Node[][] | string[][])
    }
    dfs(root:Node,returnVal:boolean,target:string,returnArr:boolean) : Node | Node[] | string[] | null{
        let r = root
        let stk = new Deque([r])
        let res:any[] = []
        if(root === undefined){
            return res as Node[] | string[]
        }
        while(stk.size() > 0){
            const p = stk.popFront()
            if(!p) continue
            if(p.path === target){
                return p
            }
            if(p.children.length > 0){
                for(let i = 0; i < p.children.length; i++){
                    stk.pushBack(p.children[i] as Node)
                }
            }
            if(returnVal === false){
                res.push(p)
            } else {
                res.push(p.name)
            }
        }
        return returnArr === false ? null : (res as Node[] | string[])
    }
    addDate(parentPath:string,newNode:Node){
        let root = this.root
        let parentNode = this.bfs(root,false,parentPath,false) as Node
        if(parentNode === null){
            return `${parentPath} does not exist.`
        }
        newNode.path = parentNode.path + '/' + newNode.name
        parentNode.children.push(newNode)
        return `${newNode.name} has been added successfully.`
    }
}