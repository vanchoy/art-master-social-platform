import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const auth = getAuth();

    function handleSubmit(event){
        event.preventDefault();
        createUserWithEmailAndPassword(auth, mail, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle>Register in Art Masters</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="dark" fullscreen>
                <form onSubmit={handleSubmit}>
                    <IonItem color="dark">
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput
                            value={mail}
                            type="email"
                            placeholder="Type your email"
                            onIonChange={e => setMail(e.target.value)}
                        />
                    </IonItem>
                    <IonItem color="dark">
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput
                            value={password}
                            type="password"
                            placeholder="Type your password"
                            onIonChange={e => setPassword(e.target.value)}
                        />
                    </IonItem>
                    <div className="ion-padding">
                        <IonButton color="light" type="submit" expand="block">
                            Register
                        </IonButton>
                    </div>
                    <div className="ion-text-center">
                        <IonButton color="medium" size="small" fill="clear" onClick={() => history.replace("/login")}>
                            Back to Login
                        </IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
};