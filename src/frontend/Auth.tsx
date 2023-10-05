import { FormEvent, useEffect, useState } from 'react'
import { remult, UserInfo } from 'remult'
import App from './App'

export default function Auth() {
  const [signInUsername, setSignInUsername] = useState('')
  const [currentUser, setCurrentUser] = useState<UserInfo>()
  const [showSignIn, setShowSignIn] = useState(false)
  remult.user = currentUser

  async function signIn(f: FormEvent) {
    f.preventDefault()
    const result = await fetch('/api/signIn', {
      method: 'POST',
      body: JSON.stringify({ username: signInUsername }),
    })
    if (result.ok) {
      setCurrentUser(await result.json())
      setSignInUsername('')
      setShowSignIn(false)
    } else alert(await result.json())
  }
  async function signOut() {
    await fetch('/api/signOut', {
      method: 'POST',
    })
    setCurrentUser(undefined)
    setShowSignIn(true)
  }
  useEffect(() => {
    fetch('/api/currentUser')
      .then((r) => r.json())
      .then(async (currentUserFromServer) => {
        setCurrentUser(currentUserFromServer)
      })
  }, [])

  if (showSignIn)
    return (
      <>
        <main className="sign-in">
          <h2>Sign In</h2>
          <form>
            <label>Name</label>
            <input
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
              placeholder="Try Steve or Jane"
            />
            <button onClick={signIn}>Sign in</button>
          </form>
        </main>
      </>
    )
  return (
    <>
      {currentUser ? (
        <div>
          Hello {currentUser?.name} <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setShowSignIn(true)}>Sign In</button>
        </div>
      )}
      <App />
    </>
  )
}
