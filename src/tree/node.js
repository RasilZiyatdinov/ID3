import attributes from "../data/attributes22.json"

let mainAttr = Object.keys(attributes)[Object.keys(attributes).length - 1]

export class Node {
    constructor(className, attr, entropy = null, clients = null, parent = null, children = null, idents = null) {
        this.className = className
        this.attr = attr
        this.entropy = entropy
        this.parent = parent

        this.clients = []
        if (clients !== null) {
            this.clients = clients
        }

        this.idents = []
        if (idents !== null) {
            this.idents = idents
        }

        this.children = []
        if (children != null) {
            children.forEach(element => this.add_child(element));
        }

        this.isLeaf = false
        this.result = ""
    }

    add_child(node) {
        node.parent = this
        console.assert(node instanceof Node);
        this.children.push(node)
    }

    class_name() {
        return this.className
    }

    attr() {
        return this.attr
    }

    entropy() {
        return this.entropy
    }

    isLeaf() {
        return this.isLeaf
    }

    add_client(client) {
        this.clients.push(client)
    }

    add_ident(id) {
        this.idents.push(id)
    }

    calc_entropy() {
        let level = []
        attributes[mainAttr].forEach(element => {
            level.push({ attr: element, count: 0 })
        })
        this.clients.forEach(client => {
            level.forEach(element => {
                if (element.attr === client[mainAttr]) {
                    element.count += 1
                }
            })
        })
        let entropy = 0
        let allCount = this.clients.length;
        level.forEach(element => {
            if (element.count !== 0) {
                entropy += (element.count / allCount) * Math.log2((element.count / allCount))
            }
        })
        entropy *= -1

        this.entropy = entropy
        this.isLeaf = entropy == 0
    }

    get_attr_array() {
        let attrArrayDelete = []
        let node = this
        while (node.parent !== null) {
            attrArrayDelete.push(node.className)
            node = node.parent
        }
        let attrArray = []
        attrArray = Object.keys(attributes)
        attrArray.splice(attrArray.indexOf(mainAttr), 1)
        attrArrayDelete.forEach(attr => {
            attrArray.splice(attrArray.indexOf(attr), 1)
        })
        return attrArray
    }

    to_string() {
        return JSON.stringify(this, ['className', 'attr', 'entropy', 'idents', 'children', 'isLeaf', 'result'], 4)
    }

}