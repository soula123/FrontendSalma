
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

export default function VisiualizeSchema(props) {
   
    const SchemaArray = props.array;
    const nodes = [];
    const ColumnNodes =[];
    const edges=[];
    let nodeIdCounter = 0;
    let Xcounter = 0;
    let ColumnCounter=Object.entries(SchemaArray).length+1;
    let ConcatedArray = [];
    for (const [tableName, columns] of Object.entries(SchemaArray)) {

        const tableNodeId = nodeIdCounter.toString(); // Use the counter as the ID for the node
            nodeIdCounter++;
        // Create a node object for the table and add it to the nodes array
        // Create a unique ID for the node
        const tableNodeType = "default"; // Set the node type to "table"
        const tableNodeData = { label: `${tableName}` }; // Set the node data to the table name
        const tableNodePosition = { x: Xcounter * 100, y: Xcounter }; // Set the node position at the top of the columns
        let columnData = ""
        const columnId = ColumnCounter.toString();
        ColumnCounter++;
        const columnType = "default";
        const columnPosition = { x: Xcounter * 100, y: 100 };
        Xcounter+=2;
        for (let i = 0; i < columns.length; i++) {
            
            columnData += `${columns[i][0]} : ${columns[i][1]} ,`;
            
        }
        const ColumnNodeData = { label :`${columnData}`  }
        // Add the node object to the nodes array
        nodes.push({ id: tableNodeId, type: tableNodeType, data: tableNodeData, position: tableNodePosition });
        ColumnNodes.push({ id: columnId, type: columnType, data: ColumnNodeData, position: columnPosition });
        edges.push({id: `${tableName} edge `  , source: tableNodeId , target: columnId , animated:true});
        
    }
     ConcatedArray = ColumnNodes.concat(nodes);
    { console.log(edges) }

    const [modalIsOpen, setIsOpen] = useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        window.location.reload(false);
        setIsOpen(false);
    }
    return (
        <>
            <Button variant="outline-dark" size='sm' onClick={openModal}><FontAwesomeIcon icon={faEye} /></Button>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >

                <CloseButton style={{ postision: 'fixed', right: '1px' }} onClick={closeModal} />
                <div className='Modal-style'>
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div style={{ height: '50vh', width: '100vh' }}>
                                <ReactFlow 
                                nodes={ConcatedArray}
                                edges={edges}
                                >
                                    <Background />
                                    <Controls />
                                </ReactFlow>
                            </div>

                        </div>
                    </div>
                </div>


            </Modal>
        </>
    )


}