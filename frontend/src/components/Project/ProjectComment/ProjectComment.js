import { useRef, useState, useEffect } from 'react';
import FileUpload from '../../FileUpload/FileUpload';
import axios from '../../../api/axios';
const ProjectComment_URL = '/project/project-comment';
const fileUploadUrl = '/project/file-upload';
const getAllProjectsNamesUrl = '/project/getAll';

const ProjectComment = ({ projectName }) => {

    const commentTextRef = useRef();
    const createDateRef = useRef();
    const errRef = useRef();

    const [commentText, setCommentText] = useState('');
    const [createDate, setCreateDate] = useState(new Date().toLocaleDateString());
    const [files, setFiles] = useState([]);

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        commentTextRef.current.focus();
        createDateRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [commentText, files, createDate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            const formData = new FormData();
            formData.append(
                projectName,
                files[0],
                files[0].name
            )
            const response = await axios.post(ProjectComment_URL,
                //todo pass project name
                JSON.stringify({ commentText, createDate }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response)
            let responseImg;
            if(response.status === 200 && formData.get(projectName)){
                responseImg = await axios.post(fileUploadUrl,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true
                    }
                );
            }
        } catch (err) {
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Write Comment on the Project</h1>
            <form onSubmit={handleSubmit}>

                <select>TODO selection of sql projects</select>

                <label htmlFor="commentText">Text:</label>
                <textarea
                    type="text"
                    id="commentText"
                    ref={commentTextRef}
                    autoComplete="on"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                />

                <FileUpload files={files} setFiles={setFiles} removeFile={removeFile}></FileUpload>

                <label htmlFor="createDate">Create Date:</label>
                <input
                    type="date"
                    id="createDate"
                    ref={createDateRef}
                    onChange={(e) => setCreateDate(e.target.value)}
                    value={createDate}
                />
                <button>Create Project Comment</button>
            </form>
        </section>

    )
}

export default ProjectComment