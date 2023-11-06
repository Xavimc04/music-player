export const initialState = {
    volume: 0.2,
    isPlaying: false,
    seek: 0, 
    duration: 0,
    availableAudios: [],
    song: null
}

export default function reducer(state, action) {
    if(action.type === 'SET_VOLUME') {
        if(action.payload < 0) action.payload = 0;
        if(action.payload > 1) action.payload = 1;

        return {
            ...state,
            volume: action.payload
        }
    }

    if(action.type === 'SET_AVAILABLE_AUDIOS') {
        return {
            ...state,
            availableAudios: action.payload
        }
    }

    if(action.type === 'NEXT_SONG') {
        let index = state.availableAudios.indexOf(state.song);
        if(index === state.availableAudios.length - 1) index = -1;

        return {
            ...state,
            isPlaying: true,
            seek: 0, 
            duration: 0,
            song: (index + 1) < state.availableAudios.length ? state.availableAudios[index + 1] : state.availableAudios[0]
        }
    }

    if(action.type === 'PREV_SONG') {
        let index = state.availableAudios.indexOf(state.song);
        if(index === 0) index = state.availableAudios.length;

        return {
            ...state,
            isPlaying: true,
            seek: 0, 
            duration: 0,
            song: (index - 1) >= 0 ? state.availableAudios[index - 1] : state.availableAudios[state.availableAudios.length - 1]
        }
    }

    if(action.type === 'SET_IS_PLAYING') {
        return {
            ...state,
            isPlaying: action.payload
        }
    }

    if(action.type === 'SET_SONG') {
        return {
            ...state,
            isPlaying: true,
            seek: 0, 
            duration: 0,
            song: action.payload
        }
    }

    if(action.type === 'SET_SONG_PARAMS') {
        return {
            ...state,
            duration: action.payload.duration,
            seek: action.payload.seek
        }
    }

    return state; 
}