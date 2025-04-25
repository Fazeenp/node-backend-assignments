const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.method=='GET'){
        res.writeHead(200,{'Content-type':'text/plain'})
        res.end('Hello, Node.js');
    }
    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(3000,()=>{
    console.log('Server is listening on port 3000')
})

