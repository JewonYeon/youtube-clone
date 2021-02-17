// import express from 'express';

const http = require('http');
const fs = require('fs');
// let data = fs.readFileSync('data.json', 'utf8');
// console.log(data);

let saveData = {};

fs.readFile('src/server/data.json', 'utf8', (err, data) => {
  if (err) throw err;
  saveData = JSON.parse(data);
})

http.createServer((request, response) => {
  const headers = defaultCorsHeaders;
  headers["Content-Type"] = "application/json";

  if(request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end();
  }

  if(request.method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(saveData.commentList));
  }
  else if(request.method === 'POST') {
    let body = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
        console.log(saveData);
      saveData[0].commentList.push(JSON.parse(body));
      fs.writeFile('src/server/data.json', JSON.stringify(saveData), 'utf8', (err, data) => {
        if (err) throw err;
      })
      response.on('error', (err) => {
        console.error(err);
      });
    response.writeHead(200, headers);
    response.end(JSON.stringify('hi'))
  });
  } else {
    response.writeHead(404, headers);
    response.end(JSON.stringify('bye'))
  }
}).listen(3000);

const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};