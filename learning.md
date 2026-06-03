## Production branch vs Dev/main branch
1. With usign only mmain branch as the production brach the Porblem is that what if any junior dev send the push request than CI will test the commit and CD will deploy the junior dev commit directly on production VM which can some time leads to production if crash CI hasn't tested the new commit carefully.
2. SO the solution is that main branch will deploy new commits on dev server. 
   And create new Prodcution branch which will deploy on production server. by merging main branch ith production branch if main/dev branch is tested for some time.

3. Most VPSs are VMs. But not all VMs are VPSs
   VPS -> Virtual private server are usualy the vertual machine which are used to host processes. for example AWS EC2
   Not every VM is used to host services for example github runner uses VM to exexute jobs on it's VM. E2B.dev VM are used for executing agents tasks.