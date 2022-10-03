import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from '../../api/axios';
import FileUpload from '../FileUpload/FileUpload';
import ProjectComment from './ProjectComment/ProjectComment';
const Project_URL = '/project';
const fileUploadUrl = '/project/file-upload'

const Project = () => {

    const nameRef = useRef();
    const addressRef = useRef();
    const statusRef = useRef();
    const endDateRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(true);
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
    const [errMsg, setErrMsg] = useState('');
    const [files, setFiles] = useState([]);

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }

    useEffect(() => {
        nameRef.current.focus();
        addressRef.current.focus();
        statusRef.current.focus();
        endDateRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [name, address, status, endDate, files])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append(
                name,
                files[0],
                files[0].name
            )
            const response = await axios.post(Project_URL,
                JSON.stringify({ name, address, status, endDate }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response)
            let responseImg;
            if(response.status === 200){
                responseImg = await axios.post(fileUploadUrl,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true
                    }
                );
            }
            setName('');
            setAddress('');
            setEndDate(new Date());
            setFiles([]);
            setStatus(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                setErrMsg(err.response);
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    ref={nameRef}
                    autoComplete="on"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    ref={addressRef}
                />

                <label htmlFor="status">Status:</label>
                <input
                    type="checkbox"
                    id="status"
                    onChange={(e) => setStatus(!e.target.value)}
                    value={status}
                    ref={statusRef}
                    defaultChecked={status}
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                    ref={endDateRef}
                />

                <FileUpload files={files} setFiles={setFiles} removeFile={removeFile}></FileUpload>

                <button>Create</button>
            </form>
            <ProjectComment projectName={name}/>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Project