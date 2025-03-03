import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  

export const ContactForm = () => {
    const { dispatch } = useGlobalReducer();
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

    const handleSave = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        };

        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/daglares/contacts", requestOptions);
            if (response.ok) {
                const newContact = await response.json();

                dispatch({
                    type: "add_contact",
                    payload: newContact
                });

                console.log("Contacto agregado con exito");
                navigate("/");

            } else {
                console.error("Error al agregar contacto");
            }

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Add a new contact</h1>
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
                <button type="button" className="btn col-12 btn-primary" onClick={handleSave}>
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
