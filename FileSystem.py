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
    def doesPathExist(self,path):
        root = self.root
        res = self.dfs(root,False,path,False)
        return True if res else False
    def addData(self,parentPath,newNode):
        root = self.root
        parentNode = self.bfs(root,False,parentPath,False)
        if not parentNode:
            return f'{parentPath} does not exist.'
        if parentNode.type == 'FILE':
            return f'{parentPath} is a file, not a folder.'
        dupeCount = 0
        for x in parentNode.children:
            if x.name.split(' ')[0] == newNode.name:
                dupeCount += 1
        if dupeCount > 0:
            newNode.name = f'{newNode.name} ({dupeCount})'
        name = newNode.name.split('.')
        newNode.path = parentNode.path + '/' + name[0] + f' ({dupeCount})' + ('.' + name[1] if len(name) > 1 else '') if dupeCount > 0 else parentNode.path + '/' + newNode.name
        newNode.name = newNode.name + ('.' + name[1] if len(name) > 1 else '')
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
    def editParentData(self,path,operation,newData):
        targetNode = self.bfs(self.root,False,path,False)
        if not targetNode:
            return f'{path} does not exist.'
        if operation == 'ADD':
            targetNode.children.append(newData)
            return f'{newData.name} has been added to {path}.'
        elif operation == 'REMOVE':
            for x in range(len(targetNode.children)):
                if targetNode.children[x].name == newData:
                    targetNode.children.pop(x)
                    return f'{newData} has been deleted from {path}.'
            return f'{newData} does not exist in {path}.'
    def moveNode(self,originalPath,newPath):
        targetNode = self.bfs(self.root,False,originalPath,False)
        if not targetNode:
            return f'{originalPath} does not exist.'
        newParentNode = self.bfs(self.root,False,newPath,False)
        self.editParentData('/'.join(originalPath.split('/')[:-1]),'REMOVE',targetNode.name)
        if not newParentNode:
            return f'{newPath} does not exist.'
        if newParentNode.type != 'folder':
            return f'{newPath} is not a folder.'
        self.addData(newPath,targetNode)
        self.editParentData('/'.join(originalPath.split('/')[:-1]),'REMOVE',targetNode.name)
        return f'{targetNode.name} has been moved from {originalPath} to {newPath}.'
    def overwriteData(self,filePath,newData):
        targetNode = self.bfs(self.root,False,filePath,False)
        if not targetNode:
            return f'{filePath} does not exist.'
        if targetNode.type != 'file':
            return f'{filePath} is not a file.'
        targetNode.data = newData
        targetNode.editedDate = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return f'{filePath} has been overwritten successfully.'
    def getData(self,targetPath):
        root = self.root
        targetNode = self.bfs(root,False,targetPath,False)
        if not targetNode:
            return f'{targetPath} does not exist.'
        haveChildren = f'Content: {[x.name for x in targetNode.children]} \n' if targetNode.children else ''
        return f' Name: {targetNode.name} \n Path: {targetNode.path} \n Type: {targetNode.type} \n Data: \n {targetNode.data if len(targetNode.data) > 0 else ''} \n Created Date: {targetNode.createdDate} \n Edited Date: {targetNode.editedDate} \n ' + haveChildren
    def listDir(self,startingRoot):
        root = startingRoot
        if not root:
            return ''
        res = [f'[{root.name}]']
        def recur(node, prefix=''):
            for index, child in enumerate(node.children):
                is_last = index == len(node.children) - 1
                branch = '└── ' if is_last else '├── '
                res.append(prefix + branch + f'[{child.name}]')
                child_prefix = prefix + ('    ' if is_last else '│   ')
                recur(child, child_prefix)
        recur(root)
        return '\n'.join(res)