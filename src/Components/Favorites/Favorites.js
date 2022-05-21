import React from "react";
import "../../css/style.css";
import API from "../../Helpers/API";
import Helpers from "../../Helpers/Helpers";
import FavoriteItem from "./FavoriteItem";
import { UserContext } from "../../App";

export default function Favorites() {

    const [favorites, setFavorites] = React.useState([]);
    const [favoriteRemoved, setFavoriteRemoved] = React.useState(null);
    const user = React.useContext(UserContext);

    React.useEffect(() => {
        if(user.user.userId !== "")
            Helpers.performGet(`${API.API_URL_GET_USER_FAVORITES}${user.user.userId}`, user.user.token).then(response => setFavorites(response.data));
    }, [user, favoriteRemoved]);

    const deleteFavorite = (bookId) => {
        
        let url = API.API_URL_DELETE_FAVORITE.replace(":userId", user.user.userId).replace(":bookId", bookId);
        Helpers.performDelete(url, user.user.token).then(response => { 
            if(response.success){
                Helpers.successMessage("Αφαιρέθηκε επιτυχώς!");
                return setFavoriteRemoved(bookId);
            }
        });
        
    }

    return (
        <div className="library-container">
            <h4><i className="fa-solid fa-bookmark"></i>Οι σελιδοδείκτες μου</h4>
            {
                favorites == null || favorites.length == 0 ? <h5>Δεν έχετε προσθέσει σελιδοδείκτες.</h5> :
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
                            {favorites.map(favorite => <FavoriteItem key={favorite.book.id} favorite={favorite} deleteFavorite = {deleteFavorite} />)}
                        </tbody>
                    </table>
            }
        </div>
    );

}