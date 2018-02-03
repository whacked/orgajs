function Node(type, children = []) {
  this.type = type
  this.children = []
  this.push(children)
}

Node.prototype = {
  with: function(data) {
    var newNode = this
    newNode = Object.assign(this, data)
    return newNode
  },

  push: function(node) {
    if (Array.isArray(node)) {
      for (const n of node) {
        this.push(n)
      }
    } else if (node instanceof Node) {
      node.parent = this
      this.children.push(node)
    }
  },
}

module.exports = Node
