import { useQuery } from "@tanstack/react-query";
import { FaTrash} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
// import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
// import useAuth from "../../../hooks/useAuth";

const AllUser = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    // const{user}=useAuth();
    // const paymentUser = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { data: allUser = [], refetch} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user'
            
            );
            return res.data;
        }
    })

    useEffect(() => {
        if (selectedRole === 'pro-user') {
            const filtered = allUser.filter(user => user.role === 'pro-user');
            setFilteredUsers(filtered);
          } else if (selectedRole === 'surveyor') {
            const filtered = allUser.filter(user => user.role === 'surveyor');
            setFilteredUsers(filtered);
          } else if (selectedRole === 'admin') {
            const filtered = allUser.filter(user => user.role === 'admin');
            setFilteredUsers(filtered);
          } else if (selectedRole === 'normal') {
            const filtered = allUser.filter(user => !user.role); // Users without a role
            setFilteredUsers(filtered);
          } else {
            setFilteredUsers(allUser);
          }
      }, [selectedRole, allUser]);
    

    //  if(pay==pro){
    //     axiosSecure.patch(`/user/pro/${id}`)
    //     .then(res =>{
    //         console.log(res.data)
    //         if(res.data.modifiedCount > 0){
    //             refetch();
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: "Now you are a pro member!",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               });
    //         }
    //     })
    //  }
    
    // useEffect(() => {
        
    //     const findSurvey = survey.filter((item) => item.loggedUser == userEmail);
    //   console.log(findSurvey);
    // },[userEmail,survey]);
   
    const handleMakeAdmin = users =>{
        axiosSecure.patch(`/user/admin/${users._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${users.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    const handleMakeSurveyor = users =>{
        axiosSecure.patch(`/user/surveyor/${users._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${users.name} is an Surveyor Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }


    const handleDeleteUser = users => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/user/${users._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className=" my-4">
                <h2 className="text-3xl text-center text-emerald-600 font-serif font-bold">Manage  Users</h2>
                <h2 className="text-lg   text-rose-400 font-serif font-bold pt-4">Total Users: {allUser.length}</h2>
            </div>
           
                <div className="">
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-24 h-8 bg-pink-200 text-center text-lg font-semibold text-sky-900 "   >
                  <option value="all">All Users</option>
                  <option value="pro-user">Pro-User</option>
                  <option value="normal">User</option>
                  <option value="surveyor">Surveyors</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            
            <div className="overflow-x-auto mt-8 ">
                <table className="table table-xs  w-full  ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-sm">Name</th>
                            <th className="text-sm">Email</th>
                            <th className="text-sm">Role</th>
                            <th className="text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((users, index) => <tr key={users._id}>
                                
                                <th className="text-base text-pink-700 mr-2">{index + 1}</th>
                                <td className="text-base font-medium">{users.name}</td>
                                <td className="text-base font-medium">{users.email}{users.role=='pro-user'? <h3 className="badge badge-secondary ml-4">pro</h3>:""}</td>
                                <td>
                                    { users.role === 'admin' ?(<div className="flex gap-6">
                                        <h3 className="mr-2 text-2xl text-green-600 font-serif font-semibold"> Admin</h3>
                                        <button
                                        onClick={() => handleMakeSurveyor(users)}
                                        className="btn btn-base bg-blue-500 text-white">
                                       Surveyor
                                    </button>
                                    </div>)  : users.role === 'surveyor' ? (<div className="flex gap-6">
                                        <h3 className="mr-2 text-xl text-blue-600 font-serif font-semibold"> Surveyor</h3>
                                        <button
                                        onClick={() => handleMakeAdmin(users)}
                                        className="btn btn-base bg-purple-500 text-white">
                                       Admin
                                    </button>
                                    </div>)  : (<th className="">

                                    <button
                                        onClick={() => handleMakeAdmin(users)}
                                        className="btn btn-base bg-purple-500 text-white mr-4">
                                       Admin
                                    </button>
                                    <button
                                        onClick={() => handleMakeSurveyor(users)}
                                        className="btn btn-base bg-blue-500 text-white">
                                      Surveyor
                                    </button>

                                    </th>) }
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(users)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrash
                                            className="text-red-600"></FaTrash>
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;