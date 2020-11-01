import Container from '@material-ui/core/Container/Container';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DenseAppBar from '../components/Appbar';
import ImageList from '../components/ImageList';
import Button from '@material-ui/core/Button/Button';

type MyFile = File & {
  preview: string;
}

const Gallery = () => {

  const [files, setFiles] = useState<MyFile[]>([]);
  const [urlState, setUrlState] = useState([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('onDrop');

    // previewの追加
    setFiles(acceptedFiles.map(
      file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

  }, [])

    const onUpload = async () => {
      console.log('onUpload start');
  
      // ローディングをOn。progressを初期化
      setUploading(true);
      setProgress(0);
  
      function uploadImageAsPromise(file) {
        console.log('uploadImageAsPromise start');
  
        // アップロード先のファイルパスの作成
        const file_name = file.name;
        const storageRef = firebase.storage().ref().child('images/' + file_name);
  
        return new Promise(function (resolve, reject) {
          //Upload file
          var task = storageRef.put(file);
  
          //Update progress bar
          task.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function progress(snapshot) {
              var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(percent + "% done");
            },
            function error(err) { // 失敗時
              console.log("upload error");
              reject(err);
            },
            function complete() { // 成功時
              console.log('upload complete.');
              task.then(function (snapshot: firebase.storage.UploadTaskSnapshot) {
                resolve(snapshot.ref.getDownloadURL());
              })
            }
          );
  
        }).then(function (downloadURL) {
          console.log("Finished uploading file: " + file_name);
  
          // progressを更新する
          setProgress(oldProgress => (oldProgress + 1));
          return downloadURL;
        }).catch(function () {
          console.log("Error:uploadImageAsPromise");
        });
      }
  
      // 複数のファイルアップロードをPromise.allで並列に実行する
      const result = await Promise.all(files.map((file) => { return uploadImageAsPromise(file); }));
  
      console.log("Upload result");
      console.log(result);
  
      // ローディングを終了し、リストを空に
      setUploading(false);
      setProgress(0);
      setFiles([]);
  
      alert("送信されました");
  
    }

    

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  useEffect(() => {firebase.storage().ref().child('images').listAll().then((result) => {
    let urls = []
    result.items.forEach((item) => {
      item.getDownloadURL().then((url) => {
        urls.push(url)
      })
    }
    )
    setUrlState(urls)
  }).catch((error) => {
    console.log('error')
  }), [urlState]})

  return (
      <>
      <DenseAppBar />
          <Container maxWidth="md">
            <div className="container" {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>ここにファイルをドロップしてください</p> :
                <p>ここにファイルをドロップするか、クリックしてファイルを選択してください</p>
            }
            </div>
            <Button onClick={onUpload} variant="contained" color="primary">Upload</Button>
            {urlState ? <ImageList urls={urlState}/> : <p>loading</p>}
        </Container>
    </>
  );
};

export default Gallery;
