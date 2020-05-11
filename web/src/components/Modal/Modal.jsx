import React from 'react'
import './Modal.css'

export default class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    render(){
        const data=this.props.data
        return(
            <div className="modal-panel">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <p className="modal-item">{this.props.message}</p>
                    <span className="modal-cancel" onClick={this.props.close}>取消</span>
                    <span className="modal-ok" onClick={this.props.ok}>确定</span>
                </div>
            </div>
        )
    }
}