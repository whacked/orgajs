module.exports = block

import u from 'unist-builder'
import highlight from './_highlight'

function block(h, node) {
  const name = node.name.toUpperCase()
  switch(name) {
  case `SRC`:
    return src(h, node)
  case `QUOTE`:
    return quote(h, node)
  case `COMMENT`:
    return undefined
  case `CENTER`:
    return center(h, node)
    case `TRANSCLUDE`:
      return transclude(h, node)
  default:
    const props = { className: name.toLowerCase() }
    return h(node, `pre`, props, [u('text', node.value || '')])
  }
}

function quote(h, node) {
  return h(node, `blockquote`, [u(`text`, node.value)])
}

function center(h, node) {
  return h(node, `center`, [u(`text`, node.value)])
}

function src(h, node) {
  const lang = node.params[0].toLowerCase()
  var props = {}
  if (lang) {
    props.className = ['language-' + lang]
  }

  const code = node.value

  var body = u(`text`, code)
  if (h.highlight) {
    const highlighted = highlight(lang, code)
    body = u(`raw`, highlighted)
  }

  return h(node, `pre`, [
    h(node, `code`, props, [body])
  ])
}

function transclude(h, node) {
  const transcludeSource = node.params[0];
  var startLine = 1;
  if(node.params.length > 1) {
    var spl = node.params[node.params.length-1].split('-')
    startLine = parseInt(spl[spl.length-1])
  }
  var props = {
    className: "orgajs-transclude-block",
    "data-source": transcludeSource,
    "data-line": startLine
  }

  var body = u(`text`, node.value)
  return h(node, `div`, props, [body])
}
