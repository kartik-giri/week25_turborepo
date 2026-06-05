## Production branch vs Dev/main branch
1. With usign only mmain branch as the production brach the Porblem is that what if any junior dev send the push request than CI will test the commit and CD will deploy the junior dev commit directly on production VM which can some time leads to production if crash CI hasn't tested the new commit carefully.
2. SO the solution is that main branch will deploy new commits on dev server. 
   And create new Prodcution branch which will deploy on production server. by merging main branch with production branch if main/dev branch is tested for some time. is called preiodic releases on production branch.

3. Most VPSs are VMs. But not all VMs are VPSs
   VPS -> Virtual private server are usualy the virtual machine which are used to host processes. for example AWS EC2
   Not every VM is used to host services for example github runner uses VM to exexute jobs on it's VM. E2B.dev VM are used for executing agents tasks.

4. Usually when I work in company we have 3 branches:-
   Dev -> for devs after 2-3 days merged with staging branch to test features
   Staging -> for testers after testing pushed on production
   Production -> 

   git switch main -> to switch branch
   git merge main -> to merge main branch to prodcution branch/current branch
5. git checkout -b <branch-name> -> to create new branch
   git checkout -b production -> creates production branch
6. git branch -r -> to see branches on remote github server.
   git branch -l -> to see all local branches in my local machine
7. origin is just the default name for the remote repository.
Example:
origin
   ↓
https://github.com/your/repo.git

8. git push origin HEAD -> Take the branch I'm currently on and push it to origin.
   origin means -> the remote repo name -> https://github.com/your/repo.git
   HEAD -> means "The commit/branch I am currently on"

9. 1. Create 2 separate VMS 1 for dev and 2nd for production.Cause we want to keep dev environment completely sperare from production environment.
   2. Add bun. nginx as reverse proxy to both servers
   3. Clone the monorepo to both servers
   4. Start 3 processes(next,ws,http)
   5. Point out Domains name to the respectie servers. 

10. DEPLOYING BUN TURBOREPO ON EC2/VM
    1. sudo apt update && sudo apt install unzip -y -> need to unzip bun installation.
    2. curl -fsSL https://bun.com/install | bash -> install bun 
    3. source /home/ubuntu/.bashrc  -> source bun

    4. Install Nginx
    5. sudo apt update
       sudo apt install nginx -y

11. DNS the domain for staging/dev server and prod server.
    
    Production DNS:
    inklfow.site
    http.inkflow.site
    ws.inklfow.site

    Dev/staginf DNS
    staging.inklfow.site
    staging.http.inkflow.site
    staging.ws.inklfow.site

12. Clone the repo on both server
13. Create DB for both prod and dev envrionment.
14. Add both DB url separately in prod and dev VM
15. Migrate scheema and than create client on both VM

16. Now start our next,ws,http server on both machines
17. bun add -g pm2 on both VM install process manager
    pm2 is node project which needs node as runtime engine so that it canbe run.
    To install node on Ec2 ubuntu
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
18. pm2 start bun --name "http-server" -- start -> to start process
19. pm2 logs "process name" --lines 50 -> return s the process logs
20. Https server was ruunning on port 3000 and next server also wanted 3000 port to run that's why it gave error i modify the start script  "start": "next start -p 3001".
21. And rerun the process pm2 restart "process name" 
22. Start all the process using pm2

23. Config Nginx for routing traffic from specific domain to specific process accordingly.
24. Nginx config file for production VM.
```javascript
http {
	server {
    listen 80;
    server_name inkflow.click;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}

    server {
    listen 80;
    server_name ws.inkflow.click;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}

    server {
    listen 80;
    server_name http.inkflow.click;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}
}
```

25. For development VM
```javascript
http {
	server {
    listen 80;
    server_name staging.inkflow.click;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}

    server {
    listen 80;
    server_name staging.ws.inkflow.click;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}

    server {
    listen 80;
    server_name staging.http.inkflow.click;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}
}
```

26. sudo nginx -s reload -> to reload nginx
27. Deployement of monorepo with mulitple processes is done.

18. Add production branch protection on github