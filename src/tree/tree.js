import { Node } from "../tree/node.js";

export class Tree {
    constructor() {
        this.root = null;
    }

    root() {
        return this.root;
    }

    insert(node, parent) {
        if (parent == null) {
            if (this.root == null) {
                this.root = node;
            }
        } else {
            parent.add_child(node);
        }
    }

    insert_level(level, parent) {
        if (level !== null){
            level.nodes.forEach((node) => {
                parent.add_child(node);
            });
            if (parent.parent == null){
                parent.entropy = level.entropy
            }
            parent.className = level.class_name;    
        }
    }
}
