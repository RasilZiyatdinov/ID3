import examples from "./data/examples22.json"
import attributes from "./data/attributes22.json"
import {Node} from "./tree/node.js"
import {Tree} from "./tree/tree.js"
import {Level} from "./tree/level.js"

let mainAttr = Object.keys(attributes)[Object.keys(attributes).length - 1]

function getLevel(className, arrayClients){
    let level = new Level()
    console.log(className)

        attributes[className].forEach(element =>{
            level.add_node(new Node(className, element))
        })
    
    
    arrayClients.forEach(element => {
        level.nodes.forEach(node =>{
            if (node.attr === element[className]){
                node.add_client(element)
                node.add_ident(element['id'])
                node.result = mainAttr + ": " + element[mainAttr]
            }
        })
    })
    level.nodes.forEach(node => {
        node.calc_entropy()
    })
    level.calc_entropy()
    return level
}

function getMinLevel(classNames, clients){
    let level, minLevel = null
   if (classNames.length !== 0){
        minLevel = getLevel(classNames[0], clients)
        minLevel.class_name = classNames[0] 
        classNames.forEach(key => {
                level = getLevel(key, clients)
                if (level.entropy < minLevel.entropy){
                    minLevel = level  
                    minLevel.class_name = key 
                }
        })
   }
    return minLevel
}

function solve(node, tree) {
    if (node.children.length === 0 && node.entropy !== 0 ) {
        
        let level = getMinLevel(node.get_attr_array(), node.clients)
        tree.insert_level(level, node)
    }
       
    for (let i = node.children.length - 1; i >= 0; i--) {
        solve(node.children[i], tree)
    }
}


export default function Mains(){
    var root = new Node("", null, null, examples['clients'], null, null, Array.from({length: examples.clients.length}, (_, i) => i + 1))
    var tree = new Tree()
    tree.insert(root, null)
    solve(tree.root, tree)
    attributes[mainAttr].forEach(item => {
        formulaStr[mainAttr + ": " + item] = ''
    })
    //console.log(tree.root.to_string())
    // console.log(formulaStr)
    attributes[mainAttr].forEach(el => {
        formulaStr[mainAttr + ": " + el] = ''
    })
    console.log(formulaStr)
    //formulaStr = {"dangerous: yes" : '', "dangerous: no": ''}
    formula(tree.root)
    // Object.keys(formulaStr).forEach(key => {
    //     formulaStr[key] = formulaStr[key].substring(0, formulaStr[key].length - 1)
    // })
    //console.log(formulaStr)
    
    return [tree.root.to_string(), formulaStr]
    //console.log(tree.root.to_string())
}

let formulaStr = {}
function formula(node) {
    if (node.result != "" & node.children.length === 0) {
        let temp = structuredClone(node)
        let res = temp.result
        
        formulaStr[res].length !== 0 ? formulaStr[res] += "ИЛИ;(" : formulaStr[res] += "("
        while(temp.parent !== null){
            formulaStr[res] += "(" + temp.parent.className + "=" + temp.attr + ") И "
            temp = temp.parent
        }
        formulaStr[res] = formulaStr[res].substring(0, formulaStr[res].length - 3)
        formulaStr[res] += ") "
    }
       
    for (let i = node.children.length - 1; i >= 0; i--) {
        formula(node.children[i])
    }
}


//main()