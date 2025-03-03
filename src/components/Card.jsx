
import { Link } from "react-router-dom";

export const Card = ({ item, isVisible, onImageClick, onDelete }) => {

	const deleteContact = async (id) => {

		const requestOptions = {
			method: "DELETE",
		};

		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/daglares/contacts/${id}`, requestOptions);
			
			if (!response.ok){
				throw new Error(`Error al eliminar el contacto: ${response.statusText}`);
			}
			console.log(`Contacto ${id} eliminado exitosamente`);
			onDelete(id);

		} catch (error) {
			console.error(error);
		}
	};

	if (!isVisible) return null;

	return (
		<div className="justify-content-center d-flex">
			<div className="card col-10 rounded-0">
				<div className="row g-0">
					<div className="col-md-4 d-flex align-items-center justify-content-center">
						<img
							src={"https://i.pravatar.cc/150?u=" + item.email}
							className="img-fluid rounded-circle cursor-pointer"
							alt={`Foto de ${item.name}`}
							onClick={() => onImageClick(item.id)}
						/>
					</div>
					<div className="col-md-8 d-flex justify-content-between align-items-center">
						<div className="card-body">
							<h5 className="card-title">{item.name}</h5>
							<p className="card-text">
								<small className="text-body-secondary">
									<i className="fa-solid fa-location-dot"></i> {item.address}
								</small>
							</p>
							<p className="card-text">
								<small className="text-body-secondary">
									<i className="fa-solid fa-phone-flip"></i> {item.phone}
								</small>
							</p>
							<p className="card-text">
								<small className="text-body-secondary">
									<i className="fa-solid fa-envelope"></i> {item.email}
								</small>
							</p>
						</div>
						<div className="align-items-end pe-3">
							<Link to={`/update/${item.id}`}>
								<i className="fa-solid fa-pencil px-3 cursor-pointer" aria-label="Editar contacto"></i>
							</Link>
							<i className="fa-solid fa-trash-can px-3 cursor-pointer" aria-label="Eliminar Contacto" onClick={() => deleteContact(item.id)}></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
