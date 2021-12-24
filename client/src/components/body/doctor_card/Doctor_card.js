import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from 'react-stars'
import axios from "axios";

function Doctor_card({doctor}) {
    const [doctorUser, setDoctorUser] = useState({avatar:"", email:"", mobile:"", gender:""});
    const [callback, setCallback] = useState(false);
    const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState({speciality_name: ""});
    useEffect(() => {
        const getDoctorUser = async () => {
          try {
            const res = await axios.get( "/user/fetchDoctorUser/"+doctor.userId );
            setDoctorUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getDoctorUser();
      }, [callback]);
      useEffect(() => {
        const getSpecialities = async () => {
          const res = await axios.get("/api/speciality");
          setSpecialities(res.data);
        };
        getSpecialities();
      }, [callback]);
      const getSpecialityFee = (_id, specialities) => {
        const spec = specialities.filter( speciality => { return speciality._id===_id});
        if(Lenght(spec)===0) return "";
        return spec[0].fee;
    }
    const Lenght = (symptoms) => symptoms.length;

    return (
        // <div className="blog_card">           
        //     <img src={doctorUser.avatar} alt="" />
        //     <div className="blog_box">
        //         <h2 title={doctor.name}>{doctor.name}</h2>
        //         <ReactStars
        //             count={5}
        //             value={Number(doctor.reviews.rating)}
        //             size={24}
        //             color2={'#ffd700'}
        //             edit={false}
        //         />
        //         <p>{doctor.clinic_address}</p>
        //     </div>
        //     <Link className='btn_blog_view' onClick={() => window.scrollTo({ top: 0 })} to={`/doctor/${doctor.userId}`}>
        //     View
        //   </Link>
            
        // </div>
        <div className="cards">
        <div className="card_speciality center-align ">
           
      <img src={doctorUser.avatar} alt="s1" className="doc_card_img" />
      <div className="doc_card_body">
            <h5 className="card_title" title={doctor.name}>{doctor.name}</h5>
            <div className="doc_rating"><ReactStars
                    count={5}
                    value={Number(doctor.reviews.rating)}
                    size={24}
                    color2={'#ffd700'}
                    edit={false}
            />
              </div>
            <div className="card_doc_text" title={doctor.clinic_address}>{doctor.clinic_address}</div>
            <Link className='btn_doc_view' onClick={() => window.scrollTo({ top: 0 })} to={`/doctor/${doctor.userId}`}>
           View
          </Link>
        {/* <a href="#">
              View Profile
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </a> */}
      </div> 
      </div>
    
   </div>
    )
}

export default Doctor_card
