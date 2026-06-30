from Node import Node
from collections import deque
class FileSystem():
    def __init__(self,root):
        self.root = root
    def bfs(self,root,returnVal,target):
        q = deque([root])
        res = []
        if not root:
            return res
        while q:
            same = []
            for _ in range(len(q)):
                p = q.popleft()
                same.append(p if returnVal == False else p.val)
                if p.left:
                    q.append(p.left)
                if p.right:
                    q.append(p.right)
            res.append(same)
        return res
    def dfs(self,root,returnVal,target):
        stk = deque([root])
        res = []
        if not root:
            return res
        while stk:
            p = stk.popleft()
            if p.left:
                stk.append(p.left)
            if p.right:
                stk.append(p.right)
            res.append(p if returnVal == False else p.val)
        return p
    def addData(self,parent,newNode):
