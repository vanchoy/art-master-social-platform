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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const auth = getAuth();

    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, mail, password)
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
                    <IonTitle>Login to Art Masters</IonTitle>
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
                            Login
                        </IonButton>
                    </div>
                    <div className="ion-padding">
                        <IonButton color="light" expand="block" onClick={() => history.replace("/register")}>
                            Register
                        </IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
};