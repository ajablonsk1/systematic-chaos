import { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import { ImageContainer } from '../../../general/ImagesGallery/ImagesGalleryStyle'

export function BackgroundImagePicker(props) {
  const [layout, setLayout] = useState(undefined)
  const [imagesHeight, setImagesHeight] = useState([])
  const [rowHeight, setRowHeight] = useState(undefined)

  const pickImageId = (imageId) => {
    props.setFieldValue('imageId', imageId)
  }

  useEffect(() => {
    setImagesHeight(Array(props.images.length).fill(0))

    props.images.forEach((image, index) => {
      const img = new Image()
      img.src = image.url
      img.onload = (e) => {
        const scaledWidth = Math.floor(props.width / props.cols)
        const scaledHeight = Math.floor((e.target.height * scaledWidth) / e.target.width)

        setImagesHeight((prevState) => prevState.map((value, i) => (i === index ? scaledHeight : value)))
      }
    })
  }, [props])

  useEffect(() => {
    if (!imagesHeight.includes(0)) {
      setRowHeight(...imagesHeight)
    }
  }, [imagesHeight])

  useEffect(() => {
    if (rowHeight) {
      const layoutConfig = props.images.map((url, index) => {
        const rowNumber = props.cols > 0 ? Math.floor(index / props.cols) : 1

        return {
          i: index.toString(),
          x: index % props.cols,
          y: index >= props.cols ? imagesHeight[index - props.cols] + rowNumber : 0,
          w: 1,
          h: imagesHeight[index] > 0 && rowHeight > 0 ? Math.ceil(imagesHeight[index] / rowHeight) : 1
        }
      })

      setLayout(layoutConfig)
    }
  }, [rowHeight, imagesHeight, props.images, props.cols])

  if (!layout || !rowHeight) {
    return null
  } else {
    return (
      <GridLayout
        cols={props.cols}
        width={props.width}
        height={'100%'}
        rowHeight={rowHeight > 0 ? rowHeight : props.width}
        className='layout'
        layout={layout}
        isDraggable={false}
      >
        {props.images.map((image) => (
          <ImageContainer
            key={image.id}
            style={
              props.pickedImage === image.id
                ? { border: '2px solid rgba(0, 179, 16, 0.5)', padding: '5px' }
                : { border: 'none' }
            }
          >
            <img
              className={'p-3'}
              width={'100%'}
              height={'100%'}
              src={image.url}
              alt={'select-background'}
              onClick={() => pickImageId(image.id)}
            />
          </ImageContainer>
        ))}
      </GridLayout>
    )
  }
}
