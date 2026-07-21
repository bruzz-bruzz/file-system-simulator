import FileSystem from './fileClasses/Filesystem.ts'
import Node from './fileClasses/Node.ts'
function createNode(name: string): Node {
    return new Node(name, "", []);
}
function generateTestFilesystem(): [FileSystem, Node] {
    const root = new Node("root", "root", []);
    const fs = new FileSystem(root);

    for (const name of ["docs", "src", "images", "tmp"]) {
        fs.addData("root", createNode(name));
    }

    for (const name of ["guides", "api", "archive"]) {
        fs.addData("root/docs", createNode(name));
    }

    const files: [string, string][] = [
        ["README.md", "root/docs"],
        ["notes.txt", "root/docs"],
        ["setup.py", "root/src"],
        ["main.py", "root/src"],
        ["logo.png", "root/images"],
        ["icon.svg", "root/images"],
        ["todo.txt", "root/tmp"],
    ];
    for (const [name, parent] of files) {
        fs.addData(parent, createNode(name));
    }

    for (const name of ["getting-started.md", "advanced.md"]) {
        fs.addData("root/docs/guides", createNode(name));
    }

    for (const name of ["helpers", "tests"]) {
        fs.addData("root/src", createNode(name));
    }

    for (const name of ["utils.py", "config.json"]) {
        fs.addData("root/src/helpers", createNode(name));
    }

    for (const name of ["test_main.py", "test_utils.py"]) {
        fs.addData("root/src/tests", createNode(name));
    }

    for (const name of ["icons"]) {
        fs.addData("root/images", createNode(name));
    }

    for (const name of ["app_icon.png", "banner.svg"]) {
        fs.addData("root/images/icons", createNode(name));
    }

    return [fs, root];
}
let [fs,root] = generateTestFilesystem()
console.log(fs.listDir(root))