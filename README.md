react-dom-reflection
===

Experimental utils, to get more from React-Dom

# Warning
This library uses details of the internal React-Dom realization. Be careful.

# Use cases
### Connect React and Dom trees
 React tree is where your Application lives, but DOM tree is where it is _actually_ exists.
 React.Portals are breaking connections between React and DOM, and while `events` would be automatically managed
 by React - everything else would not.

### Get debug information
 Sometimes you need it - get some _react_ information out of dom tree. Get React instance from a Dom Node.
 
### Find your place
 It always was a right decision to keep Components in isolation, and not let them assess their parents.
 But it still could be useful in some cases. 

# API
The goal is to keep API not simple, but less fragile, to prevent potential breakages in the future. 

### instanceContainsNode(componentInstance, DomNode): boolean
Returns if `DomNode` is contained inside `Component`.

### nodeContainsNode(hostNode, targetNode): boolean
Returns if `targetNode` is contained inside `hostNode`. This is the same as Dom API `node.contains(anotherNode)`
    
### unsafe_portalsWithin(componentInstance): DomNodes[],
Returns all portals within

### unsafe_childNodesWithin(componentInstance): DomNodes[],
Returns all direct children of component

### unsafe_getFiberFromNode(DomNode): Fiber
Returns fiber(wrapped) for a node

# Example
```jsx

class MyComponent extends React.Component {
  componentDidMount() {
    document.body.addEventListener(
        'click',
        event => {
          if (instanceContainsNode(this, event.target)) {
            console.log('this event is somewhere inside me')
          } 
        }
    )    
  }

  render(){
    return (
      <React.Fragment>
        <div> local div </div>
        <Portal> portaled content </div> 
      </React.Fragment>
    )
  }
}

```

# License

MIT