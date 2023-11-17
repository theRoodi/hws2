import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

const getTechs = (params: any) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }, any>(
            'https://samurai.it-incubator.io/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [isLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = async (params: any) => {
        setLoading(true)
        getTechs(params)
            .then(res => {
                setTechs(res.data.techs)
                setTotalCount(res.data.totalCount)
                setLoading(false)
            })
        // сохранить пришедшие данные
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage)
        setCount(newCount)
        // setPage(
        // setCount(
        sendQuery({page: newPage, count: newCount})
        // sendQuery(
        // setSearchParams(
        setSearchParams({page: newPage.toString(), count: newCount.toString()})
        //
    }

    const onChangeSort = (newSort: string) => {
        // делает студент

        // setSort(
        setSort(newSort)
        setPage(1) // при сортировке сбрасывать на 1 страницу

        // sendQuery(
        sendQuery({page: 1, count, sort: newSort})
        // setSearchParams(
        setSearchParams({page: page.toString(), count: count.toString()})
        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'} className={s2.hw}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {isLoading && <div id={'hw15-loading'}
                                   className={s.loadingBackground}>
                    <div id={'hw15-loading'} className={s.loading}></div>
                </div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        Tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        Developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15
