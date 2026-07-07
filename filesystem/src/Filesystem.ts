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
        let res:Node[][] | string[][] = []
        if(root === undefined){
            return res
        }
        while(q.size() > 0){
            let same:Node[] | string[] = []
            for(let i = 0; i < q.size(); i++){
                let p:Node = q.popFront() as Node
                if(p.path === target){
                    return p
                }
                same.push(returnVal === false ? p : p.name)
                if(p.children.length > 0){
                    for(let i = 0; i < p.children.length; i++){
                        q.pushBack(p.children[i] as Node)
                    }
                }
            }
            res.push(same as string[])
        }
        return returnArr === false ? null : res
    }
    dfs(root:Node,returnVal:boolean,target:string,returnArr:boolean) : Node | Node[] | string[] | null{
        let r = root
        let stk = new Deque([r])
        let res:Node[] | string[] = []
        if(root === undefined){
            return res
        }
        while(stk.size() > 0){
            let p:Node = stk.popFront() as Node
            if(p.path === target){
                return p
            }
            if(p.children.length > 0){
                for(let i = 0; i < p.children.length; i++){
                    stk.pushBack(p?.children[i] as Node)
                }
            }
            res.push(returnVal === false ? p : p.name)
        }
        return returnArr === false ? null : res
    }
}