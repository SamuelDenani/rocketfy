import React, { useRef, useContext } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import BoardContext from '../Board/context'

import { Container, Label } from './styles'

function Card({ data, listIndex, index }) {
  const ref = useRef()
  const { move } = useContext(BoardContext)

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'CARD',
      index,
      listIndex
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      const draggedListIndex = item.listIndex
      const targetListIndex = listIndex
      const draggedIndex = item.index 
      const targetIndex = index

      if (draggedIndex === targetIndex && listIndex === targetListIndex) return
      
      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2
      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset.y - targetSize.top
      
      if (draggedIndex < targetIndex && draggedTop < targetCenter) return
      
      if (draggedIndex > targetIndex && draggedTop > targetCenter) return

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex)

      item.index = targetIndex
      item.listIndex = targetListIndex
    }
  })

  dragRef(dropRef(ref))

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        { data.labels.map(color => <Label key={color} color={color} />)}
      </header>
      <p>{ data.content }</p>
      { data.user && <img src={data.user} alt="Random"/>}
    </Container>
  )
}

export default Card