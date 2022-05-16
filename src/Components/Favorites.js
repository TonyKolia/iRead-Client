import React from "react";
import "../css/style.css";
import API from "../Helpers/API";
import Helpers from "../Helpers/Helpers";
import FavoriteItem from "./FavoriteItem";
import { useParams } from "react-router-dom";

export default function Favorites() {

    const [favorites, setFavorites] = React.useState([]);
    const { id } = useParams();

    React.useEffect(() => {
        let token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidG9ueWtvbGlhNSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzMiLCJleHAiOjE2NTI3MTA1NzZ9.pTJJm7vYpo9EfGnWCE8l4JciUf6nFyQ29FGDYF2JdC_Z7Iiig5EaThBr5efBOOGcByIheeq6xsg6XCLyrt6rUw";
        Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${id}`, token).then(response => setFavorites(response.data));
    }, [favorites]);

    const deleteFavorite = (bookId) => {
        
        //perform delete call
         
    }

    return (
        <div className="library-container">
            <h4><i className="fa-solid fa-bookmark"></i>Οι σελιδοδείκτες μου</h4>
            {
                favorites.length == 0 ? <h5>Δεν έχετε προσθέσει σελιδοδείκτες.</h5> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Τίτλος</th>
                                <th>Ημερομηνία προσθήκης</th>
                                <th>Αναγνωσμένο</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorites.map(favorite => <FavoriteItem favorite={favorite} />)}
                        </tbody>
                    </table>
            }
        </div>
    );

}