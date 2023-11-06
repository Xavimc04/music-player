import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ApplicationContext } from '../context/Application.context';

export default function Playlist() {
    const { state, dispatch } = useContext(ApplicationContext); 
    const [filter, setFilter] = useState('');
    
    useEffect(() => {
        axios.get('/songs.json').then(response => {
            if(response.status != 200) return console.log("¡Vaya! No se han podido recoger las canciones.") 

            dispatch({
                type: 'SET_AVAILABLE_AUDIOS',
                payload: response.data
            })
        }).catch(error => console.log(error))
    }, [])

    return <div 
        className='flex flex-col gap-3 flex-1'
    >
        <section className='flex bg-gray-700 rounded items-center gap-3 px-3 py-2 text-gray-800'>
            <span className='material-symbols-outlined'>search</span>

            <input
                type='text'
                value={ filter }
                onChange={ event => setFilter(event.target.value) }
                placeholder='Buscar canción...'
                className='bg-transparent flex-1 outline-none text-white'
            />
        </section>

        <section 
            className='flex flex-col gap-3 overflow-y-scroll'
        >
            {
                state.availableAudios && state.availableAudios.filter(song => song.name.toLowerCase().includes(filter.toLowerCase())).map((song, index) => {
                    return <div
                        className='bg-gray-900 px-5 py-3 rounded flex items-center gap-3 select-none transition-all'
                        key={ index }
                    >
                        <img 
                            className='rounded-full border p-1 w-[40px] h-[40px]'
                            src={ song.poster ? song.poster : 'https://images5.alphacoders.com/348/348697.jpg' }
                        />

                        <section className='flex flex-col'>
                            <h2>{ song.name }</h2>
                            <small className='text-gray-500'>{ song.artists ? song.artists.map(artist => artist.name).join(', ') : song.freq ? song.freq : 'Desconocido' }</small>
                        </section>

                        <section className='flex-1 flex justify-end gap-3'>
                            <span 
                                onClick={() => {
                                    if(state.song && state.song.src == song.src) {
                                        dispatch({
                                            type: 'SET_IS_PLAYING', 
                                            payload: !state.isPlaying
                                        })
                                    } else {
                                        dispatch({
                                            type: 'SET_SONG',
                                            payload: song
                                        })
                                    }
                                }}
                                className='material-symbols-outlined cursor-pointer hover:text-gray-500 transition-all'
                            >
                                {
                                    !state.song || state.song.src != song.src ? 'play_circle' : state.isPlaying ? 'pause_circle' : 'play_circle'
                                }
                            </span>
                        </section>
                    </div>
                })
            }
        </section>
    </div>
}