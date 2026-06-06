export const dynamic = 'force-dynamic';
import { prisma } from "@repo/db"

const Home = async ()=>{
  const user = await prisma.user.findFirst()
  return (
    <>
    <h1>Deploying on EC2 VM after updating .</h1>
    {/* ? option chaning means if user exist render user if null or undefined just redner undefined */}
    <h1>Namee: {user?.username}</h1> 
    <h1>Password : {user?.email}</h1>
    </>
  )
}

export default Home
