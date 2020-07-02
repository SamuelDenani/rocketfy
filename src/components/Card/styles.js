import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 5px;
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  padding: 15px;
  margin-bottom: 10px;
  cursor: grab;
  header {
    position: absolute;
    top: -22px;
    left: 15px;
  }
  p {
    font-weight: 500;
    line-height: 20px;
  }
  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 5px;
  }

  ${props => props.isDragging && css`
    background: transparent;
    border: 2px dashed rgba(0, 0, 0, 0.2);
    border-radius: 0;
    box-shadow: none;
    padding-top: 31px;
    cursor: grabbing;
    p, img, header {
      opacity: 0;
    }
  `}
`

export const Label = styled.span`
  display: inline-block;
  background: ${props => props.color};
  border-radius: 2px;
  width: 12px;
  height: 12px;
`