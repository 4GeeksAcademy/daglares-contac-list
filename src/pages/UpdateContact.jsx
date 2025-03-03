import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  

export const UpdateContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateContact = async (e) =>{
        e.preventDefault();
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address
        });
        
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
        };
        
        try {
          const response = await fetch(`https://playground.4geeks.com/contact/agendas/daglares/contacts/${id}`, requestOptions);
          const result = await response.json();
          setFormData(result);
          navigate("/");
        } catch (error) {
          console.error(error);
        }
        };



    return (
        <div className="container">
            <h1 className="text-center">Update a contact</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={formData.name} 
                        onChange={handleChange}
                        placeholder="Full Name" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        placeholder="Email" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        name="phone"
                        value={formData.phone} 
                        onChange={handleChange}
                        placeholder="Enter phone" 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address" 
                        name="address"
                        value={formData.address} 
                        onChange={handleChange}
                        placeholder="Enter address" 
                        required
                    />
                </div>
                <button type="button" className="btn col-12 btn-primary" onClick={updateContact}>
                    Save
                </button>
            </form>
            <br />
            <Link to="/">
                <button className="btn btn-danger btn-lg">Back to contacts</button>
            </Link>
        </div>
    );
};
