import { cookies } from "next/headers";

export default function Home() {
  const data = cookies().get('authToken')
  const user = cookies().get('user')
  const token = data?.value
  const userData: string | undefined = user?.value

  const json = userData ? JSON.parse(userData) : ''

  console.log(token);


  return (
    <div>
      {/* <p>
        Value
      </p> */}
      {/* <div>
        {token}
      </div> */}
      <p>
        Data
      </p>
      <div className="overflow-auto w-screen">
        {userData}
      </div>
      {json?.username}
    </div>
  );
}
