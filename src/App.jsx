import { ApplicationContext } from './context/Application.context';
import AudioPlayer from './components/AudioPlayer';
import { useReducer } from 'react';
import reducer, { initialState } from './utils/reducer';
import Navigator from './components/Navigator';
import { AnimatePresence } from 'framer-motion';
import Playlist from './components/Playlist';
import RenderArtist from './components/RenderArtist';

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <main className="bg-gray-800 h-screen w-screen flex flex-col text-white">
        <AnimatePresence>
            <ApplicationContext.Provider
                value={{
                    state, dispatch
                }}
            >
                <Navigator />

                <section className='flex-1 overflow-y-scroll p-5 flex'>
                    <Playlist />

                    <RenderArtist />
                </section>

                <AudioPlayer />
            </ApplicationContext.Provider>
        </AnimatePresence>
    </main>
}