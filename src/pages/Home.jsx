
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/daglares/contacts");
                const result = await response.json();

                dispatch({
                    type: "get_data",
                    payload: result
                });

            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, [dispatch]);

    const handleImageClick = (id) => {
        setSelectedId((previd) => (previd === id ? null : id));
    };

    const handleDeleteContact = (deletedId) => {
        dispatch({
            type: "delete_contact",
            payload: deletedId
        });
    };

    return (
        <div className="mt-1">
            {store && store.contacts?.length > 0 ?( 
			store.contacts.map((item) => (
                <Card 
                    key={item.id} 
                    item={item} 
                    isVisible={selectedId === null || selectedId === item.id} 
                    onImageClick={handleImageClick}
                    onDelete={handleDeleteContact}
                />
            ))
		) : (
			<h1>Aún no hay contactos...</h1>
		)}
        </div>
    );
};
