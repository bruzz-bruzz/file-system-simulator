from datetime import datetime
class Node():
    def __init__(self,name,path,children):
        def validateFileName(fileName):
            PROHIBITED = ['<','>',':','"','/','|','\\','?','*']
            for x in PROHIBITED:
                if x in fileName:
                    return False
            return True
        if validateFileName:
            self.name = name
        else:
            raise ValueError('File names must not include any of these symbols <>:"/\|?*')
        self.path = path
        self.data = ''
        self.type = 'FILE' if '.' in name else 'FOLDER'
        self.createdDate = datetime.now()
        self.editedDate = datetime.now()
        self.children = children