from Node import Node
from collections import deque
class FileSystem():
    def __init__(self,root):
        self.root = root
    def bfs(self,root,returnVal,target,returnArr):
        q = deque([root])
        res = []
        if not root:
            return res
        while q:
            same = []
            for _ in range(len(q)):
                p = q.popleft()
                if p.name == target:
                    return p
                same.append(p if returnVal == False else p.name)
                if p.children:
                    for x in p.children:
                        q.append(x)
            res.append(same)
        return None if not returnArr else res
    def dfs(self,root,returnVal,target,returnArr):
        stk = deque([root])
        res = []
        if not root:
            return res
        while stk:
            p = stk.popleft()
            if p.name == target:
                return p
            if p.children:
                for x in p.children:
                    stk.append(x)
            res.append(p if returnVal == False else p.name)
        return None if not returnArr else res
    def addData(self,parent,newNode):
        parentNode = self.bfs(self.root,False,parent,False)
        if not parentNode:
            return f'Directory {parent} does not exist.'
        parentNode.children.append(newNode)

    def deleteData(self,parent,targetNode):
        parentNode = self.bfs(self.root,False,parent,False)
        found = False
        for x in range(len(parentNode.children)):
            if parentNode.children[x].name == targetNode:
                found = True
                print(f'{parentNode.children[x].type} {parentNode.children[x].name} has been deleted.')
                parentNode.children.pop(x)
                break
        if not found:
            print(f'{targetNode} does not exist in {parent}.')
    def editData(self,targetNode):
        node = self.bfs(self.root,False,targetNode,False)
        if not node:
            print(f'{targetNode} does not exist.')