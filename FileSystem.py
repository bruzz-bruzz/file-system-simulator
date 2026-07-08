from Node import Node
from collections import deque
from datetime import datetime
class FileSystem():
    def __init__(self,root):
        self.root = root
    def bfs(self,root,returnVal,target,returnArr):
        r = root
        q = deque([r])
        res = []
        if not root:
            return res
        while q:
            same = []
            for _ in range(len(q)):
                p = q.popleft()
                if p.path == target:
                    return p
                same.append(p if returnVal == False else p.name)
                if p.children:
                    for x in p.children:
                        q.append(x)
            res.append(same)
        return None if not returnArr else res
    def dfs(self,root,returnVal,target,returnArr):
        r = root
        stk = deque([r])
        res = []
        if not root:
            return res
        while stk:
            p = stk.popleft()
            if p.path == target:
                return p
            if p.children:
                for x in p.children:
                    stk.append(x)
            res.append(p if returnVal == False else p.name)
        return None if not returnArr else res
    def addData(self,parentPath,newNode):
        root = self.root
        parentNode = self.bfs(root,False,parentPath,False)
        if not parentNode:
            return f'{parentPath} does not exist.'
        newNode.path = parentNode.path + '/' + newNode.name
        parentNode.children.append(newNode)
        return f'{newNode.name} has been added successfully.'
    def deleteData(self,parentPath,targetNode):
        root = self.root
        parentNode = self.bfs(root,False,parentPath,False)
        if not parentNode:
            return f'{parentPath} does not exist.'
        if targetNode in parentNode.children:
            for x in range(len(parentNode.children)):
                if parentNode.children[x].name == targetNode:
                    parentNode.children.pop(x)
                    return f'{targetNode} has been deleted from {parentPath}.'
        else:
            return f'{targetNode} does not exist in {parentPath}.'
    def editData(self,targetPath,newVal):
        root = self.root
        targetNode = self.bfs(root,False,targetPath,False)
        if not targetNode:
            return f'{targetPath} does not exist.'
        def dataExists(data):
            return data.name or data.path or data.data or data.type
        targetNode.name = newVal.name if newVal.name else targetNode.name
        targetNode.path = newVal.path if newVal.path else targetNode.path
        targetNode.data = newVal.data if newVal.data else targetNode.data
        targetNode.type = newVal.type if newVal.type else targetNode.type
        targetNode.editedDate = datetime.now() if dataExists(newVal) else targetNode.editedDate
        return f'{targetPath} has been edited.'
    def getData(self,targetPath):
        root = self.root
        targetNode = self.bfs(root,False,targetPath,False)
        if not targetNode:
            return f'{targetPath} does not exist.'
        haveChildren = f'Content: {[x.name for x in targetNode.children]} \n' if targetNode.children else ''
        return f' Name: {targetNode.name} \n Path: {targetNode.path} \n type: {targetNode.type} \n Created Date: {targetNode.createdDate} \n Edited Date: {targetNode.editedDate} \n ' + haveChildren
    def listDir(self,startingRoot):
        root = startingRoot
        if not root:
            return ''
        res = [f'[{root.name}]']
        def recur(node, prefix=''):
            for index, child in enumerate(node.children):
                print(self.getData(child.path))
                is_last = index == len(node.children) - 1
                branch = '└── ' if is_last else '├── '
                res.append(prefix + branch + f'[{child.name}]')
                child_prefix = prefix + ('    ' if is_last else '│   ')
                recur(child, child_prefix)
        recur(root)
        return '\n'.join(res)