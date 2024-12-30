import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const Update = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  console.log(name, email, age);

  const [error,setError]= useState("");
  const {id}=useParams();
  const navigate= useNavigate();

//get single user data
  const getSingleUser = async()=>{
    
     const response = await fetch(`http://localhost:5000/${id}`);
     const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }else{
      setError("");
      console.log("updated user",result);}
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    };
// send updated data to backend

const handleUpdate=async(e)=>{
  e.preventDefault();
    const updatedUser = { name, email, age };
    try {
      const response = await fetch(`http://localhost:5000/addUser/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result;
    try {
      result = await response.json();
    } catch (e) {
      result = { error: "Invalid JSON response from server" };
    }
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
       setError("");
        navigate("/all");

      }
    } catch (error) {
      console.error("Error:", error);
    }

}

    useEffect(()=>{
      getSingleUser();
    },[id])


  


  return (
    <div className='container my-2'>
      {error && <div className="alert alert-danger" >{error}
</div>}
      <h2 className="text-center">Edit Data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Update