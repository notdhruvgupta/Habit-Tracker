"use client"
import Navbar from "./components/Navbar";
import CreateHabit from "./components/CreateHabit";
import Habits from "./components/Habits";


export default function Home() {
    return (
        <div>
            <Navbar auth={false} />
            <CreateHabit />
            <Habits />
        </div>
    );
}
