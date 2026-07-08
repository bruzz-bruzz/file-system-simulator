import FileSystem from './Filesystem'
import Node from './Node'
let root = new Node('C','C',[])
let a = new FileSystem(root)
let n = new Node("JOHN",'',[])
a.addDate('C',n)
console.log(a.bfs(a.root,true,'',true))