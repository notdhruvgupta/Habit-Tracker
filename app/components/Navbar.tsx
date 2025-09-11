import { User } from 'lucide-react'
import React from 'react'

function Navbar() {
  return (
    <div className='flex text-white glow-white bg-linear-to-b from-white/20 to-white/50 border-white/10 rounded-[8px] p-[0.8px] items-center'>
        <div className='flex justify-between items-center w-full bg-radial-bw p-3 rounded-[7.2px]'>
            <div className='text-xl font-semibold'>Habit Tracker</div>
            <button className='flex gap-1.5'>
                <User />
            </button>
        </div>
    </div>
  )
}

export default Navbar