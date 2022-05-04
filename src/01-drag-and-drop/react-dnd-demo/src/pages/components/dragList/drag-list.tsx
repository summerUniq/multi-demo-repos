import React, { useState, useCallback } from 'react'
import {Tabs, Tab} from '@material-ui/core'
import update from 'immutability-helper'
import Card from './card'

const data = [
    {
        id: 1,
        text: '1-write',
      },
      {
        id: 2,
        text: '2- Make it',
      },
      {
        id: 3,
        text: '3-Write README',
      },
      {
        id: 4,
        text: '4-Create some examples',
      },
      {
        id: 5,
        text: '5-Spam in Twitter',
      },
      {
        id: 6,
        text: '6-hear oyou',
      },
      {
        id: 7,
        text: '7-PROFIT',
      },
]

const  DragList: React.FC = () => {
    const [list, setList] = useState(data)
    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            console.log('dragIndex', dragIndex);
            console.log('hoverIndex', hoverIndex);

            
            const dragCard = list[dragIndex]
            setList(update(list, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }))
        },
        [list],
    )

    const renderTab = (tab: { id: number, text: string }, index) => {
        return (
            <Card key={tab.id} index={index} id={tab.id} text={tab.text} moveCard={moveCard} />
        )
    }
    return (
            <Tabs value={1}>
            {list.map((v, i) => renderTab(v, i))}
            </Tabs>
    )
}


export default DragList