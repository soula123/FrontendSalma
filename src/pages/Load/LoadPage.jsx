import './Load.css';

import Load from '../../components/Load/Load';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Position } from 'reactflow';
import { useState } from 'react';



function LoadPage() {


    const [selectedFile, setSelectedFile] = useState(null);



     const onFileChange = () => {
    
  };
   



    return (
        <div className='load-page'>
        <div className="load-box">
             <h2 className="title" >
            Upload your files
             </h2>
            <Load
                onChange={(files) => onFileChange(files)}
            />

        </div>
       <div>
      
        </div>
        </div>
    );
}

export default LoadPage;