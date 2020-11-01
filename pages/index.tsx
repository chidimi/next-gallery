import { AppBar } from '@material-ui/core';
import Container from '@material-ui/core/Container/Container';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DenseAppBar from '../components/Appbar';
import ButtonAppBar from '../components/Appbar';
import Navbar from '../components/Navbar';
import NavTabs from '../components/Tab';
import CenteredTabs from '../components/Tab';
import * as firebase from 'firebase/app'
import ImageList from '../components/ImageList';

const Gallery = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(acceptedFiles => { 
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const onFormSubmit = () => {}

  const onChange = () => {}

  const storage = firebase.storage()
  const storageRef = storage.ref()
  const imagesRef = storageRef.child('images/')

  const getImageUrl = (imageRef) => {
    imageRef.getDownloadURL().then((url) => {
      return url
    }).catch((error) => {
      console.log("error")
    })
  }
  const urls = [];

  useEffect(() => {imagesRef.listAll().then((result) => {
    result.items.forEach((imageRef) => {
      urls.push(getImageUrl(imageRef))
    })
  }).catch((error) => {
    console.log('error')
  }), [urls]})

  return (
      <>
      <DenseAppBar />
          <Container maxWidth="md">
            <img src={file}></img>
            <div className="container" {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
            <ImageList urls={urls}/>
            </div>
        </Container>
    </>
  );
};

export default Gallery;
