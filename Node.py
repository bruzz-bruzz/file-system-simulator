from datetime import datetime
class Node():
    def __init__(self,name,path,children):
        self.name = ''
        def validateFileName(fileName):
            PROHIBITED = ['<','>',':','"','/','\\','|','?','*']
            for x in PROHIBITED:
                if x in fileName:
                    return False
            return True
        if validateFileName(name):
            self.name = name
        else:
            raise ValueError(f'File names must not include any of these symbols {' '.join(['<','>',':','"','/','\\','|','?','*'])}*')
        self.path = path
        self.data = ''
        self.type = 'FILE' if '.' in name else 'FOLDER'
        self.createdDate = datetime.now()
        self.editedDate = datetime.now()
        self.children = children