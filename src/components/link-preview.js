import React from 'react'
import Microlink from '@microlink/react'

const style = {
  fontFamily: 'Courier New, monospace',
  backgroundColor: '#333333',
  color: 'white',
  border: 'none',
  margin: '10px 0',
}

const LinkPreview = props => <Microlink {...props} style={style} />

export default LinkPreview
