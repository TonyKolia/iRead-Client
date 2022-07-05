import React from "react";
import "../css/style.css";

export default function FAQ() {

    return (
        <div style={{ marginTop: "4rem", width: "50%", marginLeft: "auto", marginRight: "auto" }}>
            <h4 style={{ textAlign: "center", paddingBottom: "25px" }}>Συχνές ερωτήσεις</h4>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item" >
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Ποιος μπορεί να γίνει μέλος στην βιβλιοθήκη;
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Στη βιβλιοθήκη μας μπορεί να γίνει μέλος οποιοδήποτε άτομο με μόνιμη κατοικία στην Ελλάδα με ηλικία μεγαλύτερη των 12 ετών.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Υπάρχει κάποιος περιορισμός στον δανεισμό βιβλίων;
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Ο μόνος περιορισμός που υπάρχει στη διαδικασία δανεισμού είναι το ανώτατο όριων των τριών (3) βιβλίων ανά κράτηση με σκοπό την αποφυγή της κατάχρησης της υπηρεσίας.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Υπάρχει κάποια χρέωση για τη διαδικασία δανεισμού βιβλίου;
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Όχι! Ο δανεισμός βιβλίων είναι απολύτως δωρεάν για τα μέλη της βιβλιοθήκης.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFour">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Υπάρχει κάποιο χρονοδιάγραμμα σχετικά με το δανεισμό βιβλίων;
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Οι κρατήσεις βιβλίων απ' την ιστοσελίδα μας έχουν διάρκεια δέκα (10) ημερολογιακές μέρες εντός των οποίων πρέπει να πραγματοποιηθεί η παραλαβή και η επιστροφή των βιβλίων.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFive">
                        <button class="accordion-button static-accordion collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Υπάρχουν χρεώσεις στην περίπτωση καθυστέρησης ή ακύρωσης;
                        </button>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            Στην περίπτωση που θέλετε να ακυρώσετε μια κράτηση θα χρειαστεί να επικοινωνήσετε με την βιβλιοθήκη μας και δεν υπάρχει κάποια χρέωση.<br/> Στην περίπτωση καθυστέρησης επιστροφής βιβλίων ενός δανεισμού υπάρχει χρέωση εκπρόθεσμου δανεισμού της τάξης των δύο (2) ευρώ ανά ημέρα την οποία καλείστε να εξοφλήσετε κατά την επιστροφή των βιβλίων στη βιβλιοθήκη.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}