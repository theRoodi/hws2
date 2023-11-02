const initState: InitType = {
    themeId: 1
}

export type InitType = {
    themeId: number
}


type SetThemeType = {
    type: 'SET_THEME_ID'
    id: number
}

export type ActionType = SetThemeType

export const themeReducer = (state = initState, action: ActionType): InitType => { // fix any
    switch (action.type) {

        // дописать
        case 'SET_THEME_ID': {
            return {
                ...state,
                themeId: Number(action.id)

            }
        }

        default:
            return state
    }
}

export const changeThemeId = (id: number): SetThemeType => ({type: 'SET_THEME_ID', id} as const) // fix any