from datetime import datetime
class Node():
    def __init__(self,name,path,children):
        self.name = name
        self.path = path
        self.data = ''
        self.type = 'FILE' if '.' in val else 'FOLDER'
        self.createdDate = datetime.now()
        self.editedDate = datetime.now()
        self.children = children