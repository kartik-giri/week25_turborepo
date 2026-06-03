import { prisma } from "@repo/db"

const Home = async ()=>{
  const user = await prisma.user.findFirst()
  return (
    <>
    {/* ? option chaning means if user exist render user if null or undefined just redner undefined */}
    <h1>{user?.username}</h1> 
    <h1>{user?.email}</h1>
    </>
  )
}

export default Home