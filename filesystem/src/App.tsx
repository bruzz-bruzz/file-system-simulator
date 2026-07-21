import './App.css'
import {useState} from 'react'
import FileSystem from './fileClasses/Filesystem.ts'
import Node from './fileClasses/Node.ts'
import Github from './Github.tsx'
import NodeElement from './Node.tsx'
export default function App(){
    type operationTypes = 'doesPathExist'|'addData'|'deleteData'|'getData'|'moveData'|'overwriteData'
  const [root,setRoot] = useState<Node|null>(null)
  const [fileSystem,setFileSystem] = useState<FileSystem|null>(null)
  const [operationResult,setOperationResult] = useState('')
  const [searchPath,setSearchPath] = useState("")
  const [addPath,setAddPath] = useState("")
  const [addNode,setAddNode] = useState<Node>(new Node('','',[]))
  const [deletePath,setDeletePath] = useState("")
  const [deleteName,setDeleteName] = useState('')
  const [getPath,setGetPath] = useState("")
  const [moveOriginalPath,setMoveOriginalPath] = useState("")
  const [moveNewPath,setMoveNewPath] = useState("")
  const [overwriteFilePath,setOverwriteFilePath] = useState("")
  const [overwriteFileData,setOverwriteFileData] = useState("")
  const [currMode,setCurrMode] = useState<operationTypes>("doesPathExist")
  const [reload,setReload] = useState(false)
  function runOperation(name:operationTypes){
    if(!fileSystem){
        setOperationResult("Create a file tree first!")
        return
    }
    if(name === 'doesPathExist'){
        if(searchPath.length === 0){
            setOperationResult('Enter a path!')
        } else {
            const result = fileSystem?.doesPathExist(searchPath)
            if(result === true){
                setOperationResult(`Path ${searchPath} exists.`)
            } else {
                setOperationResult(`Path ${searchPath} does not exist`)
            }
        }
    } else if(name === 'addData'){
        if(addPath.length === 0){
            setOperationResult('Enter a path!')
        } else if(addNode.name.length === 0){
            setOperationResult('Enter the name field!')
        } else {
            const result = fileSystem?.addData(addPath,addNode)
            setOperationResult(result as string)
        }
        setAddNode(new Node('','',[]))
        reloadTree()
    } else if(name === 'deleteData'){
        if(deletePath.length === 0){
            setOperationResult('Enter a path!')
        } else if(deleteName.length === 0){
            setOperationResult('Enter a file name')
        } else {
            const result = fileSystem?.deleteData(deletePath,deleteName)
            setOperationResult(result as string)
        }
        reloadTree()
    } else if(name === 'getData'){
        if(getPath.length === 0){
            setOperationResult('Enter a path!')
        } else {
            const result = fileSystem?.getData(getPath)
            setOperationResult(result as string)
        }
    } else if(name === 'moveData'){
        if(moveNewPath.length === 0 || moveOriginalPath.length === 0){
            setOperationResult('Enter a path!')
        } else {
            const result = fileSystem?.moveNode(moveOriginalPath,moveNewPath)
            setOperationResult(result as string)
        }
        reloadTree()
    } else if(name === 'overwriteData'){
        if(overwriteFileData.length === 0 || overwriteFilePath.length === 0){
            setOperationResult("Enter required fields!")
        } else {
            const result = fileSystem?.overWriteData(overwriteFilePath,overwriteFileData)
            setOperationResult(result as string)
        }
    }
  }
  function reloadTree(){
    setReload(true)
    setReload(false)
  } 
  function generateTestFilesystem(): [FileSystem, Node] {
      const root = new Node("root", "root", []);
      const fs = new FileSystem(root);
  
      for (const name of ["docs", "src", "images", "tmp"]) {
          fs.addData("root", new Node(name,'',[]));
      }
  
      for (const name of ["guides", "api", "archive"]) {
          fs.addData("root/docs", new Node(name,'',[]));
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
          fs.addData(parent, new Node(name,'',[]));
      }
  
      for (const name of ["getting-started.md", "advanced.md"]) {
          fs.addData("root/docs/guides", new Node(name,'',[]));
      }
  
      for (const name of ["helpers", "tests"]) {
          fs.addData("root/src", new Node(name,'',[]));
      }
  
      for (const name of ["utils.py", "config.json"]) {
          fs.addData("root/src/helpers", new Node(name,'',[]));
      }
  
      for (const name of ["test_main.py", "test_utils.py"]) {
          fs.addData("root/src/tests", new Node(name,'',[]));
      }
  
      for (const name of ["icons"]) {
          fs.addData("root/images", new Node(name,'',[]));
      }
  
      for (const name of ["app_icon.png", "banner.svg"]) {
          fs.addData("root/images/icons", new Node(name,'',[]));
      }
      setRoot(root)
        setFileSystem(fs)
      return [fs, root];
  }
  return (
    <div className='font-mono'>
      <div className='flex justify-center items-center flex-col'>
        <h1 className='text-2xl'>File System Simulator</h1>
        <div className='m-4 grid grid-cols-2 gap-4 p-4 border border-black rounded-lg w-9/10'>
          <div className='m-4 whitespace-pre w-full'>
            <div className='flex justify-center items-center flex-col'>
                <h1 className='text-center'>File Tree</h1>
                <button className='m-2 p-2 border border-black rounded-lg hover:cursor-pointer' onClick={()=>generateTestFilesystem()}>Generate test file tree</button>
                {root !== null && <NodeElement data={root as Node} indent={''} type={root.type} isLast={null} reload={reload}/>}
                {root === null && (<h1>Empty file tree!</h1>)}
            </div>
          </div>
          <div className='m-4 w-full flex justify-center items-center flex-col'>
            <h1>File System Manager</h1>
            <label>Operation selected: {currMode}</label>
            <select className='text-center border border-black rounded-lg p-2' value={currMode} onChange={(e)=>{
                setCurrMode(e.target.value as operationTypes)
                setOperationResult("")
                setSearchPath("")
                setAddPath("")
                setAddNode(new Node('','',[]))
                setDeleteName("")
                setDeletePath("")
                setGetPath("")
                setMoveOriginalPath("")
                setMoveNewPath("")
                setOverwriteFileData("")
                setOverwriteFilePath("")
                }}>
                <option value={'doesPathExist'}>Does Path Exist?</option>
                <option value={"addData"}>Add new folder/file</option>
                <option value={"deleteData"}>Delete folder/file</option>
                <option value={"getData"}>Get data of folder/file</option>
                <option value={"moveData"}>Move file/folder location</option>
                <option value={"overwriteData"}>Edit file data value</option>
            </select>
            {currMode === 'doesPathExist' && (
                <div className='flex justify-center items-center flex-col whitespace-pre'>
                    <label>Path: {searchPath}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>setSearchPath(e.target.value)} />
                    <p>{operationResult}</p>
                </div>
            )}
            {currMode === 'addData' && (
                <div className='flex justify-center items-center flex-col whitespace-pre'>
                    <label>Parent path: {addPath}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>{
                        setAddPath(e.target.value)
                    }} />
                    <label>New file/folder name: {addNode.name}</label>
                    <p>File names must not include any of these symbols {'< > : " / \\ | ? *'}</p>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' value={addNode.name} onChange={(e)=>{
                        setAddNode(new Node(e.target.value,'',[]))
                    }} />
                    <p>{operationResult}</p>
                </div>
            )}
            {currMode === 'deleteData' && (
                <div className='flex justify-center items-center flex-col whitespace-pre'>
                    <label>Parent path: {deletePath}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>setDeletePath(e.target.value)} />
                    <label>Delete file/folder name: {deleteName}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>setDeleteName(e.target.value)} />
                    <p>{operationResult}</p>
                </div>
            )}
            {currMode === 'getData' && (
                <div className='flex justify-center items-center flex-col whitespace-pre'>
                    <label>File/Folder path: {getPath}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>setGetPath(e.target.value)} />
                    <p>{operationResult}</p>
                </div>
            )}
            {currMode === 'moveData' && (
                <div className='flex justify-center items-center flex-col whitespace-pre'>
                    <label>Original Path: {moveOriginalPath}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>{setMoveOriginalPath(e.target.value)}} />
                    <label>New Path: {moveNewPath}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>{setMoveNewPath(e.target.value)}} />
                    <p>{operationResult}</p>
                </div>
            )}
            {currMode === 'overwriteData' && (
                <div className='flex justify-center items-center flex-col whitespace-pre'>
                    <label>File Path: {overwriteFilePath}</label>
                    <input type='text' className='border border-black rounded-lg p-2 text-center' onChange={(e)=>{setOverwriteFilePath(e.target.value)}} />
                    <label>New Data: {overwriteFileData}</label>
                    <textarea className='border border-black rounded-lg p-2' cols={75} rows={10} onChange={(e)=>setOverwriteFileData(e.target.value)} value={overwriteFileData}>

                    </textarea>
                    <p>{operationResult}</p>
                </div>
            )}
            <button className='m-2 p-2 border border-black rounded-lg hover:cursor-pointer' onClick={()=>{
                runOperation(currMode)
            }}>Run operation</button>
          </div>
        </div>
      </div>
      <Github repo={'https://github.com/bruzz-bruzz/file-system-simulator'}/>  
    </div>
  )
}