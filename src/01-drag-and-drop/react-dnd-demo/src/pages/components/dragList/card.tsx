import React, {useRef} from 'react'
import {Tab} from '@material-ui/core'
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'

interface Props {
    id: any
    text: string
    index: number
    moveCard: (dragIndex: number, moveIndex: number) => void
}

interface DragItem {
    index: number
    type: string
    id: string
}

const Card: React.FC<Props> = (props: Props) => {
    const { id, text, index, moveCard }  = props;
    const ref = useRef<HTMLDivElement>(null)
    const [ {handlerId}, drop ] = useDrop({
        accept: 'card',
        collect(minotor) {
            return {
                handlerId: minotor.getHandlerId()
            }
        },
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if(!ref.current) {
                return;
            }
            const dragIndex = item.index
            const hoverIndex = index
            if(dragIndex === hoverIndex) {
                return
            }
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            if(hoverBoundingRect){
                const hoverMiddleX = (hoverBoundingRect?.right - hoverBoundingRect?.left) / 2
                const clientOffset = monitor.getClientOffset()
                const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect?.left
            }
   
            // draggingLeft
            // if( dragIndex > hoverIndex && hoverMiddleX  )

            // draggingRight
            moveCard(dragIndex, hoverIndex)
        }
    })

    const [{isDragging}, drag] = useDrag({
        type: 'card',
        item: () => {
            return {id, index}
        },
        collect(monitor: any) {
            return {
                isDragging: monitor.isDragging()
            }
        }
    })

    drag(drop(ref))
    return (
            <Tab ref={ref} label={text} value={id} data-handler-id={handlerId} style={{opacity: isDragging? 0: 1}}/>
    )
}

export default Card