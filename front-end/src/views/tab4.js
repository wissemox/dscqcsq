import React,{useState , useEffect,useRef} from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";

import '../assets/css/StyleusedinCollectionIp.css'

// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
// Redux 
import {Link} from 'react-router-dom'
import {Inscraption , QuestionGetAll , VideTest , Catgoryget} from '../network/ApiAxios'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import Input from "reactstrap/lib/Input";
import VideoRecorder from 'react-video-recorder'
import Countdown  from 'react-countdown';

const Collecte_IP = ({ stream } ) => {
 
 

 // constructor(props){
  //   super(props);
  //   this.state = {
  //     activeNav: 1,
  //     chartExample1Data: "data1"
  //   };
  //   if (window.Chart) {
  //     parseOptions(Chart, chartOptions());
  //   }
  // }
  // toggleNavs = (e, index) => {
  //   e.preventDefault();
  //   this.setState({
  //     activeNav: index,
  //     chartExample1Data:
  //       this.state.chartExample1Data === "data1" ? "data2" : "data1"
  //   });
  // };
  const Inscraptiondq = async () => {
    const response = await Inscraption({name:name,Pernom:Pernom,email:email,telephone:telephone});
    const {data} = response;
    if(data) { 
      setData(data)
    }
   console.log(data)
}

// Input handel 
// name , Pernom , email , telephone
const[playing , setPlaying]=useState(false)
const HEIGHT=500 ; 
const WIDTH=500; 

const [name , setname]=useState()
const [Pernom , setPernom]=useState()
const [email , setemail]=useState()
const [telephone , settelephone]=useState()
const[Data , setData]=useState()
const[Question , setQuestion]=useState()
const[Question2 , setQuestion2]=useState(false)
const[Question3 , setQuestion3]=useState(false)
const[Question4 , setQuestion4]=useState(false)
const[Question5 , setQuestion5]=useState(false)
const[Question6 , setQuestion6]=useState(false)
const[TimedsOut , setTimdseOut]=useState(false)
const[DoneRecocrd , setDoneRecocrd]=useState(false)

const[Secation , setSecation]=useState()


const GetAllquestion =async()=>{
  const response = await QuestionGetAll()
  setQuestion(response.data)
  
}

const CatgoryGetall =async()=>{
  const response = await Catgoryget()
  setSecation(response.data)
  
}

useEffect(() => {
  GetAllquestion()
  CatgoryGetall()
  
}, []) 

// (TimeOut1, 100000);
const Test55 = () =>{
  setTimdseOut(true)
}

if(Data&&Data.msg==="done") {
  setTimeout(Test55, 500000)
}
//  {Data&&Data.msg==="done" ?setTimeout(Timeout, 10000) :null }
// setTimeout(Question4(true), 400000);
// setTimeout(setQuestion5(true), 500000);

{console.log(DoneRecocrd)}
    return (
      <>
      
        <Header />
       
        <Container >
          
        <div className="AnimationCatgeories">
          <div className="flex-center flex mt-2 Danger ">
            <p>{Data&&Data.Error}</p>
          </div>
          </div>
          {/* Map question here */}
          {Data&&Data.msg==="done" ? <div className="ml-4 AnimationCatgeories" >
          {TimedsOut? <p>TimeOut</p> : <Container>
          <div>
          
            {console.log(Pernom)}
          <div>
          <p style={{fontSize:"10px"}}>Remarque :  don't stop recording until you finish all your questions</p>
              <div className="flex flex-center" >
                <div style={{marginTop:"20px" , marginBottom:"50px"}}>
                <Countdown date={Date.now() + 500000 } 
                            

                /> 
               
                </div>
              </div>
            </div>
            <div style={{marginBottom:"50px"}} className="flex ">
              
            {Question&&Question.Questiond.filter((catgorie)=>catgorie.Catgory==Pernom).map((el , i)=><div className="flex" >
              {console.log(i)}
              {/* Question 1  */}
              <div > 
              {!Question2 && <div > {i===0 ? <p>{el.Question}</p> : null }</div>}
              {Question2 && !Question3 && <div> {i===1 ? <p>{el.Question}</p> : null }</div>}
              {Question3 && !Question4 && <div> {i===2 ? <p>{el.Question}</p> : null }</div>}
              {Question4 && !Question5  && <div> {i===3 ? <p>{el.Question}</p> : null }</div>}
              {Question5 && !Question6  && <div> {i===4 ? <p>{el.Question}</p> : null }</div>}
              {Question6   && <div> {i===4 ? <p>Congret you can stop recording you have finsh all the question</p> : null }</div>}
              </div>
              </div>)}
              <div className=" flex flex-end" style={{ width:"80%"  }}>
                <div >
                {!Question2&&  <Button onClick={()=>setQuestion2(true)} style={{backgroundColor:"#0275D8" , color:"white"}}>Next question</Button>} 
                {Question2&& !Question3&&  <Button onClick={()=>setQuestion3(true)} style={{backgroundColor:"#0275D8" , color:"white"}}>Next question</Button>} 
                {Question3 && !Question4&&  <Button onClick={()=>setQuestion4(true)} style={{backgroundColor:"#0275D8" , color:"white"}}>Next question</Button>} 
                {Question4 && !Question5&& <Button onClick={()=>setQuestion5(true)} style={{backgroundColor:"#0275D8" , color:"white"}}>Next question</Button>}
                {Question5 && !Question6&& !DoneRecocrd&& <Button onClick={()=>setQuestion6(true)} style={{backgroundColor:"#0275D8" , color:"white"}}>Next question</Button>}
                {DoneRecocrd&&<Link to="/"><button style={{background:"#62B05C" , color:"white" ,width:"150px" , height:"50px" , borderRadius:"50px"}}>Return</button></Link>}

                </div>
              </div>
              
              </div>
              <div  style={{height:"500px"}}>
              <VideoRecorder
             
                onRecordingComplete={videoBlob => {
                  // Do something with the video...
                  console.log('videoBlob', videoBlob)
                  const video = new File([videoBlob], `${Math.floor(Math.random() * 999)}.mp4`, {
              
                  });
                  {console.log(video)}
                  var formData = new FormData()
                  formData.append('articleImage',video)
                  formData.append('name',name)
                  formData.append('Catgory',Pernom)
                  formData.append('email',email)
                  setDoneRecocrd(true)
                  VideTest(formData)
                 
                  }}
                />
                </div>
            
              {/* Vide Record */}

          </div>
          </Container>}
           
            </div>: <div>
          <div className="flex flex-center mt-4" >
          {/* Input */}
       
            <div style={{  width:"40%"}}> 
            {/* Eror */}
                <div className="slideOutLeft">
                </div>
                {/* Name */}
                {console.log(name)}
                <span className="font-weight-600 f-20">FullName:</span>
                <input value={name} onChange={(e)=>setname(e.target.value)}  className="wp-100 mt-10 bg-transparent heaight-50 mb-4 br-colorgrey rounded-sm" />
                {/* Pernom */}
                {console.log(Pernom)}

                <span  className="font-weight-600  f-20">JobTile:</span>
                <div>
                <select className="wp-100 mt-10 bg-transparent heaight-50 mb-4 br-colorgrey rounded-sm"  value={Pernom} onChange={(e)=>setPernom(e.target.value)}  name="cars" id="cars">
                  <option>Choice</option>
                  {Secation&&Secation.AllCatgory.map((el)=><option>{el.Catgory}</option>)}

                </select>
                {console.log(Pernom)}
                </div>
                {/* E-mail */}
                <span className="font-weight-600   f-20">e-mail:</span>
                <input  value={email} onChange={(e)=>setemail(e.target.value)} className="wp-100 mb-4 mt-10 heaight-50 bg-transparent br-colorgrey rounded-sm" />
                {/* Num tel */}
                <span className="font-weight-600 f-20">Num tel :</span>
                <input value={telephone} onChange={(e)=>settelephone(e.target.value)} className="wp-100 mb-4 mt-10 heaight-50 bg-transparent br-colorgrey rounded-sm" />
              {/* Button div */}
             
              {console.log(email)}
              <div  className="mt-4" >
                <Button onClick={Inscraptiondq} className="bg-Blue color-w"  >envoyer</Button>
              </div>

            </div>
        </div>

          </div> }
         
       </Container>
        {/* Page content */}
        {/* <ReactMediaRecorder
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <video src={mediaBlobUrl} controls autoplay loop />
          {console.log(mediaBlobUrl)}
        </div>
      )}
    /> */}
    {/* <video src="http://localhost:3001/577cca34-c834-4cc3-b1ed-ed91df8ff450" controls autoplay loop/> */}
    
    
    
      </>
    );
 
}

export default Collecte_IP;
