import { useForm } from "react-hook-form"
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import swal from "sweetalert";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateSurvey = () => {
    const {_id,title,description,category,question1,question2,question3,deadline} = useLoaderData();
    const { register, handleSubmit,formState:{errors} } = useForm();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [yesVoted] =useState(0);
    const [noVoted] =useState(0);
    const [totalVote] = useState(0);
    const [liked] =useState(0);
    const [disliked] =useState(0);
    const {user} = useAuth();



    const onSubmit = async (data) =>{ 
        console.log(data);
        const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile,{
        headers:{
            'content-type' : 'multipart/form-data'
        }
    });
    if(res.data.success){
        const formData ={
            ...data,
            image: res.data.data.display_url, 
            options:['Yes','No'],
            yesVoted,
            noVoted,
            totalVote,
            liked,
            disliked,
            status:'published',
            loggedUser:user.email,
            loggedUserName:user.displayName
        };
        console.log(formData);
        const survey = await axiosSecure.put(`/survey/update/${_id}`,formData);
        console.log(survey.data);
        if(survey.data.modifiedCount>0){
            swal({
                title: 'okay!',
                text: 'Survey updated Successfully ',
                icon:'success',
            })
        }
        navigate(location?.state?location.state :"/dashboard/list" )
    }
    console.log(res.data);
    }
    return (
        <div>
           <h2 className="text-5xl font-extrabold text-center text-pink-400 underline  mb-10">Update Survey</h2>
             <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex mb-8">
      <div className="form-control md:w-1/2 ">
  <label className="label">
    <span className="label-text font-semibold text-base">Title:  <span className="text-red-500 text-lg">*</span></span>
    
  </label>
  <input type="text" defaultValue={title} placeholder="Title" {...register("title",{ required: true })}
   className="input input-bordered w-full" />
   {errors.title&&(<h3 className="text-lg mt-3 text-red-600">Must provide a title</h3>)}
  
</div>
      <div className="form-control md:w-1/2 ml-4 ">
  <label className="label">
    <span className="label-text font-semibold text-base">Description:<span className="text-red-500 text-lg">*</span></span>
    
  </label>
  <input type="text" defaultValue={description} placeholder="Description" {...register("description",{ required: true })}
   className="input input-bordered w-full" />
   {errors.description&&(<h3 className="text-lg mt-3 text-red-600">Must provide a description</h3>)}
  
</div>
</div>
      <div className="md:flex mb-8">
      <div className="form-control md:w-1/2 ">
  <label className="label">
    <span className="label-text font-semibold text-base">Category:<span className="text-red-500 text-lg">*</span></span>
    
  </label>
  <select defaultValue={category} {...register("category",{ required: true })}
       className="select select-bordered w-full " >
  <option disabled defaultValue={category}>Select a category</option>
  <option>Education</option>
        <option >Technology</option>
        <option >Marketing</option>
        <option >Health Care</option>
        <option >Work and Career</option>
</select>
{errors.category&&(<h3 className="text-lg mt-3 text-red-600">Must provide a category</h3>)}
  
</div>
<div className="form-control md:w-1/2 ml-4 ">
<label className="label">
    <span className="label-text font-semibold text-base">Category Image:</span>
    
  </label>
     <input {...register("image")} type="file"   className="file-input file-input-primary w-full max-w-xs" />
     </div>
</div>
<div className="md:flex mb-8">
      <div className="form-control md:w-1/2 ">
  <label className="label">
    <span className="label-text font-semibold text-base">Question 1:</span>
    
  </label>
  <input type="text" defaultValue={question1} placeholder="Question" {...register("question1")}
   className="input input-bordered w-full" />
  
</div>
      <div className="form-control md:w-1/2 ml-4 ">
  <label className="label">
    <span className="label-text font-semibold text-base">Question 2:</span>
    
  </label>
  <input type="text"defaultValue={question2} placeholder="Question" {...register("question2")}
   className="input input-bordered w-full" />
  
</div>
</div>
<div className="md:flex  mb-8">
<div className="form-control md:w-1/2  ">
  <label className="label">
    <span className="label-text font-semibold text-base">Question 3:</span>
    
  </label>
  <input type="text" defaultValue={question3} placeholder="Question" {...register("question3")}
   className="input input-bordered w-full" />
  
</div>
<div className="form-control md:w-1/2 ml-6  ">
  <label className="label">
    <span className="label-text font-semibold text-base">Deadline:</span>
    
  </label>
  <input type="date" defaultValue={deadline} {...register("deadline")}
   className="input input-bordered w-full" />
  
</div>
</div>

{/* <div className="md:flex  mb-8">
<div className="form-control md:w-1/2 ml-6 ">
  <label className="label">
    <span className="label-text font-semibold text-lg">Options:<span className="text-red-500 text-lg">*</span></span>
    
  </label>
  <div className="flex items-center">
  <input type="checkbox" id='yes' value='yes' {...register("options",{ required: true })}
    />
    
    <label className="label" htmlFor="yes">
    <span className="label-text font-semibold text-lg ml-2 mr-4">Yes</span>
    
  </label>
  <input type="checkbox" id='no' value='no' {...register("options",{ required: true })}
    />
    <label className="label" htmlFor="no">
    <span className="label-text ml-2 font-semibold text-lg">No</span>
    
  </label>
  </div>
  
  
  
</div>
</div> */}
     
      <button type="submit" className="btn bg-lime-500 text-white text-lg">Update</button>
    </form>
        </div>
    );
};

export default UpdateSurvey;