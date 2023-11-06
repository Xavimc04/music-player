import { useContext, useEffect, useRef } from 'react'
import ReactHowler from 'react-howler'
import { ApplicationContext } from '../context/Application.context';

export default function AudioPlayer() {
    const { state, dispatch } = useContext(ApplicationContext)
    const audioRef = useRef(null)

    let intervalId;

    useEffect(() => {
        if (!audioRef || !audioRef.current) return;

        const intervalFunction = () => {
            let seek = audioRef.current.seek();
            let duration = audioRef.current.duration();

            if (duration && seek && duration > 0) {
                dispatch({
                    type: 'SET_SONG_PARAMS',
                    payload: {
                        duration,
                        seek
                    }
                });
            }
        };

        if (state.isPlaying) {
            intervalId = setInterval(intervalFunction, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [state.isPlaying, state.song, audioRef]);

    const formatTime = (duration) => {
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;
    
        let ret = "";
    
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
    
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
    
        return ret;
    }

    return <div className='p-5 flex items-center border-t border-gray-700'>
        <section className='flex items-center w-[25%]'>
            {
                state.song && state.song.src && <span onClick={() => {
                    dispatch({
                        type: 'SET_IS_PLAYING', 
                        payload: !state.isPlaying
                    })
                }} className='material-symbols-outlined pr-5 cursor-pointer hover:text-gray-600'>
                    { state.isPlaying ? 'pause_circle' : 'play_circle' }
                </span>
            }

            <p className='pr-5 text-ellipsis truncate'>
                { 
                    state.song && state.song.name ? state.song.name : 'Sin canción seleccionada' 
                }
            </p>
        </section>

        <section className='w-[50%] flex items-center justify-center gap-3 select-none'>
            {
                state.song ? <>
                    <span onClick={() => dispatch({
                        type: 'PREV_SONG'
                    })} className='material-symbols-outlined cursor-pointer hover:text-gray-500 transition-all'>
                        skip_previous
                    </span>

                    {
                        state.seek && state.duration && !state.song.freq ? <>
                            { formatTime(state.seek) }

                            <div className='flex h-[5px] bg-gray-900 rounded w-[300px]'>
                                <div className='h-full rounded transition-all' style={{
                                    width: `${ state.seek * 100 / state.duration }%`, 
                                    backgroundColor: '#ff4558'
                                }}></div>
                            </div>

                            { formatTime(state.duration) }
                        </> : null
                    }

                    <span onClick={() => dispatch({
                        type: 'NEXT_SONG'
                    })} className='material-symbols-outlined cursor-pointer hover:text-gray-500 transition-all'>
                        skip_next
                    </span>
                </> : null
            }
        </section>

        <section className='w-[25%] flex items-center gap-3 justify-end'>
            <span className='material-symbols-outlined cursor-pointer hover:text-gray-500 transition-all'>
                volume_up
            </span>

            <input 
                type='range' 
                className='w-[100px] h-[2px] bg-gray-700 rounded-full cursor-pointer'
                value={ state.volume }
                min={ 0 }
                max={ 1 }
                step={ 0.05 }
                onInput={ event => { 
                    dispatch({
                        type: 'SET_VOLUME',
                        payload: Number(event.target.value)
                    })
                }}
            />
        </section>

        {
            state.song && state.song.src && <ReactHowler 
                src={ state.song.freq ? state.song.src : `/audios/${ state.song.src }.mp3` } 
                playing={ state.isPlaying }
                volume={ state.volume }
                html5={ true }
                ref={(ref) => audioRef.current = ref }
            ></ReactHowler>
        }
    </div>
}