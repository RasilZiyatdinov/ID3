export class Level {
    constructor() {
      this.nodes = []
      this.entropy = null
      this.className = ""
    }

    add_node(node){
        this.nodes.push(node)
    } 

    entropy(){
        return this.entropy
    }

    clients_count(){
        let count = 0;
        this.nodes.forEach(node =>{
            count += node.clients.length
        })
        return count;
    }

    class_name(){
        return this.className
    }

    calc_entropy(){
        let count = this.clients_count();
        let entropy = 0;
        this.nodes.forEach(element =>{
            entropy += (element.clients.length / count) * element.entropy
        })
        this.entropy = entropy
    }


}