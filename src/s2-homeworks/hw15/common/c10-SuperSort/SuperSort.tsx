import React from 'react'
import upIco from '../assets/up.png'
import downIco from '../assets/down.png'
import noneIco from '../assets/none.png'
import s from '../../HW15.module.css'
// добавить в проект иконки и импортировать
const downIcon = downIco
const upIcon = upIco
const noneIcon = noneIco

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
    return sort === down ? up : sort === up ? '' : down
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            <img
                id={id + '-icon-' + sort}
                src={icon}
                className={icon === noneIcon ? s.imgNone : s.imgSort}
            />
        </span>
    )
}

export default SuperSort
