# HomeTown Web #

[Desktop](https://hometown.in)

## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start 
```

## Pm2 configuration

```bash
pm2 start npm --name "hometown-desktop" -i max -- start
```

## Port Details

- Runs production server on 8084 prot
- Dev Server runs on 3000 prot

## Nginx configuration

```bash
location / {
  proxy_pass http://127.0.0.1:8084;
  }

  location /service-worker.js {
    root {path}/static/dist/;
  }

  location ~ /dist/ {
    root {path}/static/;
  }

  # Any route containing a file extension (e.g. /devicesfile.js)
  location ~ ^.+\..+$ {
    try_files $uri =404;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
```
