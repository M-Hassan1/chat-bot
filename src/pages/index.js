import MainPage from '@/components/Main/MainPage'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
      return(
      <div>
        <MainPage />
      </div>
    )
}
