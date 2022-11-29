import React from 'react'

const FileAttach = (props) => {
  const {
    className = '',
    name,
    onChange,
  } = props

  return (
    <input
      className={`${className} file-attach`}
      type="file"
      name={name}
      onChange={onChange}
    />
  )
}

export default FileAttach