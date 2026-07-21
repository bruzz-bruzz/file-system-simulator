from python.FileSystem import FileSystem
from python.Node import Node


def create_node(name):
    return Node(name, "", [])


def generate_test_filesystem():
    root = Node("root", "root", [])
    fs = FileSystem(root)

    for name in ["docs", "src", "images", "tmp"]:
        fs.addData("root", create_node(name))

    for name in ["guides", "api", "archive"]:
        fs.addData("root/docs", create_node(name))

    for name, parent in [
        ("README.md", "root/docs"),
        ("notes.txt", "root/docs"),
        ("setup.py", "root/src"),
        ("main.py", "root/src"),
        ("logo.png", "root/images"),
        ("icon.svg", "root/images"),
        ("todo.txt", "root/tmp"),
    ]:
        fs.addData(parent, create_node(name))

    for name in ["getting-started.md", "advanced.md"]:
        fs.addData("root/docs/guides", create_node(name))

    for name in ["helpers", "tests"]:
        fs.addData("root/src", create_node(name))

    for name in ["utils.py", "config.json"]:
        fs.addData("root/src/helpers", create_node(name))
    for name in ["test_main.py", "test_utils.py"]:
        fs.addData("root/src/tests", create_node(name))

    for name in ["icons"]:
        fs.addData("root/images", create_node(name))

    for name in ["app_icon.png", "banner.svg"]:
        fs.addData("root/images/icons", create_node(name))

    return fs, root


if __name__ == "__main__":
    fs, root = generate_test_filesystem()
    print(fs.doesPathExist("root/src/helpers/utils.py/l"))
    print(fs.listDir(root))
#│