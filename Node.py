from datetime import datetime
class Node():
    def __init__(self,val,path,children):
        self.val = val
        self.path = path
        self.type = 'FILE' if '.' in val else 'FOLDER'
        self.createdDate = datetime.now()
        self.editedDate = datetime.now()
        self.children = children