import { useState, useRef } from 'react'
import useFetch from 'use-http'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styles from './Upload.module.css'
import { AddPhotoAlternate } from '@mui/icons-material'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify"

const Upload = ({ images, setImages }) => {

    //STATE IMAGE
    const [checkedImages, setCheckedImages] = useState([])

    //USEFETCH
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, response, loading } = useFetch(`${process.env.REACT_APP_URL}/upload`, options)

    const fileInputRef = useRef();

    const imageHandlerChange = async e => {
        const inputImages = e.target.files
        const arrayImages = Array.from(inputImages)

        if (!inputImages) return
        if (arrayImages.length > 2 || images.length >= 2) {
            toast.warn(`The limit of images is 2 per post`)
            return
        }
        //APPEND FORM DATA
        const data = new FormData()
        arrayImages.map(image => {
            if (image.size > 4024000) {
                toast.warn("The file cant be bigger than 4mb")
                return
            }
            data.append('images', image, image.name)
        })

        //API CALL
        const resp = await post(data)
        if (response.ok) setImages(prev => prev.concat(resp.images))
    }


    const checkImage = (e, data) => {
        if (e.target.checked) setCheckedImages(prev => [...prev, data])
        else setCheckedImages(prev => prev.filter(image => image !== data))
    }

    const deleteSelected = async () => {

        await post('delete', { checkedImages })

        if (response.ok) {
            checkedImages.map(checkedImage => {
                setImages(prev => prev.filter(image => image !== checkedImage))
            })
            setCheckedImages([])
        }
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return
        const items = Array.from(images)
        const [reOrderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reOrderedItem)
        setImages(items)
    }


    return (
        <>
            <input ref={fileInputRef} hidden type='file' id="files" accept="image/png, image/jpeg" multiple onChange={imageHandlerChange} />
            <div className={styles.buttonInput} onClick={() => fileInputRef.current.click()}>
                {loading ? <ClipLoader color='white' size={25} /> : <AddPhotoAlternate />}
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="a" direction="horizontal">
                    {(provided, snapshot) => (
                        <ul className={`${styles.containerPrev} ${snapshot.isDraggingOver && styles.isDraggingOver}`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>

                            {images && images.map((image, i) => (
                                <Draggable key={i} draggableId={JSON.stringify(i)} index={i}>
                                    {(provided, snapshot) => (
                                        <li className={`${styles.prevImage} ${snapshot.isDragging && styles.isDragging}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <img src={image} className={styles.img} />
                                            <div className={styles.containerCheckBox}>
                                                <input type="checkbox" onChange={(e) => checkImage(e, image)} />
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {checkedImages.length !== 0 && <div className={styles.selectedImages} onClick={deleteSelected}>Delete Selected</div>}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default Upload