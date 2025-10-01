import CreateHabit from '@/components/habits/CreateHabit'
import Habits from '@/components/habits/Habits'
import React from 'react'

function HabitPage() {
  return (
    <div>
        <CreateHabit />
        <Habits/>
    </div>
  )
}

export default HabitPage