import { useContext } from "react"
import { ApplicationContext } from "../context/Application.context"
import { motion } from 'framer-motion';

export default function RenderArtist() {
    const { state } = useContext(ApplicationContext); 

    if(!state.song || !state.song.artists) return; 

    return <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
        className="ml-5 w-[350px] flex flex-col gap-3 h-full overflow-y-scroll"
    >
        {
            state.song.artists.map((artist, index) => {
                return <div key={ index } className="flex group flex-col relative items-center border-gray-700">
                    <img 
                        className="w-[full] h-[full] rounded"
                        src={ artist.picture }
                        onError={ (event) => {
                            event.target.style.display = 'none'
                        }}
                    />

                    <section className="absolute z-20 hidden group-hover:flex h-full w-full items-center justify-center select-none cursor-pointer bg-gray-800/90 transition-all" style={{
                        textShadow: '0px 0px 10px rgba(0,0,0,0.5)'
                    }}>
                        <h2>{ artist.name }</h2>
                    </section>
                </div>
            })
        }
    </motion.div>
}