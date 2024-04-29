'use client';
import type { Session } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import ModalCore from './modalCore';
import { ModalType } from './modal/modalType';
import { useRouter } from 'next/navigation';

const Navigation = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  if(!session) {
    router.push('/login');
  }

  const user = session?.user?.email
  
  return (
    <header>
      <div className="flex items-center w-full justify-between px-4 py-2 bg-white shadow-md">
        <nav className="flex space-x-4">
          <div>
            <Link className="text-gray-600 hover:text-blue-600" href="/">
              Home
            </Link>
          </div>
          {session ? (
            <>
              <div className="text-gray-600 hover:text-blue-600">
                <form action="/auth/logout" method="post">
                  <button 
                    type="submit"
                  >
                    ログアウト
                  </button>
                </form>
              </div>
              <div>
                <p>{user}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <ModalCore modalType={ModalType.SignIn}></ModalCore>
              </div>
              <div>
                <ModalCore modalType={ModalType.SignUp}></ModalCore>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navigation
