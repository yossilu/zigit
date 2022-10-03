import './FileUpload.css'

const FileUpload = ({files, setFiles, removeFile}) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        setFiles([...files, file]);
    }

    return (
        <div className="file-card">
            <div className="file-inputs">
                <input type="file" onChange={uploadHandler}/>
            </div>
            <p className='main'>Images Only</p>
        </div>
    )
}

export default FileUpload;