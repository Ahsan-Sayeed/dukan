'use client'
import Drawer from "@/Components/Drawer/Drawer";
import HistoryContainer from "./(history_content)/historyConainer/HistoryContainer";

export default function History() {

    return (
        <div>
            <Drawer>
                <div className='w-full'>
                    <h1 className='text-4xl subpixel-antialiased font-sans font-thin m-5'>History</h1>
                    <HistoryContainer />
                </div>
            </Drawer>
        </div>
    )
}
