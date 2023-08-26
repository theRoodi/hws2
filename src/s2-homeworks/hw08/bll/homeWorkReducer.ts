import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const copy = [...state]
            if (action.payload === 'up') {
                copy.sort((a,b) => (a.name > b.name) ? 1 : -1 )
            } else {
                copy.sort((a,b) => (a.name > b.name) ? -1 : 1 )
            }
            return copy // need to fix
        }
        case 'check': {
            const copy = [...state]
            return copy.filter(u => u.age > action.payload)
            // need to fix
        }
        default:
            return state
    }
}