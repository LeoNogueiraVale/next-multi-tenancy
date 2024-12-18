import { redirect } from "next/navigation";
import { saveSession } from "@/utils/session";
//import { redirect } from "next/dist/server/api-utils";

export async function loginAction(formData : FormData) {
  'use server';

  const {username,password} = Object.fromEntries (formData)

  const response = await fetch(`http://localhost:8000/auth/login` , {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({username,password})
  });

  if (response.ok) {
    const {token} = await response.json();
    console.log (token);
    await saveSession(token);
    redirect("/");
  }

}

export function LoginPage(){
  return (
    <form className="m-4" action={loginAction}>
      <h1 className="text-2xl font-bold">Login</h1>
      
      <div>
        <label className="block" htmlFor="">username</label>
        <input type="text" name="username" className="border p-2 w-full"/>
      </div>

      <div>
        <label className="block" htmlFor="">password</label>
        <input type="password" name="password" className="border p-2 w-full" />
      </div>

      <button className="bg-blue-500 text-white p-4 mt-1">Login</button>
    </form>
  )
}

export default LoginPage;