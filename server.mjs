import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(import.meta.dirname,'public');
const types={'.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.mp4':'video/mp4','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.otf':'font/otf','.ttf':'font/ttf','.xml':'application/xml','.txt':'text/plain'};
createServer(async(req,res)=>{try{
const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
if(path==='/health'){res.writeHead(200);res.end('ok');return;}
if(path==='/gpdevendas'){res.writeHead(301,{Location:'/'});res.end();return;}
const file=resolve(root,'.'+(path==='/'?'/index.html':path));
if(file.startsWith(root+sep)&&types[extname(file)]){const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)],'X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);return;}
}catch{}res.writeHead(404);res.end('Página não encontrada');}).listen(Number(process.env.PORT||3000),'0.0.0.0');
