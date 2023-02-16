import { FormEvent, useEffect, useState } from 'react'
import { remult, UserInfo } from 'remult'

const Auth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [signInUsername, setSignInUsername] = useState('')
  const [currentUser, setCurrentUser] = useState<UserInfo>()

  const signIn = async (f: FormEvent) => {
    f.preventDefault()
    const result = await fetch('/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: signInUsername })
    })
    if (result.ok) {
      setCurrentUser(await result.json())
      setSignInUsername('')
    } else alert(await result.json())
  }
  const signOut = async () => {
    await fetch('/api/signOut', {
      method: 'POST'
    })
    setCurrentUser(undefined)
  }
  useEffect(() => {
    fetch('/api/currentUser')
      .then((r) => r.json())
      .then(async (currentUserFromServer) => {
        setCurrentUser(currentUserFromServer)
      })
  }, [])
  useEffect(() => {
    remult.user = currentUser
  }, [currentUser])

  if (!currentUser)
    return (
      <>
        <main>
          <form>
            <input
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
              placeholder="Username, try Steve or Jane"
            />
            <button onClick={signIn}>Sign in</button>
          </form>
        </main>
        <a href="https://www.github.com/remult/remult">give remult a ⭐</a>
      </>
    )
  return (
    <>
      <div>
        Hello {currentUser?.name} <button onClick={signOut}>Sign Out</button>
      </div>
      {children}
      <a href="https://www.github.com/remult/remult">give remult a ⭐</a>
    </>
  )
}
export default Auth
