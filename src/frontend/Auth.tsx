import { FormEvent, useEffect, useState } from 'react'
import { remult, UserInfo } from 'remult'
import Todo from './Todo'

export default function Auth() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [signInUsername, setSignInUsername] = useState('')
  const [currentUser, setCurrentUser] = useState<UserInfo>()
  remult.user = currentUser

  async function signIn(f: FormEvent) {
    f.preventDefault()
    const result = await fetch('/api/signIn', {
      method: 'POST',
      body: JSON.stringify({ username: signInUsername }),
    })
    if (result.ok) {
      setShowSignIn(false)
      setCurrentUser(await result.json())
      setSignInUsername('')
    } else alert(await result.json())
  }
  async function signOut() {
    await fetch('/api/signOut', {
      method: 'POST',
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

  return (
    <>
      {!currentUser ? (
        !showSignIn && (
          <div>
            <span></span>
            <button onClick={() => setShowSignIn(true)}>Sign In</button>
          </div>
        )
      ) : (
        <div>
          Hello {currentUser?.name} <button onClick={signOut}>Sign Out</button>
        </div>
      )}
      {showSignIn ? (
        <>
          <main style={{ maxWidth: '384px', padding: '16px' }}>
            <h2>Sign In</h2>
            <form
              style={{
                gap: '16px',
                padding: '0',
                flexDirection: 'column',
                border: '0',
              }}
            >
              <label style={{ width: '100%' }}>Name</label>
              <input
                style={{
                  border: '1px solid rgb(209, 213, 219)',
                  background: 'rgb(249, 250, 251)',
                  borderRadius: '8px',
                  width: '100%',
                }}
                value={signInUsername}
                onChange={(e) => setSignInUsername(e.target.value)}
                placeholder="Try Steve or Jane"
              />

              <button
                onClick={signIn}
                style={{
                  width: '100%',
                  backgroundColor: 'rgb(37, 99, 235)',
                  color: 'white',
                }}
              >
                Sign in
              </button>
            </form>
          </main>
        </>
      ) : (
        <>
          <h1>todos</h1>
          <Todo />
        </>
      )}
    </>
  )
}
