# Server Sent Events POC

I wanted to evaluate the developer experience of using SSE for a scenario where you need to accept a POST, start some long-running process, and emit events via SSE to one client (per long-running process)

## Getting started
```
[1]$ yarn install
[1]$ yarn run tsc --watch
[2]$ node build/main.js 3000
``` 

This will start a server on port 3000. Visit http://localhost:3000 in your browser and you'll see the client POST, get its SSE URL, and connect to that URL.

If you `http post http://localhost:3000/pokes` then you'll see an incrementing counter message on each page. 
