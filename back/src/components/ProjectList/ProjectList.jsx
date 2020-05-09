import React from 'react'
import { Select, Radio,Empty} from 'antd'
import axios from 'axios'
import ProjectListCard from './ProjectListCard/ProjectListCard'

const { Option } = Select;

export default class ProjectList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataList:null,
        }
    }

  componentWillMount(){
    let _this=this;
    axios.get('http://localhost:4001/project',{
        params:{ offset:_this.props.currentPage-1,
            project_sort:_this.props.project_sort,
            keyWord:_this.props.keyWord
        }
    })
    .then(function (response) {
      _this.setState(state=>({
        dataList:response.data.data
      }))
    })
    .catch(function (error) {
        console.log(error);
    });
  }


    showProjects=()=>{ //循环获取项目
        if(this.state.dataList)
        {let items = [];
        for (let i = 0; i <this.state.dataList.length; i++) {
            items.push(<ProjectListCard key={i} data={this.state.dataList[i]} 
                updateProjectList={this.props.updateProjectList}/>);
        }
        if(this.state.dataList.length==0){
            items=<Empty style={{marginTop:'40px'}}/>;
        }
        return(
            <>{items}</>)}
            return

    }

    render(){
        
        return(
            <>
            {this.showProjects()}
            </>
        );
    }
}
