from FileSystem import FileSystem
from Node import Node
root = Node('C','C',[])
a = FileSystem(root)
n = Node("JOHN",'',[])
n2 = Node("jim",'',[])
n3 = Node("ABC",'',[])
a.addData('C',n)
a.addData('C',n2)
a.addData('C/jim',n3)
a.deleteData('C/jim','ABC')
print(a.bfs(a.root,True,'',True))