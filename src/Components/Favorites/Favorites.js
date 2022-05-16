import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import FavoriteItem from "./FavoriteItem";
import { UserContext } from "../../App";

export default function Favorites() {

    const [favorites, setFavorites] = React.useState([]);
    const user = React.useContext(UserContext);

    React.useEffect(() => {
        Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${user.user.userId}`, user.user.token).then(response => setFavorites(response.data));
    }, [favorites, user]);

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
                            {favorites.map(favorite => <FavoriteItem key={favorite.book.bookId} favorite={favorite} />)}
                        </tbody>
                    </table>
            }
        </div>
    );

}